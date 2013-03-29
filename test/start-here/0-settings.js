if (CHEATING) require('../solutions/' + path.basename(__filename))

var app = __

describe('setting/getting application properties', function() {
  it('can enable settings', function() {
    assert.ok(app.enabled('maintenance'))
  })
  it('can disable settings`', function() {
    assert.ok(app.disabled('caching'))
  })
  it('can set variables', function() {
    assert.equal(app.get('admin user'), 'admin')
  })
})
