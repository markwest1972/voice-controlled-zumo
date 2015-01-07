##Summary##
The project consists of two modules:
- The *arduino_module* subscribes to a MQTT Topic and sends commands onwards to the Zumo via Johnny-Five.
- The *speech_module* consists of a webserver that (a) serves a web page that parses speech to text and (b) publishes the resulting text to the same MQTT Topic.

Note that I am currently using the Public MQTT Broker described here : http://www.hivemq.com/showcase/public-mqtt-broker/.  I'm using this as it's free and doesn't require a sign up, but it is occasionally down.

##Disclaimer##
I'm new to ALL the technologies used here (including GIT).  If you have suggestions for improvements, they will be gratefully received!

##Keywords##
Johnny-Five, MQTT, Arduino, npm, JavaScript, Google Speech, Zumo.

##Prerequisites##
- A recent version of the Chrome browser supporting *webkitSpeechRecognition* (note that Chrome on mobile devices may not work).
- An internet connection.
- A Pololu Zumo with Standard Firmata installed.  Other Arduino Robots can be used, but you may have to tinker with the zumo_controller to get things working.
- node.js / npm installed on your machine.

##Installation##
1. Download the contents of this repo.
2. Run ‘npm install’ from source root (voice_controlled_zumo) to get the required node modules.
3. Note that due to the nature of Johnny-Five, Zumo needs to be connected to the machine running the *arduino_module* (via a Cable, Bluetooth or WiFi connection).

##Running##
1. Make sure that the Zumo is connected.
2. Run node arduino_module/zumo_controller.js.
3. Run node speech_module/web_server_HTTPS.js (ignore all the complaints about the certificate).

##Usage##
1. Connect to https://localhost:8080 on the machine running the *speech_module*.
2. Click Arnold to start the speech to text parsing (using a microphone will give you better results).
3. See arduino_module/zumo_controller.js for valid commands.
4. Have fun!

##Troubleshooting##
1. Make sure that the Zumo is connected.
2. This solution uses a Public MQTT Server, make sure that it is up and running (see the MQTTserver variable ib the ).

##ToDo##
1. Improve speed of speech recognition.
2. Add support for systemwide variables.
3. Add temprature sensor.
4. Add obstacle detection.
5. Consider adding a video camera.
6. Code review.
7. Improve npm usage.
8. Feedback to webpage.
9. Pass the Turing Test.
10. Blog.
