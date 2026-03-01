#include "painlessMesh.h"
#include <M5StickCPlus.h>
#include <Arduino_JSON.h>

#define   MESH_PREFIX     "etms-floor-6"
#define   MESH_PASSWORD   "t02_iotPassword"
#define   MESH_PORT       5555
#define   MAINNODE        "A"
#define   NODE            "A"

Scheduler userScheduler;
painlessMesh  mesh;

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
      M5.Lcd.printf(msg.c_str(), 0);
      M5.Lcd.printf("\n", 0);
      count+=1;

    }
    else {
      clearDisplay();
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
  M5.begin();
  int x = M5.IMU.Init();
  if(x!=0)
    Serial.printf("IMU initialisation fail!");  

  M5.Lcd.setTextSize(1);
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

  M5.Lcd.setRotation(3);
  M5.Lcd.fillScreen(BLACK);
  M5.Lcd.setCursor(0, 0, 2);
  M5.Lcd.printf("STARTING MAIN NODE\n");

  userScheduler.addTask( taskAnnounceNodeId );
  taskAnnounceNodeId.enable();
}

void loop() {
  // it will run the user scheduler as well
  mesh.update();
}

void clearDisplay() {

  M5.Lcd.fillRect(0, 20, M5.Lcd.width(), M5.Lcd.height() - 20, BLACK);
  M5.Lcd.setCursor(0, 20, 2);

}