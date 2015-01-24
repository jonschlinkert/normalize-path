'use strict';

var Suite = require('benchmarked');

var suite = new Suite({
  result: true,
  fixtures: 'fixtures/trailing.js',
  add: 'code/*-trailing.js',
  cwd: __dirname
});

suite.run();