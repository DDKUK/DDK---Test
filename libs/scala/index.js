module.exports.startHeartbeat = scalaStartHeartbeat;
module.exports.setVar = scalaSetVar;

//HELPERS
function scalaStartHeartbeat( onExit ){
	//start a heartbeat
	setInterval( scalaHeartbeat, 1000 );

	onExit = onExit || function(){ process.exit(); }

	var timeoutQuit = null;
	function resetTimeoutQuit(){
		if( timeoutQuit ){
			clearTimeout( timeoutQuit );
		}
		
		timeoutQuit = setTimeout( onExit, 3000);
	}

	resetTimeoutQuit();

	//listen for heartbeat - quit out if we don't hear anything
	var rl = require("readline").createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

	rl.on('line', function (cmd) {
		resetTimeoutQuit();
	});
}

function scalaHeartbeat(){
	console.log("heartbeat");
}

function scalaSetVar( id, value ){
	console.log(["setVar", id, escape(value)].join(":"));
}