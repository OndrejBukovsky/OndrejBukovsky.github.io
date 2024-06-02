import os, shutil

"""
This script copies only wiki-related files to a defined destination folder.
"""

# User adaptation
ROOT_DIR = "D:/MySharedData/"
FOLDERS = ["Wiki" ]
DEST_ROOT_DIR = 'S:/Share/ondra/Temp/WikiCopy'
# User adaptation end

__VERSION__ = "V0.6"

def copy_file(source_path, destination_path):
    destination_folder = os.path.dirname(destination_path)
    os.makedirs(destination_folder, exist_ok=True)
    shutil.copy2(source_path, destination_path)

def scan_folder(directory_path):
    file_list = []
    for root, dirs, files in os.walk(directory_path):
        if '.resources' in files:
            resource_file_path = os.path.join(root, '.resources')
            file_list.append(resource_file_path)
            with open(resource_file_path, 'r') as resource_file:
                for line in resource_file:
                    file_list.append(os.path.join(root, line.strip()))

        for file in files:
            if file.endswith('.html'):
                html_file_path = os.path.join(root, file)
                with open(html_file_path, 'r') as html_file:
                    try:
                        first_line = html_file.readline().strip()
                        if "<!-- WikiArticle -->" in first_line:
                            file_list.append(html_file_path)
                    except:
                        pass
    return file_list

if __name__ == "__main__":
    for folder in FOLDERS:
        folder_path = os.path.join(ROOT_DIR, folder)
        dest_folder_path = os.path.join(DEST_ROOT_DIR, folder)
        file_list = scan_folder(folder_path)

        for item in file_list:
            dest = os.path.join(dest_folder_path, os.path.relpath(item, folder_path))
            try:
                copy_file(item, dest)
                print("Copied file: " + item)
            except Exception as e:
                print("Error copying file: ({}) {}".format(item, str(e)))