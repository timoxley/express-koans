var express = require('express')

var app = express()
app.use(express.basicAuth('admin', 'password'))
app.all('*', function(req, res) {
  res.send(200)
})


var userDBApp = express()

userDBApp.use(express.basicAuth(function(username, password) {
  var users = userDBApp.get('users')
  var authenticateFn = userDBApp.get('authenticateFn')
  return authenticateFn(users, {username: username, password: password})
}))

userDBApp.all('/admin', express.basicAuth(function(username, password, fn) {
  var userDB = userDBApp.get('userDB')
  userDB.authenticate({username: username, password: password}, fn)
}))

userDBApp.all('*', function(req, res) {
  res.send(200)
})

global.___ = userDBApp
global.__ = app
