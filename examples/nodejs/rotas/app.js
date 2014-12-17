var http = require( 'http' );
var mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost/be-mean-book' );

var db = mongoose.connection;

db.on( 'error', function( err ) {
  console.log( 'Erro de Conexão', err );
});

db.on( 'open', function() {
  console.log( 'Conexão Aberta' );
});

db.on( 'connected', function( err ) {
  console.log( 'Conectado' );
});

db.on( 'disconnected', function( err ) {
  console.log( 'Desconectado' );
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name : { type : String, default : '', required : true },
  description : { type : String, default : '' },
  alcohol : { type : Number, min : 0 },
  price : { type : Number, min : 0 },
  category : { type : String, default : '' },
  created_at : { type : Date, default : Date.now }
});

var Beer = mongoose.model( 'Beer', BeerSchema );
var _beer = {
  create : function( req, res ) {
    var dados = {
      name        : 'Skol',
      description : 'Mijo de rato',
      alcohol     : 4.5,
      price       : 3.0,
      category    : 'pilsen'
    }

    var model = new Beer( dados );

    model.save( function( err, data ) {
      if ( err ) {
        console.log( 'Erro: ', err );
        msg = 'Erro: ' + err;
      } else {
        console.log( 'Cerveja Inserida: ', data );
        msg = 'Cerveja Inserida: ' + JSON.stringify( data );
      }
      res.end( msg );
    });
  },
  retrieve : function( req, res ) {
    var query = {};
    Beer.find( query, function( err, data ) {
      if ( err ) {
        console.log( 'Erro: ', err );
        msg = 'Erro: ' + err;
      } else {
        console.log( 'Listagem: ', data );
        msg = 'Cervejas Listadas: ' + JSON.stringify( data );
      }
      res.end( msg );
    });
  },
  update : function( req, res ) {
    var query = { name : /skol/i };
    var mod = {
      alcohol : 666
    };
    var optional = {
      upsert : false,
      multi : true
    };

    Beer.update( query, mod, optional, function( err, data ) {
      if ( err ) {
        console.log( 'Erro: ', err );
        msg = 'Erro: ' + err;
      } else {
        console.log( 'Cervejas atualizadas com sucesso: ', data );
        msg = 'Cervejas alteradas: ' + data;
      }
      res.end( msg );
    });
  },
  delete : function( req, res ) {
    var query = { name : /skol/i };

    // É multi: true CUIDADO!
    Beer.remove( query, function( err, data ) {
      if ( err ) {
        console.log( err );
        msg = 'Erro: ' + err;
      } else {
        console.log( 'Cerveja deletada com sucesso. Quantidade: ', data );
        msg = 'Cervejas deletadas: ' + data;
      }
      res.end( msg );
    });
  }
}

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