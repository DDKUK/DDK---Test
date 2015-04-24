module.exports = function( target ){
	var output = {};
	var state = null;
	process.argv.forEach(function (val, index, array) {
		var nextState = null;
		
		if( val.indexOf("--") == 0 ){
			nextState = val.substr(2);
			//there maybe no associated value - just default to true
			output[ nextState ] = true;
		}else{
			if( state ){
				output[ state ] = val;
			}else{
				//output.push( val );
			}
		}
		
		state = nextState;
	});
	
	overwriteTarget( target, output );
	
	return output;
}

function overwriteTarget( target, commands ){
	//overwrite the config variables with those from the command
	for( var id in commands ){
		//ignoring indexed commands line parameters
		if( isNaN( Number( id ) ) ){
			//allow for deep level configuration values
			var ids = id.split(".");
	
			(function nextId(target, ids, val){
				if( !target ){
					console.log("error","Unable to bind command line parameter ", id);
				}else if( ids.length == 0 ){
					console.log("error","Invalid command line parameter ", id);
				}else if( ids.length == 1 ){
					//we need to cast the value
					var id = ids[0];
					var currentValue = target[id];
					switch( typeof target[id] ){
						case "string":
							//this is ok
							break;
						case "number":
							//this is ok
							val = Number( val );
							if( isNaN( val ) ){
								//bad value
								return;
							}
							break;
						case "boolean":
							val = (val === "true" || val === "1" || val === true ) ? true: false;
							break;
					}
				
					target[ids[0]] = val;
				}else{
					target = target[ids[0]] || {};
					ids.shift();
					nextId( target, ids, val )
				}
		
			})(target, ids, commands[id])
		}
	}
	
}