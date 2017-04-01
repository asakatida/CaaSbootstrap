'use strict';

const Bacon = require('baconjs').Bacon;
const express = require('express');
const http = require('http');
const peg = require('./peg');
const winston = require('winston')

const PORT = process.env.PORT || 8080;

const app = express();
const apipeg = express();

winston.handleExceptions(new winston.transports.File({filename: 'exceptions.log'}))
winston.emitErrs = false

app.get('/', function (req, res) { res.render('index.pug') })

app.get('/api', function (req, res) { res.render('api.pug') })

app.get('/api/schema', function (req, res) {
  res.sendFile('schema.json', {root: __dirname})
})

app.get('/resources/peg', function (req, res) {
  res.type('text').sendFile('peg.peg', {root: __dirname})
})

app.use('/api/peg', apipeg);

apipeg.get('/schema', function (req, res) {
  res.type('json').sendFile('peg.schema', {root: __dirname})
})

apipeg.get('*', function (req, res) {
  var clientRequest = http.request('http:/' + req.path)

  var handleError = function (error) {
    clientRequest.destroy();
    res.status(500).json(error);
    winston.error(error);
  }

  clientRequest.on('error', handleError)

  Bacon.fromEvent(clientRequest, 'response').flatMap(function (res) {
    const statusCode = res.statusCode;

    if (statusCode !== 200) {
      res.resume()
      return new Bacon.Error({error: 'Request Failed. ${statusCode}'});
    }

    res.on('error', handleError)

    return Bacon.combineAsArray(
      Bacon.fromEvent(res, 'data').takeUntil(Bacon.fromEvent(res, 'end'))
    ).map(function (body) {
      return Buffer.concat(body).toString('utf8');
    }).flatMap(Bacon.try(peg.parse));
  }).first().toPromise().then(function (msg) { res.json(msg); }, handleError)

  clientRequest.end()
});

module.exports = {app: app};
