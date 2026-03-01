#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>
#include <Ticker.h>

// #define HAS_DISPLAY                 
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

Ticker ledTicker;

#define initPMU()
#define disablePeripherals()

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
}