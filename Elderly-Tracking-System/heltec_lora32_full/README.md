# ETMS — Full Architecture (Heltec WiFi LoRa 32)

> **Elderly Tracking & Monitoring System** — Indoor positioning with room detection, panic button, and server dashboard using **8 Heltec WiFi LoRa 32 boards**.

---

## System Overview

```
                          ┌────────────────────────────┐
                          │     Flask Server + DB       │
                          │  (dashboard, SMS alerts)    │
                          └────────────┬───────────────┘
                                       │ HTTP POST /lilygo-data
                                       │ { nodeID, x, y, type, floor }
                          ┌────────────▼───────────────┐
                          │     ⑥  GATEWAY  (1 board)  │
                          │  LoRa 433MHz RX → WiFi TX  │
                          │  Decrypts → HTTP POST      │
                          └────────────▲───────────────┘
                                       │ LoRa 433 MHz
                                       │ "FLOOR:encrypted_data"
                    ┌──────────────────┤
                    │                  │
         ┌─────────▼──────┐  ┌────────▼───────┐
         │ ④ BRIDGE Flr 1 │  │ ⑤ BRIDGE Flr 2 │  (optional 2nd floor)
         │ Mesh main node  │  │ Mesh main node  │
         │ → LoRa TX       │  │ → LoRa TX       │
         └───────▲─────────┘  └────────▲────────┘
                 │ painlessMesh WiFi            │
     ┌───────────┼───────────┐       (same topology)
     │           │           │
  ┌──▼──┐   ┌───▼──┐   ┌──▼───┐
  │ ① A │   │ ② B  │   │ ③ C  │   ← ANCHOR NODES (3 per floor)
  │(2,5) │   │(5,3) │   │(3,1) │     fixed coordinates
  └──────┘   └──────┘   └──────┘
                 ▲
                 │ WiFi RSSI scan + mesh messages
          ┌──────┴──────┐
          │  ⑦ MOBILE   │  ← ELDERLY WEARABLE
          │  TAG         │    scans anchors, triangulates,
          │  [PRG]=PANIC │    encrypts, sends to bridge
          └──────────────┘

  Board allocation (8 total):
  ─────────────────────────
  ① ② ③  =  Anchor A, B, C  (floor 1)
  ④       =  Bridge           (floor 1)
  ⑤       =  Spare or Bridge  (floor 2)
  ⑥       =  Gateway
  ⑦       =  Mobile Tag
  ⑧       =  Spare (extra tag or 4th anchor)
```

---

## Feature Matrix

| Feature | Status | How |
|---------|--------|-----|
| **Room detection** (x, y) | ✅ | WiFi RSSI trilateration from 3 anchors |
| **Floor detection** | ✅ | Bridge prepends floor number to LoRa |
| **Panic button** | ✅ | PRG button on mobile tag → instant alert |
| **Heartbeat / timeout** | ✅ | Gateway alerts if no signal for 30 s |
| **Encrypted comms** | ✅ | XOR encryption on all location / panic data |
| **Server dashboard** | ✅ | HTTP POST to Flask `/lilygo-data` |
| **SMS alerts** | ✅ | Server-side via Twilio (PANIC + TIMEOUT) |
| **OLED status** | ✅ | All boards show real-time info on display |
| **Multi-floor** | ✅* | Need 4+ boards per additional floor |

---

## Hardware Requirements

| Qty | Board | Role |
|-----|-------|------|
| 3 | Heltec WiFi LoRa 32 | Anchor nodes (fixed positions) |
| 1 | Heltec WiFi LoRa 32 | Mobile tag (elderly wearable) |
| 1 | Heltec WiFi LoRa 32 | Bridge (floor coordinator + LoRa TX) |
| 1 | Heltec WiFi LoRa 32 | Gateway (LoRa RX + WiFi → server) |
| 2 | Heltec WiFi LoRa 32 | **Spare** (extra tag, 4th anchor, or 2nd floor) |

