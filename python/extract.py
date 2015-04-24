#!/usr/bin/python
import zipfile, re, shutil, subprocess
from os import listdir, remove, makedirs
from os.path import isfile, isdir, join, expanduser, exists, getmtime

dirTargetExport = expanduser( '~/pixelApp/screwfix' )
pathApp = expanduser( './export.zip' )

try:
    from scala5 import sharedvars
    _vars = sharedvars()
    dirTargetExport = expanduser( _vars.serverPath )
    pathApp = _vars.appZipPath
except:
    pass

def compareDates( srcA, srcB ):

    try:
        mtimeA = getmtime(srcA)
        mtimeB = getmtime(srcB)

        if mtimeA > mtimeB:
            return 1
        elif mtimeB > mtimeA:
            return -1
        else:
            return 0
    except:
        pass

    return 0;

def initRegex( listRegex ):
    for i in range( len( listRegex ) ):
        listRegex[i] = re.compile( listRegex[i] )
    return listRegex

#generic function to check the file against the list of regex provided
def isFileInList( listOfFiles, file ):
    for i in range( len( listOfFiles ) ):
        #print i, file, listExclude[i].match( file )
        if listOfFiles[i].match( file ):
            return True
    return False

if True or exists( dirTargetExport ) == False or compareDates( pathApp, dirTargetExport ) > 0 :
    #list of files we're excluding from the export
    listKeep = initRegex([]) #"node_modules"])

    #create the target directory if required
    if not exists( dirTargetExport ):
        makedirs( dirTargetExport )

    #clean up the dirTargetExport - delete unwanted files
    for file in listdir( dirTargetExport ):
        if not isFileInList( listKeep, file ):
            pathFile = join( dirTargetExport, file )
            try:
                if isdir( pathFile ):
                    shutil.rmtree( pathFile )
                else:
                    remove( pathFile )
            except:
                pass

    #extract to the dirTargetExport - it won't overwrite the files we decided keep
    with zipfile.ZipFile( pathApp, 'r') as extract:
        extract.extractall( dirTargetExport )
        
#install the dependencies
#subprocess.call(["npm","install","-d"],shell=True,cwd=dirTargetExport)
