var five = require("../lib/johnny-five.js");
var board = new five.Board();

function scale(value) {
  return five.Fn.map(value, 0, 1023, 0, 5000) | 0;
}

board.on("ready", function() {
  var relay = new five.Relay(7);
  var monitor = new five.Sensor("A0");
  var isRelayOn = false;

  monitor.on("data", function() {
    var isOn = false;

    if (scale(this.value) > 3300) {
      isOn = true;
    }

    if (isRelayOn !== isOn) {
      isRelayOn = isOn;
      console.log("Relay is %s", isRelayOn ? "on" : "off");
    }
  });

  this.repl.inject({
    relay: relay
  });
});
