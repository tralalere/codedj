const util = require( "util" );

function ApiException(args){
  
    args = args || {};
    this.status = args.status || 500;
    this.error  = args.error  || "Unkown error"
} 

util.inherits( ApiException, Error );

module.exports = ApiException;
