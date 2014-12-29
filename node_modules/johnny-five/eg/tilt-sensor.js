var five = require("../lib/johnny-five.js");
var board = new five.Board();

board.on("ready", function() {
  var tilt = new five.Digital(7);

  tilt.on("change", function() {
    // console.log( this.value );
    // if (this.value) {
    //   console.log("TILT!");
    // }
  });


  tilt.on("data", function() {
    console.log(this.value);
  });
});
