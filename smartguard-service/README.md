# SmartGuard ETMS — Behavioral Anomaly Detection Microservice

Real-time unsupervised behavioral anomaly detection for the ETMS
(Enhanced Technology-Mediated Support) smart home platform.

Based on the **SmartGuard** research paper (ACM SIGKDD 2024) which uses
a Transformer autoencoder with three key innovations:
- **LDMS** — Loss-guided Dynamic Mask Strategy
- **TTPE** — Three-level Time-aware Positional Embedding
- **NWRL** — Noise-aware Weighted Reconstruction Loss

## Architecture

```
MQTT events ──→ EventParser ──→ SequenceAssembler ──→ SmartGuardModel ──→ MQTT anomaly
(HA / SmartThings       (routes &          (buffers, encodes      (Transformer        (score, severity,
 / Vision / Health)      normalises)        10-event sequences)    autoencoder)         is_anomaly)
```

## Quick start

### 1. Install dependencies

```bash
conda create -n smartguard python=3.10
conda activate smartguard
pip install -r requirements.txt
```

### 2. Train on original SmartGuard data

```bash
python main.py --mode train --dataset sp
```

### 3. Run inference

```bash
python main.py --mode infer
```

### 4. Train then infer

```bash
python main.py --mode both --dataset sp
```

## Project structure

```
smartguard-service/
├── main.py                      # Entry point (train / infer / both)
├── config/
│   └── settings.yaml            # MQTT, model, assembler config
├── src/
│   ├── assembler/
│   │   ├── __init__.py          # DeviceVocab, time encoding
│   │   ├── pipeline.py          # BehaviorEvent, SequenceAssembler
│   │   └── event_parser.py      # MQTT message → assembler routing
│   ├── model/
│   │   └── __init__.py          # SmartGuardModel wrapper
│   ├── inference/
│   │   └── __init__.py          # InferenceEngine, severity mapping
│   ├── mqtt_client/
│   │   └── __init__.py          # SmartGuardMQTT client
│   └── training/
│       └── __init__.py          # Trainer, data loading utilities
├── tests/
│   └── test_smartguard.py       # Unit tests
├── data/                        # Runtime data (sequences, logs, checkpoints)
├── requirements.txt
└── Dockerfile
```

## MQTT topics

### Subscriptions
| Topic | Source |
|---|---|
| `homeassistant/+/+/state` | HA entity state changes |
| `etms/smartthings/+/event` | Samsung SmartThings events |
| `etms/vision/+/event` | Vision-service behavioral events |
| `etms/vision/+/movement` | Vision-service zone transitions |
| `etms/health/+/alert` | Wearable health alerts |

### Publications
| Topic | Content |
|---|---|
| `etms/smartguard/anomaly` | Anomaly score, severity, per-event loss |
| `etms/smartguard/status` | Service status, buffer size, sequences evaluated |
| `etms/smartguard/batch` | Batch evaluation summary |

## Configuration

Edit `config/settings.yaml` for MQTT credentials, model parameters,
and inference thresholds.

## Testing

```bash
pytest tests/ -v
```
