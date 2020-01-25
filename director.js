const mysql = require('mysql');
const express = require('express');
var fs=require('fs');
var data=fs.readFileSync('moviesdata.json', 'utf8');
var moviesdata=JSON.parse(data);
var bodyparser=require('body-parser');

let app = express();
app.use(bodyparser.json());
app.listen(3000)

let connection = mysql.createConnection({
    
})

connection.connect(function(err) {
    if (err) {
      throw err
    }
    console.log('server started on port 3000 ');
  });

//   get all directors
app.get('/api/directors',(req, res) => {
    let allDirectors = `SELECT * FROM directors;`
    connection.query(allDirectors, (err, result) => {
        if(err) throw err;
        let final = JSON.stringify(result);
        res.send(JSON.parse(final))
        console.log(JSON.parse(final));
    })
})

// get director with given id
app.get('/api/director/:id',(req, res) => {
    let id = req.params.id;
    let allDirectors = `SELECT * FROM directors WHERE id = ${id};`
    connection.query(allDirectors, (err, result) => {
        if(err) throw err;
        let final = JSON.stringify(result);
        res.send(JSON.parse(final))
        console.log(JSON.parse(final));
    })
})

// add new director
app.get('/api/newdirector/:director', (req, res) => {
    let newDirector = req.params.director;
    let addNewDirector = `SELECT COUNT(*) INTO @id FROM directors; INSERT INTO directors (id, Director) VALUES (@id+1, 'final check');`
    connection.query(addNewDirector, (err, result) => {
        if(err) throw err;
        let final = JSON.stringify(result);
        res.send(JSON.parse(final));
        console.log(JSON.parse(final));
    })
})

// update a director with given id
app.get('/api/updatedirector/:id/:director', (req, res) => {
    let id = req.params.id;
    let editDirector = req.params.director;
    console.log(id)
    console.log(editDirector)
    let updateDirectorQuery = `UPDATE directors SET director = ${editDirector} WHERE id = ${id};`;
    connection.query(updateDirectorQuery, (err, result) => {
        if(err) throw err;
        let final = JSON.stringify(result);
        res.send(JSON.parse(final));
        console.log(JSON.parse(final));
    })
})

// delete the director with a given id
app.get('/api/deldirector/:id', (req, res) => {
    let delDirectorId = req.params.id;
    let delDirectorQuery = `SET SQL_SAFE_UPDATES = 0; DELETE FROM directors WHERE id = ${delDirectorId};`
    connection.query(delDirectorQuery, (err, result) => {
        if(err) throw err;
        let final = JSON.stringify(result);
        res.send(JSON.parse(final));
        console.log(JSON.parse(final));
    })
})