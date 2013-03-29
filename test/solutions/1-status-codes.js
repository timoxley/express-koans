/** Solution 1-start **/

var express = require('express')

var app = global.__ = express()

app.all('*', function(req, res) {
  if (app.enabled('maintenance')) return res.send(503)
  res.send(200)
})
