# ✅ MQTT Setup Complete - Quick Reference

## 🎯 What Was Done

### ✅ Installed Components
- **ffmpeg** - For media/camera handling (fixes the error you saw)
- **libturbojpeg** - For image optimization (fixes the error you saw)
- **Mosquitto broker** - MQTT message broker
- **MQTT client tools** - For testing and debugging

### ✅ Configuration Files Updated

**1. configuration.yaml** - Added MQTT integration:
```yaml
mqtt:
  broker: 127.0.0.1
  port: 1883
  username: mqtt_user
  password: MySecure_MQTT_Pass2026
  discovery: true
```

**2. automations.yaml** - Added 6 health monitoring automations:
- Heart Rate → MQTT
- HRV → MQTT
- Oxygen Saturation → MQTT
- Respiratory Rate → MQTT
- Steps → MQTT
- Resting Heart Rate → MQTT

### ✅ Services Running
- **Mosquitto** - Running on port 1883 (localhost only)
- **Home Assistant** - Running on port 8123
- **PID**: 230090

---

## 🚀 Current Status

```bash
✅ MQTT broker: RUNNING
✅ Home Assistant: RUNNING  
✅ Web interface: http://localhost:8123
✅ Automations: 6 health sensors configured
✅ Configuration: Valid
```

---

## 📋 Next Steps - Do These on Your Android Phone

### Step 1: Enable Health Connect Sensors

1. **Open Home Assistant Companion App on your phone**

2. **Navigate to:**
   ```
   Settings → Companion App → Manage Sensors
   ```

3. **Enable these sensors:**
   - ☐ health_connect_heart_rate
   - ☐ health_connect_resting_heart_rate
   - ☐ health_connect_heart_rate_variability
   - ☐ health_connect_oxygen_saturation
   - ☐ health_connect_respiratory_rate
   - ☐ health_connect_steps
   - ☐ health_connect_sleep_duration

4. **Grant Permissions:**
   - When prompted, allow all Health Connect permissions

5. **Set Update Frequency:**
   ```
   Settings → Companion App → Sensor Update Frequency
   Select: "Fast Always" (updates every 60 seconds)
   ```

6. **Disable Battery Optimization:**
   ```
   Phone Settings → Apps → Home Assistant
   Battery → Battery optimization → Don't optimize
   
   Do the same for:
   - Noise app
   - Google Fit
   - Health Connect
   ```

### Step 2: Verify Sensors in Home Assistant

**After enabling sensors on your phone, wait 2-3 minutes, then:**

1. **Open:** http://localhost:8123

2. **Go to:** Settings → Developer Tools → States

3. **Search:** `health_connect`

4. **You should see:**
   ```
   sensor.health_connect_heart_rate
   sensor.health_connect_resting_heart_rate
   sensor.health_connect_heart_rate_variability
   sensor.health_connect_oxygen_saturation
   sensor.health_connect_respiratory_rate
   sensor.health_connect_steps
   ```

### Step 3: Monitor MQTT Messages

**Open a terminal and run:**
```bash
mosquitto_sub -h localhost -u mqtt_user -P MySecure_MQTT_Pass2026 -t "etms/#" -v
```

**Leave this running.** You should start seeing messages like:
```json
etms/floor/1/mobile/7/heart_rate {"value": 72.0, "unit": "bpm", "timestamp": "2026-02-22T..."}
etms/floor/1/mobile/7/steps {"value": 5432, "unit": "steps", "timestamp": "2026-02-22T..."}
```

**If you don't see messages immediately:**
- Wait 1-2 minutes (sensors update every 60 seconds with "Fast Always")
- Make sure sensors are enabled on your phone
- Check that Health Connect has data from your Noise watch

---

## 🛠️ Useful Commands

### Check if Services are Running
```bash
# Home Assistant
ps aux | grep homeassistant

# Mosquitto MQTT
sudo systemctl status mosquitto
```

### View Logs
```bash
# Home Assistant logs
tail -f /tmp/homeassistant.log

# Mosquitto logs
sudo journalctl -u mosquitto -f
```

### Test MQTT Connection
```bash
# Publish a test message
mosquitto_pub -h localhost -u mqtt_user -P MySecure_MQTT_Pass2026 -t "test/topic" -m "Hello"

# Subscribe to all topics
mosquitto_sub -h localhost -u mqtt_user -P MySecure_MQTT_Pass2026 -t "#" -v
```

### Restart Services
```bash
# Restart Home Assistant
pkill -f "python -m homeassistant"
cd /home/pavan/Desktop/Autism/core
nohup conda run -n homeassistant python -m homeassistant -c ./config > /tmp/homeassistant.log 2>&1 &

# Restart Mosquitto
sudo systemctl restart mosquitto
```

### Quick Restart Script
```bash
# Run the automated setup script
cd /home/pavan/Desktop/Autism/core
./setup_mqtt_and_restart.sh
```

---

## 🔍 Verify Automations Loaded

