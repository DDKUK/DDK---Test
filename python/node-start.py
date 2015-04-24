#!/usr/bin/python
import subprocess, time, urllib
from os.path import expanduser, join
from scala5 import sharedvars, ScalaPlayer
from scalalib import log_external

dirTargetExport = expanduser( '~/pixelApp/Wayfinder' )
args = []
_vars = None

try:
    _vars = sharedvars()
    dirTargetExport = expanduser( _vars.serverPath )
    args = _vars.serverArgs
except:
    pass

command = ["node",dirTargetExport+"/app"]

for i in xrange( 0, len( args ), 2 ):
    if (i + 1) < len( args ) and args[i + 1] != "":
        command.append( args[i] )
        command.append( args[i+1] )

def setScalaVar( name, value ):
    try:
        setattr( _vars, name, value )
    except:
        pass

def logMessage( type, msg ):
    try:
        #msg = msg.decode('string_escape')
        msg = urllib.unquote(msg)
        log_external(":".join([type,msg]), 1010, "NODE", True)
    except:
        pass
        
def onError():
    log( "error", str( sys.exc_info()[0] ) )

def runNode( ):
    try:
        p = subprocess.Popen( command,
                             stdout=subprocess.PIPE,
                             stdin=subprocess.PIPE,
                             stderr=subprocess.STDOUT)

        for line in iter(p.stdout.readline, ''):

	    ScalaPlayer.Log(line)

            lineArr = line.rstrip().split(":")
            
            p.stdin.write("heartbeat\r\n")

            if len(lineArr) >= 1:
                action = lineArr[0]

                if action == "setVar" and len(lineArr) >= 3:
                    #try to set the variable - but it fails carry on
                    setScalaVar(lineArr[1], urllib.unquote(lineArr[2]))
                elif action == "log" and len(lineArr) >= 3:
                    logMessage( lineArr[1], lineArr[2] )
                    
            ScalaPlayer.Sleep(10)
    except:
        onError()

while True:
    #start the server
    runNode()
    #wait - give the client chance to respond to the disconnection by telling the user something went wrong
    ScalaPlayer.Sleep(5000)
    #reset urlHome - notifies Scala that the application has stopped
    setScalaVar( "urlHome", "" )
    #if we get to here then give it a few seconds before we try again
    ScalaPlayer.Sleep(5000)