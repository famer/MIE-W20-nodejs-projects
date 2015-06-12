var http = require("http");

var issueLength = 10;
var numofOrders = 100;
orders = [];
for (var i = 0; i < numofOrders; i++) {
    orders[i] = {title: 'title' + i, id: i};
} 

 
http.createServer(function(req, res) {
  var id;
    if (id = req.url.match("^/orders/([0-9]+)?$")) {
            if (req.method == "GET") {
            
                var i = id[1] ? parseInt(id[1]) : 0;
                var linkHeaders = [];
                if ( i - issueLength >= 0 ) {
                        linkHeaders.push('</orders/'+ (i-issueLength) +'>; rel="previous"; title="previous orders"');
                    }
                if ( i + issueLength < numofOrders ) {

                        linkHeaders.push('</orders/'+ (i+issueLength) +'>; rel="next"; title="next orders"');
                }

                res.writeHead(200, {"Link": linkHeaders.join(", "), 'Content-Type': 'text/plain'});
                res.end(JSON.stringify(orders.slice(i, i+issueLength)));
            
        }
    } else {
        res.writeHead(404);
        res.end();
    }
 
}).listen(process.env.PORT || 8080, function() { // start server (port 8124)
  console.log('server started', process.env.IP, process.env.PORT);
});
