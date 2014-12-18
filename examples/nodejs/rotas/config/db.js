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

// If the Node process ends, close the Mongoose connection
process.on( 'SIGINT', function() {
  mongoose.connection.close( function() {
    console.log( 'Mongoose default connection disconnected through app termination');
    process.exit( 0 );
  });
});

require( '../models/index' );