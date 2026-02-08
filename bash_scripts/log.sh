#!/bin/bash

read -p "Enter the log file to analyze: " logfile

if [ -f "$logfile" ]; then
  
  echo "--- Analysis Started ---"
  
  # Read the file line by line
  while IFS= read -r line
  do
    # Check if the line contains the text "ERROR"
    if [[ "$line" == *"ERROR"* ]]; then
      echo "ALERT: Found an issue -> $line"
    fi
  done < "$logfile"

  echo "--- Analysis Complete ---"

else
  echo "Error: The file '$logfile' does not exist."
fi
