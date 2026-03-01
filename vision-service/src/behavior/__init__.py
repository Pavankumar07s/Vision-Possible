"""Behavioral analysis engine for ETMS Vision Service.

Analyzes movement features from person tracking to detect:
- Wandering (repeated path loops, pacing)
- Zone violations (entering restricted areas)
- Erratic movement (sudden direction changes)
- Inactivity (prolonged stillness)
- Gait instability (via pose keypoints)

Produces behavioral events that are published to MQTT.
"""

from __future__ import annotations

import logging
import math
import time
from dataclasses import dataclass, field
from enum import Enum
from typing import Any

import numpy as np
from shapely.geometry import Point, Polygon

from src.detection import PersonDetection
from src.tracking import MovementFeatures
from src.utils.config import BehaviorConfig, ZoneDefinition

logger = logging.getLogger(__name__)


class EventType(str, Enum):
    """Types of behavioral events."""

    WANDERING_DETECTED = "WANDERING_DETECTED"
    ZONE_VIOLATION = "ZONE_VIOLATION"
    ERRATIC_MOVEMENT = "ERRATIC_MOVEMENT"
    INACTIVITY_ALERT = "INACTIVITY_ALERT"
    GAIT_INSTABILITY = "GAIT_INSTABILITY"
    PERSON_ENTERED = "PERSON_ENTERED"
    PERSON_LEFT = "PERSON_LEFT"
    FALL_SUSPECTED = "FALL_SUSPECTED"


@dataclass
class BehaviorEvent:
    """A detected behavioral event."""

    event_type: EventType
    person_id: int
    confidence: float
    timestamp: float = field(default_factory=time.time)
    details: dict[str, Any] = field(default_factory=dict)
    zone: str = ""
    severity: str = "info"  # info, warning, critical

    def to_dict(self) -> dict[str, Any]:
        """Convert to dictionary for MQTT payload."""
        return {
            "event": self.event_type.value,
            "person_id": self.person_id,
            "confidence": round(self.confidence, 3),
            "timestamp": self.timestamp,
            "zone": self.zone,
            "severity": self.severity,
            "details": self.details,
        }


class ZoneManager:
    """Manages detection zones for violation checking."""

    def __init__(self, zone_defs: list[ZoneDefinition]) -> None:
        """Initialize zones from definitions.

        Args:
            zone_defs: List of zone definitions from config.

        """
        self.zones: dict[str, dict[str, Any]] = {}
        for zd in zone_defs:
            if len(zd.points) >= 3:
                self.zones[zd.name] = {
                    "type": zd.type,
                    "polygon": Polygon(zd.points),
                    "points": zd.points,
                }
        logger.info("Loaded %d zones: %s", len(self.zones), list(self.zones.keys()))

    def check_position(
        self, x: float, y: float
    ) -> tuple[str, list[str]]:
        """Check which zone a position falls in and any violations.

        Args:
            x: X coordinate.
            y: Y coordinate.

        Returns:
            Tuple of (current_zone_name, list of violated zone names).

        """
        point = Point(x, y)
        current_zone = ""
        violations: list[str] = []

        for name, zone in self.zones.items():
            if zone["polygon"].contains(point):
                if zone["type"] == "restricted":
                    violations.append(name)
                elif zone["type"] == "safe":
                    current_zone = name

        return current_zone, violations

    def get_zone_polygons(self) -> dict[str, dict[str, Any]]:
        """Get zone definitions for visualization."""
        return self.zones


