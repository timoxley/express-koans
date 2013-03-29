var express = require('express')

var app = global.__ = express()

app.param('id', function(req, res, next, id) {
  var isValid = app.get('id format checker')
  if (isValid(id)) return next()
  return res.send(404)
})

app.get('/user/:id/issues', function(req, res) {
  res.send(200)
})

app.get('/issues/:id', function(req, res) {
  res.send(200)
})
