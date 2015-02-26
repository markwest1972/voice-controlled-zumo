/*
  Web Server (HTTPS) for Speech Recognition Module
  ------------------------------------------------

  This file instansiates a Web Server that serves up the HTML page performing
  speech to text parsing.  The browser then interacts with the Robot via an
  MQTT broker.

  The reason we are using a HTTPS server is that Google Chrome repeatedly asks
  for permission to access the microphone, unless HTTPS is being used.  This
  slow down the speech to text parsing.

  We are using a self signed certicate I have created via OpenSSL.  Chrome
  doesn't like the self signed certificate, but you don't have to worry about
  that for the sake of this example.

  Run this Webserver with the command "node web_server_HTTPS.js".

*/

// Definitions and dependancies
var express = require('express');
var app = express();
var fs = require('fs');
var options = {
  key: fs.readFileSync('certificate/key.pem'),
  cert: fs.readFileSync('certificate/cert.pem'),
  requestCert: true
};
var server = require('https').createServer(options, app);
var log = true;

// Required to serve the static files (i.e. images)
app.use(express.static(__dirname));

// Serves up HTML page
app.get('/', function(req, res){
  res.sendFile(__dirname+'/arduino_speech.html');
});

//HTTPS Server
server.listen(8080, function(){
  if (Boolean(log)){
    console.log('HTTPS listening on *:8080');
  }
});
