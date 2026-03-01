"""Real-time anomaly inference engine for ETMS.

Bridges the SequenceAssembler (event stream → encoded sequences)
and the SmartGuardModel (sequence → anomaly score) into a
single high-level API that manages cooldowns, severity mapping,
and anomaly history.
"""

from __future__ import annotations

import logging
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import numpy as np

from src.assembler import DeviceVocab
from src.assembler.pipeline import SequenceAssembler
from src.model import SmartGuardModel

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class AnomalyResult:
    """Immutable anomaly detection result."""

    timestamp: float
    anomaly_score: float
    is_anomaly: bool
    severity: str                  # none | low | medium | high | critical
    per_event_loss: list[float]
    threshold: float | None
    sequence_id: int               # running counter
    event_count: int               # number of events in buffer


_SEVERITY_LEVELS = [
    ("critical", 0.95),
    ("high", 0.85),
    ("medium", 0.70),
    ("low", 0.50),
]


def _classify_severity(
    score: float,
    threshold: float | None,
    levels: list[tuple[str, float]] | None = None,
) -> str:
    """Map anomaly score to human-readable severity label."""
    if threshold is None or score <= threshold:
        return "none"

    # Normalized overshoot: how far above threshold
    overshoot = (score - threshold) / (threshold + 1e-8)
    for label, cutoff in (levels or _SEVERITY_LEVELS):
        if overshoot >= cutoff:
            return label
    return "low"


@dataclass
class InferenceEngine:
    """Orchestrates real-time SmartGuard inference.

    Periodically flushes the assembler, feeds sequences through
    the model, and returns anomaly results.

    Args:
        model: A loaded SmartGuardModel.
        assembler: SequenceAssembler that buffers events.
        cooldown_seconds: Minimum interval between anomaly reports.
        severity_levels: Override for severity classification cutoffs.

    """

    model: SmartGuardModel
    assembler: SequenceAssembler
    cooldown_seconds: float = 60.0
    severity_levels: list[tuple[str, float]] = field(
        default_factory=lambda: list(_SEVERITY_LEVELS),
    )

    _last_anomaly_time: float = field(default=0.0, init=False)
    _sequence_counter: int = field(default=0, init=False)
    _history: list[AnomalyResult] = field(
        default_factory=list, init=False,
    )

    # ── Public API ──────────────────────────────────────────

    def evaluate_latest(self) -> AnomalyResult | None:
        """Evaluate the latest behavior sequence.

        Returns ``None`` when insufficient events or still in cooldown.
        """
        seq = self.assembler.get_latest_sequence()
        if seq is None:
            return None

        result = self._run_inference(seq)
        return result

    def flush_and_evaluate(self) -> list[AnomalyResult]:
        """Flush all complete sequences and evaluate each.

        Returns a list of results — only those that pass the cooldown
        filter.
        """
        sequences = self.assembler.flush()
        if not sequences:
            return []

        results: list[AnomalyResult] = []
        for seq in sequences:
            result = self._run_inference(seq)
            if result is not None:
                results.append(result)
        return results

    @property
    def history(self) -> list[AnomalyResult]:
        """Return recent anomaly result history."""
        return list(self._history)

    @property
    def latest_score(self) -> float | None:
        """Return most recent anomaly score, or None."""
        if not self._history:
            return None
        return self._history[-1].anomaly_score

    @property
    def latest_severity(self) -> str:
        """Return severity string of most recent evaluation."""
        if not self._history:
            return "none"
        return self._history[-1].severity

    @property
    def is_anomalous(self) -> bool:
        """Return whether the latest evaluation is anomalous."""
        if not self._history:
            return False
        return self._history[-1].is_anomaly

    def get_status(self) -> dict[str, Any]:
        """Build a status snapshot for MQTT publishing."""
        return {
            "model_loaded": True,
            "threshold": self.model._threshold,
            "sequences_evaluated": self._sequence_counter,
            "buffer_size": len(self.assembler._buffer),
            "latest_score": self.latest_score,
            "latest_severity": self.latest_severity,
            "history_size": len(self._history),
        }

    # ── Internal ────────────────────────────────────────────

    def _run_inference(self, sequence: np.ndarray) -> AnomalyResult | None:
        """Run model prediction and build AnomalyResult."""
        now = time.time()

        pred = self.model.predict(sequence)

        self._sequence_counter += 1
        severity = _classify_severity(
            pred["anomaly_score"],
            pred["threshold"],
            self.severity_levels,
        )

        result = AnomalyResult(
            timestamp=now,
            anomaly_score=pred["anomaly_score"],
            is_anomaly=pred["is_anomaly"],
            severity=severity,
            per_event_loss=pred["per_event_loss"],
            threshold=pred["threshold"],
            sequence_id=self._sequence_counter,
            event_count=len(self.assembler._buffer),
        )

        # Cooldown check — always record, only flag anomaly if cooldown met
        if result.is_anomaly:
            dt = now - self._last_anomaly_time
            if dt < self.cooldown_seconds:
                logger.debug(
                    "Anomaly suppressed (cooldown %.1fs remaining)",
                    self.cooldown_seconds - dt,
                )
                # Replace with non-anomaly version
                result = AnomalyResult(
                    timestamp=result.timestamp,
                    anomaly_score=result.anomaly_score,
                    is_anomaly=False,
                    severity="none",
                    per_event_loss=result.per_event_loss,
                    threshold=result.threshold,
                    sequence_id=result.sequence_id,
                    event_count=result.event_count,
                )
            else:
                self._last_anomaly_time = now
                logger.warning(
                    "ANOMALY DETECTED  score=%.4f  severity=%s  seq=%d",
                    result.anomaly_score, result.severity,
                    result.sequence_id,
                )

        # Keep bounded history (last 500)
        self._history.append(result)
        if len(self._history) > 500:
            self._history = self._history[-500:]

        return result


