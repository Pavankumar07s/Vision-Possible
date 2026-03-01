# ETMS — AI-Powered Safety Infrastructure for Semi-Independent Living

## Overview

**ETMS (Elderly Tracking & Monitoring System)** is a distributed, event-driven AI safety platform designed for semi-independent living environments.

The system integrates **vision intelligence**, **physiological monitoring**, **behavioral anomaly detection**, **indoor positioning**, **contextual AI reasoning**, and **deterministic emergency orchestration**.

ETMS operates primarily on edge hardware and is designed with **privacy**, **modularity**, and **safety-critical reliability** as first-class principles.

---

## Problem Statement

Semi-independent living environments require a balance between **autonomy** and **safety**.

Traditional monitoring systems either:

- Provide insufficient context (simple threshold alerts), or
- Require intrusive human supervision.

ETMS is designed to function as an **invisible safety net** — continuously monitoring for risk while preserving privacy and independence.

---

## System Architecture

ETMS follows a **distributed microservices architecture**. Each service has a single responsibility and communicates through an event-driven message broker (MQTT).

### High-Level Architecture

```
Sensors & Cameras
        ↓
Detection Microservices
        ↓
Event Bus (MQTT)
        ↓
Contextual AI Layer (Vision Agent)
        ↓
Fusion Engine
        ↓
OpenClaw (Deterministic Orchestration)
        ↓
PicoClaw (Caregiver Interface & Execution Layer)
        ↓
Emergency Systems & Notifications
```

### Core Architectural Principles

1. **Single Responsibility** per Microservice
2. **Deterministic Emergency Policy**
3. **Separation of Observation and Decision**
4. **Edge-First Processing**
5. **Explainable Contextual Reasoning**
6. **No AI Override of Safety Policy**

---

## Microservices Overview

### 1. Vision Service

Performs real-time:

- Person detection
- Multi-object tracking
- Pose estimation
- Behavioral pattern extraction

Detects:

- Falls
- Wandering
- Zone violations
- Gait abnormalities
- Erratic movement

Publishes structured events to MQTT.

**Example event:**

```json
{
  "event": "FALL_DETECTED",
  "confidence": 0.91,
  "camera_id": "bedroom_1",
  "timestamp": "..."
}
```

> The Vision Service does **not** make final decisions.

---

### 2. Fall Detection Service

Wearable-based fall detection using motion and impact analysis.

**Signals:**

- Impact threshold
- Orientation change
- Post-impact inactivity

Publishes structured fall events to the event bus.

---

### 3. Health Anomaly Service

Monitors physiological data:

- Heart rate
- SpO2
- HRV trends
- Baseline deviation

Detects abnormal physiological states and publishes anomaly scores.

---

### 4. Inactivity Detection Service

Monitors absence of motion over configurable thresholds.

**Correlates:**

- Wearable movement
- Vision presence
- Room occupancy

Detects prolonged inactivity risks.

---

### 5. Indoor Tracking Service

Hybrid indoor positioning system using **WiFi** and **LoRa**.

**Provides:**

- Room-level positioning
- Floor-level identification
- Geofencing capability

Location data is continuously published to MQTT.

---

### 6. SmartGuard Behavioral Anomaly Engine

Unsupervised behavior anomaly detection.

Learns daily patterns such as:

- Device usage
- Room transitions
- Time-of-day routines

Flags deviations **without** manual rule definitions.

Publishes anomaly scores and sequence-level risk signals.

---

### 7. Vision Agent (Contextual Reasoning Layer)

The Vision Agent performs **cross-modal reasoning**.

It subscribes to:

- Vision events
- Health anomalies
- Behavioral anomaly signals
- Location updates

It generates contextual safety assessments and **explainable summaries**.

**Example contextual output:**

```
Unusual nighttime pacing combined with elevated heart rate and deviation from routine.
```

> The Vision Agent enriches context but does **not** override safety policy.

---

### 8. AI Fusion Engine

Aggregates all signals and assigns severity levels.

| Severity Level | Description |
|----------------|-------------|
| **Monitor** | Normal observation, no action required |
| **Warning** | Mild deviation detected |
| **High Risk** | Significant concern, attention needed |
| **Critical** | Immediate intervention required |

The Fusion Engine operates **deterministically** and passes severity classification to OpenClaw.

---

### 9. OpenClaw — Deterministic Emergency Orchestration

OpenClaw is the **central policy engine**.

**Responsibilities:**

- Aggregate full incident context
- Apply strict escalation policies
- Manage incident lifecycle
- Trigger voice confirmation
- Dispatch emergency calls
- Send structured emergency packets

**Example escalation logic:**

```python
IF fall_detected AND abnormal_vitals:
    escalate_to_critical
ELSE IF fall_detected AND no_movement > threshold:
    escalate_to_high_risk
ELSE:
    monitor
```

> OpenClaw ensures safety decisions are **rule-based** and **deterministic**.

---

### 10. PicoClaw — Lightweight Interface & Execution Layer

PicoClaw provides:

- Telegram caregiver interface
- Real-time status queries
- Incident history access
- Alert relay
- Voice interaction triggers

Caregivers can query system state in **natural language**.

All responses are generated from structured data.

---

## Voice Interaction Layer

Integrated with **Home Assistant** and **Amazon Alexa**.

**Capabilities:**

- Voice-based safety confirmation
- Post-fall check (*"Are you okay?"*)
- Escalation timer logic
- Voice reassurance during emergencies

> If no response is received within a configured timeout, escalation proceeds **automatically**.

---

## Event Flow Example

**Example fall scenario:**

```
1. Fall Detection Service publishes event.
2. Health Service reports abnormal heart rate.
3. Inactivity Service confirms no movement.
4. Location Service identifies room and floor.
5. Vision Agent enriches context.
6. Fusion Engine assigns severity.
7. OpenClaw triggers voice confirmation.
8. If no response → emergency escalation begins.
9. Structured emergency packet is generated and dispatched.
```

---

## Communication Model

| Property | Value |
|----------|-------|
| **Protocol** | MQTT |
| **Architecture** | Publish-Subscribe |
| **Payload Format** | Structured JSON |
| **Broker** | Local, authenticated |

All services communicate **asynchronously**.

---

## Security & Privacy

- **Edge-first processing** — data stays local
- **No mandatory cloud dependency**
- **Structured data exchange** — no raw video transmission
- **Optional non-persistent video handling**
- **Encrypted internal communication**
- **Strict separation** of reasoning and decision layers

> The system is designed to preserve **autonomy** and minimize intrusive monitoring.

---

## Deployment Overview

ETMS can be deployed on:

- **Edge compute device** (Jetson or similar)
- **Local server**
- **Distributed IoT boards** for sensing
- **Home Assistant** integration layer

Microservices can be containerized using **Docker**.

---

## Future Extensions

- [ ] Predictive pre-fall modeling
- [ ] Long-term health trend analysis
- [ ] Multi-resident scaling
- [ ] Incident replay generation
- [ ] Telehealth integration
- [ ] Secure medical profile integration

---

## Design Philosophy

ETMS is **not** a single AI model.

It is a **distributed safety infrastructure** that:

- 🔍 **Observes** through multiple modalities
- 🔗 **Correlates** signals across time
- 🛡️ **Applies** deterministic safety policy
- ⚡ **Acts** autonomously when required
- 🤝 **Preserves** human dignity and independence

---


