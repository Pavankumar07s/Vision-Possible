"""Cross-camera person re-identification for ETMS Vision Service.

Uses three strategies to maintain person identity across cameras:

1. **Handoff** (overlap): During room transitions a person is often
   visible on both cameras simultaneously. When a new person appears
   on camera B, we check if exactly one global person is already
   active on an adjacent camera — if so, assign the same global ID.

2. **Temporal match** (gap): If a person disappears from camera A and
   a new person appears on adjacent camera B within the timeout, match
   them.  When there is only one candidate the match is temporal-only
   (appearance is ignored because different camera angles produce
   wildly different bounding boxes).  Also allows same-camera re-entry.

3. **Appearance tiebreaker**: When multiple candidates exist, bbox
   aspect-ratio and area are compared to pick the best match.
"""

from __future__ import annotations

import logging
import threading
import time
from dataclasses import dataclass, field
from typing import Any

from src.utils.config import ReIDConfig

logger = logging.getLogger(__name__)

# Very relaxed sanity check for single-candidate temporal matching.
_TEMPORAL_ASPECT_SANITY = 2.0
_TEMPORAL_AREA_SANITY = 0.85

# Default minimum track duration (seconds) before a person is
# eligible for handoff or re-ID.  Prevents YOLO detection flicker
# (tracks that live for a single frame) from poisoning global IDs.
# The actual value is taken from ReIDConfig.min_track_seconds.


@dataclass
class PersonSignature:
    """Lightweight appearance descriptor for a tracked person."""

    global_id: int
    camera_id: str
    bbox_aspect_ratio: float  # width / height
    bbox_area: float  # normalized by frame area
    last_seen: float
    last_zone: str = ""

    @property
    def is_expired(self) -> bool:
        """Check if this signature is too old to match."""
        return False  # Caller checks with config timeout


@dataclass
class GlobalTrack:
    """A person tracked across cameras."""

    global_id: int
    camera_tracks: dict[str, int] = field(default_factory=dict)
    first_seen: float = 0.0
    last_seen: float = 0.0
    last_camera: str = ""


