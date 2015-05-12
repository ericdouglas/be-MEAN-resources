var mongoose = require( 'mongoose' );
var Beer = mongoose.model( 'Beer' );
var msg = '';

module.exports = {
  create : function( req, res ) {
    var dados = {
        name        : 'Skol'
      , description : 'Mijo de rato'
      , alcohol     : 4.5
      , price       : 3.0
      , category    : 'pilsen'
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
        upsert : false
      , multi : true
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