var fs = require('fs'),
    PROGRESS_FILE = '.path-progress',
    PROGRESS_DIRECTORY = './';

exports = module.exports = ProgressRecord;

function ProgressRecord() {
  this.progress = [];
  this.previous = 0;
}

ProgressRecord.prototype.init = function() {
  this.load();
  this.setPrevious();
};

ProgressRecord.prototype.load = function() {
  var contents;
  try {
    contents = fs.readFileSync(PROGRESS_FILE, 'utf-8');
  } catch(e) {}
  this.progress = this.processProgress(contents) || [];
};

ProgressRecord.prototype.save = function(passCount) {
  this.progress.push(passCount);
  this.write();
};

ProgressRecord.prototype.write = function() {
  try {
    fs.writeFileSync(PROGRESS_DIRECTORY + PROGRESS_FILE, this.progress.join(','));
  } catch(e) {
    console.log('Failed to write');
    console.log(e);
  }
};

ProgressRecord.prototype.setPrevious = function() {
  this.previous = (this.progress.length) ? parseInt(this.progress[this.progress.length - 1], 10) : 0;
};

ProgressRecord.prototype.encourage = function(passCount) {
  var len = this.progress.length,
      lastFive = this.progress.slice(-5).sort(),
      lastTwo = this.progress.slice(-2);
  if (len >= 5 && (lastFive[0] == lastFive[lastFive.length - 1])) {
    return 'I sense frustration. Do not be afraid to ask for help.';
  } else if (len >= 2 && lastTwo[0] == lastTwo[1]) {
    return 'Do not lose hope.';
  } else if (passCount > 0) {
    return 'You are progressing. Excellent. ' + passCount + ' completed.';
  } else {
    return '';
  }
};

ProgressRecord.prototype.processProgress = function(contents) {
  if (!contents) return false;
  var progress = (contents + '').split(',');
  return progress.filter(function(item) { return !!item; })
    .map(function(item) { return parseInt(item, 10); });
};