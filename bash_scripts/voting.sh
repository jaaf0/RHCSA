#! /bin/bash

# 1. Ask for Age
read -p "What is your age? " age

# 2. Ask for Citizenship
read -p "Are you a citizen of this country? (yes/no) " citizen

# 3. Check both conditions
# We convert the input to lowercase to handle "YES", "Yes", or "yes"
if [ "$age" -ge 18 ] && [[ "${citizen,,}" == "yes" ]]; then
  echo "Success: You are eligible to vote!"
elif [ "$age" -ge 18 ] && [[ "${citizen,,}" != "yes" ]]; then
  echo "You are old enough, but you must be a citizen to vote."
else
  echo "You are too young to vote."
fi