class GaitAnalyzer:
    """Analyzes pose keypoints for gait stability."""

    # COCO pose keypoint indices
    LEFT_HIP = 11
    RIGHT_HIP = 12
    LEFT_KNEE = 13
    RIGHT_KNEE = 14
    LEFT_ANKLE = 15
    RIGHT_ANKLE = 16
    LEFT_SHOULDER = 5
    RIGHT_SHOULDER = 6

    def __init__(self, stability_threshold: float = 0.3) -> None:
        """Initialize gait analyzer.

        Args:
            stability_threshold: Threshold below which gait is unstable.

        """
        self.stability_threshold = stability_threshold
        self._history: dict[int, list[float]] = {}

    def analyze(
        self, person_id: int, keypoints: np.ndarray | None
    ) -> tuple[float, bool]:
        """Analyze gait stability from pose keypoints.

        Args:
            person_id: Person tracker ID.
            keypoints: COCO format keypoints array (17, 3).

        Returns:
            Tuple of (stability_score, is_unstable).

        """
        if keypoints is None or len(keypoints) < 17:
            return 1.0, False

        # Check if lower body keypoints are visible
        lower_body = [
            self.LEFT_HIP, self.RIGHT_HIP,
            self.LEFT_KNEE, self.RIGHT_KNEE,
            self.LEFT_ANKLE, self.RIGHT_ANKLE,
        ]

        visible = sum(1 for idx in lower_body if keypoints[idx][2] > 0.3)
        if visible < 4:
            return 1.0, False  # not enough data

        # Compute hip-knee-ankle alignment stability
        stability = self._compute_stability(keypoints)

        # Track history
        if person_id not in self._history:
            self._history[person_id] = []
        self._history[person_id].append(stability)
        if len(self._history[person_id]) > 30:
            self._history[person_id] = self._history[person_id][-30:]

        # Use rolling average for more stable assessment
        avg_stability = np.mean(self._history[person_id][-10:])
        is_unstable = avg_stability < self.stability_threshold

        return float(avg_stability), is_unstable

    def _compute_stability(self, keypoints: np.ndarray) -> float:
        """Compute gait stability score from pose alignment.

        Measures:
        - Shoulder levelness
        - Hip levelness
        - Knee alignment
        - Center of mass position relative to base of support

        Returns:
            Stability score (0-1, higher = more stable).

        """
        scores: list[float] = []

        # Shoulder levelness (should be roughly horizontal)
        if keypoints[self.LEFT_SHOULDER][2] > 0.3 and keypoints[self.RIGHT_SHOULDER][2] > 0.3:
            shoulder_diff = abs(
                keypoints[self.LEFT_SHOULDER][1] - keypoints[self.RIGHT_SHOULDER][1]
            )
            shoulder_width = abs(
                keypoints[self.LEFT_SHOULDER][0] - keypoints[self.RIGHT_SHOULDER][0]
            )
            if shoulder_width > 0:
                shoulder_score = 1.0 - min(shoulder_diff / shoulder_width, 1.0)
                scores.append(shoulder_score)

        # Hip levelness
        if keypoints[self.LEFT_HIP][2] > 0.3 and keypoints[self.RIGHT_HIP][2] > 0.3:
            hip_diff = abs(
                keypoints[self.LEFT_HIP][1] - keypoints[self.RIGHT_HIP][1]
            )
            hip_width = abs(
                keypoints[self.LEFT_HIP][0] - keypoints[self.RIGHT_HIP][0]
            )
            if hip_width > 0:
                hip_score = 1.0 - min(hip_diff / hip_width, 1.0)
                scores.append(hip_score)

        # Vertical alignment: center of mass over base of support
        if all(keypoints[idx][2] > 0.3 for idx in [self.LEFT_ANKLE, self.RIGHT_ANKLE]):
            # Base center
            base_x = (keypoints[self.LEFT_ANKLE][0] + keypoints[self.RIGHT_ANKLE][0]) / 2
            # Upper body center
            upper_x = (keypoints[self.LEFT_SHOULDER][0] + keypoints[self.RIGHT_SHOULDER][0]) / 2
            base_width = abs(keypoints[self.LEFT_ANKLE][0] - keypoints[self.RIGHT_ANKLE][0])

            if base_width > 0:
                lean = abs(upper_x - base_x) / base_width
                lean_score = 1.0 - min(lean, 1.0)
                scores.append(lean_score)

        if not scores:
            return 1.0

        return float(np.mean(scores))

    def check_fall_pose(self, keypoints: np.ndarray | None) -> bool:
        """Quick check if pose indicates a possible fall.

        Args:
            keypoints: COCO format keypoints.

        Returns:
            True if pose suggests person may have fallen.

        """
        if keypoints is None or len(keypoints) < 17:
            return False

        # Person is likely fallen if hips are at similar height to ankles
        if all(
            keypoints[idx][2] > 0.3
            for idx in [self.LEFT_HIP, self.RIGHT_HIP, self.LEFT_ANKLE, self.RIGHT_ANKLE]
        ):
            hip_y = (keypoints[self.LEFT_HIP][1] + keypoints[self.RIGHT_HIP][1]) / 2
            ankle_y = (keypoints[self.LEFT_ANKLE][1] + keypoints[self.RIGHT_ANKLE][1]) / 2

            # If hips are near or above ankles vertically (person horizontal)
            if abs(hip_y - ankle_y) < 30:
                return True

        # Person is lying if shoulders and hips are roughly at same height
        if all(
            keypoints[idx][2] > 0.3
            for idx in [self.LEFT_SHOULDER, self.RIGHT_SHOULDER, self.LEFT_HIP, self.RIGHT_HIP]
        ):
            shoulder_y = (
                keypoints[self.LEFT_SHOULDER][1] + keypoints[self.RIGHT_SHOULDER][1]
            ) / 2
            hip_y = (keypoints[self.LEFT_HIP][1] + keypoints[self.RIGHT_HIP][1]) / 2
            if abs(shoulder_y - hip_y) < 20:
                return True

        return False


