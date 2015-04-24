module.exports = function( pathConfig ){
	var config = null;
	
	try{
		config = require( pathConfig );
	}catch(err){
		console.log("error","Unable to load config file '"+pathConfig+"'");
	}
	
	if( config ){
		config.eval = function( val, options ){
			//find all the values {_config.ped.port} and inject the values
			var regExp = /\#\{[\_a-zA-Z\.]+\}/;
			while( regExp.test(val) ){
				var match = regExp.exec( val );
				//we take the match and substitute it
				var term = match[0];
				term = term.substr(2,term.length-3);
		
				var replace = "";
				try{
					replace = eval(term)
				}catch(err){
			
				}
				//take this term and try to set generate a value for it
				val = val.split( match[0] ).join( replace );
			}
			return val;
		}
	}else{
		console.log("error","Unable to configure config-eval");
	}
	
	return config;
}

