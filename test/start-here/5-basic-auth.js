if (CHEATING) require('../solutions/' + path.basename(__filename))

var app = __

describe('using http basic-auth in express', function() {
  it('responds to requests to "/admin" with 200 "OK" if correct credentials are supplied in headers', function(done) {
    request(app)
    .get('/admin')
    .auth('admin', 'passw0rd')
    .expect(200, done)
  })

  it('responds to requests to "/admin" with 401 "Unauthorized" if correct credentials are supplied in headers', function(done) {
    request(app)
    .get('/admin')
    .auth('admin', 'wrongpassword')
    .expect(401, done)
  })
})
