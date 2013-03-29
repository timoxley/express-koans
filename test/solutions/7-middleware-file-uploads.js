var express = require('express')
var fs = require('fs')

var app = express()
app.use(express.bodyParser())

app.post('/uploads', function(req, res) {
  debugger
  var out = fs.createWriteStream(app.get('outputDir') +'/'+ req.files.image.name)
  fs.createReadStream(req.files.image.path)
  .on('end', function() {
    res.send(200)
  })
  .on('error', function() {
    res.send(500, arguments)
  })
  .pipe(out)
})

global.__ = app
