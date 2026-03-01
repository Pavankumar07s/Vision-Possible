/*
 * ════════════════════════════════════════════════════════════════
 *  ETMS — ANCHOR NODE (Beacon)
 *  Hardware:  Heltec WiFi LoRa 32 (433 MHz)
 *  Role:      Fixed-position WiFi beacon for indoor positioning
 *  Qty:       Flash 3 boards (each with DIFFERENT coordinates)
 * ════════════════════════════════════════════════════════════════
 *
 *  BEFORE FLASHING EACH ANCHOR — change ANCHOR_X and ANCHOR_Y
 *  to this anchor's measured physical position (in meters).
 *
 *  Example room layout (top view, in meters):
 *
 *      (0,0)─────────────────────(10,0)
 *        │   Anchor1(2,5)          │
 *        │        ●                │
 *        │                         │
 *        │              ●          │
 *        │         Anchor2(7,3)    │
 *        │                         │
 *        │  ●                      │
 *        │  Anchor3(1,1)           │
 *      (0,6)─────────────────────(10,6)
 *
 *  LIBRARIES NEEDED:
 *    • painlessMesh     (+ its dependencies: ArduinoJson, TaskScheduler, AsyncTCP)
 *    • ArduinoJson      (by Benoît Blanchon)
 *    • ESP8266 and ESP32 OLED driver for SSD1306  (by ThingPulse)
 *
 *  BOARD: Tools → Board → "WiFi LoRa 32(V2)"
 *
 * ════════════════════════════════════════════════════════════════
 */

#include "painlessMesh.h"
#include "SSD1306Wire.h"
#include <ArduinoJson.h>
#include <WiFi.h>
#include <Preferences.h>
#include "boards.h"

// ╔════════════════════════════════════════════════════════════╗
// ║  >>> CHANGE THESE FOR EACH ANCHOR BOARD <<<               ║
// ╚════════════════════════════════════════════════════════════╝
#define ANCHOR_X      2.0       // ← X position in meters
#define ANCHOR_Y      5.0       // ← Y position in meters

// ╔════════════════════════════════════════════════════════════╗
// ║  >>> MESH CONFIG — SAME on all nodes on this floor <<<    ║
// ╚════════════════════════════════════════════════════════════╝
#define MESH_PREFIX   "etms-floor-1"
#define MESH_PASSWORD "etms_password"
#define MESH_PORT     5555

#define MAINNODE      "A"
#define TYPE          "BEACON"

// ──────────── Hardware Objects ────────────
SSD1306Wire display(OLED_ADDR, OLED_SDA, OLED_SCL);
Scheduler   userScheduler;
Preferences preferences;
painlessMesh mesh;

// ──────────── State ──────────────────────
bool     mainNodeSet      = false;
bool     isFirstConnection = true;
uint32_t mainNode         = 0;
uint32_t beaconsSent      = 0;

// ──────────── Node Info ──────────────────
struct NodeInfo {
  double   x;
  double   y;
  String   macAddress;
  String   type;
  uint32_t nodeId;

  String toJSONString() {
    StaticJsonDocument<256> doc;
    doc["x"]          = x;
    doc["y"]          = y;
    doc["macAddress"]  = macAddress;
    doc["type"]        = type;
    doc["nodeID"]      = (int)nodeId;
    String out;
    serializeJson(doc, out);
    return out;
  }
};

NodeInfo myInfo;

// ──────────── Send Beacon to all non-main nodes ──────
void sendBeacon() {
  String infoMsg = myInfo.toJSONString();
  std::list<uint32_t> nodes = mesh.getNodeList();
  for (uint32_t nid : nodes) {
    if (nid != mainNode) {
      mesh.sendSingle(nid, infoMsg);
    }
  }
  beaconsSent++;

  // Update display
  display.clear();
  display.drawString(0, 0,  "ETMS Anchor");
  display.drawString(0, 12, "(" + String(ANCHOR_X, 1) + ", " + String(ANCHOR_Y, 1) + ")");
  display.drawString(0, 24, "MAC: " + myInfo.macAddress);
  display.drawString(0, 36, "Beacons: " + String(beaconsSent));
  display.drawString(0, 48, mainNodeSet ? ("Main: " + String(mainNode)) : "Waiting for main...");
  display.display();
}

