#include <M5StickCPlus.h>
#include <Triangle.h>
#include <WiFi.h>
#include "time.h"


const char* ssid     = "sypl";
const char* password = "ser760172";

void setup(){
  // Initialize the M5StickCPlus object. Initialize the M5StickCPlus object
  M5.begin();

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    M5.Lcd.println("Connecting to WiFi...");
  }
  M5.Lcd.println("Connected to WiFi");

  // Initialise three nodes
  Point node_1 = Point(2.0, 5.0);
  Point node_2 = Point(3.0, 1.0);
  Point node_3 = Point(5.0, 3.0);

  // Initialise a triangle
  Triangle triangle = Triangle(node_1, node_2, node_3);
  Point estimated_point = triangle.getTriangulation(2.236, 2.0, 2.0);

  double x = estimated_point.getX(); // To get 'x' coordinate
  double y = estimated_point.getX(); // To get 'y' coordinate
  M5.Lcd.println(x);
  M5.Lcd.println(y);
  M5.Lcd.println(WiFi.macAddress());



  // Initialize time
  configTime(0, 0, "pool.ntp.org", "time.nist.gov");
  M5.Lcd.println("Synchronizing time...");
  delay(1000); // Wait for time to synchronize
}



void loop() {
  time_t now;
  struct tm timeinfo;
  time(&now);
  localtime_r(&now, &timeinfo);

  // Check if time was set, if not, print an error.
  if (timeinfo.tm_year < (2016 - 1900)) {
    M5.Lcd.println("Failed to obtain time");
    return;
  }

  // Print the current time and date on the LCD
  M5.Lcd.fillScreen(BLACK);
  M5.Lcd.setCursor(0, 0);
  M5.Lcd.printf("%04d-%02d-%02d %02d:%02d:%02d", 
                timeinfo.tm_year + 1900, timeinfo.tm_mon + 1, timeinfo.tm_mday, 
                timeinfo.tm_hour, timeinfo.tm_min, timeinfo.tm_sec);

  delay(1000); // Update the time every second
}