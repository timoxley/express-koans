if (CHEATING) require('../solutions/' + path.basename(__filename))

var app = __

describe('chaining middleware on routes', function() {
  describe('cachable routes', function() {
    it('/images responds with a Cache-Control header with a max-age set', function(done) {
      request(app)
      .get('/images')
      .expect('Cache-Control', /max-age/, done)
    })

    it('/documents responds with a Cache-Control header with a max-age set', function(done) {
      request(app)
      .get('/images')
      .expect('Cache-Control', /max-age/, done)
    })
  })

  describe('non-cachable routes', function() {
    it('responds with Cache-Control header set to no-cache', function(done){
      request(app)
      .get('/stats')
      .expect('Cache-Control', /no-cache/, done)
    })
  })
})
