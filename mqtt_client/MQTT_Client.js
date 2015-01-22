/*
  Simple MQTT Client for testing purposes.
*/

var mqtt = require('mqtt');
url = require('url');

// Create a client connection - choose your public MQTT Broker....
//var client = mqtt.createClient("1883", "test.mosquitto.org");
var client = mqtt.createClient("1883", "broker.mqtt-dashboard.com");

client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe('zumo/controller/commands', function() {
    
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });

  // publish a message to a topic
  //client.publish('zumo/controller/commands', 'disengage', function() {
  //  console.log("Message is published");
  //  client.end(); // Close the connection when published
  //});
});
