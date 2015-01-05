/*
  Johnny-Five interface to the Arduino Zumo
  -----------------------------------------

  Currently communicates with the Web Site through a TCP listener
  running on 9090.  This will be eventually replaced by some kind of
  message broker for a more robust solution.

  Use "node zumo_controller.js" to run this.

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

  // List of commands
  var ExecuteCommands = {

    // Go straight forwards.  Also resets speed to standard
    'go': function() {
      currentSpeed = SPEED;
      motor1.rev( currentSpeed );
      motor2.rev( currentSpeed );
    },

    // Turning is always done at the same speed
    'turn left': function() {
      motor1.fwd( SPEED * 0.75 );
      motor2.rev( SPEED * 0.75 );
    },

    // Turning is always done at the same speed
    'turn right': function() {
      motor1.rev( SPEED * 0.75 );
      motor2.fwd( SPEED * 0.75 );
    },

    // Accelerate by increasing current speed by 10, will also interrupt
    // a turn or start motor if already stopped.
    'speed up': function() {
      currentSpeed += 10;
      motor1.rev( currentSpeed );
      motor2.rev( currentSpeed );
    },

    // Decelerate by increasing current speed by 10, will also interrupt
    // a turn or start motor if already stopped.
    'slow down': function() {
      currentSpeed -= 10;
      motor1.rev( currentSpeed );
      motor2.rev( currentSpeed );
    },

    // Full stop.
    'disengage': function() {
      motor1.stop();
      motor2.stop();
    }

  };

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

      // Log data to be processed if logging is switched on
      if (Boolean(log)){
        console.log("Processing Command ["+command+"]");
      }

      if(ExecuteCommands.indexOf(command) == 0)
      {
        // Log ignored commands (if logging is switched on)
        if (Boolean(log)){
          console.log("Ignoring Command ["+command+"]");
        }
      }
      else
      {
        ExecuteCommands[command];
      }
    });

  }).listen(9090);

});
