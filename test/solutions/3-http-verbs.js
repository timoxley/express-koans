var express = require('express')
var app = global.__ = express()

app.post('/', function(req, res) {
  res.send(405)
})

app.del('/user/0', function(req, res) {
  res.send(204)
})

app.put('/user/0', function(req, res) {
  res.send(200)
})
