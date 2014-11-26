var five = require("../lib/johnny-five.js");

new five.Board().on("ready", function() {
  var led = new five.Led("O0");

  this.repl.inject({
    l: led
  });
});

// @markdown
// - [TinkerKit Led](http://www.tinkerkit.com/led-red-10mm/)
// - [TinkerKit Shield](http://www.tinkerkit.com/shield/)
// @markdown
