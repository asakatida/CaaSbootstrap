const Bacon = require('baconjs').Bacon;

module.exports = function (req, res) {
  res.json({
    "$schema": "http://json-schema.org/draft-06/schema#",
    "description": "A generic syntax tree",
    "$id": "https://" + req.hostname + req.originalUrl,
    "additionalProperties": false,
    "definitions": {
      "element": {
        "anyOf": [
          { "$ref": "#" },
          { "$ref": "#/definitions/nodeArray" },
          { "$ref": "#/definitions/text" },
          { "const": null }
        ]
      },
      "nodeArray": {
        "items": { "$ref": "#/definitions/element" },
        "type": "array"
      },
      "text": {
        "additionalProperties": false,
        "properties": {
          "offset": {
            "minimum": 0,
            "type": "integer"
          },
          "text": {
            "type": "string"
          },
          "type": {
            "pattern": "^\\w+$",
            "type": "string"
          }
        },
        "required": [
          "text",
          "type",
          "offset"
        ],
        "type": "object"
      }
    },
    "properties": {
      "fields": { "$ref": "#/definitions/element" },
      "type": {
        "pattern": "^\\w+$",
        "type": "string"
      }
    },
    "required": [ "type" ],
    "type": "object"
  });
};
