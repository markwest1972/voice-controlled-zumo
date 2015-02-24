/*
  Processes Feedback from Zumo (and WebSockets communication with Web Server)
  ---------------------------------------------------------------------------

  Performs HTML5 Speech Recognition in the browser and sends commands back to
  the Web Server via WebSockets.

  TODO : Send / Receive MQTT messages directly from here (using WebSockets).
*/

function switchEmOn() {

  var go = document.getElementById("go");
  go.className = "directionOn";

  var turnRight = document.getElementById("turnRight");
  turnRight.className = "directionOn";

  var turnLeft = document.getElementById("turnLeft");
  turnLeft.className = "directionOn";

  var stop = document.getElementById("stop");
  stop.className = "directionOn";

  /* -------------------- */

  var tiltUp = document.getElementById("tiltUp");
  tiltUp.className = "cameraOn";

  var tiltDown = document.getElementById("tiltDown");
  tiltDown.className = "cameraOn";

  var panLeft = document.getElementById("panLeft");
  panLeft.className = "cameraOn";

  var panRight = document.getElementById("panRight");
  panRight.className = "cameraOn";

  var center = document.getElementById("center");
  center.className = "cameraOn";

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

  /* -------------------- */

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
