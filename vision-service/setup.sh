#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────
# ETMS Vision Service – Setup Script
# Downloads YOLO models, installs Python deps, verifies install.
# Usage:  bash setup.sh [--gpu]   (--gpu installs CUDA torch)
# ──────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info()  { echo -e "${GREEN}[INFO]${NC}  $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error() { echo -e "${RED}[ERROR]${NC} $*"; }

# ── Parse args ───────────────────────────────────────────────
USE_GPU=false
for arg in "$@"; do
    case $arg in
        --gpu) USE_GPU=true ;;
        *)     warn "Unknown argument: $arg" ;;
    esac
done

# ── 1. System dependencies ──────────────────────────────────
info "Checking system dependencies…"
MISSING=()
for cmd in python3 pip3; do
    command -v "$cmd" &>/dev/null || MISSING+=("$cmd")
done
if [[ ${#MISSING[@]} -gt 0 ]]; then
    error "Missing commands: ${MISSING[*]}"
    echo "  Install with:  sudo apt install python3 python3-pip"
    exit 1
fi

# ── 2. Create virtual-env (if not inside one already) ───────
if [[ -z "${VIRTUAL_ENV:-}" && -z "${CONDA_DEFAULT_ENV:-}" ]]; then
    if [[ ! -d .venv ]]; then
        info "Creating Python virtual environment (.venv)…"
        python3 -m venv .venv
    fi
    info "Activating .venv…"
    # shellcheck disable=SC1091
    source .venv/bin/activate
else
    info "Using existing environment: ${VIRTUAL_ENV:-$CONDA_DEFAULT_ENV}"
fi

# ── 3. Upgrade pip ──────────────────────────────────────────
info "Upgrading pip…"
python -m pip install --upgrade pip --quiet

# ── 4. Install PyTorch (GPU or CPU) ─────────────────────────
if $USE_GPU; then
    info "Installing PyTorch with CUDA support…"
    pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121 --quiet
else
    info "Installing PyTorch (CPU)…"
    pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu --quiet
fi

# ── 5. Install remaining requirements ───────────────────────
info "Installing Python requirements…"
pip install -r requirements.txt --quiet

# ── 6. Download YOLO models ─────────────────────────────────
info "Downloading YOLO models into models/ …"
mkdir -p models

python3 - <<'PYEOF'
from ultralytics import YOLO
import shutil, os

models_dir = "models"
for model_name in ["yolo11n.pt", "yolo11n-pose.pt"]:
    dest = os.path.join(models_dir, model_name)
    if os.path.exists(dest):
        print(f"  ✓ {model_name} already exists")
        continue
    print(f"  ↓ Downloading {model_name}…")
    m = YOLO(model_name)            # auto-downloads to CWD
    if os.path.exists(model_name):   # move into models/
        shutil.move(model_name, dest)
    print(f"  ✓ {model_name} saved")
PYEOF

# ── 7. Quick verification ───────────────────────────────────
info "Running import verification…"
python3 - <<'PYEOF'
import sys
checks = []

try:
    import torch
    gpu = torch.cuda.is_available()
    checks.append(f"  ✓ PyTorch {torch.__version__}  (CUDA: {gpu})")
except ImportError:
    checks.append("  ✗ PyTorch NOT installed"); sys.exit(1)

try:
    import ultralytics
    checks.append(f"  ✓ Ultralytics {ultralytics.__version__}")
except ImportError:
    checks.append("  ✗ Ultralytics NOT installed"); sys.exit(1)

try:
    import cv2
    checks.append(f"  ✓ OpenCV {cv2.__version__}")
except ImportError:
    checks.append("  ✗ OpenCV NOT installed"); sys.exit(1)

try:
    import paho.mqtt
    checks.append(f"  ✓ paho-mqtt {paho.mqtt.__version__}")
except ImportError:
    checks.append("  ✗ paho-mqtt NOT installed"); sys.exit(1)

try:
    import shapely
    checks.append(f"  ✓ Shapely {shapely.__version__}")
except ImportError:
    checks.append("  ✗ Shapely NOT installed"); sys.exit(1)

for c in checks:
    print(c)
PYEOF

# ── 8. Done ─────────────────────────────────────────────────
echo ""
info "Setup complete!"
echo ""
echo "  Run the vision service:"
echo "    python -m src --camera 0 --log-level DEBUG"
echo ""
echo "  Monitor MQTT events:"
echo "    mosquitto_sub -h localhost -u mqtt_user -P 'YOUR_MQTT_PASSWORD' -t 'etms/vision/#' -v"
echo ""
