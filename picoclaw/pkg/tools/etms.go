// Package tools provides the ETMS (Elderly Tracking & Monitoring System)
// tool implementations for PicoClaw integration with OpenClaw.
//
// These tools enable Telegram-based conversational queries about the
// monitored resident's status, health, location, and incident history.
//
// Tools:
//   - etms_status:    Overall system and resident status
//   - etms_health:    Current health vitals and trends
//   - etms_location:  Current location and movement info
//   - etms_incidents: Active/recent incident query
//   - etms_medical:   Resident medical profile
//   - etms_command:   Send commands to OpenClaw (resolve, escalate)

package tools

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

const (
	defaultOpenClawURL = "http://localhost:8200"
	httpTimeout        = 10 * time.Second
)

// ─── ETMS Status Tool ───────────────────────────────────────────

// ETMSStatusTool provides overall system status and resident summary.
type ETMSStatusTool struct {
	baseURL string
}

// NewETMSStatusTool creates a new ETMS status tool.
func NewETMSStatusTool(openclawURL string) *ETMSStatusTool {
	if openclawURL == "" {
		openclawURL = defaultOpenClawURL
	}
	return &ETMSStatusTool{baseURL: openclawURL}
}

func (t *ETMSStatusTool) Name() string { return "etms_status" }
func (t *ETMSStatusTool) Description() string {
	return "Get the overall ETMS system status including resident safety status, active incidents, and system health. Use when caregiver asks 'how is my mother?' or 'is everything okay?'"
}

func (t *ETMSStatusTool) Parameters() map[string]any {
	return map[string]any{
		"type":       "object",
		"properties": map[string]any{},
	}
}

func (t *ETMSStatusTool) Execute(ctx context.Context, args map[string]any) *ToolResult {
	// Fetch status, active incidents, and health in parallel
	statusData, err := httpGet(ctx, t.baseURL+"/api/status")
	if err != nil {
		return ErrorResult(fmt.Sprintf("Failed to reach OpenClaw: %v", err))
	}

	healthData, _ := httpGet(ctx, t.baseURL+"/api/context/health")
	locationData, _ := httpGet(ctx, t.baseURL+"/api/context/location")
	incidentsData, _ := httpGet(ctx, t.baseURL+"/api/incidents/active")

	result := map[string]any{
		"system":    statusData,
		"health":    healthData,
		"location":  locationData,
		"incidents": incidentsData,
	}

	jsonBytes, _ := json.MarshalIndent(result, "", "  ")
	return &ToolResult{
		ForLLM: fmt.Sprintf("ETMS System Status:\n%s\n\nUse this data to answer the caregiver's question about the resident's wellbeing in a friendly, reassuring manner. Include heart rate, SpO2, location, and any active alerts.", string(jsonBytes)),
	}
}

// ─── ETMS Health Tool ───────────────────────────────────────────

// ETMSHealthTool provides current health vitals and trends.
type ETMSHealthTool struct {
	baseURL string
}

// NewETMSHealthTool creates a new ETMS health tool.
func NewETMSHealthTool(openclawURL string) *ETMSHealthTool {
	if openclawURL == "" {
		openclawURL = defaultOpenClawURL
	}
	return &ETMSHealthTool{baseURL: openclawURL}
}

func (t *ETMSHealthTool) Name() string { return "etms_health" }
func (t *ETMSHealthTool) Description() string {
	return "Get current health vitals (heart rate, SpO2, steps, stress) and trends for the monitored resident. Use when caregiver asks about health, heart rate, oxygen levels, or vitals."
}

func (t *ETMSHealthTool) Parameters() map[string]any {
	return map[string]any{
		"type":       "object",
		"properties": map[string]any{},
	}
}

func (t *ETMSHealthTool) Execute(ctx context.Context, args map[string]any) *ToolResult {
	data, err := httpGet(ctx, t.baseURL+"/api/context/health")
	if err != nil {
		return ErrorResult(fmt.Sprintf("Failed to get health data: %v", err))
	}

	jsonBytes, _ := json.MarshalIndent(data, "", "  ")
	return &ToolResult{
		ForLLM: fmt.Sprintf("Current Health Data:\n%s\n\nPresent this data in a friendly way. Include heart rate range, current SpO2 percentage, step count, and stress level if available. Compare to baselines (normal HR: 60-100, normal SpO2: 95-100%%).", string(jsonBytes)),
	}
}

// ─── ETMS Location Tool ────────────────────────────────────────

