if (CHEATING) require('../solutions/' + path.basename(__filename))

var app = __

describe('responding with different content-types', function() {
  it('can respond with text/plain content-type header', function(done) {
    request(app)
    .get('/users')
    .expect('Content-Type', 'text/plain', done)
  })

  it('can respond with JSON content-type header', function(done) {
    request(app)
    .get('/users')
    .set('Accept', 'application/json')
    .expect('Content-Type', 'application/json', done)
  })

  it('can respond with text/html content-type header', function(done) {
    request(app)
    .get('/users')
    .set('Accept', 'text/html')
    .expect('Content-Type', /html/, done)
  })
})
