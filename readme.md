##Note##

The software for Version 1.0 of the Robot can be found [here](https://github.com/markwest1972/voice-controlled-zumo/releases/tag/v1.0).  The is a stable release of the Robot is based upon an Arduino Uno, Zumo Shield and JCY-MY Bluetooth module.

Version 2.0 of the Robot is now under development.  This utilises a Raspberry PI, and adds WiFi and a USB Web Camera to the mix.  Note that the contents of the Master Branch will be unstable during the development process.

--------

##Summary##
This project facilitates the control of a Ardunio based Robot via voice commands through a web page.

The bulk of this project consists of these two modules:
- The **arduino_module** subscribes to a MQTT Topic and sends commands onwards to the Zumo via Johnny-Five.
- The **speech_module** consists of a webserver that (a) serves a web page that parses speech to text and (b) publishes the resulting text to the same MQTT Topic.

The other project modules are used for configuration of the Bluetooth module and MQTT Testing.

Note that I am currently using the Public MQTT Broker described [here](http://www.hivemq.com/showcase/public-mqtt-broker/).  I'm using this as it's free and doesn't require a sign up, but it is occasionally down.  An alternative can be found [here](http://test.mosquitto.org).

This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.

##Further Reading##
1. [My Blogpost about Google Speech Recognition](http://blogg.bouvet.no/2014/11/11/getting-started-with-html5-speech-recognition-on-google-chrome/).
2. [My Blogpost about Getting Started with Johnny-Five](http://blogg.bouvet.no/2014/12/30/learning-javascript-and-arduino-programming-with-johnny-five/).
3. [My Blogpost about This Project](http://blogg.bouvet.no/2015/01/11/voice-controlling-a-robot-using-arduino-node-js-mqtt-websockets-johnny-five-and-html5-speech-recognition/).

##Disclaimer##
I'm new to ALL the technologies used here (including GIT).  If you have suggestions for improvements, they will be gratefully received!

##Keywords##
Johnny-Five, MQTT, Arduino, npm, JavaScript, Google Speech, Zumo.

##Prerequisites##
- A recent version of the **Chrome browser** supporting *webkitSpeechRecognition* (note that Chrome on mobile devices may not work).
- An internet connection.
- A **Pololu Zumo** with Standard Firmata installed.  Other Arduino Robots can be used, but you may have to tinker with the zumo_controller to get things working.
- **node.js / npm** installed on your machine.

##Installation##
1. Download the contents of this repo.
2. Run **npm install** from source root (*voice_controlled_zumo*) to get the required node modules.
3. Note that due to the nature of Johnny-Five, Zumo needs to be connected to the machine running the **arduino_module** (via a Cable, Bluetooth or WiFi connection).

##Running##
1. Make sure that the Zumo is connected.
2. Run **node arduino_module/zumo_controller.js**.
3. Run **node speech_module/web_server_HTTPS.js** (ignore all the complaints about the certificate).

##Usage##
1. Connect to https://localhost:8080 on the machine running the **speech_module**.
2. Click Arnold to start the speech to text parsing (using a microphone will give you better results).
3. See **arduino_module/zumo_controller.js** for valid commands.
4. Have fun!

##Troubleshooting##
1. Make sure that the Zumo is connected.
2. This solution uses a Public MQTT Server, make sure that it is up and running (see the MQTTserver variable in the source code - there are two brokers you can currently choose from).
3. If you have problems with the HTTPS Server, try running **node speech_module/web_server_HTTP.js** instead.

##ToDo##
1. Branch version 1.
2. Start version 2 with a big refactor (based on Code Reviews I have received).
3. Add temprature sensor with feedback to Webpage.
4. Add collision detection / onstacle avoidance.
5. Investigate adding a video camera.
6. Improve npm usage.
7. Add "Last Will And Testament" to MQTT Broker so that disconnect pushes "disengage" to robot.
8. Pass the Turing Test.
9. "Open the Pod Bay doors Hall".
