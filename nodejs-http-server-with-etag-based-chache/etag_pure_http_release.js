var http = require("http");
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

http.createServer(function(req, res) {
  var id;
    if (req.url.match("^/customers/?$")) {
            if (req.method == "GET") {
            var hash = computeWeakETag(customers);
            console.log(hash, req.headers['if-none-match']);
            if (req.headers['if-none-match'] == hash) {
                res.writeHead(304, {"Last-Modified": "Sun, 7 Nov 2013, 09:40 CET", 'ETag': '"' + hash + '"', 'Content-Type': 'text/plain'});
                res.end();
            } else {
            
                res.writeHead(200, {"Last-Modified": "Sun, 7 Nov 2013, 09:40 CET", 'ETag': '"' + hash + '"', 'Content-Type': 'text/plain'});
                res.end(JSON.stringify(customers));
            }
        }
    } else if ((id = req.url.match("^/customers/([0-9]+)$"))) {
        if (req.method == "GET") {
            var customer = JSON.stringify(customers[id[1]-1]);
            var hash = computeStrongETag(customer);
            console.log(hash, req.headers['if-none-match']);
            if (req.headers['if-none-match'] == hash) {
                res.writeHead(304, {"Last-Modified": "Sun, 7 Nov 2013, 09:40 CET", 'ETag': '"' + hash + '"', 'Content-Type': 'text/plain'});
                res.end();
            } else {
                res.writeHead(200, {"Last-Modified": "Sun, 7 Nov 2013, 09:40 CET", 'ETag': '"' + hash + '"', 'Content-Type': 'text/plain'});
                res.end(customer);
            }
        }
    } else {
        res.writeHead(302, {'Location': '/customers/'});
        res.end();
    }
 
}).listen(process.env.PORT || 8080, function() { // start server (port 8124)
  console.log('server started', process.env.IP, process.env.PORT);
});

function computeStrongETag(content) {
    return crypto.createHash('md5').update(content).digest('hex');
}

function computeWeakETag(customers) {
    var content = "";
    for (var i = 0; i < customers.length; i++) {
        content += customers[i].id + customers[i].name;
    }
    return crypto.createHash('md5').update(content).digest("hex");
}