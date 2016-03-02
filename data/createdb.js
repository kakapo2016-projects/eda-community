var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/community.sqlite'
  },
  useNullAsDefault: true
})

// https://www.sqlite.org/lang_droptable.html
var dropSqlUsers = 'DROP TABLE IF EXISTS users;'
var dropSqlSkills = 'DROP TABLE IF EXISTS skills;'
var dropSqlUserSkills = 'DROP TABLE IF EXISTS userskills;'


var createSqlUsers = [
  'CREATE TABLE users (',
	'UserID VARCHER(255) PRIMARY KEY ASC,',
	'LastName VARCHER(255),',
	'FirstName VARCHER(255),',
	'Other VARCHER(255) );',
].join(' ')

var createSqlSkills = [
  'CREATE TABLE skills (',
	'SkillID VARCHER(255) PRIMARY KEY ASC,',
	'Description VARCHER(255));'
].join(' ')

var createSqlUserSkills = [
  'CREATE TABLE UserSkills (',
	'UserID VARCHER(255) PRIMARY KEY ASC,',
	'SkillID VARCHER(255));'
].join(' ')


knex.raw(dropSqlUsers).then(function (resp) {
  return knex.raw(createSqlUsers)
}).then(function (resp) {
	  knex.raw(dropSqlSkills).then(function (resp) {
	  return knex.raw(createSqlSkills)
	}).then(function (resp) {
      knex.raw(dropSqlSkills).then(function (resp) {
  	  return knex.raw(createSqlUserSkills)
  	}).then(function (resp) {
  	  process.exit()
  	})
	})
})
