#!/bin/bash

# 1. Check if the number of arguments ($#) is equal to 0
if [ $# -eq 0 ]; then
    echo "Usage: $0 <filename>"
    exit 1
fi

file="$1"

# 2. Quote the variable "$file" to handle filenames with spaces safely
if [ -f "$file" ]; then
      # 3. Use the $file variable inside the string
      echo "Processing file: $file..."
else
      echo "Error: File '$file' not found."
      exit 1
fi
