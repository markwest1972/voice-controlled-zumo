/*
  Web Server (HTTP) for Speech Recognition Module
  -----------------------------------------------

  This file instansiates a Web Server that serves up the HTML page performing
  speech to text parsing.  The results are then returned to this server via a
  websocket connection (socket.io).

  The results are then published to a topic on a public MQTT Broker.

  The reason we are using a HTTP server is that Google Chrome repeatedly asks
  for permission to access the microphone, unless HTTPS is being used.  This
  slow down the speech to text parsing.

  As we are using HTTP, Google Chrome repeatedly asks for permission to access
  the microphone.  To avoid this, use the web_server_HTTPS.js file instead.

  Run this Webserver with the command "node web_server_HTTP.js".

*/

// Dependancies and declarations
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var log = true;
var mqtt = require('mqtt');

// We are using a public MQTT server, note that "test.mosquitto.org" delivered
// duplicate messages.  "broker.mqtt-dashboard.com" seems to be better, but
// has occasional downtime.
var mqttPort = "1883";
var mqttServer = "broker.mqtt-dashboard.com";
var mqttTopic = "zumo/controller/commands";
var mqttClient = mqtt.createClient(mqttPort, mqttServer);

// Required to serve the static files (i.e. images)
app.use(express.static(__dirname));

// Serves up HTML page
app.get('/', function(req, res){
  res.sendFile(__dirname+'/arduino_speech.html');
});

// Handles socket.io communication
io.on('connection', function(socket){

  // Commands received from HTML page
  socket.on('command', function(msg){

    // Log command if desired
    if (Boolean(log)){
      console.log('Received Command from HTML page [' + msg + '].');
    }

    // Publish command to MQTT
    mqttClient.publish(mqttTopic, msg);

    if (Boolean(log)){
      console.log('Forwarded Command to MQTT [' + msg + '].');
    }

    // Will be used for sending Ack back to Web Page
    //io.emit('command', msg);
  });
});

// Instansiate HTTP Listener
http.listen(8080, function(){
  if (Boolean(log)){
    console.log('HTTP listening on *:8080');
  }
});