1. **Open:** http://localhost:8123
2. **Go to:** Settings → Automations & Scenes
3. **You should see 6 automations:**
   - ✅ Publish Heart Rate to MQTT
   - ✅ Publish HRV to MQTT
   - ✅ Publish Oxygen Saturation to MQTT
   - ✅ Publish Respiratory Rate to MQTT
   - ✅ Publish Steps to MQTT
   - ✅ Publish Resting Heart Rate to MQTT

All should be **enabled** (toggle switch on).

---

## 📱 Integration Flow

```
Noise Watch → Health Connect → Home Assistant App → HA Server → MQTT → Your AI
     ↓             ↓                ↓                  ↓           ↓
   Raw Data   Aggregation      Sensors           Automations   Publish
```

---

## 🐛 Troubleshooting

### Sensors Not Appearing in Home Assistant

**Problem:** Can't find `sensor.health_connect_heart_rate` in States

**Solutions:**
1. Make sure you enabled sensors in the Companion App on your phone
2. Grant Health Connect permissions when prompted
3. Check that Noise watch is syncing to Health Connect
4. Wait 2-3 minutes after enabling sensors
5. Restart Home Assistant app on your phone

### No MQTT Messages

**Problem:** `mosquitto_sub` shows no messages

**Solutions:**
1. Check sensors are enabled and updating in Home Assistant
2. Verify sensors have values (not "unknown" or "unavailable")
3. Check automation logs: Settings → System → Logs → Filter "automation"
4. Manually test MQTT:
   ```bash
   mosquitto_pub -h localhost -u mqtt_user -P MySecure_MQTT_Pass2026 -t "test" -m "working"
   mosquitto_sub -h localhost -u mqtt_user -P MySecure_MQTT_Pass2026 -t "test" -v
   ```

### MQTT Authentication Failed

**Problem:** "Connection Refused: not authorised"

**Solution:**
```bash
sudo mosquitto_passwd -b /etc/mosquitto/passwd mqtt_user MySecure_MQTT_Pass2026
sudo systemctl restart mosquitto
```

### Home Assistant Won't Start

**Problem:** Can't access http://localhost:8123

**Solutions:**
1. Check if it's running: `ps aux | grep homeassistant`
2. Check logs: `tail -50 /tmp/homeassistant.log`
3. Try manual start:
   ```bash
   pkill -f "python -m homeassistant"
   cd /home/pavan/Desktop/Autism/core
   conda run -n homeassistant python -m homeassistant -c ./config
   ```

---

## 🎓 What Each Sensor Means

| Sensor | Description | Use Case |
|--------|-------------|----------|
| **heart_rate** | Current beats per minute | Real-time stress, fall confirmation |
| **resting_heart_rate** | Baseline HR during rest | Calculate normal vs abnormal |
| **heart_rate_variability** | Time between heartbeats | Stress and anxiety detection |
| **oxygen_saturation** | Blood oxygen level (SpO2) | Critical health events |
| **respiratory_rate** | Breaths per minute | Breathing abnormalities |
| **steps** | Step count since midnight | Activity level correlation |

---

## 📈 Expected Update Frequency

| Mode | Update Interval |
|------|----------------|
| **Fast Always** | Every 60 seconds |
| **Fast While Charging** | 60s when charging, 15min otherwise |
| **Normal** | Every 15 minutes |

**Recommended:** Fast Always for real-time monitoring

---

## 🔐 Security Notes

- MQTT broker listens only on **localhost (127.0.0.1)**
- Authentication required: username + password
- No anonymous connections allowed
- Data not exposed to external network

**If you need external access:**
```bash
# Edit: /etc/mosquitto/conf.d/default.conf
# Change:    listener 1883 127.0.0.1
# To:        listener 1883 0.0.0.0
# Then:      sudo systemctl restart mosquitto
# And configure firewall accordingly
```

---

## 💡 Tips

1. **Use the script:** `./setup_mqtt_and_restart.sh` for easy restart
2. **Monitor MQTT:** Keep `mosquitto_sub` running in a terminal to see live data
3. **Check logs:** If something breaks, always check `/tmp/homeassistant.log`
4. **Battery life:** "Fast Always" will drain battery faster - consider "Fast While Charging" as alternative

---

## ✅ Final Checklist

Server-side (Complete):
- [x] MQTT broker installed and running
- [x] Home Assistant configured with MQTT
- [x] Automations created and loaded
- [x] System dependencies installed (ffmpeg, libturbojpeg)
- [x] Home Assistant web interface accessible

Phone-side (Your Next Steps):
- [ ] Enable Health Connect sensors in Companion App
- [ ] Set update frequency to "Fast Always"
- [ ] Disable battery optimization
- [ ] Verify sensors appear in Home Assistant
- [ ] Confirm MQTT messages are publishing

---

**All server-side setup is COMPLETE!** 🎉

Now you just need to enable the sensors on your Android phone and watch the data flow! 🚀
