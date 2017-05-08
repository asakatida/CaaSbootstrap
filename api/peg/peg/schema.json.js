const Bacon = require('baconjs').Bacon;

module.exports = function (req, res) {
  res.json({
    "$schema": "http://json-schema.org/draft-06/schema#",
    "description": "A PEG syntax tree",
    "$id": "https://" + req.hostname + req.originalUrl,
    "type": "object",
    "required": [
      "type",
      "fields"
    ],
    "properties": {
      "type": {
        "const": "Grammar"
      },
      "fields": {
        "type": "array",
        "items": [
          { "$ref": "#/definitions/Spacing" },
          {
            "type": "array",
            "items": { "$ref": "#/definitions/Definition" },
            "minItems": 1
          },
          { "$ref": "#/definitions/EndOfFile" }
        ]
      }
    },
    "definitions": {
      "Text": {
        "type": "object",
        "required": [
          "type",
          "text",
          "offset"
        ],
        "properties": {
          "type": {
            "const": "Text"
          },
          "text": {
            "type": "string"
          },
          "offset": {
            "type": "integer",
            "minimum": 0
          }
        }
      },
      "Definition": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "Definition"
          },
          "fields": {
            "type": "array",
            "items": [
              { "$ref": "#/definitions/Identifier" },
              { "$ref": "#/definitions/LEFTARROW" },
              { "$ref": "#/definitions/Expression" }
            ]
          }
        }
      },
      "Expression": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "Expression"
          },
          "fields": {
            "type": "array",
            "items": [
              { "$ref": "#/definitions/Sequence" },
              {
                "type": "array",
                "items": {
                  "type": "array",
                  "items": [
                    { "$ref": "#/definitions/SLASH" },
                    { "$ref": "#/definitions/Sequence" }
                  ]
                }
              }
            ]
          }
        }
      },
      "Sequence": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "Sequence"
          },
          "fields": {
            "type": "array",
            "items": { "$ref": "#/definitions/Prefix" }
          }
        }
      },
      "Prefix": {
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
                "oneOf": [
                  { "$ref": "#/definitions/AND" },
                  { "$ref": "#/definitions/NOT" },
                  { "const": null }
                ]
              },
              { "$ref": "#/definitions/Suffix" }
            ]
          }
        }
      },
      "Suffix": {
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
              { "$ref": "#/definitions/Primary" },
              {
                "oneOf": [
                  { "$ref": "#/definitions/QUESTION" },
                  { "$ref": "#/definitions/STAR" },
                  { "$ref": "#/definitions/PLUS" },
                  { "const": null }
                ]
              }
            ]
          }
        }
      },
      "Primary": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "Primary"
          },
          "identifier": { "$ref": "#/definitions/Identifier" },
          "open": { "$ref": "#/definitions/OPEN" },
          "expression": { "$ref": "#/definitions/Expression" },
          "close": { "$ref": "#/definitions/CLOSE" },
          "literal": { "$ref": "#/definitions/Literal" },
          "class": { "$ref": "#/definitions/Class" },
          "dot": { "$ref": "#/definitions/DOT" }
        }
      },
      "Identifier": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "Identifier"
          },
          "identstart": { "$ref": "#/definitions/IdentStart" },
          "identconts": {
            "type": "array",
            "items": { "$ref": "#/definitions/IdentCont" }
          },
          "spacing": { "$ref": "#/definitions/Spacing" }
        }
      },
      "IdentStart": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "IdentStart"
          },
          "text": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "enum": [
                      "a",
                      "b",
                      "c",
                      "d",
                      "e",
                      "f",
                      "g",
                      "h",
                      "i",
                      "j",
                      "k",
                      "l",
                      "m",
                      "n",
                      "o",
                      "p",
                      "q",
                      "r",
                      "s",
                      "t",
                      "u",
                      "v",
                      "w",
                      "x",
                      "y",
                      "z",
                      "A",
                      "B",
                      "C",
                      "D",
                      "E",
                      "F",
                      "G",
                      "H",
                      "I",
                      "J",
                      "K",
                      "L",
                      "M",
                      "N",
                      "O",
                      "P",
                      "Q",
                      "R",
                      "S",
                      "T",
                      "U",
                      "V",
                      "W",
                      "X",
                      "Y",
                      "Z",
                      "_"
                    ]
                  }
                }
              }
            ]
          }
        }
      },
      "IdentCont": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "IdentCont"
          },
          "text": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "enum": [
                      "0",
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9"
                    ]
                  }
                }
              }
            ]
          },
          "identstart": { "$ref": "#/definitions/IdentStart" }
        }
      },
      "Literal": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "Literal"
          },
          "open": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "\""
                  }
                }
              }
            ]
          },
          "chars": {
            "type": "array",
            "items": { "$ref": "#/definitions/Char" }
          },
          "close": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "\""
                  }
                }
              }
            ]
          },
          "spacing": { "$ref": "#/definitions/Spacing" }
        }
      },
      "Class": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "Class"
          },
          "open": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "["
                  }
                }
              }
            ]
          },
          "ranges": {
            "type": "array",
            "items": { "$ref": "#/definitions/Range" }
          },
          "close": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "]"
                  }
                }
              }
            ]
          },
          "spacing": { "$ref": "#/definitions/Spacing" }
        }
      },
      "Range": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "Range"
          },
          "start": { "$ref": "#/definitions/Char" },
          "text": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "-"
                  }
                }
              }
            ]
          },
          "end": { "$ref": "#/definitions/Char" }
        }
      },
      "Char": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "Char"
          },
          "text": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "type": "string",
                    "pattern": "^(\\\\([nrt''\\[\\]\\\\]|[0-2][0-7][0-7|[0-7][0-7]?])|[^\\\\])$"
                  }
                }
              }
            ]
          }
        }
      },
      "LEFTARROW": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "LEFTARROW"
          },
          "text": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "<-"
                  }
                }
              }
            ]
          },
          "spacing": { "$ref": "#/definitions/Spacing" }
        }
      },
      "SLASH": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "SLASH"
          },
          "text": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "/"
                  }
                }
              }
            ]
          },
          "spacing": { "$ref": "#/definitions/Spacing" }
        }
      },
      "AND": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "AND"
          },
          "text": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "&"
                  }
                }
              }
            ]
          },
          "spacing": { "$ref": "#/definitions/Spacing" }
        }
      },
      "NOT": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "NOT"
          },
          "not": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "!"
                  }
                }
              }
            ]
          },
          "spacing": { "$ref": "#/definitions/Spacing" }
        }
      },
      "QUESTION": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "QUESTION"
          },
          "text": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "?"
                  }
                }
              }
            ]
          },
          "spacing": { "$ref": "#/definitions/Spacing" }
        }
      },
      "STAR": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "STAR"
          },
          "text": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "*"
                  }
                }
              }
            ]
          },
          "spacing": { "$ref": "#/definitions/Spacing" }
        }
      },
      "PLUS": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "PLUS"
          },
          "text": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "+"
                  }
                }
              }
            ]
          },
          "spacing": { "$ref": "#/definitions/Spacing" }
        }
      },
      "OPEN": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "OPEN"
          },
          "text": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "("
                  }
                }
              }
            ]
          },
          "spacing": { "$ref": "#/definitions/Spacing" }
        }
      },
      "CLOSE": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "CLOSE"
          },
          "text": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": ")"
                  }
                }
              }
            ]
          },
          "spacing": { "$ref": "#/definitions/Spacing" }
        }
      },
      "DOT": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "DOT"
          },
          "dot": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "."
                  }
                }
              }
            ]
          },
          "spacing": { "$ref": "#/definitions/Spacing" }
        }
      },
      "Spacing": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "Spacing"
          },
          "spacing": {
            "type": "array",
            "items": {
              "oneOf": [
                { "$ref": "#/definitions/Space" },
                { "$ref": "#/definitions/Comment" }
              ]
            }
          }
        }
      },
      "Comment": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "Comment"
          },
          "start": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "const": "#"
                  }
                }
              }
            ]
          },
          "content": {
            "type": "array",
            "items": { "$ref": "#/definitions/Text" }
          },
          "endofline": { "$ref": "#/definitions/EndOfLine" }
        }
      },
      "Space": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "Space"
          },
          "text": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "enum": [
                      " ",
                      "\t"
                    ]
                  }
                }
              }
            ]
          },
          "endofline": { "$ref": "#/definitions/EndOfLine" }
        }
      },
      "EndOfLine": {
        "type": "object",
        "required": [
          "type",
          "fields"
        ],
        "properties": {
          "type": {
            "const": "EndOfLine"
          },
          "text": {
            "allOf": [
              { "$ref": "#/definitions/Text" },
              {
                "type": "object",
                "properties": {
                  "text": {
                    "enum": [
                      "\r",
                      "\r\n",
                      "\n"
                    ]
                  }
                }
              }
            ]
          }
        }
      },
      "EndOfFile": {
        "type": "object",
        "required": [
          "type"
        ],
        "properties": {
          "type": {
            "const": "EndOfFile"
          }
        }
      }
    }
  });
};
