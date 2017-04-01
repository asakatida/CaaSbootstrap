'use strict';

const app = require('./app').app;
const http = require('http');
const winston = require('winston')

const PORT = process.env.PORT || 8080;

http.createServer(app).listen(PORT);

winston.info('Running on http://localhost:' + PORT);
