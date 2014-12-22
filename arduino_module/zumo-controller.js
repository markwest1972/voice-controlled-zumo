var five = require("johnny-five"), board;
//var songs = require("j5-songs");

board = new five.Board({
  debug: true,
  port: "/dev/cu.MarkyBot-DevB" // remove this if you are using a cable, or amend it if using WiFi or Bluetooth

});


board.on("ready", function() {

  var speed = 125;

  var piezo = new five.Piezo(3);

  motor1 = new five.Motor([10, 8]);
  motor2 = new five.Motor([9, 7]);

  board.repl.inject({
  	lmotor: motor1,
  	rmotor: motor2,
  });

  require('net').createServer(function (socket) {

     socket.on('data', function (data) {

      switch ( data.toString().trim() ){

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
        case 'reverse':
          motor1.fwd( speed );
          motor2.fwd( speed );
          break;
        case 'disengage':
          motor1.stop();
          motor2.stop();
          break;

        /*case 'sing':
          motor1.rev(0);
          motor2.rev(0);
          var song = songs.load('do-re-mi');
          piezo.play(song);
          break;*/
        default:
          console.log('Ignoring command: ' + data);
        }
        console.log("*"+data.toString()+"*");
     });

  }).listen(9090);

});
