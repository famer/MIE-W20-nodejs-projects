//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
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

//router.use(express.static(path.resolve(__dirname, 'client')));
var coutnries = require('./routes/countries.js');
    //publishers = require('./routes/publishers.js');

router.get('/', function(req, res) { 
    //res.redirect("/countries");
    });
    
router.get('/countries', coutnries.list);
router.get('/countries/:code/publishers', coutnries.publishers);


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
