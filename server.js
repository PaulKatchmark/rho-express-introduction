var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// middleware function, gets executed on each request
app.use(function(req, res, next){
  console.log('Got a request!');
  next();
});

// middleware for parsing the body and turning it into a JS object
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', function(req, res){
  console.log('req.body=', req.body);
  res.sendStatus(200);
});

app.get('/', function(req, res){
  console.log('Received a request at', new Date());
  // __dirname is the folder this file lives in
  var filename = path.join(__dirname, 'public/views/index.html');
  console.log('filename:', filename);
  res.sendFile(filename);
});

var songs = [];

app.post('/songs', function(req, res){
  var almostSongs = req.body;  // variable to help with tracking duplicate songs
  var copySong = false; // variable watching results of duplicate songs
  var noSong = false; //variable watching results of empty string submissions
  var date = new Date; //variable to track the date being added
  // var error = function wrong(){ return alert("Sorry, that submission is invalid")};?????

  songs.forEach(function(song) {
    if(almostSongs.artist == song.artist && almostSongs.title == song.title) { //checking to see if duplicate songs with the same artist are being added
     copySong = true; //testing results of "if" statement
  //  } else if (req.body.artist == "" || req.body.title == "") { //checking to see if an empty string is being submitted
    //  noSong = true; // testing results of "else if" statement
    //  console.log(copySong);
    //  console.log(noSong);
   }
 });
  if (req.body.artist == "" || req.body.title == "") {
    noSong = true;
  }

 if(copySong == true) {  //if either "if or else if" statements are true
  res.sendStatus(400); // send back 400 error
} else if (noSong == true) {
  res.sendStatus(401);
 } else {
   almostSongs.dateAdded = date.toDateString(); //adding date to our songs as they are added
   songs.push(almostSongs);  //sending songs from server side
   res.sendStatus(200);
 }
});

app.get('/songs', function(req, res){
  res.send(songs);
});

// middleware for serving static files
app.use(express.static('public'));

app.listen(3000);
