"""HA / SmartThings event parser — translates MQTT messages to behavior events.

Subscribes to Home Assistant state changes and SmartThings events,
parses them, and feeds them into the SequenceAssembler.
"""

from __future__ import annotations

import json
import logging
import re
from typing import Any

from src.assembler.pipeline import SequenceAssembler

logger = logging.getLogger(__name__)

# ── Entity ID → device type mapping ────────────────────────
# Maps HA domain prefixes to SmartGuard device types.

_DOMAIN_TO_DEVICE: dict[str, str] = {
    "light": "Light",
    "switch": "Switch",
    "lock": "SmartLock",
    "cover": "Blind",
    "climate": "AirConditioner",
    "fan": "Fan",
    "media_player": "Television",
    "vacuum": "RobotCleaner",
    "valve": "WaterValve",
    "binary_sensor": "ContactSensor",
    "sensor": "PresenceSensor",
    "camera": "Camera",
    "water_heater": "Thermostat",
    "number": "SmartPlug",
    "select": "SmartPlug",
    "scene": "Switch",
}

# ── SmartThings-specific capability → action mapping ───────

_CAPABILITY_ACTIONS: dict[str, dict[str, str]] = {
    "switch": {"on": "switch on", "off": "switch off"},
    "lock": {"locked": "lock lock", "unlocked": "lock unlock"},
    "valve": {"open": "valve open", "closed": "valve close"},
    "doorControl": {"open": "open", "closed": "close"},
    "windowShade": {"open": "open", "closed": "close"},
    "motionSensor": {"active": "motion detected", "inactive": "motion cleared"},
    "contactSensor": {"open": "contact open", "closed": "contact closed"},
    "presenceSensor": {"present": "presence arrived", "not present": "presence left"},
}


def _extract_domain(entity_id: str) -> str:
    """Extract HA domain from entity_id (e.g., 'light.kitchen' → 'light')."""
    return entity_id.split(".")[0] if "." in entity_id else ""


def _entity_to_device_type(entity_id: str) -> str:
    """Map an HA entity ID to a SmartGuard device type."""
    domain = _extract_domain(entity_id)
    return _DOMAIN_TO_DEVICE.get(domain, "SmartPlug")


def _state_to_action(entity_id: str, state: str, attributes: dict[str, Any] | None = None) -> str:
    """Derive a SmartGuard action string from state change."""
    domain = _extract_domain(entity_id)

    # Direct capability mapping
    if domain in _CAPABILITY_ACTIONS:
        cap_map = _CAPABILITY_ACTIONS[domain]
        if state in cap_map:
            return cap_map[state]

    # Generic on/off
    if state in ("on", "off"):
        return f"switch {state}"

    # Numeric states with context
    if attributes:
        if "brightness" in attributes:
            return "setLevel"
        if "color_temp" in attributes:
            return "setColorTemperature"
        if "temperature" in attributes:
            return "setCoolingSetpoint"

    # Default: use the state value as-is
    return state


class EventParser:
    """Parses incoming MQTT messages and feeds the SequenceAssembler."""

    def __init__(self, assembler: SequenceAssembler) -> None:
        self.assembler = assembler

    def parse_ha_state_change(
        self,
        topic: str,
        payload: dict[str, Any],
    ) -> None:
        """Parse a Home Assistant state change from MQTT.

        Expected topic format: homeassistant/{domain}/{object_id}/state
        Expected payload: {"entity_id": "...", "state": "...", "attributes": {...}}
        """
        entity_id = payload.get("entity_id", "")
        new_state = payload.get("state", "")

        if not entity_id or not new_state:
            return

        # Skip unavailable / unknown states
        if new_state in ("unavailable", "unknown", ""):
            return

        device_type = _entity_to_device_type(entity_id)
        action = _state_to_action(
            entity_id, new_state, payload.get("attributes"),
        )
        device_name = payload.get("attributes", {}).get(
            "friendly_name", entity_id,
        )

        self.assembler.add_event(
            device_type=device_type,
            action=action,
            source="smartthings",
            device_name=device_name,
        )

    def parse_smartthings_event(
        self,
        topic: str,
        payload: dict[str, Any],
    ) -> None:
        """Parse a SmartThings device event.

        Expected topic: etms/smartthings/{device_id}/event
        Expected payload: {
            "device_type": "Light",
            "capability": "switch",
            "attribute": "switch",
            "value": "on",
            "device_name": "Living Room Light"
        }
        """
        device_type = payload.get("device_type", "SmartPlug")
        capability = payload.get("capability", "")
        value = payload.get("value", "")
        device_name = payload.get("device_name", "")

        # Use capability-based mapping if available
        if capability in _CAPABILITY_ACTIONS:
            action = _CAPABILITY_ACTIONS[capability].get(value, value)
        else:
            action = f"{capability} {value}" if capability else value

        self.assembler.add_event(
            device_type=device_type,
            action=action,
            source="smartthings",
            device_name=device_name,
        )

    def parse_vision_event(
        self,
        topic: str,
        payload: dict[str, Any],
    ) -> None:
        """Parse a vision service event.

        Expected topic: etms/vision/{camera_id}/event
        Expected payload: {"event": "fall_detected", "severity": "high", ...}
        """
        event_type = payload.get("event", "")
        if not event_type:
            return

        # Extract camera name from topic
        parts = topic.split("/")
        camera_name = parts[2] if len(parts) > 2 else "unknown_camera"

        self.assembler.add_event(
            device_type="VisionSensor",
            action=event_type,
            source="vision",
            device_name=camera_name,
        )

    def parse_vision_movement(
        self,
        topic: str,
        payload: dict[str, Any],
    ) -> None:
        """Parse vision movement data (zone transitions, stationary alerts).

        We only create events for significant movement changes,
        not every frame update.
        """
        zone = payload.get("zone", "")
        time_stationary = payload.get("time_stationary", 0)
        speed = payload.get("speed", 0)

        # Zone transition is a meaningful event
        if zone:
            self.assembler.add_event(
                device_type="VisionSensor",
                action="zone_transition",
                source="vision",
                device_name=f"zone_{zone}",
            )

    def parse_health_alert(
        self,
        topic: str,
        payload: dict[str, Any],
    ) -> None:
        """Parse wearable health alerts."""
        alert_type = payload.get("alert_type", "")
        if not alert_type:
            return

        self.assembler.add_event(
            device_type="HealthSensor",
            action=alert_type,
            source="wearable",
            device_name="smartwatch",
        )

    def route_message(self, topic: str, payload_str: str) -> None:
        """Route an incoming MQTT message to the correct parser.

        This is the main entry point called by the MQTT subscriber.
        """
        try:
            payload = json.loads(payload_str)
        except (json.JSONDecodeError, TypeError):
            logger.warning("Invalid JSON on topic %s", topic)
            return

        if topic.startswith("homeassistant/"):
            self.parse_ha_state_change(topic, payload)
        elif topic.startswith("etms/smartthings/"):
            self.parse_smartthings_event(topic, payload)
        elif "/event" in topic and "vision" in topic:
            self.parse_vision_event(topic, payload)
        elif "/movement" in topic and "vision" in topic:
            self.parse_vision_movement(topic, payload)
        elif "health" in topic or "wearable" in topic:
            self.parse_health_alert(topic, payload)
        else:
            logger.debug("Unrouted topic: %s", topic)
