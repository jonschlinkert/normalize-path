'use strict';

module.exports = function(fp, stripTrailing) {
  fp = fp.replace(/[\\\/]+/g, '/');
  if (stripTrailing === true) {
    return fp.slice(-1) === '/'
      ? fp.slice(0, fp.length -1)
      : fp;
  }
  return fp;
};
