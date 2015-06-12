var http = require("http");
 
var app = http.createServer(function(req, res) {
console.log(req.url);
    if (req.url.match("^/$")) {
            if (req.method == "GET") {
		var html = "<script src='/socket.io/socket.io.js'></script> <script> var socket = io.connect('http://localhost'); socket.on('news', function (data) { document.write(data.content); console.log(data); }); </script>";

                res.writeHead(200);
                res.end(html);
            
        }
    } else {
        res.writeHead(404);
        res.end();
    }
 
}).listen(process.env.PORT || 8080, function() {
  console.log('server started', process.env.IP, process.env.PORT);
});
var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {
  setInterval(function() {socket.emit('news', { content: 'world<br />' })}, 1000);
});
