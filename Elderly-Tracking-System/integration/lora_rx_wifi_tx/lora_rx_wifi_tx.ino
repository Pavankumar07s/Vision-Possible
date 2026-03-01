#include "painlessMesh.h"
#include "SSD1306Wire.h"
#include <Arduino_JSON.h>
#include <RadioLib.h>
#include <WiFi.h>
#include "boards.h"
#include <cmath> 
#include <SPI.h>
#include <WiFi.h>
#include <HTTPClient.h>

// Code for: LoRa Receiver + WiFi Transmitter

/* WiFi Configurations */
#define   SSID            "peteophelia"
#define   PASSWORD        "aakf6248"
#define   SERVER_ENDPOINT "http://34.126.129.174:80/lilygo-data"

/* LoRa Configurations */
#define   FLOOR_NO        "7"
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

// LoRa module
SX1280 radio = new Module(RADIO_CS_PIN, RADIO_DIO1_PIN, RADIO_RST_PIN, RADIO_BUSY_PIN);

// flag to indicate that a packet was received
volatile bool receivedFlag = false;

// disable interrupt when it's not needed
volatile bool enableReceiveInterrupt = true;

// Callback function once a complete packet is received (this function MUST be 'void' type and MUST NOT have any arguments!)
void loraReceiveCallback(void) {
  // check if the interrupt is enabled
  if(!enableReceiveInterrupt) {
      return;
  }
  else {
    // we got a packet, set the flag
    receivedFlag = true;
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

  // Set LoRa callback function when a packet is received
  radio.setDio1Action(loraReceiveCallback);

  // Connect to WiFi
  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    display.clear();
    display.drawString(0, 0, "Connecting to Wifi..");
    display.display();
  }

  // Display
  display.clear();
  display.drawString(0, 0, "LoRa (Receiver)");
  display.drawString(0, 10, "WiFi (Transmitter)");
  String sFloor = String(FLOOR_NO);
  display.drawString(0, 20, "Floor: " + sFloor);
  display.drawString(0, 30, "IP: " +  WiFi.localIP().toString());
  display.display();
  sFloor.clear();

  // start listening for LoRa packets
  state = radio.startReceive();
  if (state == RADIOLIB_ERR_NONE) {
      Serial.println(F("success!"));
      // Display
      display.clear();
      display.drawString(0, 0, "Receive success!");
      display.display();
  } else {
      Serial.print(F("failed, code "));
      Serial.println(state);
      while (true);
  }
}

void loop()
{   
  // check if the flag is set
  if(receivedFlag) {
    // disable the interrupt service routine while processing the data
    enableReceiveInterrupt = false;

    // reset flag
    receivedFlag = false;

    // Initialise string to store received messsage
    String messageReceived;

    // Parse received message
    int state = radio.readData(messageReceived);
    
    // Decrypt message
    messageReceived = xor_decrypt(messageReceived, xorKey); 

    // Parse message received
    // JSONVar loraMessage = JSON.parse(messageReceived);
    // Convert String to char*
    char messageBuffer[messageReceived.length() + 1];
    messageReceived.toCharArray(messageBuffer, messageReceived.length() + 1);

    // Deserialize JSON from char* buffer
    StaticJsonDocument<200> loraMessage;
    deserializeJson(loraMessage, messageBuffer);

    // Display message received
    display.clear();
    display.drawString(0, 0, "Received LoRa Message!");
    display.setTextAlignment(TEXT_ALIGN_LEFT);
    display.drawStringMaxWidth(0, 10, 128, messageReceived);
    display.display();

    // Parse message received
    // int floor = String((const char*)loraMessage["floor"]).toInt();
    double x = (double)loraMessage["x"];
    double y = (double)loraMessage["y"];
      
    // Check validity of message before transmitting to WiFi
    if(!std::isnan(x) && !std::isinf(x) && !std::isnan(y) && !std::isinf(y)) {
      display.clear();
      display.drawString(0, 0, "Preparing LoRa Message!");
      display.setTextAlignment(TEXT_ALIGN_LEFT);
      display.drawStringMaxWidth(0, 10, 128, messageReceived);
      display.display();

      // Prepare for WiFi transmission
      HTTPClient http;

      //set endpoint and content type
      http.begin(SERVER_ENDPOINT);
      http.addHeader("Content-Type", "application/json");

      // Serialize JSON object to string
      String jsonString;
      serializeJson(loraMessage, jsonString);

      // Create JSON data and POST
      int httpCode = http.POST(jsonString);
      
      // check if there is error doing POST request from device
      if (httpCode>0) {
        // Response from server after successful POST
        String payload = http.getString();
        display.clear();
        display.drawString(0, 0,"sending POST request");
        display.drawString(0, 10, payload);
        display.display();
        payload.clear();
      }
      else {
        display.clear();
        display.drawString(0, 0,"Error when sending");
        display.display();
      }

      http.end();
      jsonString.clear();
    }       
    else {
      display.clear();
      display.drawString(0, 0, "Received Lora Message!");
      display.drawString(0, 10,"Invalid data or received!");
      display.display();
    }

    // Release string
    messageReceived.clear();

    // we're ready to receive more packets, enable interrupt service routine
    enableReceiveInterrupt = true;
    
    // put module back to listen mode
    radio.startReceive(); 
  } 
}