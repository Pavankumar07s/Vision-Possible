"""Person trajectory tracking and movement analysis for ETMS.

Maintains per-person trajectories, computes movement features
(speed, direction, path loops, entropy), and provides data
for behavioral analysis.
"""

from __future__ import annotations

import logging
import math
import time
from collections import deque
from dataclasses import dataclass, field
from typing import Any

import numpy as np

from src.detection import PersonDetection
from src.utils.config import TrackingConfig

logger = logging.getLogger(__name__)


@dataclass
class TrajectoryPoint:
    """A single point in a person's trajectory."""

    x: float
    y: float
    timestamp: float
    frame_id: int


@dataclass
class MovementFeatures:
    """Computed movement features for a tracked person."""

    person_id: int = -1
    # Movement metrics
    speed: float = 0.0  # pixels/second
    direction: float = 0.0  # degrees (0-360)
    path_length: float = 0.0  # total pixels traveled
    # Behavioral metrics
    loop_count: int = 0  # repeated path loops
    movement_entropy: float = 0.0  # randomness score (0-1)
    direction_changes: int = 0  # sudden direction shifts
    speed_variation: float = 0.0  # std deviation of speed
    time_stationary: float = 0.0  # seconds spent not moving
    # Position
    current_position: tuple[float, float] = (0.0, 0.0)
    zone: str = ""  # current zone name
    # Timestamps
    first_seen: float = 0.0
    last_seen: float = 0.0
    track_duration: float = 0.0


class PersonTrack:
    """Maintains trajectory and computes features for one tracked person."""

    def __init__(self, person_id: int, config: TrackingConfig) -> None:
        """Initialize a person track.

        Args:
            person_id: Unique tracker ID.
            config: Tracking configuration.

        """
        self.person_id = person_id
        self.config = config
        self.trajectory: deque[TrajectoryPoint] = deque(
            maxlen=config.trail_length * 10
        )
        self.speeds: deque[float] = deque(maxlen=100)
        self.directions: deque[float] = deque(maxlen=100)
        self.first_seen = time.time()
        self.last_seen = time.time()
        self.frames_seen = 0
        self.frames_lost = 0
        self._last_position: tuple[float, float] | None = None
        self._stationary_start: float | None = None
        self._total_stationary_time: float = 0.0

    def update(self, detection: PersonDetection, frame_id: int) -> None:
        """Update track with a new detection.

        Args:
            detection: New person detection.
            frame_id: Current frame number.

        """
        now = time.time()
        self.last_seen = now
        self.frames_seen += 1
        self.frames_lost = 0

        point = TrajectoryPoint(
            x=detection.center[0],
            y=detection.center[1],
            timestamp=now,
            frame_id=frame_id,
        )
        self.trajectory.append(point)

        # Compute instantaneous speed and direction
        if self._last_position is not None:
            dt = now - self.trajectory[-2].timestamp if len(self.trajectory) > 1 else 1.0
            if dt > 0:
                dx = detection.center[0] - self._last_position[0]
                dy = detection.center[1] - self._last_position[1]
                dist = math.sqrt(dx * dx + dy * dy)
                speed = dist / dt
                direction = math.degrees(math.atan2(dy, dx)) % 360

                self.speeds.append(speed)
                self.directions.append(direction)

                # Track stationary periods
                if dist < 5.0:  # barely moving
                    if self._stationary_start is None:
                        self._stationary_start = now
                else:
                    if self._stationary_start is not None:
                        self._total_stationary_time += now - self._stationary_start
                        self._stationary_start = None

        self._last_position = detection.center

    def mark_lost(self) -> None:
        """Mark this track as lost for one frame."""
        self.frames_lost += 1

    @property
    def is_expired(self) -> bool:
        """Check if this track should be removed."""
        return self.frames_lost > self.config.max_lost_frames

    @property
    def is_confirmed(self) -> bool:
        """Check if this track has enough history to be analyzed."""
        return self.frames_seen >= self.config.min_track_length

    @property
    def track_duration(self) -> float:
        """Return how long this track has been alive in seconds."""
        return self.last_seen - self.first_seen

    def get_features(self) -> MovementFeatures:
        """Compute movement features from trajectory history.

        Returns:
            MovementFeatures with all computed metrics.

        """
        now = time.time()
        features = MovementFeatures(
            person_id=self.person_id,
            first_seen=self.first_seen,
            last_seen=self.last_seen,
            track_duration=now - self.first_seen,
        )

        if len(self.trajectory) < 2:
            return features

        # Current position
        last_pt = self.trajectory[-1]
        features.current_position = (last_pt.x, last_pt.y)

        # Average speed
        if self.speeds:
            features.speed = float(np.mean(list(self.speeds)[-10:]))
            features.speed_variation = float(np.std(list(self.speeds)[-30:]))

        # Current direction
        if self.directions:
            features.direction = self.directions[-1]

        # Path length
        features.path_length = self._compute_path_length()

        # Loop count
        features.loop_count = self._compute_loop_count()

        # Movement entropy
        features.movement_entropy = self._compute_entropy()

        # Direction changes
        features.direction_changes = self._compute_direction_changes()

        # Stationary time
        stationary = self._total_stationary_time
        if self._stationary_start is not None:
            stationary += now - self._stationary_start
        features.time_stationary = stationary

        return features

    def get_trail_points(self) -> list[tuple[int, int]]:
        """Get recent trajectory points for visualization.

        Returns:
            List of (x, y) integer tuples for drawing.

        """
        points = list(self.trajectory)[-self.config.trail_length :]
        return [(int(p.x), int(p.y)) for p in points]

    def _compute_path_length(self) -> float:
        """Compute total path length from trajectory."""
        total = 0.0
        points = list(self.trajectory)
        for i in range(1, len(points)):
            dx = points[i].x - points[i - 1].x
            dy = points[i].y - points[i - 1].y
            total += math.sqrt(dx * dx + dy * dy)
        return total

    def _compute_loop_count(self) -> int:
        """Detect repeated path loops by checking revisits."""
        if len(self.trajectory) < 20:
            return 0

        points = list(self.trajectory)
        # Grid-based revisit detection
        grid_size = 50  # pixels
        visits: dict[tuple[int, int], list[float]] = {}

        for pt in points:
            cell = (int(pt.x / grid_size), int(pt.y / grid_size))
            if cell not in visits:
                visits[cell] = []
            visits[cell].append(pt.timestamp)

        # Count cells visited multiple times with temporal gaps
        loop_cells = 0
        for cell, timestamps in visits.items():
            if len(timestamps) >= 3:
                # Check for temporal gaps (indicating left and came back)
                gaps = 0
                for i in range(1, len(timestamps)):
                    if timestamps[i] - timestamps[i - 1] > 5.0:
                        gaps += 1
                if gaps >= 2:
                    loop_cells += 1

        return loop_cells

    def _compute_entropy(self) -> float:
        """Compute movement entropy (randomness of direction).

        Returns:
            Entropy normalized to 0-1 range.

        """
        if len(self.directions) < 10:
            return 0.0

        # Bin directions into 8 compass directions
        bins = [0] * 8
        for d in self.directions:
            idx = int(d / 45) % 8
            bins[idx] += 1

        total = sum(bins)
        if total == 0:
            return 0.0

        # Shannon entropy
        entropy = 0.0
        for count in bins:
            if count > 0:
                p = count / total
                entropy -= p * math.log2(p)

        # Normalize: max entropy for 8 bins is log2(8) = 3
        return entropy / 3.0

    def _compute_direction_changes(self, time_window: float = 30.0) -> int:
        """Count significant direction changes within a time window.

        Only considers direction samples from the last ``time_window``
        seconds so that accumulated history from normal walking does
        not inflate the count.

        Args:
            time_window: Lookback period in seconds.

        Returns:
            Number of direction changes exceeding the threshold.

        """
        if len(self.directions) < 3:
            return 0

        # Determine how many recent trajectory points fall within the
        # time window.  Directions are added one-per-frame starting
        # from the second trajectory point, so ``directions[k]``
        # corresponds to ``trajectory[k + 1]``.
        now = time.time()
        traj = list(self.trajectory)
        start_idx = 0
        for i, pt in enumerate(traj):
            if now - pt.timestamp <= time_window:
                start_idx = i
                break

        # Map trajectory index to direction index (offset by 1)
        dir_start = max(0, start_idx - 1)
        dirs = list(self.directions)[dir_start:]

        if len(dirs) < 3:
            return 0

        threshold = self.config.direction_change_threshold
        changes = 0
        for i in range(1, len(dirs)):
            diff = abs(dirs[i] - dirs[i - 1])
            if diff > 180:
                diff = 360 - diff
            if diff > threshold:
                changes += 1

        return changes


