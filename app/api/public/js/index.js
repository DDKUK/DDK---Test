function Api(){
	
}

Api.prototype.search = function( term, cb ){
	this.post( "/search", { term:term }, function( err, data ){
		
		if( data && Array.isArray( data ) ){
			//parse through each item
			for( var i = 0; i < data.length; i++ ){
				//convert the data to an instance of SearchResultModel
				var user = new (models.SearchResultModel)();
				user.parseJSON( data[i] );
				//now overwrite the data with the SearchResultModel instance
				data[i] = user;
			}
		}
		
		cb( err, data );
	} );
}

Api.prototype.getUsers = function( cb ){
	this.get( "/users", function( err, data ){
		if( data && Array.isArray( data ) ){
			//parse through each item
			for( var i = 0; i < data.length; i++ ){
				//convert the data to an instance of UserModel
				var user = new (models.UserModel)();
				user.parseJSON( data[i] );
				//now overwrite the data with the UserModel instance
				data[i] = user;
			}
		}
		//now the data has been normalised - return it
		cb( err, data );
	} );
}

Api.prototype.updateUser = function( user, cb ){
	this.post( "/user/" + user._id, user, cb );
}

//OUR CORE METHODS
Api.prototype.get = function( path, cb ){
	//make our request
	this.request( "GET", path, null, cb );
}

Api.prototype.post = function( path, data, cb ){
	//make our request
	this.request( "POST", path, data, cb );
}

Api.prototype.request = function( type, url, data, cb ){
	console.log("request", type, url, data );
	//normalise the path
	url = "/api" + url;
	//load the json
	$.ajax( {
		url : url, 
		type : type, 
		data: JSON.stringify(data),
		contentType: data ? "application/json; charset=utf-8" : undefined,
		dataType: data ? "json" : undefined,
	}).done( function( data, success ){
		//standarise the response
		console.log("result", arguments);
		cb(
			success === "success" ? true : false,
			data
		);
	} );
}