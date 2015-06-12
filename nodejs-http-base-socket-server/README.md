## NodeJS HTTP-base server

## Task

Design and implement simple service - remove customer from your database.

DELETE /customer/{id}
Assume that this operation requires confirmation by human. It should not be implemented as synchronous operation. Design and implement this operation in an asynchronous manner. You can simulate the confirmation as delay 10s or implement another service to confirm deletion.

## Result

Telnet output:

```
Trying 127.2.213.129...
Connected to 127.2.213.129.
Escape character is '^]'.
test
Answer:other operation
DELETE /customers/3
async oper
Answer:other operation
deleted 3
```

Server console output:

```
server started 127.2.213.129 8080
socket opened
Data:test
other operation
Data:DELETE /customers/3
del 3
Data:async oper
other operation
[ 'first', 'second', 'third' ]
[ 'first', 'second' ]
```

