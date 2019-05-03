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
//SPOTIFY//
else if (input === 'spotify-this-song') {
  console.log("you chose a song");
} 
//BANDS IN  TOWN//
else if (input === 'concert-this') {
  console.log("concert chosen!");
}
else if (input === 'do-what-it-says') {
  console.log("do what it says");
}
else {
  console.log('please choose a valid command');
}
/////END IF ELSE IF STATMENTS//////


//OMDB FUNCTION//
function movieThis(movie) {

  var movieSearch = movie
  var movieQuery = movie || "Mr. Nobody"
  
  axios.get("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(function(response) {
    
    for (var i = 3; i < movieSearch.length; i++) {
      reference.push(movieSearch[i])
    }
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
////////////END OMDOB FUNCTION//////////


// //SPOTIFY FUNCTION//

// function spotifyTrack(value) {
//   if(!value) {
//     value = "The Sign"
//   }

//   spotify
//   .search({ type: 'track', query: value })
//   .then(function(response){

//     for (var i = 0; i < 5; i++) {
//       var spotifyInfo =
//       "---------------------------" +
//       "\nArtist: " + response.tracks.items[i].artists[0].name +
//       "\nTrack Name: " + response.tracks.items[i].name +
//       "\nAlbum Name: " + response.tracks.items[i].album.name +
//       "\nPreview Track: " + response.tracks.items[i].preview_url;

//       console.log(spotifyInfo);
      
//     }
//   })
//   .catch(function(err){
//     console.log(err);
//   });
// }




