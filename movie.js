const mysql = require('mysql');
const express = require('express');
var fs=require('fs');
var data=fs.readFileSync('moviesdata.json', 'utf8');
var moviesdata=JSON.parse(data);
var bodyparser=require('body-parser');

let app = express();
app.use(bodyparser.json());
app.listen(5000);

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SJBhs@123',
    database: 'movies',
    multipleStatements: true
})

// to make a connection to the server
connection.connect(function(err) {
    if (err) {
      throw err
    }
    console.log('server started on port 5000 ');
  });

// get all movies
app.get('/api/movies',(req, res) => {
  let allMovies = `SELECT * FROM movieslist;`
  connection.query(allMovies, (err, result) => {
      if(err) throw err;
      let final = JSON.stringify(result);
      res.send(JSON.parse(final))
      console.log(JSON.parse(final));
  })
})

// get the movie with the given id
app.get('/api/movie/:id',(req, res) => {
  let id = req.params.id;
  let getMovie = `SELECT * FROM movieslist WHERE Rank = ${id};`
  connection.query(getMovie, (err, result) => {
      if(err) throw err;
      let final = JSON.stringify(result);
      res.send(JSON.parse(final))
      console.log(JSON.parse(final));
  })
})

// update a movie with a given id
app.get('/api/updatemovie/:id/:key/:movie', (req, res) => {
  let id = req.params.id;
  let editMovie = req.params.movie;
  let key = req.params.key;
  console.log(id)
  console.log(editMovie)
  let updateMovieQuery = `UPDATE movieslist SET ${key} = '${editMovie}' WHERE Rank = ${id};`;
  connection.query(updateMovieQuery, (err, result) => {
      if(err) throw err;
      let final = JSON.stringify(result);
      res.send(JSON.parse(final));
      console.log(JSON.parse(final));
  })
})

// the directorid should be displayed in this table and a new record to be made in directors table if required
// add a new movie
app.get('/api/newmovie/:rank/:title/:description/:runtime/:genre/:rating/:metascore/:votes/:gross_earning_in_mil/:directorid/:actor/:year', (req, res) => {
  let newRank = req.params.rank;
  let newTitle = req.params.title;
  let newDescription = req.params.description;
  let newRuntime = req.params.runtime;
  let newGenre = req.params.genre;
  let newRating = req.params.rating;
  let newMetascore = req.params.metascore;
  let newVotes = req.params.votes;
  let newGross_Earning_in_Mil = req.params.gross_earning_in_mil;
  let newDirectorId = req.params.directorid;
  let newActor = req.params.actor;
  let newYear = req.params.year;
  let addNewDirector = `insert into movieslist (Rank, Title, Description, Runtime, Genre, Rating, Metascore, Votes, Gross_Earning_in_Mil, DirectorId, Actor, Year) VALUES (${newRank}, "${newTitle}", "${newDescription}", ${newRuntime}, '${newGenre}', ${newRating}, "${newMetascore}", ${newVotes}, "${newGross_Earning_in_Mil}", ${newDirectorId}, "${newActor}", '${newYear}');`
  connection.query(addNewDirector, (err, result) => {
      if(err) throw err;
      let final = JSON.stringify(result);
      res.send(JSON.parse(final));
      console.log(JSON.parse(final));
  })
})

// delete the movie with given id
app.get('/api/delmovie/:rank', (req, res) => {
  let delMovie = req.params.rank;
  let delMovieQuery = `SET SQL_SAFE_UPDATES = 0; DELETE FROM movieslist WHERE Rank = ${delMovie};`
  connection.query(delMovieQuery, (err, result) => {
      if(err) throw err;
      let final = JSON.stringify(result);
      res.send(JSON.parse(final));
      console.log(JSON.parse(final));
  })
})