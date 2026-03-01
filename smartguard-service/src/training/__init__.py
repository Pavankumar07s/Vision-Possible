"""SmartGuard training adapter for ETMS.

Provides a training pipeline that can train or fine-tune the
SmartGuard model using event sequences collected by the assembler.
Also supports converting raw pickle data from the original
SmartGuard repo format.
"""

from __future__ import annotations

import json
import logging
import pickle
import random
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import DataLoader

import sys
_SMARTGUARD_ROOT = Path(__file__).resolve().parents[3] / "SmartGuard"
if str(_SMARTGUARD_ROOT) not in sys.path:
    sys.path.insert(0, str(_SMARTGUARD_ROOT))

from SmartGuard import TimeSeriesDataset  # noqa: E402

from src.model import SmartGuardModel

logger = logging.getLogger(__name__)


@dataclass
class TrainingResult:
    """Summary of a training run."""

    epochs_completed: int
    final_train_loss: float
    final_val_loss: float
    best_val_loss: float
    threshold: float
    behavior_weights_count: int
    duration_seconds: float


class Trainer:
    """Trains SmartGuard on ETMS behavior sequences.

    Args:
        model: SmartGuardModel wrapper instance.
        learning_rate: Optimizer learning rate.
        epochs: Maximum training epochs.
        batch_size: Mini-batch size.
        early_stop_patience: Epochs without improvement to stop.
        seed: Random seed.

    """

    def __init__(
        self,
        model: SmartGuardModel,
        learning_rate: float = 0.001,
        epochs: int = 60,
        batch_size: int = 1024,
        early_stop_patience: int = 100,
        seed: int = 2023,
    ) -> None:
        self.model = model
        self.lr = learning_rate
        self.epochs = epochs
        self.batch_size = batch_size
        self.early_stop_patience = early_stop_patience
        self.seed = seed

    def train(
        self,
        train_sequences: np.ndarray,
        val_sequences: np.ndarray,
        threshold_percentile: float = 80.0,
        checkpoint_dir: Path | None = None,
    ) -> TrainingResult:
        """Full training pipeline.

        Args:
            train_sequences: Array of shape (N, 40).
            val_sequences: Array of shape (M, 40).
            threshold_percentile: For anomaly threshold calibration.
            checkpoint_dir: Directory to save best checkpoint.

        Returns:
            TrainingResult with training metrics.

        """
        from src.model import _setup_seed
        _setup_seed(self.seed)

        start_time = time.time()

        net = self.model.model
        net.train()
        optimizer = torch.optim.Adam(net.parameters(), lr=self.lr)
        criterion = nn.CrossEntropyLoss()

        train_dataset = TimeSeriesDataset(train_sequences, self.model.d_model)
        val_dataset = TimeSeriesDataset(val_sequences, self.model.d_model)

        train_loader = DataLoader(
            train_dataset, batch_size=self.batch_size, shuffle=True,
        )
        val_loader = DataLoader(
            val_dataset, batch_size=self.batch_size, shuffle=False,
        )

        best_val_loss = float("inf")
        patience_counter = 0
        final_train_loss = 0.0
        final_val_loss = 0.0
        device = self.model.device
        last_loss_vector: dict[int, float] = {}

        for epoch in range(self.epochs):
            # ── Train ───────────────────────────────────────
            net.train()
            total_loss = 0.0
            batch_count = 0

            loss_vector: dict[int, float] = {}
            count_vector: dict[int, int] = {}
            criterion_per = nn.CrossEntropyLoss(reduction="none")

            for batch in train_loader:
                input_batch, target_batch, duration_emb = batch
                input_batch = input_batch.to(device)
                target_batch = target_batch.to(device)

                optimizer.zero_grad()
                outputs, mask = net(
                    input_batch, last_loss_vector, epoch, duration_emb,
                )
                outputs = outputs.view(-1, self.model.vocab_size)
                target_batch = target_batch.view(-1).long()

                # Apply mask from LDMS
                if mask is not None:
                    tmp_mask: list[torch.Tensor] = []
                    if (
                        net.mask_strategy == "random"
                        or (
                            net.mask_strategy == "top_k_loss"
                            and epoch == 0
                        )
                    ):
                        mask_f = mask.float().masked_fill(
                            mask == float("-inf"), 1.0,
                        )
                    else:
                        if epoch <= net.mask_step:
                            mask_f = mask.float().masked_fill(
                                mask == 0, 1.0,
                            )
                        else:
                            mask_f = mask.float().masked_fill(
                                mask == float("-inf"), 1.0,
                            )

                    for m in mask_f:
                        tmp_mask.extend(m[0])
                    tmp_mask_t = torch.stack(tmp_mask).to(device)

                    per_loss = criterion_per(outputs, target_batch)
                    loss = (tmp_mask_t * per_loss).sum() / tmp_mask_t.sum()
                else:
                    loss = criterion(outputs, target_batch)

                # Track per-behavior losses for LDMS
                loss_record = criterion_per(outputs, target_batch)
                for idx, be in enumerate(target_batch):
                    be_val = be.item()
                    count_vector[be_val] = count_vector.get(be_val, 0) + 1
                    loss_vector[be_val] = (
                        loss_vector.get(be_val, 0.0)
                        + loss_record[idx].item()
                    )

                loss.backward()
                optimizer.step()

                total_loss += loss.item()
                batch_count += 1

            # Average per-behavior loss for next epoch's LDMS
            last_loss_vector = {
                k: loss_vector[k] / count_vector[k]
                for k in loss_vector
            }

            final_train_loss = total_loss / max(batch_count, 1)

            # ── Validate ────────────────────────────────────
            net.eval()
            val_total = 0.0
            val_count = 0

            with torch.no_grad():
                for batch in val_loader:
                    input_batch, target_batch, duration_emb = batch
                    input_batch = input_batch.to(device)
                    target_batch = target_batch.to(device)

                    outputs = net.evaluate(input_batch, duration_emb)
                    outputs = outputs.view(-1, self.model.vocab_size)
                    target_batch = target_batch.view(-1).long()

                    loss = criterion(outputs, target_batch)
                    val_total += loss.item()
                    val_count += 1

            final_val_loss = val_total / max(val_count, 1)

            if final_val_loss < best_val_loss:
                best_val_loss = final_val_loss
                patience_counter = 0
                if checkpoint_dir:
                    self.model.save(checkpoint_dir / "best_model.pt")
            else:
                patience_counter += 1

            if epoch % 10 == 0 or epoch == self.epochs - 1:
                logger.info(
                    "Epoch %d/%d  train_loss=%.4f  val_loss=%.4f  "
                    "best=%.4f  patience=%d/%d",
                    epoch + 1, self.epochs,
                    final_train_loss, final_val_loss,
                    best_val_loss, patience_counter,
                    self.early_stop_patience,
                )

            if patience_counter >= self.early_stop_patience:
                logger.info(
                    "Early stopping at epoch %d", epoch + 1,
                )
                break

        # ── Post-training calibration ───────────────────────
        net.eval()

        # Load best checkpoint
        if checkpoint_dir and (checkpoint_dir / "best_model.pt").exists():
            self.model.load(checkpoint_dir / "best_model.pt")

        # Calibrate threshold
        threshold = self.model.calibrate_threshold(
            val_sequences.tolist(),
            percentile=threshold_percentile,
        )

        # Compute behavior weights (NWRL)
        weights = self.model.compute_behavior_weights(
            val_sequences.tolist(),
        )

        # Save metadata
        if checkpoint_dir:
            meta = {
                "threshold": threshold,
                "behavior_weights": {
                    str(k): v for k, v in weights.items()
                },
                "vocab_size": self.model.vocab_size,
                "epochs_completed": epoch + 1,
                "train_loss": final_train_loss,
                "val_loss": final_val_loss,
            }
            meta_path = checkpoint_dir / "model_meta.json"
            meta_path.write_text(json.dumps(meta, indent=2))
            logger.info("Training metadata saved to %s", meta_path)

        duration = time.time() - start_time
        logger.info(
            "Training complete in %.1fs — threshold=%.4f, "
            "%d behavior weights",
            duration, threshold, len(weights),
        )

        return TrainingResult(
            epochs_completed=epoch + 1,
            final_train_loss=final_train_loss,
            final_val_loss=final_val_loss,
            best_val_loss=best_val_loss,
            threshold=threshold,
            behavior_weights_count=len(weights),
            duration_seconds=duration,
        )


