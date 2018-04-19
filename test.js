'use strict';

/*!
 * normalize-path <https://github.com/jonschlinkert/normalize-path>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Licensed under the MIT License
 */

require('mocha');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var assert = require('assert');
var normalize = require('./');

if (argv.bench) {
  var b = path.join(__dirname, 'benchmark/code', argv.bench);
  console.log(b);
  normalize = require(b);
}

describe('normalize-path', function() {
  describe('single slash', function() {
    it('should always return a single forward slash', function() {
      assert.equal(normalize('/'), '/');
      assert.equal(normalize('/', true), '/');

      assert.equal(normalize('\\'), '/');
      assert.equal(normalize('\\', true), '/');
    });
  });

  describe('strip trailing slashes', function() {
    var units = [
      ['../../foo/bar', '../../foo/bar'],
      ['..\\..\\foo/bar', '../../foo/bar'],
      ['..\\\\..\\\\foo/bar', '../../foo/bar'],
      ['//foo/bar\\baz', '/foo/bar/baz'],
      ['//foo\\bar\\baz', '/foo/bar/baz'],
      ['/user/docs/Letter.txt', '/user/docs/Letter.txt'],
      ['\\?\\C:\\user\\docs\\Letter.txt', '/?/C:/user/docs/Letter.txt'],
      ['\\?\\UNC\\Server01\\user\\docs\\Letter.txt', '/?/UNC/Server01/user/docs/Letter.txt'],
      ['\\\\.\\CdRomX', '//./CdRomX'],
      ['\\\\.\\PhysicalDiskX', '//./PhysicalDiskX'],
      ['\\\\?\\C:\\user\\docs\\Letter.txt', '//?/C:/user/docs/Letter.txt'],
      ['\\\\?\\UNC\\Server01\\user\\docs\\Letter.txt', '//?/UNC/Server01/user/docs/Letter.txt'],
      ['\\Server01\\user\\docs\\Letter.txt', '/Server01/user/docs/Letter.txt'],
      ['C:\\user\\docs\\Letter.txt', 'C:/user/docs/Letter.txt'],
      ['C:\\user\\docs\\somefile.ext:alternate_stream_name', 'C:/user/docs/somefile.ext:alternate_stream_name'],
      ['C:Letter.txt', 'C:Letter.txt'],
      ['E://foo//bar//baz', 'E:/foo/bar/baz'],
      ['E://foo//bar//baz//', 'E:/foo/bar/baz'],
      ['E://foo//bar//baz//////', 'E:/foo/bar/baz'],
      ['E://foo/bar\\baz', 'E:/foo/bar/baz'],
      ['E://foo\\bar\\baz', 'E:/foo/bar/baz'],
      ['E:/foo/bar/baz/', 'E:/foo/bar/baz'],
      ['E:/foo/bar/baz///', 'E:/foo/bar/baz'],
      ['E:\\\\foo/bar\\baz', 'E:/foo/bar/baz'],
      ['foo\\bar\\baz', 'foo/bar/baz'],
      ['foo\\bar\\baz\\', 'foo/bar/baz'],
      ['foo\\bar\\baz\\\\\\', 'foo/bar/baz'],
    ];

    units.forEach(function(unit) {
      it('should normalize ' + unit[0], function() {
        assert.equal(normalize(unit[0]), unit[1]);
      });
    });
  });

  describe('keep trailing slashes', function() {
    var units = [
      ['\\', '/'],
      ['foo\\bar\\baz\\', 'foo/bar/baz/'],
      ['foo\\\\bar\\\\baz\\\\', 'foo/bar/baz/'],
      ['foo//bar//baz//', 'foo/bar/baz/'],
      ['foo/bar/baz/', 'foo/bar/baz/'],
      ['./foo/bar/baz/', './foo/bar/baz/']
    ];

    units.forEach(function(unit) {
      it('should normalize ' + unit[0], function() {
        assert.equal(normalize(unit[0], false), unit[1]);
      });
    });
  });
});
