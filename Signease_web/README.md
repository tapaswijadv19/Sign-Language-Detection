# SignEase - Sign Language Recognition and Translation

SignEase is a web application that bridges communication gaps through sign language recognition and translation technology.

## Features

- **Text to Sign Language**: Convert text into sign language gestures
- **Sign Language Recognition**: Real-time sign language detection using your camera
- **Sign Language Dictionary**: Learn common sign language gestures and their meanings
- **Image Upload**: Upload and analyze sign language gestures from images

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm
- Python 3.7+ with pip

### Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/sign-ease.git
   cd sign-ease
   \`\`\`

2. Install JavaScript dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Install Python dependencies:
   \`\`\`
   pip install numpy opencv-python pillow
   \`\`\`

4. Create necessary directories:
   \`\`\`
   mkdir -p public/signs public/alphabet scripts
   \`\`\`

5. Copy the sign language GIFs to the appropriate directories:
   - Copy alphabet GIFs to `public/alphabet/`
   - Copy word sign GIFs to `public/signs/`

6. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Integration with SIGNSENSE

This application integrates with the SIGNSENSE Python code for text-to-sign language conversion. The integration is handled through the API route at `app/api/convert-text/route.ts`, which calls the Python script at `scripts/text_to_sign.py`.

### Setting up SIGNSENSE

1. Clone the SIGNSENSE repository:
   \`\`\`
   git clone https://github.com/Keshx-3/SIGNSENSE.git signsense-repo
   \`\`\`

2. Copy the necessary files from the SIGNSENSE repository to your project:
   \`\`\`
   cp -r signsense-repo/filtered_data/* public/signs/
   cp -r signsense-repo/alphabet/* public/alphabet/
   \`\`\`

## Project Structure

- `app/page.tsx`: Main application component
- `app/api/convert-text/route.ts`: API route for text-to-sign conversion
- `scripts/text_to_sign.py`: Python script for text-to-sign conversion
- `components/sign-player.tsx`: Component for displaying sign language animations
- `public/signs/`: Directory containing sign language GIFs for words
- `public/alphabet/`: Directory containing sign language GIFs for letters

## License

This project is licensed under the MIT License - see the LICENSE file for details.