class PersonTracker:
    """Manages multiple person tracks across frames.

    Maintains active tracks, handles track creation/deletion,
    and computes behavioral features for each tracked person.
    """

    def __init__(self, config: TrackingConfig) -> None:
        """Initialize the tracker.

        Args:
            config: Tracking configuration.

        """
        self.config = config
        self.tracks: dict[int, PersonTrack] = {}
        self._next_id = 0

    def update(
        self, detections: list[PersonDetection], frame_id: int
    ) -> dict[int, MovementFeatures]:
        """Update all tracks with new detections.

        Args:
            detections: List of person detections from YOLO.
            frame_id: Current frame number.

        Returns:
            Dictionary mapping person_id to their movement features.

        """
        # Mark all existing tracks as potentially lost
        seen_ids: set[int] = set()

        for detection in detections:
            pid = detection.person_id

            if pid < 0:
                # No tracker ID, assign one
                pid = self._next_id
                self._next_id += 1
                detection.person_id = pid

            seen_ids.add(pid)

            if pid not in self.tracks:
                self.tracks[pid] = PersonTrack(pid, self.config)
                logger.debug("New person tracked: ID=%d", pid)

            self.tracks[pid].update(detection, frame_id)

        # Mark lost tracks and remove expired ones
        expired_ids: list[int] = []
        for pid, track in self.tracks.items():
            if pid not in seen_ids:
                track.mark_lost()
                if track.is_expired:
                    expired_ids.append(pid)

        for pid in expired_ids:
            duration = self.tracks[pid].track_duration
            logger.debug(
                "Person ID=%d lost after %.1f seconds", pid, duration
            )
            del self.tracks[pid]

        # Compute features for confirmed tracks
        features: dict[int, MovementFeatures] = {}
        for pid, track in self.tracks.items():
            if track.is_confirmed:
                features[pid] = track.get_features()

        return features

    def get_trail(self, person_id: int) -> list[tuple[int, int]]:
        """Get trajectory trail points for a specific person.

        Args:
            person_id: The person's tracker ID.

        Returns:
            List of (x, y) points for drawing trail.

        """
        if person_id in self.tracks:
            return self.tracks[person_id].get_trail_points()
        return []

    @property
    def active_count(self) -> int:
        """Number of currently active person tracks."""
        return len(self.tracks)

    @property
    def confirmed_count(self) -> int:
        """Number of confirmed (long enough) tracks."""
        return sum(1 for t in self.tracks.values() if t.is_confirmed)