class BehaviorAnalyzer:
    """Main behavior analysis engine.

    Processes movement features and pose data to detect
    behavioral anomalies and generate events.
    """

    def __init__(self, config: BehaviorConfig) -> None:
        """Initialize the behavior analyzer.

        Args:
            config: Behavior analysis configuration.

        """
        self.config = config
        self.zone_manager = ZoneManager(config.zones.definitions)
        self.gait_analyzer = GaitAnalyzer(config.gait.stability_threshold)

        # Track event cooldowns to avoid flooding
        self._last_events: dict[str, float] = {}
        self._event_cooldown = 30.0  # seconds between same event

    def analyze(
        self,
        features: dict[int, MovementFeatures],
        detections: list[PersonDetection],
    ) -> list[BehaviorEvent]:
        """Analyze all tracked persons for behavioral anomalies.

        Args:
            features: Movement features per person ID.
            detections: Current frame detections (with keypoints).

        Returns:
            List of detected behavioral events.

        """
        events: list[BehaviorEvent] = []
        det_map = {d.person_id: d for d in detections}

        for pid, feat in features.items():
            detection = det_map.get(pid)

            # Zone checking
            if self.config.zones.enabled:
                zone_events = self._check_zones(pid, feat)
                events.extend(zone_events)

            # Wandering detection
            if self.config.wandering.enabled:
                wander_event = self._check_wandering(pid, feat)
                if wander_event:
                    events.append(wander_event)

            # Erratic movement detection
            if self.config.erratic.enabled:
                erratic_event = self._check_erratic(pid, feat)
                if erratic_event:
                    events.append(erratic_event)

            # Inactivity detection
            if self.config.inactivity.enabled:
                inactivity_event = self._check_inactivity(pid, feat)
                if inactivity_event:
                    events.append(inactivity_event)

            # Gait analysis (requires pose keypoints)
            if self.config.gait.enabled and detection and detection.keypoints is not None:
                gait_events = self._check_gait(pid, detection.keypoints)
                events.extend(gait_events)

        return events

    def _check_zones(
        self, person_id: int, features: MovementFeatures
    ) -> list[BehaviorEvent]:
        """Check for zone violations."""
        events: list[BehaviorEvent] = []
        x, y = features.current_position

        current_zone, violations = self.zone_manager.check_position(x, y)
        features.zone = current_zone

        for zone_name in violations:
            event_key = f"zone_{person_id}_{zone_name}"
            if self._should_emit(event_key):
                events.append(
                    BehaviorEvent(
                        event_type=EventType.ZONE_VIOLATION,
                        person_id=person_id,
                        confidence=0.95,
                        zone=zone_name,
                        severity="warning",
                        details={
                            "position": list(features.current_position),
                            "violated_zone": zone_name,
                            "movement_speed": round(features.speed, 2),
                        },
                    )
                )

        return events

    def _check_wandering(
        self, person_id: int, features: MovementFeatures
    ) -> BehaviorEvent | None:
        """Check for wandering behavior."""
        wc = self.config.wandering

        if features.loop_count < wc.loop_threshold:
            return None

        if features.path_length < wc.min_path_length:
            return None

        event_key = f"wander_{person_id}"
        if not self._should_emit(event_key):
            return None

        # Confidence based on loop count and entropy
        confidence = min(
            0.5 + (features.loop_count - wc.loop_threshold) * 0.1
            + features.movement_entropy * 0.3,
            0.99,
        )

        return BehaviorEvent(
            event_type=EventType.WANDERING_DETECTED,
            person_id=person_id,
            confidence=confidence,
            zone=features.zone,
            severity="warning",
            details={
                "loop_count": features.loop_count,
                "path_length": round(features.path_length, 1),
                "movement_entropy": round(features.movement_entropy, 3),
                "speed": round(features.speed, 2),
                "track_duration": round(features.track_duration, 1),
            },
        )

    def _check_erratic(
        self, person_id: int, features: MovementFeatures
    ) -> BehaviorEvent | None:
        """Check for erratic movement patterns."""
        ec = self.config.erratic

        # Must have enough direction changes
        if features.direction_changes < ec.min_changes:
            return None

        # Ignore jitter when barely moving — bounding-box wobble at
        # low speed produces random direction flips that are not erratic.
        min_speed = getattr(ec, "min_speed", 30.0)
        if features.speed < min_speed:
            return None

        # Require meaningful movement randomness (entropy) to
        # distinguish truly erratic motion from normal walking
        # with occasional turns.
        min_entropy = getattr(ec, "min_entropy", 0.5)
        if features.movement_entropy < min_entropy:
            return None

        event_key = f"erratic_{person_id}"
        if not self._should_emit(event_key):
            return None

        confidence = min(
            0.3 + (features.direction_changes - ec.min_changes) * 0.03
            + features.movement_entropy * 0.2
            + features.speed_variation * 0.005,
            0.99,
        )

        return BehaviorEvent(
            event_type=EventType.ERRATIC_MOVEMENT,
            person_id=person_id,
            confidence=confidence,
            zone=features.zone,
            severity="warning",
            details={
                "direction_changes": features.direction_changes,
                "speed_variation": round(features.speed_variation, 2),
                "movement_entropy": round(features.movement_entropy, 3),
                "current_speed": round(features.speed, 2),
            },
        )

    def _check_inactivity(
        self, person_id: int, features: MovementFeatures
    ) -> BehaviorEvent | None:
        """Check for prolonged inactivity."""
        ic = self.config.inactivity

        if features.time_stationary < ic.threshold_seconds:
            return None

        event_key = f"inactivity_{person_id}"
        if not self._should_emit(event_key):
            return None

        minutes = features.time_stationary / 60

        return BehaviorEvent(
            event_type=EventType.INACTIVITY_ALERT,
            person_id=person_id,
            confidence=0.85,
            zone=features.zone,
            severity="info" if minutes < 15 else "warning",
            details={
                "stationary_seconds": round(features.time_stationary, 1),
                "stationary_minutes": round(minutes, 1),
                "position": list(features.current_position),
            },
        )

    def _check_gait(
        self, person_id: int, keypoints: np.ndarray
    ) -> list[BehaviorEvent]:
        """Check gait stability and fall risk from pose."""
        events: list[BehaviorEvent] = []

        # Fall detection
        if self.gait_analyzer.check_fall_pose(keypoints):
            event_key = f"fall_{person_id}"
            if self._should_emit(event_key):
                events.append(
                    BehaviorEvent(
                        event_type=EventType.FALL_SUSPECTED,
                        person_id=person_id,
                        confidence=0.75,
                        severity="critical",
                        details={"source": "pose_analysis"},
                    )
                )

        # Gait instability
        stability, is_unstable = self.gait_analyzer.analyze(person_id, keypoints)
        if is_unstable:
            event_key = f"gait_{person_id}"
            if self._should_emit(event_key):
                events.append(
                    BehaviorEvent(
                        event_type=EventType.GAIT_INSTABILITY,
                        person_id=person_id,
                        confidence=1.0 - stability,
                        severity="warning",
                        details={
                            "stability_score": round(stability, 3),
                            "threshold": self.config.gait.stability_threshold,
                        },
                    )
                )

        return events

    def _should_emit(self, event_key: str) -> bool:
        """Check if an event should be emitted (cooldown control)."""
        now = time.time()
        last = self._last_events.get(event_key, 0)
        if now - last < self._event_cooldown:
            return False
        self._last_events[event_key] = now
        return True
