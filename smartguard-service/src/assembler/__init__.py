"""ETMS device vocabulary — maps HA entities/events to integer tokens.

SmartGuard expects each event as a 4-tuple:
    (day_of_week, hour_bucket, device_type, device_action)

This module manages the dynamic vocabulary that translates real-world
HA / SmartThings / Vision events into those integer tokens.
"""

from __future__ import annotations

import json
import logging
import threading
from dataclasses import dataclass, field
from pathlib import Path

logger = logging.getLogger(__name__)

# ── Time encoding (matches SmartGuard paper) ────────────────

DAY_OF_WEEK: dict[str, int] = {
    "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3,
    "Friday": 4, "Saturday": 5, "Sunday": 6,
}

# 3-hour buckets: 0-3 → 0, 3-6 → 1, …, 21-24 → 7
HOUR_BUCKETS = 8


def hour_to_bucket(hour: int) -> int:
    """Convert 0-23 hour to 3-hour bucket index (0-7)."""
    return min(hour // 3, 7)


# ── Device / action vocabulary ──────────────────────────────

@dataclass
class DeviceVocab:
    """Dynamic vocabulary for devices and their control actions.

    Devices and actions are assigned incrementally as they appear.
    The vocabulary can be persisted to disk and loaded on restart.
    """

    device_to_id: dict[str, int] = field(default_factory=dict)
    action_to_id: dict[str, int] = field(default_factory=dict)
    _lock: threading.Lock = field(default_factory=threading.Lock, repr=False)

    # Reserve ID 0 for unknown/padding
    _next_device_id: int = 1
    _next_action_id: int = 1

    def get_device_id(self, device_type: str) -> int:
        """Return integer ID for a device type, creating one if new."""
        with self._lock:
            if device_type not in self.device_to_id:
                self.device_to_id[device_type] = self._next_device_id
                self._next_device_id += 1
                logger.debug(
                    "New device type: %s → %d",
                    device_type, self.device_to_id[device_type],
                )
            return self.device_to_id[device_type]

    def get_action_id(self, action: str) -> int:
        """Return integer ID for a device action, creating one if new."""
        with self._lock:
            if action not in self.action_to_id:
                self.action_to_id[action] = self._next_action_id
                self._next_action_id += 1
                logger.debug(
                    "New action: %s → %d",
                    action, self.action_to_id[action],
                )
            return self.action_to_id[action]

    @property
    def vocab_size(self) -> int:
        """Total vocabulary size (action vocab, used for model output)."""
        with self._lock:
            return max(self._next_action_id, 2)

    def save(self, path: Path) -> None:
        """Persist vocabulary to JSON."""
        with self._lock:
            data = {
                "device_to_id": self.device_to_id,
                "action_to_id": self.action_to_id,
                "next_device_id": self._next_device_id,
                "next_action_id": self._next_action_id,
            }
        path.parent.mkdir(parents=True, exist_ok=True)
        with open(path, "w") as f:
            json.dump(data, f, indent=2)
        logger.info("Vocabulary saved to %s (%d devices, %d actions)",
                     path, len(self.device_to_id), len(self.action_to_id))

    @classmethod
    def load(cls, path: Path) -> DeviceVocab:
        """Load vocabulary from JSON."""
        with open(path) as f:
            data = json.load(f)
        vocab = cls(
            device_to_id=data["device_to_id"],
            action_to_id=data["action_to_id"],
        )
        vocab._next_device_id = data["next_device_id"]
        vocab._next_action_id = data["next_action_id"]
        logger.info("Vocabulary loaded from %s (%d devices, %d actions)",
                     path, len(vocab.device_to_id), len(vocab.action_to_id))
        return vocab


# ── Pre-registered SmartThings device types ─────────────────
# These match the Samsung SmartThings capability names exposed
# through the Home Assistant SmartThings integration.

SMARTTHINGS_DEVICE_TYPES: list[str] = [
    "AirConditioner", "AirPurifier", "Blind", "Camera",
    "ContactSensor", "Dishwasher", "Dryer",
    "Fan", "GarageDoor", "Light", "Lock", "Microwave",
    "MotionSensor", "Oven", "PresenceSensor",
    "Refrigerator", "RobotCleaner", "SmartLock", "SmartPlug",
    "Switch", "Television", "Thermostat", "Washer",
    "WaterValve", "MediaPlayer", "Valve",
]

# Vision service event types (virtual device)
VISION_EVENT_TYPES: list[str] = [
    "fall_detected", "wandering", "erratic_movement",
    "prolonged_inactivity", "rapid_movement", "zone_transition",
    "unusual_posture", "night_wandering",
]

# Wearable health event types (virtual device)
HEALTH_EVENT_TYPES: list[str] = [
    "heart_rate_high", "heart_rate_low", "spo2_low",
    "activity_change", "sleep_stage_change",
]


def create_default_vocab() -> DeviceVocab:
    """Create a vocabulary pre-populated with known device/action types."""
    vocab = DeviceVocab()

    # Pre-register SmartThings device types
    for dt in SMARTTHINGS_DEVICE_TYPES:
        vocab.get_device_id(dt)

    # Pre-register virtual devices
    vocab.get_device_id("VisionSensor")
    vocab.get_device_id("HealthSensor")

    # Pre-register common SmartThings actions
    common_actions = [
        "switch on", "switch off", "switch toggle",
        "setLevel", "setColor", "setColorTemperature",
        "lock lock", "lock unlock",
        "valve open", "valve close",
        "open", "close",
        "setMode", "setCoolingSetpoint", "setHeatingSetpoint",
        "setFanMode", "setVolume", "mute", "unmute",
        "play", "pause", "stop",
        "setChannel", "setInputSource",
        "refresh", "notification",
        "setMachineState run", "setMachineState stop",
        "setMachineState pause",
    ]
    for action in common_actions:
        vocab.get_action_id(action)

    # Pre-register vision events as actions
    for evt in VISION_EVENT_TYPES:
        vocab.get_action_id(evt)

    # Pre-register health events as actions
    for evt in HEALTH_EVENT_TYPES:
        vocab.get_action_id(evt)

    return vocab
