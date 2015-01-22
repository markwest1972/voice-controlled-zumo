/*
  Zumo Controller
  ---------------

  This module recieves commands through a public MQTT broker and sends them
  onwards to the Arduino Zumo Robot via Johnny-Five.

  Run this module with the command "node zumo_controller.js".

*/

// Main dependancies
var five = require("johnny-five"); // JavaScript -> Arduino
var mqtt = require('mqtt'); // MQTT Client

// We are using a public MQTT server, note that "test.mosquitto.org" delivered
// duplicate messages.  "broker.mqtt-dashboard.com" seems to be better, but
// has occasional downtime.
var mqttPort = "1883";
var mqttServer = "broker.mqtt-dashboard.com";
var mqttTopic = "zumo/controller/commands";

// Create a board instance, with serial port connection over Bluetooth.
// Note that port should be updated to reflect the name of your Bluetooth
// connect or completely removed if you are using a USB Cable.
var board = new five.Board({
  port: "/dev/cu.MarkyBot-DevB"
});

// On board initialisation, perform the following
board.on("ready", function() {

  // Log incoming data if logging is switched on
  if (Boolean(log)){
    console.log("Connected to Johnny-Five!");
  }

  // Speed can be anything from 0 to 255
  var SPEED = 75;
  var currentSpeed = SPEED;
  var log = true;
  var command = "";

  // Initialise the two motors attached to the Zumo
  motor1 = new five.Motor([10, 8]);
  motor2 = new five.Motor([9, 7]);

  // Add the motors to REPL (useful if the robot needs shutting down)
  board.repl.inject({
    lmotor: motor1,
    rmotor: motor2,
  });

  // Connect to the MQTT client connection
  var mqttClient = mqtt.createClient(mqttPort, mqttServer);
  mqttClient.on('connect', function() {

    if (Boolean(log)){
      console.log("Connected to MQTT Broker!");
    }

    // Subscribe to Zumo Commands
    mqttClient.subscribe(mqttTopic, function() {

      // Process incoming messages
      mqttClient.on('message', function(topic, message, packet) {

        if (Boolean(log)){
          console.log("Received Command ["+command+"] from MQTT.");
        }

        // Trim and tidy up command
        command = message.toString().trim();

        // Process the command
        switch ( command ){

          // Go straight forwards.  Also resets speed to standard
          case 'go':
            currentSpeed = SPEED;
            motor1.rev( currentSpeed );
            motor2.rev( currentSpeed );
            if (Boolean(log)){
              console.log("Executing Command ["+command+"], Speed ["+currentSpeed+"].");
            }
            break;

          // Turning is always done at the same speed
          case 'turn left':
            motor1.fwd( SPEED * 0.75 );
            motor2.rev( SPEED * 0.75 );
            if (Boolean(log)){
              console.log("Executing Command ["+command+"].");
            }
            break;

          // Turning is always done at the same speed
          case 'turn right':
            motor1.rev( SPEED * 0.75 );
            motor2.fwd( SPEED * 0.75 );
            if (Boolean(log)){
              console.log("Executing Command ["+command+"].");
            }
            break;

          // Accelerate by increasing current speed by 10, will also interrupt
          // a turn or start motor if already stopped.
          case 'speed up':
            currentSpeed += 10;
            motor1.rev( currentSpeed );
            motor2.rev( currentSpeed );
            if (Boolean(log)){
              console.log("Executing Command ["+command+"], Speed ["+currentSpeed+"].");
            }
            break;

          // Decelerate by increasing current speed by 10, will also interrupt
          // a turn or start motor if already stopped.
          case 'slow down':
            currentSpeed -= 10;
            motor1.rev( currentSpeed );
            motor2.rev( currentSpeed );
            if (Boolean(log)){
              console.log("Executing Command ["+command+"], Speed ["+currentSpeed+"].");
            }
            break;

          // Full stop.
          case 'disengage':
            motor1.stop();
            motor2.stop();
            if (Boolean(log)){
              console.log("Executing Command ["+command+"].");
            }
            break;
            
          // If command doesn't match any of the above
          default:

            // Log ignored commands (if logging is switched on)
            if (Boolean(log)){
              console.log("Ignoring Command ["+command+"].");
            }
          }
        });
    });
  });

  // Publish a message (if we wish to send messages elsewhere)
  //client.publish('zumo/controller', 'my message', function() {
  //  console.log("Turn Right");
  //  mqttClient.end(); // Close the connection when published
  ///});

});
