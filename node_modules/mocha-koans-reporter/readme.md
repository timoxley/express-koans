mocha-koans-reporter
====================

A reporter for [mocha](http://visionmedia.github.com/mocha/) to simplify the creation of JavaScript koans.

Heavily inspired by and modelled on the [New Context Ruby Koans](http://rubykoans.com/).

Pre-requisities
---------------

* [Node.js](http://nodejs.org/)
* [NPM](https://npmjs.org/)

Install
-------

    npm install -g mocha-koans-reporter

Usage
-----

1. Create a project for your koans with the following dependencies:
  * [Mocha](http://visionmedia.github.com/mocha/)
  * [Chai](http://chaijs.com/) or another assertion library
1. Create a `test` directory to hold your koans.
1. Create a `test/mocha.opts` file to specify default mocha running options with the following contents

    ```
    --reporter mocha-koans-reporter
    --require test/common
    --bail
    --recursive
    --watch
    ```

1. Create a `test/common.js` file to specify global module dependencies across your koans, and set other defaults, e.g:

    ```javascript
    global.chai = require('chai');
    global.expect = chai.expect;
    global.__ = "FILL ME IN";
    ```

1. Create 1 or more test files in your `test` directory, e.g. `test/about-truth.js`:

    ```javascript
    describe('truthiness', function() {
      it('is indeed true', function() {
        expect(true).to.equal(__);
      });
    });
    ```

1. You can then run koans with `mocha`, or map `npm test` to this by adding this to your `package.json`:

    ```javascript
    "scripts": {
      "test": "mocha"
    }
    ```
    