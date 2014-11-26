var five = require("../lib/johnny-five.js");
var board = new five.Board();

board.on("ready", function() {
  var vibration = new five.Sensor({
    type: "digital",
    pin: 3
  });

  vibration.on("change", function() {
    console.log("Vibration measured @ %d", Date.now());
  });
});
