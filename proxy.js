// var express = require("express");
// var app = express();
// var morgan = require('morgan');

// app.use(morgan('combined'));

// var server = app.listen(3000, function () {
//     var host = server.address().address;
//     var port = server.address().port;
  
//     console.log('Example app listening at http://%s:%s', host, port);
// });
require('reverse-proxy').createServer({
    port: 8000,
    // mapHttpsReg:/s.tbcdn.cn/,
    map: function (config) {
         // proxy from localhost
         if (config.path == '/kissy/k/1.4.0/seed-min.js') {
             config.path = '/t.js';
             config.host = 'localhost';
             console.log('refetch from: ' + config.host + config.path);
         }
         return config;
    }
 });