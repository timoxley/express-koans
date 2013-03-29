var express = require('express')
var app = global.__ = express()

app.get('/', function(req, res) {
  res.send(200)
})

app.get('/admin', function(req, res) {
  res.send(401, 'Go Away')
})

app.get('/motd', function(req, res) {
  res.send(200, app.get('message'))
})

