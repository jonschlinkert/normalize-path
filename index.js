/*!
 * normalize-path <https://github.com/jonschlinkert/normalize-path>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

module.exports = function(filepath, stripTrailing) {
  filepath = filepath
    .replace(/[\\\/]+/g, '/')
    .toLowerCase();

  if (stripTrailing === false) {
    return filepath;
  }
  return filepath.replace(/\/$/g, '');
};
