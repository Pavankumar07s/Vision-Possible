"""Tests for multi-camera pipeline orchestration."""

import os
import tempfile
from unittest.mock import MagicMock, patch

import pytest
import yaml

from src.utils.config import (
    AppConfig,
    CameraStreamConfig,
    ReIDConfig,
    ZoneConfig,
    load_config,
)


class TestMultiCameraConfig:
    """Test multi-camera configuration parsing."""

    def test_cameras_list_parsed(self) -> None:
        """Test that cameras list is parsed from YAML."""
        raw = {
            "camera": {"source": 0},
            "mqtt": {"device_id": "default_cam"},
            "cameras": [
                {
                    "device_id": "living_room",
                    "source": 0,
                    "width": 640,
                    "height": 480,
                    "fps": 15,
                    "adjacent_cameras": ["hallway"],
                },
                {
                    "device_id": "hallway",
                    "source": "rtsp://192.168.1.10/stream",
                    "width": 1280,
                    "height": 720,
                    "fps": 10,
                    "adjacent_cameras": ["living_room", "bedroom"],
                },
            ],
        }
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".yaml", delete=False
        ) as f:
            yaml.dump(raw, f)
        try:
            cfg = load_config(f.name)
            assert len(cfg.cameras) == 2
            assert cfg.cameras[0].device_id == "living_room"
            assert cfg.cameras[1].device_id == "hallway"
            assert cfg.cameras[1].width == 1280
            assert cfg.cameras[0].adjacent_cameras == ["hallway"]
            assert cfg.cameras[1].adjacent_cameras == [
                "living_room", "bedroom"
            ]
        finally:
            os.unlink(f.name)

    def test_single_camera_fallback(self) -> None:
        """Test backward compat: no cameras list promotes top-level camera."""
        raw = {
            "camera": {"source": 0, "width": 640, "height": 480, "fps": 15},
            "mqtt": {"device_id": "my_cam"},
        }
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".yaml", delete=False
        ) as f:
            yaml.dump(raw, f)
        try:
            cfg = load_config(f.name)
            assert len(cfg.cameras) == 1
            assert cfg.cameras[0].device_id == "my_cam"
            assert cfg.cameras[0].width == 640
        finally:
            os.unlink(f.name)

    def test_camera_with_zones(self) -> None:
        """Test that per-camera zones are parsed correctly."""
        raw = {
            "cameras": [
                {
                    "device_id": "kitchen_cam",
                    "source": 1,
                    "zones": {
                        "enabled": True,
                        "definitions": [
                            {
                                "name": "stove",
                                "type": "restricted",
                                "points": [
                                    [100, 100],
                                    [200, 100],
                                    [200, 200],
                                    [100, 200],
                                ],
                            }
                        ],
                    },
                }
            ],
        }
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".yaml", delete=False
        ) as f:
            yaml.dump(raw, f)
        try:
            cfg = load_config(f.name)
            assert len(cfg.cameras) == 1
            cam = cfg.cameras[0]
            assert cam.zones.enabled is True
            assert len(cam.zones.definitions) == 1
            assert cam.zones.definitions[0].name == "stove"
            assert cam.zones.definitions[0].type == "restricted"
        finally:
            os.unlink(f.name)

    def test_re_id_config_parsed(self) -> None:
        """Test that re_id config section is parsed."""
        raw = {
            "camera": {"source": 0},
            "re_id": {
                "enabled": True,
                "max_lost_seconds": 20.0,
                "aspect_ratio_tolerance": 0.5,
                "size_tolerance": 0.3,
            },
        }
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".yaml", delete=False
        ) as f:
            yaml.dump(raw, f)
        try:
            cfg = load_config(f.name)
            assert cfg.re_id.enabled is True
            assert cfg.re_id.max_lost_seconds == 20.0
            assert cfg.re_id.aspect_ratio_tolerance == 0.5
            assert cfg.re_id.size_tolerance == 0.3
        finally:
            os.unlink(f.name)

    def test_re_id_defaults(self) -> None:
        """Test re_id defaults when section is missing."""
        raw = {"camera": {"source": 0}}
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".yaml", delete=False
        ) as f:
            yaml.dump(raw, f)
        try:
            cfg = load_config(f.name)
            assert cfg.re_id.enabled is True
            assert cfg.re_id.max_lost_seconds == 15.0
        finally:
            os.unlink(f.name)

    def test_camera_stream_config_defaults(self) -> None:
        """Test CameraStreamConfig default values."""
        cam = CameraStreamConfig()
        assert cam.device_id == "camera_1"
        assert cam.source == 0
        assert cam.width == 640
        assert cam.fps == 15
        assert cam.adjacent_cameras == []
        assert cam.zones.enabled is True

    def test_adjacency_map_built(self) -> None:
        """Test building adjacency map from camera configs."""
        cameras = [
            CameraStreamConfig(
                device_id="a",
                adjacent_cameras=["b", "c"],
            ),
            CameraStreamConfig(
                device_id="b",
                adjacent_cameras=["a"],
            ),
            CameraStreamConfig(
                device_id="c",
                adjacent_cameras=["a"],
            ),
        ]
        adjacency = {cam.device_id: cam.adjacent_cameras for cam in cameras}
        assert adjacency["a"] == ["b", "c"]
        assert adjacency["b"] == ["a"]
        assert adjacency["c"] == ["a"]

    def test_multiple_cameras_with_multiple_zones(self) -> None:
        """Test multiple cameras each with multiple zone definitions."""
        raw = {
            "cameras": [
                {
                    "device_id": "cam_1",
                    "source": 0,
                    "zones": {
                        "enabled": True,
                        "definitions": [
                            {
                                "name": "zone_a",
                                "type": "safe",
                                "points": [[0, 0], [100, 0], [100, 100], [0, 100]],
                            },
                            {
                                "name": "zone_b",
                                "type": "restricted",
                                "points": [[200, 200], [300, 200], [300, 300], [200, 300]],
                            },
                        ],
                    },
                },
                {
                    "device_id": "cam_2",
                    "source": 1,
                    "zones": {
                        "enabled": True,
                        "definitions": [
                            {
                                "name": "zone_c",
                                "type": "safe",
                                "points": [[50, 50], [150, 50], [150, 150], [50, 150]],
                            },
                        ],
                    },
                },
            ],
        }
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".yaml", delete=False
        ) as f:
            yaml.dump(raw, f)
        try:
            cfg = load_config(f.name)
            assert len(cfg.cameras) == 2
            assert len(cfg.cameras[0].zones.definitions) == 2
            assert cfg.cameras[0].zones.definitions[0].name == "zone_a"
            assert cfg.cameras[0].zones.definitions[1].name == "zone_b"
            assert len(cfg.cameras[1].zones.definitions) == 1
            assert cfg.cameras[1].zones.definitions[0].name == "zone_c"
        finally:
            os.unlink(f.name)
