/**
 *  HTML5 Speech Recognition
 *  ------------------------
 *
 *  Performs HTML5 Speech Recognition in the browser and sends commands to
 *  MQTT_handler.js for further processing.
 *
 */

// Declarations
var parsingInProgress = false;
var transcript = "";
var lastCommand = "";
var command = "";

function checkForWebkitSpeechRecognition(){

  if ((!"webkitSpeechRecognition" in window))
    // Browser doesn't support WebkitSpeechRecognition
    errorReport.innerHTML = "<br>Speech recognition is not available via this " +
                          "device or browser.";
    parsingInProgress = false;
    startImage.src = "images/speech_recognition_error.png";
  }
}

// Requires webkitSpeechRecognition.
if (("webkitSpeechRecognition" in window)) {

  var recognition = new webkitSpeechRecognition();

  // Are we performing continuous recognition or not?
  // Note : If this is false, we may want to trigger a restart at onend!
  recognition.continuous = true;

  // Do we want interim results or not (true means yes)
  recognition.interimResults = true;

  // Triggered on start of Voice Recognition attempt
  recognition.onstart = function() {

    parsingInProgress = true;
    errorReport.innerHTML = "";

    // Update image to show recording in progress
    var startButton = document.getElementById("startButton");
    startButton.className = "speechRecognitionOn";
  }

  // Triggered on return of interim and final results
  recognition.onresult = function(event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {

        // Pick up the command string
        command = event.results[i][0].transcript ;

        // If the latest command is different from the previous,
        // send it to the robot.  This avoids unecessary traffic.
        // TODO : Extend this to ignore all not arduino commands?
        if (command != lastCommand){

          // Send command back to Web Server
          sendToRobot(event.results[i][0].transcript);

          // Add latest command to transcript
          transcript =  "<font color='gray'><i>Sending '" + command +
                        "' to Robot, Last Command Sent was '" +
                        lastCommand + "'. </i></font><br><br>" + transcript;
        }else{

          // Add latest command to transcript
          transcript =  "<font color='gray'><i>Not sending '" + command +
                        "' to Robot, Last Command Sent was '" +
                        lastCommand + "'. </i></font><br><br>" + transcript;
        }

        // Format command dependant on whether it is interim or final
        if (event.results[i].isFinal) {
          transcript = "<b>" + command + "</b><br>" + transcript;
        }else{
          transcript =  "<font color='iceberg'>" +  command +
                        "</font><br>" + transcript;
        }

        // Ensure that the command is stored for comparison against the
        // the next command.
        lastCommand = command;
    }

    // Update the transcript
    textSpan.innerHTML = transcript;
  }

  // Triggered on parsing error
  recognition.onerror = function(event) {

    // Report error with text code and error image
    errorReport.innerHTML = "<br>Error Code: " + event.error;
    parsingInProgress = false;
    startImage.src = "images/speech_recognition_error.png";
    startButton.className = "off";
  }

  // Triggered on parsing end
  recognition.onend = function() {
    parsingInProgress = false;

    // If no error, reset the button to indicate readiness
    if (errorReport.innerHTML == ""){
        var startButton = document.getElementById("startButton");
        startButton.className = "off";
    }
  }
}

function startButton(event) {

  // If start button is clicked while an existing parsing is running, stop
  // the process.
  if (parsingInProgress) {
    recognition.stop();
    return;
  }

  // Reset the view of generated text
  transcript = "";

  // Use GB English for Speech to Text parsing
  recognition.lang = "en-GB";
  recognition.start();
}
