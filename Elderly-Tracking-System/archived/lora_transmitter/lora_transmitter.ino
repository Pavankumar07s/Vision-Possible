#include <RadioLib.h>
#include <Arduino_JSON.h>
#include <WiFi.h>
#include "boards.h"

SX1280 radio = new Module(RADIO_CS_PIN, RADIO_DIO1_PIN, RADIO_RST_PIN, RADIO_BUSY_PIN);

// save transmission state between loops
int transmissionState = RADIOLIB_ERR_NONE;

// flag to indicate that a packet was sent
volatile bool transmittedFlag = true;

// disable interrupt when it's not needed
volatile bool enableTransmitInterrupt = true;

uint32_t counter = 0;

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

void setup() {
  // Initialise board
  initBoard();
  
  // When the power is turned on, a delay is required.
  delay(1500);

  // Initialise LoRa
  int state = initLora();

  // set callback function when packet transmission is finished
  radio.setDio1Action(loraTransmitCallback);
}

void loop()
{
  // check if the previous transmission finished
  if(transmittedFlag) {
    // disable the interrupt service routine while processing the data
    enableTransmitInterrupt = false;

    // reset flag
    transmittedFlag = false;

    if (transmissionState == RADIOLIB_ERR_NONE) {
      // packet was successfully sent
      u8g2->clearBuffer();
      u8g2->drawStr(0, 12, "Transmitting..");
      u8g2->drawStr(0, 30, ("TX: " + String(counter)).c_str());
      u8g2->sendBuffer();
    } 
    else {
      printToDisplay("transmission failed!", u8g2);
    }

    // wait a second before transmitting again
    delay(1000);

    /* 
      Each packet contains up to 256 bytes
      of data, in the form of:
        - Arduino String
        - null-terminated char array (C-string)
        - arbitrary binary data (byte array)
      you can transmit C-string or Arduino string up to 256 characters long
    */

    // Send to main node
    JSONVar data;
    data["x"] = 10.000;
    data["y"] = 12.00;
    data["macAddress"] = WiFi.macAddress().c_str();
    data["floor"] = (int)counter;
    String message = JSON.stringify(data);

    // start transmitting the packet
    transmissionState = radio.startTransmit(message.c_str());

    // we're ready to send more packets, enable interrupt service routine
    enableTransmitInterrupt = true;
  }
}