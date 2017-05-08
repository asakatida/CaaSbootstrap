const Bacon = require('baconjs').Bacon;

module.exports = function (req, res) {
  res.json({
    "$schema": "http://json-schema.org/draft-06/schema#",
    "description": "A PEG abstract syntax tree",
    "$id": "https://" + req.hostname + req.originalUrl,
    "type": "object"
  });
};
