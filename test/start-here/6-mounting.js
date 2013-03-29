if (CHEATING) require('../solutions/' + path.basename(__filename))

// Task
// Create 2 express applications: adminApp & app.
// adminApp handles basic authentication and serving of '/settings'
// app mounts adminApp under /admin

var adminApp = ___
var app = __

describe('mounting express apps as middleware', function() {
  describe('testing admin app on its own', function() {
    it('returns 200 for valid credentials', function(done) {
      request(adminApp)
      .get('/settings')
      .auth('admin', 'passw0rd')
      .expect(200, function(err, res) {
        assert.equal(res.text, 'settings')
        done()
      })
    })

    it('returns 401 for invalid credentials', function(done) {
      request(adminApp)
      .get('/settings')
      .expect(401, done)
    })
  })

  describe('testing mounted adminApp', function() {
    describe('/', function() {
      it('returns 200', function(done) {
        request(app)
        .get('/')
        .expect(200, done)
      })
    })

    describe('/admin', function() {
      it('returns 200 for valid credentials', function(done) {
        request(app)
        .get('/admin/settings')
        .auth('admin', 'passw0rd')
        .expect(200, function(err, res) {
          assert.equal(res.text, 'settings')
          done()
        })
      })

      it('returns 401 for invalid credentials', function(done) {
        request(app)
        .get('/admin/settings')
        .expect(401, done)
      })

      it('has adminApp mounted inside app', function() {
        assert.strictEqual(adminApp.parent, app)
      })
    })
  })
})

