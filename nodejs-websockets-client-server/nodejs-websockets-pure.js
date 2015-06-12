var app = require('http').createServer(handler)
  , fs = require('fs')
  , WebSocketServer = require('ws').Server

app.listen(process.env.PORT || 8080, function() {
  console.log('server started', process.env.IP, process.env.PORT);
});

function handler (req, res) {
console.log('d');
    if (req.url.match("^/$")) {
	  fs.readFile(__dirname + '/index.html',
	  function (err, data) {
	    if (err) {
	      res.writeHead(500);
	      return res.end('Error loading index.html');
	    }

	    res.writeHead(200);
	    res.end(data);
	  });
	} else {
console.log(req.headers);
	
	}
}

var wss = new WebSocketServer({port: 5000});
console.log('websocket server created');
wss.on('connection', function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  });
  }, 1000);

  console.log('websocket connection open');

  ws.on('close', function() {
    console.log('websocket connection close');
    clearInterval(id);
  });
});
