const app = require('./app');
const https = require('https');

https.createServer(app).listen(443);

console.log('Running on https://localhost:443');