> All boards are identical hardware: **ESP32 + SX1276 LoRa (433 MHz) + SSD1306 OLED + WiFi + BLE**

---

## Quick Start (Step-by-Step)

### Step 0 — Install Arduino IDE Libraries

Open Arduino IDE → **Sketch → Include Library → Manage Libraries** → Install:

| Library | Author | Used by |
|---------|--------|---------|
| `painlessMesh` | painlessMesh | Anchor, Mobile, Bridge |
| `ArduinoJson` | Benoît Blanchon | All |
| `RadioLib` | Jan Gromeš | Bridge, Gateway |
| `ESP8266 and ESP32 OLED driver for SSD1306` | ThingPulse | All |
| `TaskScheduler` | Anatoli Arkhipenko | auto-installed with painlessMesh |
| `AsyncTCP` | me-no-dev | auto-installed with painlessMesh |

**Board selection:** Tools → Board → ESP32 Arduino → **"WiFi LoRa 32(V2)"**

---

### Step 1 — Flash the 3 Anchor Boards

Open `heltec_anchor/heltec_anchor.ino` in Arduino IDE.

**For each anchor**, change the coordinates to match your floor plan:

| Anchor | `ANCHOR_X` | `ANCHOR_Y` | Placement example |
|--------|-----------|-----------|-------------------|
| A | `2.0` | `5.0` | Left wall, near door |
| B | `5.0` | `3.0` | Right wall, center |
| C | `3.0` | `1.0` | Back wall, near window |

```
Your room (approx. 6m × 6m):
╔═══════════════════════╗
║  A(2,5)               ║
║                       ║
║              B(5,3)   ║
║                       ║
║      C(3,1)           ║
╚═══════════════════════╝
```

**Coordinates are in meters** from the bottom-left corner of the room.

For each anchor board:
1. Set `ANCHOR_X` and `ANCHOR_Y`
2. Ensure `MESH_PREFIX` is `"etms-floor-1"` (same on all floor-1 boards)
3. Upload → verify OLED shows "ETMS Anchor" with correct coordinates

---

### Step 2 — Flash the Bridge Board

Open `heltec_bridge/heltec_bridge.ino` in Arduino IDE.

Configure:
```cpp
#define FLOOR_NO      "1"             // This floor's number
#define MESH_PREFIX   "etms-floor-1"  // Must match anchor MESH_PREFIX
```

Upload → verify OLED shows "ETMS Bridge - Floor 1" and "LoRa 433MHz: OK".

---

### Step 3 — Flash the Gateway Board

Open `heltec_gateway/heltec_gateway.ino` in Arduino IDE.

Configure the **3 required values**:
```cpp
const char*  WIFI_SSID     = "YOUR_WIFI_SSID";         // Your WiFi network
const char*  WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";      // WiFi password
const String SERVER_URL    = "http://192.168.1.100:80/lilygo-data";  // Flask server IP
```

Upload → verify OLED shows "ETMS Gateway — Ready" with WiFi IP.

---

### Step 4 — Flash the Mobile Tag

Open `heltec_mobile/heltec_mobile.ino` in Arduino IDE.

Configure:
```cpp
#define MESH_PREFIX   "etms-floor-1"  // Must match the floor you're on
```

Upload → verify OLED shows "ETMS Tag" and "[PRG] = PANIC".

---

### Step 5 — Test the System

1. **Power on** all boards (USB or battery)
2. Wait ~15 seconds for mesh to form
3. **Anchors** should show "Main node found!" on OLED
4. **Mobile tag** should show anchor count (3 found)
5. Every 10 seconds, the tag estimates position and sends it
6. **Bridge** OLED shows "Forwarding to LoRa..."
7. **Gateway** OLED shows "LOCATION — Floor 1 (x, y)"
8. Check Flask server for incoming data

**Test PANIC:** Press the **PRG button** on the mobile tag → gateway shows "!!! PANIC ALERT !!!"

---

## Data Flow