// ETMSLocationTool provides current location and movement info.
type ETMSLocationTool struct {
	baseURL string
}

// NewETMSLocationTool creates a new ETMS location tool.
func NewETMSLocationTool(openclawURL string) *ETMSLocationTool {
	if openclawURL == "" {
		openclawURL = defaultOpenClawURL
	}
	return &ETMSLocationTool{baseURL: openclawURL}
}

func (t *ETMSLocationTool) Name() string { return "etms_location" }
func (t *ETMSLocationTool) Description() string {
	return "Get the current location and movement status of the monitored resident. Use when caregiver asks 'where is my mother?' or 'is she moving around?'"
}

func (t *ETMSLocationTool) Parameters() map[string]any {
	return map[string]any{
		"type":       "object",
		"properties": map[string]any{},
	}
}

func (t *ETMSLocationTool) Execute(ctx context.Context, args map[string]any) *ToolResult {
	data, err := httpGet(ctx, t.baseURL+"/api/context/location")
	if err != nil {
		return ErrorResult(fmt.Sprintf("Failed to get location data: %v", err))
	}

	jsonBytes, _ := json.MarshalIndent(data, "", "  ")
	return &ToolResult{
		ForLLM: fmt.Sprintf("Location Data:\n%s\n\nTell the caregiver which room the resident is in and how recently they were moving. If last_movement_age > 300 seconds (5 minutes), mention they may be resting.", string(jsonBytes)),
	}
}

// ─── ETMS Incidents Tool ───────────────────────────────────────

// ETMSIncidentsTool provides active and recent incident information.
type ETMSIncidentsTool struct {
	baseURL string
}

// NewETMSIncidentsTool creates a new ETMS incidents tool.
func NewETMSIncidentsTool(openclawURL string) *ETMSIncidentsTool {
	if openclawURL == "" {
		openclawURL = defaultOpenClawURL
	}
	return &ETMSIncidentsTool{baseURL: openclawURL}
}

func (t *ETMSIncidentsTool) Name() string { return "etms_incidents" }
func (t *ETMSIncidentsTool) Description() string {
	return "Get active and recent safety incidents. Use when caregiver asks 'any alerts?', 'what happened today?', or 'were there any problems?'"
}

func (t *ETMSIncidentsTool) Parameters() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"type": map[string]any{
				"type":        "string",
				"description": "Query type: 'active' for current incidents, 'recent' for history",
				"enum":        []string{"active", "recent"},
			},
		},
	}
}

func (t *ETMSIncidentsTool) Execute(ctx context.Context, args map[string]any) *ToolResult {
	queryType, _ := args["type"].(string)
	if queryType == "" {
		queryType = "active"
	}

	endpoint := "/api/incidents/active"
	if queryType == "recent" {
		endpoint = "/api/incidents/recent"
	}

	data, err := httpGet(ctx, t.baseURL+endpoint)
	if err != nil {
		return ErrorResult(fmt.Sprintf("Failed to get incidents: %v", err))
	}

	jsonBytes, _ := json.MarshalIndent(data, "", "  ")
	label := "Active Incidents"
	if queryType == "recent" {
		label = "Recent Incidents"
	}

	return &ToolResult{
		ForLLM: fmt.Sprintf("%s:\n%s\n\nSummarize the incidents in a friendly way. Explain severity levels (CRITICAL, HIGH_RISK, WARNING) in simple terms. If no incidents, reassure the caregiver that everything is fine.", label, string(jsonBytes)),
	}
}

// ─── ETMS Medical Tool ─────────────────────────────────────────

// ETMSMedicalTool provides resident medical profile information.
type ETMSMedicalTool struct {
	baseURL string
}

// NewETMSMedicalTool creates a new ETMS medical profile tool.
func NewETMSMedicalTool(openclawURL string) *ETMSMedicalTool {
	if openclawURL == "" {
		openclawURL = defaultOpenClawURL
	}
	return &ETMSMedicalTool{baseURL: openclawURL}
}

func (t *ETMSMedicalTool) Name() string { return "etms_medical" }
func (t *ETMSMedicalTool) Description() string {
	return "Get the resident's medical profile including conditions, medications, allergies, and emergency contacts. Use when caregiver asks about medical information or history."
}

func (t *ETMSMedicalTool) Parameters() map[string]any {
	return map[string]any{
		"type":       "object",
		"properties": map[string]any{},
	}
}

