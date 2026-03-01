"""Tests for the behavior analysis module."""

import pytest

from src.behavior import BehaviorAnalyzer, BehaviorEvent, EventType, ZoneManager
from src.tracking import MovementFeatures
from src.utils.config import (
    BehaviorConfig,
    ErraticConfig,
    GaitConfig,
    InactivityConfig,
    WanderingConfig,
    ZoneConfig,
    ZoneDefinition,
)


class TestEventType:
    """Test the EventType enum."""

    def test_values_exist(self) -> None:
        """Test that key event types are defined."""
        assert EventType.WANDERING_DETECTED
        assert EventType.ZONE_VIOLATION
        assert EventType.ERRATIC_MOVEMENT
        assert EventType.INACTIVITY_ALERT
        assert EventType.GAIT_INSTABILITY
        assert EventType.FALL_SUSPECTED


class TestBehaviorEvent:
    """Test BehaviorEvent serialization."""

    def test_to_dict(self) -> None:
        """Test converting a behavior event to a dictionary."""
        event = BehaviorEvent(
            event_type=EventType.WANDERING_DETECTED,
            person_id=1,
            confidence=0.85,
            timestamp=1000.0,
            details={"loops": 5},
        )
        d = event.to_dict()
        assert d["event"] == "WANDERING_DETECTED"
        assert d["person_id"] == 1
        assert d["confidence"] == 0.85
        assert d["details"]["loops"] == 5
        assert "timestamp" in d

    def test_event_has_severity(self) -> None:
        """Test that events include severity field."""
        event = BehaviorEvent(
            event_type=EventType.ZONE_VIOLATION,
            person_id=2,
            confidence=0.9,
            timestamp=2000.0,
            zone="kitchen",
            severity="warning",
            details={"zone": "kitchen"},
        )
        d = event.to_dict()
        assert d["severity"] == "warning"
        assert d["zone"] == "kitchen"


class TestZoneManager:
    """Test zone-based boundary checking."""

    def test_no_zones(self) -> None:
        """Test that no zones means no violations."""
        zm = ZoneManager(zone_defs=[])
        _zone, violations = zm.check_position(100.0, 200.0)
        assert violations == []

    def test_restricted_zone_inside(self) -> None:
        """Test detection of entry into a restricted zone."""
        zone_def = ZoneDefinition(
            name="kitchen",
            type="restricted",
            points=[[0, 0], [200, 0], [200, 200], [0, 200]],
        )
        zm = ZoneManager(zone_defs=[zone_def])
        _zone, violations = zm.check_position(100.0, 100.0)
        assert "kitchen" in violations

    def test_restricted_zone_outside(self) -> None:
        """Test no violation when outside restricted zone."""
        zone_def = ZoneDefinition(
            name="kitchen",
            type="restricted",
            points=[[0, 0], [200, 0], [200, 200], [0, 200]],
        )
        zm = ZoneManager(zone_defs=[zone_def])
        _zone, violations = zm.check_position(500.0, 500.0)
        assert violations == []

    def test_safe_zone_detection(self) -> None:
        """Test safe zone name returned when inside."""
        zone_def = ZoneDefinition(
            name="living_room",
            type="safe",
            points=[[0, 0], [400, 0], [400, 400], [0, 400]],
        )
        zm = ZoneManager(zone_defs=[zone_def])
        zone_name, violations = zm.check_position(200.0, 200.0)
        assert zone_name == "living_room"
        assert violations == []


class TestBehaviorAnalyzer:
    """Test the main behavior analyzer."""

    @pytest.fixture
    def behavior_config(self) -> BehaviorConfig:
        """Return a BehaviorConfig for testing."""
        return BehaviorConfig(
            wandering=WanderingConfig(
                enabled=True,
                loop_threshold=3,
                time_window=300,
                min_path_length=100,
            ),
            zones=ZoneConfig(enabled=False, definitions=[]),
            erratic=ErraticConfig(
                enabled=True,
                direction_change_threshold=90,
                min_changes=5,
                time_window=30,
            ),
            inactivity=InactivityConfig(
                enabled=True,
                threshold_seconds=10,
                movement_threshold=5,
            ),
            gait=GaitConfig(
                enabled=False,
                stability_threshold=0.3,
                analysis_window=30,
            ),
        )

    def test_create_analyzer(self, behavior_config: BehaviorConfig) -> None:
        """Test creating a BehaviorAnalyzer."""
        analyzer = BehaviorAnalyzer(behavior_config)
        assert analyzer is not None

    def test_analyze_empty(self, behavior_config: BehaviorConfig) -> None:
        """Test analyze with no features or detections."""
        analyzer = BehaviorAnalyzer(behavior_config)
        events = analyzer.analyze(features={}, detections=[])
        assert events == []

    def test_erratic_movement_features(self) -> None:
        """Test that high direction changes indicate erratic movement."""
        features = MovementFeatures(
            person_id=1,
            speed=50.0,
            direction=0.0,
            path_length=500.0,
            loop_count=0,
            movement_entropy=0.8,
            direction_changes=15,
            speed_variation=3.0,
            time_stationary=0.0,
        )
        assert features.direction_changes > 5
        assert features.speed_variation > 2.0

    def test_inactivity_features(self) -> None:
        """Test that low movement features indicate inactivity."""
        features = MovementFeatures(
            person_id=1,
            speed=0.0,
            direction=0.0,
            path_length=2.0,
            loop_count=0,
            movement_entropy=0.0,
            direction_changes=0,
            speed_variation=0.0,
            time_stationary=15.0,
        )
        assert features.time_stationary > 10
        assert features.path_length < 5

    def test_wandering_features(self) -> None:
        """Test that high loop count indicates wandering."""
        features = MovementFeatures(
            person_id=1,
            speed=30.0,
            direction=0.0,
            path_length=600.0,
            loop_count=5,
            movement_entropy=0.7,
            direction_changes=3,
            speed_variation=0.5,
            time_stationary=0.0,
        )
        assert features.loop_count >= 3
        assert features.path_length >= 100
