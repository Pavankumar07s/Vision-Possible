#include "painlessMesh.h"
#include "SSD1306Wire.h" // install library "ESP8266 and ESP32 OLED driver for..." version should be 4.4.1
#include <Arduino_JSON.h>

#define   MESH_PREFIX     "myMesh"
#define   MESH_PASSWORD   "password"
#define   MESH_PORT       5555
#define   MAINNODE        "A"
#define   NODE            "A"

Scheduler userScheduler;
painlessMesh  mesh;

SSD1306Wire display(0x3c, 18, 17);

int count = 0;

void announceNodeId();

Task taskAnnounceNodeId( TASK_SECOND * 1, TASK_FOREVER, &announceNodeId );

void announceNodeId() {
  String msg = NODE;
  mesh.sendBroadcast(msg);
  // taskAnnounceNodeId.setInterval( random( TASK_SECOND * 1, TASK_SECOND * 5 ));
}

// Needed for painless library
void receivedCallback( uint32_t from, String &msg ) {
  // Parse message received
  JSONVar message = JSON.parse(msg);

  // Check if parsing succeeded
  if (JSON.typeof(message) == "undefined") {
    Serial.println("Not a JSON");
    return;
  }

  // Only process messages with type of LOCATION (ignore BEACON messages)
  if (strcmp((const char*)message["type"], "LOCATION") == 0) {
    Serial.println("Received new location information!\n");
    Serial.printf("Received from %u msg=%s\n", from, msg.c_str());

     // Display on M5 LCD
    if (count < 4) {

      display.clear();
      display.drawString(0, 0, msg.c_str());
      display.display();
      count+=1;

    }
    else {
      display.clear(); // This clears the entire display
      display.display(); // Update the display to reflect the clear operation
      count = 0;
    }
  } 
  else {
    Serial.println("Not a LOCATION message!\n");
  }
}

void newConnectionCallback(uint32_t nodeId) {
    Serial.printf("--> startHere: New Connection, nodeId = %u\n", nodeId);
}

void changedConnectionCallback() {
  Serial.printf("Changed connections\n");
}

void nodeTimeAdjustedCallback(int32_t offset) {
    Serial.printf("Adjusted time %u. Offset = %d\n", mesh.getNodeTime(),offset);
}

void setup() {
  Serial.begin(115200);
  delay(100);
  display.init();
  display.clear();
  display.setFont(ArialMT_Plain_10);
  display.flipScreenVertically();
  display.setTextAlignment(TEXT_ALIGN_LEFT);
  
  delay(3000);

//mesh.setDebugMsgTypes( ERROR | MESH_STATUS | CONNECTION | SYNC | COMMUNICATION | GENERAL | MSG_TYPES | REMOTE ); // all types on
  mesh.setDebugMsgTypes( ERROR | STARTUP );  // set before init() so that you can see startup messages

  mesh.init( MESH_PREFIX, MESH_PASSWORD, &userScheduler, MESH_PORT );
  mesh.onReceive(&receivedCallback);
  mesh.onNewConnection(&newConnectionCallback);
  mesh.onChangedConnections(&changedConnectionCallback);
  mesh.onNodeTimeAdjusted(&nodeTimeAdjustedCallback);

  Serial.println("Starting node");
  Serial.println(mesh.getNodeId());

  display.clear();
  display.drawString(0, 0,"STARTING MAIN NODE ");
  display.drawString(0, 10, NODE);
  display.display();

  userScheduler.addTask( taskAnnounceNodeId );
  taskAnnounceNodeId.enable();
}

void loop() {
  // it will run the user scheduler as well
  mesh.update();
}