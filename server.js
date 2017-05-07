const app = require('./app');
const http = require('http');
const https = require('https');
const os = require('os');

var networkInterfaces = os.networkInterfaces();

Object.keys(networkInterfaces).forEach(function (ifname) {
  networkInterfaces[ifname].forEach(function (iface) {
    if (iface.family !== 'IPv4' || iface.internal !== false) {
      return;
    }

    var server = http.createServer(app);
    var sserver = https.createServer(app);

    server.listen(80, iface.address, function() {
      console.log('Running http on ', server.address());
    });

    sserver.listen(443, iface.address, function() {
      console.log('Running https on ', sserver.address());
    });
  });
});
