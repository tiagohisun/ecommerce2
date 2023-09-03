import shutil
import os
import zipfile

def generate_file_tree(start_path):
    file_tree = ''
    for root, dirs, files in os.walk(start_path):
        level = root.replace(start_path, '').count(os.sep)
        indent = ' ' * 4 * (level)
        file_tree += f'{indent}{os.path.basename(root)}/\n'
        sub_indent = ' ' * 4 * (level + 1)
        for f in files:
            file_tree += f'{sub_indent}{f}\n'
    return file_tree

# Paths to the folders you want to copy
src_folders = [
    "C:\\ecommerce2\\pages\\admin",
    "C:\\ecommerce2\\pages\\api", # Included this path
    "C:\\ecommerce2\\server"
]

# Temporary directory to hold the files before zipping
temp_dir = "temp_dir"

# Create the temporary directory
os.makedirs(temp_dir, exist_ok=True)

# Copy the required folders
for src in src_folders:
    dest = os.path.join(temp_dir, os.path.basename(src))
    if os.path.basename(src) == 'server':
        # Exclude 'mongodb' and 'Images' folders when copying 'server'
        shutil.copytree(src, dest, ignore=shutil.ignore_patterns('mongodb', 'Images'))
    else:
        shutil.copytree(src, dest)

# Generate file tree
file_tree = generate_file_tree(temp_dir)
file_tree_path = os.path.join(temp_dir, 'file_tree.txt')
with open(file_tree_path, 'w') as f:
    f.write(file_tree)

# Create a zip file
zip_path = "temp.zip"
with zipfile.ZipFile(zip_path, 'w') as zipf:
    for root, _, files in os.walk(temp_dir):
        for file in files:
            zipf.write(os.path.join(root, file), os.path.relpath(os.path.join(root, file), temp_dir))

# Remove the temporary directory
shutil.rmtree(temp_dir)

# Destination directory (same as the script directory)
dest_dir = os.path.dirname(os.path.abspath(__file__))

# Check if a file with the same name exists
dest_path = os.path.join(dest_dir, 'temp.zip')
counter = 1
while os.path.exists(dest_path):
    os.rename(dest_path, os.path.join(dest_dir, f'old_{counter}.zip'))
    counter += 1

# Move the zip file to the destination directory
shutil.move(zip_path, dest_path)

print("Zipping and moving process completed successfully.")
