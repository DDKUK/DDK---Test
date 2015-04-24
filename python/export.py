#!/usr/bin/python
import zipfile, re
from os import listdir
from os.path import isfile, isdir, join

def initRegex( listRegex ):
    for i in range( len( listRegex ) ):
        listRegex[i] = re.compile( listRegex[i] )
    return listRegex

#list of files we're excluding from the export
listExcludeRoot = initRegex(["^\.", ".git", "python", "scala", "repackage-scala.bat"])
listExcludeSub = initRegex(["^\."])

def isFileInList( listOfFiles, file ):
    for i in range( len( listOfFiles ) ):
        #print i, file, listExclude[i].match( file )
        if listOfFiles[i].match( file ):
            return True
    return False

def exportDir( export, pathdir, listExclude = [] ):
    for file in listdir( pathdir ):
        if not isFileInList( listExclude, file ):
            #exclude hidden files and node_modules
            print "adding:", pathdir, file
            if isdir( join( pathdir, file ) ):
                #export the dir
                exportDir( export, join( pathdir, file ), listExcludeSub )
            else:
                #write the file
                export.write( join( pathdir, file ) )
    

with zipfile.ZipFile('./scala/export.zip', 'w', zipfile.ZIP_DEFLATED) as export:
    exportDir( export, './', listExcludeRoot )
