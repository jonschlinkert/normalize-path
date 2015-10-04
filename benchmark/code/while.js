module.exports = function normalize(str, strip) {
  var len = str.length, i = -1;
  var res = '';
  var prev;

  while (++i < len) {
    var ch = str[i];

    if (i === 0) {
      if (ch === '.' && str[i + 1] === '/') {
        i++;
        continue;
      }
    }

    var is = isSlash(ch);
    if (i === len - 1 && is) {
      if (strip !== false) {
        if (prev) res = res.slice(0, res.length -1);
        continue;
      }
    }

    if (is) {
      if (prev) continue;
      res += '/';
    } else {
      res += ch;
    }

    prev = is;
  }

  return res;
};


function isSlash(ch) {
  return ch === '\\' || ch === '/';
}