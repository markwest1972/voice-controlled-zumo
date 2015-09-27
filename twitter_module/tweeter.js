var request = require('request');
var Twitter = require('twitter');

// Tell motion to take a snapshot from the Video Stream
request('http://localhost:8080/0/action/snapshot', function (error, response, body) {

  // Further processing based on success / failure of the about HTTP request
  if (!error && response.statusCode == 200) {
    // All went well.   Lets Tweet!
    console.log('Picture taken!');

    // Create Twitter Client
    var client = new Twitter({
      consumer_key: '',
      consumer_secret: '',
      access_token_key: '',
      access_token_secret: ''
    });

    // Upload image taken
    var data = require('fs').readFileSync('/home/pi/mmal/m-video/lastsnap.jpg');
    client.post('media/upload', {media: data}, function(error, media, response){

      // Further processing based on success / failure of Media upload
      if (!error) {

        // If successful, a media object has been returned.
        console.log(media);

        // Create a status with Image and message
        var status = {
          status: 'This is what I am seeing right now!',
          media_ids: media.media_id_string // Pass the media id string
        }

        // Tweet the image, along with a status
        client.post('statuses/update', status, function(error, tweet, response){
          if (!error) {
            console.log(tweet);
          }
        });

      }

    });

  }else{

    // Failure in HTTP call - we cannot be sure that all went well.  Exit without tweeting
    console.log('Picture failed, process exit');
    process.exit(1);

  }
});
