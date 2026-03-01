"""Tests for cross-camera person re-identification."""

import time

import pytest

from src.re_id import CrossCameraReID, GlobalTrack, PersonSignature
from src.utils.config import ReIDConfig


@pytest.fixture
def re_id_config() -> ReIDConfig:
    """Return default re-ID configuration.

    min_track_seconds is set to 0 so tests do not need artificial
    delays for tracks to become mature.
    """
    return ReIDConfig(
        enabled=True,
        max_lost_seconds=15.0,
        aspect_ratio_tolerance=0.35,
        size_tolerance=0.4,
        min_track_seconds=0.0,
    )


@pytest.fixture
def adjacency() -> dict[str, list[str]]:
    """Return a simple two-camera adjacency map."""
    return {
        "cam_a": ["cam_b"],
        "cam_b": ["cam_a"],
    }


@pytest.fixture
def re_id(re_id_config: ReIDConfig, adjacency: dict) -> CrossCameraReID:
    """Return a CrossCameraReID instance with two cameras registered."""
    engine = CrossCameraReID(re_id_config, adjacency)
    engine.register_camera("cam_a")
    engine.register_camera("cam_b")
    return engine


class TestPersonSignature:
    """Test PersonSignature dataclass."""

    def test_creation(self) -> None:
        """Test signature stores fields correctly."""
        sig = PersonSignature(
            global_id=1,
            camera_id="cam_a",
            bbox_aspect_ratio=0.5,
            bbox_area=0.02,
            last_seen=time.time(),
            last_zone="kitchen",
        )
        assert sig.global_id == 1
        assert sig.camera_id == "cam_a"
        assert sig.last_zone == "kitchen"

    def test_default_zone(self) -> None:
        """Test that zone defaults to empty string."""
        sig = PersonSignature(
            global_id=1,
            camera_id="cam_a",
            bbox_aspect_ratio=0.5,
            bbox_area=0.02,
            last_seen=time.time(),
        )
        assert sig.last_zone == ""


class TestGlobalTrack:
    """Test GlobalTrack dataclass."""

    def test_creation(self) -> None:
        """Test global track stores camera mapping."""
        track = GlobalTrack(
            global_id=1,
            camera_tracks={"cam_a": 5},
            first_seen=100.0,
            last_seen=200.0,
            last_camera="cam_a",
        )
        assert track.global_id == 1
        assert track.camera_tracks["cam_a"] == 5

    def test_defaults(self) -> None:
        """Test global track default values."""
        track = GlobalTrack(global_id=1)
        assert track.camera_tracks == {}
        assert track.first_seen == 0.0
        assert track.last_camera == ""


