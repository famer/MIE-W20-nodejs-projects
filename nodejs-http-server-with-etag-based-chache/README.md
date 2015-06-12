# NodeJS HTTP server with cache based on ETag and cache-related headers

## Task

Design and implement simple service - get list of customers

Example:

```
GET /customers
[
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
]
```

Implement HTTP caching using Last-Modified and ETag. Implement two version of ETag: strong and weak ETag. For weak ETag use only the id and the name from each costumer. Do not forget to show examples of communication including all HTTP Headers.


## Result

Console log with example requests:


GET /customers/

GET /customers/1

possible answers:

200 ok

304 not modified

```
// etag sent back (non if not match were sent in req)
famer@mie-w20:~/790197 $ curl -i https://mie-w20-c9-famer.c9.io/customers/
HTTP/1.1 200 OK
date: Sun, 30 Mar 2014 17:38:32 GMT
last-modified: Sun, 7 Nov 2013, 09:40 CET
etag: "4a647a9c752bbe15b71e529501da0e4c"
content-type: text/plain
vary: Accept-Encoding
keep-alive: timeout=15, max=100
transfer-encoding: chunked
undefined: proxy_subdomain_proxy-old-gce-usw-02-prod_00
X-C9-Server: proxy_subdomain_proxy-old-gce-usw-02-prod_00

[{"id":1,"name":"aaa","orders":[]},{"id":2,"name":"bbb","orders":[]}]

// if not match sent, no new content resent
famer@mie-w20:~/790197 $ curl -i https://mie-w20-c9-famer.c9.io/customers/ --header 'If-None-Match: 4a647a9c752bbe15b71e529501da0e4c'
HTTP/1.1 304 Not Modified
date: Sun, 30 Mar 2014 17:41:19 GMT
keep-alive: timeout=15, max=100
etag: "4a647a9c752bbe15b71e529501da0e4c"
undefined: proxy_subdomain_proxy-old-gce-usw-02-prod_01
X-C9-Server: proxy_subdomain_proxy-old-gce-usw-02-prod_01

// same for strong
famer@mie-w20:~/790197 $ curl -i https://mie-w20-c9-famer.c9.io/customers/1                                                   
HTTP/1.1 200 OK
date: Sun, 30 Mar 2014 17:42:35 GMT
last-modified: Sun, 7 Nov 2013, 09:40 CET
etag: "33b5d56ed4076bde30380fb03162dfe3"
content-type: text/plain
vary: Accept-Encoding
keep-alive: timeout=15, max=100
transfer-encoding: chunked
undefined: proxy_subdomain_proxy-old-gce-usw-02-prod_00
X-C9-Server: proxy_subdomain_proxy-old-gce-usw-02-prod_00

{"id":1,"name":"aaa","orders":[]}

famer@mie-w20:~/790197 $ curl -i https://mie-w20-c9-famer.c9.io/customers/1 --header 'If-None-Match: 33b5d56ed4076bde30380fb03162dfe3'
HTTP/1.1 304 Not Modified
date: Sun, 30 Mar 2014 17:43:33 GMT
keep-alive: timeout=15, max=100
etag: "33b5d56ed4076bde30380fb03162dfe3"
undefined: proxy_subdomain_proxy-old-gce-usw-01-prod_00
X-C9-Server: proxy_subdomain_proxy-old-gce-usw-01-prod_00

```

