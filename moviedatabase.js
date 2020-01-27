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

// to make a movieslist table
connection.query('CREATE TABLE movieslist (Rank INT, Title VARCHAR(300), Description VARCHAR(400), Runtime varchar(100), Genre VARCHAR(100), Rating VARCHAR(100), Metascore VARCHAR(100), Votes VARCHAR(100), Gross_Earning_in_Mil VARCHAR(100), DirectorId INT, Actor VARCHAR(100), Year VARCHAR(100))', function(error, results,fields) {
    console.log(error) // error will be an Error if one occurred during the query
    console.log(results) // results will contain the results of the query
    console.log(fields) // fields will contain information about the returned results fields (if any)
});

// to add data to the movieslist table
for(let i = 0; i < moviesdata.length; i++) {
  let directorName = moviesdata[i]['Director'];
  connection.query(`SELECT id into @id FROM directors WHERE Director = '${directorName}';INSERT INTO movieslist (Rank, Title, Description, Runtime, Genre, Rating, Metascore, Votes, Gross_Earning_in_Mil, DirectorId, Actor, Year) VALUES (${moviesdata[i]['Rank']}, "${moviesdata[i]['Title']}", "${moviesdata[i]['Description']}", ${moviesdata[i]['Runtime']}, '${moviesdata[i]['Genre']}', ${moviesdata[i]['Rating']}, "${moviesdata[i]['Metascore']}", ${moviesdata[i]['Votes']}, "${moviesdata[i]['Gross_Earning_in_Mil']}", @id, '${moviesdata[i]['Actor']}', ${moviesdata[i]['Year']});`, function(error, results,fields) {
    console.log(error) // error will be an Error if one occurred during the query
    console.log(results) // results will contain the results of the query
    console.log(fields) // fields will contain information about the returned results fields (if any)
})
}
