const Bacon = require('baconjs').Bacon;
const compile = require('./support/transform');

const transform = compile([
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Grammar"
        }
      }
    },
    "result": {
      "map": { "join": { "path": "$.fields[1]" } }
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Definition"
        }
      }
    },
    "result": {
      "object": {
        "identifier": { "recurse": { "path": "$.fields[0]" } },
        "expression": { "recurse": { "path": "$.fields[2]" } }
      }
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Expression"
        }
      }
    },
    "result": {
      "object": {
        "sequences": { "map": { "path": "$.fields[0,1][*][1]" } }
      }
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Sequence"
        }
      }
    },
    "result": {
      "map": {
        "join": {
          "array": [
            { "path": "$.fields[:1]" },
            { "path": "$.fields[1][*][1]" }
          ]
        }
      }
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Prefix"
        },
        "fields": {
          "type": "array",
          "items": [
            {
              "type": "object",
              "required": [
                "type",
                "fields"
              ],
              "properties": {
                "type": {
                  "const": "AND"
                }
              }
            },
            { "type": "object" }
          ]
        }
      }
    },
    "result": {
      "object": { "and": { "recurse": { "path": "$.fields[1]" } } }
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Prefix"
        },
        "fields": {
          "type": "array",
          "items": [
            {
              "type": "object",
              "required": [
                "type",
                "fields"
              ],
              "properties": {
                "type": {
                  "const": "NOT"
                }
              }
            },
            { "type": "object" }
          ]
        }
      }
    },
    "result": {
      "object": { "not": { "recurse": { "path": "$.fields[1]" } } }
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Prefix"
        },
        "fields": {
          "type": "array",
          "items": [
            { "const": null },
            { "type": "object" }
          ]
        }
      }
    },
    "result": {
      "recurse": { "path": "$.fields[1]" }
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Suffix"
        },
        "fields": {
          "type": "array",
          "items": [
            { "type": "object" },
            {
              "type": "object",
              "required": [
                "type",
                "fields"
              ],
              "properties": {
                "type": {
                  "const": "QUESTION"
                }
              }
            }
          ]
        }
      }
    },
    "result": {
      "object": { "question": { "recurse": { "path": "$.fields[0]" } } }
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Suffix"
        },
        "fields": {
          "type": "array",
          "items": [
            { "type": "object" },
            {
              "type": "object",
              "required": [
                "type",
                "fields"
              ],
              "properties": {
                "type": {
                  "const": "STAR"
                }
              }
            }
          ]
        }
      }
    },
    "result": {
      "object": { "star": { "recurse": { "path": "$.fields[0]" } } }
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Suffix"
        },
        "fields": {
          "type": "array",
          "items": [
            { "type": "object" },
            {
              "type": "object",
              "required": [
                "type",
                "fields"
              ],
              "properties": {
                "type": {
                  "const": "PLUS"
                }
              }
            }
          ]
        }
      }
    },
    "result": {
      "object": { "plus": { "recurse": { "path": "$.fields[0]" } } }
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Suffix"
        },
        "fields": {
          "type": "array",
          "items": [
            { "type": "object" },
            { "const": null }
          ]
        }
      }
    },
    "result": {
      "recurse": { "path": "$.fields[0]" }
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Primary"
        },
        "fields": {
          "type": "array",
        }
      }
    },
    "result": { "object": {} }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Identifier"
        },
        "fields": {
          "type": "array",
        }
      }
    },
    "result": {
      "join": {
        "join": {
          "array": [
            { "path": "$.fields[:1]..text" },
            { "path": "$.fields[1]..text" }
          ]
        }
      }
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Literal"
        },
        "fields": {
          "type": "array",
        }
      }
    },
    "result": {
      "join": { "path": "$.fields[1]..text" }
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Class"
        },
        "fields": {
          "type": "array",
        }
      }
    },
    "result": {
      "map": { "path": "$.fields[1]" }
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Range"
        },
        "fields": {
          "type": "array",
        }
      }
    },
    "result": {
       "object": {}
    }
  },
  {
    "schema": {
      "$schema": "http://json-schema.org/draft-06/schema#",
      "type": "object",
      "required": [
        "type",
        "fields"
      ],
      "properties": {
        "type": {
          "const": "Range"
        },
        "fields": {
          "type": "array",
        }
      }
    },
    "result": {
       "object": {}
    }
  }
]);

module.exports = function (req, res) {
  req.runMiddleware('/api/peg/peg', function (code, data, headers) {
    if (code !== 200) {
      res.status(code).json(data);
      return;
    }

    Bacon.once(data)
    .flatMap(Bacon.try(JSON.parse))
    .flatMap(Bacon.try(transform))
    .subscribe(function (event) {
      if (event.isError()) {
        res.status(500).json(event.error);
      } else if (event.hasValue()) {
        res.json(event.value());
      }
    });
  });
};
