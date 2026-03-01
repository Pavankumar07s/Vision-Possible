"""Configuration loader for ETMS Vision Service."""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml

logger = logging.getLogger(__name__)


@dataclass
class CameraConfig:
    """Camera source configuration."""

    source: int | str = 0
    width: int = 640
    height: int = 480
    fps: int = 15


@dataclass
class DetectionConfig:
    """YOLO detection configuration."""

    model_path: str = "yolo11n.pt"
    target_classes: list[int] = field(default_factory=lambda: [0])
    confidence_threshold: float = 0.5
    iou_threshold: float = 0.45
    input_size: int = 640
    device: str = "auto"


@dataclass
class PoseConfig:
    """Pose estimation configuration."""

    enabled: bool = True
    model_path: str = "yolo11n-pose.pt"
    confidence_threshold: float = 0.5


@dataclass
class TrackingConfig:
    """Object tracking configuration."""

    tracker_type: str = "bytetrack"
    max_lost_frames: int = 30
    min_track_length: int = 10
    trail_length: int = 50
    direction_change_threshold: int = 90


@dataclass
class ZoneDefinition:
    """A single zone definition."""

    name: str = ""
    type: str = "safe"
    points: list[list[int]] = field(default_factory=list)


@dataclass
class WanderingConfig:
    """Wandering detection parameters."""

    enabled: bool = True
    loop_threshold: int = 3
    time_window: int = 300
    min_path_length: int = 100


@dataclass
class ZoneConfig:
    """Zone violation detection parameters."""

    enabled: bool = True
    definitions: list[ZoneDefinition] = field(default_factory=list)


@dataclass
class ErraticConfig:
    """Erratic movement detection parameters."""

    enabled: bool = True
    direction_change_threshold: int = 90
    min_changes: int = 15
    time_window: int = 30
    min_speed: float = 30.0
    min_entropy: float = 0.5


@dataclass
class InactivityConfig:
    """Inactivity detection parameters."""

    enabled: bool = True
    threshold_seconds: int = 600
    movement_threshold: int = 15


@dataclass
class GaitConfig:
    """Gait instability detection parameters."""

    enabled: bool = True
    stability_threshold: float = 0.3
    analysis_window: int = 30


@dataclass
class BehaviorConfig:
    """Behavior analysis configuration."""

    wandering: WanderingConfig = field(default_factory=WanderingConfig)
    zones: ZoneConfig = field(default_factory=ZoneConfig)
    erratic: ErraticConfig = field(default_factory=ErraticConfig)
    inactivity: InactivityConfig = field(default_factory=InactivityConfig)
    gait: GaitConfig = field(default_factory=GaitConfig)


@dataclass
class CameraStreamConfig:
    """Per-camera stream configuration for multi-camera setups."""

    device_id: str = "camera_1"
    source: int | str = 0
    width: int = 640
    height: int = 480
    fps: int = 15
    zones: ZoneConfig = field(default_factory=ZoneConfig)
    adjacent_cameras: list[str] = field(default_factory=list)


@dataclass
class ReIDConfig:
    """Cross-camera person re-identification parameters."""

    enabled: bool = True
    max_lost_seconds: float = 15.0
    aspect_ratio_tolerance: float = 0.35
    size_tolerance: float = 0.4
    min_track_seconds: float = 1.0


@dataclass
class MQTTConfig:
    """MQTT broker configuration."""

    broker: str = "localhost"
    port: int = 1883
    username: str = "mqtt_user"
    password: str = ""
    topic_prefix: str = "etms/vision"
    device_id: str = "room_1_camera"
    qos: int = 1
    keepalive: int = 60


@dataclass
class PerformanceConfig:
    """Performance tuning configuration."""

    frame_skip: int = 2
    use_gpu: bool = True
    num_threads: int = 4
    tensorrt: bool = False


@dataclass
class DebugConfig:
    """Debug and visualization configuration."""

    show_display: bool = True
    draw_boxes: bool = True
    draw_pose: bool = True
    draw_trails: bool = True
    draw_zones: bool = True
    save_frames: bool = False
    save_path: str = "debug_frames/"


