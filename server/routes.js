'use strict'
var passport = require('passport')


exports = module.exports = function (app) {


  var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './data/community.sqlite'
    },
    useNullAsDefault: true
  })

  app.get('/', function (req, res) {
      res.render('signup');
  });

  app.get('/community', function (req, res) {
    var user = [{'id': 12, displayName: 'rjoe19', profileUrl: 'www.google.com', email: 'rjoe@gmail.com', photoUrl: 'www.fillmurray.com/200/200'},
    {'id': 12, displayName: 'rjoe19', profileUrl: 'www.google.com', email: 'rjoe@gmail.com', photoUrl: 'www.fillmurray.com/200/200'}]

      res.render('community', {user: user});

  });

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/community');
  });


}
