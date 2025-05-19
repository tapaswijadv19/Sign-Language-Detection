import subprocess
import numpy as np
import cv2
import os
import PIL
from PIL import Image
import string
import json
import sys
import base64
from io import BytesIO

# Define paths for the sign language data
op_dest = "public/signs/"
alpha_dest = "public/alphabet/"

# Function to check if a word exists in our sign database
def check_sim(word, file_map):
    for item in file_map:
        for mapped_word in file_map[item]:
            if word == mapped_word:
                return 1, item
    return -1, ""

# Function to convert text to sign language frames
def convert_text_to_sign(text):
    # Initialize file map (in a real implementation, this would load from your sign database)
    file_map = {
        "hello.webp": ["hello", "hi"],
        "thank_you.webp": ["thank", "thanks", "thankyou"],
        "please.webp": ["please"],
        "sorry.webp": ["sorry"],
        "yes.webp": ["yes"],
        "no.webp": ["no"],
        "help.webp": ["help"],
        "love.webp": ["love"]
    }
    
    # Process the text
    words = text.lower().split()
    result = []
    
    for word in words:
        flag, sim = check_sim(word, file_map)
        if flag == -1:
            # If word not found in database, spell it out letter by letter
            for letter in word:
                if letter.lower() in string.ascii_lowercase:
                    result.append({
                        "type": "letter",
                        "value": letter.lower(),
                        "path": f"/alphabet/{letter.lower()}_small.gif"
                    })
        else:
            # If word found in database, use the corresponding sign
            result.append({
                "type": "word",
                "value": word,
                "path": f"/signs/{sim}"
            })
    
    return result

# Main function to handle command line arguments
if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_text = sys.argv[1]
        result = convert_text_to_sign(input_text)
        print(json.dumps(result))
    else:
        print(json.dumps({"error": "No text provided"}))
