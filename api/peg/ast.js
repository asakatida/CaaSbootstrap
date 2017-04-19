const Bacon = require('baconjs').Bacon;
const peg = require('./peg');

module.exports = function (req) {
  return Bacon.fromPromise(peg(req)).map(function (msg) {
    return msg;
  }).toPromise()
};
