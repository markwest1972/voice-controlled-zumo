var five = require("../lib/johnny-five.js");
var board = new five.Board();

function scale(value) {
  return five.Fn.scale(value, 1023, 0, 0, 100);
}

board.on("ready", function() {
  var touch = new five.Sensor("A0");
  var tuner = new five.Pin(6);

  touch.on("change", function() {
    var value = scale(this.value);

    if (value) {
      console.log("Touch:", value);
    }
  });

  this.repl.inject({
    toggle: function() {
      // Turn tuner on/off
      tuner.write(tuner.value ^= 1);
    }
  });
});
