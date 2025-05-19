# SIGNSENSE Integration Guide

This document explains how to integrate the SIGNSENSE Python code with the SignEase Next.js application.

## Prerequisites

1. Clone the SIGNSENSE repository:
   \`\`\`
   git clone https://github.com/Keshx-3/SIGNSENSE.git signsense
   \`\`\`

2. Install the required Python dependencies:
   \`\`\`
   cd signsense
   pip install -r requirements.txt
   \`\`\`

## Integration Steps

1. Ensure the SIGNSENSE Python code is accessible from your Next.js application. The recommended approach is to place it in a directory at the root of your project.

2. The Next.js API routes in `app/api/convert-text/route.ts` and `app/api/sign-image/route.ts` are set up to interface with the SIGNSENSE Python code.

3. You may need to adjust the paths in these API routes to match your specific setup.

4. For the sign language images, create a directory structure like:
   \`\`\`
   public/
     signs/
       a.png
       b.png
       hello.png
       ...
   \`\`\`

5. If the SIGNSENSE code doesn't already output images in this format, you may need to modify it or create a script to generate these images.

## Troubleshooting

- If you encounter issues with the Python execution, check the console logs for error messages.
- Ensure that Python is installed and accessible from the command line.
- Verify that all required Python dependencies are installed.
- Check file permissions to ensure the Next.js application can access the SIGNSENSE code and images.
