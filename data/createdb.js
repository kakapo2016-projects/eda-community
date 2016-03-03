var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data/community.sqlite'
  },
  useNullAsDefault: true
})

// https://www.sqlite.org/lang_droptable.html
var dropSqlUsers = 'DROP TABLE IF EXISTS users;'
var dropSqlSkills = 'DROP TABLE IF EXISTS skills;'
var dropSqlUserSkills = 'DROP TABLE IF EXISTS skills;'

var createSqlUsers = [
  'CREATE TABLE users (',
	'id INTEGER PRIMARY KEY,',
	'displayName VARCHAR(255),',
      'photoUrl VARCHAR(255),',
      'SkillID VARCHAR(255),',
      'about VARCHAR,',
	'profileUrl VARCHAR(255),',
	'email VARCHAR(255) );',
].join(' ')

var createSqlSkills = [
  'CREATE TABLE skills (',
	'id VARCHAR(255),',
	'Description VARCHAR(255));'

].join(' ')

knex.raw(dropSqlUsers).then(function (resp) {
  return knex.raw(createSqlUsers)
}).then(function (resp) {
	  knex.raw(dropSqlSkills).then(function (resp) {
	  return knex.raw(createSqlSkills)
	}).then(function (resp) {
      knex.raw(dropSqlUserSkills).then(function (resp) {
  	}).then(function (resp) {
  	  process.exit()
  	})
	})
})
