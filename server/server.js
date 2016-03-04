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

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



routes(app)



passport.use(new GitHubStrategy({
    clientID: process.env.Client_ID,
    clientSecret: process.env.Client_Secret,
    callbackURL: "http://eda-community.herokuapp.com/auth/github/callback",
    "profileFields": ['emails']
  },
  function(accessToken, refreshToken, profile, cb) {
    knex('users').where({id: profile.id}).select('*').then(function (users) {
      console.log(profile)
      var user = users[0]
      if (user) {
        console.log('This user already exists')
        return cb(null, user)
      } else {
        if (typeof(profile.emails) === 'undefined') {
          var email = "Private" 
        } else {
          var email = profile.emails[0].value
        }
        var newUser = { 
          accessToken: accessToken, 
          id: profile.id, 
          displayName: profile.displayName, 
          profileUrl: profile.profileUrl, 
          email: email, 
          photoUrl: profile.photos[0].value
        }
      
        knex('users').insert(newUser).then(function (insertedUser) {
          console.log('New user created')
          return cb(null, insertedUser)
        })
      }
    })
  }
))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  knex('users').where({id: id}).then(function(user){
    done(null, user)
  })
})



if (require.main === module) {
  server.listen(8080, function () {
    console.log('S-s-s-seeeerver is running on port 3000, go crazy teamo!')
  })
}


