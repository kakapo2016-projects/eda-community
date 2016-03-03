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
    knex('users').select('*').then(function(resp){
      console.log(resp)
      res.render('community', {user: resp});
    })
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
