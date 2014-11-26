var five = require("../lib/johnny-five.js");
var board = new five.Board();

board.on("ready", function() {
  var led = new five.Led(13);
  var heart = new five.Sensor("A0");
  var alpha = 0.75;
  var oldValue = 0;

  heart.on("change", function() {
    var value = alpha * oldValue + (1 - alpha) * this.value;

    oldValue = value;

    console.log(value);

    // http://forum.arduino.cc/index.php?topic=209140.0
  });
});
