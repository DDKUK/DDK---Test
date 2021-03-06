var express = require("express"),
	stylus = require("stylus"),
	path = require("path");

var app = module.exports = express();

app.set("views", path.join( __dirname,"views" ) );

app.get("/", function( req, res, next ){
	res.render("index");
});

//enable dynamic css generation
var pathCSS = path.join( __dirname, "public", "css" )
app.use( "/css", stylus.middleware({
	src: pathCSS,
	dest: pathCSS,
	debug: true,
	force: true
}));

app.use( express.static( path.join( __dirname, "public" ) ) );