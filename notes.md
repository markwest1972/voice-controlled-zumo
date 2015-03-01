#Notes#

##Commands##
**IP:** ssh pi@192.168.0.72

**Video Stream:** sudo ./mjpg_streamer -i "./input_uvc.so -y -n -r 640x480" -o "./output_http.so -w ./www”

##Resources##
* http://raspberrypihq.com/how-to-add-wifi-to-the-raspberry-pi - wifi setup
* http://readwrite.com/2014/04/09/raspberry-pi-projects-ssh-remote-desktop-static-ip-tutorial - static IP and remote desktop
* https://learn.adafruit.com/node-embedded-development/installing-node-dot-js -  install node.js
* https://www.dexterindustries.com/Arduberry/getting-started/loading-example-sketch - arduberry
* http://wolfpaulus.com/jounal/embedded/raspberrypi_webcam/#comments - streaming webcam

##Other##
**/dev/ttyAMA0**: Serial port for Johnny-Five when using Arduberry.

**Pan / Tilt**: - try for 10 degrees, use center to bring camera back, use range to control movement.  Also use VBAT for Power otherwise Raspberry PI resets.
* Pan - (R) 35, 45, 55, 65, 75, (85), 95, 105, 115, 125, 135v(L)
* Tilt - (U) 45, 55, 65, 75, (85), 95 105, 115, 125 (D)
