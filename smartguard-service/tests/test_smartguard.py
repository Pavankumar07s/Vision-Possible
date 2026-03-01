"""Tests for SmartGuard ETMS microservice."""

from __future__ import annotations

import json
import time
from pathlib import Path
from unittest.mock import MagicMock, patch

import numpy as np
import pytest

# ────────────────────────────────────────────────────────────
#  DeviceVocab tests
# ────────────────────────────────────────────────────────────

from src.assembler import (
    DAY_OF_WEEK,
    DeviceVocab,
    create_default_vocab,
    hour_to_bucket,
)


class TestHourToBucket:
    """Tests for hour-to-3-hour-bucket mapping."""

    def test_midnight(self) -> None:
        assert hour_to_bucket(0) == 0

    def test_noon(self) -> None:
        assert hour_to_bucket(12) == 4

    def test_eleven_pm(self) -> None:
        assert hour_to_bucket(23) == 7

    def test_boundary_3am(self) -> None:
        assert hour_to_bucket(3) == 1

    def test_boundary_6am(self) -> None:
        assert hour_to_bucket(6) == 2


class TestDeviceVocab:
    """Tests for dynamic device vocabulary."""

    def test_empty_vocab(self) -> None:
        v = DeviceVocab()
        # vocab_size is max(_next_action_id, 2); starts at 2 (0 reserved)
        assert v.vocab_size == 2

    def test_register_device(self) -> None:
        v = DeviceVocab()
        id1 = v.get_device_id("Light")
        assert id1 == 1  # IDs start at 1 (0 reserved for padding)
        id2 = v.get_device_id("Light")
        assert id2 == 1  # same device → same ID
        id3 = v.get_device_id("Switch")
        assert id3 == 2

    def test_register_action(self) -> None:
        v = DeviceVocab()
        a1 = v.get_action_id("switch on")
        assert a1 == 1  # IDs start at 1
        a2 = v.get_action_id("switch on")
        assert a2 == 1
        a3 = v.get_action_id("switch off")
        assert a3 == 2

    def test_vocab_size(self) -> None:
        v = DeviceVocab()
        v.get_action_id("on")
        v.get_action_id("off")
        v.get_action_id("toggle")
        # next_action_id becomes 4 (started at 1, added 3)
        assert v.vocab_size == 4

    def test_save_and_load(self, tmp_path: Path) -> None:
        v = DeviceVocab()
        v.get_device_id("Light")
        v.get_action_id("on")
        v.get_action_id("off")

        path = tmp_path / "vocab.json"
        v.save(path)
        assert path.exists()

        loaded = DeviceVocab.load(path)
        assert loaded.get_device_id("Light") == v.get_device_id("Light")
        assert loaded.get_action_id("on") == v.get_action_id("on")
        assert loaded.vocab_size == v.vocab_size

    def test_default_vocab_has_smartthings(self) -> None:
        v = create_default_vocab()
        # Should have pre-registered SmartThings devices
        assert v.vocab_size > 0
        # Check a known device type exists
        light_id = v.get_device_id("Light")
        assert isinstance(light_id, int)


# ────────────────────────────────────────────────────────────
#  SequenceAssembler tests
# ────────────────────────────────────────────────────────────

from src.assembler.pipeline import BehaviorEvent, SequenceAssembler


class TestBehaviorEvent:
    """Tests for BehaviorEvent dataclass."""

    def test_create_event(self) -> None:
        evt = BehaviorEvent(
            timestamp=time.time(),
            day_of_week=0,
            hour_bucket=3,
            device_type_id=5,
            action_id=10,
        )
        assert evt.day_of_week == 0
        assert evt.hour_bucket == 3
        assert evt.device_type_id == 5
        assert evt.action_id == 10

    def test_frozen(self) -> None:
        evt = BehaviorEvent(
            timestamp=time.time(),
            day_of_week=0,
            hour_bucket=3,
            device_type_id=5,
            action_id=10,
        )
        with pytest.raises(AttributeError):
            evt.action_id = 99  # type: ignore[misc]


