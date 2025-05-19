"use client"

import { useState, useEffect } from "react"

interface SignPlayerProps {
  signs: Array<{
    type: string
    value: string
    path: string
  }>
  autoPlay?: boolean
  onComplete?: () => void
}

export function SignPlayer({ signs, autoPlay = true, onComplete }: SignPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (isPlaying && signs.length > 0) {
      timer = setTimeout(() => {
        if (currentIndex < signs.length - 1) {
          setCurrentIndex((prev) => prev + 1)
        } else {
          setIsPlaying(false)
          if (onComplete) onComplete()
        }
      }, 2000) // Show each sign for 2 seconds
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isPlaying, currentIndex, signs, onComplete])

  const restart = () => {
    setCurrentIndex(0)
    setIsPlaying(true)
  }

  if (!signs || signs.length === 0) {
    return <div className="text-center py-8">No signs to display</div>
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w-md">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center">
          {/* Display current sign */}
          {currentIndex < signs.length && (
            <>
              <div className="mb-4">
                {signs[currentIndex].type === "letter" ? (
                  <img
                    src={`/alphabet/${signs[currentIndex].value}_small.gif`}
                    alt={`Sign for ${signs[currentIndex].value}`}
                    className="w-64 h-64 object-contain"
                  />
                ) : (
                  <img
                    src={signs[currentIndex].path || "/placeholder.svg"}
                    alt={`Sign for ${signs[currentIndex].value}`}
                    className="w-64 h-64 object-contain"
                  />
                )}
              </div>
              <p className="text-xl font-medium text-center">{signs[currentIndex].value}</p>
            </>
          )}
        </div>

        {/* Progress indicator */}
        <div className="mt-4 bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / signs.length) * 100}%` }}
          ></div>
        </div>

        {/* Controls */}
        <div className="flex justify-between mt-4">
          <p className="text-sm text-gray-600">
            Sign {currentIndex + 1} of {signs.length}
          </p>
          <button
            onClick={restart}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            disabled={isPlaying}
          >
            {isPlaying ? "Playing..." : "Replay"}
          </button>
        </div>
      </div>
    </div>
  )
}
