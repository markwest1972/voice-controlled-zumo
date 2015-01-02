/**
 * Google Chrome will repeatedly ask for permission to access the microphone, unless
 * HTTPS is being used.  This slows down the speech recognition process, which
 * slows down the reaction time of the robot.
 *
 * This file sets off a HTTP server.  To avoid the aforementioned problem, try using the
 * indexHTTP.js server instead.
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var netsocket = require('net').Socket();

// Need this to serve the static files (i.e. images)
app.use(express.static(__dirname));

// Handles "GET" Requests
app.get('/', function(req, res){
  res.sendFile(__dirname+'/arduino-speech.html');
});

// Handles socket.io communication
io.on('connection', function(socket){
  socket.on('command', function(msg){

    console.log('command: ' + msg)

    // Sends command further to ardino module via TCP connection running on 9090
    netsocket.connect(9090);
    netsocket.write(msg);
    netsocket.end();

    //io.emit('command', msg);
  });
});

// HTTP Listener
http.listen(8080, function(){
  console.log('HTTP listening on *:8080');
});
