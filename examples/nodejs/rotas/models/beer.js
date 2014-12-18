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

module.exports = mongoose.model( 'Beer', BeerSchema );