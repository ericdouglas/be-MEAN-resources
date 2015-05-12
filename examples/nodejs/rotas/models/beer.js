var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var BeerSchema = new Schema({
    name        : { type : String, default : '', required : true }
  , description : { type : String, default : '' }
  , alcohol     : { type : Number, min : 0 }
  , price       : { type : Number, min : 0 }
  , category    : { type : String, default : '' }
  , created_at  : { type : Date,   default : Date.now }
});

module.exports = mongoose.model( 'Beer', BeerSchema );