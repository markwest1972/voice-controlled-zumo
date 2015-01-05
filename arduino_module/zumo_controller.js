/*
  Johnny-Five interface to the Arduino Zumo
  -----------------------------------------

  Currently communicates with the arduino_speech webpage through a TCP listener
  running on 9090.  This will possibly be replaced by a message broker for a
  more robust solution.

  Run this with the command "node zumo_controller.js".

*/

// Requires Johnny-Five
var five = require("johnny-five");

// Create a board instance, with serial port connection over Bluetooth.
// Note that port should be updated to reflect the name of your Bluetooth
// connect or completely removed if you are using a USB Cable.
var board = new five.Board({
  port: "/dev/cu.MarkyBot-DevB"
});

// On board initialisation, perform the following
board.on("ready", function() {

  // Speed can be anything from 0 to 255
  var SPEED = 75;
  var currentSpeed = SPEED;
  var log = true;
  var command = "";


  // Initialise the two motors attached to the Zumo
  motor1 = new five.Motor([10, 8]);
  motor2 = new five.Motor([9, 7]);

  // Optionally add the motors to REPL, so they can be controlled manually
  /*board.repl.inject({
  	lmotor: motor1,
  	rmotor: motor2,
  });*/

  // Using the "net" library, create a listener on port 9090
  require('net').createServer(function (socket) {

    // On incoming data (a text string)
    socket.on('data', function (data) {

      // Log incoming data if logging is switched on
      if (Boolean(log)){
        console.log("Received Command ["+data.toString()+"]");
      }

      // Trim and tidy up command
      command = data.toString().trim();

      // Trim and tidy up string
      switch ( command ){

        // Go straight forwards.  Also resets speed to standard
        case 'go':
          currentSpeed = SPEED;
          motor1.rev( currentSpeed );
          motor2.rev( currentSpeed );
          if (Boolean(log)){
            console.log("Executing Command ["+command+"], Speed ["+currentSpeed+"]");
          }
          break;

        // Turning is always done at the same speed
        case 'turn left':
          motor1.fwd( SPEED * 0.75 );
          motor2.rev( SPEED * 0.75 );
          if (Boolean(log)){
            console.log("Executing Command ["+command+"]");
          }
          break;

        // Turning is always done at the same speed
        case 'turn right':
          motor1.rev( SPEED * 0.75 );
          motor2.fwd( SPEED * 0.75 );
          if (Boolean(log)){
            console.log("Executing Command ["+command+"]");
          }
          break;

        // Accelerate by increasing current speed by 10, will also interrupt
        // a turn or start motor if already stopped.
        case 'speed up':
          currentSpeed += 10;
          motor1.rev( currentSpeed );
          motor2.rev( currentSpeed );
          if (Boolean(log)){
            console.log("Executing Command ["+command+"], Speed ["+currentSpeed+"]");
          }
          break;

        // Decelerate by increasing current speed by 10, will also interrupt
        // a turn or start motor if already stopped.
        case 'slow down':
          currentSpeed -= 10;
          motor1.rev( currentSpeed );
          motor2.rev( currentSpeed );
          if (Boolean(log)){
            console.log("Executing Command ["+command+"], Speed ["+currentSpeed+"]");
          }
          break;

        // Full stop.
        case 'disengage':
          motor1.stop();
          motor2.stop();
          break;

        // If command doesn't match any of the above
        default:

          // Log ignored commands (if logging is switched on)
          if (Boolean(log)){
            console.log("Ignoring Command ["+command+"]");
          }

        }

     });

  }).listen(9090);

});
