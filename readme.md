## Robot in Action ##
https://vimeo.com/115565297

##Disclaimer##
- This is my first JavaScript project.
- This is my first Google Speech project.
- This is my first Arduino project.
- This is my first Node.js project.
- This is my first Git project.
- This is my first GitHib project.

Get the picture?  I'm a complete newbie.  But I'm here to learn so if you have any comments or suggestions, let me know!

##Prerequisites##
- A recent version of the Chrome browser.
- An internet connection.
- A Pololu Zumo with Standard Firmata installed.
- Node.js / npm installed on your machine.

##Installation##
1. Install node.js.
1. Download the contents of this repo.
3. Run ‘npm install’ from source root to get the required node modules.
4. Note that due to the nature of Johnny-Five, Zumo needs to be connected to PC (for example via Cable, Bluetooth or WiFi).

##Running##
1. Connect Arduino Zumo
2. Run node arduino_module/zumo_controller.js
3. Run node speech_module/web_server_HTTPS.js

##Usage##
1. Connect to localhost:8080
2. Click Arnold.
3. See arduino_module/zumo_controller.js for valid commands.
4. Have fun!

##Known Problems##
1. Crashes when commands sent from webserver to arduino exceed a certain amount or are over a certain length (see http://stackoverflow.com/questions/27769842/write-after-end-error-in-node-js-webserver).

##ToDo##
1. Improve speed of speech recognition.
2. Add camera.
3. Add obstacle detection.
4. General refactoring and in line documentation.
5. Code review and more refactoring.
6. Add middleware (MQTT and node.red) to make this a real IOT demo.
7. Pass the Turing Test.
