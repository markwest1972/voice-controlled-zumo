/*
  Web Server (HTTPS) for Speech Recognition Module
  ------------------------------------------------

  This file instansiates a Web Server that serves up the HTML page performing
  speech to text parsing.  The results are then returned to this server via a
  websocket connection (socket.io).

  The results are then published to a topic on a public MQTT Broker.

  The reason we are using a HTTPS server is that Google Chrome repeatedly asks
  for permission to access the microphone, unless HTTPS is being used.  This
  slow down the speech to text parsing.

  We are using a self signed certicate I have created via OpenSSL.  Chrome
  doesn't like the self signed certificate, but you don't have to worry  about
  that for the sake of this example.

  Run this Webserver with the command "node web_server_HTTPS.js".

*/

// Definitions and dependancies
var express = require('express');
var mqtt = require('mqtt');
var app = express();
var fs = require('fs');
var options = {
  key: fs.readFileSync('cert/key.pem'),
  cert: fs.readFileSync('cert/cert.pem'),
  requestCert: true
};
var server = require('https').createServer(options, app);
var io = require('socket.io').listen(server);
var log = true;

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

    // Can be used for sending Ack back to Web Page
    //io.emit('command', msg);
  });
});

//HTTPS Server
server.listen(8080, function(){
  if (Boolean(log)){
    console.log('HTTPS listening on *:8080');
  }
});
