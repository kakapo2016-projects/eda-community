'use strict'

exports = module.exports = function (app) {
  app.get('/', function (req, res) {
  })

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/community');
  });


}
