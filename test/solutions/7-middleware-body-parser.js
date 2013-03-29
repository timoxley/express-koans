var express = require('express')

var app = express()
app.use(express.bodyParser())

app.post('/login', function(req, res) {
  if (req.body
      && req.body.username === app.get('username')
      && req.body.password === app.get('password')) {
    return res.send(200)
  }
  res.send(401)
})

global.__ = app
