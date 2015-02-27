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
var mqtt = require("mqtt"); // MQTT Client

// Create a board instance, with serial port connection over Arduberry.
var board = new five.Board({
  //port: "/dev/cu.MarkyBot-DevB"
  port: "/dev/ttyAMA0"
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
    led: led
  });

  // Connect to the MQTT client connection
  var options = {
    host: "broker.mqttdashboard.com",
    port: "1883"
  };
  var mqttClient = mqtt.connect(options);
  var mqttSubscribeTopic = "zumo/controller/commands";
  var mqttPublishTopic = "zumo/controller/responses";

  mqttClient.on("connect", function() {

    if (Boolean(log)){
      console.log("Connected to MQTT Broker!");
    }

    // Subscribe to Zumo Commands
    mqttClient.subscribe(mqttSubscribeTopic, function() {

      // Process incoming messages
      mqttClient.on("message", function(topic, message, packet) {

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

            // Return command to Web Browser
            mqttClient.publish(mqttPublishTopic, command);

            break;

          // Turning is always done at the same speed
          case 'turn left':
            motor1.fwd( SPEED * 0.6 );
            motor2.rev( SPEED * 0.6 );

            // Return command to Web Browser
            mqttClient.publish(mqttPublishTopic, command);

            break;

          // Turning is always done at the same speed
          case 'turn right':
            motor1.rev( SPEED * 0.6 );
            motor2.fwd( SPEED * 0.6 );

            // Return command to Web Browser
            mqttClient.publish(mqttPublishTopic, command);

            break;

          // Full stop.
          case 'disengage':
            motor1.stop();
            motor2.stop();

            // Return command to Web Browser
            mqttClient.publish(mqttPublishTopic, command);

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
});
