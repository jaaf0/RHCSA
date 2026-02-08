#!/bin/bash

dir_path=$1
max_size=$2

# Check if we have less than 2 arguments (-lt 2)
if [ $# -lt 2 ]; then
    echo "Error: Missing arguments."
    echo "Usage: $0 <dir_path> <max_size>"
    exit 1
fi

if [ -d "$dir_path" ]; then
    # 1. Run du
    # 2. Pipe (|) output to cut
    # 3. -f1 selects the first "field" (the number)
    current_size=$(du -ms "$dir_path" | cut -f1)

    if [ "$current_size" -gt "$max_size" ]; then
        echo "WARNING: Directory is ${current_size}MB, which is over the limit of ${max_size}MB!"
    else
        echo "Good: Directory is ${current_size}MB."
    fi
else
    echo "Error: Directory '$dir_path' not found."
    exit 1
fi
