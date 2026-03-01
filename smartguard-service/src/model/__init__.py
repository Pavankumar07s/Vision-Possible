"""SmartGuard model wrapper for ETMS.

Adapts the original SmartGuard research code into a clean
inference-ready module.  Training is also supported through
the ``Trainer`` class.
"""

from __future__ import annotations

import logging
import math
import random
import time
from pathlib import Path
from typing import Any

import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader

# Import from original SmartGuard code
import sys
_SMARTGUARD_ROOT = Path(__file__).resolve().parents[3] / "SmartGuard"
if str(_SMARTGUARD_ROOT) not in sys.path:
    sys.path.insert(0, str(_SMARTGUARD_ROOT))

from SmartGuard import SmartGuard, TimeSeriesDataset  # noqa: E402

logger = logging.getLogger(__name__)


def _setup_seed(seed: int) -> None:
    """Set random seeds for reproducibility."""
    torch.manual_seed(seed)
    np.random.seed(seed)
    random.seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)


class SmartGuardModel:
    """High-level wrapper around the SmartGuard transformer autoencoder.

    Handles model creation, loading, and inference.

    Args:
        vocab_size: Size of the action vocabulary.
        d_model: Embedding dimension.
        nhead: Number of attention heads.
        num_layers: Number of transformer layers.
        mask_strategy: Masking strategy for training.
        mask_ratio: Ratio of masked positions.
        mask_step: Number of epochs before switching mask strategy.
        device: Torch device string.

    """

    def __init__(
        self,
        vocab_size: int = 300,
        d_model: int = 256,
        nhead: int = 8,
        num_layers: int = 2,
        mask_strategy: str = "loss_guided",
        mask_ratio: float = 0.2,
        mask_step: int = 4,
        device: str | None = None,
    ) -> None:
        self.vocab_size = vocab_size
        self.d_model = d_model
        self.device = torch.device(
            device or ("cuda" if torch.cuda.is_available() else "cpu"),
        )

        self.model = SmartGuard(
            vocab_size=vocab_size,
            d_model=d_model,
            nhead=nhead,
            num_layers=num_layers,
            mask_strategy=mask_strategy,
            mask_ratio=mask_ratio,
            mask_step=mask_step,
        )
        self.model.TTPE_flag = True
        self.model = self.model.to(self.device)

        self._behavior_weights: dict[int, float] = {}
        self._threshold: float | None = None

        logger.info(
            "SmartGuard model initialized: vocab=%d, d_model=%d, "
            "layers=%d, device=%s",
            vocab_size, d_model, num_layers, self.device,
        )

    def load(self, path: Path) -> None:
        """Load model weights from a checkpoint."""
        state = torch.load(path, map_location=self.device, weights_only=True)
        self.model.load_state_dict(state)
        self.model.eval()
        logger.info("Model loaded from %s", path)

    def save(self, path: Path) -> None:
        """Save model weights."""
        path.parent.mkdir(parents=True, exist_ok=True)
        torch.save(self.model.state_dict(), path)
        logger.info("Model saved to %s", path)

    def set_threshold(self, value: float) -> None:
        """Set the anomaly detection threshold."""
        self._threshold = value
        logger.info("Anomaly threshold set to %.4f", value)

    def set_behavior_weights(self, weights: dict[int, float]) -> None:
        """Set behavior weights for NWRL (noise-aware weighted loss)."""
        self._behavior_weights = weights

    # ── Inference ───────────────────────────────────────────

    @torch.no_grad()
    def predict(
        self,
        sequence: np.ndarray,
    ) -> dict[str, Any]:
        """Run anomaly detection on a single behavior sequence.

        Args:
            sequence: Flat numpy array of shape (40,) representing
                10 events × 4 features each.

        Returns:
            Dictionary with:
                - anomaly_score: float reconstruction loss
                - is_anomaly: bool
                - per_event_loss: list of per-event losses
                - threshold: current threshold value

        """
        self.model.eval()

        # Prepare input
        input_arr = np.array([sequence])
        dataset = TimeSeriesDataset(input_arr, self.d_model)
        loader = DataLoader(dataset, batch_size=1, shuffle=False)

        for batch in loader:
            input_batch, target_batch, duration_emb = batch
            input_batch = input_batch.to(self.device)
            target_batch = target_batch.to(self.device)

            outputs = self.model.evaluate(input_batch, duration_emb)
            outputs = outputs.view(-1, self.vocab_size)
            target_batch = target_batch.view(-1).long()

            # Per-event cross-entropy loss
            loss_per_event = F.cross_entropy(
                outputs, target_batch, reduction="none",
            )

            # Apply behavior weights (NWRL)
            device_control = input_batch.reshape(1, 10, 4)[0, :, 3]
            if self._behavior_weights:
                weights = []
                for action_id in device_control:
                    aid = action_id.item()
                    w = self._behavior_weights.get(aid, 0.5)
                    weights.append(w)
                weight_tensor = torch.tensor(
                    weights, device=self.device, dtype=torch.float,
                )
                weight_sum = weight_tensor.sum()
                if weight_sum > 0:
                    normalized = weight_tensor / weight_sum
                    loss_per_event = loss_per_event * normalized

            anomaly_score = loss_per_event.mean().item()
            per_event = loss_per_event.cpu().numpy().tolist()

        is_anomaly = False
        if self._threshold is not None:
            is_anomaly = anomaly_score > self._threshold

        return {
            "anomaly_score": round(anomaly_score, 6),
            "is_anomaly": is_anomaly,
            "per_event_loss": [round(x, 6) for x in per_event],
            "threshold": self._threshold,
        }

    @torch.no_grad()
    def predict_batch(
        self,
        sequences: list[np.ndarray],
    ) -> list[dict[str, Any]]:
        """Run inference on multiple sequences."""
        results = []
        for seq in sequences:
            results.append(self.predict(seq))
        return results

    # ── Threshold calibration ───────────────────────────────

    @torch.no_grad()
    def calibrate_threshold(
        self,
        normal_sequences: list[np.ndarray],
        percentile: float = 80.0,
        batch_size: int = 256,
    ) -> float:
        """Calibrate anomaly threshold from normal behavior sequences.

        Args:
            normal_sequences: List of sequences known to be normal.
            percentile: Percentile of reconstruction loss to use.
            batch_size: Batch size for inference.

        Returns:
            Calibrated threshold value.

        """
        self.model.eval()
        data = np.array(normal_sequences)
        dataset = TimeSeriesDataset(data, self.d_model)
        loader = DataLoader(dataset, batch_size=batch_size, shuffle=False)

        losses: list[float] = []
        criterion = nn.CrossEntropyLoss(reduction="none")

        for batch in loader:
            input_batch, target_batch, duration_emb = batch
            input_batch = input_batch.to(self.device)
            target_batch = target_batch.to(self.device)

            outputs = self.model.evaluate(input_batch, duration_emb)
            outputs = outputs.view(-1, self.vocab_size)
            target_batch = target_batch.view(-1).long()

            loss = criterion(outputs, target_batch)
            loss = loss.view(-1, 10).mean(dim=1)
            losses.extend(loss.cpu().numpy().tolist())

        threshold = float(np.percentile(losses, percentile))
        self._threshold = threshold
        logger.info(
            "Calibrated threshold at %.1f%%: %.4f (from %d sequences)",
            percentile, threshold, len(normal_sequences),
        )
        return threshold

    # ── Behavior weight computation ─────────────────────────

    @torch.no_grad()
    def compute_behavior_weights(
        self,
        validation_sequences: list[np.ndarray],
        batch_size: int = 256,
        mu: float = 0.01,
    ) -> dict[int, float]:
        """Compute NWRL behavior weights from validation data.

        Returns a dict mapping action_id → weight.
        """
        self.model.eval()
        data = np.array(validation_sequences)
        dataset = TimeSeriesDataset(data, self.d_model)
        loader = DataLoader(dataset, batch_size=batch_size, shuffle=False)

        criterion = nn.CrossEntropyLoss(reduction="none")
        loss_acc: dict[int, float] = {}
        count_acc: dict[int, int] = {}

        for batch in loader:
            input_batch, target_batch, duration_emb = batch
            input_batch = input_batch.to(self.device)
            target_batch = target_batch.to(self.device)

            outputs = self.model.evaluate(input_batch, duration_emb)
            outputs = outputs.view(-1, self.vocab_size)
            target_batch = target_batch.view(-1).long()

            loss = criterion(outputs, target_batch)

            for idx, action_id in enumerate(target_batch):
                aid = action_id.item()
                loss_acc[aid] = loss_acc.get(aid, 0.0) + loss[idx].item()
                count_acc[aid] = count_acc.get(aid, 0) + 1

        # Compute mean loss per behavior
        mean_losses: dict[int, float] = {}
        all_losses: list[float] = []
        for aid in loss_acc:
            mean_losses[aid] = loss_acc[aid] / count_acc[aid]
            all_losses.append(mean_losses[aid])

        mean_val = float(np.mean(all_losses))
        var_val = float(np.var(all_losses))

        # Weight = sigmoid(-relu(loss - mean) / (mu * sqrt(var)))
        weights: dict[int, float] = {}
        for aid, ml in mean_losses.items():
            x = -max(0, ml - mean_val) / (mu * math.sqrt(var_val) + 1e-8)
            weights[aid] = 1.0 / (1.0 + math.exp(-x))

        self._behavior_weights = weights
        logger.info("Computed behavior weights for %d actions", len(weights))
        return weights
