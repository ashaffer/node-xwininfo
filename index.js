var xwininfo = module.exports = {};
var Parser = require('simple-parser');
var exec = require('child_process').exec;

xwininfo.root = function(cb) {
  exec('xwininfo -root -tree', function(err, data) {
    if(err) return cb(err);
    cb(null, data.split('\n').map(function(line) {
      var parser = new Parser(line);
      parser.whitespace();
      if(parser.str.indexOf('0x') !== 0)
        return null;
      return {
        id: parser.hex(),
        text: parser.rest()
      };
    }).filter(Boolean));
  });
};