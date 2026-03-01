#!/bin/bash

echo "========================================"
echo "Home Assistant MQTT Setup & Restart"
echo "========================================"
echo ""

# Set MQTT password
echo "Step 1: Setting MQTT password..."
sudo mosquitto_passwd -b /etc/mosquitto/passwd mqtt_user Pavan@2005
if [ $? -eq 0 ]; then
    echo "✅ MQTT password set successfully"
else
    echo "❌ Failed to set MQTT password"
    exit 1
fi
echo ""

# Restart Mosquitto
echo "Step 2: Restarting Mosquitto broker..."
sudo systemctl restart mosquitto
sleep 2
if sudo systemctl is-active --quiet mosquitto; then
    echo "✅ Mosquitto is running"
else
    echo "❌ Mosquitto failed to start"
    exit 1
fi
echo ""

# Test MQTT connection
echo "Step 3: Testing MQTT connection..."
mosquitto_pub -h localhost -u mqtt_user -P Pavan@2005 -t "test/setup" -m "test"
if [ $? -eq 0 ]; then
    echo "✅ MQTT connection successful"
else
    echo "❌ MQTT connection failed"
    exit 1
fi
echo ""

# Stop any running Home Assistant instances
echo "Step 4: Stopping any running Home Assistant instances..."
pkill -f "python -m homeassistant" 2>/dev/null
sleep 3
echo "✅ Stopped previous instances"
echo ""

# Start Home Assistant in background
echo "Step 5: Starting Home Assistant..."
cd /home/pavan/Desktop/Autism/core
nohup conda run -n homeassistant python -m homeassistant -c ./config > /tmp/homeassistant.log 2>&1 &
HA_PID=$!
echo "✅ Home Assistant started with PID: $HA_PID"
echo ""

# Wait for startup
echo "Step 6: Waiting for Home Assistant to start (30 seconds)..."
sleep 30

# Check if Home Assistant is running
if ps -p $HA_PID > /dev/null; then
    echo "✅ Home Assistant is running!"
else
    echo "❌ Home Assistant failed to start. Check logs:"
    echo "   tail -50 /tmp/homeassistant.log"
    exit 1
fi
echo ""

# Test Home Assistant web interface
echo "Step 7: Testing Home Assistant web interface..."
if curl -s http://localhost:8123 > /dev/null; then
    echo "✅ Home Assistant web interface is accessible"
else
    echo "⚠️  Web interface not yet ready (may need more time)"
fi
echo ""

echo "========================================"
echo "✅ Setup Complete!"
echo "========================================"
echo ""
echo "📋 Next Steps:"
echo "1. Access Home Assistant: http://localhost:8123"
echo "2. Go to Settings → Devices & Services"
echo "3. Verify MQTT integration is present"
echo "4. Check automations: Settings → Automations & Scenes"
echo ""
echo "📊 Monitor MQTT messages:"
echo "   mosquitto_sub -h localhost -u mqtt_user -P Pavan@2005 -t 'etms/#' -v"
echo ""
echo "📝 View logs:"
echo "   tail -f /tmp/homeassistant.log"
echo ""
echo "🔍 Check Home Assistant status:"
echo "   ps aux | grep homeassistant"
echo ""
