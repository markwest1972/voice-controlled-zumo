var five = require("johnny-five"), board;

board = new five.Board({
  debug: true,
  port: "/dev/cu.MarkyBot-DevB"

});


board.on("ready", function() {

<<<<<<< HEAD
  var speed = 150;
=======
  var speed = 0;
>>>>>>> FETCH_HEAD

  motor1 = new five.Motor([10, 8]);
  motor2 = new five.Motor([9, 7]);

  board.repl.inject({
  	lmotor: motor1, 
  	rmotor: motor2,
  });

  require('net').createServer(function (socket) {

     socket.on('data', function (data) {

        switch ( data.toString()){
<<<<<<< HEAD
        case 'go':
          motor1.rev( speed );
          motor2.rev( speed );
          break;
=======
        case 'forwards':
          speed=100;
          motor1.rev( speed );
          motor2.rev( speed );
          break;
        case 'slower':
          speed-=20;
          motor1.rev( speed );
          motor2.rev( speed );
          break;
        case 'faster':
          speed+=20;
          motor1.rev( speed );
          motor2.rev( speed );
          break;
>>>>>>> FETCH_HEAD
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
<<<<<<< HEAD
=======
        case 'reset':
          speed = 80;
          motor1.rev( speed );
          motor2.rev( speed );
          break;
>>>>>>> FETCH_HEAD
        default:
          console.log('Ignoring command: ' + data);
        }

        console.log(data.toString());
     });

  }).listen(9090);

});
