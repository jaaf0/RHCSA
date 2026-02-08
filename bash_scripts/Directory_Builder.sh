#! /bin/bash

read -p "Enter a directory name: " dir_name

if [ -d "$dir_name" ]; then
    echo "Directory '$dir_name' already exists."
else
    # This is the missing step
    mkdir "$dir_name"
    echo "Directory '$dir_name' created."
fi
