'use strict'

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






}