func (t *ETMSMedicalTool) Execute(ctx context.Context, args map[string]any) *ToolResult {
	data, err := httpGet(ctx, t.baseURL+"/api/medical/profile")
	if err != nil {
		return ErrorResult(fmt.Sprintf("Failed to get medical profile: %v", err))
	}

	jsonBytes, _ := json.MarshalIndent(data, "", "  ")
	return &ToolResult{
		ForLLM: fmt.Sprintf("Medical Profile:\n%s\n\nPresent medical information clearly. Note: this is sensitive information, present it respectfully.", string(jsonBytes)),
	}
}

// ─── ETMS Command Tool ─────────────────────────────────────────

// ETMSCommandTool sends commands to OpenClaw (resolve/escalate incidents).
type ETMSCommandTool struct {
	baseURL string
}

// NewETMSCommandTool creates a new ETMS command tool.
func NewETMSCommandTool(openclawURL string) *ETMSCommandTool {
	if openclawURL == "" {
		openclawURL = defaultOpenClawURL
	}
	return &ETMSCommandTool{baseURL: openclawURL}
}

func (t *ETMSCommandTool) Name() string { return "etms_command" }
func (t *ETMSCommandTool) Description() string {
	return "Send a command to the ETMS system. Can resolve or escalate incidents. Use when caregiver says 'cancel the alert', 'resolve the incident', or 'escalate now'."
}

func (t *ETMSCommandTool) Parameters() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"command": map[string]any{
				"type":        "string",
				"description": "Command to execute: 'resolve' or 'escalate'",
				"enum":        []string{"resolve", "escalate"},
			},
			"incident_id": map[string]any{
				"type":        "string",
				"description": "The incident ID to act on. If not specified, acts on the most recent active incident.",
			},
			"reason": map[string]any{
				"type":        "string",
				"description": "Optional reason for the action",
			},
		},
		"required": []string{"command"},
	}
}

func (t *ETMSCommandTool) Execute(ctx context.Context, args map[string]any) *ToolResult {
	command, ok := args["command"].(string)
	if !ok {
		return ErrorResult("command is required (resolve or escalate)")
	}

	incidentID, _ := args["incident_id"].(string)
	reason, _ := args["reason"].(string)

	// If no incident ID, find the most recent active one
	if incidentID == "" {
		activeData, err := httpGet(ctx, t.baseURL+"/api/incidents/active")
		if err != nil {
			return ErrorResult(fmt.Sprintf("Failed to get active incidents: %v", err))
		}

		if incidents, ok := activeData["incidents"].([]any); ok && len(incidents) > 0 {
			if first, ok := incidents[0].(map[string]any); ok {
				incidentID, _ = first["id"].(string)
			}
		}

		if incidentID == "" {
			return &ToolResult{
				ForLLM: "No active incidents found to act on.",
			}
		}
	}

	var endpoint string
	switch command {
	case "resolve":
		endpoint = fmt.Sprintf("/api/incident/%s/resolve", incidentID)
	case "escalate":
		endpoint = fmt.Sprintf("/api/incident/%s/escalate", incidentID)
	default:
		return ErrorResult(fmt.Sprintf("Unknown command: %s", command))
	}

	body := map[string]string{}
	if reason != "" {
		body["resolution"] = reason
	}

	data, err := httpPost(ctx, t.baseURL+endpoint, body)
	if err != nil {
		return ErrorResult(fmt.Sprintf("Failed to execute command: %v", err))
	}

	jsonBytes, _ := json.MarshalIndent(data, "", "  ")
	return &ToolResult{
		ForLLM: fmt.Sprintf("Command '%s' executed for incident %s:\n%s\n\nConfirm the action to the caregiver.", command, incidentID, string(jsonBytes)),
	}
}

// ─── HTTP Helpers ───────────────────────────────────────────────

func httpGet(ctx context.Context, url string) (map[string]any, error) {
	client := &http.Client{Timeout: httpTimeout}
	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}

	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("read body: %w", err)
	}

	var result map[string]any
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, fmt.Errorf("parse JSON: %w", err)
	}
	return result, nil
}

func httpPost(ctx context.Context, url string, data map[string]string) (map[string]any, error) {
	client := &http.Client{Timeout: httpTimeout}

	jsonData, _ := json.Marshal(data)
	req, err := http.NewRequestWithContext(ctx, "POST", url, strings.NewReader(string(jsonData)))
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("read body: %w", err)
	}

	var result map[string]any
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, fmt.Errorf("parse JSON: %w", err)
	}
	return result, nil
}
