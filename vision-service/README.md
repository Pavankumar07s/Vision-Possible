# ETMS Vision Service

Real-time person detection, tracking, pose estimation, and behavioral analysis using Ultralytics YOLO.

## Architecture

```
Camera → YOLO Detection → Person Tracking → Behavior Analysis → MQTT → Home Assistant
                ↓                  ↓                ↓
         Pose Estimation    Trajectory     Wandering / Erratic /
                            Features       Zone / Gait / Fall
```

## Quick start

```bash
# 1. Run setup (downloads models, installs dependencies)
bash setup.sh            # CPU-only
bash setup.sh --gpu      # With CUDA support

# 2. Start the vision service
python -m src --camera 0 --log-level DEBUG

# 3. Monitor MQTT events (separate terminal)
mosquitto_sub -h localhost -u mqtt_user -P 'Pavan@2005' -t 'etms/vision/#' -v
```

## Project structure

```
vision-service/
├── config/
│   └── settings.yaml          # All configuration
├── models/                    # YOLO weights (downloaded by setup.sh)
├── src/
│   ├── __init__.py
│   ├── __main__.py            # Entry point for python -m src
│   ├── main.py                # Pipeline orchestrator + visualization
│   ├── detection/             # YOLO person + pose detection
│   ├── tracking/              # Per-person trajectory tracking
│   ├── behavior/              # Behavioral anomaly detection
│   ├── mqtt_client/           # MQTT event publisher
│   └── utils/                 # Config loader utilities
├── tests/                     # Unit tests
├── setup.sh                   # One-command setup script
├── requirements.txt           # Python dependencies
├── Dockerfile                 # Jetson-optimized container
└── docker-compose.yml         # Compose with GPU + webcam access
```

## Detected behaviors

| Behavior | Description | Config key |
|---|---|---|
| **Wandering** | Repetitive looping movement patterns | `behavior.wandering` |
| **Zone violation** | Entering restricted areas or leaving safe zones | `behavior.zones` |
| **Erratic movement** | Rapid direction changes, speed fluctuations | `behavior.erratic` |
| **Inactivity** | Prolonged stillness beyond threshold | `behavior.inactivity` |
| **Gait instability** | Unsteady posture detected via pose keypoints | `behavior.gait` |
| **Fall suspected** | Sudden vertical keypoint drop | `behavior.gait` |

## MQTT topics

| Topic | Payload |
|---|---|
| `etms/vision/{device_id}/event` | Behavioral event JSON |
| `etms/vision/{device_id}/movement/{track_id}` | Movement metrics |
| `etms/vision/{device_id}/person_count` | Current person count |
| `etms/vision/{device_id}/status` | online / offline (LWT) |

## Configuration

Edit `config/settings.yaml` to adjust camera source, detection thresholds, zone polygons, MQTT credentials, etc. See the file for full documentation.

## Keyboard shortcuts (display mode)

| Key | Action |
|---|---|
| `q` | Quit |
| `s` | Save screenshot |

## Docker (Jetson)

```bash
docker compose up --build
```

## Running tests

```bash
pip install pytest
pytest tests/ -v
```