def build_engine(
    config: dict[str, Any],
    vocab: DeviceVocab,
) -> InferenceEngine:
    """Factory — build an InferenceEngine from settings dict.

    Expects keys in ``config``:
    - model.*: model hyper-parameters
    - inference.*: threshold_percentile, cooldown, severity_levels
    - assembler.*: pipeline config
    - storage.*: data paths
    """
    model_cfg = config.get("model", {})
    storage = config.get("storage", {})

    # If a trained checkpoint exists, use its vocab_size so weights load
    effective_vocab_size = vocab.vocab_size
    threshold_path = storage.get("threshold_file")
    meta: dict[str, Any] = {}
    if threshold_path and Path(threshold_path).exists():
        import json
        meta = json.loads(Path(threshold_path).read_text())
        if "vocab_size" in meta:
            effective_vocab_size = meta["vocab_size"]
            logger.info(
                "Using vocab_size=%d from trained model metadata",
                effective_vocab_size,
            )

    model = SmartGuardModel(
        vocab_size=effective_vocab_size,
        d_model=model_cfg.get("d_model", 256),
        nhead=model_cfg.get("nhead", 8),
        num_layers=model_cfg.get("num_layers", 2),
        mask_strategy=model_cfg.get("mask_strategy", "loss_guided"),
        mask_ratio=model_cfg.get("mask_ratio", 0.2),
        mask_step=model_cfg.get("mask_step", 4),
        device=model_cfg.get("device"),
    )

    # Load checkpoint if available
    ckpt = storage.get("model_checkpoint")
    if ckpt and Path(ckpt).exists():
        model.load(Path(ckpt))
        logger.info("Loaded checkpoint from %s", ckpt)

    # Load threshold and behavior weights from metadata
    if meta:
        if "threshold" in meta:
            model.set_threshold(meta["threshold"])
        if "behavior_weights" in meta:
            weights = {int(k): v for k, v in meta["behavior_weights"].items()}
            model.set_behavior_weights(weights)

    asm_cfg = config.get("assembler", {})
    assembler = SequenceAssembler(
        vocab=vocab,
        sequence_length=asm_cfg.get("sequence_length", 10),
        max_buffer_minutes=asm_cfg.get("max_buffer_minutes", 60),
    )
    event_log = storage.get("event_log")
    if event_log:
        assembler.set_event_log(Path(event_log))

    inf_cfg = config.get("inference", {})
    severity = inf_cfg.get("severity_levels", {})
    levels = [
        ("critical", severity.get("critical", 0.95)),
        ("high", severity.get("high", 0.85)),
        ("medium", severity.get("medium", 0.70)),
        ("low", severity.get("low", 0.50)),
    ]

    return InferenceEngine(
        model=model,
        assembler=assembler,
        cooldown_seconds=inf_cfg.get("cooldown", 60),
        severity_levels=levels,
    )
