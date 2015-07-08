## NodeJS RESTful service via ExpressJS 


### Design of the RESTful service

```
/country - get list of countries
HTTP method: GET
Status codes: 200 - ok, 400 - bad request

/country/{countrycode}/publishers -- list of publishers of country
HTTP method: GET 
Status codes: 
200 - ok
400 - bad request (wrong data)
404 - not found

/publisher/{publisherId}/authors -- list authors which books publisher has
HTTP method: GET 
Status codes: 
200 - ok
400 - bad request (wrong data)
404 - not found

/publisher/{publisherId}/author/{authorId}/books -- list books of books author has in current publisher
HTTP method: GET 
Status codes: 
200 - ok
400 - bad request (wrong data)
404 - not found

/authors/{authorId} -- get information about author
HTTP method: GET 
Status codes: 
200 - ok
400 - bad request (wrong data)
404 - not found

/books/{bookId} -- get information about book
HTTP method: GET 
Status codes: 
200 - ok
400 - bad request (wrong data)
404 - not found

/books/{bookId} -- get information about book
HTTP method: PUT 
Status codes: 
200 - ok
400 - bad request (wrong data)
404 - not found
```


### Data structure

```

{
  countryName: "Czech Republic",
  publishers: [
    {
      publisherName: "name1",
      authors: [
      	{
      		authorName: "John Smoth",
      		books: [
      			{
      				bookTitle: "how hard is to be man with most popular english name in the world",
      				bookId: "asdf-ds23-sd32-00"
      			},
      			{
      				bookTitle: "I wrote the book what to do next",
      				bookId: "zxcf-ds23-sd32-00"
      			}
      		]
      	}
      ]
    },
    {
      publisherName: "name2",
      authors: [
      	{
      		authorName: "John Smoth",
      		books: [
      			{
      				bookTitle: "how to trick publishers writing same books slightly differenced",
      				bookId: "a34f-ds23-sd32-00"
      			}
      		]
      	},
      	{
      		authorName: "Jin Chan",
      		books: [
      			{
      				bookTitle: "Dao of JS",
      				bookId: "a340-ds23-sd32-00"
      			}
      		]
      	}
      ]
    }

  ]  
}
```
