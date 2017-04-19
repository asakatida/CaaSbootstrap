const app = require('./app');
const http = require('http');

const PORT = process.env.PORT || 8080;

http.createServer(app).listen(PORT);

console.log('Running on http://localhost:' + PORT);
