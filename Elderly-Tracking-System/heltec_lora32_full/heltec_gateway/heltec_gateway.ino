/*
 * ════════════════════════════════════════════════════════════════
 *  ETMS — GATEWAY NODE (LoRa RX → WiFi → Server)
 *  Hardware:  Heltec WiFi LoRa 32 (433 MHz)
 *  Role:      Receives LoRa from bridge(s), sends HTTP POST to server
 *  Qty:       1 for the entire system
 * ════════════════════════════════════════════════════════════════
 *
 *  WHAT THIS DOES:
 *    1. Listens for LoRa packets from bridge node(s)
 *    2. Extracts floor number from packet header
 *    3. XOR-decrypts the payload → gets (x, y, type, nodeID)
 *    4. Connects to WiFi and sends HTTP POST to Flask server
 *    5. Detects PANIC, LOCATION, and TIMEOUT alerts
 *    6. OLED shows real-time status
 *
 *  CONFIGURE: Set WiFi credentials and server URL before flashing.
 *
 *  LIBRARIES NEEDED:
 *    • RadioLib          (by Jan Gromeš)
 *    • ArduinoJson       (by Benoît Blanchon)
 *    • ESP8266 and ESP32 OLED driver for SSD1306 (by ThingPulse)
 *    (WiFi & HTTPClient are built into ESP32 core)
 *
 *  BOARD: Tools → Board → "WiFi LoRa 32(V2)"
 *
 * ════════════════════════════════════════════════════════════════
 */

#include <RadioLib.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include "SSD1306Wire.h"
#include "boards.h"

// ╔════════════════════════════════════════════════════════════╗
// ║  >>> CONFIGURE THESE 3 VALUES BEFORE FLASHING <<<         ║
// ╚════════════════════════════════════════════════════════════╝
const char*  WIFI_SSID     = "YOUR_WIFI_SSID";                       // ← WiFi name
const char*  WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";                    // ← WiFi pass
const String SERVER_URL    = "http://YOUR_SERVER_IP:80/lilygo-data";  // ← Flask endpoint
// ╚════════════════════════════════════════════════════════════╝

// Timeout: alert if no LoRa packet received for this long
#define TIMEOUT_MS    30000   // 30 seconds

// ──────────── Hardware Objects ────────────
SSD1306Wire display(OLED_ADDR, OLED_SDA, OLED_SCL);
SX1276      radio = new Module(LORA_CS, LORA_IRQ, LORA_RST);

// ──────────── State ──────────────────────
volatile bool rxDoneFlag      = false;
volatile bool enableInterrupt = true;

unsigned long lastPacketMs    = 0;
bool          timeoutAlerted  = false;
uint32_t      packetsReceived = 0;
float         lastRSSI        = 0;
float         lastSNR         = 0;
String        lastFloor       = "?";
String        lastType        = "—";
uint32_t      lastNodeID      = 0;

// ──────────── ISR: LoRa RX Complete ──────
void IRAM_ATTR onRxDone() {
  if (!enableInterrupt) return;
  rxDoneFlag = true;
}

// ──────────── XOR Decrypt ────────────────
String xor_decrypt(const String &msg, uint8_t key) {
  String out;
  out.reserve(msg.length());
  for (unsigned int i = 0; i < msg.length(); i++) {
    out += (char)(msg[i] ^ key);
  }
  return out;
}

// ──────────── OLED Init ──────────────────
void initOLED() {
  pinMode(VEXT_PIN, OUTPUT);
  digitalWrite(VEXT_PIN, LOW);
  delay(50);
  pinMode(OLED_RST, OUTPUT);
  digitalWrite(OLED_RST, LOW);
  delay(20);
  digitalWrite(OLED_RST, HIGH);
  delay(20);

  display.init();
  display.clear();
  display.setFont(ArialMT_Plain_10);
  display.flipScreenVertically();
  display.setTextAlignment(TEXT_ALIGN_LEFT);
}

// ──────────── Init LoRa ──────────────────
bool initLoRa() {
  SPI.begin(LORA_SCK, LORA_MISO, LORA_MOSI, LORA_CS);

  Serial.print(F("[SX1276] Initializing ... "));
  int state = radio.begin(
    LORA_FREQUENCY,
    LORA_BANDWIDTH,
    LORA_SPREADING_FACTOR,
    LORA_CODING_RATE,
    RADIOLIB_SX127X_SYNC_WORD,
    LORA_TX_POWER,
    LORA_PREAMBLE_LEN,
    0
  );
  if (state == RADIOLIB_ERR_NONE) {
    Serial.println(F("OK!"));
    return true;
  }
  Serial.print(F("FAILED, code ")); Serial.println(state);
  return false;
}

