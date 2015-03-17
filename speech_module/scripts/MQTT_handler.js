/**
 * Handles MQTT Communication between Browser and Robot
 *  ----------------------------------------------------
 *
 *  1. Sends commands to the Robot.
 *  2. Recieves responses from the Robot and updates webpage.
 *
 */
var subscribeTopic = "zumo/controller/responses";
var publishTopic = "zumo/controller/commands";
//var options = { host: "test.mosca.io", port: "80" };
var options = { host: "broker.mqttdashboard.com", port: "8000" };

var client = mqtt.connect(options);

client.subscribe(subscribeTopic);

client.on("message", function(topic, payload) {

  // List indicators
  var go = document.getElementById("go");
  var turnRight = document.getElementById("turnRight");
  var turnLeft = document.getElementById("turnLeft");
  var stop = document.getElementById("stop");
  var tiltUp = document.getElementById("tiltUp");
  var tiltDown = document.getElementById("tiltDown");
  var center = document.getElementById("center");
  var panLeft = document.getElementById("panLeft");
  var panRight = document.getElementById("panRight");

  // Trim and tidy up response
  var response = payload.toString().split("|");

  //response = response.substr(0, response.indexOf("[") ).trim();

  // Process the response
  switch ( response[0].trim() ){

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

    case "centre":
      panLeft.className = "off";
      panRight.className = "off";
      tiltUp.className = "off";
      tiltDown.className = "off";
      center.className = "on";
      pan.innerHTML = "Pan:"+response[1].trim()+" ";
      tilt.innerHTML = "Tilt:"+response[2].trim()+" ";
      break;

    case "look up":
      panLeft.className = "off";
      panRight.className = "off";
      tiltUp.className = "on";
      tiltDown.className = "off";
      center.className = "off";
      tilt.innerHTML = "Tilt:"+response[1].trim()+" ";
      break;

    case "look down":
      panLeft.className = "off";
      panRight.className = "off";
      tiltUp.className = "off";
      tiltDown.className = "on";
      center.className = "off";
      tilt.innerHTML = "Tilt:"+response[1].trim()+" ";
      break;

    case "look left":
      panLeft.className = "on";
      panRight.className = "off";
      tiltUp.className = "off";
      tiltDown.className = "off";
      center.className = "off";
      pan.innerHTML = "Pan:"+response[1].trim()+" ";
      break;

    case "look right":
      panLeft.className = "off";
      panRight.className = "on";
      tiltUp.className = "off";
      tiltDown.className = "off";
      center.className = "off";
      pan.innerHTML = "Pan:"+response[1].trim()+" ";
      break;
    }
});

/**
 * Sends command to Zumo over MQTT
 */
function sendToRobot(message){
  client.publish(publishTopic, message);
}
