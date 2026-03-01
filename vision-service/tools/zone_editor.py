"""Interactive zone editor for ETMS Vision Service.

Opens the camera feed and lets you draw zone polygons by clicking.
Saves the zone definitions back to settings.yaml.

Usage:
    python tools/zone_editor.py
    python tools/zone_editor.py --config config/settings.yaml

Controls:
    Left Click    - Add a point to the current zone polygon
    Right Click   - Finish the current zone (close polygon)
    'r'           - Mark current zone as "restricted" (red)
    's'           - Mark current zone as "safe" (green)
    'n'           - Start a new zone (prompts for name in terminal)
    'd'           - Delete the last completed zone
    'u'           - Undo the last point in the current zone
    'c'           - Clear all zones and start over
    Enter/Return  - Save all zones to settings.yaml and quit
    'q' / Escape  - Quit without saving
"""

from __future__ import annotations

import argparse
import copy
import sys
from pathlib import Path

import cv2
import numpy as np
import yaml


# ── Defaults ────────────────────────────────────────────────────
DEFAULT_CONFIG = "config/settings.yaml"
WINDOW_NAME = "ETMS Zone Editor"
HELP_TEXT = [
    "L-Click: add point | R-Click: close zone",
    "'r': restricted | 's': safe | 'n': new zone",
    "'u': undo point | 'd': del last zone | 'c': clear",
    "Enter: SAVE & quit | 'q'/Esc: quit (no save)",
]


# ── Helpers ─────────────────────────────────────────────────────
def load_yaml(path: str) -> dict:
    """Load a YAML file, return empty dict if missing."""
    p = Path(path)
    if not p.exists():
        return {}
    with p.open() as f:
        return yaml.safe_load(f) or {}


def save_yaml(path: str, data: dict) -> None:
    """Write data back to a YAML file preserving readability."""
    with open(path, "w") as f:
        yaml.dump(data, f, default_flow_style=False, sort_keys=False)


# ── Zone state ──────────────────────────────────────────────────
class ZoneState:
    """Holds all zones being edited."""

    def __init__(self) -> None:
        self.zones: list[dict] = []  # completed zones
        self.current_points: list[list[int]] = []
        self.current_name: str = "zone_1"
        self.current_type: str = "restricted"
        self._zone_counter = 1

    def add_point(self, x: int, y: int) -> None:
        """Add a vertex to the zone being drawn."""
        self.current_points.append([x, y])

    def undo_point(self) -> None:
        """Remove the last added point."""
        if self.current_points:
            self.current_points.pop()

    def finish_zone(self) -> bool:
        """Close the current polygon and save it."""
        if len(self.current_points) < 3:
            print("[!] Need at least 3 points to make a zone.")
            return False
        self.zones.append({
            "name": self.current_name,
            "type": self.current_type,
            "points": copy.deepcopy(self.current_points),
        })
        print(
            f"[+] Zone '{self.current_name}' ({self.current_type}) "
            f"saved with {len(self.current_points)} points."
        )
        self.current_points.clear()
        self._zone_counter += 1
        self.current_name = f"zone_{self._zone_counter}"
        return True

    def start_new(self, name: str | None = None) -> None:
        """Discard current drawing and start fresh polygon."""
        self.current_points.clear()
        if name:
            self.current_name = name
        else:
            self._zone_counter += 1
            self.current_name = f"zone_{self._zone_counter}"

    def delete_last(self) -> None:
        """Delete the most recently completed zone."""
        if self.zones:
            removed = self.zones.pop()
            print(f"[-] Deleted zone '{removed['name']}'")
        else:
            print("[!] No completed zones to delete.")

    def clear_all(self) -> None:
        """Remove everything."""
        self.zones.clear()
        self.current_points.clear()
        self._zone_counter = 1
        self.current_name = "zone_1"
        print("[*] All zones cleared.")

    def to_definitions(self) -> list[dict]:
        """Convert to the format used in settings.yaml."""
        return [
            {"name": z["name"], "type": z["type"], "points": z["points"]}
            for z in self.zones
        ]


