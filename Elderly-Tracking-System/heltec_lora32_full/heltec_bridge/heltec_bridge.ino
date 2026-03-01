/*
 * ════════════════════════════════════════════════════════════════
 *  ETMS — BRIDGE NODE (Floor Main Node + LoRa TX)
 *  Hardware:  Heltec WiFi LoRa 32 (433 MHz)
 *  Role:      Floor coordinator — receives mesh data, sends via LoRa
 *  Qty:       1 per floor
 * ════════════════════════════════════════════════════════════════
 *
 *  WHAT THIS DOES:
 *    1. Acts as the "Main Node" for this floor's painlessMesh
 *    2. Announces itself as "A" so all other nodes know it
 *    3. Receives encrypted LOCATION/PANIC from mobile tags
 *    4. Prepends floor number and forwards via LoRa TX to gateway
 *    5. Filters out BEACON and announcement messages (saves LoRa BW)
 *
 *  CONFIGURE: Set FLOOR_NO for this floor before flashing.
 *
 *  LIBRARIES NEEDED:
 *    • painlessMesh     (+ ArduinoJson, TaskScheduler, AsyncTCP)
 *    • ArduinoJson      (by Benoît Blanchon)
 *    • RadioLib          (by Jan Gromeš)
 *    • ESP8266 and ESP32 OLED driver for SSD1306 (by ThingPulse)
 *
 *  BOARD: Tools → Board → "WiFi LoRa 32(V2)"
 *
 * ════════════════════════════════════════════════════════════════
 */

#include "painlessMesh.h"
#include "SSD1306Wire.h"
#include <ArduinoJson.h>
#include <RadioLib.h>
#include <WiFi.h>
#include "boards.h"

// ╔════════════════════════════════════════════════════════════╗
// ║  >>> CONFIGURE THESE VALUES <<<                           ║
// ╚════════════════════════════════════════════════════════════╝
#define FLOOR_NO      "1"               // ← Floor number for this bridge

// ╔════════════════════════════════════════════════════════════╗
// ║  MESH CONFIG — MUST match anchors & mobile on this floor  ║
// ╚════════════════════════════════════════════════════════════╝
#define MESH_PREFIX   "etms-floor-1"
#define MESH_PASSWORD "etms_password"
#define MESH_PORT     5555

#define MAINNODE      "A"
#define NODE          "A"      // This bridge IS the main node

// ──────────── Hardware Objects ────────────
SSD1306Wire display(OLED_ADDR, OLED_SDA, OLED_SCL);
Scheduler   userScheduler;
painlessMesh mesh;
SX1276      radio = new Module(LORA_CS, LORA_IRQ, LORA_RST);

// ──────────── State ──────────────────────
volatile bool txDoneFlag      = true;
volatile bool enableInterrupt = true;
int           txState         = RADIOLIB_ERR_NONE;
uint32_t      packetsForwarded = 0;

// ──────────── ISR: LoRa TX Complete ──────
void IRAM_ATTR onTxDone() {
  if (!enableInterrupt) return;
  txDoneFlag = true;
}

// ──────────── Announce main node to mesh ─
void announceNodeId() {
  mesh.sendBroadcast(String(NODE));
}
Task taskAnnounce(TASK_SECOND * 2, TASK_FOREVER, &announceNodeId);

