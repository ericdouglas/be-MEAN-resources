var http = require( 'http' );

http.createServer( function( req, res ) {
  res.writeHead( 200, { 'Content-Type' : 'text/html;charset=utf-8' });

  console.log( 'URL: ', req.url );

}).listen( 3000 );

console.log( 'Server running at http://localhost:3000/' );