class TestSequenceAssembler:
    """Tests for the event buffer and sequence extraction."""

    def _make_assembler(self) -> SequenceAssembler:
        return SequenceAssembler(
            vocab=create_default_vocab(),
            sequence_length=10,
            max_buffer_minutes=60,
        )

    def test_add_event(self) -> None:
        asm = self._make_assembler()
        device_type = "Light"
        action = "switch on"
        asm.add_event(device_type, action)
        assert len(asm._buffer) == 1

    def test_get_latest_needs_min_events(self) -> None:
        asm = self._make_assembler()
        assert asm.get_latest_sequence() is None  # empty

        # Add fewer than sequence_length events
        for i in range(5):
            asm.add_event("Light", "on")
        # With padding, should still return a sequence
        seq = asm.get_latest_sequence()
        assert seq is not None
        assert seq.shape == (40,)

    def test_flush_returns_sequences(self) -> None:
        asm = self._make_assembler()
        # Add exactly 10 events
        for i in range(10):
            asm.add_event("Light", f"action_{i}")
        seqs = asm.flush()
        assert len(seqs) >= 1
        assert seqs[0].shape == (40,)

    def test_flush_sliding_window(self) -> None:
        asm = self._make_assembler()
        # Add 15 events → 6 sequences (15-10+1)
        for i in range(15):
            asm.add_event("Switch", f"action_{i}")
        seqs = asm.flush()
        assert len(seqs) == 6

    def test_sequence_encoding_format(self) -> None:
        asm = self._make_assembler()
        for i in range(10):
            asm.add_event("Light", "on")
        seq = asm.get_latest_sequence()
        assert seq is not None
        # Each event has 4 fields: [day, hour, device_id, action_id]
        reshaped = seq.reshape(10, 4)
        # Day of week should be 0-6
        assert all(0 <= reshaped[i, 0] <= 6 for i in range(10))
        # Hour bucket should be 0-7
        assert all(0 <= reshaped[i, 1] <= 7 for i in range(10))


# ────────────────────────────────────────────────────────────
#  EventParser tests
# ────────────────────────────────────────────────────────────

from src.assembler.event_parser import EventParser


class TestEventParser:
    """Tests for MQTT message routing and parsing."""

    def _make_parser(self) -> EventParser:
        vocab = create_default_vocab()
        asm = SequenceAssembler(
            vocab=vocab, sequence_length=10, max_buffer_minutes=60,
        )
        return EventParser(assembler=asm)

    def test_parse_ha_state_change(self) -> None:
        parser = self._make_parser()
        topic = "homeassistant/light/living_room/state"
        payload = json.dumps({
            "entity_id": "light.living_room",
            "state": "on",
            "attributes": {"brightness": 255},
        })
        parser.route_message(topic, payload)
        assert len(parser.assembler._buffer) == 1

    def test_parse_smartthings_event(self) -> None:
        parser = self._make_parser()
        topic = "etms/smartthings/sensor_01/event"
        payload = json.dumps({
            "device_type": "TemperatureSensor",
            "capability": "temperatureMeasurement",
            "attribute": "temperature",
            "value": 22.5,
        })
        parser.route_message(topic, payload)
        assert len(parser.assembler._buffer) == 1

    def test_parse_vision_event(self) -> None:
        parser = self._make_parser()
        topic = "etms/vision/room_1_camera/event"
        payload = json.dumps({
            "event": "fall_detected",
            "person_id": "G1",
            "confidence": 0.92,
            "severity": "high",
        })
        parser.route_message(topic, payload)
        assert len(parser.assembler._buffer) == 1

    def test_parse_vision_movement(self) -> None:
        parser = self._make_parser()
        topic = "etms/vision/room_1_camera/movement"
        payload = json.dumps({
            "person_id": "G1",
            "zone": "kitchen",
            "speed": 2.5,
        })
        parser.route_message(topic, payload)
        assert len(parser.assembler._buffer) == 1

    def test_parse_health_alert(self) -> None:
        parser = self._make_parser()
        topic = "etms/health/watch_01/alert"
        payload = json.dumps({
            "metric": "heart_rate",
            "value": 150,
            "alert_type": "high_heart_rate",
        })
        parser.route_message(topic, payload)
        assert len(parser.assembler._buffer) == 1

    def test_unknown_topic_ignored(self) -> None:
        parser = self._make_parser()
        parser.route_message("unknown/topic/path", "{}")
        assert len(parser.assembler._buffer) == 0

    def test_invalid_json_handled(self) -> None:
        parser = self._make_parser()
        # Should not crash
        parser.route_message(
            "homeassistant/light/room/state",
            "not valid json{{{",
        )
        assert len(parser.assembler._buffer) == 0


