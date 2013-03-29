global.CHEATING = true
global.request = require('supertest')
global.assert = require('assert')
global.path = require('path')
global.express = require('express')
global.faker = require('Faker')

var codes = require('http').STATUS_CODES
global.status = function(message) {
  var messages = {}
  for (var code in codes) {
    var message = codes[code]
    messages[message] = parseInt(code, 10)
  }
  return messages
}()

global.selectRandomFrom = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

global.__ = 'FILL ME IN'
