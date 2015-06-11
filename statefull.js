var net = require('net');
 
var server = net.createServer(process.env.IP, function(c) {
  console.log('socket opened');
  c.setEncoding('utf8');
  c.on('end', function() {
    console.log('connection/socket closed');
  });
  
    var orders = [];
    var opened = 0;
  c.on('data', function(data) {
    console.log('Data:'+data);
    
    var answer = '';
    var slices = data.split(/\b/);
    switch (slices[0]) {
        case 'open':
            if (!opened) {
                answer = 'opened';
                opened = 1;
            } else {
                answer = 'opened already';
            }
            break;
        case 'add':
            if (opened) {
                if ( slices[2] ) {
                    answer = 'added';
                    orders.push(slices[2]);
                } else {
                    answer = 'nothing to add';
                }
            } else {
                answer = 'you must "open" order first';
            }
            break;
        case 'process':
            if (opened && orders.length ) {
                answer = 'processed ' + orders.join(',');
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
