/*
  Processes Feedback from Zumo (and WebSockets communication with Web Server)
  ---------------------------------------------------------------------------

  Performs HTML5 Speech Recognition in the browser and sends commands back to
  the Web Server via WebSockets.

  TODO : Send / Receive MQTT messages directly from here (using WebSockets).
*/

function switchEmOn() {

  var go = document.getElementById("go");
  go.className = "on";

  var turnRight = document.getElementById("turnRight");
  turnRight.className = "on";

  var turnLeft = document.getElementById("turnLeft");
  turnLeft.className = "on";

  var stop = document.getElementById("stop");
  stop.className = "on";

  /* -------------------- */

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
