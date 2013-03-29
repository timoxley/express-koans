if (CHEATING) require('../solutions/' + path.basename(__filename))

var app = __

describe('responding to different routes', function() {
  it('responds GET "/" with OK status', function(done) {
    request(app)
    .get('/')
    .expect(status['OK'], done)
  })

  it('responds to GET "/admin" with "Unauthorized" status', function(done) {
    request(app)
    .get('/admin')
    .end(function(err, response) {
      assert.ifError(err)
      assert.equal(response.status, status['Unauthorized'])
      done()
    })
  })

  it('responds to GET in maintenance mode with a custom message', function(done) {
    var messageOfTheDay = "Message of the day: My favourite random number is:" + Math.random() // random to ensure you don't cheat :D
    app.set('message', messageOfTheDay)

    request(app)
    .get('/motd')
    .end(function(err, response) {
      assert.ifError(err)
      assert.equal(response.text, messageOfTheDay)
      assert.equal(response.status, status['OK'])
      done()
    })
  })
})

