'use strict';

module.exports = function(fp, stripTrailing) {
  fp = fp.replace(/[\\\/]+/g, '/');
  if (stripTrailing === true) {
    return fp.replace(/\/$/g, '');
  }
  return fp;
};
