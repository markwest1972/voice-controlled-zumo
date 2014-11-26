var five = require("johnny-five"), board;

board = new five.Board({
  debug: true
});

board.on("ready", function() {

  var speed = 80;

  motor1 = new five.Motor([10, 8]);
  motor2 = new five.Motor([9, 7]);

  board.repl.inject({
  	lmotor: motor1,
  	rmotor: motor2,
  });

  require('net').createServer(function (socket) {
     console.log("connected");

     socket.on('data', function (data) {

        switch ( data.toString()){
        case 'faster':
          speed+=20;
          console.log(' => Up: ' + speed);
          motor1.rev( speed );
          motor2.rev( speed );
          break;
        case 'break':
          speed+=20;
          console.log(' => Down: ' + speed);
          motor1.fwd( speed );
          motor2.fwd( speed );
          break;
        case 'turn left':
          console.log(' => Left: ');
          motor1.fwd( speed * 0.5 );
          motor2.rev( speed * 0.5 );
          break;
        case 'turn right':
          console.log('right');
          motor1.rev( speed * 0.5 );
          motor2.fwd( speed * 0.5 );
          break;
        case 'stop':
          console.log(' => Stopping...');
          motor1.stop();
          motor2.stop();
          break;
        case 'reset':
          console.log(' => Speed to 80');
          speed = 80;
          break;
        default:
          console.log('Ignoring command: ' + data);
        }

        console.log(data.toString());
     });

  }).listen(9090);

});
