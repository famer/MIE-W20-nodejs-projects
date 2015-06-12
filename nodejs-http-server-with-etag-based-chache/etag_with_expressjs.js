var net = require('net');
var crypto = require("crypto");
// Customers to delete from
var customers = [
    {
        "id": 1,
        "name": "aaa",
        "orders": []
    },
    {
        "id": 2,
        "name": "bbb",
        "orders": []
    }
];
 
var http = require('http');
var path = require('path');

var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));
//var coutnries = require('./routes/countries.js');
    //publishers = require('./routes/publishers.js');

router.get('/customers', function(req, res) { 
    console.log(req.headers);
    var hash = computeWeakETag(customers);
    if (req.headers.etag == hash) {
        
    }
    
    res.setHeader("Last-Modified", "Sun, 7 Nov 2013, 09:40 CET");
    res.setHeader("ETag", hash);
    res.send(hash);
    //res.redirect("/countries");
});


function computeWeakETag(customers) {
    var content = "";
    for (var i = 0; i < customers.length; i++) {
        content += customers[i].id + customers[i].name;
    }
    return crypto.createHash('md5').update(content).digest("hex");
}

server.listen(process.env.PORT || 8080, function() { // start server (port 8124)
  console.log('server started', process.env.IP, process.env.PORT);
});