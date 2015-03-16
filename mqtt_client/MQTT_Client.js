/*
  Simple MQTT Client for testing purposes.
*/

var mqtt = require('mqtt');

// Create a client connection - choose your public MQTT Broker....

var options = {
  host: "test.mosca.io",
  port: "1883"
};


/*
var options = {
  host: "test.mosquitto.org",
  clientId: "mqttjs",
  protocolId: "MQIsdp",
  keepalive: 10,
  protocolVersion: 3,
  reconnectPeriod: 1000,
  clean: true
};*/

/*
var options = {
  host: "m2m.eclipse.org",
  protocolId: 'MQIsdp',
  protocolVersion: 3
};
*/

var client = mqtt.connect(options);
//var client = mqtt.createClient("8000", "test.mosquitto.org/mqtt");

client.on("connect", function() { // When connected

  // subscribe to a topic
  client.subscribe('zumo/controller/responses', function() {

    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
      client.end();
    });
  });

  // publish a message to a topic
  client.publish('zumo/controller/responses', 'disengage', function() {
    console.log("Message is published");
    //client.end(); // Close the connection when published
  });

});
