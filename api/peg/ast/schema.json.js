const Bacon = require('baconjs').Bacon;

module.exports = function (req) {
  return Bacon.once({
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "A PEG abstract syntax tree",
    "id": "https://" + req.hostname + req.originalUrl,
    "type": "object"
  }).toPromise();
};
