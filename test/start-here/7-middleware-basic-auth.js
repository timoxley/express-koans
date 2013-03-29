if (CHEATING) require('../solutions/' + path.basename(__filename))

describe('basic auth with built-in express basic-auth middleware', function() {
  /*
   * Task:
   * Use the built-in express.basicAuth middleware to implement
   * simple user authentication
   */


  describe('using a simple username/password combo to validate logins', function() {
    /**
     * Task:
     * Use basicAuth to validate against some hard-coded values:
     *  username: 'admin'
     *  password: 'password'
     */

    var app = __

    it('responds with 200 for valid credentials', function(done) {
      request(app)
      .get('/')
      .auth('admin', 'password')
      .expect(200, done)
    })

    it('responds with 401 for invalid credentials', function(done) {
      request(app)
      .get('/')
      .auth('admin', 'wrong password')
      .expect(401, done)
    })
  })

  describe('using a callback to look up credentials', function() {

    var app = ___

    describe('validate logins with a synchronous operation', function() {
      /**
       * Task:
       * `express.basicAuth` can also take a function you can use to validate users
       * against.
       *
       * Match against the Array of usernames/passwords found in
       * app.get('users'), and use app.get('authenticate') function to
       * validate against the `users` Array.
       */


      beforeEach(function() {
        app.set('users', generateRandomUsers())
        app.set('authenticateFn', authenticate)
      })

      it('validates valid logins', function(done) {
        console.log(app.get('users'))
        var randomUser = selectRandomFrom(app.get('users'))
        request(app)
        .get('/')
        .auth(randomUser.username, randomUser.password)
        .expect(200, done)
      })

      it('responds with 401 for invalid credentials', function(done) {
        var randomUser = selectRandomFrom(app.get('users'))
        request(app)
        .get('/')
        .auth(randomUser.username, randomUser.password + 'wrong')
        .expect(401, done)
      })
    })

    describe('using a pseudo async DB to validate logins on /admin route', function() {

      /**
       * Task:
       * If `express.basicAuth` is passed a function as the third parameter
       * it becomes an asynchronous operation. invoke the third
       * parameter with ({Error} err, {Boolean} isValid) where isValid
       * is true if the credentials check out.
       *
       * You're provided with app.get('userDB') which has an
       * asynchronous method 'authenticate'. Check the definition at the
       * bottom of this file for a description of the arguments.
       */

      beforeEach(function() {
        var users = generateRandomUsers()
        app.set('users', users)

        var fakeUserDB = new FakeUserDB(users)
        app.set('userDB', fakeUserDB)
      })

      it('validates valid logins', function(done) {
        var randomUser = selectRandomFrom(app.get('users'))
        request(app)
        .get('/admin')
        .auth(randomUser.username, randomUser.password)
        .expect(200, done)
      })

      it('responds with 401 for invalid credentials', function(done) {
        var randomUser = selectRandomFrom(app.get('users'))
        request(app)
        .get('/admin')
        .auth(randomUser.username, randomUser.password + 'wrong')
        .expect(401, done)
      })
    })
  })
})


/*
 * Helpers
 */

/**
 * Returns true iff username/password matches an entry in supplied `users`
 *
 * @param {Array} users an array of users to check against
 * @param {Object} user has properties username & password to verify
 * @return {Boolean}
 */

function authenticate(users, user) {
  // if length > 0, we found a user.
  return !!users
    .filter(function(u) {
      return u.username === user.username
        && u.password === user.password
    })
    .length
}

/**
 * Fake User database constructor.
 *
 * @param {Array} users Array of users to initialise with
 */

function FakeUserDB(users) {
  this.users = users
}

/**
 * Asynchronous authentication method
 *
 * @param {Object} user has properties username & password to verify
 * @param {Function} fn
 */

FakeUserDB.prototype.authenticate = function authenticate(user, fn) {
  var self = this
  setTimeout(function() {
    fn(null, authenticate(self.users, user))
  }, 0)
}

/**
 * Generates some random 'users'
 *
 * @return {Array}
 */

function generateRandomUsers() {
  function randomUser() {
    return {
      username: faker.Name.firstName(),
      password: faker.Lorem.words(1).join('')
    }
  }
  var users = []
  for (var i = 0; i < 10; i++) {
    users.push(randomUser())
  }
  return users
}



