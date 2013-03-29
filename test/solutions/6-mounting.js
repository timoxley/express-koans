var express = require('express')

var adminApp = express()

//var authenticationMiddleware = function(req, res, next) {
  //if (req.auth
    //&& req.auth.username === 'admin'
    //&& req.auth.password === 'passw0rd') {
    //return next()
  //}
  //res.send(401)
//}

adminApp.use(express.basicAuth('admin', 'passw0rd'))

adminApp.get('/settings', function(req, res) {
  res.send(200, 'settings')
})

var app = express()

app.use('/admin', adminApp)

app.use(function(req, res) {
  res.send(200, 'App')
})

global.__ = app
global.___ = adminApp
