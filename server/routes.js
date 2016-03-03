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
  passport.authenticate('github', {  successRedirect: '/community',
                                                      failureRedirect: '/' }))



  app.post('/info/:UserID', function(req, res){
    // save the extra info about this user back to the database
     knex('users').insert({
       id: UserID,
       about: req.body.about,
     }) .then (function(resp){
       var rows = [{id: UserID, skillDescr: req.body.skill[0]},
        {id: UserID, description: req.body.skill[1]},
        {id: UserID, description: req.body.skill[2]},
        {id: UserID, description: req.body.skill[3]},
        {id: UserID, description: req.body.skill[4]}];
        var chunkSize = 5;
        knex.batchInsert('skills', rows, chunkSize)
        .then(function(respo) {
          res.redirect('/community')
        })
       })
     })

  app.get('/info/:UserID', function(req, res){
    // get the extra info about this user from the database
     knex('users').where(
     'id', UserID
     )
     .select('about', 'id')
     .then(function(resp) {
      if (resp.length > 0) {
       knex('skills').where('userid', UserID)
       .select('id',  'description')
       .then( function(respo){
         res.redirect('/community')
      })
     }
    })
  })


}
