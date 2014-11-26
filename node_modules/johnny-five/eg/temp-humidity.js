var five = require("../lib/johnny-five.js");
var board = new five.Board();

board.on("ready", function() {
  var temp = new five.Sensor("A0");

  temp.on("change", function() {
    console.log("10bit magnetic field value: %d", this.value);
  });

});
