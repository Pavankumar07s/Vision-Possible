#ifndef BOARDS_H
#define BOARDS_H
#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>
#define OLED_SDA            4
#define OLED_SCL            15
#define OLED_RST            16
#define OLED_ADDR           0x3C
#define LORA_SCK            5
#define LORA_MISO           19
#define LORA_MOSI           27
#define LORA_CS             18
#define LORA_RST            14
#define LORA_IRQ            26
#define PRG_BUTTON          0
#define BOARD_LED           25
#define VEXT_PIN            21
#define LORA_FREQUENCY          433.0
#define LORA_BANDWIDTH          125.0
#define LORA_SPREADING_FACTOR   9
#define LORA_CODING_RATE        7
#define LORA_TX_POWER           17
#define LORA_PREAMBLE_LEN       8
#define XOR_KEY             0b101010
#endif