@dataclass
class AppConfig:
    """Complete application configuration."""

    camera: CameraConfig = field(default_factory=CameraConfig)
    detection: DetectionConfig = field(default_factory=DetectionConfig)
    pose: PoseConfig = field(default_factory=PoseConfig)
    tracking: TrackingConfig = field(default_factory=TrackingConfig)
    behavior: BehaviorConfig = field(default_factory=BehaviorConfig)
    mqtt: MQTTConfig = field(default_factory=MQTTConfig)
    performance: PerformanceConfig = field(default_factory=PerformanceConfig)
    debug: DebugConfig = field(default_factory=DebugConfig)
    cameras: list[CameraStreamConfig] = field(default_factory=list)
    re_id: ReIDConfig = field(default_factory=ReIDConfig)


def _resolve_type(cls: type, type_hint: Any) -> type | None:
    """Resolve a string or real type annotation to the actual class."""
    if isinstance(type_hint, str):
        # Look up in the module-level namespace
        return globals().get(type_hint)
    return type_hint


def _populate_dataclass(cls: type, data: dict[str, Any]) -> Any:
    """Recursively populate a dataclass from a dictionary."""
    if not data:
        return cls()

    kwargs: dict[str, Any] = {}

    for f in cls.__dataclass_fields__.values():
        key = f.name
        if key not in data:
            continue

        value = data[key]
        resolved = _resolve_type(cls, f.type)

        # Handle nested dataclasses
        if isinstance(value, dict) and resolved and hasattr(resolved, "__dataclass_fields__"):
            kwargs[key] = _populate_dataclass(resolved, value)
        elif isinstance(value, list) and key == "definitions":
            kwargs[key] = [
                _populate_dataclass(ZoneDefinition, z) if isinstance(z, dict) else z
                for z in value
            ]
        else:
            kwargs[key] = value

    return cls(**kwargs)


def load_config(config_path: str = "config/settings.yaml") -> AppConfig:
    """Load configuration from YAML file.

    Args:
        config_path: Path to the YAML configuration file.

    Returns:
        Populated AppConfig dataclass.

    """
    path = Path(config_path)
    if not path.exists():
        logger.warning("Config file not found at %s, using defaults", config_path)
        return AppConfig()

    with path.open() as f:
        raw = yaml.safe_load(f) or {}

    config = AppConfig(
        camera=_populate_dataclass(CameraConfig, raw.get("camera", {})),
        detection=_populate_dataclass(DetectionConfig, raw.get("detection", {})),
        pose=_populate_dataclass(PoseConfig, raw.get("pose", {})),
        tracking=_populate_dataclass(TrackingConfig, raw.get("tracking", {})),
        behavior=_populate_dataclass(BehaviorConfig, raw.get("behavior", {})),
        mqtt=_populate_dataclass(MQTTConfig, raw.get("mqtt", {})),
        performance=_populate_dataclass(
            PerformanceConfig, raw.get("performance", {})
        ),
        debug=_populate_dataclass(DebugConfig, raw.get("debug", {})),
        re_id=_populate_dataclass(ReIDConfig, raw.get("re_id", {})),
    )

    # Parse multi-camera definitions
    raw_cameras = raw.get("cameras", [])
    if raw_cameras:
        for cam_raw in raw_cameras:
            cam = _populate_dataclass(CameraStreamConfig, cam_raw)
            config.cameras.append(cam)
        logger.info("Loaded %d camera streams", len(config.cameras))
    else:
        # Single-camera backward compatibility: promote top-level camera
        config.cameras.append(
            CameraStreamConfig(
                device_id=config.mqtt.device_id,
                source=config.camera.source,
                width=config.camera.width,
                height=config.camera.height,
                fps=config.camera.fps,
                zones=config.behavior.zones,
            )
        )

    logger.info("Configuration loaded from %s", config_path)
    return config
