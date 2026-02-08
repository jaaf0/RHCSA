#!/bin/bash

if [ $# -eq 0 ]; then
   echo "No argument is provided."
   # Use $0 to automatically print the script's actual name
   echo "Usage: $0 <filename>"
   exit 1
fi

filename="$1"

if [ -f "$filename" ]; then
   # Use < redirection. This forces wc to read from stdin, 
   # ensuring it outputs ONLY the number (e.g., "10") and not the filename.
   line=$(wc -l < "$filename")
   
   # Add $ to access the variable and quotes for safety
   if [ "$line" -eq 0 ]; then 
         echo "The file '$filename' is empty."
         exit 1
   else 
         cp "$filename" "$filename.bak"
         echo "Backup created successfully."
   fi
else
   echo "No file found."
   exit 1
fi
