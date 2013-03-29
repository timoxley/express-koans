var fs = require('fs'),
    color = require('mocha').reporters.Base.color,
    ProgressRecord = require('./progress-record');

exports = module.exports = Koans;

function Koans(runner) {

  var failedKoan,
      INDENT = '  ',
      passed = 0,
      progress = new ProgressRecord();

  var zenStatements = [
    'Mountains are merely mountains.',
    'Learn the rules so you know how to break them properly.',
    'Remember that silence is sometimes the best answer.',
    'Sleep is the best meditation.',
    'When you lose, don\'t lose the lesson.',
    'Things are not what they appear to be: nor are they otherwise.'
  ];

  function showSummary(failedKoan) {
    var encourageMessage = progress.encourage(passed);
    console.log('The Master says:');
    console.log(INDENT + color('medium', 'You have not yet reached enlightenment.'));
    if (encourageMessage) console.log(INDENT + color('medium', encourageMessage));
    console.log();
    console.log('The answers you seek...');
    console.log(INDENT + color('error message', failedKoan.err.message));
    console.log();
    console.log('Please meditate on the following code');
    console.log(INDENT + color('error message', filterTrace(failedKoan.err.stack)));
    console.log();
    console.log(color('medium', zenLikeStatement(passed)));
  }

  function showProgress(passed, total) {
    if (!total) return false;
    var width = 50,
        passedChars = Math.floor(width * passed / total),
        failedChars = width - passedChars;
        message = 'your path thus far ',
        summary = passed + '/' + total,
        out = color('medium', message) +
          color('medium', '[') +
          color('bright pass', Array(passedChars + 1).join('.')) +
          color('fail', 'X') +
          color('medium', Array(failedChars).join('_')) +
          color('medium', '] ') +
          summary;
    console.log(out);
  }

  function showCompletion() {
    console.log(color('bright pass', 'Mountains are merely mountains again.'));
    console.log();
    console.log(color('bright pass', '                                                                                '));
    console.log(color('bright pass', '                                     ++                                         '));
    console.log(color('bright pass', '                                   ++++++          +++                          '));
    console.log(color('bright pass', '                       ++++++     ++++++++++      ++++++                        '));
    console.log(color('bright pass', '                       ++++++    ++++++++++++     ++++++                        '));
    console.log(color('bright pass', '                       ++++++   +++++++++++++++   ++++++                        '));
    console.log(color('bright pass', '                               +++++++++++++++++          ++++++                '));
    console.log(color('bright pass', '                              +++++++++++++++++++    ++++++++++++               '));
    console.log(color('bright pass', '            +++++++++++++++++++++++       ++++++++++++++++++++++++              '));
    console.log(color('bright pass', '            ++++++++++++++++++++++         +++++++++++++++++++++++              '));
    console.log(color('bright pass', '            +++++++++++++++++++++           ++++++++++++++++++++++              '));
    console.log(color('bright pass', '            ++++++++++++++++++++++           ++++++       ++++++++              '));
    console.log(color('bright pass', '            +++++++++    +++++++++++         ++++++        ++++++++             '));
    console.log(color('bright pass', '    +++++   +++++++          ++++++++        ++++++         +++++++  ++++++     '));
    console.log(color('bright pass', '   +++++++   +++++             +++++++        +++++         +++++++  ++++++     '));
    console.log(color('bright pass', '    +++++    +++++               ++++++       +++++         ++++++   +++++      '));
    console.log(color('bright pass', '     +++     +++++                +++++       +++++        +++++++              '));
    console.log(color('bright pass', '              +++++++               ++++      ++++         ++++++++++++         '));
    console.log(color('bright pass', '          ++++++++++++++++           +++      ++++        +++++++++++++++++     '));
    console.log(color('bright pass', '       +++++++++++++++++++++++        +++     +++        +++++++ +++++++++++++  '));
    console.log(color('bright pass', '     +++++++++++++++++++++++++++      +++    ++++       +++++++    +++++++++++++'));
    console.log(color('bright pass', '   +++++++++++++           +++++++     ++    +++       ++++++        ++++++++++ '));
    console.log(color('bright pass', '  ++++++++++                    ++++    +    ++      +++++++         ++++++++++ '));
    console.log(color('bright pass', ' ++++++++++                        ++   +   ++      ++++++           +++++++++  '));
    console.log(color('bright pass', '+++++++++++                          +     ++     ++++++             ++++++++   '));
    console.log(color('bright pass', '  +++++++++              ++++++++++            +++++               +++++++++    '));
    console.log(color('bright pass', '   ++++++++        ++++++++++++++           ++                   ++++++++++     '));
    console.log(color('bright pass', '     +++++++    +++++++++++++                                  +++++++++++      '));
    console.log(color('bright pass', '      ++++++++++++++++++++                  ++           +++++++++++++++        '));
    console.log(color('bright pass', '         +++++++++++++++                       +++++++++++++++++++++++          '));
    console.log(color('bright pass', '           +++++++++                              +++++++++++++++++             '));
    console.log(color('bright pass', '                                                                                '));
  }

  function zenLikeStatement(i) {
    return zenStatements[i % zenStatements.length];
  }

  function filterTrace(trace) {
    var lines = trace.split('\n');
    return lines.filter(function(line) {
      return !line.match(/mocha/) && !line.match(/\(node\.js\:\d+\:\d+\)$/);
    }).join('\n');
  }

  runner.on('start', function() {
    passed = 0;
    // clear screen
    process.stdout.write('\u001b[2J');
    // set cursor position
    process.stdout.write('\u001b[1;3H');
    console.log();
    progress.init();
  });

  runner.on('pass', function(test) {
    passed += 1;
    if (passed > progress.previous) {
      var out = color('bright pass', '✔ ' + test.fullTitle());
      out += color('pass', ' has expanded your awareness.');
      console.log(out);
    }
  });

  runner.on('fail', function(test, err) {
    var out = color('bright fail', '✘ ' + test.fullTitle());
    out += color('fail', ' has damaged your karma.');
    console.log(out);
    test.err = err;
    failedKoan = test;
  });

  runner.on('end', function() {
    if (failedKoan) {
      console.log();
      progress.save(passed);
      showSummary(failedKoan);
      showProgress(passed, this.total);
    } else {
      showCompletion();
    }
  });
}