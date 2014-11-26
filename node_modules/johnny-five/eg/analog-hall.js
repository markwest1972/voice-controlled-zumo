var five = require("../lib/johnny-five.js");
var board = new five.Board();

board.on("ready", function() {
  var field = new five.Sensor("A1");

  field.on("change", function() {
    console.log("10bit magnetic field value: %d", this.value);
  });
});