// ──────────── WiFi Connect ───────────────
void connectWiFi() {
  display.clear();
  display.drawString(0, 0,  "ETMS Gateway");
  display.drawString(0, 14, "Connecting WiFi...");
  display.drawString(0, 28, "SSID: " + String(WIFI_SSID));
  display.display();

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("WiFi connecting");
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 40) {
    delay(500);
    Serial.print('.');
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println(" connected!");
    Serial.println("IP: " + WiFi.localIP().toString());
    display.clear();
    display.drawString(0, 0,  "WiFi: Connected!");
    display.drawString(0, 14, "IP: " + WiFi.localIP().toString());
    display.display();
  } else {
    Serial.println(" FAILED!");
    display.clear();
    display.drawString(0, 0,  "WiFi: FAILED");
    display.drawString(0, 14, "Will retry later...");
    display.display();
  }
  delay(1500);
}

// ──────────── HTTP POST ──────────────────
bool sendToServer(const String &jsonStr) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi down — reconnecting...");
    connectWiFi();
    if (WiFi.status() != WL_CONNECTED) return false;
  }

  HTTPClient http;
  http.begin(SERVER_URL);
  http.addHeader("Content-Type", "application/json");
  http.setTimeout(5000);

  Serial.println("POST → " + jsonStr);

  int httpCode = http.POST(jsonStr);
  bool ok = (httpCode > 0);

  if (ok) {
    Serial.printf("Server %d: %s\n", httpCode, http.getString().c_str());
  } else {
    Serial.println("HTTP error: " + http.errorToString(httpCode));
  }

  http.end();
  return ok;
}

// ──────────── Update OLED ────────────────
void updateDisplay(const String &status, const String &detail) {
  display.clear();
  display.drawString(0, 0,  "ETMS Gateway");
  display.drawString(0, 12, status);
  display.drawString(0, 24, detail);
  display.drawString(0, 36, "RSSI:" + String(lastRSSI, 0) + " Floor:" + lastFloor);
  display.drawString(0, 48, "PKT#" + String(packetsReceived) + " ID:" + String(lastNodeID));
  display.display();
}

// ══════════════════════════════════════════════════
//  SETUP
// ══════════════════════════════════════════════════
void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println(F("\n═══════════════════════════════════"));
  Serial.println(F(" ETMS — Gateway (LoRa RX → Server)"));
  Serial.println(F("═══════════════════════════════════"));

  pinMode(BOARD_LED, OUTPUT);
  digitalWrite(BOARD_LED, LOW);

  // ── Init OLED ──
  initOLED();
  display.drawString(0, 0,  "ETMS Gateway");
  display.drawString(0, 14, "Starting up...");
  display.display();

  // ── Init LoRa ──
  if (!initLoRa()) {
    display.clear();
    display.drawString(0, 0,  "!! LoRa FAILED !!");
    display.drawString(0, 14, "Check antenna");
    display.display();
    while (true) {
      digitalWrite(BOARD_LED, !digitalRead(BOARD_LED));
      delay(200);
    }
  }

  radio.setDio0Action(onRxDone, RISING);

  int state = radio.startReceive();
  if (state != RADIOLIB_ERR_NONE) {
    Serial.print("startReceive failed: "); Serial.println(state);
  }

  // ── Connect WiFi ──
  connectWiFi();

  // ── Ready screen ──
  display.clear();
  display.drawString(0, 0,  "ETMS Gateway — Ready");
  display.drawString(0, 14, "LoRa: 433MHz Listening");
  display.drawString(0, 28, "WiFi: " +
    (WiFi.status() == WL_CONNECTED ? WiFi.localIP().toString() : String("disconnected")));
  display.drawString(0, 42, "Server: " + SERVER_URL.substring(7, 32));
  display.drawString(0, 54, "Waiting for bridge...");
  display.display();

  lastPacketMs = millis();
  Serial.println("Gateway ready — listening for LoRa packets...\n");
}

