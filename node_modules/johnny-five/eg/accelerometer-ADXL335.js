var five = require("../lib/johnny-five.js");
var board = new five.Board();

board.on("ready", function() {


  var accel = new five.Accelerometer({
    pins: ["A3", "A4", "A5"],
    // ADXL335 has a zeroV of 305

    zeroV: 305
  });



  // accel.on("data", function(data) {
  //   console.log("raw: ", data);
  // });

  // accel.on("change", function(data) {
  //   console.log("change", this.x, this.y, this.z);
  // });


  accel.on("change", function(data) {

    // console.log("pitch", this.pitch);
    console.log("message", this.orientation);
  });
});

// @markdown
//
// - [Triple Axis Accelerometer, MMA7361](https://www.sparkfun.com/products/9652)
// - [Triple-Axis Accelerometer, ADXL326](http://www.adafruit.com/products/1018)
//
// - [Two or Three Axis Accelerometer, LIS344AL](http://www.st.ewi.tudelft.nl/~gemund/Courses/In4073/Resources/LIS344AL.pdf)
//
// @markdown
