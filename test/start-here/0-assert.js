describe('assertions', function() {
  it('can compare two objects', function() {
    var value = __
    // solution
    value = 2
    assert.equal(value, '2')
    assert.equal(value, 2)
  })

  it('can strictly compare two objects', function() {
    var value1 = __
    var value2 = __
    // solution
    value1 = '2'
    value2 = 2
    assert.strictEqual(value1, '2')
    assert.strictEqual(value2, 2)
    assert.notStrictEqual(value1, value2)
  })

  it('can use deep equal to compare equivalent arrays', function() {
    var items = __
    // solution
    items = [1,2,3,4]
    assert.deepEqual(items, [1,2,3,4])
    assert.notStrictEqual(items, [1,2,3,4])
  })

  it('can use deep equal to compare equivalent objects', function() {
    var item = __
    // solution
    item = {name: 'Bob'}
    assert.deepEqual(item, {name: 'Bob'})
    assert.notStrictEqual(item, {name: 'Bob'})
  })

  it('can call done for asyncronous tests', function(done) {
    setTimeout(function() {
      done()
    }, 500)
  })
})