// ══════════════════════════════════════════════════
//  LOOP
// ══════════════════════════════════════════════════
void loop() {

  // ─────── HANDLE RECEIVED LoRa PACKET ───────
  if (rxDoneFlag) {
    enableInterrupt = false;
    rxDoneFlag      = false;

    String raw;
    int state = radio.readData(raw);

    if (state == RADIOLIB_ERR_NONE && raw.length() > 2) {
      packetsReceived++;
      lastPacketMs   = millis();
      timeoutAlerted = false;

      lastRSSI = radio.getRSSI();
      lastSNR  = radio.getSNR();

      Serial.println(F("────────────────────────────────────"));
      Serial.printf("RX #%u | RSSI=%.0f dBm | SNR=%.1f dB\n",
        packetsReceived, lastRSSI, lastSNR);

      // ── Parse floor header: "FLOOR:encrypted_data" ──
      int colonIdx = raw.indexOf(':');
      if (colonIdx > 0) {
        lastFloor       = raw.substring(0, colonIdx);
        String encrypted = raw.substring(colonIdx + 1);

        // ── Decrypt ──
        String jsonStr = xor_decrypt(encrypted, XOR_KEY);
        Serial.println("Floor   : " + lastFloor);
        Serial.println("Decrypted: " + jsonStr);

        // ── Parse JSON ──
        StaticJsonDocument<256> doc;
        DeserializationError err = deserializeJson(doc, jsonStr);

        if (err) {
          Serial.println("JSON parse error: " + String(err.c_str()));
          updateDisplay("Received garbled", "Decrypt/JSON failed");
        } else {
          lastNodeID = doc["nodeID"] | 0;
          lastType   = doc["type"]   | String("UNKNOWN");
          double x   = doc["x"]      | 0.0;
          double y   = doc["y"]      | 0.0;

          Serial.printf("Type=%s | NodeID=%u | x=%.2f y=%.2f\n",
            lastType.c_str(), lastNodeID, x, y);

          // ── Alert display ──
          bool isPanic = (lastType == "PANIC");
          if (isPanic) {
            Serial.println(F("╔══════════════════════════════════╗"));
            Serial.println(F("║   !!! PANIC ALERT !!!            ║"));
            Serial.println(F("╚══════════════════════════════════╝"));
            updateDisplay("!!! PANIC ALERT !!!", "Floor " + lastFloor + " — HELP NOW!");
            digitalWrite(BOARD_LED, HIGH);
          } else {
            updateDisplay("LOCATION — Floor " + lastFloor,
              "(" + String(x, 1) + ", " + String(y, 1) + ")");
            digitalWrite(BOARD_LED, LOW);
          }

          // ── Build server payload (matches Flask /lilygo-data) ──
          StaticJsonDocument<256> serverDoc;
          serverDoc["nodeID"]     = (int)lastNodeID;
          serverDoc["x"]          = x;
          serverDoc["y"]          = y;
          serverDoc["type"]       = lastType;
          serverDoc["floor"]      = lastFloor;

          // Add macAddress if present
          const char* mac = doc["macAddress"];
          if (mac) serverDoc["macAddress"] = mac;

          String serverJson;
          serializeJson(serverDoc, serverJson);

          // ── Send to server ──
          sendToServer(serverJson);
        }
      } else {
        Serial.println("No floor header found in packet");
        updateDisplay("Bad packet format", "No floor header");
      }

    } else if (state != RADIOLIB_ERR_CRC_MISMATCH) {
      Serial.print("readData error: "); Serial.println(state);
    }

    enableInterrupt = true;
    radio.startReceive();
  }

  // ─────── HEARTBEAT TIMEOUT ───────
  unsigned long elapsed = millis() - lastPacketMs;
  if (elapsed > TIMEOUT_MS && !timeoutAlerted) {
    timeoutAlerted = true;
    unsigned long secs = elapsed / 1000;

    Serial.println(F("╔══════════════════════════════════╗"));
    Serial.printf("║  TIMEOUT — no signal for %lus\n", secs);
    Serial.println(F("╚══════════════════════════════════╝"));

    display.clear();
    display.drawString(0, 0,  "ETMS Gateway");
    display.drawString(0, 14, "!! NO SIGNAL !!");
    display.drawString(0, 28, "Last: " + String(secs) + "s ago");
    display.drawString(0, 42, "Elderly may be lost!");
    display.drawString(0, 54, "Total: " + String(packetsReceived) + " pkts");
    display.display();
    digitalWrite(BOARD_LED, HIGH);

    // Send timeout alert to server
    if (lastNodeID > 0) {
      StaticJsonDocument<256> timeoutDoc;
      timeoutDoc["nodeID"] = (int)lastNodeID;
      timeoutDoc["x"]      = 999.0;
      timeoutDoc["y"]      = 999.0;
      timeoutDoc["type"]   = "TIMEOUT";
      timeoutDoc["floor"]  = lastFloor;

      String timeoutJson;
      serializeJson(timeoutDoc, timeoutJson);
      sendToServer(timeoutJson);
    }
  }

  delay(10);
}