```
Step-by-step packet journey:

1. ANCHOR → mesh broadcast
   {"x":2.0, "y":5.0, "macAddress":"AA:BB:CC:DD:EE:FF", "type":"BEACON", "nodeID":1234}

2. MOBILE TAG receives BEACONs, scans WiFi RSSI
   → RSSI from anchor A: -45 dBm → d = 2.1 m
   → RSSI from anchor B: -52 dBm → d = 4.3 m
   → RSSI from anchor C: -48 dBm → d = 3.0 m
   → Trilateration → estimated position (3.4, 2.8)

3. MOBILE TAG → mesh.sendSingle(mainNode, encrypted)
   Original:  {"x":3.4, "y":2.8, "type":"LOCATION", "nodeID":5678}
   Encrypted: XOR with key 0b101010 → garbled bytes

4. BRIDGE receives encrypted data
   → Detects it's NOT valid JSON (encrypted) → forward!
   → Prepends floor: "1:" + encrypted_data
   → LoRa TX at 433 MHz

5. GATEWAY receives LoRa
   → Splits: floor = "1", payload = encrypted_data
   → XOR decrypt → valid JSON
   → HTTP POST to server:
     {"nodeID":5678, "x":3.4, "y":2.8, "type":"LOCATION", "floor":"1"}
```

---

## LoRa Configuration

| Parameter | Value | Notes |
|-----------|-------|-------|
| Frequency | 433.0 MHz | SX1276 sub-GHz band |
| Bandwidth | 125 kHz | Standard LoRa |
| Spreading Factor | 9 | Good range/speed balance |
| Coding Rate | 4/7 | Error correction |
| TX Power | 17 dBm | ~50 mW |
| Preamble | 8 symbols | Default |
| Range | ~2 km LOS | Through walls: 50-200 m |

---

## painlessMesh Configuration

| Parameter | Value |
|-----------|-------|
| SSID | `etms-floor-1` (per floor) |
| Password | `etms_password` |
| Port | `5555` |
| Topology | Star (bridge = main node) |

> **Multi-floor:** Use different MESH_PREFIX per floor (`etms-floor-2`, etc.). Each floor needs its own bridge.

---

## Calibration Guide

### RSSI-to-Distance Model

The mobile tag converts WiFi RSSI to distance using the **log-distance path loss model**:

$$d = 10^{\frac{A - RSSI}{10 \cdot n}}$$

| Parameter | Default | Description | How to calibrate |
|-----------|---------|-------------|-----------------|
| `A` | -40 dBm | RSSI at 1 meter | Place tag 1m from anchor, read RSSI |
| `n` | 2.7 | Path loss exponent | Higher = more attenuation (walls, furniture) |

**Calibration procedure:**
1. Place mobile tag exactly **1 meter** from an anchor
2. Open Serial Monitor → note average RSSI → set as `RSSI_REF_1M`
3. Place tag at **5 meters** → note RSSI
4. Calculate: `n = (A - RSSI_5m) / (10 × log₁₀(5))`
5. Update values in `heltec_mobile.ino`

**Typical values:**

| Environment | n |
|-------------|---|
| Open space | 2.0 |
| Light office | 2.5 |
| Residential room | 2.7 |
| Dense furniture | 3.5 |
| Through walls | 4.0+ |

### Anchor Placement Tips

- **Minimum 3 anchors** per floor (for trilateration)
- Place them in a **wide triangle** (not collinear!)
- Mount at **consistent height** (1.5–2 m recommended)
- Avoid placing directly behind thick walls or metal surfaces
- Greater spread = better accuracy
- 4th anchor improves reliability (can tolerate 1 failure)

```
 GOOD placement:             BAD placement:

 A ─ ─ ─ ─ ─ B              A ─ B ─ C
 │           │               (collinear — no 2D fix)
 │     *     │
 │           │
 └ ─ ─ C ─ ─┘
```

---

## Pin Reference (Heltec WiFi LoRa 32)

