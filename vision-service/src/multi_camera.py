"""Multi-camera pipeline orchestrator for ETMS Vision Service.

Runs one processing pipeline per camera in separate threads,
shares a single MQTT connection, and uses CrossCameraReID to
maintain person identity as they move between rooms.

Usage:
    python -m src.multi_camera
    python -m src.multi_camera --config config/settings.yaml
"""

from __future__ import annotations

import argparse
import logging
import os
import signal
import sys
import threading
import time
from collections import deque
from typing import Any

import cv2
import numpy as np

from src.behavior import BehaviorAnalyzer, BehaviorEvent
from src.detection import YOLODetector
from src.mqtt_client import VisionMQTTPublisher
from src.re_id import CrossCameraReID
from src.tracking import PersonTracker
from src.utils.config import (
    AppConfig,
    BehaviorConfig,
    CameraStreamConfig,
    ZoneConfig,
    load_config,
)

logger = logging.getLogger("etms.vision.multi")


class CameraPipeline:
    """Per-camera processing pipeline running in its own thread.

    Each camera has its own detector, tracker, and behavior analyzer.
    Events are pushed into a shared queue for MQTT publishing.
    """

    def __init__(
        self,
        cam_config: CameraStreamConfig,
        app_config: AppConfig,
        mqtt: VisionMQTTPublisher,
        re_id: CrossCameraReID,
    ) -> None:
        """Initialize pipeline for one camera.

        Args:
            cam_config: Per-camera configuration.
            app_config: Global application config.
            mqtt: Shared MQTT publisher.
            re_id: Shared cross-camera re-ID manager.

        """
        self.cam_config = cam_config
        self.app_config = app_config
        self.mqtt = mqtt
        self.re_id = re_id
        self.device_id = cam_config.device_id

        # Build a per-camera behavior config with this camera's zones
        behavior_cfg = BehaviorConfig(
            wandering=app_config.behavior.wandering,
            zones=cam_config.zones,
            erratic=app_config.behavior.erratic,
            inactivity=app_config.behavior.inactivity,
            gait=app_config.behavior.gait,
        )

        self.detector = YOLODetector(app_config.detection, app_config.pose)
        self.tracker = PersonTracker(app_config.tracking)
        self.analyzer = BehaviorAnalyzer(behavior_cfg)

        self.cap: cv2.VideoCapture | None = None
        self.running = False
        self._thread: threading.Thread | None = None
        self._frame_count = 0
        self._start_time = 0.0
        self._last_movement_publish = 0.0
        self._movement_interval = 5.0
        self._lock = threading.Lock()

        # Frame area for re-ID normalization
        self._frame_area = (
            cam_config.width * cam_config.height
        )

        # Latest rendered frame for main-thread display
        self._display_frame: np.ndarray | None = None

        # Frame buffer for video clip capture (10 seconds at target FPS)
        buffer_seconds = 10
        buffer_size = buffer_seconds * cam_config.fps
        self._frame_buffer: deque[np.ndarray] = deque(maxlen=buffer_size)
        self._buffer_fps = cam_config.fps

        # Periodic snapshot saving for Telegram integration
        self._snapshot_dir = "/tmp"
        self._last_snapshot_time = 0.0
        self._snapshot_interval = 2.0  # Save snapshot every 2 seconds

        # Track last-known bboxes and zones for re-ID signatures
        self._last_bboxes: dict[int, tuple[float, float, float, float]] = {}
        self._last_zones: dict[int, str] = {}
        # Previous set of local PIDs known to the tracker
        self._prev_tracked_pids: set[int] = set()

    def start(self) -> None:
        """Start the camera pipeline in a background thread."""
        self._thread = threading.Thread(
            target=self._run,
            name=f"cam-{self.device_id}",
            daemon=True,
        )
        self.running = True
        self._thread.start()
        logger.info("Camera pipeline started: %s", self.device_id)

    def stop(self) -> None:
        """Stop the camera pipeline."""
        self.running = False
        if self._thread and self._thread.is_alive():
            self._thread.join(timeout=5.0)
        if self.cap and self.cap.isOpened():
            self.cap.release()
        logger.info("Camera pipeline stopped: %s", self.device_id)

    def _run(self) -> None:
        """Main processing loop for this camera."""
        try:
            self._open_camera()
            self.detector.load_models()
            self._start_time = time.time()

            frame_skip = self.app_config.performance.frame_skip

            while self.running:
                ret, frame = self.cap.read()
                if not ret:
                    logger.warning(
                        "[%s] Failed to read frame, retrying...",
                        self.device_id,
                    )
                    time.sleep(0.1)
                    continue

                self._frame_count += 1
                if frame_skip > 1 and self._frame_count % frame_skip != 0:
                    continue

                self._process_frame(frame)

        except Exception:
            logger.exception(
                "Camera pipeline %s crashed", self.device_id
            )
        finally:
            if self.cap and self.cap.isOpened():
                self.cap.release()

    def _open_camera(self) -> None:
        """Open the camera source."""
        source = self.cam_config.source
        if isinstance(source, str) and source.isdigit():
            source = int(source)

        self.cap = cv2.VideoCapture(source)
        if not self.cap.isOpened():
            raise RuntimeError(
                f"Cannot open camera {self.device_id}: {source}"
            )

        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, self.cam_config.width)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, self.cam_config.height)
        self.cap.set(cv2.CAP_PROP_FPS, self.cam_config.fps)

        actual_w = int(self.cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        actual_h = int(self.cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        self._frame_area = actual_w * actual_h

        logger.info(
            "[%s] Camera opened: %dx%d",
            self.device_id, actual_w, actual_h,
        )

    def _process_frame(self, frame: np.ndarray) -> None:
        """Run detection → tracking → behavior → publish."""
        # 0. Buffer raw frame for clip capture & periodic snapshot
        self._frame_buffer.append(frame.copy())
        self._save_periodic_snapshot(frame)

        # 1. Detect
        result = self.detector.detect(frame)

        # 2. Track
        features = self.tracker.update(result.detections, result.frame_id)

        # 3. Map local IDs to global IDs via re-ID, store last-known bboxes
        global_features: dict[int, Any] = {}
        for local_pid, feat in features.items():
            det = next(
                (d for d in result.detections if d.person_id == local_pid),
                None,
            )
            bbox = tuple(det.bbox) if det and len(det.bbox) == 4 else None

            # Remember last bbox and zone for this person
            if bbox:
                self._last_bboxes[local_pid] = bbox
            self._last_zones[local_pid] = feat.zone

            gid = self.re_id.get_global_id(
                camera_id=self.device_id,
                local_pid=local_pid,
                bbox=bbox,
                frame_area=self._frame_area,
                zone=feat.zone,
            )
            feat.person_id = gid
            global_features[gid] = feat

        # 4. Detect tracks that the tracker just removed (expired)
        current_tracked_pids = set(self.tracker.tracks.keys())
        self._notify_lost_persons(current_tracked_pids)

        # 5. Behavior analysis
        events = self.analyzer.analyze(features, result.detections)

        # Update event person IDs to global
        for event in events:
            mapping = self.re_id.local_to_global.get(self.device_id, {})
            event.person_id = mapping.get(event.person_id, event.person_id)
            # Tag the event with camera info
            event.details["camera_id"] = self.device_id

        # 6. Publish
        self._publish_results(events, global_features)

        # 7. Prepare visualization frame (displayed by main thread)
        if self.app_config.debug.show_display:
            display = self._draw_overlays(frame, result, global_features, events)
            with self._lock:
                self._display_frame = display

    def _notify_lost_persons(self, current_pids: set[int]) -> None:
        """Detect persons that disappeared and notify re-ID.

        Compares the current set of tracker PIDs against the previous
        frame. Any PID that was tracked before but is now gone (removed
        by the tracker after max_lost_frames) is reported to re-ID so
        their appearance signature can be matched on adjacent cameras.
        """
        gone_pids = self._prev_tracked_pids - current_pids
        self._prev_tracked_pids = current_pids.copy()

        for pid in gone_pids:
            # Only report if we had a global mapping for this person
            mapping = self.re_id.local_to_global.get(self.device_id, {})
            if pid not in mapping:
                continue

            bbox = self._last_bboxes.pop(pid, None)
            zone = self._last_zones.pop(pid, "")

            self.re_id.person_lost(
                camera_id=self.device_id,
                local_pid=pid,
                bbox=bbox,
                frame_area=self._frame_area,
                zone=zone,
            )
            logger.debug(
                "[%s] Notified re-ID: local P%d lost (bbox=%s, zone=%s)",
                self.device_id, pid, bbox, zone,
            )

    def _publish_results(
        self, events: list[BehaviorEvent], features: dict
    ) -> None:
        """Publish events and movement data via MQTT."""
        # Override device_id in MQTT config temporarily for this camera
        original_device_id = self.mqtt.config.device_id

        with self._lock:
            self.mqtt.config.device_id = self.device_id

            for event in events:
                self.mqtt.publish_event(event)

            self.mqtt.publish_person_count(self.tracker.active_count)

            now = time.time()
            if now - self._last_movement_publish > self._movement_interval:
                for pid, feat in features.items():
                    self.mqtt.publish_movement(pid, feat)
                self._last_movement_publish = now

            self.mqtt.config.device_id = original_device_id

    def _draw_overlays(
        self,
        frame: np.ndarray,
        result: Any,
        features: dict,
        events: list[BehaviorEvent],
    ) -> np.ndarray:
        """Draw visualization overlays."""
        display = frame.copy()

        # Zones
        if self.app_config.debug.draw_zones:
            for name, zone in self.analyzer.zone_manager.get_zone_polygons().items():
                pts = np.array(zone["points"], dtype=np.int32)
                color = (
                    (0, 0, 255) if zone["type"] == "restricted"
                    else (0, 255, 0)
                )
                cv2.polylines(display, [pts], True, color, 2)
                if len(pts) > 0:
                    cv2.putText(
                        display, name, tuple(pts[0]),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1,
                    )

        # Detections
        for det in result.detections:
            if self.app_config.debug.draw_boxes and len(det.bbox) == 4:
                x1, y1, x2, y2 = [int(v) for v in det.bbox]
                cv2.rectangle(display, (x1, y1), (x2, y2), (0, 255, 0), 2)

                mapping = self.re_id.local_to_global.get(self.device_id, {})
                gid = mapping.get(det.person_id, det.person_id)
                label = f"G{gid} ({det.confidence:.2f})"
                cv2.putText(
                    display, label, (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2,
                )

            if self.app_config.debug.draw_trails and det.person_id >= 0:
                trail = self.tracker.get_trail(det.person_id)
                if len(trail) > 1:
                    for i in range(1, len(trail)):
                        thickness = max(1, int(i / len(trail) * 3))
                        cv2.line(
                            display, trail[i - 1], trail[i],
                            (255, 200, 0), thickness,
                        )

        # Camera label
        cv2.putText(
            display, self.device_id, (10, 20),
            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2,
        )

        # Stats
        elapsed = time.time() - self._start_time if self._start_time else 1
        fps = self._frame_count / elapsed
        stats = (
            f"FPS: {fps:.1f} | "
            f"Persons: {self.tracker.active_count} | "
            f"Global: {self.re_id.active_global_count}"
        )
        cv2.putText(
            display, stats, (10, display.shape[0] - 10),
            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (200, 200, 200), 1,
        )

        return display

    @property
    def fps(self) -> float:
        """Current frames per second."""
        elapsed = time.time() - self._start_time if self._start_time else 1
        return self._frame_count / elapsed

    def _save_periodic_snapshot(self, frame: np.ndarray) -> None:
        """Save a snapshot to /tmp for external consumers (OpenClaw).

        Rate-limited to one save every ``_snapshot_interval`` seconds.
        """
        now = time.time()
        if now - self._last_snapshot_time < self._snapshot_interval:
            return

        path = os.path.join(
            self._snapshot_dir,
            f"etms_latest_{self.device_id}.jpg",
        )
        try:
            cv2.imwrite(path, frame)
            self._last_snapshot_time = now
        except Exception:
            logger.exception(
                "[%s] Failed to save snapshot to %s",
                self.device_id, path,
            )

    def save_clip(
        self,
        duration_seconds: float = 5.0,
        output_path: str | None = None,
    ) -> str | None:
        """Write buffered frames as an MP4 video clip.

        Args:
            duration_seconds: How many seconds of recent footage to save.
            output_path: Destination file path. Auto-generated if None.

        Returns:
            Path to the saved clip, or None on failure.

        """
        frames_needed = int(duration_seconds * self._buffer_fps)
        buffered = list(self._frame_buffer)
        if not buffered:
            logger.warning(
                "[%s] No frames in buffer for clip", self.device_id,
            )
            return None

        # Take the last N frames
        clip_frames = buffered[-frames_needed:]

        if output_path is None:
            output_path = os.path.join(
                self._snapshot_dir,
                f"etms_clip_{self.device_id}_{int(time.time())}.mp4",
            )

        h, w = clip_frames[0].shape[:2]
        fourcc = cv2.VideoWriter.fourcc(*"mp4v")
        writer = cv2.VideoWriter(
            output_path, fourcc, self._buffer_fps, (w, h),
        )
        if not writer.isOpened():
            logger.error(
                "[%s] Cannot open VideoWriter for %s",
                self.device_id, output_path,
            )
            return None

        for f in clip_frames:
            writer.write(f)
        writer.release()

        logger.info(
            "[%s] Saved %d-frame clip (%.1fs) to %s",
            self.device_id, len(clip_frames),
            len(clip_frames) / self._buffer_fps, output_path,
        )
        return output_path

    def get_latest_frame(self) -> np.ndarray | None:
        """Return a copy of the latest display frame (thread-safe)."""
        with self._lock:
            if self._display_frame is not None:
                return self._display_frame.copy()
        return None


class MultiCameraService:
    """Orchestrates multiple camera pipelines.

    Manages startup/shutdown of all camera pipelines, shares a
    single MQTT connection and CrossCameraReID instance.
    """

    def __init__(self, config_path: str = "config/settings.yaml") -> None:
        """Initialize the multi-camera service.

        Args:
            config_path: Path to settings.yaml.

        """
        self.config = load_config(config_path)
        self.running = False

        # Shared MQTT publisher
        self.mqtt = VisionMQTTPublisher(self.config.mqtt)

        # Build adjacency map from camera configs
        adjacency: dict[str, list[str]] = {}
        for cam in self.config.cameras:
            adjacency[cam.device_id] = cam.adjacent_cameras

        # Shared re-ID engine
        self.re_id = CrossCameraReID(self.config.re_id, adjacency)

        # Per-camera pipelines
        self.pipelines: list[CameraPipeline] = []
        for cam in self.config.cameras:
            self.re_id.register_camera(cam.device_id)
            pipeline = CameraPipeline(
                cam_config=cam,
                app_config=self.config,
                mqtt=self.mqtt,
                re_id=self.re_id,
            )
            self.pipelines.append(pipeline)

    def start(self) -> None:
        """Start all camera pipelines."""
        logger.info("=" * 60)
        logger.info("ETMS Multi-Camera Vision Service Starting")
        logger.info("Cameras: %d", len(self.pipelines))
        for p in self.pipelines:
            logger.info(
                "  • %s — source: %s",
                p.device_id, p.cam_config.source,
            )
        logger.info("=" * 60)

        # Connect MQTT (single shared connection)
        self.mqtt.connect()
        time.sleep(1)

        # Subscribe to clip request topic from OpenClaw
        self.mqtt.subscribe(
            "etms/vision/clip_request",
            self._handle_clip_request,
        )

        # Publish online status for ALL cameras
        for p in self.pipelines:
            self.mqtt.publish_device_status(p.device_id, "online")
            logger.info("Published online status for %s", p.device_id)

        # Start each camera pipeline
        self.running = True
        for pipeline in self.pipelines:
            pipeline.start()

        logger.info("All camera pipelines running.")

        # Main thread: handle visualization and cleanup
        try:
            self._main_loop()
        except KeyboardInterrupt:
            logger.info("Keyboard interrupt received")
        finally:
            self.stop()

    def stop(self) -> None:
        """Stop all pipelines and clean up."""
        self.running = False
        for pipeline in self.pipelines:
            pipeline.stop()

        # Publish offline status for ALL cameras before disconnecting
        for p in self.pipelines:
            self.mqtt.publish_device_status(p.device_id, "offline")

        self.mqtt.disconnect()

        if self.config.debug.show_display:
            cv2.destroyAllWindows()

        logger.info("=" * 60)
        logger.info("Multi-Camera Vision Service Stopped")
        for p in self.pipelines:
            logger.info(
                "  %s: %d frames (%.1f FPS)",
                p.device_id, p._frame_count, p.fps,
            )
        logger.info(
            "Cross-camera re-ID: %s", self.re_id.get_summary()
        )
        logger.info("=" * 60)

    def _handle_clip_request(
        self, topic: str, payload: dict[str, Any],
    ) -> None:
        """Handle an incoming clip request from OpenClaw.

        Expected payload::

            {
                "camera_id": "room_1_camera",
                "duration_seconds": 5,
                "incident_id": "..."
            }

        Saves a clip and publishes the path back on
        ``etms/vision/{camera_id}/clip_ready``.
        """
        camera_id = payload.get("camera_id", "")
        duration = payload.get("duration_seconds", 5)
        incident_id = payload.get("incident_id", "unknown")

        pipeline = next(
            (p for p in self.pipelines if p.device_id == camera_id),
            None,
        )
        if not pipeline:
            logger.warning(
                "Clip request for unknown camera: %s", camera_id,
            )
            return

        logger.info(
            "Clip request: camera=%s duration=%.1fs incident=%s",
            camera_id, duration, incident_id,
        )

        # Save clip in a background thread to avoid blocking MQTT loop
        def _do_clip() -> None:
            clip_path = pipeline.save_clip(
                duration_seconds=duration,
            )
            if clip_path:
                resp_topic = f"etms/vision/{camera_id}/clip_ready"
                self.mqtt._publish(resp_topic, {
                    "camera_id": camera_id,
                    "incident_id": incident_id,
                    "clip_path": clip_path,
                    "duration_seconds": duration,
                    "timestamp": time.time(),
                })
                logger.info(
                    "Clip ready: %s → %s", camera_id, clip_path,
                )

        threading.Thread(
            target=_do_clip, daemon=True, name="clip-save",
        ).start()

    def _main_loop(self) -> None:
        """Main thread loop for UI and periodic tasks."""
        cleanup_interval = 30.0
        status_interval = 60.0
        last_cleanup = time.time()
        last_status = time.time()

        while self.running:
            # Check all pipelines alive
            all_alive = all(
                p._thread and p._thread.is_alive()
                for p in self.pipelines
            )
            if not all_alive:
                dead = [
                    p.device_id for p in self.pipelines
                    if not p._thread or not p._thread.is_alive()
                ]
                logger.error("Camera pipelines died: %s", dead)

            # Periodic re-ID cleanup
            now = time.time()
            if now - last_cleanup > cleanup_interval:
                self.re_id.cleanup()
                last_cleanup = now

            # Periodic heartbeat status for all cameras
            if now - last_status > status_interval:
                for p in self.pipelines:
                    status = (
                        "online" if p._thread and p._thread.is_alive()
                        else "offline"
                    )
                    self.mqtt.publish_device_status(p.device_id, status)
                last_status = now

            # Display frames from all pipelines (must be main thread)
            if self.config.debug.show_display:
                for p in self.pipelines:
                    with p._lock:
                        frame = p._display_frame
                    if frame is not None:
                        cv2.imshow(f"ETMS - {p.device_id}", frame)

                key = cv2.waitKey(30) & 0xFF
                if key == ord("q") or key == 27:
                    logger.info("Quit key pressed")
                    break
            else:
                time.sleep(0.5)


def setup_logging(level: str = "INFO") -> None:
    """Configure logging."""
    logging.basicConfig(
        level=getattr(logging, level.upper(), logging.INFO),
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )


def main() -> None:
    """Entry point for multi-camera vision service."""
    parser = argparse.ArgumentParser(
        description="ETMS Multi-Camera Vision Service"
    )
    parser.add_argument(
        "--config", default="config/settings.yaml",
        help="Path to configuration file",
    )
    parser.add_argument(
        "--no-display", action="store_true",
        help="Disable visualization windows",
    )
    parser.add_argument(
        "--log-level", default="INFO",
        choices=["DEBUG", "INFO", "WARNING", "ERROR"],
    )
    args = parser.parse_args()

    setup_logging(args.log_level)

    service = MultiCameraService(args.config)

    if args.no_display:
        service.config.debug.show_display = False

    def signal_handler(sig, frame):
        logger.info("Signal %s received, shutting down...", sig)
        service.running = False
        for p in service.pipelines:
            p.running = False

    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    service.start()


if __name__ == "__main__":
    main()
