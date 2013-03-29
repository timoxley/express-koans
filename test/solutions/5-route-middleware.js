var express = require('express')

var app = global.__ = express()

function doCache(req, res, next) {
  res.setHeader("Cache-Control", "max-age=345600");
  next()
}

function noCache(req, res, next) {
  res.setHeader("Cache-Control", "no-cache");
  next()
}

function ok(req, res) {
  res.send(200)
}

app.get('/stats', noCache, ok)
app.get('/documents', doCache, ok)
app.get('/images', doCache, ok)
