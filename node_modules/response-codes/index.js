var status = require('http-status');
var http = require('http');

for( var i in status ){
    var num = parseInt(i);
    if( num >= 100 ){
        func = "(function(msg, headers){ this.writeHead(" + num + ", headers); this.end(msg);} );";
        http.ServerResponse.prototype[i] = eval(func);
    }else{
        http.ServerResponse.prototype[i] = http.ServerResponse.prototype[ status[i] ];
    }
}


module.exports = http.ServerResponse;