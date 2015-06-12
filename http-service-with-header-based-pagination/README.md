# NodeJS HTTP service with Link header-based pagination


## Task

Design and implement simple service - list of orders.

GET /orders
Assume that this request (at /orders URI) returns large number of orders. It is not appropriate to return the whole list at once. Design and implement this operation with pagination using the Link HTTP header.

Use http://nodejs.org and http module.

## Result

When client request server for orders list it gets orders list with link headers in response.
they could look like this:

<code>
Link: </orders/10>; rel="previous"; title="previous orders", </orders/20>; rel="next"; title="next orders"
</code>

Client should know how to handle it. In this case link with rel "previous" or "next" reference to previous or next set of orders respectively.

Telnet log:

<code>

GET /orders/40

HTTP/1.1 200 OK
Link: </orders/30>; rel="previous"; title="previous orders", </orders/50>; rel="next"; title="next orders"
Content-Type: text/plain
Date: Sat, 26 Apr 2014 22:14:13 GMT
Connection: close

[{"title":"title40","id":40},{"title":"title41","id":41},{"title":"title42","id":42},{"title":"title43","id":43},{"title":"title44","id":44},{"title":"title45","id":45},{"title":"title46","id":46},{"title":"title47","id":47},{"title":"title48","id":48},{"title":"title49","id":49}]

GET /orders/

HTTP/1.1 200 OK
Link: </orders/10>; rel="next"; title="next orders"
Content-Type: text/plain
Date: Sat, 26 Apr 2014 22:10:57 GMT
Connection: close

[{"title":"title0","id":0},{"title":"title1","id":1},{"title":"title2","id":2},{"title":"title3","id":3},{"title":"title4","id":4},{"title":"title5","id":5},{"title":"title6","id":6},{"title":"title7","id":7},{"title":"title8","id":8},{"title":"title9","id":9}]

GET /orders/90

HTTP/1.1 200 OK
Link: </orders/80>; rel="previous"; title="previous orders"
Content-Type: text/plain
Date: Sat, 26 Apr 2014 22:12:53 GMT
Connection: close

[{"title":"title90","id":90},{"title":"title91","id":91},{"title":"title92","id":92},{"title":"title93","id":93},{"title":"title94","id":94},{"title":"title95","id":95},{"title":"title96","id":96},{"title":"title97","id":97},{"title":"title98","id":98},{"title":"title99","id":99}]

</code>

