# Elderly Tracking & Monitoring System — Hardware Architecture

## COMPLETE SYSTEM DIAGRAM

```
╔══════════════════════════════════════════════════════════════════════════════════════════════╗
║                              ELDERLY TRACKING & MONITORING SYSTEM                           ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                              ║
║  ┌─────────────────────────────── FLOOR 6 (Example) ──────────────────────────────────┐     ║
║  │                                                                                     │     ║
║  │  ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐                │     ║
║  │  │  M5StickC Plus   │   │  M5StickC Plus   │   │  M5StickC Plus   │                │     ║
║  │  │  (Anchor Node 1) │   │  (Anchor Node 2) │   │  (Anchor Node 3) │                │     ║
║  │  │  Coords: (2,5)   │   │  Coords: (5,3)   │   │  Coords: (3,1)   │                │     ║
║  │  │  Type: BEACON    │   │  Type: BEACON    │   │  Type: BEACON    │                │     ║
║  │  │  ┌────────────┐  │   │  ┌────────────┐  │   │  ┌────────────┐  │                │     ║
║  │  │  │ WiFi 2.4GHz│  │   │  │ WiFi 2.4GHz│  │   │  │ WiFi 2.4GHz│  │                │     ║
║  │  │  │painlessMesh│  │   │  │painlessMesh│  │   │  │painlessMesh│  │                │     ║
║  │  │  │  (SSID:    │  │   │  │  (SSID:    │  │   │  │  (SSID:    │  │                │     ║
║  │  │  │etms-floor-6│  │   │  │etms-floor-6│  │   │  │etms-floor-6│  │                │     ║
║  │  │  └──────┬─────┘  │   │  └──────┬─────┘  │   │  └──────┬─────┘  │                │     ║
║  │  └─────────┼────────┘   └─────────┼────────┘   └─────────┼────────┘                │     ║
║  │            │                      │                       │                          │     ║
║  │            │    painlessMesh WiFi  │  (Mesh Network)       │                          │     ║
║  │            └──────────────────────┼───────────────────────┘                          │     ║
║  │                                   │                                                   │     ║
║  │                    ┌──────────────┴──────────────┐                                   │     ║
║  │                    │                              │                                   │     ║
║  │     ┌──────────────┴───────────┐   ┌─────────────┴──────────────┐                   │     ║
║  │     │    M5StickC Plus         │   │     LilyGo T3-S3 V1.2     │                   │     ║
║  │     │    (Mobile Tag Node)     │   │     (Main/Bridge Node)     │                   │     ║
║  │     │    Worn by Elderly       │   │     ┌────────────────┐     │                   │     ║
║  │     │                          │   │     │  WiFi 2.4GHz   │     │                   │     ║
║  │     │  ┌────────────────────┐  │   │     │ painlessMesh   │     │                   │     ║
║  │     │  │ WiFi RSSI Scanner  │  │   │     │ (Mesh RX)      │     │                   │     ║
║  │     │  │ painlessMesh Node  │  │   │     └────────┬───────┘     │                   │     ║
║  │     │  │ Triangulation Algo │  │   │              │             │                   │     ║
║  │     │  │ XOR Encryption     │  │   │     ┌────────┴───────┐     │                   │     ║
║  │     │  │ Panic Button (A)   │──┼───│───▶ │  SX1280 LoRa   │     │                   │     ║
║  │     │  └────────────────────┘  │   │     │  2.4GHz Radio  │     │                   │     ║
║  │     └──────────────────────────┘   │     │  (LoRa TX)     │     │                   │     ║
║  │                                    │     └────────┬───────┘     │                   │     ║
║  │                                    └──────────────┼─────────────┘                   │     ║
║  └───────────────────────────────────────────────────┼─────────────────────────────────┘     ║
║                                                       │                                      ║
║                          LoRa 2.4GHz Long-Range Link  │  (Inter-Floor Communication)         ║
║                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                            ║
║                                                       │                                      ║
║  ┌────────────────────────────────────────────────────┼────────────────────────────────┐     ║
║  │                              GROUND FLOOR / SERVER FLOOR                             │     ║
║  │                                                    │                                 │     ║
║  │                    ┌───────────────────────────────┴──────────────┐                  │     ║
║  │                    │        LilyGo T3-S3 V1.2                    │                  │     ║
║  │                    │        (Gateway Node)                       │                  │     ║
║  │                    │                                              │                  │     ║
║  │                    │  ┌──────────────┐   ┌─────────────────┐     │                  │     ║
║  │                    │  │ SX1280 LoRa  │   │  WiFi 2.4GHz    │     │                  │     ║
║  │                    │  │ 2.4GHz Radio │   │  (Station Mode) │     │                  │     ║
║  │                    │  │ (LoRa RX)    │──▶│  HTTP POST      │     │                  │     ║
║  │                    │  └──────────────┘   └────────┬────────┘     │                  │     ║
║  │                    │                              │               │                  │     ║
║  │                    │  ┌──────────────────────┐    │               │                  │     ║
║  │                    │  │ SSD1306 OLED Display │    │               │                  │     ║
║  │                    │  │ 128x64, I2C (0x3C)   │    │               │                  │     ║
║  │                    │  └──────────────────────┘    │               │                  │     ║
║  │                    └──────────────────────────────┼───────────────┘                  │     ║
║  │                                                    │                                 │     ║
║  └────────────────────────────────────────────────────┼─────────────────────────────────┘     ║
║                                                       │  HTTP POST (JSON)                     ║
║                                                       │  WiFi / Internet                      ║
║                                                       ▼                                      ║
║                              ┌─────────────────────────────────────┐                         ║
║                              │         CLOUD / LOCAL SERVER        │                         ║
║                              │    (Flask + MongoDB + Twilio)       │                         ║
║                              │    IP: 34.126.129.174:80            │                         ║
║                              │    Endpoint: /lilygo-data           │                         ║
║                              │                                     │                         ║
║                              │  ┌───────────┐  ┌───────────────┐  │                         ║
║                              │  │ Dashboard  │  │  SMS Alerts   │  │                         ║
║                              │  │ (Web UI)   │  │  (Twilio)     │  │                         ║
║                              │  └───────────┘  └───────────────┘  │                         ║
║                              └─────────────────────────────────────┘                         ║
║                                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## DATA FLOW DIAGRAM

```
┌─────────────┐     WiFi RSSI      ┌──────────────┐   painlessMesh   ┌───────────────┐
│  M5StickC+  │ ◄─── Scan ────────│  M5StickC+   │ ──── BEACON ───▶ │  M5StickC+    │
│  (Tag/Mobile│     Signals        │  (Anchor #1) │   (WiFi Mesh)    │  (Anchor #2)  │
│   on Elder) │                    │  x=2, y=5    │                  │  x=5, y=3     │
└──────┬──────┘                    └──────────────┘                  └───────────────┘
       │                                                                      ▲
       │  1. Scans WiFi RSSI from anchors                                     │
       │  2. Runs Triangulation Algorithm                          painlessMesh│
       │  3. Estimates (x, y) coordinates                          (WiFi Mesh) │
       │  4. XOR Encrypts location data                                       │
       │  5. Sends via painlessMesh to Main Node                  ┌───────────┴───┐
       │                                                           │  M5StickC+    │
       ▼                                                           │  (Anchor #3)  │
┌──────────────┐                                                   │  x=3, y=1     │
│  LilyGo T3S3│  ◄─── painlessMesh (WiFi) ────────────────────── └───────────────┘
│  (Main Node) │
│  Floor 6     │
│              │
│  Receives PM │
│  Transmits   │
│  via LoRa    │
└──────┬───────┘
       │
       │  LoRa 2.4GHz (Long Range, ~2-5km)
       │  XOR Encrypted JSON payload
       │
       ▼
┌──────────────┐
│  LilyGo T3S3│
│  (Gateway)   │
│  Ground Floor│
│              │
│  Receives    │
│  LoRa data   │
│  Decrypts    │
│  HTTP POST   │──────────▶  Flask Server (Cloud)  ──────▶  Dashboard + SMS Alerts
└──────────────┘                                              (Caregiver Notification)
```

---

## 1. HARDWARE COMPONENTS IN DETAIL

### 1.1 LilyGo T3-S3 V1.2 (Minimum: 2, Recommended: 3)

| Specification | Detail |
|---|---|
| **Microcontroller** | ESP32-S3 (dual-core Xtensa LX7, 240MHz) |
| **LoRa Radio** | Semtech SX1280 (2.4 GHz band) |
| **WiFi** | 802.11 b/g/n, 2.4 GHz (built into ESP32-S3) |
| **Display** | SSD1306 OLED, 128×64 pixels, I2C (address 0x3C) |
| **Flash** | 16MB |
| **PSRAM** | 8MB |
| **Battery Pin** | ADC on GPIO 1 |
| **LED** | GPIO 37 |
| **Button** | GPIO 0 |
| **SD Card Slot** | Yes (SPI: MOSI=11, MISO=2, SCLK=14, CS=13) |
| **USB** | USB-C (programming + power) |

**Pin Mapping (from boards.h):**

| Function | GPIO Pin |
|---|---|
| I2C SDA (Display) | 18 |
| I2C SCL (Display) | 17 |
| RADIO_SCLK | 5 |
| RADIO_MISO | 3 |
| RADIO_MOSI | 6 |
| RADIO_CS | 7 |
| RADIO_DIO1 | 9 |
| RADIO_RST | 8 |
| RADIO_BUSY | 36 |
| RADIO_RX | 21 |
| RADIO_TX | 10 |
| BOARD_LED | 37 |
| BAT_ADC | 1 |
| BUTTON | 0 |

**LoRa Radio Configuration (SX1280):**

| Parameter | Value |
|---|---|
| Carrier Frequency | 2400.0 MHz |
| Bandwidth | 203.125 kHz |
| Spreading Factor | 10 |
| Coding Rate | 6 |
| TX Power | 13 dBm |
| Max Packet Size | 256 bytes |

#### Role in the System

The LilyGo T3-S3 serves **two distinct roles** depending on placement:

**Role A — Main/Bridge Node (per floor):**
- Participates in the **painlessMesh WiFi mesh** network on its floor
- Acts as the **main node** that other mesh nodes report location data to
- Receives encrypted location JSON from the mobile tag (via painlessMesh)
- **Bridges** data from WiFi mesh → LoRa radio
- Transmits LoRa packets to the Gateway node on another floor
- Announces itself as "Node A" (MAINNODE) so mesh nodes know where to send data

**Role B — Gateway Node (one per system):**
- Receives LoRa packets from the Main/Bridge node(s)
- **Decrypts** the XOR-encrypted data
- Connects to a **WiFi hotspot** (Station mode) to access the internet
- Sends HTTP POST requests with JSON location data to the Flask server
- Endpoint: `http://34.126.129.174:80/lilygo-data`

**Why LilyGo T3-S3?**
- **Dual-radio capability**: It has BOTH an SX1280 LoRa radio AND ESP32-S3 WiFi — this is critical for bridging between the local mesh network and long-range LoRa
- **2.4 GHz LoRa**: Unlike sub-GHz LoRa, the SX1280 operates at 2.4 GHz which is globally license-free and doesn't require region-specific configurations
- **Long range**: LoRa can reach 2–5 km, making it ideal for inter-floor or inter-building communication
- **Low power LoRa**: Suitable for deployment in resource-constrained environments
- **Built-in OLED**: Useful for debugging and status display during deployment
- **ESP32-S3**: Powerful enough to run both painlessMesh and LoRa simultaneously with interrupt-based switching

---

### 1.2 M5StickC Plus (Minimum: 4)

| Specification | Detail |
|---|---|
| **Microcontroller** | ESP32-PICO-D4 (dual-core Xtensa LX6, 240MHz) |
| **WiFi** | 802.11 b/g/n, 2.4 GHz |
| **Bluetooth** | BLE 4.2 |
| **Display** | TFT LCD, 135×240 pixels, color |
| **IMU** | 6-axis (accelerometer + gyroscope) |
| **Flash** | 4MB |
| **PSRAM** | 8MB |
| **Battery** | 120mAh built-in LiPo |
| **Buttons** | Button A (front), Button B (side), Power button |
| **Buzzer** | Built-in |
| **USB** | USB-C |
| **Size** | 48.2 × 25.5 × 13.7 mm (very compact, wearable) |

#### Roles in the System

The M5StickC Plus serves **three distinct roles**:

**Role A — Anchor/Beacon Node (minimum 3 required):**
- Placed at **fixed, known coordinates** on a floor (e.g., (2,5), (5,3), (3,1))
- Broadcasts its position information (x, y, MAC address) as `BEACON` type messages via painlessMesh
- Other nodes use its WiFi signal for RSSI-based distance estimation
- Coordinates are stored in **non-volatile flash** using the ESP32 Preferences library
- Continuously broadcasts its info so mobile nodes can discover it

**Role B — Mobile/Tag Node (worn by elderly person):**
- **Carried or worn by the elderly person** being tracked
- Performs **WiFi RSSI scanning** to detect nearby anchor nodes
- Runs the **triangulation algorithm** using the 3 strongest RSSI signals:
  1. Scans WiFi networks matching the mesh SSID (`etms-floor-6`)
  2. Sorts by signal strength (RSSI)
  3. Picks the 3 strongest
  4. Converts RSSI → distance using the formula: $d = 10^{\frac{A - RSSI}{10n}}$ where $A = -70$ dBm (reference), $n = 5.0$ (path loss exponent)
  5. Applies **trilateration** to compute estimated (x, y) position
- **XOR encrypts** the location data before transmission
- Sends encrypted location to the Main Node via painlessMesh
- Has a **PANIC BUTTON** (Button A) — when pressed, sends a `PANIC` type message to the main node for immediate caregiver alert

**Role C — Main Node (one per floor, can also be LilyGo):**
- Announces itself as the main node ("A") via broadcast
- Receives LOCATION messages from mobile tags
- Receives BEACON messages from anchor nodes
- Forwards location data to the next layer (LoRa via LilyGo)

**Why M5StickC Plus?**
- **Ultra-compact form factor**: At only 48×25×13mm, it's small enough to be worn as a wristband/pendant by elderly
- **Built-in battery**: 120mAh LiPo enables wireless, portable operation
- **WiFi built-in**: Essential for painlessMesh participation and RSSI scanning
- **Color LCD display**: Shows status, coordinates, and connection info
- **IMU sensor**: Could be extended for fall detection (accelerometer + gyroscope)
- **Physical button**: Acts as a panic/SOS button for emergencies
- **Low cost**: Affordable enough to deploy multiple units as anchor nodes
- **Preferences storage**: Can persist anchor coordinates across reboots

---

### 1.3 SSD1306 OLED Display (Built into LilyGo T3-S3)

| Specification | Detail |
|---|---|
| **Resolution** | 128 × 64 pixels |
| **Interface** | I2C (address 0x3C) |
| **Pins** | SDA = GPIO 18, SCL = GPIO 17 |
| **Library** | U8g2lib / SSD1306Wire |
| **Color** | Monochrome (white/blue) |

**Purpose:**
- Displays LoRa initialization status
- Shows received/transmitted data (MAC address, coordinates, floor)
- Displays WiFi connection status and IP address
- Shows RSSI and SNR values for debugging
- Essential for field deployment and troubleshooting without a computer

---

### 1.4 SX1280 LoRa Radio (Built into LilyGo T3-S3)

| Specification | Detail |
|---|---|
| **Chip** | Semtech SX1280 |
| **Frequency** | 2.4 GHz ISM band |
| **Modulation** | LoRa (Chirp Spread Spectrum) |
| **Range** | 2 – 5 km (line of sight) |
| **Max Packet** | 256 bytes |
| **Interface** | SPI |
| **Library** | RadioLib |

**Why 2.4 GHz LoRa (not sub-GHz)?**
- **Globally license-free**: No region-specific frequency planning needed
- **Same band as WiFi**: Simplifies antenna design on the LilyGo board
- **Sufficient range**: 2–5 km easily covers multi-story buildings
- **Chirp Spread Spectrum**: Robust against WiFi interference despite sharing the 2.4 GHz band
- **Mitigations for shared band**: The code uses interrupt-based execution and flag-based protocol switching to avoid simultaneous WiFi + LoRa usage

---

## 2. COMMUNICATION PROTOCOLS

### 2.1 painlessMesh (WiFi Mesh Network)

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│ Anchor 1 │◄───────►│ Anchor 2 │◄───────►│ Anchor 3 │
│ M5Stick  │  WiFi   │ M5Stick  │  WiFi   │ M5Stick  │
│ BEACON   │  Mesh   │ BEACON   │  Mesh   │ BEACON   │
└────┬─────┘         └────┬─────┘         └────┬─────┘
     │                     │                    │
     │     painlessMesh    │                    │
     │     (WiFi 2.4GHz)   │                    │
     └─────────┬───────────┴────────────────────┘
               │
        ┌──────┴───────┐              ┌────────────────┐
        │  Mobile Tag  │  LOCATION    │ LilyGo T3-S3   │
        │  M5Stick     │─────────────►│ (Main Node)    │
        │  (on Elder)  │  via Mesh    │ painlessMesh + │
        └──────────────┘              │ LoRa TX        │
                                      └────────────────┘
```

| Parameter | Value |
|---|---|
| SSID | `etms-floor-6` (per floor) |
| Password | `t02_iotPassword` |
| Port | 5555 |
| Range | Up to ~90m (sufficient for intra-floor) |
| Data Rate | 0.1 – 54 Mbps |

**Why painlessMesh?**
- Creates a **self-healing, self-organizing** WiFi mesh with NO traditional access point needed
- Only requires **ONE WiFi access point** for the entire floor — resource-constrained friendly
- Each node can relay messages to any other node in the mesh
- Automatic node discovery and time synchronization
- Supports broadcast (BEACON announcements) and unicast (LOCATION to main node)

### 2.2 LoRa (Long-Range Communication)

```
    FLOOR 6                                    GROUND FLOOR
┌──────────────┐                           ┌──────────────┐
│  LilyGo T3S3 │     LoRa 2.4 GHz         │  LilyGo T3S3 │
│  Main Node   │ ════════════════════════▶ │  Gateway     │
│  (LoRa TX)   │     ~2-5 km range         │  (LoRa RX)   │
│              │     XOR encrypted          │  WiFi → HTTP │
└──────────────┘     JSON payload           └──────────────┘
```

**Why LoRa for inter-floor?**
- WiFi mesh cannot reliably penetrate multiple floors of concrete
- LoRa's long range (2-5km) easily handles vertical building traversal
- Low power consumption for always-on operation
- Small data packets (location JSON < 256 bytes) fit perfectly within LoRa constraints

### 2.3 WiFi (Internet Uplink)

```
┌──────────────┐      WiFi STA        ┌──────────────┐      HTTP POST      ┌──────────────┐
│  LilyGo T3S3 │ ──────────────────▶  │ WiFi Hotspot │ ────────────────▶  │ Flask Server │
│  Gateway     │                       │ / Router     │     Internet        │ (Cloud)      │
└──────────────┘                       └──────────────┘                     └──────────────┘
```

- The Gateway LilyGo connects to a standard WiFi access point in Station mode
- Sends HTTP POST requests with JSON data to the server
- Only ONE device needs internet access (the Gateway)

---

## 3. SECURITY

### XOR Encryption

```
Mobile Tag (M5StickC Plus)              Gateway (LilyGo T3-S3)
┌───────────────────────┐              ┌───────────────────────┐
│ Location JSON         │              │ Encrypted LoRa Packet │
│ {"x":3.2,"y":4.1,...} │              │ (garbled bytes)       │
│         │             │              │         │             │
│         ▼             │              │         ▼             │
│  XOR Encrypt          │   LoRa TX    │  XOR Decrypt          │
│  Key: 0b101010        │ ──────────▶  │  Key: 0b101010        │
│         │             │              │         │             │
│         ▼             │              │         ▼             │
│  Encrypted payload    │              │ Location JSON         │
└───────────────────────┘              │ {"x":3.2,"y":4.1,...} │
                                       └───────────────────────┘
```

- All location data is XOR-encrypted before LoRa transmission
- Shared key: `0b101010` (binary)
- Prevents eavesdropping on LoRa radio signals

---

## 4. POSITIONING ALGORITHM (Trilateration)

```
        Anchor 1 (x₁, y₁)
             ╱    d₁
            ╱
           ╱
    ● ────────── Estimated Position (x, y)
           ╲
            ╲
             ╲    d₂            d₃
        Anchor 2 (x₂, y₂) ─────── Anchor 3 (x₃, y₃)
```

**Algorithm Steps:**
1. Mobile tag scans WiFi, gets RSSI from anchors
2. Converts RSSI to distance: $d = 10^{\frac{A - RSSI}{10n}}$ where $A = -70$, $n = 5.0$
3. Uses trilateration (Triangle library) to solve for (x, y):

$$a \cdot x + b \cdot y = c$$
$$d \cdot x + e \cdot y = f$$

Where the coefficients are derived from the known anchor positions and estimated distances.

**Requires minimum 3 anchor nodes** for 2D positioning.

---

## 5. COMPLETE HARDWARE BILL OF MATERIALS

| # | Component | Quantity | Role | Est. Cost (USD) |
|---|---|---|---|---|
| 1 | LilyGo T3-S3 V1.2 | 2–3 | Main Node + Gateway (+ spare) | ~$25 each |
| 2 | M5StickC Plus | 4+ | 3 Anchors + 1 Mobile Tag (per floor) | ~$20 each |
| 3 | USB-C Cables | 6+ | Power/Programming | ~$3 each |
| 4 | USB Power Banks/Adapters | 6+ | Power supply for nodes | ~$10 each |
| 5 | WiFi Router/Hotspot | 1 | Internet uplink for Gateway | Existing |
| | | | **Estimated Total (minimum)** | **~$200–$250** |

---

## 6. PER-NODE SUMMARY TABLE

| Node Type | Hardware | Communication | Software Libraries | Key Function |
|---|---|---|---|---|
| **Anchor Node** | M5StickC Plus | painlessMesh (WiFi) | painlessMesh, ArduinoJson, Preferences | Fixed-position beacon, broadcasts coordinates |
| **Mobile Tag** | M5StickC Plus | painlessMesh (WiFi) | painlessMesh, ArduinoJson, Triangle | RSSI scan, triangulation, panic button |
| **Main/Bridge Node** | LilyGo T3-S3 | painlessMesh (WiFi) + LoRa TX | painlessMesh, RadioLib, ArduinoJson | Bridges mesh → LoRa, per-floor coordinator |
| **Gateway Node** | LilyGo T3-S3 | LoRa RX + WiFi STA (HTTP) | RadioLib, HTTPClient, ArduinoJson | LoRa → Internet bridge, HTTP POST to server |

---

## 7. WHY THIS HARDWARE COMBINATION?

| Requirement | Solution | Why? |
|---|---|---|
| Indoor positioning without GPS | WiFi RSSI + Trilateration | GPS doesn't work indoors; WiFi RSSI is free with existing hardware |
| Inter-floor communication | LoRa 2.4 GHz (SX1280) | Penetrates concrete floors, 2-5km range, low power |
| Intra-floor mesh networking | painlessMesh on ESP32 | Self-organizing, no infrastructure needed, only 1 AP required |
| Wearable for elderly | M5StickC Plus | Tiny (48×25mm), built-in battery, has panic button |
| Minimal infrastructure | LilyGo as bridge | Only need 1 WiFi router for the entire system |
| Emergency alerts | M5StickC Plus Button A | Physical panic button sends immediate PANIC message |
| Encrypted communications | XOR on ESP32 | Lightweight encryption suitable for constrained devices |
| Visual monitoring | OLED/TFT displays | Debug and status without computer, useful in deployment |
