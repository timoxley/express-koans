## Response Codes ##

Node.JS module used to extend the functionality of http.ServerResponse to include functions to easily end a request by status code.
The module simply adds the following function for all common http status code numbers to the http.ServerResponse prototype.
```
function(message, headers){
  this.writeHead(CODE, headers);
  this.end(message);
}
```

### Install
```
npm install response-codes
```

### Usage
```
var http = require('http');
require('response-codes');

http.createServer( function(req,res){
  switch(req.url){
  case '/':
    res.OK('thanks');
    break;
  case '/private':
    res.UNAUTHORIZED('STAY AWAY!');
    break;
  default:
    res.NOT_FOUND('nothing to see here, move along');
    break;
  }
}).listen(1337);

```

This module also works with web frameworks such as Express.

### Functions

Functions can be accessed by their name `res.OK('message');` as well as their status code `res[200]('message');`

  * `100 - CONTINUE( message, headers )`
  * `101 - SWITCHING_PROTOCOLS( message, headers )`
  * `200 - OK( message, headers )`
  * `201 - CREATED( message, headers )`
  * `202 - ACCEPTED( message, headers )`
  * `203 - NON_AUTHORITATIVE_INFORMATION( message, headers )`
  * `204 - NO_CONTENT( message, headers )`
  * `205 - RESET_CONTENT( message, headers )`
  * `206 - PARTIAL_CONTENT( message, headers )`
  * `300 - MULTITPLE_CHOICES( message, headers )`
  * `301 - MOVED_PERMAMENTLY( message, headers )`
  * `302 - FOUND( message, headers )`
  * `303 - SEE_OTHER( message, headers )`
  * `304 - NOT_MODIFIED( message, headers )`
  * `305 - USE_PROXY( message, headers )`
  * `307 - TEMPORARY_REDIRECT( message, headers )`
  * `400 - BAD_REQUEST( message, headers )`
  * `401 - UNAUTHORIZED( message, headers )`
  * `402 - PAYMENT_REQUIRED( message, headers )`
  * `403 - FORBIDDEN( message, headers )`
  * `404 - NOT_FOUND( message, headers )`
  * `405 - METHOD_NOT_ALLOWED( message, headers )`
  * `406 - NOT_ACCEPTABLE( message, headers )`
  * `407 - PROXY_AUTHENTICATION_REQUIRED( message, headers )`
  * `408 - REQUEST_TIMEOUT( message, headers )`
  * `409 - CONFLICT( message, headers )`
  * `410 - GONE( message, headers )`
  * `411 - LENGTH_REQUIRED( message, headers )`
  * `412 - PRECONDITION_FAILED( message, headers )`
  * `413 - REQUEST_ENTITY_TOO_LARGE( message, headers )`
  * `414 - REQUEST_URI_TOO_LONG( message, headers )`
  * `415 - UNSUPPORTED_MEDIA_TYPE( message, headers )`
  * `416 - REQUESTED_RANGE_NOT_SATISFIABLE( message, headers )`
  * `417 - EXPECTATION_FAILED( message, headers )`
  * `500 - INTERNAL_SERVER_ERROR( message, headers )`
  * `501 - NOT_IMPLEMENTED( message, headers )`
  * `502 - BAD_GATEWAY( message, headers )`
  * `503 - SERVICE_UNAVAILABLE( message, headers )`
  * `504 - GATEWAY_TIMEOUT( message, headers )`
  * `505 - HTTP_VERSION_NOT_SUPPORTED( message, headers )`