require("dotenv").config();

//VARIABLES//
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var reference = [];
var input = process.argv[2];
var searchType = process.argv.splice(3).join();




//TODO: grab user input, grab parameters from user input, make API calls 



//IF ELSE STATEMENTS FOR USER INPUT//

//OMDB//
if (input === 'movie-this') {
  movieThis(searchType);
} 
//BANDS IN  TOWN//
else if (input === 'concert-this') {
  concertThis(searchType);
}
//SPOTIFY//
else if (input === 'spotify-this-song') {
  spotifyTrack(searchType);
} 
else if (input === 'do-what-it-says') {
  console.log("do what it says");
}
else {
  console.log('please choose a valid command');
}
/////END IF ELSE IF STATMENTS//////


//START OMDB FUNCTION//
function movieThis(movie) {

  var movieQuery = movie || "Mr. Nobody"
  
  axios.get("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(function(response) {
    
    var divider = "\n------------------------------------------------------------\n\n";
    var jsonData = response.data;

    if (jsonData.title != undefined) {
    }
    else {
    }

    var movieData = [
      "Title: " + jsonData.Title,
      "Year: " + jsonData.Year,
      "imdb Rating: " + jsonData.imdbRating,
      "Country: " + jsonData.Country,
      "Language: " + jsonData.Language,
      "Plot: " + jsonData.Plot,
      "Cast: " + jsonData.Actors,
    ].join("\n\n");

    fs.appendFile("log.txt", movieData + divider, function(err) {
      if(err) throw err;
      console.log(divider + movieData);
    });
  })

};
/////END OMDB FUNCTION/////


/////START BANDS IN TOWN FUNCTION/////
function concertThis(concert) {

  var concertQuery = concert || "'The Sign' by Ace of Base"

  axios.get("https://rest.bandsintown.com/artists/" + concertQuery + "/events?app_id=codingbootcamp").then(function(response) {
    var jsonData = response.data;
    // console.log(jsonData);
    for (var i = 0; i < jsonData.length; i++) {
      var divider = "\n------------------------------------------------------------\n\n";
      var concertFind = [
        "\nVenue Name: " + jsonData[i].venue.name,
        "\nLocation: " + jsonData[i].venue.city,
        "\nDate of Concert: " + moment(jsonData[i].datetime).format("L"),
      ].join("\n\n")
      // console.log("THIS IS JSONDATA", jsonData[i].datetime);
      
      fs.appendFile("log.txt", concertFind + divider, function(err) {
        if(err) throw err;
        console.log(divider + concertFind);
      });

        console.log(divider + concertFind);
        // console.log(concertThis);
    };
      
  });
};   
/////END BANDS IN TOWN FUNCTION/////



///SPOTIFY FUNCTION/////
function spotifyTrack(track) {
  
console.log(track);

  spotify.search({ type: 'track', query: track }, function(err, response) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    var jsonData = response.tracks;
    console.log(jsonData);
    
    for (var i = 0; i < 5; i++) {
      var divider = "\n------------------------------------------------------------\n\n";
      var trackInfo = [
        "\nArtist: " + jsonData.items[i].artists[0].name,
        "\nTrack Name: " + jsonData.items[i].name,
        "\nAlbum Name: " + jsonData.items[i].album.name,
        "\nPreview Track: " + jsonData.items[i].preview_url,
      ]

      console.log(divider + trackInfo);
      
      
      fs.appendFile("log.txt", trackInfo + divider, function(err) {
        if(err) throw err;
        console.log(divider + trackInfo);
      });   
    }
  })

};
/////END SPOTIFY FUNCTION/////
