if (CHEATING) require('../solutions/' + path.basename(__filename))

var app = __

// Use this method in your param handler to
// validate an id.
app.set('id format checker', function(id) {
  // in this case, ids must simply be a number,
  // Why would you do this? For example, if the url doesn't match the format
  // there's no point even consulting the DB to checking for the record's existence.
  return /^[\d]*$/.test(id)
})


describe('using app.param to handle particular route segments across multiple routes', function() {
  describe('/user/:id/issues', function() {
    it('accepts valid requests', function(done) {
      var id = faker.random.number(10)
      request(app)
      .get('/user/'+id+'/issues')
      .expect(200, done)
    })

    it('rejects invalid requests', function(done) {
      var invalidID = faker.Lorem.words(1).join('')
      request(app)
      .get('/user/'+invalidID+'/issues')
      .expect(404, done)
    })
  })

  describe('/issues/:id', function() {
    it('accepts valid requests', function(done) {
      var id = faker.random.number(10)
      request(app)
      .get('/issues/'+id)
      .expect(200, done)
    })

    it('rejects invalid requests', function(done) {
      var invalidID = faker.Lorem.words(1).join('')
      request(app)
      .get('/issues/'+invalidID)
      .expect(404, done)
    })
  })
})

