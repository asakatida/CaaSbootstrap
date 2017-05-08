const express = require('express');
const run_middleware = require('run-middleware');

const api_peg_ast = require('./api/peg/ast');
const api_peg_ast_schema_json = require('./api/peg/ast/schema.json');
const api_peg_peg = require('./api/peg/peg');
const api_peg_peg_schema_json = require('./api/peg/peg/schema.json');
const api_peg_peg_schema_schema_json = require('./api/peg/peg/schema/schema.json');
const resources_peg_peg = require('./resources/peg.peg');

const app = express();
run_middleware(app);

app.get('/', function (req, res) { res.render('index.pug'); });
app.get('/api', function (req, res) { res.render('api.pug'); });

app.get('/resources/peg.peg', resources_peg_peg);
app.get('/api/peg/ast/schema.json', api_peg_ast_schema_json);
app.get('/api/peg/ast', api_peg_ast);
app.get('/api/peg/peg/schema/schema.json', api_peg_peg_schema_schema_json);
app.get('/api/peg/peg/schema.json', api_peg_peg_schema_json);
app.get('/api/peg/peg', api_peg_peg);

module.exports = app;
