# Health Connect Integration with Home Assistant - Complete Guide

## 🎯 Project Overview
This guide will help you integrate your Noise smartwatch data (via Health Connect) into Home Assistant for real-time physiological monitoring and AI-driven analysis.

## 📋 Prerequisites Checklist
- [x] Noise smartwatch connected to smartphone via Noise app
- [x] Google Fit permissions granted to Noise app
- [x] Health Connect configured to share data
- [ ] Home Assistant Android Companion App installed
- [ ] Home Assistant server running (✅ You have this at http://localhost:8123)
- [ ] MQTT integration installed in Home Assistant

---

## 🚀 Step 1: Enable Health Connect Sensors in Companion App

### 1.1 Install Health Connect App (if needed)
**For Android 13 or older:**
```
1. Open Google Play Store
2. Search for "Health Connect by Google"
3. Install the app
4. Open Health Connect
5. Grant permissions to: Noise app, Google Fit, Home Assistant
```

**For Android 14+:**
Health Connect is built-in, no installation needed.

### 1.2 Enable Sensors in Home Assistant Companion App

**On your Android phone:**

1. **Open Home Assistant Companion App**

2. **Navigate to Sensor Management:**
   ```
   Settings → Companion App → Manage Sensors
   ```

3. **Enable Health Connect Sensors:**
   Scroll down to "Health Connect Sensors" section and enable:
   
   - ✅ `health_connect_heart_rate` (Primary sensor for real-time monitoring)
   - ✅ `health_connect_resting_heart_rate` (Baseline reference)
   - ✅ `health_connect_heart_rate_variability` (Stress detection)
   - ✅ `health_connect_oxygen_saturation` (Critical health events)
   - ✅ `health_connect_respiratory_rate` (Breathing abnormalities)
   - ✅ `health_connect_steps` (Activity tracking)
   - ✅ `health_connect_sleep_duration` (Sleep monitoring)

4. **Grant Health Connect Permissions:**
   - App will prompt you to grant permissions
   - Select "Allow" for all requested health data types

### 1.3 Configure Update Frequency

**For real-time monitoring, set to fastest update rate:**

```
Settings → Companion App → Sensor Update Frequency → Fast Always
```

This will update sensors **every minute** instead of the default 15-minute interval.

**⚠️ Important for Battery Life:**
Disable battery optimization for these apps:
```
Settings → Apps → Special App Access → Battery Optimization
Disable for:
- Home Assistant
- Noise
- Google Fit
- Health Connect
```

---

## ✅ Step 2: Verify Sensors Are Working

### 2.1 Check in Home Assistant

1. **Open Home Assistant web interface:**
   ```
   http://localhost:8123
   ```

2. **Navigate to Developer Tools:**
   ```
   Settings → Developer Tools → States
   ```

3. **Search for Health Connect sensors:**
   ```
   Filter: sensor.health_connect_heart_rate
   ```

4. **Verify sensor attributes:**
   - **State**: Should show a number (e.g., "72" for 72 BPM)
   - **Last Updated**: Should be recent (within last minute if Fast Always is enabled)
   - **Unit**: `bpm` for heart rate sensors

### 2.2 Monitor Real-Time Updates

**Test the sensor is updating:**
1. Keep Developer Tools → States open
2. Do some jumping jacks or run in place for 30 seconds
3. Wait 1-2 minutes
4. Refresh the States view
5. Heart rate should increase and reflect the exercise

**Expected Update Times:**
- **Fast Always**: Every 60 seconds
- **Fast While Charging**: Every 60 seconds when charging
- **Normal**: Every 15 minutes

---

## 🔧 Step 3: Install MQTT Integration

### 3.1 Install MQTT Broker (Mosquitto)

**Option A: Install via Home Assistant Add-on (Recommended)**

1. **Navigate to Add-ons:**
   ```
   Settings → Add-ons → Add-on Store → Search "Mosquitto broker"
   ```

2. **Install Mosquitto broker:**
   ```
   Click "Mosquitto broker" → Install
   Wait for installation to complete
   ```

3. **Configure Mosquitto:**
   ```
   Configuration tab:
   
   logins:
     - username: mqtt_user
       password: secure_password_here
   
   anonymous: false
   customize:
     active: false
     folder: mosquitto
   
   certfile: fullchain.pem
   keyfile: privkey.pem
   require_certificate: false
   ```

4. **Start Mosquitto:**
   ```
   Info tab → Start
   Enable "Start on boot"
   Enable "Watchdog"
   ```

**Option B: Use External MQTT Broker**
If you already have an MQTT broker running elsewhere, skip to Step 3.2.

### 3.2 Add MQTT Integration to Home Assistant

1. **Navigate to Integrations:**
   ```
   Settings → Devices & Services → Add Integration
   ```

2. **Search for MQTT:**
   ```
   Type "MQTT" in search box
   ```

3. **Configure MQTT:**
   ```
   Broker: localhost (or your MQTT broker IP)
   Port: 1883
   Username: mqtt_user
   Password: secure_password_here
   ```

4. **Verify Connection:**
   ```
   Should see "Success! MQTT is now configured."
   ```

---

## 📡 Step 4: Create Automations to Publish Sensor Data

### 4.1 Create YAML Configuration Directory

**Check if automations.yaml exists:**
```bash
ls /home/pavan/Desktop/Autism/core/config/automations.yaml
```

### 4.2 Add Heart Rate Monitoring Automation

**Edit automations.yaml:**

```yaml
# Health Connect Heart Rate to MQTT
- id: health_connect_heart_rate_mqtt
  alias: "Publish Heart Rate to MQTT"
  description: "Publishes real-time heart rate data to MQTT for AI engine"
  
  trigger:
    - platform: state
      entity_id: sensor.health_connect_heart_rate
  
  condition:
    - condition: template
      value_template: "{{ trigger.to_state.state not in ['unknown', 'unavailable'] }}"
  
  action:
    - service: mqtt.publish
      data:
        topic: "etms/floor/1/mobile/{{ state_attr('device_tracker.your_phone', 'user_id') | default('7') }}/heart_rate"
        payload: |
          {
            "value": {{ states('sensor.health_connect_heart_rate') }},
            "unit": "bpm",
            "timestamp": "{{ now().isoformat() }}",
            "device": "{{ state_attr('sensor.health_connect_heart_rate', 'friendly_name') }}"
          }
        retain: false
        qos: 1

# Health Connect HRV to MQTT
- id: health_connect_hrv_mqtt
  alias: "Publish HRV to MQTT"
  description: "Publishes heart rate variability for stress monitoring"
  
  trigger:
    - platform: state
      entity_id: sensor.health_connect_heart_rate_variability
  
  condition:
    - condition: template
      value_template: "{{ trigger.to_state.state not in ['unknown', 'unavailable'] }}"
  
  action:
    - service: mqtt.publish
      data:
        topic: "etms/floor/1/mobile/{{ state_attr('device_tracker.your_phone', 'user_id') | default('7') }}/hrv"
        payload: |
          {
            "value": {{ states('sensor.health_connect_heart_rate_variability') }},
            "unit": "ms",
            "timestamp": "{{ now().isoformat() }}",
            "device": "{{ state_attr('sensor.health_connect_heart_rate_variability', 'friendly_name') }}"
          }
        retain: false
        qos: 1

# Health Connect Oxygen Saturation to MQTT
- id: health_connect_o2_mqtt
  alias: "Publish Oxygen Saturation to MQTT"
  description: "Publishes SpO2 data for critical health event detection"
  
  trigger:
    - platform: state
      entity_id: sensor.health_connect_oxygen_saturation
  
  condition:
    - condition: template
      value_template: "{{ trigger.to_state.state not in ['unknown', 'unavailable'] }}"
  
  action:
    - service: mqtt.publish
      data:
        topic: "etms/floor/1/mobile/{{ state_attr('device_tracker.your_phone', 'user_id') | default('7') }}/oxygen_saturation"
        payload: |
          {
            "value": {{ states('sensor.health_connect_oxygen_saturation') }},
            "unit": "percent",
            "timestamp": "{{ now().isoformat() }}",
            "device": "{{ state_attr('sensor.health_connect_oxygen_saturation', 'friendly_name') }}"
          }
        retain: false
        qos: 1

# Health Connect Respiratory Rate to MQTT
- id: health_connect_respiratory_mqtt
  alias: "Publish Respiratory Rate to MQTT"
  description: "Publishes breathing rate for anomaly detection"
  
  trigger:
    - platform: state
      entity_id: sensor.health_connect_respiratory_rate
  
  condition:
    - condition: template
      value_template: "{{ trigger.to_state.state not in ['unknown', 'unavailable'] }}"
  
  action:
    - service: mqtt.publish
      data:
        topic: "etms/floor/1/mobile/{{ state_attr('device_tracker.your_phone', 'user_id') | default('7') }}/respiratory_rate"
        payload: |
          {
            "value": {{ states('sensor.health_connect_respiratory_rate') }},
            "unit": "breaths_per_minute",
            "timestamp": "{{ now().isoformat() }}",
            "device": "{{ state_attr('sensor.health_connect_respiratory_rate', 'friendly_name') }}"
          }
        retain: false
        qos: 1

# Health Connect Steps to MQTT (for activity modeling)
- id: health_connect_steps_mqtt
  alias: "Publish Steps to MQTT"
  description: "Publishes step count for activity correlation"
  
  trigger:
    - platform: state
      entity_id: sensor.health_connect_steps
  
  condition:
    - condition: template
      value_template: "{{ trigger.to_state.state not in ['unknown', 'unavailable'] }}"
  
  action:
    - service: mqtt.publish
      data:
        topic: "etms/floor/1/mobile/{{ state_attr('device_tracker.your_phone', 'user_id') | default('7') }}/steps"
        payload: |
          {
            "value": {{ states('sensor.health_connect_steps') }},
            "unit": "steps",
            "timestamp": "{{ now().isoformat() }}",
            "daily_total": {{ states('sensor.health_connect_steps') }},
            "device": "{{ state_attr('sensor.health_connect_steps', 'friendly_name') }}"
          }
        retain: false
        qos: 1
```

### 4.3 Reload Automations

**Via Home Assistant UI:**
```
Developer Tools → YAML → Automations → Reload
```

**Via Terminal:**
```bash
# From within Home Assistant container or Core directory
cd /home/pavan/Desktop/Autism/core
# Call the reload service
curl -X POST -H "Authorization: Bearer YOUR_LONG_LIVED_ACCESS_TOKEN" \
     -H "Content-Type: application/json" \
     http://localhost:8123/api/services/automation/reload
```

**Or restart Home Assistant:**
```bash
# Stop current instance
pkill -f "python -m homeassistant"

# Start Home Assistant
conda run -n homeassistant python -m homeassistant -c ./config &
```

---

## 🧠 Step 5: AI Correlation Logic Patterns

### 5.1 Your AI Engine Should Subscribe to These Topics:

```python
import paho.mqtt.client as mqtt

# MQTT Topics to subscribe to
TOPICS = [
    "etms/+/mobile/+/heart_rate",
    "etms/+/mobile/+/hrv",
    "etms/+/mobile/+/oxygen_saturation",
    "etms/+/mobile/+/respiratory_rate",
    "etms/+/mobile/+/steps",
    "etms/+/fall_detection",  # Your existing fall detection topic
    "etms/+/position"          # Your existing position tracking
]

def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    for topic in TOPICS:
        client.subscribe(topic)
        print(f"Subscribed to {topic}")

def on_message(client, userdata, msg):
    print(f"Received message on {msg.topic}: {msg.payload.decode()}")
    # Your AI processing logic here
    process_physiological_data(msg.topic, msg.payload)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883, 60)
client.loop_forever()
```

### 5.2 AI Decision Tree Examples

**Case 1: Fall + HR Spike → CONFIRMED FALL**
```python
def analyze_fall_with_heart_rate(fall_event, heart_rate_data):
    """
    Correlate fall detection with heart rate spike
    """
    # Get baseline heart rate (average over last 5 minutes)
    baseline_hr = get_average_heart_rate(minutes=5)
    current_hr = heart_rate_data['value']
    
    # Calculate percentage increase
    hr_increase_percent = ((current_hr - baseline_hr) / baseline_hr) * 100
    
    if fall_event and hr_increase_percent > 30:
        return {
            "event_type": "FALL_CONFIRMED",
            "confidence": 0.95,
            "baseline_hr": baseline_hr,
            "current_hr": current_hr,
            "hr_increase": hr_increase_percent,
            "action": "ALERT_EMERGENCY_SERVICES",
            "reasoning": "Fall detected with significant heart rate spike"
        }
    elif fall_event and hr_increase_percent < 10:
        return {
            "event_type": "POSSIBLE_FALSE_POSITIVE",
            "confidence": 0.40,
            "action": "MONITOR_CLOSELY",
            "reasoning": "Fall detected but heart rate remains normal"
        }
```

**Case 2: No Movement + HR Drop → CRITICAL EVENT**
```python
def detect_critical_event(position_data, heart_rate_data):
    """
    Detect potential medical emergency from lack of movement + low HR
    """
    # Check if person hasn't moved in 5 minutes
    time_stationary = get_time_since_last_movement(position_data)
    current_hr = heart_rate_data['value']
    baseline_hr = get_average_heart_rate(minutes=30)
    
    if time_stationary > 300:  # 5 minutes
        if current_hr < (baseline_hr * 0.7):  # HR dropped 30% below baseline
            return {
                "event_type": "CRITICAL_EVENT",
                "confidence": 0.90,
                "action": "IMMEDIATE_ALERT",
                "reasoning": "No movement for 5+ minutes with abnormally low heart rate",
                "stationary_time": time_stationary,
                "current_hr": current_hr,
                "baseline_hr": baseline_hr
            }
```

**Case 3: Wandering + Elevated HR → ANXIETY ALERT**
```python
def detect_anxiety_episode(position_data, heart_rate_data, hrv_data):
    """
    Detect potential anxiety or panic episode
    """
    # Check if person is outside designated zones
    in_safe_zone = check_position_in_zones(position_data)
    current_hr = heart_rate_data['value']
    baseline_hr = get_resting_heart_rate()
    current_hrv = hrv_data['value']
    baseline_hrv = get_average_hrv(hours=24)
    
    # Elevated HR + Low HRV + Outside safe zone = Anxiety
    if not in_safe_zone:
        hr_elevated = current_hr > (baseline_hr + 20)
        hrv_low = current_hrv < (baseline_hrv * 0.6)  # HRV dropped 40%
        
        if hr_elevated and hrv_low:
            return {
                "event_type": "ANXIETY_ALERT",
                "confidence": 0.85,
                "action": "NOTIFY_CAREGIVER",
                "reasoning": "Person outside safe zone with signs of stress/anxiety",
                "current_hr": current_hr,
                "current_hrv": current_hrv,
                "location": position_data
            }
```

**Case 4: Pre-Fall Detection with HRV**
```python
def predict_fall_risk(hrv_data, heart_rate_data, activity_data):
    """
    Predict elevated fall risk before it happens
    """
    current_hrv = hrv_data['value']
    baseline_hrv = get_average_hrv(hours=24)
    current_hr = heart_rate_data['value']
    
    # Sudden HRV drop indicates physiological strain
    hrv_drop_percent = ((baseline_hrv - current_hrv) / baseline_hrv) * 100
    
    # Low HRV + High HR + No significant activity = Instability
    if hrv_drop_percent > 40:  # HRV dropped significantly
        if current_hr > 100 and activity_data['steps_last_minute'] < 10:
            return {
                "event_type": "PRE_FALL_WARNING",
                "confidence": 0.75,
                "action": "PREEMPTIVE_ALERT",
                "reasoning": "Physiological instability detected - high fall risk",
                "hrv_drop_percent": hrv_drop_percent,
                "current_hr": current_hr,
                "recommendation": "Encourage person to sit down"
            }
```

### 5.3 Baseline Calculation

**Calculate personalized baselines:**
```python
import statistics
from datetime import datetime, timedelta

class PhysiologicalBaseline:
    def __init__(self, user_id):
        self.user_id = user_id
        self.baseline_cache = {}
    
    def calculate_resting_hr(self, days=7):
        """
        Calculate resting heart rate from last 7 days of sleep data
        """
        heart_rates = get_heart_rate_during_sleep(
            user_id=self.user_id,
            days=days
        )
        
        # Use 5th percentile as resting HR
        resting_hr = statistics.quantiles(heart_rates, n=20)[0]  # 5th percentile
        
        self.baseline_cache['resting_hr'] = resting_hr
        return resting_hr
    
    def calculate_average_hrv(self, hours=24):
        """
        Calculate average HRV over last 24 hours
        """
        hrv_values = get_hrv_readings(
            user_id=self.user_id,
            hours=hours
        )
        
        avg_hrv = statistics.mean(hrv_values)
        
        self.baseline_cache['avg_hrv'] = avg_hrv
        return avg_hrv
    
    def detect_anomaly(self, current_value, metric_name, threshold_percent=30):
        """
        Detect if current value is anomalous compared to baseline
        """
        baseline = self.baseline_cache.get(metric_name)
        
        if not baseline:
            return False
        
        deviation_percent = abs((current_value - baseline) / baseline) * 100
        
        return deviation_percent > threshold_percent
```

---

## 🧪 Step 6: Testing the Complete Pipeline

### 6.1 Test MQTT Publishing

**Install MQTT client tool:**
```bash
sudo apt-get install mosquitto-clients
```

**Subscribe to all health topics:**
```bash
mosquitto_sub -h localhost -t "etms/#" -v
```

**You should see messages like:**
```
etms/floor/1/mobile/7/heart_rate {"value": 72, "unit": "bpm", "timestamp": "2026-02-22T10:30:45", "device": "Health Connect Heart Rate"}
etms/floor/1/mobile/7/hrv {"value": 45, "unit": "ms", "timestamp": "2026-02-22T10:30:45", "device": "Health Connect HRV"}
```

### 6.2 Verify Update Frequency

**Monitor for 5 minutes:**
```bash
mosquitto_sub -h localhost -t "etms/floor/1/mobile/7/heart_rate" -v | while read line; do
    echo "[$(date '+%H:%M:%S')] $line"
done
```

**Expected result:**
- New message every ~60 seconds (if Fast Always enabled)
- Heart rate values change with activity level

### 6.3 Test AI Correlation

**Simulate a fall event:**
1. Do jumping jacks for 60 seconds (elevate HR)
2. Sit down quickly (simulate fall via accelerometer)
3. Watch MQTT messages for:
   - Heart rate spike
   - Fall detection event
4. Your AI should correlate these and output "FALL_CONFIRMED"

---

## 📊 Monitoring Dashboard (Optional)

### Create Lovelace Dashboard in Home Assistant

```yaml
# Add to your Lovelace dashboard configuration
type: vertical-stack
cards:
  - type: entities
    title: Live Physiological Monitoring
    entities:
      - entity: sensor.health_connect_heart_rate
        name: Heart Rate
        icon: mdi:heart-pulse
      - entity: sensor.health_connect_resting_heart_rate
        name: Resting HR
        icon: mdi:heart
      - entity: sensor.health_connect_heart_rate_variability
        name: HRV
        icon: mdi:heart-flash
      - entity: sensor.health_connect_oxygen_saturation
        name: Blood Oxygen
        icon: mdi:water-percent
      - entity: sensor.health_connect_respiratory_rate
        name: Respiratory Rate
        icon: mdi:lungs
  
  - type: history-graph
    title: Heart Rate Trend (24h)
    entities:
      - sensor.health_connect_heart_rate
    hours_to_show: 24
  
  - type: gauge
    entity: sensor.health_connect_heart_rate
    min: 40
    max: 180
    severity:
      green: 60
      yellow: 100
      red: 120
    name: Real-Time Heart Rate
```

---

## 🔒 Security Considerations

### 7.1 Secure MQTT Broker

**Edit Mosquitto configuration:**
```yaml
# In Mosquitto add-on configuration:
logins:
  - username: mqtt_user
    password: STRONG_PASSWORD_HERE

anonymous: false

# Enable TLS (recommended for production)
certfile: fullchain.pem
keyfile: privkey.pem
require_certificate: false
```

### 7.2 Firewall Rules

**Only allow local connections to MQTT:**
```bash
sudo ufw allow from 192.168.1.0/24 to any port 1883
sudo ufw deny 1883
```

---

## 🐛 Troubleshooting

### Sensors Not Updating

**Check 1: Permissions**
```
Open Health Connect app
Settings → App permissions → Home Assistant
Ensure all health data types are allowed
```

**Check 2: Battery Optimization**
```
Settings → Battery → Battery optimization
Find: Home Assistant, Noise, Google Fit
Set to: "Not optimized"
```

**Check 3: Background Data**
```
Settings → Apps → Home Assistant → Mobile data & Wi-Fi
Enable: Background data
Enable: Unrestricted data usage
```

### MQTT Messages Not Publishing

**Check MQTT broker status:**
```bash
# In Home Assistant
Settings → Add-ons → Mosquitto broker
Check: Status should be "Running"
```

**Test MQTT connection:**
```bash
mosquitto_pub -h localhost -t "test/topic" -m "Hello World"
mosquitto_sub -h localhost -t "test/topic" -v
```

**Check automation logs:**
```
Settings → System → Logs
Filter: "automation"
Look for: Error messages related to MQTT publish
```

### Sensors Show "Unavailable"

**Common causes:**
1. Health Connect app not set up
2. Noise app not syncing data to Health Connect
3. Companion app doesn't have Health Connect permissions
4. Phone's location services disabled

**Solution:**
```
1. Open Noise app → Sync data manually
2. Open Health Connect → Check data sources
3. Open Home Assistant → Manage Sensors → Re-enable sensors
4. Restart Home Assistant app
```

---

## 📈 Next Steps

### Integration with Your AI Engine

1. **Connect your AI engine to MQTT:**
   ```python
   # Subscribe to health topics
   client.subscribe("etms/+/mobile/+/#")
   ```

2. **Implement the correlation logic:**
   - Fall + HR spike = Confirmed fall
   - No movement + Low HR = Critical event
   - Wandering + High HR + Low HRV = Anxiety alert

3. **Store historical data:**
   - Build baseline profiles for each person
   - Track patterns over days/weeks/months
   - Use machine learning for predictive analytics

4. **Create alert system:**
   - SMS notifications for caregivers
   - Emergency service integration
   - Dashboard for monitoring center

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] Health Connect sensors visible in Home Assistant
- [ ] Sensors update every 1-5 minutes
- [ ] MQTT broker running and accessible
- [ ] Automations active and publishing to MQTT
- [ ] MQTT messages contain correct JSON format
- [ ] AI engine receiving and processing messages
- [ ] Baseline calculations working
- [ ] Correlation logic detecting events correctly

---

## 🎓 Summary

You now have:
1. ✅ Real-time heart rate monitoring via Health Connect
2. ✅ HRV for stress/anxiety detection
3. ✅ Oxygen saturation for critical events
4. ✅ All data streaming to MQTT
5. ✅ AI-ready physiological monitoring system

**Your pipeline:**
```
Noise Watch → Google Fit → Health Connect → Home Assistant → MQTT → AI Engine → Actions
```

This is **production-grade** architecture using official APIs and supported integrations. No hacks, no workarounds—just solid engineering! 🔥

---

## 📚 Additional Resources

- [Home Assistant Companion App Documentation](https://companion.home-assistant.io/docs/core/sensors#health-connect-sensors)
- [Health Connect Developer Guide](https://developer.android.com/health-and-fitness/guides/health-connect)
- [MQTT Home Assistant Integration](https://www.home-assistant.io/integrations/mqtt/)
- [Home Assistant Automation Documentation](https://www.home-assistant.io/docs/automation/)

---

**Questions? Issues?** Open the guide and follow each step carefully. Every integration point is officially supported and documented. LET'S GO! 🚀
