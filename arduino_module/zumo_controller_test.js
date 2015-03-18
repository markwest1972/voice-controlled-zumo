/**
 *  Zumo Controller
 *  ---------------
 *
 *  This module recieves commands through a public MQTT broker and sends them
 *  onwards to the Arduino Zumo Robot via Johnny-Five.
 *
 *  Run this module with the command "node zumo_controller.js".
 *
 */

// Main dependancies
var five = require("johnny-five"); // JavaScript -> Arduino

// Create a board instance, with serial port connection over Arduberry.
var board = new five.Board();

// On board initialisation, perform the following
board.on("ready", function() {

  // From Rick Waldron
  /*five.Motor.prototype.setPWM = function(pin, value) {
    if (this.io.pins[pin].mode !== this.io.MODES.SERVO) {
      this.io.pinMode(pin, this.io.MODES.SERVO);
    }

    this.io.servoWrite(pin, five.Fn.map(value, 0, 255, 0, 180));
  };*/

  // Initialise the two motors attached to the Zumo
//  var leftMotor = new five.Motor([11, 8]);
//  var rightMotor = new five.Motor([5, 7]);

  // Initialise the two servos used for Camera Pan and Tilt

  var tiltServo = new five.Servo({
    pin: 3,
    range: [ 45, 125 ],
    startAt: 85
  });
  var panServo = new five.Servo({
    pin: 5,
    range: [ 45, 135 ],
    startAt: 90
  });

  // Add the motors to REPL (useful if the robot needs shutting down)
  board.repl.inject({
    //left: leftMotor,
    //right: rightMotor,
    tilt: tiltServo,
    pan: panServo
  });
});
