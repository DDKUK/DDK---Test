//load our node_modules
var express = require("express"),
	path = require("path"),
	fs = require("fs"),
	stylus = require("stylus"),
	scala = require("./libs/scala");

//load a config file
var config = GLOBAL._config = require("./libs/config")( path.join( __dirname, "/config.json" ) );
//process the command line arguments
var commands = GLOBAL._commands = require("./libs/commands")( _config );
	
//create our app instance
var app = module.exports = express();

//configure our jade
var dirViews = path.join( __dirname, "views" );
app.set("view engine", "jade");
app.set("views", dirViews );

//create a route to respond to requests
app.get("/", function( req, res, next ){
	res.redirect("/home");
} );

//bind our modules
app.use( "/home", require("./app/home") );
app.use( "/api", require("./app/api") );

//enable dynamic css generation
var pathCSS = path.join( __dirname, "public", "css" )
app.use( "/css", stylus.middleware({
	src: pathCSS,
	dest: pathCSS,
	debug: true,
	force: true
}));

//expose out public directory
var dirPublic = path.join( __dirname, "public" );
app.use( express.static( dirPublic ) );

//our 404
app.use( function( req, res, next ){
	res.status( 404 );
	res.render("404");
} );

//listen on a port
console.log("listening on port:", _config.port);
app.listen( _config.port );

//bind scala
if( !_config.ignoreScala ){
	//tell scala where to load the application from
	var urlHome = "http://localhost:"+_config.port;
	scala.setVar("urlHome", urlHome );
	//set our heartbeat going
	scala.startHeartbeat();
}