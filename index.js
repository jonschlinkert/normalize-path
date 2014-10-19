/*!
 * normalize-path <https://github.com/jonschlinkert/normalize-path>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

module.exports = function(filepath) {
  return filepath
    .replace(/[\\\/]+/g, '/')
    .replace(/^\.[\\\/]/g, '')
    .replace(/\/$/g, '')
    .toLowerCase();
};
