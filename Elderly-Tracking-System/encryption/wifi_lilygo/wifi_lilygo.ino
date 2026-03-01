#include <SPI.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include "SSD1306Wire.h" // install library "ESP8266 and ESP32 OLED driver for..." version should be 4.4.1
#include <ArduinoJson.h> // install library "ArduinoJson" by Benoit 
#include <Arduino_JSON.h>
#include <RadioLib.h>
#include "boards.h"

SX1280 radio = new Module(RADIO_CS_PIN, RADIO_DIO1_PIN, RADIO_RST_PIN, RADIO_BUSY_PIN);

// Configure the name and password of the connected wifi, and Server host !!!!!!!!!!!!!!!!!!!!!!
const char* ssid        = "peteophelia"; // your hotspot name
const char* password    = "aakf6248"; // your hotspot password
const String server = "http://34.126.129.174:80/lilygo-data"; // your computer ip address, ensure both are connected to hotspot

// XOR encryption key
const uint8_t xorKey = 0b101010;

// flag to indicate that a packet was received
volatile bool receivedFlag = true;

// disable interrupt when it's not needed
volatile bool enableReceiveInterrupt = true;

SSD1306Wire display(0x3c, 18, 17);

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

// Callback function once a complete packet is received (this function MUST be 'void' type and MUST NOT have any arguments!)
void loraReceiveCallback(void) {
  // check if the interrupt is enabled
  if (!enableReceiveInterrupt) {
      return;
  }
  else {
    // we got a packet, set the flag
    receivedFlag = true;
  }
}

void setup() {
  // put your setup code here, to run once:
  // Initialise board
  initBoard();
  
  // When the power is turned on, a delay is required.
  delay(1500);

  // Initialise LoRa
  int state = initLora();

  // set the function that will be called when packet transmission is finished
  radio.setDio1Action(loraReceiveCallback);

  Serial.begin(115200);
  delay(100);
  display.init();
  display.clear();
  display.setFont(ArialMT_Plain_10);
  display.flipScreenVertically();
  display.setTextAlignment(TEXT_ALIGN_LEFT);
 
  display.drawString(0, 0, "connecting to wifi");
  display.display();
  delay(2000);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // Connected to WiFi
  // ipaddr = WiFi.localIP().toString();
  // display.clear();
  // display.drawString(0, 0,"wifi connected");
  // display.drawString(0, 10, "IP address:");
  // display.drawString(60, 10, ipaddr);
  // display.display();
  
}

String xor_decrypt(String encrypted_message, uint8_t key) {
  String decrypted_message = "";
  for (int i = 0; i < encrypted_message.length(); i++) {
    decrypted_message += char(encrypted_message[i] ^ key);
  }
  return decrypted_message;
}

void loop() {
  if(WiFi.status() == WL_CONNECTED){
  // GET data from other lilygo
    if (receivedFlag) {
      // disable the interrupt service routine while processing the data
      enableReceiveInterrupt = false;

      // reset flag
      receivedFlag = false;
      
      // you can read received data as an Arduino String
      String str;
      // Receive
      int state = radio.readData(str);

      // to check for encrypt data in string
      // display.clear();
      // display.drawString(0, 0,"encrypted data");
      // display.drawString(0, 10, str);
      // display.display();
      // delay(3000);

      str = xor_decrypt(str, xorKey); 

      // to check for decrypted data in string
      // display.clear();
      // display.drawString(0, 0,"decrypted data");
      // display.drawString(0, 10, str);
      // display.display();
      // delay(3000);

      radio.startReceive();
    
      // we're ready to receive more packets, enable interrupt service routine
      enableReceiveInterrupt = true;

      HTTPClient http;

      //set endpoint and content type
      http.begin(server);
      http.addHeader("Content-Type", "application/json");

      // Create JSON data and POST
      int httpCode = http.POST(str);
      
      // // check if there is error doing POST request from device
      if (httpCode>0) {
        // Response from server after successful POST
        // String payload = http.getString();
        display.clear();
        display.drawString(0, 0,"sending POST request:");
        // display.drawString(0, 10, payload);
        display.drawString(0, 20, str);
        display.display();
      }
      else {
        display.clear();
        display.drawString(0, 0,"Error when sending");
        display.display();
      }

      http.end();
    }

    delay(5000);
  }

}

