var express = require('express')
var app = global.__ = express()

app.get('/', function(req, res) {
  res.send(200)
})

app.get('/admin/*', function(req, res) {
  res.send(401, 'Go Away')
})

app.get('/user/:name', function(req, res) {
  res.json(200, {name: req.params.name})
})

app.get(/\/item\/([0-9])$/, function(req, res) {
  res.json(200, {item: req.params[0]})
})
