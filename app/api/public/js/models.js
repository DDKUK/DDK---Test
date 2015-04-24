var target = null;

if(typeof module !== "undefined" && module.exports){
	//we are in NODE - module.exports is where Node will look for attributes
	target = module.exports;
	var ko = require("obs");
	ko.observable = ko.prop;
}else{
	//we are in the browser - create a namespace and use it to export our modules
	target = window.models = {};
}

(function( target ){
	
	/*
	USERMODEL:Start
	Defines properties for a User
	*/
	var UserModel = target.UserModel = function( name, role ){
		var self = this;
		
		self.name = ko.observable("");
		self.role = ko.observable("");
		
		self.parseJSON({
			_id : generateRandomId(),
			name : name,
			role : role
		})
	}
	
	UserModel.prototype.parseJSON = function( data ){
		var self = this;
		
		self._id = data._id || "";
		self.name( data.name || "" );
		self.role( data.role || "" );
	}
	
	UserModel.prototype.toJSON = function(){
		var self = this;
		
		return {
			_id : self._id,
			name : self.name(),
			role : self.role()
		}
	}
	
	UserModel.prototype.getDescription = function(){
		var self = this;
		
		return self.name() + " is a kick ass " + self.role();
	}
	/*
	USERMODEL:End
	*/
	
	/*
	SearchResultModel:Start
	*/
	var SearchResultModel = target.SearchResultModel = function( name, location ){
		var self = this;
	
		self.name = ko.observable();
		self.location = ko.observable();
		
		self.parseJSON({
			name : name,
			location : location
		});
	}
	
	SearchResultModel.prototype.parseJSON = function( data ){
		var self = this;
		
		data = data || {};
		//populate the results
		self.name( data.name );
		self.location( data.location );
	}
	
	SearchResultModel.prototype.toJSON = function( ){
		var self = this;
		
		return {
			name : self.name(),
			location : self.location()
		}
	}
	
	/*
	SearchResultModel:End
	*/
	
	function generateRandomId( len ){
		var output = "";
		var chars = "abcdefghijklmnopqrstuvwxyz01234567890";
		len = len || 10;
		
		while( output.length < len ){
			output += chars[ Math.floor( Math.random() * chars.length ) ];
		}
		
		return output;
	}
	
})( target );