| Function | GPIO | Notes |
|----------|------|-------|
| OLED SDA | 4 | I2C data |
| OLED SCL | 15 | I2C clock |
| OLED RST | 16 | Hardware reset (toggle at boot) |
| OLED Addr | 0x3C | I2C address (fixed) |
| LoRa SCK | 5 | SPI clock |
| LoRa MISO | 19 | SPI data in |
| LoRa MOSI | 27 | SPI data out |
| LoRa CS | 18 | SPI chip select |
| LoRa RST | 14 | LoRa hardware reset |
| LoRa DIO0 | 26 | LoRa interrupt (TX/RX done) |
| PRG Button | 0 | Active LOW, PANIC button |
| LED | 25 | Status indicator |
| VEXT | 21 | OLED power (LOW = ON) |

---

## Folder Structure

```
heltec_lora32_full/
├── README.md               ← You are here
│
├── heltec_anchor/           ← Flash 3 boards (one per anchor)
│   ├── boards.h             Pin definitions
│   └── heltec_anchor.ino    Set ANCHOR_X, ANCHOR_Y per board
│
├── heltec_mobile/           ← Flash 1 board (elderly wearable)
│   ├── boards.h             Pin definitions
│   ├── heltec_mobile.ino    Indoor positioning + panic
│   ├── Point.h              2D point class
│   ├── Point.cpp
│   ├── Triangle.h           Trilateration math
│   └── Triangle.cpp
│
├── heltec_bridge/           ← Flash 1 board per floor
│   ├── boards.h             Pin definitions
│   └── heltec_bridge.ino    Set FLOOR_NO, MESH_PREFIX
│
└── heltec_gateway/          ← Flash 1 board (internet bridge)
    ├── boards.h             Pin definitions
    └── heltec_gateway.ino   Set WIFI_SSID, WIFI_PASSWORD, SERVER_URL
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| OLED blank | Check VEXT pin (must be LOW). Try resetting board. |
| "LoRa INIT FAILED" | Check antenna connection. Verify board is V2. |
| Anchor says "Waiting for main..." | Bridge not powered on yet. Start bridge first. |
| Mobile shows "Need 3+ anchors" | Wait for BEACONs (up to 16 sec). Check mesh SSID matches. |
| Mobile shows "Not enough matches" | BSSID→MAC mismatch. Verify anchors are on same mesh. |
| Gateway shows "No floor header" | Bridge not prepending floor. Reflash bridge. |
| Server not receiving | Check WiFi connection. Verify SERVER_URL is correct. Test with `curl`. |
| Position wildly inaccurate | Calibrate RSSI_REF_1M and PATH_LOSS_N. Check anchor placement. |
| "TIMEOUT" alerts | Mobile tag out of range or powered off. Check battery. |

### Testing Without Server

Open **Serial Monitor** (115200 baud) on the gateway board to see all decoded messages:

```
════════════════════════════════════
RX #42 | RSSI=-67 dBm | SNR=8.5 dB
Floor   : 1
Decrypted: {"x":3.41,"y":2.78,"type":"LOCATION","nodeID":5678}
Type=LOCATION | NodeID=5678 | x=3.41 y=2.78
────────────────────────────────────
```

---

## Server Integration

The gateway POSTs to your Flask server at `/lilygo-data`:

```json
{
  "nodeID": 5678,
  "x": 3.41,
  "y": 2.78,
  "type": "LOCATION",
  "floor": "1",
  "macAddress": "AA:BB:CC:DD:EE:FF"
}
```

The `type` field can be:
- `"LOCATION"` — normal position update (every ~10 sec)
- `"PANIC"` — emergency button pressed (x=999, y=999)
- `"TIMEOUT"` — no signal received for 30+ seconds

---

## Security Note

The current XOR encryption (key `0b101010`) is a **basic obfuscation** suitable for prototyping. For production, consider:

- AES-128/256 encryption
- Key rotation
- HMAC message authentication
- TLS for WiFi HTTP traffic

---

## License

Part of the **Elderly Tracking & Monitoring System** project.
