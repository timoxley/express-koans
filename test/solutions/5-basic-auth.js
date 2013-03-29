var express = require('express')

var app = global.__ = express()

app.get('/', function(req, res) {
  res.send(200)
})

app.get('/admin', function(req, res) {
  if (req.auth
    && req.auth.username === 'admin'
    && req.auth.password === 'passw0rd') {
    return res.send(200)
  }
  res.send(401)
})
