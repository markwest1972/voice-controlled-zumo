// var five = require("../lib/johnny-five.js");
// var board = new five.Board();

// function scale(value) {
//   return five.Fn.map(value, 0, 1023, 0, 5000) | 0;
// }

// board.on("ready", function() {
//   var relay = new five.Relay(7);
//   var monitor = new five.Sensor("A0");
//   var isRelayOn = false;
//   var isCalibrated = false;
//   var readings = 0;
//   var VQ = 0;
//   var data = 0;

//   monitor.on("data", function() {
//     var isOn = false;
//     // 185 is the sensitivity rating for 20A
//     // var sensitivity = 185;

//     if (!isCalibrated) {
//       // Five seconds worth of initial readings
//       if (++readings === 220) {
//         VQ = scale(data / 220);
//         isCalibrated = true;
//         readings = 0;
//         console.log( "isCalibrated" );
//       }
//     } else {

//       if (++readings === 10) {

//         value = scale(data / 9);

//         if (Math.abs(value) !== VQ) {
//           console.log( "CHANGED" );
//           console.log( VQ, value, scale(this.value) );
//         } else {
//           console.log( "NO CHANGE" );
//         }

// console.log( VQ, value, scale(this.value) );

//         readings = 0;
//         data = 0;


//         // console.log( VQ, value, scale(this.value) );

//         if (this.value > 700) {
//           isOn = true;
//         }

//         if (isRelayOn !== isOn) {
//           isRelayOn = isOn;
//           console.log( "Relay is %s", isRelayOn ? "on" : "off" );
//         }
//       }
//     }

//     data += this.value;
//   });

//   this.repl.inject({
//     relay: relay,
//     scale: scale,
//     monitor: monitor
//   });
// });
