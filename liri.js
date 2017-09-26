var keys = require("./keys.js");

var twitter = require("twitter");

var client = new twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});


function myTweets () {
	client.get('statuses/user_timeline', {q: 'node.js'}, function(error, tweets, response) {
   if(error) {console.log(error)};
   console.log(tweets[0].text +", tweeted at: " + tweets[0].created_at); 
   console.log(tweets[1].text +", tweeted at: " + tweets[1].created_at);
});
}


if (process.argv[2] === "my-tweets") {
	myTweets();
}

else {
	// console.log("error");
}

//---------------------------SPOTIFY------------------------------


var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: keys.spotifyKeys.client_ID,
  secret: keys.spotifyKeys.client_secret
});

function spotifyThis () { 

  var songName = process.argv[3];


  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data.tracks.items[0].artists[0].name) 
    console.log(data.tracks.items[0].name)
    console.log(data.tracks.items[0].preview_url)
    console.log(data.tracks.items[0].album.name)
  });
}

// spotifyThis();

if (process.argv[2] === "spotify-this") {
  spotifyThis();
}

else {
  // console.log("error");
};

//------------------------------OMDB API--------------------------

var request = require('request');
var imdb = require('imdb-api');
var APIClinet = require('omdb-api-client');
var omdb = new APIClinet();



function movieThis () {
  var newMovie = process.argv[3];

  omdb({t: newMovie, apiKey: '40e9cece'}).list().then(function(movie) {
    console.log("The title is: " + movie.title);
    console.log("In theatre: " + movie.year);
    console.log("IMDB Rating: " + movie.imdbRating);
    console.log("Came out in the following countries: " + movie.countries);
    console.log("Available in the following languages: " + movie.languages);
    console.log("Plot: " + movie.plot);
    console.log("Actors: " + movie.actors);
    console.log("Website: " + movie.website);
  }).catch(function(err) {
    console.log(err);
  });


}

if (process.argv[2] === "movie-this") {
  movieThis();
}

else if (process.argv[2] === "movie-this" && process.argv[3] === " ") {
  omdb({t: "Mr. Nobody", apiKey: '40e9cece'}).list().then(function(movie) {
    console.log("The title is: " + movie.title);
    console.log("In theatre: " + movie.year);
    console.log("IMDB Rating: " + movie.imdbRating);
    console.log("Came out in the following countries: " + movie.countries);
    console.log("Available in the following languages: " + movie.languages);
    console.log("Plot: " + movie.plot);
    console.log("Actors: " + movie.actors);
    console.log("Website: " + movie.website);
  }).catch(function(err) {
    console.log(err);
  });
}

else {
  // console.log("error");
}




//--------------------------Do This----------------------


var fs = require("fs");

function doThis () {
  fs.readFile("random.txt", "utf8", function(error, data) {
    
         
         data = data.split(", ");


          
          for (var i = 0; i < data.length; i++) {
            if (data[0] === "my-tweets") {
              myTweets();
            }

            else if (data[0] === "spotify-this") {
              spotify.search({ type: 'track', query: data[1]}, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }

                console.log(data.tracks.items[0].artists[0].name) 
                console.log(data.tracks.items[0].name)
                console.log(data.tracks.items[0].preview_url)
                console.log(data.tracks.items[0].album.name)
              });
            }

            else if (data[0] === "movie-this") {
              omdb({t: data[1], apiKey: '40e9cece'}).list().then(function(movie) {
                console.log("The title is: " + movie.title);
                console.log("In theatre: " + movie.year);
                console.log("IMDB Rating: " + movie.imdbRating);
                console.log("Came out in the following countries: " + movie.countries);
                console.log("Available in the following languages: " + movie.languages);
                console.log("Plot: " + movie.plot);
                console.log("Actors: " + movie.actors);
                console.log("Website: " + movie.website);
              }).catch(function(err) {
                console.log(err);
              });
            }

            else {
              // console.log("error")
            }




          }})};



if (process.argv[2] === "do-this") {
  doThis();
}

else {
  // console.log("error");
};
  
