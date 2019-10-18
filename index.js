const express = require('express'),
      mysql = require('mysql');
      cors = require('cors');

// Application initialization

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});


// Configuration

var app = module.exports = express.createServer();
app.use(express.bodyParser());
app.use(cors())


// Database setup

connection.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
    if (err) throw err;
    connection.query('USE test', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS users(' +
            'id INT NOT NULL AUTO_INCREMENT,' +
            'PRIMARY KEY(id),' +
            'name VARCHAR(30)' +
            ')',
            function (err) {
                if (err) throw err;
            });
    });
});


// Main route sends our HTML file

// app.get('/', function (req, res) {
//     res.sendfile(__dirname + '/index.html');
// });

// Update MySQL database

app.post('/users', function (req, res, next) {

    connection.query('INSERT INTO users SET ?', req.body,
        function (err, result) {
            if (err) throw err;
            res.send('User added to database with ID: ' + result.insertId);
        }
    );
});

// Begin listening

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
