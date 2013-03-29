if (CHEATING) require('../solutions/' + path.basename(__filename))

var app = __

describe('parsing request bodies', function() {
  describe('urlencoded forms', function() {
    /**
     * Task:
     * The default encoding for HTML Forms is 'url encoding'.
     * This test sends our server a form that would look like:
     *
     * <form method="POST" action="/login">
     *   <input name="username" />
     *   <input name="password" type="password"/>
     *   <input type="submit" />
     * </form>
     */

    beforeEach(function() {
      app.set('username', 'admin')
      app.set('password', 'password' + Math.random())
    })

    it('responds with a 200 status if username/password are correct', function(done) {
      request(app)
      .post('/login')
      .type('form')
      .send({
        username: app.get('username'),
        password: app.get('password'),
        submit: 'Submit'
      })
      .expect(200, done)
    })

    it('responds with a 401 status if username/password are incorrect', function(done) {
      request(app)
      .post('/login')
      .type('form')
      .send({
        username: app.get('username'),
        password: app.get('password') + 'wrong',
        submit: 'Submit'
      })
      .expect(401, done)
    })
  })

  describe('json encoded request bodies', function() {
    /**
     * Task:
     * Ensure your app can also respond to submissions encoded
     * as application/json, such as you might recieve from an
     * third-party client. If you set up the first application
     * 'correctly', these tests should simply pass with zero
     * code changes.
     */

    it('responds with a 200 status if username/password are correct', function(done) {
      request(app)
      .post('/login')
      .type('json')
      .send({
        username: app.get('username'),
        password: app.get('password')
      })
      .expect(200, done)
    })

    it('responds with a 401 status if username/password are incorrect', function(done) {
      request(app)
      .post('/login')
      .type('json')
      .send({
        username: app.get('username'),
        password: app.get('password') + 'wrong'
      })
      .expect(401, done)
    })
  })
})
