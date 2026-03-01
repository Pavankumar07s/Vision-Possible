#include "painlessMesh.h"
#include "SSD1306Wire.h"
#include <Arduino_JSON.h>
#include <RadioLib.h>
#include <WiFi.h>
#include "boards.h"

/* painlessMesh */
#define   MESH_PREFIX     "myMesh"
#define   MESH_PASSWORD   "password"
#define   MESH_PORT       5555
#define   MAINNODE        "A"
#define   NODE            "A"

// Display
SSD1306Wire display(0x3c, 18, 17);

// painlessMesh
Scheduler userScheduler;
painlessMesh  mesh;

int count = 0;

// Function prototypes
void announceNodeId();
Task taskAnnounceNodeId( TASK_SECOND * 1, TASK_FOREVER, &announceNodeId );

// LoRa module
SX1280 radio = new Module(RADIO_CS_PIN, RADIO_DIO1_PIN, RADIO_RST_PIN, RADIO_BUSY_PIN);

// save transmission state between loops
int transmissionState = RADIOLIB_ERR_NONE;

// flag to indicate that a packet was sent
volatile bool transmittedFlag = true;

// disable interrupt when it's not needed
volatile bool enableTransmitInterrupt = true;

uint32_t counter = 0;

// painlessMesh function to announce to other nodes that it is the main node
void announceNodeId() {
  String msg = NODE;
  mesh.sendBroadcast(msg);
  // taskAnnounceNodeId.setInterval( random( TASK_SECOND * 1, TASK_SECOND * 5 ));
}

// painlessMesh callback function upon receive of a painlessMesh message
void pmReceiveCallback( uint32_t from, String &msg ) {

  // Convert JSONVar to a string
  // String lora_message = JSON.stringify(message);

  // Send painlessMesh message received to LoRa
  if (msg.indexOf("Hello") == -1 && msg.indexOf("BEACON") == -1){
    display.clear();
    display.drawString(0, 0, msg);
    display.display();
    transmissionState = radio.startTransmit(msg.c_str());
  }

  // we're ready to send more packets, enable interrupt service routine
  enableTransmitInterrupt = true;


  // Parse message received
  // JSONVar message = JSON.parse(msg);

  // // Check if parsing succeeded
  // if (JSON.typeof(message) == "undefined") {
  //   Serial.printf("Not a JSON message!\n");
  //   return;
  // }
  // else {
  //   // Only process messages with type of LOCATION (ignore BEACON messages)
  //   if (strcmp((const char*)message["type"], "LOCATION") == 0) {
  //     // printToDisplay(msg.c_str(), u8g2);
      
  //     // Set LoRa node address
  //     message["loraAddress"] = WiFi.macAddress().c_str();
  //     // Floor no (TEMPORARY)
  //     message["floor"] = (int)counter;

  //     /* Parse data */
  //     // MAC Address of painlessMesh node
  //     String macAddress = (const char*)message["macAddress"];
  //     // MAC Address of LoRa node
  //     String loraAddress = (const char*)message["loraAddress"];
  //     double x = (double)message["x"];
  //     double y = (double)message["y"];
  //     int floor = (int)message["floor"];

  //     // Clear display
  //     display.clear();

  //     // Print TX(X)
  //     display.drawString(0, 12, "TX(X): " + String(x));

  //     // Print Y
  //     display.drawString(0, 26, "Y: " + String(y));

  //     // Print Floor
  //     display.drawString(0, 40, "Floor: " + String(floor));

  //     // Print macAddress
  //     display.drawString(0, 54, "Mac Address: " + macAddress);

  //     // Print loraAddress
  //     display.drawString(0, 68, "LoRa Address: " + loraAddress);

  //     // Display message
  //     display.display();

  //     // Convert JSONVar to a string
  //     String lora_message = JSON.stringify(message);

  //     // Send painlessMesh message received to LoRa
  //     transmissionState = radio.startTransmit(lora_message.c_str());

  //     // we're ready to send more packets, enable interrupt service routine
  //     enableTransmitInterrupt = true;

  //     // if (transmissionState == RADIOLIB_ERR_NONE) {
  //     //   // packet was successfully sent
  //     //   u8g2->clearBuffer();
  //     //   u8g2->drawStr(0, 12, "Transmitting..");
  //     //   u8g2->drawStr(0, 30, ("TX: " + String(counter)).c_str());
  //     //   u8g2->sendBuffer();
  //     // } 
  //     // else {
  //     //   printToDisplay("transmission failed!", u8g2);
  //     // }
  //   } 
  //   else {
  //     Serial.printf("Not a LOCATION message!\n");
  //   }
  // }
}

