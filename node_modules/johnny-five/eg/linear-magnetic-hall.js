var five = require("../lib/johnny-five.js");
var board = new five.Board();

board.on("ready", function() {
  var hall = new five.Sensor("A0");
  var trigger = new five.Pin(2);

  hall.on("change", function() {
    console.log("10bit magnetic field value: %d", this.value);
  });


  this.repl.inject({
    trigger: function(value) {
      trigger.write(value);
    },
    toggle: function() {
      trigger.write(trigger.value ^= 1);
    }
  });
});
