/*
  HTTP Web Server for Speech Recognition Module
  ---------------------------------------------

  This instansiates a Web Server that serves up the HTML page for Speech
  Recognition.  The HTML page sends commands back to this server via sockets.io.
  These commands are then sent further to the Arduino Zumo Controller.

  Google Chrome repeatedly asks for permission to access the microphone.  To
  avoid this, use the web_server_HTTPS.js file instead.

  Use "node web_server_HTTP.js" to run this Web Server.

*/

// Dependancies and declarations
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var netSocket = require('net').Socket();
var log = true;

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

    // Log command is desired
    if (Boolean(log)){
      console.log('"Received Command from HTML page [: ' + msg + ']');
    }

    // Sends command further to ardino module via TCP connection running on 9090
    netSocket.connect(9090);
    netSocket.write(msg);
    netSocket.end();

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
