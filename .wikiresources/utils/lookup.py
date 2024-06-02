import os
import json

"""

This script goes through the given folders (variable FOLDERS, see below)
and creates a JSON file for the Wiki application. The file contains all
available articles from the FOLDERS.

"""

# User adaptation 
ROOT_DIR = "D:/MySharedData/"
FOLDERS = ["D:/MySharedData/Wiki"]#, "D:/MySharedData/Library", "D:/MySharedData/Projects" ]
ONLY_PUBLIC = True
# User adaptation end

__VERSION__ = "V0.8"
TARGET_PATH = ROOT_DIR + "../pages.json"
ARTICLE_HEADER = "<!-- WikiArticle -->"
ARTICLE_PRIVATE_FLAG = "<!-- Private -->"
ARTICLE_PUBLIC_FLAG = "<!-- Public -->"

def _moveItemToBeginning(lst, item_name):
    for item in lst:
        if item["Name"] == item_name:
            lst.remove(item)
            lst.insert(0, item)
            return

def _getFlagContent(flag):
    return flag.replace("<!--","").replace("-->","").strip()

def checkFile(filePath):
    """
    returns a name of an article, if it is an article file!
    """

    name = ""
    accessFlag = "Private"
    version = ""
    try:
        file = open(filePath, 'r')
        line = file.readline()
        
        # the first line should be ARTICLE_HEADER
        if(ARTICLE_HEADER == line.strip()):
            for i in range(2):
                line = file.readline()
                # Public/Private flag
                if(i == 0):
                    accessFlag = _getFlagContent(line)
                    
                # Name
                elif(i == 1):
                    name = _getFlagContent(line)
                    if(name == ""):
                        name = "Unknown"
                    
                # Version
                elif(i == 2):
                    version = _getFlagContent(line)

                    

    except Exception as e: 
        print("{}: {}".format(filePath, e))


    return name if((ONLY_PUBLIC == True and accessFlag == "Public") or (ONLY_PUBLIC == False)) else ""
    
def checkFolder(folderPath, parent):

    childFiles = []
    childFolders = []
    onlyOneFile = 0

    for entry in os.scandir(folderPath):
        if entry.is_dir():
            subdir = checkFolder(entry.path, childFiles)

            if subdir != None:
                childFolders.append(subdir)
                onlyOneFile = 2

        elif entry.is_file():
            if entry.name.endswith(".html"):
                articleName = checkFile(entry.path)

                if (articleName != ""):
                    relPath = os.path.relpath(entry.path, ROOT_DIR).replace("\\","/")
                    childFiles.append({"Name": articleName,"Path": relPath})
                    onlyOneFile += 1 

    children = []
    childFilesList = sorted(childFiles, key=lambda x: x["Name"], reverse=False)
    _moveItemToBeginning(childFilesList, "Overview")
    children.extend(childFilesList)
    children.extend(sorted(childFolders, key=lambda x: x["Name"], reverse=False))

    if len(children) != 0:
        if(onlyOneFile == 1):
            parent.append(children[0])
            return None
        else:
            parent_directory, directory_name = os.path.split(folderPath)
            jsonDir = {}
            jsonDir["Name"] = directory_name
            jsonDir["Children"] = children
            return jsonDir
    else:
        return None


def main():
    finalJSON = {}
    finalJSON["Name"] = "__root__"
    finalJSON["Children"] = []

    folders = FOLDERS
    folders.sort()

    for folder in folders:
        rv = checkFolder(folder, finalJSON["Children"])

        if rv != None:
            finalJSON["Children"].append(rv)

    f = open(TARGET_PATH, "w")
    f.write(json.dumps(finalJSON))
    f.close()

if __name__ == "__main__":
    main()
    print("\n Done!")
