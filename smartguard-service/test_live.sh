#!/bin/bash
# ──────────────────────────────────────────────────────
# SmartGuard Live Test Script
# ──────────────────────────────────────────────────────
# Run this in a SEPARATE terminal while SmartGuard is running:
#   python main.py --mode infer
#
# Usage: bash test_live.sh
# ──────────────────────────────────────────────────────

BROKER="localhost"
USER="mqtt_user"
PASS="YOUR_MQTT_PASSWORD"

pub() {
    mosquitto_pub -h "$BROKER" -u "$USER" -P "$PASS" -t "$1" -m "$2"
    echo "  → Published to $1"
    sleep 0.3
}

echo "=== SmartGuard Live Test ==="
echo "Sending 12 simulated events (need ≥5 for inference)..."
echo ""

echo "── Normal daily routine ──"
pub "homeassistant/light/kitchen/state" \
    '{"entity_id":"light.kitchen","state":"on","attributes":{"friendly_name":"Kitchen Light"}}'

pub "homeassistant/light/bedroom/state" \
    '{"entity_id":"light.bedroom","state":"off","attributes":{"friendly_name":"Bedroom Light"}}'

pub "homeassistant/switch/hallway/state" \
    '{"entity_id":"switch.hallway","state":"on","attributes":{"friendly_name":"Hallway Switch"}}'

pub "homeassistant/lock/front_door/state" \
    '{"entity_id":"lock.front_door","state":"locked","attributes":{"friendly_name":"Front Door"}}'

pub "homeassistant/climate/living_room/state" \
    '{"entity_id":"climate.living_room","state":"cool","attributes":{"temperature":22}}'

pub "homeassistant/media_player/tv/state" \
    '{"entity_id":"media_player.tv","state":"on","attributes":{"friendly_name":"Living Room TV"}}'

echo ""
echo "── Vision events ──"
pub "etms/vision/room_1_camera/event" \
    '{"event":"zone_transition","person_id":"G1","confidence":0.88,"severity":"low"}'

pub "etms/vision/room_1_camera/movement" \
    '{"person_id":"G1","zone":"kitchen","speed":1.5}'

echo ""
echo "── SmartThings events ──"
pub "etms/smartthings/lock_01/event" \
    '{"device_type":"SmartLock","capability":"lock","attribute":"lock","value":"unlocked","device_name":"Front Door"}'

pub "etms/smartthings/sensor_01/event" \
    '{"device_type":"TemperatureSensor","capability":"temperatureMeasurement","attribute":"temperature","value":23.5}'

echo ""
echo "── Health alert (anomalous) ──"
pub "etms/health/watch_01/alert" \
    '{"metric":"heart_rate","value":150,"alert_type":"high_heart_rate"}'

pub "etms/vision/room_1_camera/event" \
    '{"event":"fall_detected","person_id":"G1","confidence":0.95,"severity":"high"}'

echo ""
echo "=== Done! 12 events sent ==="
echo "Check SmartGuard output in its terminal, or run:"
echo "  mosquitto_sub -h localhost -u mqtt_user -P 'YOUR_MQTT_PASSWORD' -t 'etms/smartguard/#' -v"
