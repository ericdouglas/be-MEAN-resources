var http = require( 'http' );
var Beer = require( './models/beer' );

http.createServer( function( req, res ) {
  res.writeHead( 200, { 'Content-Type' : 'text/html;charset=utf-8' });

  console.log( 'URL: ', req.url );
  var route = req.url;
  var msg = '';

  switch ( route ) {
    case '/beer/create':
      _beer.create( req, res );
      break;

    case '/beer/retrieve':
      _beer.retrieve( req, res );
      break;

    case '/beer/update':
      _beer.update( req, res );
      break;

    case '/beer/delete':
      _beer.delete( req, res );
      break;

    default: res.end( 'ROTA NÃO ENCONTRADA!' );
  }
  
}).listen( 3000 );

console.log( 'Server running at http://localhost:3000/' );