def load_original_data(
    dataset: str,
    data_root: Path | None = None,
) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """Load train/val/test splits from original SmartGuard repo.

    Args:
        dataset: One of 'an', 'fr', 'sp'.
        data_root: Path to SmartGuard/data/data/ directory.

    Returns:
        Tuple of (train, val, test) numpy arrays.

    """
    if data_root is None:
        data_root = _SMARTGUARD_ROOT / "data" / "data"

    ds_dir = data_root / dataset

    with open(ds_dir / "trn_instance_10.pkl", "rb") as f:
        train = pickle.load(f)
    with open(ds_dir / "vld_instance_10.pkl", "rb") as f:
        val = pickle.load(f)
    with open(ds_dir / "test_instance_10.pkl", "rb") as f:
        test = pickle.load(f)

    # Original data is (N, 10, 5) — the 5th column is a routine/corpus
    # ID that the model doesn't use.  Strip it to get (N, 10, 4) then
    # flatten to (N, 40) which SmartGuard expects.
    def _strip_and_flatten(arr: np.ndarray) -> np.ndarray:
        a = np.array(arr)
        if a.ndim == 3 and a.shape[2] == 5:
            a = a[:, :, :4]  # drop 5th column
        return a.reshape(a.shape[0], -1)  # flatten to (N, 40)

    return _strip_and_flatten(train), _strip_and_flatten(val), _strip_and_flatten(test)


def convert_etms_log_to_sequences(
    event_log_path: Path,
    sequence_length: int = 10,
) -> np.ndarray:
    """Convert ETMS event log (JSONL) into training sequences.

    Reads logged events, encodes them, and creates sliding-window
    sequences suitable for SmartGuard training.

    Returns:
        Array of shape (N, sequence_length * 4).

    """
    events: list[dict[str, Any]] = []
    with open(event_log_path) as f:
        for line in f:
            line = line.strip()
            if line:
                events.append(json.loads(line))

    if len(events) < sequence_length:
        logger.warning(
            "Only %d events in log, need at least %d",
            len(events), sequence_length,
        )
        return np.array([])

    # Build flat sequences via sliding window
    sequences: list[list[int]] = []
    for i in range(len(events) - sequence_length + 1):
        window = events[i : i + sequence_length]
        flat: list[int] = []
        for evt in window:
            flat.extend([
                evt.get("day_of_week", 0),
                evt.get("hour_bucket", 0),
                evt.get("device_type_id", 0),
                evt.get("action_id", 0),
            ])
        sequences.append(flat)

    logger.info(
        "Converted %d events → %d sequences",
        len(events), len(sequences),
    )
    return np.array(sequences)
