/**
 *  Web Server (HTTP) for Speech Recognition Module
 *  -----------------------------------------------
 *
 *  This file instansiates a Web Server that serves up the HTML page performing
 *  speech to text parsing.  The browser then interacts with the Robot via an
 *  MQTT broker.
 *
 *  As we are using HTTP, Google Chrome repeatedly asks for permission to access
 *  the microphone.  To avoid this, use the web_server_HTTPS.js file instead.
 *
 *  Run this Webserver with the command "node web_server_HTTP.js".
 *
 */

// Dependancies and declarations
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var log = true;

// Required to serve the static files (i.e. images)
app.use(express.static(__dirname));

// Serves up HTML page
app.get('/', function(req, res){
  res.sendFile(__dirname+'/arduino_speech.html');
});

// Instansiate HTTP Listener
http.listen(8080, function(){
  if (Boolean(log)){
    console.log('HTTP listening on *:8080');
  }
});
