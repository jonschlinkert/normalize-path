/*!
 * normalize-path <https://github.com/jonschlinkert/normalize-path>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
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

describe('normalize:', function () {
  it('should normalize "E://foo//bar//baz"', function() {
    assert.equal(normalize('E://foo//bar//baz'), 'E:/foo/bar/baz');
  });
  it('should normalize "E://foo//bar//baz//"', function() {
    assert.equal(normalize('E://foo//bar//baz//'), 'E:/foo/bar/baz');
  });
  it('should normalize "E:/foo/bar/baz/"', function() {
    assert.equal(normalize('E:/foo/bar/baz/'), 'E:/foo/bar/baz');
  });
  it('should normalize "E://foo\\bar\\baz"', function() {
    assert.equal(normalize('E://foo\\bar\\baz'), 'E:/foo/bar/baz');
  });
  it('should normalize "foo\\bar\\baz"', function() {
    assert.equal(normalize('foo\\bar\\baz'), 'foo/bar/baz');
  });
  it('should normalize "foo\\bar\\baz\\"', function() {
    assert.equal(normalize('foo\\bar\\baz\\'), 'foo/bar/baz');
  });
  it('should normalize "E://foo/bar\\baz"', function() {
    assert.equal(normalize('E://foo/bar\\baz'), 'E:/foo/bar/baz');
  });
  it('should normalize "E:\\\\foo/bar\\baz"', function() {
    assert.equal(normalize('E:\\\\foo/bar\\baz'), 'E:/foo/bar/baz');
  });
  it('should normalize "foo/bar\\baz"', function() {
    assert.equal(normalize('//foo/bar\\baz'), '/foo/bar/baz');
  });
  it('should normalize "foo\\bar\\baz"', function() {
    assert.equal(normalize('//foo\\bar\\baz'), '/foo/bar/baz');
  });
  it('should normalize "C:\\user\\docs\\Letter.txt"', function() {
    assert.equal(normalize('C:\\user\\docs\\Letter.txt'), 'C:/user/docs/Letter.txt');
  });
  it('should normalize "user/docs/Letter.txt"', function() {
    assert.equal(normalize('/user/docs/Letter.txt'), '/user/docs/Letter.txt');
  });
  it('should normalize "C:Letter.txt"', function() {
    assert.equal(normalize('C:Letter.txt'), 'C:Letter.txt');
  });
  it('should normalize "Server01\\user\\docs\\Letter.txt"', function() {
    assert.equal(normalize('\\Server01\\user\\docs\\Letter.txt'), '/Server01/user/docs/Letter.txt');
  });
  it('should normalize "UNC\\Server01\\user\\docs\\Letter.txt"', function() {
    assert.equal(normalize('\\?\\UNC\\Server01\\user\\docs\\Letter.txt'), '/?/UNC/Server01/user/docs/Letter.txt');
  });
  it('should normalize "C:\\user\\docs\\Letter.txt"', function() {
    assert.equal(normalize('\\?\\C:\\user\\docs\\Letter.txt'), '/?/C:/user/docs/Letter.txt');
  });
  it('should normalize "C:\\user\\docs\\somefile.ext:alternate_stream_name"', function() {
    assert.equal(normalize('C:\\user\\docs\\somefile.ext:alternate_stream_name'), 'C:/user/docs/somefile.ext:alternate_stream_name');
  });
  it('should normalize "grandparent"', function() {
    assert.equal(normalize('../../grandparent'), '../../grandparent');
  });

  describe('when `false` is passed as the last argument:', function() {
    it('should not strip trailing slashes', function() {
      assert.equal(normalize('foo\\bar\\baz\\', false), 'foo/bar/baz/');
      assert.equal(normalize('foo/bar/baz/', false), 'foo/bar/baz/');
      assert.equal(normalize('./foo/bar/baz/', false), './foo/bar/baz/');
    });
  });
});
