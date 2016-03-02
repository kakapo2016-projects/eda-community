'use strict'

// Set default node environment to development
require('dotenv').config()
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var express = require('express') // import express.js
var session = require('express-session')
var app = express() // create the express application
var server = require('http').createServer(app) // create the server
var routes = require('./routes')
var GitHubStrategy = require('passport-github').Strategy;

routes(app)


passport.use(new GitHubStrategy({
    clientID: process.env.Client_ID,
    clientSecret: process.env.Client_Secret,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));




if (require.main === module) {
  server.listen(3000, function () {
    console.log('S-s-s-seeeerver is running on port 3000, go crazy teamo!')
  })
}