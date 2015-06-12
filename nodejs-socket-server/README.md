## Task

Implement simple Statefull (All interactions within one session) and Stateless (Information about state is part of communication) server in http://nodejs.org using network module.

Your server should be able to communicate using following commmands:
```
open - open order
add - add item
process - process order
Example of communication (order of commands is important):

  -->open (client request)
  <--opened (server response)
  -->add
  <--added
  -->process
  <--processed
  
```

Do not forget show example of telnet communications.

## Result

### Statefull

telnet:
```
Trying 127.6.117.129...
Connected to 127.6.117.129.
Escape character is '^]'.
open
Answer:opened
add
Answer:nothing to add
add blag
Answer:added
add health
Answer:added
process
Answer:processed blag,health
Connection closed by foreign host.
```

### Stateless:

Telnet:

```
Trying 127.6.117.129...
Connected to 127.6.117.129.
Escape character is '^]'.
open
Answer:opened clientId: 0
add 0 blah
Answer:added
add 1 asd
Answer:you must "open" order first
open
Answer:opened clientId: 1
add 1 good
Answer:added
add 0 all
Answer:added
process 0
Answer:processed blah,all
process 1
Answer:processed good
process
Answer:you must "open" order and "add" items to the order first
```

