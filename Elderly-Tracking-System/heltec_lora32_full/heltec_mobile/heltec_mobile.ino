/*
 * ════════════════════════════════════════════════════════════════
 *  ETMS — MOBILE TAG (Elderly Wearable)
 *  Hardware:  Heltec WiFi LoRa 32 (433 MHz)
 *  Role:      Carried by elderly — triangulation + panic button
 *  Qty:       1 per elderly person being tracked
 * ════════════════════════════════════════════════════════════════
 *
 *  WHAT THIS DOES:
 *    1. Joins the same painlessMesh as anchors & bridge
 *    2. Receives BEACON messages from anchors → learns their (x,y)
 *    3. Every 10 sec, scans WiFi RSSI from anchor softAPs
 *    4. Picks 3 strongest → converts RSSI to distance
 *    5. Runs trilateration → estimates this device's (x,y)
 *    6. XOR-encrypts the location and sends to bridge (main node)
 *    7. PRG button = PANIC — sends emergency alert immediately
 *
 *  NO CONFIGURATION NEEDED — just flash and go.
 *  (Mesh config must match the anchor & bridge nodes)
 *
 *  LIBRARIES NEEDED:
 *    • painlessMesh     (+ ArduinoJson, TaskScheduler, AsyncTCP)
 *    • ArduinoJson      (by Benoît Blanchon)
 *    • ESP8266 and ESP32 OLED driver for SSD1306 (by ThingPulse)
 *
 *  BOARD: Tools → Board → "WiFi LoRa 32(V2)"
 *
 * ════════════════════════════════════════════════════════════════
 */

#include "painlessMesh.h"
#include "SSD1306Wire.h"
#include <ArduinoJson.h>
#include <WiFi.h>
#include <vector>
#include <cmath>
#include <algorithm>
#include "Triangle.h"
#include "boards.h"

// ╔════════════════════════════════════════════════════════════╗
// ║  MESH CONFIG — MUST match anchors & bridge on this floor  ║
// ╚════════════════════════════════════════════════════════════╝
#define MESH_PREFIX   "etms-floor-1"
#define MESH_PASSWORD "etms_password"
#define MESH_PORT     5555
#define MAINNODE      "A"

// ── RSSI-to-Distance calibration ──
// distance = 10 ^ ((A - RSSI) / (10 * n))
//   A = RSSI measured at exactly 1 meter (calibrate on-site!)
//   n = path-loss exponent (2.0=open, 2.7=indoor, 4.0=heavy walls)
#define RSSI_AT_1M    -40.0
#define PATH_LOSS_N   2.7

// ──────────── Hardware Objects ────────────
SSD1306Wire display(OLED_ADDR, OLED_SDA, OLED_SCL);
Scheduler   userScheduler;
painlessMesh mesh;

// ──────────── State ──────────────────────
bool     mainNodeSet  = false;
uint32_t mainNode     = 0;
uint32_t locationsEstimated = 0;

volatile bool          panicPressed      = false;
volatile unsigned long lastPanicDebounce = 0;

// ──────────── Anchor registry ────────────
struct NodeInfo {
  double   x;
  double   y;
  String   macAddress;
  uint32_t nodeId;
};
std::vector<NodeInfo> nodeList;

// ──────────── Forward declarations ───────
void estimateLocation();
Task taskEstimateLocation(TASK_SECOND * 10, TASK_FOREVER, &estimateLocation);

// ──────────── ISR: Panic Button ──────────
void IRAM_ATTR onPanicButton() {
  if ((millis() - lastPanicDebounce) > 500) {
    panicPressed      = true;
    lastPanicDebounce = millis();
  }
}

// ──────────── XOR Encrypt ────────────────
String xor_encrypt(const String &msg, uint8_t key) {
  String out;
  out.reserve(msg.length());
  for (unsigned int i = 0; i < msg.length(); i++) {
    out += (char)(msg[i] ^ key);
  }
  return out;
}

// ──────────── Find anchor by MAC ─────────
int findNodeByMAC(const String &mac) {
  for (size_t i = 0; i < nodeList.size(); i++) {
    if (nodeList[i].macAddress == mac) return (int)i;
  }
  return -1;
}

// ──────────── BSSID → STA MAC (ESP32 softAP is STA+1) ──
String bssidToStaMac(const String &bssid) {
  // ESP32 softAP BSSID = station MAC with last byte +1
  // To find station MAC: last byte -1
  String prefix   = bssid.substring(0, 15);   // "AA:BB:CC:DD:EE:"
  String lastByte = bssid.substring(15, 17);   // "FF"
  int hexVal = strtol(lastByte.c_str(), nullptr, 16);
  if (hexVal > 0) hexVal -= 1;
  char hexStr[3];
  sprintf(hexStr, "%02X", hexVal & 0xFF);
  return prefix + String(hexStr);
}

