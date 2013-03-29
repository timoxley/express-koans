var express = require('express')

var app = global.__ = express()

app.use(function(req, res, next) {
  if (req.auth
    && req.auth.username === 'admin'
    && req.auth.password === 'passw0rd') {
    return next()
  }
  return res.send(401)
})

app.get('/:word', function(req, res) {
  res.json(200, {word: req.params.word})
})
