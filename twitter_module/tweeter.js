var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'pVhIGOKmAHHrfsHbdvD7lnnqo',
  consumer_secret: 'KtSa9zQLuLAXDUjqvOfNY5awJOvaz0HxOS41yjPzK8eKW0RmIg',
  access_token_key: '3792345135-YsOMEmIiWuByS0zIQUgqA2q7B4QJUeB4jdeppWD',
  access_token_secret: 'KCMVxYzaxyRrkkHL9xSXTOI0vXM3uLkhEImMxTXoX0Inl'
/*
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET*/
});

// Load your image
var data = require('fs').readFileSync('kid.jpg');

// Make post request on media endpoint. Pass file data as media parameter
client.post('media/upload', {media: data}, function(error, media, response){

  if (!error) {

    // If successful, a media object will be returned.
    console.log(media);

    // Lets tweet it
    var status = {
      status: "Wahey, I can now add images to my Tweets!  #LikeABoss",
      media_ids: media.media_id_string // Pass the media id string
    }

    client.post('statuses/update', status, function(error, tweet, response){
      if (!error) {
        console.log(tweet);
      }
    });

  }
});