// ══════════════════════════════════════════════════
//  LOCATION ESTIMATION (runs every 10 seconds)
// ══════════════════════════════════════════════════
void estimateLocation() {
  if (!mainNodeSet) return;

  display.clear();
  display.drawString(0, 0,  "ETMS Tag");
  display.drawString(0, 14, "Scanning WiFi...");
  display.display();

  // Need at least 3 known anchors
  if (nodeList.size() < 3) {
    Serial.println("Need 3+ anchors. Have: " + String(nodeList.size()));
    display.drawString(0, 28, "Anchors: " + String(nodeList.size()) + "/3 needed");
    display.display();
    return;
  }

  // ── Step 1: Scan WiFi for mesh SSIDs ──
  std::vector<std::pair<String, int>> rssiVector;
  int n = WiFi.scanNetworks();
  if (n == 0) {
    display.drawString(0, 28, "No WiFi networks found!");
    display.display();
    return;
  }

  for (int i = 0; i < n; i++) {
    if (WiFi.SSID(i) == MESH_PREFIX) {
      rssiVector.push_back(std::make_pair(WiFi.BSSIDstr(i), WiFi.RSSI(i)));
    }
  }
  WiFi.scanDelete();

  Serial.println("Found " + String(rssiVector.size()) + " mesh APs");

  if (rssiVector.size() < 3) {
    display.drawString(0, 28, "Mesh APs: " + String(rssiVector.size()) + "/3");
    display.display();
    return;
  }

  // ── Step 2: Sort by RSSI (strongest first) ──
  std::sort(rssiVector.begin(), rssiVector.end(),
    [](const std::pair<String, int> &a, const std::pair<String, int> &b) {
      return a.second > b.second;
    });

  // ── Step 3: Match top 3 BSSIDs to known anchors ──
  double distances[3];
  std::pair<String, int> top3[3];
  int matched = 0;

  for (auto &pair : rssiVector) {
    if (matched >= 3) break;
    String staMac = bssidToStaMac(pair.first);

    for (auto &node : nodeList) {
      if (node.macAddress == staMac) {
        top3[matched]      = pair;
        matched++;
        break;
      }
    }
  }

  if (matched < 3) {
    Serial.println("Only matched " + String(matched) + " anchors");
    display.drawString(0, 28, "Matched: " + String(matched) + "/3");
    display.display();
    return;
  }

  // ── Step 4: RSSI → Distance for each ──
  std::vector<Point> coords;
  for (int i = 0; i < 3; i++) {
    double rssi = (double)top3[i].second;
    distances[i] = pow(10.0, (RSSI_AT_1M - rssi) / (10.0 * PATH_LOSS_N));

    String staMac = bssidToStaMac(top3[i].first);
    for (auto &node : nodeList) {
      if (node.macAddress == staMac) {
        coords.push_back(Point(node.x, node.y));
        Serial.printf("Anchor %d: (%0.1f,%0.1f) RSSI=%d dist=%.2fm\n",
          i, node.x, node.y, top3[i].second, distances[i]);
        break;
      }
    }
  }

  if (coords.size() < 3) return;

  // ── Step 5: Trilateration ──
  Triangle triangle(coords[0], coords[1], coords[2]);
  Point estimated = triangle.getTriangulation(distances[0], distances[1], distances[2]);

  double x = estimated.getX();
  double y = estimated.getY();
  locationsEstimated++;

  Serial.printf(">>> LOCATION: (%.2f, %.2f)\n", x, y);

  // ── Step 6: Show on OLED ──
  display.clear();
  display.drawString(0, 0,  "ETMS Tag — Located!");
  display.drawString(0, 14, "X: " + String(x, 2) + "  Y: " + String(y, 2));
  display.drawString(0, 28, "Fix #" + String(locationsEstimated));
  display.drawString(0, 42, "Anchors: " + String(nodeList.size()));
  display.drawString(0, 54, "[PRG] = PANIC");
  display.display();

  // ── Step 7: Build JSON, encrypt, send to main node ──
  StaticJsonDocument<256> doc;
  doc["x"]      = x;
  doc["y"]      = y;
  doc["type"]   = "LOCATION";
  doc["nodeID"] = (int)mesh.getNodeId();

  String jsonStr;
  serializeJson(doc, jsonStr);

  String encrypted = xor_encrypt(jsonStr, XOR_KEY);
  mesh.sendSingle(mainNode, encrypted);

  Serial.println("Sent encrypted location to main node");
}

