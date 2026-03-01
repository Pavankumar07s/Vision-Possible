"""MQTT publisher for ETMS Vision Service.

Publishes behavioral events and health metrics to the
central MQTT broker for consumption by the AI fusion engine
and Home Assistant automations.

Privacy-first: only metadata is published, never raw images.
"""

from __future__ import annotations

import json
import logging
import time
from collections.abc import Callable
from typing import Any

import paho.mqtt.client as mqtt

from src.behavior import BehaviorEvent
from src.tracking import MovementFeatures
from src.utils.config import MQTTConfig

logger = logging.getLogger(__name__)


class VisionMQTTPublisher:
    """Publishes vision analysis events to MQTT broker.

    Handles connection management, reconnection, and structured
    message publishing for behavioral events.
    """

    def __init__(self, config: MQTTConfig) -> None:
        """Initialize the MQTT publisher.

        Args:
            config: MQTT broker configuration.

        """
        self.config = config
        self.client: mqtt.Client | None = None
        self._connected = False
        self._message_count = 0
        self._subscriptions: dict[str, Callable[[str, dict], None]] = {}

    def connect(self) -> None:
        """Connect to the MQTT broker."""
        self.client = mqtt.Client(
            client_id=f"etms_vision_{self.config.device_id}",
            callback_api_version=mqtt.CallbackAPIVersion.VERSION2,
        )

        if self.config.username:
            self.client.username_pw_set(
                self.config.username, self.config.password
            )

        self.client.on_connect = self._on_connect
        self.client.on_disconnect = self._on_disconnect
        self.client.on_message = self._on_message

        # Set last will for offline detection
        will_topic = f"{self.config.topic_prefix}/{self.config.device_id}/status"
        self.client.will_set(
            will_topic,
            payload=json.dumps({"status": "offline", "timestamp": time.time()}),
            qos=self.config.qos,
            retain=True,
        )

        try:
            self.client.connect(
                self.config.broker,
                self.config.port,
                self.config.keepalive,
            )
            self.client.loop_start()
            logger.info(
                "Connecting to MQTT broker at %s:%d",
                self.config.broker,
                self.config.port,
            )
        except Exception:
            logger.exception("Failed to connect to MQTT broker")

    def disconnect(self) -> None:
        """Gracefully disconnect from MQTT broker."""
        if self.client:
            # Publish offline status
            self._publish_status("offline")
            self.client.loop_stop()
            self.client.disconnect()
            self._connected = False
            logger.info("Disconnected from MQTT broker")

    def publish_event(self, event: BehaviorEvent) -> None:
        """Publish a behavioral event to MQTT.

        Args:
            event: The behavioral event to publish.

        """
        if not self._connected or not self.client:
            logger.warning("Not connected to MQTT, dropping event: %s", event.event_type)
            return

        topic = (
            f"{self.config.topic_prefix}/{self.config.device_id}/event"
        )

        payload = {
            "device_id": self.config.device_id,
            **event.to_dict(),
        }

        self._publish(topic, payload)
        self._message_count += 1

        logger.info(
            "Published event: %s (person %d, confidence %.2f, severity %s)",
            event.event_type.value,
            event.person_id,
            event.confidence,
            event.severity,
        )

    def publish_movement(
        self, person_id: int, features: MovementFeatures
    ) -> None:
        """Publish movement metrics for a tracked person.

        Published periodically for the fusion engine to correlate
        with other sensor data.

        Args:
            person_id: Person tracker ID.
            features: Current movement features.

        """
        if not self._connected or not self.client:
            return

        topic = (
            f"{self.config.topic_prefix}/{self.config.device_id}/movement"
        )

        payload = {
            "device_id": self.config.device_id,
            "person_id": person_id,
            "position": list(features.current_position),
            "speed": round(features.speed, 2),
            "direction": round(features.direction, 1),
            "path_length": round(features.path_length, 1),
            "movement_entropy": round(features.movement_entropy, 3),
            "time_stationary": round(features.time_stationary, 1),
            "zone": features.zone,
            "timestamp": time.time(),
        }

        self._publish(topic, payload)

    def publish_person_count(self, count: int) -> None:
        """Publish current person count in the camera view.

        Args:
            count: Number of persons detected.

        """
        if not self._connected or not self.client:
            return

        topic = (
            f"{self.config.topic_prefix}/{self.config.device_id}/person_count"
        )

        payload = {
            "device_id": self.config.device_id,
            "count": count,
            "timestamp": time.time(),
        }

        self._publish(topic, payload)

    def publish_device_status(
        self, device_id: str, status: str
    ) -> None:
        """Publish service status for a specific device.

        Used by multi-camera service to publish online/offline
        status for each camera independently.

        Args:
            device_id: Camera device ID.
            status: Status string ("online" or "offline").

        """
        if not self.client:
            return

        topic = f"{self.config.topic_prefix}/{device_id}/status"
        payload = {
            "device_id": device_id,
            "status": status,
            "messages_sent": self._message_count,
            "timestamp": time.time(),
        }

        self._publish(topic, payload, retain=True)

    def _publish_status(self, status: str) -> None:
        """Publish service status for the default device."""
        self.publish_device_status(self.config.device_id, status)

    def _publish(
        self, topic: str, payload: dict[str, Any], retain: bool = False
    ) -> None:
        """Publish a JSON payload to a topic."""
        if not self.client:
            return

        try:
            self.client.publish(
                topic,
                payload=json.dumps(payload),
                qos=self.config.qos,
                retain=retain,
            )
        except Exception:
            logger.exception("Failed to publish to %s", topic)

    def _on_connect(
        self,
        client: mqtt.Client,
        userdata: Any,
        flags: Any,
        rc: int | mqtt.ReasonCode,
        properties: Any = None,
    ) -> None:
        """Handle MQTT connection."""
        if isinstance(rc, int):
            code = rc
        else:
            code = rc.value

        if code == 0:
            self._connected = True
            logger.info("Connected to MQTT broker successfully")
            self._publish_status("online")
            # Re-subscribe to all registered topics
            for topic in self._subscriptions:
                if self.client:
                    self.client.subscribe(topic, qos=self.config.qos)
                    logger.info("Re-subscribed to %s", topic)
        else:
            self._connected = False
            logger.error("MQTT connection failed with code: %s", rc)

    def _on_disconnect(
        self,
        client: mqtt.Client,
        userdata: Any,
        flags: Any = None,
        rc: int | mqtt.ReasonCode | None = None,
        properties: Any = None,
    ) -> None:
        """Handle MQTT disconnection."""
        self._connected = False
        logger.warning("Disconnected from MQTT broker (rc=%s)", rc)

    def _on_message(
        self,
        client: mqtt.Client,
        userdata: Any,
        msg: mqtt.MQTTMessage,
    ) -> None:
        """Route incoming MQTT messages to registered callbacks."""
        topic = msg.topic
        try:
            payload = json.loads(msg.payload.decode())
        except (json.JSONDecodeError, UnicodeDecodeError):
            logger.warning("Invalid JSON on topic %s", topic)
            return

        callback = self._subscriptions.get(topic)
        if callback:
            try:
                callback(topic, payload)
            except Exception:
                logger.exception(
                    "Error in subscription callback for %s", topic,
                )

    def subscribe(
        self,
        topic: str,
        callback: Callable[[str, dict], None],
    ) -> None:
        """Subscribe to an MQTT topic with a callback.

        Args:
            topic: MQTT topic to subscribe to.
            callback: Function(topic, payload_dict) called on message.

        """
        self._subscriptions[topic] = callback
        if self.client and self._connected:
            self.client.subscribe(topic, qos=self.config.qos)
            logger.info("Subscribed to %s", topic)
        else:
            logger.info(
                "Registered subscription for %s (will subscribe on connect)",
                topic,
            )

    @property
    def is_connected(self) -> bool:
        """Check if connected to MQTT broker."""
        return self._connected
