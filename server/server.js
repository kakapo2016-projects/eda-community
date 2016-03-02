'use strict'

// Set default node environment to development
require('dotenv').config()
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var express = require('express') // import express.js
var session = require('express-session')
var app = express() // create the express application
var server = require('http').createServer(app) // create the server
var routes = require('./routes')
var exphbs  = require('express-handlebars')
var path = require('path')

app.use(express.static(path.join(__dirname, 'public')));

routes(app)


if (require.main === module) {
  server.listen(3000, function () {
    console.log('S-s-s-seeeerver is running on port 3000, go crazy teamo!')
  })
}

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