// ══════════════════════════════════════════════════
//  painlessMesh Callbacks
// ══════════════════════════════════════════════════
void receivedCallback(uint32_t from, String &msg) {
  // ── Identify main node ──
  if (!mainNodeSet && msg.startsWith(MAINNODE)) {
    mainNode    = from;
    mainNodeSet = true;
    Serial.printf("Main node identified: %u\n", mainNode);
    display.clear();
    display.drawString(0, 0,  "ETMS Tag");
    display.drawString(0, 14, "Main node found!");
    display.drawString(0, 28, "ID: " + String(mainNode));
    display.drawString(0, 42, "Anchors: " + String(nodeList.size()));
    display.drawString(0, 54, "[PRG] = PANIC");
    display.display();
    return;
  }

  if (msg.startsWith(MAINNODE)) return;  // ignore repeated announcements

  // ── Parse BEACON messages from anchors ──
  StaticJsonDocument<256> doc;
  DeserializationError err = deserializeJson(doc, msg);
  if (err) return;  // not valid JSON → ignore

  const char* type = doc["type"];
  if (type && strcmp(type, "BEACON") == 0) {
    String mac = doc["macAddress"] | String("");
    int idx = findNodeByMAC(mac);

    if (idx >= 0) {
      // Update existing anchor
      nodeList[idx].x      = doc["x"] | 0.0;
      nodeList[idx].y      = doc["y"] | 0.0;
      nodeList[idx].nodeId = doc["nodeID"] | 0;
    } else {
      // New anchor discovered
      NodeInfo newNode;
      newNode.x          = doc["x"] | 0.0;
      newNode.y          = doc["y"] | 0.0;
      newNode.macAddress = mac;
      newNode.nodeId     = doc["nodeID"] | 0;
      nodeList.push_back(newNode);
      Serial.println("New anchor: " + mac + " (" + String(newNode.x) + "," + String(newNode.y) + ")");
    }
  }
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

// ══════════════════════════════════════════════════
//  SETUP
// ══════════════════════════════════════════════════
void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println(F("\n═══════════════════════════════════"));
  Serial.println(F(" ETMS — Mobile Tag (Elderly)"));
  Serial.println(F("═══════════════════════════════════"));

  // Deselect LoRa chip — mobile tag doesn't use LoRa
  pinMode(LORA_CS, OUTPUT);
  digitalWrite(LORA_CS, HIGH);

  // Panic button
  pinMode(PRG_BUTTON, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(PRG_BUTTON), onPanicButton, FALLING);

  // LED
  pinMode(BOARD_LED, OUTPUT);
  digitalWrite(BOARD_LED, LOW);

  // ── Init OLED ──
  initOLED();
  display.drawString(0, 0,  "ETMS Mobile Tag");
  display.drawString(0, 14, "Initializing mesh...");
  display.display();

  // ── Init painlessMesh ──
  mesh.setDebugMsgTypes(ERROR | STARTUP);
  mesh.init(MESH_PREFIX, MESH_PASSWORD, &userScheduler, MESH_PORT);
  mesh.onReceive(&receivedCallback);
  mesh.onNewConnection(&newConnectionCallback);
  mesh.onChangedConnections(&changedConnectionCallback);
  mesh.onNodeTimeAdjusted(&nodeTimeAdjustedCallback);

  Serial.println("Node ID    : " + String(mesh.getNodeId()));
  Serial.println("MAC        : " + WiFi.macAddress());
  Serial.println("Mesh SSID  : " + String(MESH_PREFIX));

  // ── Start location task ──
  userScheduler.addTask(taskEstimateLocation);
  taskEstimateLocation.enable();

  // ── Ready screen ──
  display.clear();
  display.drawString(0, 0,  "ETMS Tag");
  display.drawString(0, 14, "ID: " + String(mesh.getNodeId()));
  display.drawString(0, 28, "Mesh: " + String(MESH_PREFIX));
  display.drawString(0, 42, "[PRG button] = PANIC");
  display.drawString(0, 54, "Waiting for anchors...");
  display.display();

  Serial.println("Ready — waiting for anchors & main node...\n");
}

// ══════════════════════════════════════════════════
//  LOOP
// ══════════════════════════════════════════════════
void loop() {
  mesh.update();

  // ── Handle Panic Button ──
  if (panicPressed && mainNodeSet) {
    panicPressed = false;

    StaticJsonDocument<256> doc;
    doc["macAddress"] = WiFi.macAddress();
    doc["nodeID"]     = (int)mesh.getNodeId();
    doc["type"]       = "PANIC";
    doc["x"]          = 999.0;
    doc["y"]          = 999.0;

    String jsonStr;
    serializeJson(doc, jsonStr);

    String encrypted = xor_encrypt(jsonStr, XOR_KEY);
    mesh.sendSingle(mainNode, encrypted);

    Serial.println("!!! PANIC SENT !!!");

    display.clear();
    display.drawString(0, 0,  "ETMS Tag");
    display.drawString(0, 20, ">>> PANIC SENT! <<<");
    display.drawString(0, 40, "Help is on the way!");
    display.display();
    digitalWrite(BOARD_LED, HIGH);
    delay(2000);
    digitalWrite(BOARD_LED, LOW);
  }
}
