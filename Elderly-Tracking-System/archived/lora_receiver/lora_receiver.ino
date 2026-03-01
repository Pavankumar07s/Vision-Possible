#include <RadioLib.h>
#include <Arduino_JSON.h>
#include "boards.h"

/* 
  Both transmitter and receiver must have the same:
  - carrier frequency
  - bandwidth
  - spreading factor
  - coding rate
  - sync word
*/

// LoRa module
SX1280 radio = new Module(RADIO_CS_PIN, RADIO_DIO1_PIN, RADIO_RST_PIN, RADIO_BUSY_PIN);

// flag to indicate that a packet was received
volatile bool receivedFlag = true;

// disable interrupt when it's not needed
volatile bool enableReceiveInterrupt = true;

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

// Program entrypoint
void setup() {
  // Initialise board
  initBoard();

  // When the power is turned on, a delay is required.
  delay(1500);

  // Initialise LoRa
  int state = initLora();

  // Set LoRa callback function when a packet is received
  radio.setDio1Action(loraReceiveCallback);
}

void loop()
{   
  /* 
    This example listens for LoRa transmissions and tries to
    receive them. Once a packet is received, an interrupt is
    triggered. To successfully receive data, the following
    settings have to be the same on both transmitter
    and receiver:
      - carrier frequency
      - bandwidth
      - spreading factor
      - coding rate
      - sync word
    */

  // check if the flag is set
  if (receivedFlag) {
    // disable the interrupt service routine while processing the data
    enableReceiveInterrupt = false;

    // reset flag
    receivedFlag = false;

    // you can read received data as an Arduino String
    String str;
    // Receive
    int state = radio.readData(str);
    JSONVar receivedMessage = JSON.parse(str);

    // Parse message received
    String macAddress = (const char*)receivedMessage["macAddress"];
    String loraAddress = (const char*)receivedMessage["loraAddress"];
    double x = (double)receivedMessage["x"];
    double y = (double)receivedMessage["y"];
    int floor = (int)receivedMessage["floor"];

    // Clear the internal memory
    u8g2->clearBuffer(); 

    // Print macAddress
    u8g2->setCursor(0, 12); // Set cursor position
    u8g2->println(macAddress);

    // Print loraAddress
    u8g2->setCursor(0, 26); // Set cursor position
    u8g2->println(loraAddress);

    // Print x
    u8g2->setCursor(0, 40); // Set cursor position for the next line
    u8g2->print("X: ");
    u8g2->print(x);

    // Print y
    u8g2->setCursor(0, 54); // Set cursor position for the next line
    u8g2->print("Y: ");
    u8g2->print(y);

    // Print floor
    u8g2->setCursor(0, 68); // Set cursor position for the next line
    u8g2->print("Floor: ");
    u8g2->print(floor);
    u8g2->sendBuffer(); // Transfer internal memory to the display
    
    // if (state == RADIOLIB_ERR_NONE) {
    //   // Clear the internal memory
    //   u8g2->clearBuffer(); 

    //   // Print macAddress
    //   u8g2->setCursor(0, 12); // Set cursor position
    //   u8g2->println(macAddress);

    //   // Print loraAddress
    //   u8g2->setCursor(0, 26); // Set cursor position
    //   u8g2->println(loraAddress);

    //   // Print x
    //   u8g2->setCursor(0, 40); // Set cursor position for the next line
    //   u8g2->print("X: ");
    //   u8g2->print(x);

    //   // Print y
    //   u8g2->setCursor(0, 54); // Set cursor position for the next line
    //   u8g2->print("Y: ");
    //   u8g2->print(y);

    //   // Print floor
    //   u8g2->setCursor(0, 68); // Set cursor position for the next line
    //   u8g2->print("Floor: ");
    //   u8g2->print(floor);

    //   // Print RSSI (Received Signal Strength Indicator)
    //   // u8g2->setCursor(0, 68); 
    //   // u8g2->print("RSSI: ");
    //   // u8g2->print(radio.getRSSI(), 2); // Print with 2 decimal places

    //   // Print SNR (Signal-to-Noise Ratio)
    //   // u8g2->setCursor(0, 82);
    //   // u8g2->print("SNR: ");
    //   // u8g2->print(radio.getSNR(), 2); // Print with 2 decimal places

    //   u8g2->sendBuffer(); // Transfer internal memory to the display
    // } 
    // else if (state == RADIOLIB_ERR_CRC_MISMATCH) {
    //   // packet was received, but is malformed
    //   printToDisplay("[SX1280] CRC error!", u8g2);
    // } 
    // else {
    //   // some other error occurred
    //   printToDisplay("[SX1280] Failed!", u8g2);
    // }
        // Delay before sending the next packet to prevent CRC Error?
    delay(1000);
    
    // put module back to listen mode
    radio.startReceive();

    // we're ready to receive more packets, enable interrupt service routine
    enableReceiveInterrupt = true;

    // // Check if parsing succeeded
    // if (JSON.typeof(receivedMessage) == "undefined") {
    //   Serial.printf("Not a JSON message!\n");

    //   // Clear display
    //   display.clear();

    //   // Print RX(X)
    //   display.drawString(0, 12, "Not a JSON message!");

    //   // Display message
    //   display.display();
    // }
    // else {
    // } 
  }
}