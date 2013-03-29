describe('ProgressRecord', function() {
  var ProgressRecord = require('../../src/progress-record.js'),
      fs = require('fs'),
      filename = './.path-progress';

  beforeEach(function() {
    this.subject = new ProgressRecord();
  });

  afterEach(function() {
    try {
      fs.unlinkSync(filename);
    } catch(e) {}
  });

  describe('init', function() {
    describe('when there is no file yet', function() {
      beforeEach(function() {
        this.subject.init();
      });

      it('sets the progress array to empty', function() {
        expect(this.subject.progress).to.deep.equal([]);
      });

      it('defaults the previous success count to 0', function() {
        expect(this.subject.previous).to.equal(0);
      });
    });

    describe('when there is an empty file', function() {
      beforeEach(function() {
        var file = fs.openSync(filename, 'wx');
        fs.closeSync(file);
        this.subject.init();
      });

      it('sets the progress array to empty', function() {
        expect(this.subject.progress).to.deep.equal([]);
      });

      it('defaults the previous success count to 0', function() {
        expect(this.subject.previous).to.equal(0);
      });
    });

    describe('when there is one previous entry', function() {
      beforeEach(function() {
        var file = fs.openSync(filename, 'wx');
        fs.writeSync(file, '0', undefined, undefined, undefined);
        fs.closeSync(file);
        this.subject.init();
      });

      it('sets the progress array', function() {
        expect(this.subject.progress).to.deep.equal([0]);
      });

      it('sets the previous success count', function() {
        expect(this.subject.previous).to.equal(0);
      });
    });

    describe('when there are a few entries', function() {
      beforeEach(function() {
        var file = fs.openSync(filename, 'wx');
        fs.writeSync(file, '0,1,2,2,3,3,4');
        fs.closeSync(file);
        this.subject.init();
      });

      it('sets the progress array', function() {
        expect(this.subject.progress).to.deep.equal([0,1,2,2,3,3,4]);
      });

      it('sets the previous success count', function() {
        expect(this.subject.previous).to.equal(4);
      });
    });
  });

  describe('save()', function() {
    describe('when there is no file yet', function() {
      beforeEach(function() {
        this.subject.init();
      });

      it("creates a file and saves the given progress value", function() {
        this.subject.save(5);
        var contents = fs.readFileSync(filename, 'utf-8');
        expect(contents).to.equal('5');
      });
    });

    describe("when there is an empty file", function() {
      beforeEach(function() {
        var file = fs.openSync(filename, 'wx');
        fs.closeSync(file);
        this.subject.init();
      });

      it("saves the given progress value", function() {
        this.subject.save(5);
        var contents = fs.readFileSync(filename, 'utf-8');
        expect(contents).to.equal('5');
      });
    });

    describe("when there is a file with progress in it", function() {
      beforeEach(function() {
        var file = fs.openSync(filename, 'wx');
        fs.writeSync(file, '0,1,2,2,3,3,4');
        fs.closeSync(file);
        this.subject.init();
      });

      it("appends the given progress value", function() {
        this.subject.save(5);
        var contents = fs.readFileSync(filename, 'utf-8');
        expect(contents).to.equal('0,1,2,2,3,3,4,5');
      });
    });
  });

  describe("encourage()", function() {
    describe("when the last five are all identical", function() {
      beforeEach(function() {
        this.subject.progress = [3,4,4,4,4,4];
      });

      it("outputs the expected message", function() {
        expect(this.subject.encourage(4)).to.equal('I sense frustration. Do not be afraid to ask for help.');
      });
    });

    describe("when the last two are identical", function() {
      beforeEach(function() {
        this.subject.progress = [3,4,4,4,5,5];
      });

      it("outputs the expected message", function() {
        expect(this.subject.encourage(5)).to.equal('Do not lose hope.');
      });
    });

    describe("when progress has been made", function() {
      beforeEach(function() {
        this.subject.progress = [0,1];
      });

      it("outputs the expected message", function() {
        expect(this.subject.encourage(1)).to.equal('You are progressing. Excellent. 1 completed.');
      });
    });
  });
});