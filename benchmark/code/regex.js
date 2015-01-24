'use strict';

module.exports = function(fp) {
  return fp
    .replace(/[\\\/]+/g, '/')
    .replace(/\/$/g, '');
};
