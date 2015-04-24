var path = require("path");

//load a config file
var config = GLOBAL._config = require("../config")( path.join( __dirname, "../../config.json" ) );
//process the command line arguments
var commands = GLOBAL._commands = require("../commands")( _config );
