// centraliza a importação dos models
var MODELS_FOLDER = './models';

require( 'fs' )
  .readdirSync( MODELS_FOLDER )
  .forEach( function( file ) {
    // Remove index from models
    if ( file !== 'index.js' ) {
      require( './' + file );
      console.log( 'Add model: ', file );
    }
  });