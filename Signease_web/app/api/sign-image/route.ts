import { type NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sign = searchParams.get("sign")

    if (!sign) {
      return NextResponse.json({ error: "Sign parameter is required" }, { status: 400 })
    }

    // Clean the sign parameter to prevent path traversal
    const cleanedSign = sign.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()

    // Path to the sign language images directory
    // Note: You'll need to adjust this path to where you've stored the SIGNSENSE images
    const imagePath = path.join(process.cwd(), "public", "signs", `${cleanedSign}.png`)

    // Check if the image exists
    if (!fs.existsSync(imagePath)) {
      // If the specific sign image doesn't exist, return a placeholder
      return NextResponse.redirect(new URL(`/placeholder.svg?height=150&width=150&text=${cleanedSign}`, request.url))
    }

    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath)

    // Return the image with appropriate content type
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    })
  } catch (error) {
    console.error("Error serving sign image:", error)
    return NextResponse.json({ error: "Failed to process the request" }, { status: 500 })
  }
}