# ────────────────────────────────────────────────────────────
#  InferenceEngine tests
# ────────────────────────────────────────────────────────────

from src.inference import AnomalyResult, InferenceEngine, _classify_severity


class TestSeverityClassification:
    """Tests for anomaly severity mapping."""

    def test_below_threshold_is_none(self) -> None:
        assert _classify_severity(0.5, 1.0) == "none"

    def test_no_threshold_is_none(self) -> None:
        assert _classify_severity(5.0, None) == "none"

    def test_above_threshold_is_low(self) -> None:
        # Tiny overshoot → low
        assert _classify_severity(1.1, 1.0) == "low"

    def test_high_overshoot(self) -> None:
        # overshoot = (10 - 1)/1 = 9.0 ≥ 0.95 → critical
        assert _classify_severity(10.0, 1.0) == "critical"


class TestInferenceEngine:
    """Tests for the inference orchestration."""

    def _make_engine(self) -> InferenceEngine:
        mock_model = MagicMock()
        mock_model._threshold = 1.0
        mock_model.predict.return_value = {
            "anomaly_score": 0.5,
            "is_anomaly": False,
            "per_event_loss": [0.05] * 10,
            "threshold": 1.0,
        }
        vocab = create_default_vocab()
        asm = SequenceAssembler(
            vocab=vocab, sequence_length=10, max_buffer_minutes=60,
        )
        return InferenceEngine(
            model=mock_model,
            assembler=asm,
            cooldown_seconds=1.0,
        )

    def test_evaluate_latest_empty(self) -> None:
        engine = self._make_engine()
        assert engine.evaluate_latest() is None

    def test_evaluate_with_events(self) -> None:
        engine = self._make_engine()
        for i in range(10):
            engine.assembler.add_event("Light", "on")
        result = engine.evaluate_latest()
        assert result is not None
        assert result.anomaly_score == 0.5
        assert result.is_anomaly is False
        assert result.severity == "none"

    def test_anomaly_cooldown(self) -> None:
        engine = self._make_engine()
        engine.model.predict.return_value = {
            "anomaly_score": 5.0,
            "is_anomaly": True,
            "per_event_loss": [0.5] * 10,
            "threshold": 1.0,
        }
        for _ in range(10):
            engine.assembler.add_event("Light", "on")

        # First anomaly should pass
        r1 = engine.evaluate_latest()
        assert r1 is not None
        assert r1.is_anomaly is True

        # Second within cooldown should be suppressed
        r2 = engine.evaluate_latest()
        assert r2 is not None
        assert r2.is_anomaly is False  # suppressed

    def test_history_tracked(self) -> None:
        engine = self._make_engine()
        for _ in range(10):
            engine.assembler.add_event("Switch", "off")
        engine.evaluate_latest()
        assert len(engine.history) == 1

    def test_status_report(self) -> None:
        engine = self._make_engine()
        status = engine.get_status()
        assert "model_loaded" in status
        assert "sequences_evaluated" in status
        assert status["sequences_evaluated"] == 0


# ────────────────────────────────────────────────────────────
#  Training adapter tests
# ────────────────────────────────────────────────────────────

from src.training import convert_etms_log_to_sequences


class TestETMSLogConversion:
    """Tests for converting ETMS event logs to sequences."""

    def test_converts_log(self, tmp_path: Path) -> None:
        log_path = tmp_path / "events.jsonl"
        events = []
        for i in range(15):
            events.append({
                "day_of_week": i % 7,
                "hour_bucket": i % 8,
                "device_type_id": i % 5,
                "action_id": i % 10,
            })
        log_path.write_text("\n".join(json.dumps(e) for e in events))

        seqs = convert_etms_log_to_sequences(log_path, sequence_length=10)
        assert len(seqs) == 6  # 15 - 10 + 1
        assert seqs[0].shape == (40,)

    def test_too_few_events(self, tmp_path: Path) -> None:
        log_path = tmp_path / "events.jsonl"
        events = [{"day_of_week": 0, "hour_bucket": 0, "device_type_id": 0, "action_id": 0}]
        log_path.write_text(json.dumps(events[0]))

        seqs = convert_etms_log_to_sequences(log_path, sequence_length=10)
        assert len(seqs) == 0