// ══════════════════════════════════════════════════
//  painlessMesh Receive Callback
// ══════════════════════════════════════════════════
void pmReceiveCallback(uint32_t from, String &msg) {
  // ── Filter 1: Skip own main-node announcements bounced back ──
  if (msg == NODE || msg.startsWith(MAINNODE)) return;

  // ── Filter 2: Skip plaintext BEACON messages from anchors ──
  //    Encrypted messages will FAIL JSON parse → they pass through
  StaticJsonDocument<256> testDoc;
  DeserializationError err = deserializeJson(testDoc, msg);
  if (!err) {
    // It parsed as valid JSON → it's a plaintext message
    const char* type = testDoc["type"];
    if (type) {
      // Any plaintext message with a "type" field → don't forward
      Serial.printf("Filtered plaintext (%s) from %u\n", type, from);
      return;
    }
  }

  // ── This is an encrypted LOCATION or PANIC from mobile tag ──
  // Prepend floor number:  "1:encrypted_data"
  String loraPacket = String(FLOOR_NO) + ":" + msg;

  // Wait for previous TX to complete
  unsigned long start = millis();
  while (!txDoneFlag && (millis() - start < 2000)) {
    delay(1);
  }

  enableInterrupt = false;
  txDoneFlag      = false;
  txState = radio.startTransmit(loraPacket);
  enableInterrupt = true;
  packetsForwarded++;

  // Update display
  display.clear();
  display.drawString(0, 0,  "ETMS Bridge - Floor " + String(FLOOR_NO));
  if (txState == RADIOLIB_ERR_NONE) {
    display.drawString(0, 14, "LoRa TX: OK");
  } else {
    display.drawString(0, 14, "LoRa TX: FAILED!");
  }
  display.drawString(0, 28, "From mesh: " + String(from));
  display.drawString(0, 42, "Forwarded: #" + String(packetsForwarded));
  display.drawString(0, 54, "Bytes: " + String(loraPacket.length()));
  display.display();

  Serial.printf("Bridge → LoRa #%u | from=%u | bytes=%d\n",
    packetsForwarded, from, loraPacket.length());
}

void newConnectionCallback(uint32_t nodeId) {
  Serial.printf("New connection: %u\n", nodeId);
}

void changedConnectionCallback() {
  Serial.println("Connections changed");
}

void nodeTimeAdjustedCallback(int32_t offset) {}

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

// ──────────── Init LoRa SX1276 ──────────
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
    0  // auto gain
  );

  if (state == RADIOLIB_ERR_NONE) {
    Serial.println(F("OK!"));
    return true;
  }
  Serial.print(F("FAILED, code ")); Serial.println(state);
  return false;
}

// ══════════════════════════════════════════════════
//  SETUP
// ══════════════════════════════════════════════════
void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println(F("\n═══════════════════════════════════"));
  Serial.println(F(" ETMS — Bridge (Main Node + LoRa TX)"));
  Serial.printf(" Floor: %s\n", FLOOR_NO);
  Serial.println(F("═══════════════════════════════════"));

  pinMode(BOARD_LED, OUTPUT);
  digitalWrite(BOARD_LED, LOW);

  // ── Init OLED ──
  initOLED();
  display.drawString(0, 0,  "ETMS Bridge");
  display.drawString(0, 14, "Floor: " + String(FLOOR_NO));
  display.drawString(0, 28, "Initializing...");
  display.display();
  delay(500);

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

  radio.setDio0Action(onTxDone, RISING);

  // ── Init painlessMesh as Main Node ──
  mesh.setDebugMsgTypes(ERROR | STARTUP);
  mesh.init(MESH_PREFIX, MESH_PASSWORD, &userScheduler, MESH_PORT);
  mesh.onReceive(&pmReceiveCallback);
  mesh.onNewConnection(&newConnectionCallback);
  mesh.onChangedConnections(&changedConnectionCallback);
  mesh.onNodeTimeAdjusted(&nodeTimeAdjustedCallback);

  // Start announcing self as main node
  userScheduler.addTask(taskAnnounce);
  taskAnnounce.enable();

  Serial.println("Node ID    : " + String(mesh.getNodeId()));
  Serial.println("Mesh SSID  : " + String(MESH_PREFIX));
  Serial.println("LoRa       : 433 MHz TX ready");

  // ── Ready screen ──
  display.clear();
  display.drawString(0, 0,  "ETMS Bridge - Floor " + String(FLOOR_NO));
  display.drawString(0, 14, "LoRa 433MHz: OK (TX)");
  display.drawString(0, 28, "Mesh: " + String(MESH_PREFIX));
  display.drawString(0, 42, "ID: " + String(mesh.getNodeId()));
  display.drawString(0, 54, "Waiting for data...");
  display.display();

  Serial.println("Bridge ready — waiting for location data...\n");
}

// ══════════════════════════════════════════════════
//  LOOP
// ══════════════════════════════════════════════════
void loop() {
  mesh.update();
}
