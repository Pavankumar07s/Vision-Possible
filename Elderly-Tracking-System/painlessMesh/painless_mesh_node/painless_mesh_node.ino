/*
    Current implementation here does not involve sending JSON message
*/

#include "painlessMesh.h"
#include <M5StickCPlus.h>
#include <Arduino_JSON.h>
#include <Preferences.h>
#include <HTTPClient.h>

#define MESH_PREFIX   "etms-floor-6"
#define MESH_PASSWORD "t02_iotPassword"
#define MESH_PORT     5555
#define MAINNODE      "A"
#define TYPE          "BEACON"

Scheduler userScheduler;
Preferences preferences;
painlessMesh mesh;

bool mainNodeSet = false;
bool isFirstConnection = true;
uint32_t mainNode;
String readings;

void sendMessage();

Task taskSendMessage(TASK_SECOND * 8, TASK_FOREVER, &sendMessage);

struct NodeInfo {
  double x;
  double y;
  String macAddress;
  String type;
  uint32_t nodeId;

  String toJSONString() {
    StaticJsonDocument<200> node;
    node["x"] = x;
    node["y"] = y;
    node["macAddress"] = macAddress.c_str();
    node["type"] = type.c_str();
    node["nodeID"] = (int)nodeId;

    // String output = JSON.stringify(node);
    String output;
    serializeJson(node, output);
    return output;
  }
};

NodeInfo myInfo;

void sendMessage() {
  String infoMsg = myInfo.toJSONString();
  std::list<uint32_t> nodes = mesh.getNodeList();

  for(uint32_t nodeId : nodes) {
    Serial.println(nodeId);

    if(nodeId != mainNode) {
      mesh.sendSingle(nodeId, infoMsg);
    }
  }
}

// Receveied message callback
void receivedCallback(uint32_t from, String &msg) {

  Serial.printf("startHere: Received from %u msg=%s\n", from, msg.c_str());

  if (!mainNodeSet) {
    if (msg.startsWith(MAINNODE)) {
      mainNode = from;
      Serial.printf("Main node identified: %u\n", mainNode);
      M5.Lcd.setCursor(20, 85, 2);
      M5.Lcd.printf("Main node identified");
      M5.Lcd.setCursor(20, 105, 2);
      M5.Lcd.printf("(%u)", mainNode);
      mainNodeSet = true;
    }
  }
}

void newConnectionCallback(uint32_t nodeId) {
  // Send own data to new node
  mesh.sendSingle(nodeId, myInfo.toJSONString());

  Serial.printf("--> startHere: New Connection, nodeId = %u\n", nodeId);
}

void changedConnectionCallback() {
  if (isFirstConnection) {
    // Initial connection
    isFirstConnection = false;

    // Broadcast my info
    String infoMsg = myInfo.toJSONString();
    std::list<uint32_t> nodes = mesh.getNodeList();

    for(uint32_t nodeId : nodes) {
      Serial.println(nodeId);

      if(nodeId != mainNode) {
        mesh.sendSingle(nodeId, infoMsg);
      }
    }
  }
  Serial.printf("Changed connections\n");
}

void nodeTimeAdjustedCallback(int32_t offset) {
  Serial.printf("Adjusted time %u. Offset = %d\n", mesh.getNodeTime(), offset);
}

void storeCoordinates(double x, double y) {
  preferences.begin("coords", false);
  preferences.putDouble("x", x);
  preferences.putDouble("y", y);
  preferences.end();
}

void initMesh() {
  mesh.setDebugMsgTypes(ERROR | STARTUP);  // set before init() so that you can see startup messages

  mesh.init(MESH_PREFIX, MESH_PASSWORD, &userScheduler, MESH_PORT);
  mesh.onReceive(&receivedCallback);
  mesh.onNewConnection(&newConnectionCallback);
  mesh.onChangedConnections(&changedConnectionCallback);
  mesh.onNodeTimeAdjusted(&nodeTimeAdjustedCallback);

  Serial.println("Starting node ");
  Serial.println(mesh.getNodeId());
}

void initNodeObject() {
  preferences.begin("coords", true);

  // Load data from preferences into myInfo
  myInfo.x = preferences.getDouble("x", 0.0);
  myInfo.y = preferences.getDouble("y", 0.0);
  preferences.end();  // Close the preferences

  myInfo.macAddress = WiFi.macAddress();
  myInfo.type = TYPE;
  myInfo.nodeId = mesh.getNodeId();

  // Use the data for whatever you need, for example, print the JSON string
  Serial.println(myInfo.toJSONString());
}

void setup() {
  Serial.begin(115200);
  M5.begin();
  int x = M5.IMU.Init();

  // Anchor coordinates
  double x_coords = 26.0;
  double y_coords = 1.0;

  storeCoordinates(x_coords, y_coords);

  if (x != 0)
    Serial.printf("IMU initialisation fail!");

  M5.Lcd.setTextSize(2);
  M5.Lcd.setRotation(3);
  M5.Lcd.fillScreen(BLACK);
  M5.Lcd.setCursor(20, 10, 2);
  M5.Lcd.printf("ETMS Anchor");

  initMesh();
  delay(1500);
  initNodeObject();
  M5.Lcd.drawLine(20, 50, 220, 50, TFT_WHITE); 
  M5.Lcd.setCursor(20, 65, 2);
  M5.Lcd.setTextSize(1);
  M5.Lcd.printf("Coordinates set (%.2f, %.2f)", x_coords, y_coords);
  delay(1500);
  userScheduler.addTask(taskSendMessage);
  taskSendMessage.enable();
}

void loop() {
  // It will run the user scheduler as well
  mesh.update();
}