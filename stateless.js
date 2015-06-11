var net = require('net');
 
var server = net.createServer(process.env.IP, function(c) {
  console.log('socket opened');
  c.setEncoding('utf8');
  c.on('end', function() {
    console.log('connection/socket closed');
  });
    var clients = [];
  c.on('data', function(data) {
    console.log('Data:'+data);
    
    var answer = '';
    var slices = data.split(/\b/);
    switch (slices[0]) {
        case 'open':
            var obj = { opened: 1, orders: [] };
            var clientId = clients.push(obj);
            answer = 'opened clientId: ' + (clientId-1);
            break;
        case 'add':
            var clientId = parseInt(slices[2]);
            
            
            if (typeof clients[clientId] !== "undefined") {
                if ( slices[4] ) {
                    answer = 'added';
                    clients[clientId].orders.push(slices[4]);
                } else {
                    answer = 'nothing to add';
                }
            } else {
                answer = 'you must "open" order first';
            }
            break;
        case 'process':
            var clientId = parseInt(slices[2]);
            if (typeof clients[clientId] !== "undefined" && clients[clientId].orders.length ) {
                answer = 'processed ' + clients[clientId].orders.join(',');
            } else {
                answer = 'you must "open" order and "add" items to the order first';
            }
            break;
        default:
            answer = 'unknown';
    }
    c.write('Answer:'+answer+"\n");     
  });
});
 
server.listen(process.env.PORT || 8080, function() { // start server (port 8124)
  console.log('server started', process.env.IP, process.env.PORT);
});
