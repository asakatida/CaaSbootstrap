const app = require('./app');
const http = require('http');
const https = require('https');

http.createServer(app).listen(80);

console.log('Running on http://localhost:80');

https.createServer(app).listen(443);

console.log('Running on https://localhost:443');