Task taskSendBeacon(TASK_SECOND * 8, TASK_FOREVER, &sendBeacon);

// ──────────── painlessMesh Callbacks ─────────────
void receivedCallback(uint32_t from, String &msg) {
  // Identify main node from its announcement
  if (!mainNodeSet && msg.startsWith(MAINNODE)) {
    mainNode    = from;
    mainNodeSet = true;
    Serial.printf("Main node identified: %u\n", mainNode);
  }
}

void newConnectionCallback(uint32_t nodeId) {
  // Send my info to every new node (so mobile tags learn about me)
  mesh.sendSingle(nodeId, myInfo.toJSONString());
  Serial.printf("New connection: %u — sent my beacon\n", nodeId);
}

void changedConnectionCallback() {
  if (isFirstConnection) {
    isFirstConnection = false;
    // Broadcast info to all existing nodes
    String infoMsg = myInfo.toJSONString();
    std::list<uint32_t> nodes = mesh.getNodeList();
    for (uint32_t nid : nodes) {
      if (nid != mainNode) {
        mesh.sendSingle(nid, infoMsg);
      }
    }
  }
  Serial.println("Connections changed");
}

void nodeTimeAdjustedCallback(int32_t offset) {
  // Time sync — nothing to do
}

// ──────────── OLED Init (Heltec-specific) ────────
void initOLED() {
  pinMode(VEXT_PIN, OUTPUT);
  digitalWrite(VEXT_PIN, LOW);   // Power ON
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

// ══════════════════════════════════════════════════
//  SETUP
// ══════════════════════════════════════════════════
void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println(F("\n═══════════════════════════════════"));
  Serial.println(F(" ETMS — Anchor Node (Beacon)"));
  Serial.println(F("═══════════════════════════════════"));

  // Deselect LoRa chip — anchor doesn't use LoRa
  pinMode(LORA_CS, OUTPUT);
  digitalWrite(LORA_CS, HIGH);

  // ── Init OLED ──
  initOLED();
  display.drawString(0, 0,  "ETMS Anchor");
  display.drawString(0, 14, "Initializing...");
  display.display();

  // ── Store coordinates in flash ──
  preferences.begin("coords", false);
  preferences.putDouble("x", ANCHOR_X);
  preferences.putDouble("y", ANCHOR_Y);
  preferences.end();

  // ── Init painlessMesh ──
  mesh.setDebugMsgTypes(ERROR | STARTUP);
  mesh.init(MESH_PREFIX, MESH_PASSWORD, &userScheduler, MESH_PORT);
  mesh.onReceive(&receivedCallback);
  mesh.onNewConnection(&newConnectionCallback);
  mesh.onChangedConnections(&changedConnectionCallback);
  mesh.onNodeTimeAdjusted(&nodeTimeAdjustedCallback);

  // ── Build my node info ──
  preferences.begin("coords", true);
  myInfo.x = preferences.getDouble("x", 0.0);
  myInfo.y = preferences.getDouble("y", 0.0);
  preferences.end();
  myInfo.macAddress = WiFi.macAddress();
  myInfo.type       = TYPE;
  myInfo.nodeId     = mesh.getNodeId();

  Serial.println("Coords     : (" + String(myInfo.x) + ", " + String(myInfo.y) + ")");
  Serial.println("MAC        : " + myInfo.macAddress);
  Serial.println("Node ID    : " + String(myInfo.nodeId));
  Serial.println("Mesh SSID  : " + String(MESH_PREFIX));

  // ── Start beacon task ──
  userScheduler.addTask(taskSendBeacon);
  taskSendBeacon.enable();

  // ── Show ready screen ──
  display.clear();
  display.drawString(0, 0,  "ETMS Anchor");
  display.drawString(0, 12, "(" + String(ANCHOR_X, 1) + ", " + String(ANCHOR_Y, 1) + ")");
  display.drawString(0, 24, "MAC: " + myInfo.macAddress);
  display.drawString(0, 36, "Mesh: " + String(MESH_PREFIX));
  display.drawString(0, 48, "Waiting for main...");
  display.display();
}

// ══════════════════════════════════════════════════
//  LOOP
// ══════════════════════════════════════════════════
void loop() {
  mesh.update();
}