# ── Drawing ─────────────────────────────────────────────────────
def draw_overlay(
    frame: np.ndarray,
    state: ZoneState,
    mouse_pos: tuple[int, int] | None = None,
) -> np.ndarray:
    """Draw all zones and the work-in-progress polygon on the frame."""
    display = frame.copy()
    overlay = display.copy()

    # Draw completed zones with semi-transparent fill
    for z in state.zones:
        pts = np.array(z["points"], dtype=np.int32)
        color = (0, 0, 255) if z["type"] == "restricted" else (0, 255, 0)
        cv2.fillPoly(overlay, [pts], (*color[:2], color[2] // 3))
        cv2.polylines(display, [pts], True, color, 2)
        # Label
        cx = int(np.mean([p[0] for p in z["points"]]))
        cy = int(np.mean([p[1] for p in z["points"]]))
        label = f"{z['name']} ({z['type']})"
        cv2.putText(
            display, label, (cx - 40, cy),
            cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2,
        )

    cv2.addWeighted(overlay, 0.25, display, 0.75, 0, display)

    # Draw current polygon in progress
    if state.current_points:
        pts = np.array(state.current_points, dtype=np.int32)
        color = (0, 0, 255) if state.current_type == "restricted" else (0, 255, 0)

        # Draw edges
        for i in range(len(state.current_points) - 1):
            cv2.line(
                display,
                tuple(state.current_points[i]),
                tuple(state.current_points[i + 1]),
                color, 2,
            )

        # Rubber-band line to mouse
        if mouse_pos:
            cv2.line(
                display,
                tuple(state.current_points[-1]),
                mouse_pos, color, 1, cv2.LINE_AA,
            )

        # Draw vertices
        for pt in state.current_points:
            cv2.circle(display, tuple(pt), 5, (255, 255, 255), -1)
            cv2.circle(display, tuple(pt), 5, color, 2)

    # Status bar
    bar_h = 25 * (len(HELP_TEXT) + 2)
    cv2.rectangle(display, (0, 0), (display.shape[1], bar_h), (0, 0, 0), -1)

    type_color = (0, 0, 255) if state.current_type == "restricted" else (0, 255, 0)
    status = (
        f"Drawing: {state.current_name} [{state.current_type}] "
        f"| Points: {len(state.current_points)} "
        f"| Saved zones: {len(state.zones)}"
    )
    cv2.putText(
        display, status, (10, 20),
        cv2.FONT_HERSHEY_SIMPLEX, 0.55, type_color, 1,
    )
    for i, line in enumerate(HELP_TEXT):
        cv2.putText(
            display, line, (10, 42 + i * 22),
            cv2.FONT_HERSHEY_SIMPLEX, 0.45, (200, 200, 200), 1,
        )

    return display


# ── Mouse callback ──────────────────────────────────────────────
mouse_position: tuple[int, int] | None = None


def mouse_callback(event: int, x: int, y: int, flags: int, param: ZoneState) -> None:
    """Handle mouse events for zone drawing."""
    global mouse_position
    state = param

    if event == cv2.EVENT_MOUSEMOVE:
        mouse_position = (x, y)

    elif event == cv2.EVENT_LBUTTONDOWN:
        state.add_point(x, y)
        print(f"  Point added: ({x}, {y})")

    elif event == cv2.EVENT_RBUTTONDOWN:
        state.finish_zone()


# ── Main ────────────────────────────────────────────────────────
def main() -> None:
    """Run the interactive zone editor."""
    parser = argparse.ArgumentParser(description="ETMS Vision Zone Editor")
    parser.add_argument(
        "--config", default=DEFAULT_CONFIG,
        help="Path to settings.yaml",
    )
    args = parser.parse_args()

    # Load existing config
    raw_config = load_yaml(args.config)
    camera_cfg = raw_config.get("camera", {})
    source = camera_cfg.get("source", 0)
    width = camera_cfg.get("width", 640)
    height = camera_cfg.get("height", 480)

    # Open camera
    cap = cv2.VideoCapture(source)
    if not cap.isOpened():
        print(f"[ERROR] Cannot open camera source: {source}")
        sys.exit(1)

    cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)

    # Initialize state with existing zones (if any)
    state = ZoneState()
    existing_zones = (
        raw_config
        .get("behavior", {})
        .get("zones", {})
        .get("definitions", [])
    )
    for zd in existing_zones:
        if len(zd.get("points", [])) >= 3:
            state.zones.append({
                "name": zd["name"],
                "type": zd.get("type", "safe"),
                "points": zd["points"],
            })
    if state.zones:
        state._zone_counter = len(state.zones) + 1
        state.current_name = f"zone_{state._zone_counter}"
        print(f"[*] Loaded {len(state.zones)} existing zone(s) from config.")

    cv2.namedWindow(WINDOW_NAME)
    cv2.setMouseCallback(WINDOW_NAME, mouse_callback, state)

    print("\n" + "=" * 50)
    print("  ETMS Vision — Interactive Zone Editor")
    print("=" * 50)
    print(f"  Camera: {source}  ({width}x{height})")
    print(f"  Config: {args.config}")
    print()
    for line in HELP_TEXT:
        print(f"  {line}")
    print("=" * 50 + "\n")

    while True:
        ret, frame = cap.read()
        if not ret:
            print("[!] Failed to read frame.")
            break

        display = draw_overlay(frame, state, mouse_position)
        cv2.imshow(WINDOW_NAME, display)

        key = cv2.waitKey(30) & 0xFF

        if key == ord("q") or key == 27:  # q or Escape
            print("\n[*] Quit without saving.")
            break

        elif key == 13:  # Enter
            if not state.zones and not state.current_points:
                print("[!] No zones to save.")
                continue

            # If there's an unfinished polygon, finish it first
            if state.current_points:
                if not state.finish_zone():
                    continue

            # Update the YAML config
            definitions = state.to_definitions()

            # Preserve existing config, only update zones
            if "behavior" not in raw_config:
                raw_config["behavior"] = {}
            if "zones" not in raw_config["behavior"]:
                raw_config["behavior"]["zones"] = {}
            raw_config["behavior"]["zones"]["enabled"] = True
            raw_config["behavior"]["zones"]["definitions"] = definitions

            save_yaml(args.config, raw_config)
            print(f"\n[✓] Saved {len(definitions)} zone(s) to {args.config}")
            for z in definitions:
                print(f"    • {z['name']} ({z['type']}): {len(z['points'])} points")
            break

        elif key == ord("r"):
            state.current_type = "restricted"
            print(f"  Zone type set to: restricted (red)")

        elif key == ord("s"):
            state.current_type = "safe"
            print(f"  Zone type set to: safe (green)")

        elif key == ord("n"):
            name = input("  Enter zone name (or press Enter for auto): ").strip()
            state.start_new(name or None)
            print(f"  Started new zone: {state.current_name}")

        elif key == ord("d"):
            state.delete_last()

        elif key == ord("u"):
            state.undo_point()
            print("  Last point undone.")

        elif key == ord("c"):
            state.clear_all()

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