class TestCrossCameraReID:
    """Test CrossCameraReID engine."""

    def test_register_camera(self, re_id: CrossCameraReID) -> None:
        """Test registering cameras creates mapping entries."""
        assert "cam_a" in re_id.local_to_global
        assert "cam_b" in re_id.local_to_global

    def test_new_person_gets_unique_global_id(
        self, re_id: CrossCameraReID
    ) -> None:
        """Test that new persons get unique global IDs."""
        gid1 = re_id.get_global_id("cam_a", 1, (10, 20, 50, 100), 640 * 480)
        gid2 = re_id.get_global_id("cam_a", 2, (60, 20, 100, 100), 640 * 480)
        assert gid1 != gid2

    def test_same_local_pid_returns_same_global_id(
        self, re_id: CrossCameraReID
    ) -> None:
        """Test that the same local PID on the same camera returns a
        consistent global ID."""
        gid1 = re_id.get_global_id("cam_a", 1, (10, 20, 50, 100), 640 * 480)
        gid2 = re_id.get_global_id("cam_a", 1, (12, 22, 52, 102), 640 * 480)
        assert gid1 == gid2

    def test_global_track_created(self, re_id: CrossCameraReID) -> None:
        """Test that getting a global ID creates a GlobalTrack."""
        gid = re_id.get_global_id("cam_a", 1, (10, 20, 50, 100), 640 * 480)
        assert gid in re_id.global_tracks
        assert re_id.global_tracks[gid].last_camera == "cam_a"

    def test_reid_matches_across_adjacent_cameras(
        self, re_id: CrossCameraReID
    ) -> None:
        """Test person lost on cam_a is re-IDed on adjacent cam_b."""
        frame_area = 640 * 480
        bbox = (100, 50, 160, 200)  # aspect=0.4, area small

        # Person appears on cam_a
        gid_a = re_id.get_global_id("cam_a", 1, bbox, frame_area)

        # Person lost from cam_a
        re_id.person_lost("cam_a", 1, bbox, frame_area, zone="hallway")

        # Same-ish person appears on cam_b (similar bbox)
        similar_bbox = (105, 55, 165, 205)
        gid_b = re_id.get_global_id("cam_b", 10, similar_bbox, frame_area)

        assert gid_a == gid_b, "Person should be re-identified across cameras"

    def test_no_match_non_adjacent_cameras(
        self, re_id_config: ReIDConfig
    ) -> None:
        """Test that re-ID only works between adjacent cameras."""
        adjacency = {
            "cam_a": ["cam_b"],
            "cam_b": ["cam_a"],
            "cam_c": [],  # not adjacent to anything
        }
        engine = CrossCameraReID(re_id_config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_c")

        frame_area = 640 * 480
        bbox = (100, 50, 160, 200)

        gid_a = engine.get_global_id("cam_a", 1, bbox, frame_area)
        engine.person_lost("cam_a", 1, bbox, frame_area)

        # cam_c is NOT adjacent to cam_a — should NOT match
        gid_c = engine.get_global_id("cam_c", 1, bbox, frame_area)
        assert gid_a != gid_c

    def test_no_match_when_bbox_too_different(
        self, re_id: CrossCameraReID
    ) -> None:
        """Test that extremely different bounding boxes fail sanity check."""
        frame_area = 640 * 480
        bbox_tall = (100, 50, 130, 300)  # aspect=0.12 (very tall, narrow)
        bbox_wide = (100, 50, 300, 100)  # aspect=4.0  (very wide, short)

        gid_a = re_id.get_global_id("cam_a", 1, bbox_tall, frame_area)
        re_id.person_lost("cam_a", 1, bbox_tall, frame_area)

        # Even single-candidate temporal match should be rejected because
        # aspect_diff = 3.88 exceeds the sanity threshold (2.0).
        gid_b = re_id.get_global_id("cam_b", 1, bbox_wide, frame_area)
        assert gid_a != gid_b

    def test_temporal_match_different_appearance(
        self, re_id: CrossCameraReID
    ) -> None:
        """Test that single candidate matches even with moderately
        different bboxes (different camera angles)."""
        frame_area = 640 * 480
        # Camera A sees person as tall-ish (aspect=0.38)
        bbox_a = (0, 150, 125, 480)
        gid_a = re_id.get_global_id("cam_a", 1, bbox_a, frame_area)
        re_id.person_lost("cam_a", 1, bbox_a, frame_area)

        # Camera B sees same person as wider (aspect=1.35) — different angle
        bbox_b = (20, 20, 636, 477)
        gid_b = re_id.get_global_id("cam_b", 5, bbox_b, frame_area)

        assert gid_a == gid_b, (
            "Single candidate from adjacent should match by temporal "
            "proximity even with different appearance"
        )

    def test_handoff_overlap_same_global_id(
        self, re_id: CrossCameraReID
    ) -> None:
        """Test overlap case: person visible on both cameras gets
        the same global ID via handoff."""
        frame_area = 640 * 480
        bbox = (100, 50, 200, 300)

        # Person appears on cam_a first
        gid_a = re_id.get_global_id("cam_a", 1, bbox, frame_area)

        # Person also appears on cam_b (still on cam_a) — handoff
        bbox_b = (50, 30, 180, 260)
        gid_b = re_id.get_global_id("cam_b", 10, bbox_b, frame_area)

        assert gid_a == gid_b, (
            "Handoff should assign the same global ID when person is "
            "still active on adjacent camera"
        )

    def test_handoff_no_match_when_multiple_on_adjacent(
        self, re_id: CrossCameraReID
    ) -> None:
        """Test that handoff does not fire when multiple persons are
        active on adjacent cameras (ambiguous)."""
        frame_area = 640 * 480

        # Two persons on cam_a
        gid1 = re_id.get_global_id(
            "cam_a", 1, (10, 10, 50, 100), frame_area
        )
        gid2 = re_id.get_global_id(
            "cam_a", 2, (200, 10, 260, 100), frame_area
        )

        # New person on cam_b — can't tell which one from cam_a
        gid_b = re_id.get_global_id(
            "cam_b", 5, (100, 50, 180, 200), frame_area
        )

        assert gid_b != gid1 and gid_b != gid2, (
            "Handoff should not fire when multiple persons on adjacent"
        )

    def test_person_lost_skips_signature_when_still_active(
        self, re_id: CrossCameraReID
    ) -> None:
        """Test person_lost does not store a signature when the same
        global person is still active on another camera (handoff)."""
        frame_area = 640 * 480
        bbox = (100, 50, 200, 300)

        # Person on cam_a
        gid_a = re_id.get_global_id("cam_a", 1, bbox, frame_area)

        # Person handed off to cam_b (overlap)
        gid_b = re_id.get_global_id("cam_b", 5, bbox, frame_area)
        assert gid_a == gid_b

        # Person disappears from cam_a — still on cam_b
        re_id.person_lost("cam_a", 1, bbox, frame_area)

        # No lost signature should have been stored
        assert len(re_id._lost_signatures) == 0

    def test_expired_signatures_not_matched(
        self, re_id_config: ReIDConfig, adjacency: dict
    ) -> None:
        """Test that expired lost signatures are not matched."""
        re_id_config.max_lost_seconds = 0.01  # very short
        engine = CrossCameraReID(re_id_config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_b")

        frame_area = 640 * 480
        bbox = (100, 50, 160, 200)

        gid_a = engine.get_global_id("cam_a", 1, bbox, frame_area)
        engine.person_lost("cam_a", 1, bbox, frame_area)

        # Wait for expiration
        time.sleep(0.05)

        gid_b = engine.get_global_id("cam_b", 1, bbox, frame_area)
        assert gid_a != gid_b, "Expired signature should not match"

    def test_person_lost_removes_from_mapping(
        self, re_id: CrossCameraReID
    ) -> None:
        """Test that person_lost removes the local→global mapping."""
        frame_area = 640 * 480
        bbox = (100, 50, 160, 200)

        re_id.get_global_id("cam_a", 1, bbox, frame_area)
        assert 1 in re_id.local_to_global["cam_a"]

        re_id.person_lost("cam_a", 1, bbox, frame_area)
        assert 1 not in re_id.local_to_global["cam_a"]

    def test_person_lost_creates_signature(
        self, re_id: CrossCameraReID
    ) -> None:
        """Test that person_lost stores a signature for re-ID."""
        frame_area = 640 * 480
        bbox = (100, 50, 160, 200)

        re_id.get_global_id("cam_a", 1, bbox, frame_area)
        re_id.person_lost("cam_a", 1, bbox, frame_area, zone="kitchen")

        assert len(re_id._lost_signatures) == 1
        sig = re_id._lost_signatures[0]
        assert sig.camera_id == "cam_a"
        assert sig.last_zone == "kitchen"

    def test_person_lost_with_no_global_id(
        self, re_id: CrossCameraReID
    ) -> None:
        """Test person_lost with unknown local PID does nothing."""
        re_id.person_lost("cam_a", 999, (10, 10, 50, 50), 640 * 480)
        assert len(re_id._lost_signatures) == 0

    def test_person_lost_no_bbox(self, re_id: CrossCameraReID) -> None:
        """Test person_lost with no bbox still creates a signature."""
        re_id.get_global_id("cam_a", 1, (10, 10, 50, 50), 640 * 480)
        re_id.person_lost("cam_a", 1, None, 640 * 480)

        assert len(re_id._lost_signatures) == 1
        sig = re_id._lost_signatures[0]
        assert sig.bbox_aspect_ratio == 1.0
        assert sig.bbox_area == 0.0

    def test_active_global_count(self, re_id: CrossCameraReID) -> None:
        """Test active global count reflects recent persons."""
        frame_area = 640 * 480
        re_id.get_global_id("cam_a", 1, (10, 20, 50, 100), frame_area)
        re_id.get_global_id("cam_a", 2, (60, 20, 100, 100), frame_area)
        re_id.get_global_id("cam_b", 3, (10, 20, 50, 100), frame_area)

        assert re_id.active_global_count == 3

    def test_cleanup_removes_old_signatures(
        self, re_id_config: ReIDConfig, adjacency: dict
    ) -> None:
        """Test cleanup removes expired signatures."""
        re_id_config.max_lost_seconds = 0.01
        engine = CrossCameraReID(re_id_config, adjacency)
        engine.register_camera("cam_a")

        engine.get_global_id("cam_a", 1, (10, 10, 50, 50), 640 * 480)
        engine.person_lost("cam_a", 1, (10, 10, 50, 50), 640 * 480)
        assert len(engine._lost_signatures) == 1

        time.sleep(0.05)
        engine.cleanup()

        assert len(engine._lost_signatures) == 0

    def test_cleanup_removes_stale_global_tracks(
        self, re_id: CrossCameraReID
    ) -> None:
        """Test cleanup removes global tracks not seen for >5 minutes."""
        gid = re_id.get_global_id("cam_a", 1, (10, 10, 50, 50), 640 * 480)
        # Backdate the last_seen to 6 minutes ago
        re_id.global_tracks[gid].last_seen = time.time() - 360

        re_id.cleanup()
        assert gid not in re_id.global_tracks

    def test_get_summary(self, re_id: CrossCameraReID) -> None:
        """Test get_summary returns expected keys."""
        frame_area = 640 * 480
        re_id.get_global_id("cam_a", 1, (10, 20, 50, 100), frame_area)
        re_id.get_global_id("cam_b", 2, (10, 20, 50, 100), frame_area)

        summary = re_id.get_summary()
        assert "global_persons" in summary
        assert "lost_awaiting_reid" in summary
        assert "total_tracked" in summary
        assert "cameras" in summary
        assert summary["cameras"]["cam_a"] == 1
        assert summary["cameras"]["cam_b"] == 1

    def test_reid_disabled(self, adjacency: dict) -> None:
        """Test that re-ID matching is skipped when disabled."""
        config = ReIDConfig(enabled=False)
        engine = CrossCameraReID(config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_b")

        frame_area = 640 * 480
        bbox = (100, 50, 160, 200)

        gid_a = engine.get_global_id("cam_a", 1, bbox, frame_area)
        engine.person_lost("cam_a", 1, bbox, frame_area)

        # Should get a NEW id, not re-ID
        gid_b = engine.get_global_id("cam_b", 1, bbox, frame_area)
        assert gid_a != gid_b

    def test_reid_disabled_no_handoff(self, adjacency: dict) -> None:
        """Test that handoff is also skipped when re-ID is disabled."""
        config = ReIDConfig(enabled=False)
        engine = CrossCameraReID(config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_b")

        frame_area = 640 * 480
        bbox = (100, 50, 160, 200)

        gid_a = engine.get_global_id("cam_a", 1, bbox, frame_area)
        # Person still on cam_a, new detection on cam_b
        gid_b = engine.get_global_id("cam_b", 1, bbox, frame_area)
        assert gid_a != gid_b, "Handoff should be disabled too"

    def test_multiple_lost_best_match_wins(
        self, re_id: CrossCameraReID
    ) -> None:
        """Test that the best scoring lost signature wins."""
        frame_area = 640 * 480

        # Person 1: tall narrow
        bbox1 = (100, 50, 130, 200)  # aspect ~ 0.2
        gid1 = re_id.get_global_id("cam_a", 1, bbox1, frame_area)

        # Person 2: almost square
        bbox2 = (200, 50, 330, 200)  # aspect ~ 0.87
        gid2 = re_id.get_global_id("cam_a", 2, bbox2, frame_area)

        re_id.person_lost("cam_a", 1, bbox1, frame_area)
        re_id.person_lost("cam_a", 2, bbox2, frame_area)

        # New person on cam_b looks like person 1
        new_bbox = (100, 55, 132, 202)  # similar to bbox1
        gid_b = re_id.get_global_id("cam_b", 5, new_bbox, frame_area)
        assert gid_b == gid1


class TestSameCameraReentry:
    """Tests for same-camera re-entry (person leaves and comes back)."""

    def test_same_camera_reentry_single_candidate(
        self, re_id: CrossCameraReID
    ) -> None:
        """Person leaves cam_a (no other cameras) and returns to cam_a."""
        frame_area = 640 * 480
        bbox = (100, 50, 200, 300)

        gid1 = re_id.get_global_id("cam_a", 1, bbox, frame_area)
        re_id.person_lost("cam_a", 1, bbox, frame_area)

        # Same person re-appears on cam_a with new local PID
        similar_bbox = (105, 55, 205, 305)
        gid2 = re_id.get_global_id("cam_a", 10, similar_bbox, frame_area)

        assert gid1 == gid2, (
            "Same-camera re-entry should re-identify the person"
        )

    def test_same_camera_reentry_after_both_cameras(
        self, re_id: CrossCameraReID
    ) -> None:
        """Person leaves both cameras and re-enters the original one."""
        frame_area = 640 * 480
        bbox = (100, 50, 200, 300)

        # Appear on cam_a, hand off to cam_b, disappear from both
        gid_a = re_id.get_global_id("cam_a", 1, bbox, frame_area)
        gid_b = re_id.get_global_id("cam_b", 5, bbox, frame_area)
        assert gid_a == gid_b

        re_id.person_lost("cam_a", 1, bbox, frame_area)  # still on cam_b
        re_id.person_lost("cam_b", 5, bbox, frame_area)  # now truly gone

        # Re-enter cam_a
        gid_new = re_id.get_global_id("cam_a", 20, bbox, frame_area)
        assert gid_new == gid_a, (
            "Person should be re-identified when re-entering original camera"
        )


class TestGhostTrackFiltering:
    """Tests for ghost/flicker track filtering via min_track_seconds."""

    def test_immature_track_still_handoffs(
        self, adjacency: dict
    ) -> None:
        """Handoff (overlap) is always safe — even for immature tracks."""
        config = ReIDConfig(
            enabled=True,
            min_track_seconds=1.0,
        )
        engine = CrossCameraReID(config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_b")

        frame_area = 640 * 480
        bbox = (100, 50, 200, 300)

        # Person on cam_a (mature — backdate track start)
        gid_a = engine.get_global_id("cam_a", 1, bbox, frame_area)
        engine._track_start["cam_a"][1] = time.time() - 5.0

        # Immature flicker on cam_b — handoff should STILL work
        gid_b = engine.get_global_id("cam_b", 10, bbox, frame_area)
        assert gid_a == gid_b, (
            "Handoff (overlap) should work even for immature tracks"
        )

    def test_immature_track_skips_lost_match(
        self, adjacency: dict
    ) -> None:
        """A track younger than min_track_seconds should NOT match lost sigs."""
        config = ReIDConfig(
            enabled=True,
            min_track_seconds=1.0,
        )
        engine = CrossCameraReID(config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_b")

        frame_area = 640 * 480
        bbox = (100, 50, 200, 300)

        # Person lost from cam_a
        gid_a = engine.get_global_id("cam_a", 1, bbox, frame_area)
        engine._track_start["cam_a"][1] = time.time() - 5.0
        engine.person_lost("cam_a", 1, bbox, frame_area)

        # Immature flicker on cam_b — should NOT match lost signature
        gid_b = engine.get_global_id("cam_b", 10, bbox, frame_area)
        assert gid_b != gid_a, (
            "Immature track should not match lost signatures"
        )

    def test_mature_track_does_handoff(
        self, adjacency: dict
    ) -> None:
        """A track that reaches maturity should successfully handoff."""
        config = ReIDConfig(
            enabled=True,
            min_track_seconds=0.01,
        )
        engine = CrossCameraReID(config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_b")

        frame_area = 640 * 480
        bbox = (100, 50, 200, 300)

        gid_a = engine.get_global_id("cam_a", 1, bbox, frame_area)

        # Wait for maturity
        time.sleep(0.02)

        gid_b = engine.get_global_id("cam_b", 10, bbox, frame_area)
        assert gid_a == gid_b, "Mature track should trigger handoff"

    def test_zero_min_track_disables_filtering(
        self, re_id: CrossCameraReID
    ) -> None:
        """With min_track_seconds=0, all tracks are immediately eligible."""
        frame_area = 640 * 480
        bbox = (100, 50, 200, 300)

        gid_a = re_id.get_global_id("cam_a", 1, bbox, frame_area)
        # Immediately trigger handoff on cam_b (no delay)
        gid_b = re_id.get_global_id("cam_b", 10, bbox, frame_area)

        assert gid_a == gid_b, (
            "min_track_seconds=0 should allow immediate handoff"
        )

    def test_ghost_track_no_lost_signature(
        self, adjacency: dict
    ) -> None:
        """Ghost tracks (< min_track_seconds) should NOT store lost sigs."""
        config = ReIDConfig(
            enabled=True,
            min_track_seconds=10.0,  # high threshold
        )
        engine = CrossCameraReID(config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_b")

        frame_area = 640 * 480
        bbox = (100, 50, 200, 300)

        # Ghost flicker — appears and immediately disappears
        engine.get_global_id("cam_a", 1, bbox, frame_area)
        engine.person_lost("cam_a", 1, bbox, frame_area)

        assert len(engine._lost_signatures) == 0, (
            "Ghost track should not create a lost signature"
        )


class TestTrackStartCleanup:
    """Tests for _track_start lifecycle management."""

    def test_person_lost_cleans_track_start(
        self, re_id: CrossCameraReID
    ) -> None:
        """person_lost should remove the _track_start entry."""
        frame_area = 640 * 480
        re_id.get_global_id("cam_a", 1, (10, 10, 50, 50), frame_area)

        assert 1 in re_id._track_start["cam_a"]
        re_id.person_lost("cam_a", 1, (10, 10, 50, 50), frame_area)
        assert 1 not in re_id._track_start["cam_a"]

    def test_new_local_pid_gets_fresh_start(
        self, re_id: CrossCameraReID
    ) -> None:
        """A new local PID should get a fresh track-start time."""
        frame_area = 640 * 480
        re_id.get_global_id("cam_a", 1, (10, 10, 50, 50), frame_area)
        start1 = re_id._track_start["cam_a"][1]

        time.sleep(0.01)
        re_id.get_global_id("cam_a", 2, (60, 10, 100, 50), frame_area)
        start2 = re_id._track_start["cam_a"][2]

        assert start2 > start1


class TestThreadSafety:
    """Basic thread-safety smoke tests."""

    def test_concurrent_get_global_id(
        self, re_id_config: ReIDConfig
    ) -> None:
        """Multiple threads calling get_global_id concurrently."""
        import threading

        adjacency = {"cam_a": ["cam_b"], "cam_b": ["cam_a"]}
        engine = CrossCameraReID(re_id_config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_b")

        results: dict[str, list[int]] = {"cam_a": [], "cam_b": []}
        errors: list[Exception] = []
        frame_area = 640 * 480

        def worker(cam: str) -> None:
            try:
                for pid in range(1, 51):
                    bbox = (10 * pid, 10, 10 * pid + 40, 80)
                    gid = engine.get_global_id(cam, pid, bbox, frame_area)
                    results[cam].append(gid)
            except Exception as exc:  # noqa: BLE001
                errors.append(exc)

        t1 = threading.Thread(target=worker, args=("cam_a",))
        t2 = threading.Thread(target=worker, args=("cam_b",))
        t1.start()
        t2.start()
        t1.join()
        t2.join()

        assert not errors, f"Thread errors: {errors}"
        assert len(results["cam_a"]) == 50
        assert len(results["cam_b"]) == 50

    def test_concurrent_lost_and_new(
        self, re_id_config: ReIDConfig
    ) -> None:
        """One thread loses persons while another creates new ones."""
        import threading

        adjacency = {"cam_a": ["cam_b"], "cam_b": ["cam_a"]}
        engine = CrossCameraReID(re_id_config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_b")

        frame_area = 640 * 480
        errors: list[Exception] = []

        def lose_persons() -> None:
            try:
                for pid in range(1, 21):
                    bbox = (10 * pid, 10, 10 * pid + 40, 80)
                    engine.get_global_id("cam_a", pid, bbox, frame_area)
                for pid in range(1, 21):
                    bbox = (10 * pid, 10, 10 * pid + 40, 80)
                    engine.person_lost("cam_a", pid, bbox, frame_area)
            except Exception as exc:  # noqa: BLE001
                errors.append(exc)

        def create_persons() -> None:
            try:
                for pid in range(101, 121):
                    bbox = (10 * pid, 10, 10 * pid + 40, 80)
                    engine.get_global_id("cam_b", pid, bbox, frame_area)
            except Exception as exc:  # noqa: BLE001
                errors.append(exc)

        t1 = threading.Thread(target=lose_persons)
        t2 = threading.Thread(target=create_persons)
        t1.start()
        t2.start()
        t1.join()
        t2.join()

        assert not errors, f"Thread errors: {errors}"

class TestDeferredReID:
    """Tests for deferred re-ID when tracks mature after initial assignment."""

    def test_immature_track_gets_corrected_after_maturing(self) -> None:
        """An immature track gets a provisional ID, then matches on maturity.

        Scenario: Person walks from cam_a to cam_b.
        1. Person G1 seen on cam_a, then lost.
        2. Person appears on cam_b as local P5, but track is immature.
           → Gets provisional G2.
        3. On a later frame P5 is now mature → deferred re-ID fires.
           → G2 is replaced with G1.
        """
        config = ReIDConfig(
            enabled=True,
            max_lost_seconds=15.0,
            aspect_ratio_tolerance=0.35,
            size_tolerance=0.4,
            min_track_seconds=1.0,
        )
        adjacency = {"cam_a": ["cam_b"], "cam_b": ["cam_a"]}
        engine = CrossCameraReID(config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_b")

        bbox = (100.0, 50.0, 200.0, 350.0)
        frame_area = 640 * 480

        # Person G1 on cam_a — immediate maturity (manually set start time)
        engine._track_start["cam_a"] = {1: time.time() - 5.0}
        g1 = engine.get_global_id("cam_a", 1, bbox, frame_area)

        # Person leaves cam_a
        engine.person_lost("cam_a", 1, bbox, frame_area)

        # Person appears on cam_b as local P5 — immature
        engine._track_start["cam_b"] = {5: time.time()}
        g_provisional = engine.get_global_id("cam_b", 5, bbox, frame_area)

        # Provisional ID should be DIFFERENT from G1
        assert g_provisional != g1

        # Simulate time passing — make the track mature
        engine._track_start["cam_b"][5] = time.time() - 2.0

        # Next get_global_id call should trigger deferred re-ID
        g_corrected = engine.get_global_id("cam_b", 5, bbox, frame_area)

        # Now the person should be re-identified as G1
        assert g_corrected == g1

    def test_immature_track_no_lost_signature_keeps_provisional(self) -> None:
        """If no lost signature exists, provisional ID stays after maturity."""
        config = ReIDConfig(
            enabled=True,
            max_lost_seconds=15.0,
            aspect_ratio_tolerance=0.35,
            size_tolerance=0.4,
            min_track_seconds=1.0,
        )
        adjacency = {"cam_a": ["cam_b"], "cam_b": ["cam_a"]}
        engine = CrossCameraReID(config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_b")

        bbox = (100.0, 50.0, 200.0, 350.0)
        frame_area = 640 * 480

        # Person appears on cam_a — immature, no lost signatures
        engine._track_start["cam_a"] = {1: time.time()}
        g_provisional = engine.get_global_id("cam_a", 1, bbox, frame_area)

        # Make mature
        engine._track_start["cam_a"][1] = time.time() - 2.0

        # Deferred check fires but finds no match → keeps provisional
        g_after = engine.get_global_id("cam_a", 1, bbox, frame_area)
        assert g_after == g_provisional

        # Should be removed from provisional set — no more retries
        assert ("cam_a", 1) not in engine._provisional_gids

    def test_deferred_reid_only_fires_once(self) -> None:
        """Deferred re-ID check is removed after first mature call."""
        config = ReIDConfig(
            enabled=True,
            max_lost_seconds=15.0,
            aspect_ratio_tolerance=0.35,
            size_tolerance=0.4,
            min_track_seconds=1.0,
        )
        adjacency = {"cam_a": ["cam_b"], "cam_b": ["cam_a"]}
        engine = CrossCameraReID(config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_b")

        bbox = (100.0, 50.0, 200.0, 350.0)
        frame_area = 640 * 480

        # Immature track on cam_a
        engine._track_start["cam_a"] = {1: time.time()}
        g1 = engine.get_global_id("cam_a", 1, bbox, frame_area)
        assert ("cam_a", 1) in engine._provisional_gids

        # Make mature, call again (no lost sigs → stays as g1)
        engine._track_start["cam_a"][1] = time.time() - 2.0
        engine.get_global_id("cam_a", 1, bbox, frame_area)
        assert ("cam_a", 1) not in engine._provisional_gids

        # Third call — should NOT retry and definitely not error
        g3 = engine.get_global_id("cam_a", 1, bbox, frame_area)
        assert g3 == g1

    def test_person_lost_clears_provisional(self) -> None:
        """person_lost cleans up provisional tracking."""
        config = ReIDConfig(
            enabled=True,
            max_lost_seconds=15.0,
            aspect_ratio_tolerance=0.35,
            size_tolerance=0.4,
            min_track_seconds=1.0,
        )
        adjacency = {"cam_a": ["cam_b"], "cam_b": ["cam_a"]}
        engine = CrossCameraReID(config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_b")

        bbox = (100.0, 50.0, 200.0, 350.0)
        frame_area = 640 * 480

        # Immature track → provisional
        engine._track_start["cam_a"] = {1: time.time()}
        engine.get_global_id("cam_a", 1, bbox, frame_area)
        assert ("cam_a", 1) in engine._provisional_gids

        # Lost before maturing — must clean up
        engine._track_start["cam_a"][1] = time.time() - 2.0
        engine.person_lost("cam_a", 1, bbox, frame_area)
        assert ("cam_a", 1) not in engine._provisional_gids

    def test_rapid_camera_switches_single_person(self) -> None:
        """One person switching cam_a → cam_b → cam_a gets ONE global ID.

        This tests the exact scenario from the user's log where a single
        person rapidly switching cameras got G1, G2, G3, G4.
        """
        config = ReIDConfig(
            enabled=True,
            max_lost_seconds=15.0,
            aspect_ratio_tolerance=0.35,
            size_tolerance=0.4,
            min_track_seconds=1.0,
        )
        adjacency = {"cam_a": ["cam_b"], "cam_b": ["cam_a"]}
        engine = CrossCameraReID(config, adjacency)
        engine.register_camera("cam_a")
        engine.register_camera("cam_b")

        bbox = (100.0, 50.0, 200.0, 350.0)
        frame_area = 640 * 480
        all_ids: set[int] = set()

        # --- Round 1: person on cam_a ---
        engine._track_start["cam_a"] = {1: time.time() - 5.0}
        g = engine.get_global_id("cam_a", 1, bbox, frame_area)
        all_ids.add(g)
        engine.person_lost("cam_a", 1, bbox, frame_area)

        # --- Round 2: person moves to cam_b (immature at first) ---
        engine._track_start["cam_b"] = {10: time.time()}
        g_prov = engine.get_global_id("cam_b", 10, bbox, frame_area)
        # Immature → provisional new ID
        assert g_prov not in all_ids

        # Track matures on cam_b → deferred re-ID should correct it
        engine._track_start["cam_b"][10] = time.time() - 2.0
        g2 = engine.get_global_id("cam_b", 10, bbox, frame_area)
        all_ids.add(g2)
        engine.person_lost("cam_b", 10, bbox, frame_area)

        # --- Round 3: back to cam_a (immature at first) ---
        engine._track_start["cam_a"] = {20: time.time()}
        g_prov2 = engine.get_global_id("cam_a", 20, bbox, frame_area)

        engine._track_start["cam_a"][20] = time.time() - 2.0
        g3 = engine.get_global_id("cam_a", 20, bbox, frame_area)
        all_ids.add(g3)

        # All corrected IDs should be the SAME person
        assert len(all_ids) == 1, (
            f"Expected 1 global ID for 1 person, got {len(all_ids)}: {all_ids}"
        )