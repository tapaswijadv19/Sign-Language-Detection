// This file serves as a bridge between the frontend and the SIGNSENSE Python code

// Function to convert text to sign language
export async function convertTextToSign(text: string): Promise<string[]> {
  try {
    const response = await fetch("/api/convert-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw new Error("Failed to convert text")
    }

    const data = await response.json()
    return data.signs
  } catch (error) {
    console.error("Error in convertTextToSign:", error)
    throw error
  }
}

// Function to get the URL for a sign image
export function getSignImageUrl(sign: string): string {
  return `/api/sign-image?sign=${encodeURIComponent(sign)}`
}

// Mock function for development/testing when the backend is not available
export function mockConvertTextToSign(text: string): string[] {
  // Split the text into words and return them as signs
  return text.split(/\s+/).filter((word) => word.length > 0)
}
