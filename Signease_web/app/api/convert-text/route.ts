import { type NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import path from "path"

const execPromise = promisify(exec)

// This function will convert text to sign language using the Python script
export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Invalid input. Text is required." }, { status: 400 })
    }

    // Clean the input text to prevent command injection
    const cleanedText = text.replace(/[^a-zA-Z0-9 ]/g, "")

    // Path to the Python script
    const scriptPath = path.join(process.cwd(), "scripts", "text_to_sign.py")

    // Execute the Python script with the text input
    const { stdout, stderr } = await execPromise(`python ${scriptPath} "${cleanedText}"`)

    if (stderr) {
      console.error("Error from Python script:", stderr)
      return NextResponse.json({ error: "Failed to convert text to sign language" }, { status: 500 })
    }

    // Parse the output from the Python script
    const signs = JSON.parse(stdout.trim())

    return NextResponse.json({ signs })
  } catch (error) {
    console.error("Error converting text to sign language:", error)
    return NextResponse.json(
      {
        error: "Failed to process the request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
