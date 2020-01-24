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
    host: 'localhost',
    user: 'root',
    password: 'SJBhs@123',
    database: 'movies'
})

connection.connect(function(err) {
    if (err) {
      throw err
    }
    console.log('server started on port 3000 ');
  });

// sql query function
// function passQuery(query) {
//   connection.query(query, function(err, result) {
//     if (err) throw err;
//     let final = JSON.stringify(result);
//     console.log(JSON.parse(final));
//     return JSON.parse(final)
//     // result.send(JSON.stringify(result));
//   })
// }


// // to create a director table
// connection.query('CREATE TABLE directors (id INT, Director VARCHAR(100))', function(error, results,fields) {
//     console.log(error) // error will be an Error if one occurred during the query
//     console.log(results) // results will contain the results of the query
//     console.log(fields) // fields will contain information about the returned results fields (if any)
// });


// // to add unique directors to the directors table
// // get unique directors list
// let directorList = [];
// for(let i = 0; i < moviesdata.length; i++) {
//     directorList.push(moviesdata[i]['Director'])
// }

// let directorSet = new Set(directorList)
// let uniqueDirector = [... directorSet]

// console.log(uniqueDirector.length)

// // make a director list
// for(let i = 0; i < uniqueDirector.length; i++) {
//   let id = i + 1;
//   // console.log(uniqueDirector[i])
//   connection.query("INSERT INTO directors (id, Director) VALUES ('" + id + "', '" + uniqueDirector[i] + "');", function(error, results,fields) {
//     console.log(error) // error will be an Error if one occurred during the query
//     console.log(results) // results will contain the results of the query
//     console.log(fields) // fields will contain information about the returned results fields (if any)
// })
// }

app.get('/api/directors',(req, res) => {
    let allDirectors = `SELECT * FROM directors;`
    connection.query(allDirectors, (err, result) => {
        if(err) throw err;
        let final = JSON.stringify(result);
        res.send(JSON.parse(final))
        console.log(JSON.parse(final));
    })
})

app.get('/api/director/:id',(req, res) => {
    let id = req.params.id
    let allDirectors = `SELECT * FROM directors WHERE id = ${id};`
    connection.query(allDirectors, (err, result) => {
        if(err) throw err;
        let final = JSON.stringify(result);
        res.send(JSON.parse(final))
        console.log(JSON.parse(final));
    })
})
