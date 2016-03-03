'use strict'

// Set default node environment to development
require('dotenv').config()
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var express = require('express') // import express.js
var session = require('express-session')
var app = express() // create the express application
var server = require('http').createServer(app) // create the server
var routes = require('./routes')
var passport = require('passport')

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data/community.sqlite'
  },
  useNullAsDefault: true
})

var GitHubStrategy = require('passport-github').Strategy;
var exphbs  = require('express-handlebars')
var path = require('path')

app.use(express.static(path.join(__dirname, '../public')));

console.log(path.join(__dirname, '../public'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

routes(app)

passport.use(new GitHubStrategy({
    clientID: process.env.Client_ID,
    clientSecret: process.env.Client_Secret,
    callbackURL: "http://www.localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    var user = {id: profile.id, displayName: profile.displayName, profileUrl: profile.profileUrl, email: profile.emails[0].value, photoUrl: profile.photos[0].value}
    knex('users').insert(user).then(function (resp) {
      console.log('It worked!')
    })
    // var user = {profile.id, profile.displayName, profile.profileUrl, profile.emails[0].value, profile.photos[0].value}
    // knex('users').insert()
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));


if (require.main === module) {
  server.listen(3000, function () {
    console.log('S-s-s-seeeerver is running on port 3000, go crazy teamo!')
  })
}


