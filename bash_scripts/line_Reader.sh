#!/bin/bash

# Used -p to correctly display the prompt text
read -p "What is the name of the file to read? " file

# Quote "$file" to handle filenames with spaces
if [ -f "$file" ]; then
  # Added -r to read raw characters and input redirection at the end
  while IFS= read -r line
  do
     echo "Reading: '$line'"
  done < "$file" 
else
  echo "File does not exist."
fi
