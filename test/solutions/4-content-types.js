var express = require('express')

var app = global.__ = express()

app.get('/users', function(req, res) {
  var users = app.get('users')
  res.format({
    text: function() {
      res.send()
    },
    html: function() {
      res.send(app.get('users'))
    },
    json: function() {
      res.send(app.get('users'))
    }
  })
})

app.get('/user/0.html', function(req, res) {
  res.type('html');
  res.send(200)
})

app.get('/user/0.json', function(req, res) {
  res.type('json');
  res.send(200)
})
