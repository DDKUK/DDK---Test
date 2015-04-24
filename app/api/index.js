var express = require("express"),
	bodyParser = require("body-parser"),
	path = require("path"),
	_ = require("underscore"),
	models = require("./public/js/models");

var app = module.exports = express();
//add middleware to parse our json for us
app.use( bodyParser.json({strict:true}) );

//create our Database
var users = [
	new (models.UserModel)("Jimi","Developer"),
	new (models.UserModel)("Gavin","Developer"),
	new (models.UserModel)("Darren","Designer"),
	new (models.UserModel)("Matt","Designer")
];

var searchResults = [];
_.each("a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(","), function( char ){
	searchResults.push( new (models.SearchResultModel)("Store "+char,"Location "+char) );
})

//expose our end points
app.get("/users", function( req, res, next ){
	res.send( users );
});

app.post("/user/:userId", function( req, res, next ){
	//get the userId from the path
	var _id = req.params.userId;
	
	//get the user with this ID and then update it
	users.forEach( function( user ){
		if( user._id == _id ){
			user.parseJSON( req.body );
		}
	} );
	
	//done - send generic response
	res.send({
		status: "ok"
	});
});

app.post("/search", function( req, res, next ){
	var output = [];
	
	_.each( searchResults, function( searchResult ){
		if( Math.random() > 0.5 ){
			output.push( searchResult );
		}
	} );
	
	res.send( output );
});

//expose public directory
app.use( express.static( path.join( __dirname, "public" ) ) );
