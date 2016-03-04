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
    //console.log(req.session.passport.user.id)
    var userId = req.session.passport.user.id
    knex('users').select('*').then(function(resp){
      knex('users').where('id', userId).select('*').then(function(respo){
        var user = resp[0]
        if (user){
          if (resp[0].about === null){
            res.render('info', {user: resp})
          } else {
            res.render('community', {user: resp});
          }
        }
         else {
          res.render('community', {user: resp});
        }
      })
    })
  });

app.get('/auth/github',
  passport.authenticate('github', { scope: "user:email"}));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/',
                                                      successRedirect: '/community'}))

  app.post('/info', function(req, res){
    // save the extra info about this user back to the database
    console.log("attempting to post", req.body)
    var userId = req.session.passport.user.id

     knex('users')
     .where('id', userId)
     .update({
      //  id: userId,
      //  accessToken: undefined,
      //  displayName: undefined,
      //  photoUrl: undefined,
      //  SkillID: undefined
       about: req.body.name,
      //  profileUrl: undefined,
      //  email: undefined
     }) .then (function(resp){
      //  var rows = [{id: userId, skillDescr: req.body.Javascript},
      //   {id: userId, description: req.body.Node},
      //   {id: userId, description: req.body.SQL},
      //   {id: userId, description: req.body.Agile},
      //   {id: userId, description: req.body.Ruby},
      //   {id: userId, description: req.body.Python}];
      //   var chunkSize = 6;
      //   knex.batchInsert('skills', rows, chunkSize)
      //   .then(function(respo) {
          res.redirect('/community')
        // })
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
