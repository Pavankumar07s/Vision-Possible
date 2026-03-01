"""Tests for the person tracking module."""

import pytest

from src.detection import PersonDetection
from src.tracking import MovementFeatures, PersonTrack, PersonTracker, TrajectoryPoint
from src.utils.config import TrackingConfig


@pytest.fixture
def tracking_config() -> TrackingConfig:
    """Return a default tracking configuration."""
    return TrackingConfig(
        tracker_type="bytetrack",
        max_lost_frames=30,
        min_track_length=3,
        trail_length=50,
    )


def _make_detection(
    x: float, y: float, person_id: int = -1
) -> PersonDetection:
    """Create a PersonDetection at a given center point."""
    w, h = 60.0, 120.0
    return PersonDetection(
        person_id=person_id,
        bbox=[x - w / 2, y - h / 2, x + w / 2, y + h / 2],
        confidence=0.9,
        center=(x, y),
        area=w * h,
    )


class TestTrajectoryPoint:
    """Test TrajectoryPoint dataclass."""

    def test_creation(self) -> None:
        """Test creating a trajectory point."""
        pt = TrajectoryPoint(x=100.0, y=200.0, timestamp=1.0, frame_id=0)
        assert pt.x == 100.0
        assert pt.y == 200.0
        assert pt.timestamp == 1.0
        assert pt.frame_id == 0


class TestPersonTrack:
    """Test single-person trajectory tracking."""

    def test_update_adds_point(self, tracking_config: TrackingConfig) -> None:
        """Test that updating adds a point to the trajectory."""
        track = PersonTrack(person_id=1, config=tracking_config)
        det = _make_detection(100.0, 200.0, person_id=1)
        track.update(det, frame_id=0)
        assert len(track.trajectory) == 1
        assert track.frames_seen == 1

    def test_trail_length_limit(self, tracking_config: TrackingConfig) -> None:
        """Test that trajectory maxlen is applied."""
        cfg = TrackingConfig(
            tracker_type="bytetrack",
            max_lost_frames=30,
            min_track_length=3,
            trail_length=2,  # maxlen = trail_length * 10 = 20
        )
        track = PersonTrack(person_id=1, config=cfg)
        for i in range(25):
            det = _make_detection(float(i * 10), float(i * 10), person_id=1)
            track.update(det, frame_id=i)
        assert len(track.trajectory) == 20  # trail_length * 10

    def test_movement_features_single_point(
        self, tracking_config: TrackingConfig
    ) -> None:
        """Test movement features with only one trajectory point."""
        track = PersonTrack(person_id=1, config=tracking_config)
        det = _make_detection(100.0, 200.0, person_id=1)
        track.update(det, frame_id=0)
        features = track.get_features()
        assert isinstance(features, MovementFeatures)
        assert features.person_id == 1
        assert features.path_length == 0.0

    def test_movement_features_straight_line(
        self, tracking_config: TrackingConfig
    ) -> None:
        """Test movement features for a straight-line path."""
        track = PersonTrack(person_id=1, config=tracking_config)
        for i in range(10):
            det = _make_detection(float(i * 50), 100.0, person_id=1)
            track.update(det, frame_id=i)
        features = track.get_features()
        assert features.path_length > 0.0

    def test_is_expired(self, tracking_config: TrackingConfig) -> None:
        """Test track expiration after too many lost frames."""
        track = PersonTrack(person_id=1, config=tracking_config)
        det = _make_detection(100.0, 200.0, person_id=1)
        track.update(det, frame_id=0)
        assert not track.is_expired
        for _ in range(tracking_config.max_lost_frames + 1):
            track.mark_lost()
        assert track.is_expired

    def test_is_confirmed(self, tracking_config: TrackingConfig) -> None:
        """Test that a track is confirmed after enough frames."""
        track = PersonTrack(person_id=1, config=tracking_config)
        for i in range(tracking_config.min_track_length):
            det = _make_detection(float(i * 10), 100.0, person_id=1)
            track.update(det, frame_id=i)
        assert track.is_confirmed


class TestPersonTracker:
    """Test multi-person tracker."""

    def test_update_creates_track(self, tracking_config: TrackingConfig) -> None:
        """Test that updating with a new detection creates a track."""
        tracker = PersonTracker(config=tracking_config)
        dets = [_make_detection(100.0, 200.0, person_id=1)]
        tracker.update(dets, frame_id=0)
        assert 1 in tracker.tracks

    def test_update_existing_track(self, tracking_config: TrackingConfig) -> None:
        """Test that updating an existing track appends points."""
        tracker = PersonTracker(config=tracking_config)
        tracker.update([_make_detection(100.0, 200.0, person_id=1)], frame_id=0)
        tracker.update([_make_detection(150.0, 250.0, person_id=1)], frame_id=1)
        assert len(tracker.tracks[1].trajectory) == 2

    def test_expired_tracks_removed(self, tracking_config: TrackingConfig) -> None:
        """Test removal of expired tracks."""
        cfg = TrackingConfig(
            tracker_type="bytetrack",
            max_lost_frames=2,
            min_track_length=1,
            trail_length=50,
        )
        tracker = PersonTracker(config=cfg)
        tracker.update([_make_detection(100.0, 200.0, person_id=1)], frame_id=0)
        # Send empty detections to make track lost
        tracker.update([], frame_id=1)
        tracker.update([], frame_id=2)
        tracker.update([], frame_id=3)  # should expire after 2 lost frames
        assert 1 not in tracker.tracks

    def test_active_count(self, tracking_config: TrackingConfig) -> None:
        """Test active track count."""
        tracker = PersonTracker(config=tracking_config)
        tracker.update(
            [
                _make_detection(100.0, 100.0, person_id=1),
                _make_detection(300.0, 300.0, person_id=2),
            ],
            frame_id=0,
        )
        assert tracker.active_count == 2

    def test_get_trail_empty(self, tracking_config: TrackingConfig) -> None:
        """Test getting trail for non-existent track."""
        tracker = PersonTracker(config=tracking_config)
        trail = tracker.get_trail(person_id=999)
        assert trail == []
