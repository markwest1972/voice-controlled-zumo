var five = require("../lib/johnny-five.js");
var board = new five.Board();

board.on("ready", function() {
  var laser = new five.Led(9);
  var led = new five.Led(13);
  var detection = new five.Sensor("A0");
  var isSecure = false;

  laser.on();

  detection.scale(0, 2).on("change", function() {
    var reading = !(this.value | 0);

    if (isSecure !== reading) {
      isSecure = reading;

      if (!isSecure) {
        console.log("Intruder");
        led.on();
      } else {
        led.off();
      }
    }
  });
});
