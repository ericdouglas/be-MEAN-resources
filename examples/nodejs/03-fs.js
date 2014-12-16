var http = require( 'http' );
var fs = require( 'fs' );

http.createServer( function( req, res) {
  var index = fs.readFileSync( 'public/index.html' );
  res.writeHead( 200, { 'Content-Type' : 'text/html; charset=utf-8' });
  res.end( index );
}).listen( 3000 );

console.log( 'Server running at http://localhost:3000/' );