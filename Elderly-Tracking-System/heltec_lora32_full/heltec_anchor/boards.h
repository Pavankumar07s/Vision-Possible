#ifndef BOARDS_H
#define BOARDS_H

/*
 * ════════════════════════════════════════════════════════════
 *  Heltec WiFi LoRa 32 (V1/V2) — Common Pin Definitions
 *  Chip: ESP32 + SX1276/SX1278 (433 MHz) + SSD1306 OLED
 * ════════════════════════════════════════════════════════════
 *  This file is IDENTICAL across all node types.
 *  DO NOT modify unless you have a different Heltec variant.
 * ════════════════════════════════════════════════════════════
 */

#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>

// ── OLED Display (SSD1306, 128x64, I2C) ──
#define OLED_SDA            4
#define OLED_SCL            15
#define OLED_RST            16
#define OLED_ADDR           0x3C

// ── LoRa Radio (SX1276, SPI) ──
#define LORA_SCK            5
#define LORA_MISO           19
#define LORA_MOSI           27
#define LORA_CS             18
#define LORA_RST            14
#define LORA_IRQ            26      // DIO0

// ── GPIO ──
#define PRG_BUTTON          0       // PRG button (active LOW)
#define BOARD_LED           25
#define VEXT_PIN            21      // OLED power: LOW=ON, HIGH=OFF

// ── LoRa Config (MUST match on Bridge & Gateway) ──
#define LORA_FREQUENCY          433.0
#define LORA_BANDWIDTH          125.0
#define LORA_SPREADING_FACTOR   9
#define LORA_CODING_RATE        7
#define LORA_TX_POWER           17
#define LORA_PREAMBLE_LEN       8

// ── Security (MUST match on ALL nodes) ──
#define XOR_KEY             0b101010

#endif // BOARDS_H
