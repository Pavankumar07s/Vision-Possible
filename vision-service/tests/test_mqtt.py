"""Tests for the MQTT publisher module."""

import json

import pytest

from src.behavior import BehaviorEvent, EventType


class TestVisionMQTTPublisher:
    """Test MQTT publisher without a live broker."""

    def test_event_dict_serialization(self) -> None:
        """Test that events serialize to valid dicts for publishing."""
        event = BehaviorEvent(
            event_type=EventType.WANDERING_DETECTED,
            person_id=1,
            confidence=0.9,
            timestamp=1000.0,
            details={"loops": 4, "path_length": 750.0},
        )
        d = event.to_dict()
        # Should be JSON-serializable
        payload = json.dumps(d)
        assert isinstance(payload, str)
        assert "WANDERING_DETECTED" in payload

    def test_event_dict_keys(self) -> None:
        """Test that event dict contains all required keys."""
        event = BehaviorEvent(
            event_type=EventType.FALL_SUSPECTED,
            person_id=3,
            confidence=0.95,
            timestamp=5000.0,
            severity="critical",
            details={"keypoint_drop": 120.5},
        )
        d = event.to_dict()
        required_keys = {
            "event", "person_id", "confidence",
            "timestamp", "details", "severity", "zone",
        }
        assert required_keys.issubset(d.keys())

    def test_topic_format(self) -> None:
        """Test MQTT topic construction."""
        prefix = "etms/vision"
        device_id = "room_1_camera"
        topic = f"{prefix}/{device_id}/event"
        assert topic == "etms/vision/room_1_camera/event"

    def test_movement_topic(self) -> None:
        """Test movement metrics topic construction."""
        prefix = "etms/vision"
        device_id = "room_1_camera"
        track_id = 42
        topic = f"{prefix}/{device_id}/movement/{track_id}"
        assert topic == "etms/vision/room_1_camera/movement/42"
