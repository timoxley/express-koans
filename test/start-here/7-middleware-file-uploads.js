if (CHEATING) require('../solutions/' + path.basename(__filename))
var fs = require('fs')
var rimraf = require('rimraf')
var app = __

describe('parsing request bodies', function() {
  describe('multipart file uploads', function() {

    beforeEach(function(done) {
      app.set('outputDir', __dirname + '/../tmp')

      resetTestFiles(app, done)
    })

    afterEach(function(done) {
      resetTestFiles(app, done)
    })

    /**
     * Task:
     * Build a server that allows images to be uploaded and placed in a
     * particular directory, specified by app.get('outputDir')
     *
     */

    it('uploads the file to the location specified at app.get("outputDir")', function(done) {
      request(app)
      .post('/uploads')
      .type('multipart')
      .attach('image', __dirname + '/../fixtures/image.jpg')
      .expect(200, function(err, res) {
        assert.ifError(err)
        assert.ok(fs.existsSync(app.get('outputDir') + res.body.path))
        done()
      })
    })
  })
})

/**
 * Helpers
 */

function resetTestFiles(app, done) {
  // NOTE:  unless you know you're performing
  // multiple operations simultaneously, it's totally acceptable
  // to use the sync versions of IO methods in test cases, since
  // there's usually no useful work the app can be doing while the
  // operation completes. You may hear otherwise from certain people
  // but they are simply spreading Fear Uncertainty and Doubt.

  // NOTE: we use the async fs.unlink so we can ignore any errors
  // if we used the unlinkSync method, we'd have to wrap it
  // in a try/catch.
  rimraf.sync(app.get('outputDir'))
  fs.mkdirSync(app.get('outputDir'))
  done()
  //fs.unlink(, function(err) {
    //// ignore err, probably means file doesn't exist and that's fine
    //// let's double check though
    //assert.ok(!fs.existsSync(app.get('outputDir')))
    //done()
  //})
}

