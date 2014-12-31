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
2. Run node arduino_module/zumo-controller.js
3. Run node speech_module/index.js

##Usage##
1. Connect to localhost:8080
2. Click Arnold
3. Have fun!

##ToDo##
1. Improve speed of speech recognition.
2. Add camera.
3. Add obstacle detection.
4. General refactoring and in line documentation.
5. Add middleware (MQTT and node.red) to make this a real IOT demo.
6. Pass the Turing Test.
