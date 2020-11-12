var path = require('path');
path.sep = '/';

module.exports = function(fp, stripTrailing) {
  fp = path.normalize(fp).replace(/\\+/g, '/');
  if (stripTrailing === false) {
    return fp;
  }
  return fp.replace(/\/$/g, '');
};
