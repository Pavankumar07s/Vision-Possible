"""Event-to-sequence assembler for SmartGuard.

Receives raw HA / SmartThings / Vision events and assembles them into
fixed-length behavior sequences that SmartGuard can consume.

Each event is recorded as:
    BehaviorEvent(timestamp, device_type, action, day_of_week, hour_bucket)

Events are buffered and assembled into sequences of length
``sequence_length`` (default 10).  Each sequence is a flat numpy array
of shape (sequence_length * 4,) == (40,) with the layout:

    [day0, hour0, device0, action0, day1, hour1, device1, action1, ...]
"""

from __future__ import annotations

import json
import logging
import threading
import time
from collections import deque
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any

import numpy as np

from src.assembler import DeviceVocab, hour_to_bucket

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class BehaviorEvent:
    """Single behavior event ready for sequence assembly."""

    timestamp: float
    day_of_week: int      # 0-6 (Mon-Sun)
    hour_bucket: int      # 0-7 (3-hour buckets)
    device_type_id: int   # Integer from DeviceVocab
    action_id: int        # Integer from DeviceVocab

    # Human-readable metadata (for logging / diagnostics)
    device_name: str = ""
    action_name: str = ""
    source: str = ""      # "smartthings" | "vision" | "wearable" | "ha"


class SequenceAssembler:
    """Assembles behavior events into fixed-length sequences.

    Thread-safe.  Call ``add_event()`` from any thread.
    Call ``flush()`` periodically to extract complete sequences.

    Args:
        vocab: Device vocabulary for encoding.
        sequence_length: Number of events per sequence.
        max_buffer_minutes: Max age of events in buffer.
        min_events: Minimum events required to form a sequence.

    """

    def __init__(
        self,
        vocab: DeviceVocab,
        sequence_length: int = 10,
        max_buffer_minutes: int = 60,
        min_events: int = 5,
    ) -> None:
        self.vocab = vocab
        self.sequence_length = sequence_length
        self.max_buffer_seconds = max_buffer_minutes * 60
        self.min_events = min_events
        self._buffer: deque[BehaviorEvent] = deque(maxlen=5000)
        self._lock = threading.Lock()
        self._event_log_path: Path | None = None

    def set_event_log(self, path: Path) -> None:
        """Enable persistent event logging to a JSONL file."""
        self._event_log_path = path
        path.parent.mkdir(parents=True, exist_ok=True)

    # ── Event ingestion ─────────────────────────────────────

    def add_event(
        self,
        device_type: str,
        action: str,
        source: str = "ha",
        device_name: str = "",
        timestamp: float | None = None,
    ) -> None:
        """Add a raw event to the buffer.

        Args:
            device_type: SmartThings device type or virtual type.
            action: Device action string.
            source: Event source identifier.
            device_name: Human-readable device name.
            timestamp: Unix timestamp (defaults to now).

        """
        ts = timestamp or time.time()
        dt = datetime.fromtimestamp(ts)

        event = BehaviorEvent(
            timestamp=ts,
            day_of_week=dt.weekday(),
            hour_bucket=hour_to_bucket(dt.hour),
            device_type_id=self.vocab.get_device_id(device_type),
            action_id=self.vocab.get_action_id(action),
            device_name=device_name,
            action_name=action,
            source=source,
        )

        with self._lock:
            self._buffer.append(event)

        # Persist to log
        if self._event_log_path:
            self._log_event(event)

        logger.debug(
            "Event: %s → %s (%s) [day=%d hour=%d]",
            device_type, action, source,
            event.day_of_week, event.hour_bucket,
        )

    def _log_event(self, event: BehaviorEvent) -> None:
        """Append event to JSONL log file."""
        try:
            record = {
                "timestamp": event.timestamp,
                "day_of_week": event.day_of_week,
                "hour_bucket": event.hour_bucket,
                "device_type_id": event.device_type_id,
                "action_id": event.action_id,
                "device_name": event.device_name,
                "action_name": event.action_name,
                "source": event.source,
            }
            with open(self._event_log_path, "a") as f:  # type: ignore[arg-type]
                f.write(json.dumps(record) + "\n")
        except OSError:
            logger.warning("Failed to write event log")

    # ── Sequence extraction ─────────────────────────────────

    def flush(self) -> list[np.ndarray]:
        """Extract all complete sequences from the buffer.

        Returns a list of numpy arrays, each of shape
        ``(sequence_length * 4,)``.

        Events older than ``max_buffer_seconds`` are discarded.
        """
        now = time.time()
        with self._lock:
            # Discard stale events
            while (
                self._buffer
                and now - self._buffer[0].timestamp > self.max_buffer_seconds
            ):
                self._buffer.popleft()

            events = list(self._buffer)

        if len(events) < self.min_events:
            return []

        sequences: list[np.ndarray] = []

        # Sliding window with stride 1
        for i in range(0, len(events) - self.sequence_length + 1):
            window = events[i : i + self.sequence_length]
            seq = self._encode_sequence(window)
            sequences.append(seq)

        # Remove consumed events (keep last sequence_length - 1 for overlap)
        if sequences:
            consume_count = len(events) - self.sequence_length + 1
            with self._lock:
                for _ in range(min(consume_count, len(self._buffer))):
                    self._buffer.popleft()

        return sequences

    def get_latest_sequence(self) -> np.ndarray | None:
        """Get the most recent sequence without consuming the buffer.

        Returns None if insufficient events.
        """
        with self._lock:
            events = list(self._buffer)

        if len(events) < self.min_events:
            return None

        # Pad if fewer than sequence_length events
        if len(events) < self.sequence_length:
            # Pad with zeros (will be handled as padding by the model)
            window = list(events)
            while len(window) < self.sequence_length:
                window.insert(0, BehaviorEvent(
                    timestamp=0, day_of_week=0, hour_bucket=0,
                    device_type_id=0, action_id=0,
                ))
        else:
            window = events[-self.sequence_length:]

        return self._encode_sequence(window)

    def _encode_sequence(
        self, events: list[BehaviorEvent],
    ) -> np.ndarray:
        """Encode a list of events into SmartGuard's flat array format.

        Output shape: (sequence_length * 4,) = (40,)
        Layout per event: [day_of_week, hour_bucket, device_type_id, action_id]
        """
        flat: list[int] = []
        for e in events:
            flat.extend([
                e.day_of_week,
                e.hour_bucket,
                e.device_type_id,
                e.action_id,
            ])
        return np.array(flat, dtype=np.int64)

    @property
    def buffer_size(self) -> int:
        """Current number of events in buffer."""
        with self._lock:
            return len(self._buffer)

    def get_stats(self) -> dict[str, Any]:
        """Return assembler statistics."""
        with self._lock:
            events = list(self._buffer)
        sources: dict[str, int] = {}
        for e in events:
            sources[e.source] = sources.get(e.source, 0) + 1
        return {
            "buffer_size": len(events),
            "sources": sources,
            "oldest_event_age": (
                time.time() - events[0].timestamp if events else 0
            ),
        }
