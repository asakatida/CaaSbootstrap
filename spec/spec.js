const Ajv = require('ajv');
const app = require('../app').app;
const fs = require('fs');
const request = require('supertest')

const ajv = new Ajv();

describe("Meta grammar endpoint", function() {
  it("loads the endpoint", function(done) {
    var server;

    server = app.listen(function() {
      request('http://localhost:' + server.address().port)
        .get('/api/peg/localhost:' + server.address().port + '/resources/peg')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(JSON.parse, done);
    });
  });

  it("is equal to static result", function(done) {
    var server;

    server = app.listen(function() {
      request('http://localhost:' + server.address().port)
        .get('/api/peg/localhost:' + server.address().port + '/resources/peg')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(function (msg) {
          expect(JSON.parse(msg)).toEqual(JSON.parse(fs.readFileSync('static.json')));
          done();
      }, fail);
    });
  });

  it("passes the grammar schema", function(done) {
    var server;

    server = app.listen(function() {
      request('http://localhost:' + server.address().port)
        .get('/api/peg/localhost:' + server.address().port + '/resources/peg')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(function (msg) {
          request('http://localhost:' + server.address().port)
            .get('/api/schema')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(function (schema) {
          expect(
            ajv.validate(JSON.parse(schema), JSON.parse(msg))).toBeTruthy();
          done();
        }, fail);
      }, fail);
    });
  });

  it("passes the PEG grammar schema", function(done) {
    var server;

    server = app.listen(function() {
      request('http://localhost:' + server.address().port)
        .get('/api/peg/localhost:' + server.address().port + '/resources/peg')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(function (msg) {
          request('http://localhost:' + server.address().port)
            .get('/api/peg/schema')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(function (schema) {
          expect(
            ajv.validate(JSON.parse(schema), JSON.parse(msg))).toBeTruthy();
          done();
        }, fail);
      }, fail);
    });
  });
});
