var five = require("../lib/johnny-five.js");
var board = new five.Board();
var scale = five.Fn.scale;

board.on("ready", function() {

  var accel = new five.Accelerometer({
    pins: ["I0", "I1"],
    freq: 100
  });

  var led = new five.Led("O0");

  accel.on("data", function() {
    console.log(this.orientation);
  });
});
