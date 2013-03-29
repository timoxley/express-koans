if (CHEATING) require('../solutions/' + path.basename(__filename))

var app = __

describe('responding to dynamic routes', function() {
  it('responds to *any* url under "/admin" with "Unauthorised"', function(done) {
    var randomUrl = faker.Lorem.words(Math.random() * 5).join('-') // some random words
    request(app)
    .get('/admin/' + randomUrl)
    .expect(status['Unauthorized'], done)
  })

  it('responds to any GET "/user/:NAME" returns value of :NAME as JSON', function(done) {
    var randomName = faker.Name.firstName()
    request(app)
    .get('/user/' + randomName)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(status['OK'])
    .expect({name: randomName}, done)
  })
})

describe('matching routes more strictly', function() {
  // HINT: use regular expressions
  it('returns OK if id is a number 0-9', function(done) {
    var randomId = Math.floor((Math.random() * 10))
    request(app)
    .get('/item/' + randomId)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect({item: randomId})
    .expect(status['OK'], done)
  })

  describe('responses if id is not a number 0-9', function(done) {
    it('responds with "Not Found" if id is a Number > 9', function(done) {
      var numberLargerThanNine = (Math.floor(Math.random() * 100) + 10)

      request(app)
      .get('/item/' + numberLargerThanNine)
      .expect(status['Not Found'], done)
    })

    it('responds with "Not Found" if id is a word', function(done) {
      var randomWord = faker.Lorem.words(1).join('')

      request(app)
      .get('/item/' + randomWord)
      .expect(status['Not Found'], done)
    })
  })
})

