var five = require("johnny-five"), board;

board = new five.Board({
  debug: true,
  port: "/dev/cu.MarkyBot-DevB" // remove this if you are using a cable, or amend it if using WiFi or Bluetooth

});


board.on("ready", function() {

  var speed = 150;

  motor1 = new five.Motor([10, 8]);
  motor2 = new five.Motor([9, 7]);

  board.repl.inject({
  	lmotor: motor1, 
  	rmotor: motor2,
  });

  require('net').createServer(function (socket) {

     socket.on('data', function (data) {

      switch ( data.toString()){

        case 'go':
          motor1.rev( speed );
          motor2.rev( speed );
          break;
        case 'turn left':
          motor1.fwd( speed * 0.5 );
          motor2.rev( speed * 0.5 );
          break;
        case 'turn right':
          motor1.rev( speed * 0.5 );
          motor2.fwd( speed * 0.5 );
          break;
        case 'disengage':
          motor1.stop();
          motor2.stop();
          break;
        default:
          console.log('Ignoring command: ' + data);
        }
        console.log(data.toString());
     });

  }).listen(9090);

});
