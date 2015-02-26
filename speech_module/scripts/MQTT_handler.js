/*
  Processes Feedback from Zumo (and WebSockets communication with Web Server)
  ---------------------------------------------------------------------------

  Performs HTML5 Speech Recognition in the browser and sends commands back to
  the Web Server via WebSockets.

  TODO : Send / Receive MQTT messages directly from here (using WebSockets).
*/
//

// Connect
var options = {
  host: "broker.mqttdashboard.com",
  port: 8000/*,
  protocolId: 'MQIsdp',
  protocolVersion: 3*/
};

var mqttClient;

var subscribeTopic = "zumo/controller/responses";
//var publishTopic = "zumo/controller/commands";
var go = document.getElementById("go");
var turnRight = document.getElementById("turnRight");
var turnLeft = document.getElementById("turnLeft");
var stop = document.getElementById("disengage");

function setup(){
  mqttClient = mqtt.connect(options);
  mqttClient.subscribe(subscribeTopic);

  // On incoming messages
  mqttClient.on("message", function (mqttTopic, message) {

    console.log("Got message ["+message+"].");

    // Trim and tidy up command
    var command = message.toString().trim();

    // Process the command
    switch ( command ){

      // Go straight forwards.  Also resets speed to standard
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
        console.log("Processed message ["+message+"].");
        break;
      }

  });

}


//mqttClient.end();


/*window.onload = *//*function switchEmOn() {

  var go = document.getElementById("go");
  go.className = "on";

  var turnRight = document.getElementById("turnRight");
  turnRight.className = "on";

  var turnLeft = document.getElementById("turnLeft");
  turnLeft.className = "on";

  var stop = document.getElementById("stop");
  stop.className = "on";*/

  /* -------------------- */
/*
  var tiltUp = document.getElementById("tiltUp");
  tiltUp.className = "on";

  var tiltDown = document.getElementById("tiltDown");
  tiltDown.className = "on";

  var panLeft = document.getElementById("panLeft");
  panLeft.className = "on";

  var panRight = document.getElementById("panRight");
  panRight.className = "on";

  var center = document.getElementById("center");
  center.className = "on";

}

function switchEmOff() {

  var go = document.getElementById("go");
  go.className = "off";

  var turnRight = document.getElementById("turnRight");
  turnRight.className = "off";

  var turnLeft = document.getElementById("turnLeft");
  turnLeft.className = "off";

  var stop = document.getElementById("stop");
  stop.className = "off";
*/
  /* -------------------- */
/*
  var tiltUp = document.getElementById("tiltUp");
  tiltUp.className = "off";

  var tiltDown = document.getElementById("tiltDown");
  tiltDown.className = "off";

  var panLeft = document.getElementById("panLeft");
  panLeft.className = "off";

  var panRight = document.getElementById("panRight");
  panRight.className = "off";

  var center = document.getElementById("center");
  center.className = "off";
}
*/
