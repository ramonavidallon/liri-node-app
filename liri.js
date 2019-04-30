require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
//VARIABLES//
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


//TODO: grab user input, grab parameters from user input, make API calls 

var input = process.argv[2];
var argument = process.argv.slice(3).join(" ");
console.log(argument);


if (input === 'movie-this') {
  console.log("You've selected movies!");
} 
else if (input === 'spotify-this-song') {
  console.log("you chose a song");
} 
else if (input === 'concert-this') {
  console.log("concert chosen!");
}
else if (input === 'do-what-it-says') {
  console.log("do what it says");
}
else {
  console.log('please choose a valid command');
}




