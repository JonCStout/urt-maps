##
# Get Info from extracted PK3 files
# 
# arena file: get map name (longname) and game modes (type)
# folder: pk3 (file) name
# 
# Usage: getinfo.py 'mydir'
##

import sys
import re
import json
from os import listdir, path


def main():
    folder = sys.argv[1]
    maps = []

    for item in listdir(folder):
        if path.isdir(path.join(folder, item)):
            maps.append(processMap(folder, item))

    print('Got info for {} maps'.format(len(maps)))

    with open("mapinfo.json", "w") as outfile:
        json.dump(maps, outfile, indent=4)
  
    print('Wrote to mapinfo.json')


def processMap(folder, item):
    mapinfo = {'filename': item+'.pk3'}
    mapdir = path.join(folder, item)
    addArenaInfo(mapinfo, mapdir)
    addFilesize(mapinfo, path.join(folder,item+'.zip'))
    return mapinfo


def addFilesize(mapinfo, zipfile):
    # assumes original zip (pk3) is in the same folder
    try:
        size = path.getsize(zipfile)
        mapinfo['fileSize'] = '{:0,.1f} {}'.format( (size/1024/1024), 'mb')
    except:
        print("Unable to find map or get info: ", zipfile)


def addArenaInfo(mapinfo, basedir):
    # check if 'scripts' folder exists
    scriptsdir = path.join(basedir,'scripts')
    if path.isdir(scriptsdir):
        for file in listdir(scriptsdir):
            if file.lower().endswith('.arena'):
                print('Found arena file', file)
                pattern = re.compile(r'([\w]+)\s+"([\w\d\s\-]+)"')
                f = open(path.join(basedir, 'scripts', file),'r')
                v = dict(pattern.findall(f.read()))
                if v.get('longname'):
                    mapinfo['longname'] = v.get('longname').strip()
                if v.get('type'):
                    mapinfo['modes'] = v.get('type')
                f.close()
                    
main()

