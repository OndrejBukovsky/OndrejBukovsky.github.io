import os
import json

""""

This script goes through the given folders (variable FOLDERS, see below)
and creates a JSON file for the Wiki application. The file contains all
available articles from the FOLDERS.

"""

# User adaptation 
ROOT_DIR = "D:/"
FOLDERS = ["D:/Wiki", "D:/Personal", "D:/Projects" ]
# User adaptation end

TARGET_PATH = ROOT_DIR + "pages.json"
ARTICLE_HEADER = "<!-- WikiArticle -->"

def checkFile(filePath):
    """
    returns a name of an article, if it is an article file!
    """

    name = ""
    try:
        file = open(filePath, 'r')
        line = file.readline()
        
        # the first line should be ARTICLE_HEADER
        if(ARTICLE_HEADER == line.strip()):
            line = file.readline()
            name = line.replace("<!--","").replace("-->","").strip()

            if(name == ""):
                name = "Unknown"

    except Exception as e: 
        print("{}: {}".format(filePath, e))

    return name
    
def checkFolder(folderPath):

    children = []
    onlyOneFile = 0

    for entry in os.scandir(folderPath):
        if entry.is_dir():
            subdir = checkFolder(entry.path)

            if subdir != None:
                children.append(subdir)
                onlyOneFile = 2

        elif entry.is_file():
            if entry.name.endswith(".html"):
                articleName = checkFile(entry.path)

                if (articleName != ""):
                    relPath = os.path.relpath(entry.path, ROOT_DIR).replace("\\","/")
                    children.append({"Name": articleName,"Path": relPath})
                    onlyOneFile += 1 

    if len(children) != 0:
        if(onlyOneFile == 1):
            return children[0]
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
        rv = checkFolder(folder)

        if rv != None:
            finalJSON["Children"].append(rv)

    f = open(TARGET_PATH, "w")
    f.write(json.dumps(finalJSON))
    f.close()

if __name__ == "__main__":
    main()
