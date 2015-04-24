//import some additional modules if running on the server
var target = null;
if( typeof module != "undefined" && module.exports ){
	//RUNNING IN NODE
	var ko = require("obs");
	target = module.exports;
}else{
	//RUNNING IN BROWSER
	target = window.models = window.models || {};
}

(function( target ){
	
	var UserModel = target.UserModel = function( ){
		var self = this;
		
		self.id = new Date().getTime();
		
		self.name = ko.observable("");
		self.age = ko.observable("");
		
		//add some computed observables for support
		self.isComplete = ko.computed( function(){
			var isInComplete = false;
			
			//helper function
			function isValue( val ){ return !val || val == "" ? false : true; }
			
			//iterate each of our required properties
			_.each( ["name", "age"], function( id ){
				if( !isValue( self[id]() ) ){
					isInComplete = true;
				}
			})
			
			//NOTE: invert the result
			return !isInComplete;
		} );
	}
	
	UserModel.prototype.parseJSON = function( data ){
		var self = this;
		
		//non-observable properties
		_.each(["id"], function( id ){
			self[ id ] = data[id];
		});
		
		//observable properties
		_.each(["name", "age"], function( id ){
			self[ id ]( data[id] );
		});
		
		return self;
	}
	
	UserModel.prototype.toJSON = function( data ){
		var self = this;
		var output = {};
		
		//non-observable properties
		_.each(["id"], function( id ){
			output[ id ] = self[id];
		});
		
		//observable properties
		_.each(["name", "age"], function( id ){
			output[ id ] = self[id]();
		});
		
		return output;
	}
	
	
})( target );
