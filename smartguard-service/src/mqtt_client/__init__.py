"""MQTT client for SmartGuard ETMS integration.

Subscribes to Home Assistant, SmartThings, and vision-service
topics, routes incoming events through the EventParser → Assembler
→ InferenceEngine pipeline, and publishes anomaly results and
service status back to MQTT.
"""

from __future__ import annotations

import json
import logging
import threading
import time
from typing import Any

import paho.mqtt.client as mqtt

from src.assembler.event_parser import EventParser
from src.inference import AnomalyResult, InferenceEngine

logger = logging.getLogger(__name__)


class SmartGuardMQTT:
    """Manages MQTT lifecycle for the SmartGuard service.

    Args:
        engine: Fully initialised InferenceEngine.
        parser: EventParser wired to the engine's assembler.
        broker: MQTT broker hostname.
        port: MQTT broker port.
        username: MQTT username.
        password: MQTT password.
        client_id: MQTT client ID.
        subscribe_topics: List of topic filter strings.
        publish_prefix: Base topic for outbound messages.
        flush_interval: Seconds between automatic flush cycles.

    """

    def __init__(
        self,
        engine: InferenceEngine,
        parser: EventParser,
        broker: str = "localhost",
        port: int = 1883,
        username: str | None = None,
        password: str | None = None,
        client_id: str = "smartguard-service",
        subscribe_topics: list[str] | None = None,
        publish_prefix: str = "etms/smartguard",
        flush_interval: float = 30.0,
    ) -> None:
        self.engine = engine
        self.parser = parser
        self.broker = broker
        self.port = port
        self.publish_prefix = publish_prefix
        self.flush_interval = flush_interval
        self._subscribe_topics = subscribe_topics or [
            "homeassistant/+/+/state",
            "etms/smartthings/+/event",
            "etms/vision/+/event",
            "etms/vision/+/movement",
            "etms/health/+/alert",
        ]

        self._client = mqtt.Client(
            client_id=client_id,
            callback_api_version=mqtt.CallbackAPIVersion.VERSION2,
        )
        if username:
            self._client.username_pw_set(username, password)

        # Last-Will for offline status
        self._client.will_set(
            f"{self.publish_prefix}/status",
            payload=json.dumps({"status": "offline"}),
            qos=1,
            retain=True,
        )

        self._client.on_connect = self._on_connect
        self._client.on_message = self._on_message
        self._client.on_disconnect = self._on_disconnect

        self._running = False
        self._flush_thread: threading.Thread | None = None
        self._event_count = 0
        self._last_publish: float = 0.0

    # ── MQTT callbacks ──────────────────────────────────────

    def _on_connect(
        self,
        client: mqtt.Client,
        userdata: Any,
        flags: Any,
        rc: int | mqtt.ReasonCode,
        properties: Any = None,
    ) -> None:
        """Handle connection — subscribe and publish online status."""
        rc_val = rc if isinstance(rc, int) else rc.value
        if rc_val == 0:
            logger.info("Connected to MQTT broker %s:%d", self.broker, self.port)
            for topic in self._subscribe_topics:
                client.subscribe(topic, qos=1)
                logger.debug("Subscribed to %s", topic)

            self._publish_status("online")
        else:
            logger.error("MQTT connection failed with code %s", rc)

    def _on_disconnect(
        self,
        client: mqtt.Client,
        userdata: Any,
        flags: Any = None,
        rc: int | mqtt.ReasonCode = 0,
        properties: Any = None,
    ) -> None:
        """Handle disconnection."""
        logger.warning("Disconnected from MQTT broker (rc=%s)", rc)

    def _on_message(
        self,
        client: mqtt.Client,
        userdata: Any,
        msg: mqtt.MQTTMessage,
    ) -> None:
        """Process incoming MQTT message."""
        try:
            self.parser.route_message(msg.topic, msg.payload.decode("utf-8"))
            self._event_count += 1

            # Real-time evaluation after each event
            result = self.engine.evaluate_latest()
            if result and result.is_anomaly:
                self._publish_anomaly(result)
        except Exception:
            logger.exception("Error processing message on %s", msg.topic)

    # ── Publishing ──────────────────────────────────────────

    def _publish_anomaly(self, result: AnomalyResult) -> None:
        """Publish anomaly detection result to MQTT."""
        payload = {
            "timestamp": result.timestamp,
            "anomaly_score": result.anomaly_score,
            "is_anomaly": result.is_anomaly,
            "severity": result.severity,
            "per_event_loss": result.per_event_loss,
            "threshold": result.threshold,
            "sequence_id": result.sequence_id,
            "event_count": result.event_count,
        }
        topic = f"{self.publish_prefix}/anomaly"
        self._client.publish(topic, json.dumps(payload), qos=1)
        logger.info(
            "Published anomaly: score=%.4f severity=%s",
            result.anomaly_score, result.severity,
        )

    def _publish_status(self, status: str = "online") -> None:
        """Publish service status to MQTT."""
        engine_status = self.engine.get_status()
        payload = {
            "status": status,
            "events_received": self._event_count,
            **engine_status,
        }
        topic = f"{self.publish_prefix}/status"
        self._client.publish(
            topic, json.dumps(payload), qos=1, retain=True,
        )

    def _publish_batch_results(
        self, results: list[AnomalyResult],
    ) -> None:
        """Publish batch evaluation summary."""
        anomalies = [r for r in results if r.is_anomaly]
        payload = {
            "timestamp": time.time(),
            "sequences_evaluated": len(results),
            "anomalies_found": len(anomalies),
            "scores": [r.anomaly_score for r in results],
        }
        if anomalies:
            payload["worst_score"] = max(a.anomaly_score for a in anomalies)
            payload["worst_severity"] = max(
                anomalies, key=lambda a: a.anomaly_score,
            ).severity

        topic = f"{self.publish_prefix}/batch"
        self._client.publish(topic, json.dumps(payload), qos=1)

    # ── Flush loop ──────────────────────────────────────────

    def _flush_loop(self) -> None:
        """Background thread: periodically flush and evaluate."""
        while self._running:
            time.sleep(self.flush_interval)
            if not self._running:
                break

            try:
                results = self.engine.flush_and_evaluate()
                if results:
                    for r in results:
                        if r.is_anomaly:
                            self._publish_anomaly(r)
                    self._publish_batch_results(results)

                # Periodic status update
                self._publish_status("online")
            except Exception:
                logger.exception("Error in flush loop")

    # ── Lifecycle ───────────────────────────────────────────

    def start(self) -> None:
        """Connect to broker and start processing loop."""
        logger.info(
            "Starting SmartGuard MQTT client → %s:%d",
            self.broker, self.port,
        )
        self._running = True
        self._client.connect(self.broker, self.port, keepalive=60)

        # Background flush thread
        self._flush_thread = threading.Thread(
            target=self._flush_loop,
            name="smartguard-flush",
            daemon=True,
        )
        self._flush_thread.start()

        # Blocking network loop
        self._client.loop_forever()

    def start_background(self) -> None:
        """Start MQTT in background (non-blocking)."""
        self._running = True
        self._client.connect(self.broker, self.port, keepalive=60)

        self._flush_thread = threading.Thread(
            target=self._flush_loop,
            name="smartguard-flush",
            daemon=True,
        )
        self._flush_thread.start()
        self._client.loop_start()

    def stop(self) -> None:
        """Disconnect and stop all threads."""
        logger.info("Stopping SmartGuard MQTT client")
        self._running = False
        self._publish_status("offline")
        self._client.disconnect()
        self._client.loop_stop()
        if self._flush_thread and self._flush_thread.is_alive():
            self._flush_thread.join(timeout=5)
        logger.info("SmartGuard MQTT client stopped")
