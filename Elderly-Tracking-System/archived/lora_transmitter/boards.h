#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>
#include <Ticker.h>

#define HAS_DISPLAY
#define I2C_SDA                     18
#define I2C_SCL                     17

// GPIO
#define BOARD_LED                   37
#define LED_ON                      HIGH
#define BAT_ADC_PIN                 1
#define BUTTON_PIN                  0

// Radio
#define RADIO_SCLK_PIN              5
#define RADIO_MISO_PIN              3
#define RADIO_MOSI_PIN              6
#define RADIO_CS_PIN                7
#define RADIO_DIO1_PIN              9
#define RADIO_DIO2_PIN              33
#define RADIO_DIO3_PIN              34
#define RADIO_RST_PIN               8
#define RADIO_BUSY_PIN              36
#define RADIO_RX_PIN                21
#define RADIO_TX_PIN                10

// SD Card
#define SDCARD_MOSI                 11
#define SDCARD_MISO                 2
#define SDCARD_SCLK                 14
#define SDCARD_CS                   13

// Display
SPIClass SDSPI(HSPI);
#ifdef HAS_DISPLAY
#include <U8g2lib.h>
#ifndef DISPLAY_MODEL
#define DISPLAY_MODEL U8G2_SSD1306_128X64_NONAME_F_HW_I2C
#endif
DISPLAY_MODEL *u8g2 = nullptr;
#endif

Ticker ledTicker;

#define initPMU()
#define disablePeripherals()

// Function to print to OLED screen
void printToDisplay(const char* message, U8G2* display) {
  if (display) {
    display->clearBuffer();
    display->setCursor(0, 16);
    display->println(message);
    display->sendBuffer();
  }
}

void initBoard()
{
    Serial.begin(115200);
    Serial.println("initBoard");
    SPI.begin(RADIO_SCLK_PIN, RADIO_MISO_PIN, RADIO_MOSI_PIN);

#if defined(HAS_DISPLAY)
    Wire.begin(I2C_SDA, I2C_SCL);
#endif

initPMU();

#ifdef BOARD_LED
    /*
    * T-BeamV1.0, V1.1 LED defaults to low level as trun on,
    * so it needs to be forced to pull up
    * * * * */
#if LED_ON == LOW
    gpio_hold_dis(GPIO_NUM_4);
#endif
    pinMode(BOARD_LED, OUTPUT);
    ledTicker.attach_ms(500, []() {
        static bool level;
        digitalWrite(BOARD_LED, level);
        level = !level;
    });
#endif

#ifdef HAS_DISPLAY
    Wire.beginTransmission(0x3C);
    if (Wire.endTransmission() == 0) {
        Serial.println("Started OLED");
        u8g2 = new U8G2_SSD1306_128X64_NONAME_F_HW_I2C(U8G2_R0, U8X8_PIN_NONE);
        u8g2->begin();
        u8g2->clearBuffer();
        u8g2->setFlipMode(0);
        u8g2->setFontMode(1); // Transparent
        u8g2->setDrawColor(1);
        u8g2->setFontDirection(0);
        u8g2->firstPage();
        do {
            u8g2->setFont(u8g2_font_inb19_mr);
            u8g2->drawStr(0, 30, "LilyGo");
            u8g2->drawHLine(2, 35, 47);
            u8g2->drawHLine(3, 36, 47);
            u8g2->drawVLine(45, 32, 12);
            u8g2->drawVLine(46, 33, 12);
            u8g2->setFont(u8g2_font_inb19_mf);
            u8g2->drawStr(58, 60, "LoRa");
        } while ( u8g2->nextPage() );
        u8g2->sendBuffer();
        u8g2->setFont(u8g2_font_fur11_tf);
        delay(3000);
    }
#endif

#ifdef HAS_DISPLAY
    if (u8g2) {
        u8g2->setFont(u8g2_font_ncenB08_tr);
    }
#endif
}