// painlessMesh callback for new connections
void newConnectionCallback(uint32_t nodeId) {
  Serial.printf("--> startHere: New Connection, nodeId = %u\n", nodeId);
}

// painlessMesh callback for changed connections
void changedConnectionCallback() {
  Serial.printf("Changed connections\n");
}

// painlessMesh callback for adjusted time
void nodeTimeAdjustedCallback(int32_t offset) {
  Serial.printf("Adjusted time %u. Offset = %d\n", mesh.getNodeTime(),offset);
}

// Function to initialise LoRa
int initLora() {
  // initialize SX1280 with default settings
  printToDisplay("[SX1280] Initialising ...", u8g2);
  int state = radio.begin();
  if (state != RADIOLIB_ERR_NONE) {
    printToDisplay("Failed Initialisation!", u8g2);
  }
  else {
    printToDisplay("Radio initialised!", u8g2);
  }

  #if defined(RADIO_RX_PIN) && defined(RADIO_TX_PIN)
      //Set ANT Control pins
      radio.setRfSwitchPins(RADIO_RX_PIN, RADIO_TX_PIN);
  #endif

  // T3 S3 V1.2 (No PA) Version Set output power to 3 dBm (Cannot be greater than 3dbm)
  int8_t TX_Power = 13;
  if (radio.setOutputPower(TX_Power) == RADIOLIB_ERR_INVALID_OUTPUT_POWER) {
      Serial.println(F("Selected output power is invalid for this module!"));
      while (true);
  }

  // set carrier frequency to 2410.5 MHz
  if (radio.setFrequency(2400.0) == RADIOLIB_ERR_INVALID_FREQUENCY) {
      Serial.println(F("Selected frequency is invalid for this module!"));
      while (true);
  }

  // set bandwidth to 203.125 kHz
  if (radio.setBandwidth(203.125) == RADIOLIB_ERR_INVALID_BANDWIDTH) {
      Serial.println(F("Selected bandwidth is invalid for this module!"));
      while (true);
  }

  // set spreading factor to 10
  if (radio.setSpreadingFactor(10) == RADIOLIB_ERR_INVALID_SPREADING_FACTOR) {
      Serial.println(F("Selected spreading factor is invalid for this module!"));
      while (true);
  }

  // set coding rate to 6
  if (radio.setCodingRate(6) == RADIOLIB_ERR_INVALID_CODING_RATE) {
      Serial.println(F("Selected coding rate is invalid for this module!"));
      while (true);
  }
  return state;
}

// Callback function once a complete packet is transmitted (this function MUST be 'void' type and MUST NOT have any arguments!)
void loraTransmitCallback(void) {
  // check if the interrupt is enabled
  if (!enableTransmitInterrupt) {
    return;
  }
  else {
    counter++;
    // we sent a packet, set the flag
    transmittedFlag = true;
  }
}

// Program entrypoint
void setup() {
  // Initialise board
  initBoard();
  
  // When the power is turned on, a delay is required.
  delay(1500);

  // Initialise display
  Serial.begin(115200);
  delay(100);
  display.init();
  display.clear();
  display.setFont(ArialMT_Plain_10);
  display.flipScreenVertically();
  display.setTextAlignment(TEXT_ALIGN_LEFT);
  delay(3000);

  // Initialise LoRa
  int state = initLora();

  // Set LoRa callback function when packet transmission is finished
  radio.setDio1Action(loraTransmitCallback);

  // painlessMesh setup
  //mesh.setDebugMsgTypes( ERROR | MESH_STATUS | CONNECTION | SYNC | COMMUNICATION | GENERAL | MSG_TYPES | REMOTE ); // all types on
  mesh.setDebugMsgTypes( ERROR | STARTUP );  // set before init() so that you can see startup messages
  mesh.init( MESH_PREFIX, MESH_PASSWORD, &userScheduler, MESH_PORT );
  mesh.onReceive(&pmReceiveCallback);
  mesh.onNewConnection(&newConnectionCallback);
  mesh.onChangedConnections(&changedConnectionCallback);
  mesh.onNodeTimeAdjusted(&nodeTimeAdjustedCallback);

  userScheduler.addTask( taskAnnounceNodeId );
  taskAnnounceNodeId.enable();

  // DEBUGGING
  Serial.println("Starting node");
  Serial.println(mesh.getNodeId());

  // Display
  display.clear();
  display.drawString(0, 0,"STARTING MAIN NODE ");
  display.drawString(0, 10, NODE);
  display.display();
}

void loop() {
  // Keep painlessMesh alive
  mesh.update();
}