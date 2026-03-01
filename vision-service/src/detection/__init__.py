"""YOLO-based person detection engine for ETMS Vision Service.

Handles model loading, frame inference, and person detection
using Ultralytics YOLO. Only detects persons (COCO class 0)
and returns structured detection results.
"""

from __future__ import annotations

import logging
import time
from dataclasses import dataclass, field
from typing import Any

import numpy as np
import torch
from ultralytics import YOLO

from src.utils.config import DetectionConfig, PoseConfig

logger = logging.getLogger(__name__)


@dataclass
class PersonDetection:
    """A single person detection result."""

    person_id: int = -1
    bbox: list[float] = field(default_factory=list)  # [x1, y1, x2, y2]
    confidence: float = 0.0
    center: tuple[float, float] = (0.0, 0.0)
    area: float = 0.0
    keypoints: np.ndarray | None = None  # pose keypoints if available

    @property
    def width(self) -> float:
        """Bounding box width."""
        if len(self.bbox) == 4:
            return self.bbox[2] - self.bbox[0]
        return 0.0

    @property
    def height(self) -> float:
        """Bounding box height."""
        if len(self.bbox) == 4:
            return self.bbox[3] - self.bbox[1]
        return 0.0


@dataclass
class FrameResult:
    """Detection results for a single frame."""

    frame_id: int = 0
    timestamp: float = 0.0
    detections: list[PersonDetection] = field(default_factory=list)
    inference_time_ms: float = 0.0
    frame_shape: tuple[int, int, int] = (0, 0, 0)
    annotated_frame: np.ndarray | None = None


