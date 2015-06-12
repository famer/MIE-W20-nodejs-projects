var net = require('net');
// Customers to delete from
var customers = ["first", "second", "third"];
 
var server = net.createServer(function(c) {
  console.log('socket opened');
  c.setEncoding('utf8');
  c.on('end', function() {
    console.log('connection/socket closed');
  });
 
 
 
  c.on('data', function(data) {
    console.log('Data:'+data);
 
    var answer = '';
    var slices = data.split(/\b/);
    switch (slices[0]) {
        case 'DELETE':
            console.log('del ' + slices[4]);
            // Async call with callback
            delCustomer(function() {
                console.log(customers);
                customers.splice(slices[4]-1, 1);
                console.log(customers);
                c.write('deleted ' + slices[4] + '\n')
            });
            break;
        default:
            console.log('other operation');
            answer = 'other operation'
    }
    if (answer) {
        c.write('Answer:'+answer + '\n');
    }
  });
});
 
function delCustomer(f) {
    // Delay 10 seconds
    setTimeout(f,10000);
}
 
server.listen(process.env.PORT || 8080, function() { // start server (port 8124)
  console.log('server started', process.env.IP, process.env.PORT);
});
