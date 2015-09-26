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
//var board = new five.Board({ port: "/dev/ttyACM0" });
var board = new five.Board({ port: "/dev/ttyAMA0" });

// On board initialisation, perform the following
board.on("ready", function() {

  // Log
  console.log("Connected to Johnny-Five!");

  // Speed can be anything from 0 to 255
  var SPEED = 130;
  var PAN = 95;
  var TILT = 115;
  var command = "";
  var panState = PAN;
  var tiltState = TILT;

  // Initialise the motors and servos
  var leftMotor = new five.Motor([11, 8]);
  var rightMotor = new five.Motor([5, 7]);
  //var leftMotor = new five.Motor([10, 8]);
  //var rightMotor = new five.Motor([9, 7]);

  var tiltServo = new five.Servo({ pin: 4, range: [ 75, 155 ], startAt: 115 });
  var panServo = new five.Servo({ pin: 2, range: [ 45, 145 ], startAt: 95 });

  // Set up REPL (used mainly for demo and testing purposes)
  board.repl.inject({
    left: leftMotor,
    right: rightMotor,
    tilt: tiltServo,
    pan: panServo
  });

  // Set up MQTT Client
  //var options = { host: "test.mosca.io", port: "1883" };
  var options = { host: "broker.mqttdashboard.com", port: "1883" };
  var mqttClient = mqtt.connect(options);
  var mqttSubscribeTopic = "zumo/controller/commands";
  var mqttPublishTopic = "zumo/controller/responses";

  mqttClient.on("connect", function() {

    // Log status
    console.log("Connected to MQTT Broker!");

    // Reset Camera in Web Browser
    mqttClient.publish(mqttPublishTopic, "centre|" + PAN + "|" + TILT);

    // Subscribe to Zumo Commands
    mqttClient.subscribe(mqttSubscribeTopic, function() {

      // Process incoming messages
      mqttClient.on("message", function(topic, message, packet) {

        // Log incoming command
        console.log("Received Command ["+command+"] from MQTT.");

        // Trim and tidy up command
        command = message.toString().trim();

        // Process the command
        switch ( command ){

          // Go straight forwards.  Also resets speed to standard
          case "go":
            leftMotor.rev( SPEED );
            rightMotor.rev (SPEED );
            // Return command to Web Browser
            mqttClient.publish(mqttPublishTopic, command);

            break;

          // Turning is always done at the same speed
          case "turn left":
            leftMotor.fwd( SPEED * 0.5 );
            rightMotor.rev( SPEED * 0.5 );

            // Return command to Web Browser
            mqttClient.publish(mqttPublishTopic, command);

            break;

          // Turning is always done at the same speed
          case "turn right":
            leftMotor.rev( SPEED * 0.5 );
            rightMotor.fwd( SPEED * 0.5  );

            // Return command to Web Browser
            mqttClient.publish(mqttPublishTopic, command);

            break;

          // Full stop.
          case "disengage":
            leftMotor.stop();
            rightMotor.stop();

            // Return command to Web Browser
            mqttClient.publish(mqttPublishTopic, command);

            break;

          case "centre":

            panServo.to(PAN, 1000, 10);
            tiltServo.to(TILT, 1000, 10);

            // Return command to Web Browser
            mqttClient.publish(mqttPublishTopic, command + "|"+ PAN + "|"+TILT);

            break;

          case "look right":
            panServo.step(-10)

            // Return command to Web Browser
            mqttClient.publish(mqttPublishTopic, command + "|"+ panServo.position);

            break;

          case "look left":
            panServo.step(10)

            // Return command to Web Browser
            mqttClient.publish(mqttPublishTopic, command + "|"+ panServo.position);

            break;

          case "look up":
            tiltServo.step(-10)

            // Return command to Web Browser
            mqttClient.publish(mqttPublishTopic, command + "|"+ tiltServo.position);

            break;

          case "look down":
            tiltServo.step(10)

            // Return command to Web Browser
            mqttClient.publish(mqttPublishTopic, command + "|"+ tiltServo.position);

            break;

          // If command doesn't match any of the above
          default:

            // Log ignored commands
            console.log("Ignoring Command ["+command+"].");
          }
        });
      });
  });
});
