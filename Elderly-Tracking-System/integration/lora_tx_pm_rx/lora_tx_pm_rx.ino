#include "painlessMesh.h"
#include "SSD1306Wire.h"
#include <Arduino_JSON.h>
#include <RadioLib.h>
#include <WiFi.h>
#include "boards.h"
#include <cmath> 

// Code for: LoRa Transmitter + painlessMesh Receiver (MAIN NODE)

/* painlessMesh Configurations */
#define MESH_PREFIX       "etms-floor-6"
#define MESH_PASSWORD     "t02_iotPassword"
#define MESH_PORT         5555
#define   MAINNODE        "A"
#define   NODE            "A"

/* LoRa Configurations */
#define   FLOOR_NO        "6"
// #define   LORA_CF         "carrierfreq"
// #define   LORA_BW         "bandwidth"
// #define   LORA_SF         "spreadingfactor"
// #define   LORA_CR         "codingrate"
// #define   LORA_SW         "syncword"
/* 
Default:
int16_t SX128x::begin	(	float 	freq = 2400.0,
  float 	bw = 812.5,
  uint8_t 	sf = 9,
  uint8_t 	cr = 7,
  uint8_t 	syncWord = RADIOLIB_SX128X_SYNC_WORD_PRIVATE,
  int8_t 	pwr = 10,
  uint16_t 	preambleLength = 12 
)		
*/

// Display
SSD1306Wire display(0x3c, 18, 17);

// painlessMesh
Scheduler userScheduler;
painlessMesh  mesh;

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

// painlessMesh function to announce to other nodes that it is the main node
void announceNodeId() {
  String msg = NODE;
  mesh.sendBroadcast(msg);
  // taskAnnounceNodeId.setInterval( random( TASK_SECOND * 1, TASK_SECOND * 5 ));
  msg.clear();
}

// painlessMesh callback function upon receive of a painlessMesh message
void pmReceiveCallback( uint32_t from, String &msg ) {
  enableTransmitInterrupt = false;

  // reset flag
  transmittedFlag = false;

  // start transmitting the packet
  int transmissionState = radio.startTransmit(msg);

  // Display transmitted lora message
  if (transmissionState == RADIOLIB_ERR_NONE) {
    display.clear();
    display.drawString(0, 0, "Transmitted LoRa Message!");
    display.setTextAlignment(TEXT_ALIGN_LEFT);
    display.drawStringMaxWidth(0, 10, 128, msg);
    display.display();
  } 
  else {
    display.clear();
    display.drawString(0, 0, "Received PM Message!");
    display.drawString(0, 10,"LoRa failed transmit!");
    display.display();
  }
  msg.clear();

  // // Hardcoded LoRa transmission for testing (COMMENT OUT FOR TESTING ONLY)
  // StaticJsonDocument<200> data;
  // data["x"] = 10.000;
  // data["y"] = 12.00;
  // data["macAddress"] = WiFi.macAddress().c_str();
  // data["floor"] = FLOOR_NO;
  // data["elderly"] = "ABANGBONGBA";
  // data["geofenced_area"] = "Flat A";
  // data["type"] = "LOCATION";
  
  // // Serialize JSON object to string
  // String message;
  // serializeJson(data, message);

  // Check if parsing succeeded (Checks for previously unencrypted messages)
  // if (JSON.typeof(JSON.parse(msg)) == "undefined") {
  //   display.clear();
  //   display.drawString(0, 0, "Received PM Message!");
  //   display.drawString(0, 10, "Not a JSON message..");
  //   display.display();
  //   msg.clear();
  // }
  // else {
  //   // Parse message received
  //   // JSONVar pmMessage = JSON.parse(msg);
  //   // Convert String to char*
  //   char messageBuffer[msg.length() + 1];
  //   msg.toCharArray(messageBuffer, msg.length() + 1);
  //   StaticJsonDocument<200> pmMessage;
  //   deserializeJson(pmMessage, messageBuffer);
    
  //   // Release from memory
  //   msg.clear();

  //   // Only process messages with type of LOCATION (ignore BEACON messages)
  //   if (strcmp(pmMessage["type"], "LOCATION") == 0) {
  //     /* Parse data */
  //     pmMessage["floor"] = FLOOR_NO;
  //     double x = (double)pmMessage["x"];
  //     double y = (double)pmMessage["y"];

  //     // Check validity of message before transmitting
  //     if(!std::isnan(x) && !std::isinf(x) && !std::isnan(y) && !std::isinf(y)) {
  //       // Convert JSONVar to a string
  //       // String loraMessage = JSON.stringify(pmMessage);
  //       String loraMessage;
  //       serializeJson(pmMessage, loraMessage);

  //       // Send painlessMesh message received to LoRa
  //       transmissionState = radio.startTransmit(loraMessage);
        
  //       // Display transmitted lora message
  //       if (transmissionState == RADIOLIB_ERR_NONE) {
  //         display.clear();
  //         display.drawString(0, 0, "Transmitted LoRa Message!");
  //         display.setTextAlignment(TEXT_ALIGN_LEFT);
  //         display.drawStringMaxWidth(0, 10, 128, loraMessage);
  //         display.display();
  //         // Display message
  //         display.display();
  //       } 
  //       else {
  //         display.clear();
  //         display.drawString(0, 0, "Received PM Message!");
  //         display.drawString(0, 10,"LoRa failed transmit!");
  //         display.display();
  //       }
  //       loraMessage.clear();
  //     }
  //     else {
  //       display.clear();
  //       display.drawString(0, 0, "Received PM Message!");
  //       display.drawString(0, 10,"PM: Invalid data received!");
  //       display.display();
  //     }
  //   } 
  //   else {
  //     display.clear();
  //     display.drawString(0, 0, "Received PM Message!");
  //     display.drawString(0, 10,"PM: Not a LOCATION");
  //     display.drawString(0, 20,"message!");
  //     display.display();
  //   }
  // }

  // we're ready to send more packets, enable interrupt service routine
  enableTransmitInterrupt = true;
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

// Callback function once a complete packet is transmitted (this function MUST be 'void' type and MUST NOT have any arguments!)
void loraTransmitCallback(void) {
  // check if the interrupt is enabled
  if (!enableTransmitInterrupt) {
    return;
  }
  else {
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

  // Serial Monitor
  Serial.begin(115200);
  delay(100);

  // Initialise display
  display.init();
  display.clear();
  display.setFont(ArialMT_Plain_10);
  display.flipScreenVertically();
  display.setTextAlignment(TEXT_ALIGN_LEFT);
  delay(3000);

  // Initialise LoRa
  int state = radio.begin();
  if (state != RADIOLIB_ERR_NONE) {
    display.clear();
    display.drawString(0, 0,"Failed LoRa!");
    display.drawString(0, 10,"initialisation!");
    display.display();
  }
  else {
    display.clear();
    display.drawString(0, 0,"Successful LoRa!");
    display.drawString(0, 10,"initialisation!");
    display.display();
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
  display.drawString(0, 0, "LoRa (Transmitter)");
  display.drawString(0, 10, "painlessMesh (Receiver)");
  String msg = NODE;
  String sFloor = FLOOR_NO;
  display.drawString(0, 20, "MAIN NODE " + msg);
  display.drawString(0, 30, "Floor: " + sFloor);
  display.display();
  msg.clear();
  sFloor.clear();

  transmissionState = radio.startTransmit("Hello Word!");

}

void loop() {
  // Keep painlessMesh alive
  mesh.update();
}