class YOLODetector:
    """YOLO-based person detector.

    Loads an Ultralytics YOLO model and performs inference on
    video frames to detect persons. Optionally runs pose estimation
    for keypoint extraction.
    """

    def __init__(
        self,
        detection_config: DetectionConfig,
        pose_config: PoseConfig | None = None,
    ) -> None:
        """Initialize the YOLO detector.

        Args:
            detection_config: Detection model configuration.
            pose_config: Optional pose estimation configuration.

        """
        self.config = detection_config
        self.pose_config = pose_config
        self.model: YOLO | None = None
        self.pose_model: YOLO | None = None
        self.device = self._resolve_device()
        self.frame_count = 0

    def _resolve_device(self) -> str:
        """Determine the best device for inference."""
        if self.config.device == "auto":
            if torch.cuda.is_available():
                device = "cuda"
                gpu_name = torch.cuda.get_device_name(0)
                logger.info("GPU detected: %s", gpu_name)
            else:
                device = "cpu"
                logger.info("No GPU detected, using CPU")
            return device
        return self.config.device

    def load_models(self) -> None:
        """Load YOLO detection and optional pose models."""
        logger.info("Loading YOLO detection model: %s", self.config.model_path)
        self.model = YOLO(self.config.model_path)

        # Warm up the model
        dummy = np.zeros((self.config.input_size, self.config.input_size, 3), dtype=np.uint8)
        self.model(dummy, verbose=False)
        logger.info("Detection model loaded and warmed up on %s", self.device)

        if self.pose_config and self.pose_config.enabled:
            logger.info("Loading YOLO pose model: %s", self.pose_config.model_path)
            self.pose_model = YOLO(self.pose_config.model_path)
            self.pose_model(dummy, verbose=False)
            logger.info("Pose model loaded and warmed up")

    def detect(self, frame: np.ndarray) -> FrameResult:
        """Run person detection on a single frame.

        Args:
            frame: BGR image as numpy array (H, W, C).

        Returns:
            FrameResult with all person detections.

        """
        if self.model is None:
            raise RuntimeError("Model not loaded. Call load_models() first.")

        self.frame_count += 1
        start_time = time.perf_counter()

        # Run YOLO inference with tracking
        results = self.model.track(
            frame,
            persist=True,
            conf=self.config.confidence_threshold,
            iou=self.config.iou_threshold,
            classes=self.config.target_classes,
            imgsz=self.config.input_size,
            verbose=False,
            device=self.device,
        )

        inference_ms = (time.perf_counter() - start_time) * 1000

        detections = self._parse_detections(results)

        # Run pose estimation if person(s) detected and pose is enabled
        if detections and self.pose_model and self.pose_config and self.pose_config.enabled:
            self._run_pose_estimation(frame, detections)

        result = FrameResult(
            frame_id=self.frame_count,
            timestamp=time.time(),
            detections=detections,
            inference_time_ms=inference_ms,
            frame_shape=frame.shape,
            annotated_frame=results[0].plot() if results else None,
        )

        if self.frame_count % 100 == 0:
            logger.debug(
                "Frame %d: %d persons detected (%.1f ms)",
                self.frame_count,
                len(detections),
                inference_ms,
            )

        return result

    def _parse_detections(self, results: Any) -> list[PersonDetection]:
        """Parse YOLO results into PersonDetection objects."""
        detections: list[PersonDetection] = []

        if not results or len(results) == 0:
            return detections

        result = results[0]

        if result.boxes is None or len(result.boxes) == 0:
            return detections

        boxes = result.boxes
        for i in range(len(boxes)):
            box = boxes[i]

            # Get bounding box coordinates
            xyxy = box.xyxy[0].cpu().numpy().tolist()
            conf = float(box.conf[0].cpu().numpy())

            # Get tracker ID if available
            track_id = -1
            if box.id is not None:
                track_id = int(box.id[0].cpu().numpy())

            # Calculate center point
            cx = (xyxy[0] + xyxy[2]) / 2
            cy = (xyxy[1] + xyxy[3]) / 2

            # Calculate area
            area = (xyxy[2] - xyxy[0]) * (xyxy[3] - xyxy[1])

            detection = PersonDetection(
                person_id=track_id,
                bbox=xyxy,
                confidence=conf,
                center=(cx, cy),
                area=area,
            )
            detections.append(detection)

        return detections

    def _run_pose_estimation(
        self, frame: np.ndarray, detections: list[PersonDetection]
    ) -> None:
        """Run pose estimation and attach keypoints to detections."""
        if self.pose_model is None:
            return

        pose_results = self.pose_model(
            frame,
            conf=self.pose_config.confidence_threshold,
            verbose=False,
            device=self.device,
        )

        if not pose_results or pose_results[0].keypoints is None:
            return

        keypoints_data = pose_results[0].keypoints.data.cpu().numpy()

        # Match pose detections to tracked persons by IoU
        for detection in detections:
            best_match_idx = self._match_pose_to_detection(
                detection, pose_results[0].boxes, keypoints_data
            )
            if best_match_idx >= 0:
                detection.keypoints = keypoints_data[best_match_idx]

    def _match_pose_to_detection(
        self,
        detection: PersonDetection,
        pose_boxes: Any,
        keypoints_data: np.ndarray,
    ) -> int:
        """Match a tracked detection to the nearest pose result by IoU."""
        if pose_boxes is None or len(pose_boxes) == 0:
            return -1

        best_iou = 0.0
        best_idx = -1
        det_box = detection.bbox

        for i in range(len(pose_boxes)):
            pose_box = pose_boxes[i].xyxy[0].cpu().numpy().tolist()
            iou = self._compute_iou(det_box, pose_box)
            if iou > best_iou:
                best_iou = iou
                best_idx = i

        return best_idx if best_iou > 0.5 else -1

    @staticmethod
    def _compute_iou(box1: list[float], box2: list[float]) -> float:
        """Compute intersection over union between two boxes."""
        x1 = max(box1[0], box2[0])
        y1 = max(box1[1], box2[1])
        x2 = min(box1[2], box2[2])
        y2 = min(box1[3], box2[3])

        intersection = max(0, x2 - x1) * max(0, y2 - y1)
        area1 = (box1[2] - box1[0]) * (box1[3] - box1[1])
        area2 = (box2[2] - box2[0]) * (box2[3] - box2[1])
        union = area1 + area2 - intersection

        if union == 0:
            return 0.0
        return intersection / union
