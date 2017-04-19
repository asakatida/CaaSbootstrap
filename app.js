const express = require('express');
const api_peg_ast = require('./api/peg/ast');
const api_peg_ast_schema_json = require('./api/peg/ast/schema.json');
const api_peg_peg = require('./api/peg/peg');
const api_peg_peg_schema_json = require('./api/peg/peg/schema.json');
const resources_peg_peg = require('./resources/peg.peg');

const app = express();

app.get('/', function (req, res) { res.render('index.pug'); });

app.get('/api', function (req, res) { res.render('api.pug'); });

app.get('/resources/peg.peg', function (req, res) {
  resources_peg_peg(req).then(function (msg) { res.send(msg); }, function (error) {
    res.status(500).json(error);
  });
});

app.get('/api/peg/ast/schema.json', function (req, res) {
  api_peg_ast_schema_json(req).then(function (msg) { res.json(msg); }, function (error) {
    res.status(500).json(error);
  });
});

app.get('/api/peg/ast', function (req, res) {
  api_peg_ast(req).then(function (msg) { res.json(msg); }, function (error) {
    res.status(500).json(error);
  });
});

app.get('/api/peg/peg/schema.json', function (req, res) {
  api_peg_peg_schema_json(req).then(function (msg) { res.json(msg); }, function (error) {
    res.status(500).json(error);
  });
});

app.get('/api/peg/peg', function (req, res) {
  api_peg_peg(req).then(function (msg) { res.json(msg); }, function (error) {
    res.status(500).json(error);
  });
});

module.exports = app;
