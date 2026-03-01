"""Tests for configuration loader."""

import os
import tempfile
from collections.abc import Generator

import pytest
import yaml

from src.utils.config import (
    AppConfig,
    BehaviorConfig,
    CameraConfig,
    DebugConfig,
    DetectionConfig,
    MQTTConfig,
    PerformanceConfig,
    PoseConfig,
    TrackingConfig,
    load_config,
)


@pytest.fixture
def minimal_config_dict() -> dict:
    """Return a minimal valid configuration dictionary."""
    return {
        "camera": {"source": 0, "width": 640, "height": 480, "fps": 15},
        "detection": {
            "model_path": "models/yolo11n.pt",
            "confidence_threshold": 0.5,
            "target_classes": [0],
            "device": "auto",
            "input_size": 640,
        },
        "pose": {
            "enabled": True,
            "model_path": "models/yolo11n-pose.pt",
            "confidence_threshold": 0.3,
        },
        "tracking": {"tracker_type": "bytetrack", "trail_length": 50},
        "behavior": {
            "wandering": {
                "enabled": True,
                "loop_threshold": 3,
                "time_window": 300,
                "min_path_length": 100,
            },
            "zones": {"enabled": False, "definitions": []},
            "erratic": {
                "enabled": True,
                "direction_change_threshold": 90,
                "min_changes": 5,
                "time_window": 30,
            },
            "inactivity": {
                "enabled": True,
                "threshold_seconds": 600,
                "movement_threshold": 15,
            },
            "gait": {
                "enabled": True,
                "stability_threshold": 0.3,
                "analysis_window": 30,
            },
        },
        "mqtt": {
            "broker": "localhost",
            "port": 1883,
            "username": "test_user",
            "password": "test_pass",
            "topic_prefix": "etms/vision",
            "device_id": "test_cam",
            "qos": 1,
        },
        "performance": {"frame_skip": 2, "use_gpu": True},
        "debug": {"show_display": False, "draw_boxes": True},
    }


@pytest.fixture
def config_file(minimal_config_dict: dict) -> Generator[str]:
    """Write config dict to a temp YAML file and return its path."""
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".yaml", delete=False
    ) as fh:
        yaml.dump(minimal_config_dict, fh)
    yield fh.name
    os.unlink(fh.name)


class TestCameraConfig:
    """Test CameraConfig dataclass."""

    def test_defaults(self) -> None:
        """Test default camera values."""
        cfg = CameraConfig(source=0, width=640, height=480, fps=15)
        assert cfg.source == 0
        assert cfg.width == 640
        assert cfg.fps == 15


class TestDetectionConfig:
    """Test DetectionConfig dataclass."""

    def test_defaults(self) -> None:
        """Test detection config stores model path."""
        cfg = DetectionConfig(
            model_path="yolo11n.pt",
            target_classes=[0],
            confidence_threshold=0.5,
            device="auto",
            input_size=640,
        )
        assert cfg.model_path == "yolo11n.pt"
        assert cfg.target_classes == [0]


class TestMQTTConfig:
    """Test MQTTConfig dataclass defaults."""

    def test_defaults(self) -> None:
        """Test MQTT config values."""
        cfg = MQTTConfig(
            broker="localhost",
            port=1883,
            username="u",
            password="p",
            topic_prefix="etms/vision",
            device_id="cam1",
            qos=1,
        )
        assert cfg.broker == "localhost"
        assert cfg.port == 1883


class TestLoadConfig:
    """Test the load_config helper."""

    def test_load_from_file(self, config_file: str) -> None:
        """Test loading configuration from a YAML file."""
        cfg = load_config(config_file)
        assert isinstance(cfg, AppConfig)
        assert isinstance(cfg.camera, CameraConfig)
        assert isinstance(cfg.detection, DetectionConfig)
        assert isinstance(cfg.pose, PoseConfig)
        assert isinstance(cfg.tracking, TrackingConfig)
        assert isinstance(cfg.behavior, BehaviorConfig)
        assert isinstance(cfg.mqtt, MQTTConfig)
        assert isinstance(cfg.performance, PerformanceConfig)
        assert isinstance(cfg.debug, DebugConfig)

    def test_camera_values(self, config_file: str) -> None:
        """Test camera section loads correctly."""
        cfg = load_config(config_file)
        assert cfg.camera.width == 640
        assert cfg.camera.height == 480
        assert cfg.camera.fps == 15

    def test_mqtt_values(self, config_file: str) -> None:
        """Test MQTT section loads correctly."""
        cfg = load_config(config_file)
        assert cfg.mqtt.broker == "localhost"
        assert cfg.mqtt.port == 1883
        assert cfg.mqtt.device_id == "test_cam"

    def test_missing_file_returns_defaults(self) -> None:
        """Test that a missing config file returns defaults."""
        cfg = load_config("/tmp/does_not_exist_etms.yaml")
        assert isinstance(cfg, AppConfig)
        assert cfg.camera.width == 640  # default
