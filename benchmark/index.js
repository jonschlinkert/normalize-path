'use strict';

var Suite = require('benchmarked');

var suite = new Suite({
  result: true,
  fixtures: 'fixtures/{unix,win}.js',
  add: 'code/{current,while}.js',
  cwd: __dirname
});

suite.run();
