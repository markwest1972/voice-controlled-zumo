var five = require("../lib/johnny-five.js");
var board = new five.Board();

board.on("ready", function() {
  var flash = new five.Led(13);

  // Inject the flash object into the REPL
  // to control the flash Led directly from
  // the command line!
  this.repl.inject({
    flash: flash
  });
});
