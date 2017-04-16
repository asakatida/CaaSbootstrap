const Bacon = require('baconjs').Bacon;
const express = require('express');
const http = require('http');
const peg = require('./peg');
const request = require('superagent');
const winston = require('winston');

const PORT = process.env.PORT || 8080;

const app = express();
const apipeg = express();

winston.handleExceptions(new winston.transports.File({filename: 'exceptions.log'}));
winston.emitErrs = false;

app.get('/', function (req, res) { res.render('index.pug'); });

app.get('/api', function (req, res) { res.render('api.pug'); });

app.get('/resources/peg/schema', function (req, res) {
  res.sendFile('schema.json', {root: __dirname});
});

app.get('/resources/peg', function (req, res) {
  res.type('text').sendFile('peg.peg', {root: __dirname});
});

app.use('/api/peg', apipeg);

apipeg.get('/peg/schema', function (req, res) {
  res.type('json').sendFile('peg.schema', {root: __dirname});
});

apipeg.get('/peg', function (req, res) {
  if (!req.query.src) {
    return res.status(500).json({error: 'Request Failed. No query src.'});
  }

  function handleError (error) {
    res.status(500).json(error);
    winston.error(error);
  }

  Bacon.fromPromise(request.get(req.query.src)).flatMap(function (res) {
    const statusCode = res.statusCode;

    if (statusCode !== 200) {
      res.resume();
      return new Bacon.Error({error: 'Request Failed. ${statusCode}'});
    }

    res.on('error', handleError);

    return (!res.buffered ? Bacon.combineAsArray(
      Bacon.fromEvent(res, 'data').takeUntil(Bacon.fromEvent(res, 'end'))
    ).map(function (body) {
      return Buffer.concat(body).toString('utf8');
    }) : Bacon.once(res.text)).flatMap(Bacon.try(peg.parse));
  }).first().toPromise().then(function (msg) { res.json(msg); }, handleError);
});

module.exports = {app: app};
