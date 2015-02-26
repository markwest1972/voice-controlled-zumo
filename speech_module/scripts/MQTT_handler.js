/*
  Handles MQTT Communication between Browser and Robot
  ----------------------------------------------------

  1. Sends commands to the Robot.
  2. Recieves responses from the Robot and updates webpage.

*/
var subscribeTopic = "zumo/controller/responses";
var publishTopic = "zumo/controller/commands";

var options = {
  host: "broker.mqttdashboard.com",
  port: "8000"
};

var client = mqtt.connect(options);

client.subscribe(subscribeTopic);

client.on("message", function(topic, payload) {

  // List indicators
  var go = document.getElementById("go");
  var turnRight = document.getElementById("turnRight");
  var turnLeft = document.getElementById("turnLeft");
  var stop = document.getElementById("stop");

  // Trim and tidy up response
  var response = payload.toString().trim();

  // Process the response
  switch ( response ){

    case "go":
      go.className = "on";
      turnRight.className = "off";
      turnLeft.className = "off";
      stop.className = "off";
      break;

    case "turn right":
      go.className = "off";
      turnRight.className = "on";
      turnLeft.className = "off";
      stop.className = "off";
      break;

    case "turn left":
      go.className = "off";
      turnRight.className = "off";
      turnLeft.className = "on";
      stop.className = "off";
      break;

    case "disengage":
      go.className = "off";
      turnRight.className = "off";
      turnLeft.className = "off";
      stop.className = "on";
      break;
    }
});

/**
 * Sends command to Zumo over MQTT
 */
function sendToRobot(message){
  client.publish(publishTopic, message);
}
