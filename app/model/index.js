var express = require("express"),
	fs = require("fs"),
	path = require("path");

var app = module.exports = express();

var pathModels = path.join( __dirname, "../../models" );

app.get("/js/:modelName", function( req, res, next ){
	var modelName = path.basename( req.params.modelName, ".js" );
	var pathModel = path.join( pathModels, modelName, "index.js" );
	fs.exists( pathModel, function( exists ){
		if( !exists ){
			next();
		}else{
			res.sendFile( pathModel );
		}
	} );
});