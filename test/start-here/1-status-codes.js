if (CHEATING) require('../solutions/' + path.basename(__filename))

/**
 * NOTE: We have provided a `status` helper object for
 * converting status code text into a status code Number.
 * e.g. status["Not Found"] === 404
 *
 * To help you learn which status code corresponds
 * with which message, you are encouraged to use raw
 * status code Numbers rather than the status helper
 * in your applications.
 *
 * A good resource on status codes: http://httpstatus.es/
 */

var app = __

describe('creating a simple express application', function() {

  /**
   * Task:
   * Create an express application `app` that responds to all GET requests
   * with an OK HTTP status code.
   */

  it('responds to all requests with OK status', function(done) {
    request(app)
    .get('/' + Math.random()) // random url
    .end(function(err, response) {
      assert.equal(response.status, status['OK'])
      done()
    })
  })

  describe('maintenance mode', function() {
    /**
     * Task:
     * Extend your previous express app to respond appropriately when
     * set into "maintenance mode".
     *
     * Hint: app.enabled
     */

    it('responds to all GET requests with "Service Unavailable" after maintenance mode is turned on', function(done) {

      // NOTE: There is nothing special about the "maintenance" setting,
      // Application settings can be any key/value combination.
      app.enable('maintenance') // set the maintenance setting to `true`

      request(app)
      .get('/' + Math.random()) // random url
      .end(function(err, response) {
        assert.equal(response.status, status['Service Unavailable'])
        done()
      })
    })
  })
})
