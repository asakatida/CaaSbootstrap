'use strict';

const Ajv = require('ajv');
const app = require('../app');
const fs = require('fs');
const path = require('path');
const request = require('supertest');

const ajv = new Ajv();

describe("Meta grammar endpoint", function() {
  var server = app.listen();

  const PORT = server.address().port;

  it("loads the endpoint", function(done) {
    request('http://localhost:' + PORT)
      .get('/api/peg/peg')
      .query({ src: 'http://localhost:' + PORT + '/resources/peg.peg' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(done).catch(function(err) {
        fail(err);
        done();
      });
  });

  it("is equal to static result", function(done) {
    request('http://localhost:' + PORT)
      .get('/api/peg/peg')
      .query({ src: 'http://localhost:' + PORT + '/resources/peg.peg' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(function (res) {
        fs.readFile(path.join(__dirname, 'static.json'), 'utf8', function(err, data) {
          if (err) {
            fail(err);
            done();
            return;
          }
          expect(JSON.parse(data)).toEqual(res.body);
          done();
        })
      }).catch(function(err) {
        fail(err);
        done();
      });
  });

  it("passes the grammar schema", function(done) {
    request('http://localhost:' + PORT)
      .get('/api/peg/peg')
      .query({ src: 'http://localhost:' + PORT + '/resources/peg.peg' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(function (res) {
        request('http://localhost:' + PORT)
          .get('/api/peg/peg/schema/schema.json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(function (schema) {
        var validate = ajv.compile(schema.body)
        var valid = validate(res.body)
        if (!valid) {
          console.log(validate.errors)
        }
        expect(valid).toBeTruthy();
        done();
      }).catch(function(err) {
        fail(err);
        done();
      });
    }).catch(function(err) {
      fail(err);
      done();
    });
  });

  it("passes the PEG grammar schema", function(done) {
    request('http://localhost:' + PORT)
      .get('/api/peg/peg')
      .query({ src: 'http://localhost:' + PORT + '/resources/peg.peg' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(function (res) {
        request('http://localhost:' + PORT)
          .get('/api/peg/peg/schema.json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(function (schema) {
        var validate = ajv.compile(schema.body)
        var valid = validate(res.body)
        if (!valid) {
          console.log(validate.errors)
        }
        expect(valid).toBeTruthy();
        done();
      }).catch(function(err) {
        fail(err);
        done();
      });
    }).catch(function(err) {
      fail(err);
      done();
    });
  });
});
