const Ajv = require('ajv');
const Bacon = require('baconjs').Bacon;
const jsonpath = require('jsonpath');

const ajv = new Ajv();

function lower(result) {
  if (result.array) {
    var array = result.array.map(lower);
    return function (input) {
      return array.map(function (code) {
        return code(input);
      });
    };
  } else if (result.join) {
    var code = lower(result.join);
    return function (input) {
      var output = code(input);
      return Array.isArray(output[0]) ? output.reduce(function (acc, value) {
        return acc.concat(value)
      }) : output.join();
    };
  } else if (result.map) {
    var code = lower(result.map);
    return function (input, recurse) {
      return code(input).map(recurse);
    };
  } else if (result.object) {
    var object = Object.keys(result.object).map(function (key) {
      return {key: key, code: lower(result.object[key])};
    });
    return function (input) {
      var output = {};
      object.forEach(function (code) {
        output[code.key] = code.code(input);
      });
      return output;
    };
  } else if (result.path) {
    return function (input) {
      return jsonpath.query(input, result.path);
    };
  } else if (result.recurse) {
    var code = lower(result.recurse);
    return function (input, recurse) {
      return recurse(code(input));
    };
  } else {
    throw JSON.stringify(result);
  }
};

function compile(code) {
  var processor = code.map(function (value) {
    return {validate: ajv.compile(value.schema), lower: lower(value.result)};
  });
  function recurse(input) {
    var code = processor.find(function (validate) {
      validate.validate(input);
    });
    if (code) {
      return code(input, recurse);
    }
    throw "invalid input";
  }
  return recurse;
};

module.exports = compile;