class CrossCameraReID:
    """Manages person identity across multiple cameras.

    Maintains a registry of recently-lost persons and tries to
    match new appearances on adjacent cameras.
    """

    def __init__(
        self,
        config: ReIDConfig,
        adjacency: dict[str, list[str]],
    ) -> None:
        """Initialize cross-camera re-identification.

        Args:
            config: Re-ID configuration parameters.
            adjacency: Map of camera_id → list of adjacent camera_ids.

        """
        self.config = config
        self.adjacency = adjacency
        self._next_global_id = 1
        self._lock = threading.Lock()

        # camera_id → {local_pid → global_id}
        self.local_to_global: dict[str, dict[int, int]] = {}

        # Recently lost persons awaiting re-ID
        self._lost_signatures: list[PersonSignature] = []

        # Global track registry
        self.global_tracks: dict[int, GlobalTrack] = {}

        # camera_id → {local_pid → first_seen_time}
        # Used to reject ghost/flicker tracks from handoff and re-ID.
        self._track_start: dict[str, dict[int, float]] = {}

        # Global IDs assigned while the track was still immature.
        # When the track matures, re-ID matching is retried once.
        # Key: (camera_id, local_pid), Value: assigned provisional gid.
        self._provisional_gids: dict[tuple[str, int], int] = {}

    def register_camera(self, camera_id: str) -> None:
        """Register a camera for tracking.

        Args:
            camera_id: Unique identifier for the camera.

        """
        self.local_to_global[camera_id] = {}
        self._track_start[camera_id] = {}
        logger.info("Registered camera for re-ID: %s", camera_id)

    def get_global_id(
        self,
        camera_id: str,
        local_pid: int,
        bbox: tuple[float, float, float, float] | None = None,
        frame_area: float = 1.0,
        zone: str = "",
    ) -> int:
        """Get or assign a global person ID (thread-safe).

        Matching order:
        1. Return existing mapping if this local PID is already known.
        2. Try *handoff* — the person is still active on an adjacent
           camera (overlap during room transition).
        3. Try *lost matching* — a recently-lost person from an
           adjacent camera **or the same camera** (gap case).
        4. Assign a brand-new global ID.

        Handoff and lost matching are only attempted for tracks that
        have lived longer than ``_MIN_TRACK_SECONDS_FOR_REID`` to
        prevent YOLO detection flicker from consuming global IDs.

        Args:
            camera_id: Camera where the person is seen.
            local_pid: Local tracker person ID.
            bbox: Bounding box (x1, y1, x2, y2) for appearance matching.
            frame_area: Total frame area for normalization.
            zone: Current zone name.

        Returns:
            Global person ID.

        """
        with self._lock:
            return self._get_global_id_locked(
                camera_id, local_pid, bbox, frame_area, zone,
            )

    def _get_global_id_locked(
        self,
        camera_id: str,
        local_pid: int,
        bbox: tuple[float, float, float, float] | None,
        frame_area: float,
        zone: str,
    ) -> int:
        """Internal implementation of get_global_id (caller holds lock)."""
        mapping = self.local_to_global.get(camera_id, {})
        now = time.time()

        # Record when we first saw this local PID
        starts = self._track_start.setdefault(camera_id, {})
        if local_pid not in starts:
            starts[local_pid] = now

        track_age = now - starts[local_pid]
        mature = track_age >= self.config.min_track_seconds

        # ── Already known ──────────────────────────────────────
        if local_pid in mapping:
            gid = mapping[local_pid]

            # Deferred re-ID: the ID was assigned while the track
            # was still immature. Now that it matured, retry
            # matching against lost signatures ONE TIME.
            prov_key = (camera_id, local_pid)
            if prov_key in self._provisional_gids and mature:
                old_gid = self._provisional_gids.pop(prov_key)
                matched = self._try_match(
                    camera_id, bbox, frame_area, zone,
                )
                if matched is not None:
                    logger.info(
                        "Deferred re-ID: G%d → G%d on %s P%d",
                        old_gid, matched, camera_id, local_pid,
                    )
                    gid = matched
                    mapping[local_pid] = gid
                    # Migrate global track entry
                    if gid not in self.global_tracks:
                        self.global_tracks[gid] = GlobalTrack(
                            global_id=gid,
                            first_seen=now,
                            last_seen=now,
                            last_camera=camera_id,
                        )
                    track = self.global_tracks[gid]
                    track.camera_tracks[camera_id] = local_pid
                    track.last_seen = now
                    track.last_camera = camera_id
                    return gid

            if gid in self.global_tracks:
                self.global_tracks[gid].last_seen = now
                self.global_tracks[gid].last_camera = camera_id
            return gid

        # ── New local PID — try matching ───────────────────────
        gid: int | None = None

        # Strategy 1: handoff from adjacent camera (overlap case)
        # No maturity gate — overlap handoff is always safe.
        gid = self._try_handoff(camera_id)

        # Strategy 2: match against lost signatures (gap case)
        # Requires maturity to prevent ghost flicker from consuming
        # real lost signatures.
        if gid is None and mature:
            gid = self._try_match(camera_id, bbox, frame_area, zone)

        if gid is None:
            gid = self._next_global_id
            self._next_global_id += 1
            logger.debug(
                "New global person G%d on camera %s (local P%d)",
                gid, camera_id, local_pid,
            )
            # If immature, mark as provisional so we can retry
            # matching once the track matures.
            if not mature:
                self._provisional_gids[(camera_id, local_pid)] = gid

        mapping[local_pid] = gid
        self.local_to_global[camera_id] = mapping

        if gid not in self.global_tracks:
            self.global_tracks[gid] = GlobalTrack(
                global_id=gid,
                first_seen=now,
                last_seen=now,
                last_camera=camera_id,
            )
        track = self.global_tracks[gid]
        track.camera_tracks[camera_id] = local_pid
        track.last_seen = now
        track.last_camera = camera_id

        return gid

    def person_lost(
        self,
        camera_id: str,
        local_pid: int,
        bbox: tuple[float, float, float, float] | None = None,
        frame_area: float = 1.0,
        zone: str = "",
    ) -> None:
        """Record that a person has been lost from a camera (thread-safe).

        If the same global person is still active on another camera
        (handoff already happened), no lost signature is stored.
        Otherwise their appearance is saved for potential re-ID.

        Args:
            camera_id: Camera that lost the person.
            local_pid: Local tracker person ID.
            bbox: Last known bounding box.
            frame_area: Frame area for normalization.
            zone: Last known zone.

        """
        with self._lock:
            self._person_lost_locked(
                camera_id, local_pid, bbox, frame_area, zone,
            )

    def _person_lost_locked(
        self,
        camera_id: str,
        local_pid: int,
        bbox: tuple[float, float, float, float] | None,
        frame_area: float,
        zone: str,
    ) -> None:
        """Internal implementation of person_lost (caller holds lock)."""
        mapping = self.local_to_global.get(camera_id, {})
        gid = mapping.pop(local_pid, None)

        # Clean up provisional re-ID tracking
        self._provisional_gids.pop((camera_id, local_pid), None)

        # Clean up track-start timestamp and check maturity
        starts = self._track_start.get(camera_id, {})
        start_time = starts.pop(local_pid, None)

        if gid is None:
            return

        # Ghost/flicker tracks (shorter than min_track_seconds)
        # should NOT store a lost signature — they would pollute
        # the re-ID pool and potentially consume real signatures.
        if start_time is not None:
            track_age = time.time() - start_time
            if track_age < self.config.min_track_seconds:
                logger.debug(
                    "Person G%d lost from %s after %.1fs "
                    "(< %.1fs min) — discarding ghost",
                    gid, camera_id, track_age,
                    self.config.min_track_seconds,
                )
                return

        # If this global person is still active on another camera
        # (handoff already occurred), skip storing a lost signature.
        for cam_id, cam_mapping in self.local_to_global.items():
            if cam_id != camera_id and gid in cam_mapping.values():
                logger.debug(
                    "Person G%d left %s but still active on %s, "
                    "skipping lost signature",
                    gid, camera_id, cam_id,
                )
                return

        if bbox and len(bbox) == 4:
            x1, y1, x2, y2 = bbox
            w = x2 - x1
            h = y2 - y1
            aspect = w / h if h > 0 else 1.0
            area = (w * h) / frame_area if frame_area > 0 else 0.0
        else:
            aspect = 1.0
            area = 0.0

        sig = PersonSignature(
            global_id=gid,
            camera_id=camera_id,
            bbox_aspect_ratio=aspect,
            bbox_area=area,
            last_seen=time.time(),
            last_zone=zone,
        )
        self._lost_signatures.append(sig)

        logger.debug(
            "Person G%d lost from camera %s, stored for re-ID "
            "(aspect=%.2f, area=%.4f, zone=%s)",
            gid, camera_id, aspect, area, zone,
        )

    def _try_handoff(self, camera_id: str) -> int | None:
        """Try to hand off a person from an adjacent camera.

        During a room transition the person is often visible on both
        cameras simultaneously. If exactly one global person is active
        on an adjacent camera and NOT already tracked on *this* camera,
        assign the same global ID (handoff).

        Args:
            camera_id: Camera where the new person appeared.

        Returns:
            Global ID if a handoff match is found, otherwise None.

        """
        if not self.config.enabled:
            return None

        adjacent = self.adjacency.get(camera_id, [])
        if not adjacent:
            return None

        my_gids = set(
            self.local_to_global.get(camera_id, {}).values()
        )

        candidates: set[int] = set()
        source_cam = ""
        for adj_cam in adjacent:
            for gid in self.local_to_global.get(adj_cam, {}).values():
                if gid not in my_gids:
                    candidates.add(gid)
                    source_cam = adj_cam

        if len(candidates) == 1:
            gid = next(iter(candidates))
            logger.info(
                "Handoff: G%d from %s → %s (overlap)",
                gid, source_cam, camera_id,
            )
            return gid

        return None

    def _try_match(
        self,
        camera_id: str,
        bbox: tuple[float, float, float, float] | None,
        frame_area: float,
        zone: str,
    ) -> int | None:
        """Try to match a new person against lost signatures.

        Considers candidates from **adjacent cameras** and from the
        **same camera** (same-camera re-entry, e.g. person walks out
        and back through the same door).

        Uses a temporal-first strategy:
        - **Single candidate** → match by temporal proximity alone
          (with a very relaxed sanity check on bbox shape).
        - **Multiple candidates** → use bbox appearance as tiebreaker.

        Args:
            camera_id: Camera where the new person appeared.
            bbox: Bounding box of the new person.
            frame_area: Frame area for normalization.
            zone: Current zone name.

        Returns:
            Global ID if matched, otherwise None.

        """
        if not self.config.enabled:
            return None

        now = time.time()

        # Clean expired signatures
        self._lost_signatures = [
            s for s in self._lost_signatures
            if now - s.last_seen < self.config.max_lost_seconds
        ]

        if not self._lost_signatures:
            return None

        adjacent = self.adjacency.get(camera_id, [])

        # Candidates: from adjacent cameras OR same camera (re-entry)
        eligible_cameras = set(adjacent) | {camera_id}
        candidates = [
            s for s in self._lost_signatures
            if s.camera_id in eligible_cameras
        ]

        if not candidates:
            return None

        logger.debug(
            "Re-ID attempt on %s: %d candidate(s), "
            "eligible=%s",
            camera_id, len(candidates), sorted(eligible_cameras),
        )

        # --- Single candidate: temporal match -------------------------
        if len(candidates) == 1:
            sig = candidates[0]
            elapsed = now - sig.last_seen

            # Optional sanity check using bbox if available
            if bbox and len(bbox) == 4:
                x1, y1, x2, y2 = bbox
                w, h = x2 - x1, y2 - y1
                new_aspect = w / h if h > 0 else 1.0
                new_area = (
                    (w * h) / frame_area if frame_area > 0 else 0.0
                )
                aspect_diff = abs(sig.bbox_aspect_ratio - new_aspect)
                area_diff = abs(sig.bbox_area - new_area)

                logger.debug(
                    "  Temporal candidate G%d from %s: "
                    "aspect_diff=%.3f (sanity=%.1f) "
                    "area_diff=%.4f (sanity=%.2f) elapsed=%.1fs",
                    sig.global_id, sig.camera_id,
                    aspect_diff, _TEMPORAL_ASPECT_SANITY,
                    area_diff, _TEMPORAL_AREA_SANITY,
                    elapsed,
                )

                if (
                    aspect_diff > _TEMPORAL_ASPECT_SANITY
                    or area_diff > _TEMPORAL_AREA_SANITY
                ):
                    logger.debug(
                        "  Sanity check failed — not the same person"
                    )
                    return None

            self._lost_signatures.remove(sig)
            logger.info(
                "Re-ID temporal match: G%d from %s → %s "
                "(elapsed=%.1fs)",
                sig.global_id, sig.camera_id, camera_id, elapsed,
            )
            return sig.global_id

        # --- Multiple candidates: appearance tiebreaker ---------------
        if not bbox or len(bbox) != 4:
            return None

        x1, y1, x2, y2 = bbox
        w, h = x2 - x1, y2 - y1
        new_aspect = w / h if h > 0 else 1.0
        new_area = (w * h) / frame_area if frame_area > 0 else 0.0

        best_match: PersonSignature | None = None
        best_score = float("inf")

        for sig in candidates:
            aspect_diff = abs(sig.bbox_aspect_ratio - new_aspect)
            area_diff = abs(sig.bbox_area - new_area)
            score = aspect_diff + area_diff

            logger.debug(
                "  vs G%d from %s: score=%.3f "
                "(aspect_diff=%.3f, area_diff=%.4f)",
                sig.global_id, sig.camera_id, score,
                aspect_diff, area_diff,
            )

            if score < best_score:
                best_score = score
                best_match = sig

        if best_match:
            self._lost_signatures.remove(best_match)
            logger.info(
                "Re-ID appearance match: G%d from %s → %s "
                "(score=%.3f)",
                best_match.global_id, best_match.camera_id,
                camera_id, best_score,
            )
            return best_match.global_id

        return None

    def cleanup(self) -> None:
        """Remove expired signatures and stale global tracks (thread-safe)."""
        with self._lock:
            now = time.time()
            self._lost_signatures = [
                s for s in self._lost_signatures
                if now - s.last_seen < self.config.max_lost_seconds
            ]

            # Remove global tracks not seen for 5 minutes
            expired = [
                gid for gid, t in self.global_tracks.items()
                if now - t.last_seen > 300
            ]
            for gid in expired:
                del self.global_tracks[gid]

    @property
    def active_global_count(self) -> int:
        """Number of currently tracked global persons."""
        with self._lock:
            now = time.time()
            return sum(
                1 for t in self.global_tracks.values()
                if now - t.last_seen < 30
            )

    def get_summary(self) -> dict[str, Any]:
        """Get a summary of cross-camera tracking state."""
        with self._lock:
            return {
                "global_persons": self.active_global_count_unlocked,
                "lost_awaiting_reid": len(self._lost_signatures),
                "total_tracked": len(self.global_tracks),
                "cameras": {
                    cam_id: len(mapping)
                    for cam_id, mapping in self.local_to_global.items()
                },
            }

    @property
    def active_global_count_unlocked(self) -> int:
        """Non-locking global count (caller must hold lock)."""
        now = time.time()
        return sum(
            1 for t in self.global_tracks.values()
            if now - t.last_seen < 30
        )
