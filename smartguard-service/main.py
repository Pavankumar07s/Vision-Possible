#!/usr/bin/env python3
"""SmartGuard ETMS — behavioral anomaly detection microservice.

Modes:
    infer   — subscribe to MQTT, detect anomalies in real-time
    train   — train / fine-tune model from collected or original data
    both    — train first, then run inference

Usage:
    python main.py --mode infer
    python main.py --mode train --dataset sp
    python main.py --mode both  --dataset sp
"""

from __future__ import annotations

import argparse
import json
import logging
import signal
import sys
from pathlib import Path

import yaml

# ── Logging ─────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(name)-28s  %(levelname)-7s  %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("smartguard")


def _load_config(path: str | Path) -> dict:
    """Load YAML configuration file."""
    cfg_path = Path(path)
    if not cfg_path.exists():
        logger.error("Config file not found: %s", cfg_path)
        sys.exit(1)
    with open(cfg_path) as f:
        return yaml.safe_load(f)


# ── Mode: inference ─────────────────────────────────────────

def run_inference(config: dict) -> None:
    """Start the real-time anomaly detection service."""
    from src.assembler import create_default_vocab, DeviceVocab
    from src.assembler.event_parser import EventParser
    from src.inference import build_engine
    from src.mqtt_client import SmartGuardMQTT

    # Load or create vocabulary
    storage = config.get("storage", {})
    vocab_path = storage.get("vocab_file")
    if vocab_path and Path(vocab_path).exists():
        vocab = DeviceVocab.load(Path(vocab_path))
        logger.info("Loaded vocabulary from %s (%d actions)", vocab_path, vocab.vocab_size)
    else:
        vocab = create_default_vocab()
        logger.info("Created default vocabulary (%d actions)", vocab.vocab_size)

    # Build inference engine (model + assembler)
    engine = build_engine(config, vocab)

    # Event parser wired to assembler
    parser = EventParser(
        assembler=engine.assembler,
    )

    # MQTT client
    mqtt_cfg = config.get("mqtt", {})
    client = SmartGuardMQTT(
        engine=engine,
        parser=parser,
        broker=mqtt_cfg.get("broker", "localhost"),
        port=mqtt_cfg.get("port", 1883),
        username=mqtt_cfg.get("username"),
        password=mqtt_cfg.get("password"),
        client_id=mqtt_cfg.get("client_id", "smartguard-service"),
        subscribe_topics=mqtt_cfg.get("subscribe_topics"),
        publish_prefix=mqtt_cfg.get("publish_prefix", "etms/smartguard"),
        flush_interval=config.get("assembler", {}).get("flush_interval", 30),
    )

    # Graceful shutdown
    def _shutdown(signum: int, frame: object) -> None:
        logger.info("Received signal %d, shutting down", signum)
        client.stop()
        # Save vocabulary on exit
        if vocab_path:
            vocab.save(Path(vocab_path))
        sys.exit(0)

    signal.signal(signal.SIGINT, _shutdown)
    signal.signal(signal.SIGTERM, _shutdown)

    logger.info("Starting SmartGuard inference service")
    client.start()


# ── Mode: training ──────────────────────────────────────────

def run_training(config: dict, dataset: str | None) -> None:
    """Train SmartGuard model."""
    import numpy as np
    from src.assembler import create_default_vocab
    from src.model import SmartGuardModel
    from src.training import (
        Trainer,
        convert_etms_log_to_sequences,
        load_original_data,
    )

    storage = config.get("storage", {})
    model_cfg = config.get("model", {})
    train_cfg = config.get("training", {})
    checkpoint_dir = Path(
        storage.get("checkpoint_dir", "data/checkpoints"),
    )
    checkpoint_dir.mkdir(parents=True, exist_ok=True)

    # ── Load data ───────────────────────────────────────────
    if dataset:
        # Train on original SmartGuard dataset
        logger.info("Loading original SmartGuard dataset '%s'", dataset)
        train_data, val_data, test_data = load_original_data(dataset)
        logger.info(
            "Data loaded: train=%d  val=%d  test=%d",
            len(train_data), len(val_data), len(test_data),
        )

        # Use dataset-specific vocab size from original dictionary
        _VOCAB_SIZES = {"an": 141, "fr": 222, "sp": 234}
        vocab_size = _VOCAB_SIZES.get(dataset, model_cfg.get("vocab_size", 300))
    else:
        # Train on collected ETMS event log
        log_path = storage.get("event_log", "data/event_log.jsonl")
        if not Path(log_path).exists():
            logger.error(
                "No event log found at %s — collect events first or "
                "specify --dataset",
                log_path,
            )
            sys.exit(1)

        all_data = convert_etms_log_to_sequences(Path(log_path))
        if len(all_data) < 50:
            logger.error(
                "Only %d sequences found, need at least 50 for training",
                len(all_data),
            )
            sys.exit(1)

        # 80/20 split
        np.random.shuffle(all_data)
        split = int(0.8 * len(all_data))
        train_data = all_data[:split]
        val_data = all_data[split:]
        test_data = val_data  # same for threshold calibration

        vocab = create_default_vocab()
        vocab_size = vocab.vocab_size

    # ── Build model & trainer ───────────────────────────────
    model = SmartGuardModel(
        vocab_size=vocab_size,
        d_model=model_cfg.get("d_model", 256),
        nhead=model_cfg.get("nhead", 8),
        num_layers=model_cfg.get("num_layers", 2),
        mask_strategy=model_cfg.get("mask_strategy", "loss_guided"),
        mask_ratio=model_cfg.get("mask_ratio", 0.2),
        mask_step=model_cfg.get("mask_step", 4),
        device=model_cfg.get("device"),
    )

    trainer = Trainer(
        model=model,
        learning_rate=train_cfg.get("learning_rate", 0.001),
        epochs=train_cfg.get("epochs", 60),
        batch_size=train_cfg.get("batch_size", 1024),
        early_stop_patience=train_cfg.get("early_stop_patience", 100),
        seed=train_cfg.get("seed", 2023),
    )

    result = trainer.train(
        train_sequences=train_data,
        val_sequences=val_data,
        threshold_percentile=config.get(
            "inference", {},
        ).get("threshold_percentile", 80),
        checkpoint_dir=checkpoint_dir,
    )

    logger.info(
        "Training finished: %d epochs in %.1fs — "
        "train_loss=%.4f  val_loss=%.4f  threshold=%.4f",
        result.epochs_completed,
        result.duration_seconds,
        result.final_train_loss,
        result.final_val_loss,
        result.threshold,
    )


# ── CLI ─────────────────────────────────────────────────────

def main() -> None:
    """Entry point."""
    parser = argparse.ArgumentParser(
        description="SmartGuard ETMS — behavioral anomaly detection",
    )
    parser.add_argument(
        "--mode",
        choices=["infer", "train", "both"],
        default="infer",
        help="Operating mode (default: infer)",
    )
    parser.add_argument(
        "--config",
        default="config/settings.yaml",
        help="Path to config file (default: config/settings.yaml)",
    )
    parser.add_argument(
        "--dataset",
        choices=["an", "fr", "sp"],
        default=None,
        help="Use original SmartGuard dataset for training",
    )

    args = parser.parse_args()
    config = _load_config(args.config)

    if args.mode == "train":
        run_training(config, args.dataset)
    elif args.mode == "infer":
        run_inference(config)
    elif args.mode == "both":
        logger.info("Running training first, then inference")
        run_training(config, args.dataset)
        run_inference(config)


if __name__ == "__main__":
    main()
