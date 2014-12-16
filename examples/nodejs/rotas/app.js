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
  name : {
    type : String,
    default : '',
    required : true
  },
  description : {
    type : String, 
    default : ''
  },
  alcohol : {
    type : Number,
    min : 0
  },
  price : {
    type : Number,
    min : 0
  },
  category : {
    type : String,
    default : ''
  },
  created_at : {
    type : Date,
    default : Date.now
  }
});

var Beer = mongoose.model( 'Beer', BeerSchema );

var dados = {
  name        : 'Skol',
  description : 'Mijo de rato',
  alcohol     : 4.5,
  price       : 3.0,
  category    : 'pilsen'
};

var model = new Beer( dados );

model.save( function( err, data ) {
  if ( err ) {
    console.log( 'Erro: ', err );
  } else {
    console.log( 'Cerveja Inserida: ', data );
  }
});

http.createServer( function( req, res ) {
  res.writeHead( 200, { 'Content-Type' : 'text/html;charset=utf-8' });
  res.write( '<h1>Hello World</h1>' );
  res.end( '<h2>Hoje está um belo dia :p</h2>' );
}).listen( 3000 );

console.log( 'Server running at http://localhost:3000/' );