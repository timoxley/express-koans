if (CHEATING) require('../solutions/' + path.basename(__filename))

var app = __

describe('responding to different HTTP methods', function() {
  it('responds to POST "/" with "Method Not Allowed" status', function(done) {
    // Note the alternative shorthand for matching response content
    // We can 'expect' response status codes...
    request(app)
    .post('/')
    .expect(status['Method Not Allowed'])
    .end(done)
  })

  it('responds to DELETE "/user/0" with "No Content" status', function(done) {
    // ... and in fact, we can skip the .end call altogether,
    // just pass a callback as the last parameter to .expect:
    request(app)
    .del('/user/0')
    .expect(status['No Content'], done)
  })

  it('responds to PUT "/user/0" with "OK" status', function(done) {
    request(app)
    .put('/user/0')
    .expect(status['OK'], done)
  })
})


