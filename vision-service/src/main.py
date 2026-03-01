"""ETMS Vision Service - Main pipeline orchestrator.

Connects all components:
  Camera → YOLO Detection → Person Tracking → Behavior Analysis → MQTT

Usage:
    python -m src.main
    python -m src.main --config config/settings.yaml
    python -m src.main --camera 0 --no-display
"""

from __future__ import annotations

import argparse
import logging
import signal
import sys
import time

import cv2
import numpy as np

from src.behavior import BehaviorAnalyzer
from src.detection import YOLODetector
from src.mqtt_client import VisionMQTTPublisher
from src.tracking import PersonTracker
from src.utils.config import load_config

logger = logging.getLogger("etms.vision")


class VisionPipeline:
    """Main vision processing pipeline.

    Orchestrates the full flow from camera capture through
    detection, tracking, behavior analysis, and MQTT publishing.
    """

    def __init__(self, config_path: str = "config/settings.yaml") -> None:
        """Initialize the vision pipeline.

        Args:
            config_path: Path to YAML configuration file.

        """
        self.config = load_config(config_path)
        self.running = False

        # Initialize components
        self.detector = YOLODetector(self.config.detection, self.config.pose)
        self.tracker = PersonTracker(self.config.tracking)
        self.analyzer = BehaviorAnalyzer(self.config.behavior)
        self.mqtt = VisionMQTTPublisher(self.config.mqtt)

        # Camera
        self.cap: cv2.VideoCapture | None = None

        # Stats
        self._frame_count = 0
        self._start_time = 0.0
        self._last_movement_publish = 0.0
        self._movement_publish_interval = 5.0  # publish movement every 5 seconds

    def start(self) -> None:
        """Start the vision pipeline."""
        logger.info("=" * 60)
        logger.info("ETMS Vision Service Starting")
        logger.info("=" * 60)

        # Load YOLO models
        logger.info("Step 1/4: Loading YOLO models...")
        self.detector.load_models()

        # Connect MQTT
        logger.info("Step 2/4: Connecting to MQTT broker...")
        self.mqtt.connect()
        time.sleep(1)  # allow connection to establish

        # Open camera
        logger.info("Step 3/4: Opening camera...")
        self._open_camera()

        # Start processing
        logger.info("Step 4/4: Starting inference loop...")
        self.running = True
        self._start_time = time.time()

        logger.info("=" * 60)
        logger.info("Vision Service is RUNNING")
        logger.info("Camera: %s", self.config.camera.source)
        logger.info("MQTT: %s:%d", self.config.mqtt.broker, self.config.mqtt.port)
        logger.info("Device ID: %s", self.config.mqtt.device_id)
        logger.info("Press Ctrl+C or 'q' to stop")
        logger.info("=" * 60)

        try:
            self._run_loop()
        except KeyboardInterrupt:
            logger.info("Keyboard interrupt received")
        finally:
            self.stop()

    def stop(self) -> None:
        """Stop the vision pipeline and clean up resources."""
        self.running = False

        if self.cap and self.cap.isOpened():
            self.cap.release()
            logger.info("Camera released")

        self.mqtt.disconnect()

        if self.config.debug.show_display:
            cv2.destroyAllWindows()

        elapsed = time.time() - self._start_time if self._start_time else 0
        avg_fps = self._frame_count / elapsed if elapsed > 0 else 0

        logger.info("=" * 60)
        logger.info("Vision Service Stopped")
        logger.info("Processed %d frames in %.1f seconds (%.1f FPS avg)",
                     self._frame_count, elapsed, avg_fps)
        logger.info("=" * 60)

    def _open_camera(self) -> None:
        """Open the camera source."""
        source = self.config.camera.source

        # Try to interpret source as int (webcam index) or string (url/path)
        if isinstance(source, str) and source.isdigit():
            source = int(source)

        self.cap = cv2.VideoCapture(source)

        if not self.cap.isOpened():
            logger.error("Failed to open camera: %s", self.config.camera.source)
            raise RuntimeError(f"Cannot open camera: {self.config.camera.source}")

        # Set camera properties
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, self.config.camera.width)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, self.config.camera.height)
        self.cap.set(cv2.CAP_PROP_FPS, self.config.camera.fps)

        actual_w = int(self.cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        actual_h = int(self.cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        actual_fps = self.cap.get(cv2.CAP_PROP_FPS)

        logger.info("Camera opened: %dx%d @ %.1f FPS", actual_w, actual_h, actual_fps)

    def _run_loop(self) -> None:
        """Main processing loop."""
        frame_skip = self.config.performance.frame_skip

        while self.running:
            ret, frame = self.cap.read()
            if not ret:
                logger.warning("Failed to read frame, retrying...")
                time.sleep(0.1)
                continue

            self._frame_count += 1

            # Skip frames for performance
            if frame_skip > 1 and self._frame_count % frame_skip != 0:
                continue

            # === PIPELINE ===

            # 1. Detect persons
            result = self.detector.detect(frame)

            # 2. Update tracker and get movement features
            features = self.tracker.update(result.detections, result.frame_id)

            # 3. Analyze behavior
            events = self.analyzer.analyze(features, result.detections)

            # 4. Publish events to MQTT
            for event in events:
                self.mqtt.publish_event(event)

            # 5. Publish person count
            self.mqtt.publish_person_count(self.tracker.active_count)

            # 6. Periodically publish movement data
            now = time.time()
            if now - self._last_movement_publish > self._movement_publish_interval:
                for pid, feat in features.items():
                    self.mqtt.publish_movement(pid, feat)
                self._last_movement_publish = now

            # === VISUALIZATION ===
            if self.config.debug.show_display:
                display_frame = self._draw_overlays(frame, result, features, events)
                cv2.imshow("ETMS Vision Service", display_frame)

                key = cv2.waitKey(1) & 0xFF
                if key == ord("q"):
                    logger.info("Quit key pressed")
                    break
                elif key == ord("s"):
                    # Save screenshot
                    filename = f"screenshot_{self._frame_count}.jpg"
                    cv2.imwrite(filename, display_frame)
                    logger.info("Screenshot saved: %s", filename)

    def _draw_overlays(
        self,
        frame: np.ndarray,
        result,
        features: dict,
        events: list,
    ) -> np.ndarray:
        """Draw visualization overlays on the frame."""
        display = frame.copy()

        # Draw zone boundaries
        if self.config.debug.draw_zones:
            for name, zone in self.analyzer.zone_manager.get_zone_polygons().items():
                pts = np.array(zone["points"], dtype=np.int32)
                color = (0, 0, 255) if zone["type"] == "restricted" else (0, 255, 0)
                cv2.polylines(display, [pts], True, color, 2)
                if len(pts) > 0:
                    cv2.putText(
                        display, name, tuple(pts[0]),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1,
                    )

        # Draw detections
        for det in result.detections:
            if self.config.debug.draw_boxes and len(det.bbox) == 4:
                x1, y1, x2, y2 = [int(v) for v in det.bbox]
                cv2.rectangle(display, (x1, y1), (x2, y2), (0, 255, 0), 2)

                # Person ID label
                label = f"ID:{det.person_id} ({det.confidence:.2f})"
                cv2.putText(
                    display, label, (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2,
                )

            # Draw movement trails
            if self.config.debug.draw_trails and det.person_id >= 0:
                trail = self.tracker.get_trail(det.person_id)
                if len(trail) > 1:
                    for i in range(1, len(trail)):
                        thickness = max(1, int(i / len(trail) * 3))
                        cv2.line(
                            display, trail[i - 1], trail[i],
                            (255, 200, 0), thickness,
                        )

            # Draw pose skeleton
            if self.config.debug.draw_pose and det.keypoints is not None:
                self._draw_skeleton(display, det.keypoints)

        # Draw feature info
        for pid, feat in features.items():
            x, y = int(feat.current_position[0]), int(feat.current_position[1])
            info_lines = [
                f"Spd: {feat.speed:.0f} px/s",
                f"Ent: {feat.movement_entropy:.2f}",
                f"Loops: {feat.loop_count}",
            ]
            for i, line in enumerate(info_lines):
                cv2.putText(
                    display, line, (x + 5, y + 20 + i * 15),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 255, 255), 1,
                )

        # Draw events
        for i, event in enumerate(events):
            color = {
                "critical": (0, 0, 255),
                "warning": (0, 165, 255),
                "info": (255, 255, 0),
            }.get(event.severity, (255, 255, 255))

            text = f"[{event.severity.upper()}] {event.event_type.value} (P{event.person_id})"
            cv2.putText(
                display, text, (10, 30 + i * 25),
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2,
            )

        # Draw stats bar
        elapsed = time.time() - self._start_time if self._start_time else 1
        fps = self._frame_count / elapsed
        stats = (
            f"FPS: {fps:.1f} | "
            f"Persons: {self.tracker.active_count} | "
            f"MQTT: {'ON' if self.mqtt.is_connected else 'OFF'} | "
            f"Frame: {self._frame_count}"
        )
        cv2.putText(
            display, stats, (10, display.shape[0] - 10),
            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (200, 200, 200), 1,
        )

        return display

    @staticmethod
    def _draw_skeleton(frame: np.ndarray, keypoints: np.ndarray) -> None:
        """Draw pose skeleton on frame."""
        # COCO connections
        connections = [
            (0, 1), (0, 2), (1, 3), (2, 4),     # head
            (5, 6),                               # shoulders
            (5, 7), (7, 9),                       # left arm
            (6, 8), (8, 10),                      # right arm
            (5, 11), (6, 12),                     # torso
            (11, 12),                             # hips
            (11, 13), (13, 15),                   # left leg
            (12, 14), (14, 16),                   # right leg
        ]

        for i, (x, y, conf) in enumerate(keypoints):
            if conf > 0.3:
                cv2.circle(frame, (int(x), int(y)), 3, (0, 255, 255), -1)

        for start, end in connections:
            if (
                start < len(keypoints)
                and end < len(keypoints)
                and keypoints[start][2] > 0.3
                and keypoints[end][2] > 0.3
            ):
                pt1 = (int(keypoints[start][0]), int(keypoints[start][1]))
                pt2 = (int(keypoints[end][0]), int(keypoints[end][1]))
                cv2.line(frame, pt1, pt2, (0, 255, 255), 2)


def setup_logging(level: str = "INFO") -> None:
    """Configure logging for the vision service."""
    logging.basicConfig(
        level=getattr(logging, level.upper(), logging.INFO),
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )


def main() -> None:
    """Entry point for the vision service."""
    parser = argparse.ArgumentParser(description="ETMS Vision Service")
    parser.add_argument(
        "--config", default="config/settings.yaml",
        help="Path to configuration file",
    )
    parser.add_argument(
        "--camera", default=None,
        help="Override camera source (0 for webcam, or RTSP URL)",
    )
    parser.add_argument(
        "--no-display", action="store_true",
        help="Disable visualization window (headless mode)",
    )
    parser.add_argument(
        "--log-level", default="INFO",
        choices=["DEBUG", "INFO", "WARNING", "ERROR"],
        help="Logging level",
    )
    args = parser.parse_args()

    setup_logging(args.log_level)

    pipeline = VisionPipeline(args.config)

    # Apply CLI overrides
    if args.camera is not None:
        pipeline.config.camera.source = args.camera
    if args.no_display:
        pipeline.config.debug.show_display = False

    # Handle graceful shutdown
    def signal_handler(sig, frame):
        logger.info("Signal %s received, shutting down...", sig)
        pipeline.running = False

    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    pipeline.start()


if __name__ == "__main__":
    main()
