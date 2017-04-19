const Bacon = require('baconjs').Bacon;

module.exports = function (req) {
  return Bacon.once({
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "A generic syntax tree",
    "id": "https://" + req.hostname + req.originalUrl,
    "additionalProperties": { "$ref": "#/definitions/element" },
    "definitions": {
      "element": {
        "anyOf": [
          { "$ref": "#" },
          { "$ref": "#/definitions/nodeArray" },
          { "$ref": "#/definitions/text" }
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
            "pattern": "^\\w+$",
            "type": "string"
          },
          "type": {
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
      "text": { "$ref": "#/definitions/text" },
      "type": {
        "pattern": "^\\w+$",
        "type": "string"
      }
    },
    "required": [ "type" ],
    "type": "object"
  }).toPromise();
};
