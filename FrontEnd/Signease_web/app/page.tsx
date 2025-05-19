"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Menu,
  ImageIcon,
  Camera,
  Bolt,
  LineChartIcon as ChartLineUp,
  Smartphone,
  Accessibility,
  Book,
  Type,
} from "lucide-react"
import Image from "next/image"

export default function SignEase() {
  const [sidebarActive, setSidebarActive] = useState(false)
  const [activeContent, setActiveContent] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const menuBtnRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside sidebar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        menuBtnRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !menuBtnRef.current.contains(event.target as Node) &&
        !menuBtnRef.current.contains(event.target as Node)
      ) {
        setSidebarActive(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle file inputs
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("Image selected:", file.name)
      // Add your image processing logic here
    }
  }

  const [textInput, setTextInput] = useState("")
  const [convertedSigns, setConvertedSigns] = useState<any[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [currentSignIndex, setCurrentSignIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleTextToSignConversion = async () => {
    if (!textInput.trim()) return

    setIsConverting(true)
    try {
      // Call the API to convert text to sign language
      const response = await fetch("/api/convert-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput }),
      })

      if (!response.ok) {
        throw new Error("Failed to convert text")
      }

      const data = await response.json()
      setConvertedSigns(data.signs)
      setCurrentSignIndex(0)
      setIsPlaying(true)
      showContent("textToSign")
    } catch (error) {
      console.error("Error converting text:", error)
      alert("Failed to convert text to sign language. Please try again.")
    } finally {
      setIsConverting(false)
    }
  }

  // Effect to handle sign animation playback
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (isPlaying && convertedSigns.length > 0) {
      timer = setTimeout(() => {
        if (currentSignIndex < convertedSigns.length - 1) {
          setCurrentSignIndex((prev) => prev + 1)
        } else {
          setIsPlaying(false)
        }
      }, 2000) // Show each sign for 2 seconds
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isPlaying, currentSignIndex, convertedSigns])

  // Function to restart the animation
  const restartAnimation = () => {
    setCurrentSignIndex(0)
    setIsPlaying(true)
  }

  // Live detection functions
  const startLiveDetection = async () => {
    try {
      // Request both video and audio permissions to ensure proper access
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch((e) => {
            console.error("Error playing video:", e)
          })
        }
      }

      streamRef.current = stream
      setActiveContent("liveDetection")
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert(
        "Could not access camera. Please make sure you have granted permission and your camera is not being used by another application.",
      )
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    hideContent()
  }

  // Content display functions
  const showContent = (contentId: string) => {
    setActiveContent(contentId)
    setSidebarActive(false)
  }

  const hideContent = () => {
    setActiveContent(null)
  }

  // Dictionary data
  const dictionaryItems = [
    {
      gesture: "hello",
      meaning: "A wave-like motion with the hand, palm facing outward",
      image: "/Hello.png",
    },
    {
      gesture: "thank you",
      meaning: "Flat hand starting at the chin and moving forward",
      image: "/Thanks.png",
    },
    {
      gesture: "please",
      meaning: "Circular motion with flat hand over the chest",
      image: "/Please.png",
    },
    {
      gesture: "sorry",
      meaning: "Fist making a circular motion over the chest",
      image: "/Sorry.png",
    },
    {
      gesture: "yes",
      meaning: "Hand making a nodding motion, similar to a head nod",
      image: "/Yes.png",
    },
    {
      gesture: "no",
      meaning: "Index finger wagging from side to side",
      image: "/No.png",
    },
    {
      gesture: "help",
      meaning: "One hand in a thumbs-up gesture resting on the open palm of the other hand, both hands moving slightly upward",
      image: "/Help.png",
    },
    { gesture: "love", 
      meaning: "Hands crossed over the heart", 
      image: "/Love.png",
    }
  ]

  // Alphabet data
  const alphabetItems = [{
      letter:"A",
      image: `/alphabet/a_small.gif`,
    },
    {
      letter:"B",
      image: `/alphabet/b_small.gif`,
    },
    {
      letter:"C",
      image: `/alphabet/c_small.gif`,
    },
    {
      letter:"D",
      image: `/alphabet/d_small.gif`,
    },
    {
      letter:"E",
      image: `/alphabet/e_small.gif`,
    },
    {
      letter:"F",
      image: `/alphabet/f_small.gif`,
    },
    {
      letter:"G",
      image: `/alphabet/g_small.gif`,
    },
    {
      letter:"H",
      image: `/alphabet/h_small.gif`,
    },
    {
      letter:"I",
      image: `/alphabet/i_small.gif`,
    },
    {
      letter:"J",
      image: `/alphabet/j_small.gif`,
    },
    {
      letter:"K",
      image: `/alphabet/k_small.gif`,
    },
    {
      letter:"L",
      image: `/alphabet/l_small.gif`,
    },
    {
      letter:"M",
      image: `/alphabet/m_small.gif`,
    },
    {
      letter:"N",
      image: `/alphabet/n_small.gif`,
    },
    {
      letter:"O",
      image: `/alphabet/o_small.gif`,
    },
    {
      letter:"P",
      image: `/alphabet/p_small.gif`,
    },
    {
      letter:"Q",
      image: `/alphabet/q_small.gif`,
    },
    {
      letter:"R",
      image: `/alphabet/r_small.gif`,
    },
    {
      letter:"S",
      image: `/alphabet/s_small.gif`,
    },
    {
      letter:"T",
      image: `/alphabet/t_small.gif`,
    },
    {
      letter:"U",
      image: `/alphabet/u_small.gif`,
    },
    {
      letter:"V",
      image: `/alphabet/v_small.gif`,
    },
    {
      letter:"W",
      image: `/alphabet/w_small.gif`,
    },
    {
      letter:"X",
      image: `/alphabet/x_small.gif`,
    },
    {
      letter:"Y",
      image: `/alphabet/y_small.gif`,
    },
    {
      letter:"Z",
      image: `/alphabet/z_small.gif`,
    },
  ]
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700">
      {/* Menu Button */}
      <div
        ref={menuBtnRef}
        className="fixed top-5 left-5 p-3 bg-white rounded shadow-md cursor-pointer z-50"
        onClick={() => setSidebarActive(!sidebarActive)}
      >
        <Menu size={24} />
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-[300px] h-full bg-white p-5 shadow-md z-40 transition-all duration-300 ${
          sidebarActive ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="mt-16 space-y-1">
          <li
            className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => showContent("info")}
          >
            Information of Sign Language
          </li>
          <li
            className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => showContent("alphabets")}
          >
            Alphabets and Words in Sign Language
          </li>
          <li
            className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => showContent("dictionary")}
          >
            Dictionary of Sign Language
          </li>
          <li
            className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => showContent("project")}
          >
            Our Project
          </li>
          <li
            className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => showContent("contact")}
          >
            Contact Us
          </li>
        </ul>
      </div>

      {/* Header */}
      <div className="bg-white/90 py-5 mb-8 shadow-md">
        <div className="text-center py-5">
          <h1 className="text-5xl font-bold text-gray-800 drop-shadow-sm">SignEase</h1>
          <div className="text-lg text-gray-600 mt-2">Breaking Communication Barriers Through Technology</div>
        </div>
      </div>

      {/* Main Content */}
      {activeContent === null ? (
        <>
          {/* Hero Banner */}
          <div className="relative w-full max-w-5xl mx-auto mb-10 px-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Bridging Communication Gaps</h2>
                  <p className="text-gray-600 mb-6">
                    SignEase uses advanced AI to recognize sign language gestures in real-time, making communication
                    more accessible for everyone.
                  </p>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition-colors w-fit"
                    onClick={() => startLiveDetection()}
                  >
                    Try It Now
                  </button>
                </div>
                <div className="md:w-1/2 p-4">
                  <Image
                    src="/signlanguage-image.png"
                    alt="Sign Language Recognition"
                    width={5000}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Options */}
          <div className="flex flex-col items-center gap-5 px-5 py-8 max-w-3xl mx-auto">
            <div className="w-full bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="p-5 flex items-center gap-5">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <ImageIcon size={24} className="text-gray-800" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Upload Image</h3>
                  <p className="text-sm text-gray-600">Upload and analyze sign language gestures from images</p>
                </div>
                <label className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer transition-colors">
                  Select Image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
            </div>

            <div className="w-full bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="p-5 flex items-center gap-5">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Type size={24} className="text-gray-800" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Text to Sign Language</h3>
                  <p className="text-sm text-gray-600">Convert text into sign language gestures</p>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                  onClick={() => showContent("textToSignInput")}
                >
                  Convert Text
                </button>
              </div>
            </div>

            <div className="w-full bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="p-5 flex items-center gap-5">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Camera size={24} className="text-gray-800" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Live Detection</h3>
                  <p className="text-sm text-gray-600">Real-time sign language detection using your camera</p>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                  onClick={startLiveDetection}
                >
                  Start Camera
                </button>
              </div>
            </div>

            <div className="w-full bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="p-5 flex items-center gap-5">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Book size={24} className="text-gray-800" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Sign Language Dictionary</h3>
                  <p className="text-sm text-gray-600">Learn common sign language gestures and their meanings</p>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                  onClick={() => showContent("dictionary")}
                >
                  Open Dictionary
                </button>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="px-5 max-w-6xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Learn Sign Language with SignEase</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <Image
                  src="/placeholder.svg?height=200&width=200&text=Sign+A"
                  alt="Sign Language A"
                  width={200}
                  height={200}
                  className="rounded"
                />
              </div>
              <div className="bg-white p-2 rounded-lg shadow-md">
                <Image
                  src="/placeholder.svg?height=200&width=200&text=Sign+B"
                  alt="Sign Language B"
                  width={200}
                  height={200}
                  className="rounded"
                />
              </div>
              <div className="bg-white p-2 rounded-lg shadow-md">
                <Image
                  src="/placeholder.svg?height=200&width=200&text=Sign+C"
                  alt="Sign Language C"
                  width={200}
                  height={200}
                  className="rounded"
                />
              </div>
              <div className="bg-white p-2 rounded-lg shadow-md">
                <Image
                  src="/placeholder.svg?height=200&width=200&text=Sign+D"
                  alt="Sign Language D"
                  width={200}
                  height={200}
                  className="rounded"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-5 max-w-6xl mx-auto mb-10">
            <div className="bg-white p-5 rounded-xl text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="text-3xl text-blue-600 mb-4 flex justify-center">
                <Bolt />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Real-Time Processing</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Instant recognition and translation of sign language gestures
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="text-3xl text-blue-600 mb-4 flex justify-center">
                <ChartLineUp />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">High Accuracy</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Powered by advanced machine learning models</p>
            </div>

            <div className="bg-white p-5 rounded-xl text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="text-3xl text-blue-600 mb-4 flex justify-center">
                <Smartphone />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Multi-Platform</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Works seamlessly across all devices</p>
            </div>

            <div className="bg-white p-5 rounded-xl text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="text-3xl text-blue-600 mb-4 flex justify-center">
                <Accessibility />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Accessibility</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Making communication accessible for everyone</p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Live Detection */}
          {activeContent === "liveDetection" && (
            <div className="p-10 bg-white rounded-xl m-5 shadow-md">
              <button className="px-5 py-2 bg-gray-800 text-white rounded mb-5" onClick={hideContent}>
                Back
              </button>
              <h2 className="text-2xl font-bold mb-4">Live Sign Language Detection</h2>
              <p className="mb-4">Position your hand in front of the camera to detect sign language gestures.</p>
              <video
                ref={videoRef}
                className="w-full max-w-2xl mx-auto my-5 rounded-lg border-4 border-blue-500"
                autoPlay
                playsInline
              ></video>
              <div className="text-center">
                <button className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded" onClick={stopCamera}>
                  Stop Camera
                </button>
              </div>
            </div>
          )}

          {/* Information */}
          {activeContent === "info" && (
            <div className="p-10 bg-white rounded-xl m-5 shadow-md">
              <button className="px-5 py-2 bg-gray-800 text-white rounded mb-5" onClick={hideContent}>
                Back
              </button>
              <h2 className="text-2xl font-bold mb-4">Information of Sign Language</h2>
              <div className="space-y-4">
                <p>
                  Sign language is a visual means of communicating through hand signals, gestures, facial expressions,
                  and body language. It is primarily used by people who are deaf or hard of hearing, although many
                  hearing people also use sign language to communicate with those who are deaf.
                </p>
                <p>
                  Indian Sign Language (ISL) is the sign language used in India. It is a complete language with its own
                  grammar, syntax, and vocabulary. ISL has evolved over many years and has regional variations,
                  reflecting India's linguistic and cultural diversity.
                </p>
                <p>
                  Sign language is not universal - different countries have their own sign languages, just as they have
                  different spoken languages. ISL is recognized by the Indian government and is used by approximately 5
                  million deaf people in India.
                </p>
              </div>
            </div>
          )}

          {/* Alphabets */}
          {activeContent === "alphabets" && (
            <div className="p-10 bg-white rounded-xl m-5 shadow-md">
              <button className="px-5 py-2 bg-gray-800 text-white rounded mb-5" onClick={hideContent}>
                Back
              </button>
              <h2 className="text-2xl font-bold mb-4">Alphabets and Words in Sign Language</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {alphabetItems.map((item) => (
                  <div key={item.letter} className="text-center">
                    <div className="bg-gray-100 p-4 rounded-lg mb-2 flex items-center justify-center">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={`Sign for letter ${item.letter}`}
                        width={100}
                        height={100}
                      />
                    </div>
                    <p className="text-sm font-medium">Letter {item.letter}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">Common Words</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-2">
                     <Image
                      src="/Hello.png"
                      alt="Sign for Hello"
                      width={150}
                      height={150}
                    /> 
                  </div>
                  <p className="text-center font-medium">Hello</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-2">
                    <Image
                      src="/Thanks.png"
                      alt="Sign for Thank You"
                      width={150}
                      height={150}
                    />
                  </div>
                  <p className="text-center font-medium">Thank You</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center mb-2">
                    <Image
                      src="/Please.png"
                      alt="Sign for Please"
                      width={150}
                      height={150}
                    />
                  </div>
                  <p className="text-center font-medium">Please</p>
                </div>
              </div>
            </div>
          )}

          {/* Dictionary */}
          {activeContent === "dictionary" && (
            <div className="p-10 bg-white rounded-xl m-5 shadow-md">
              <button className="px-5 py-2 bg-gray-800 text-white rounded mb-5" onClick={hideContent}>
                Back
              </button>
              <h2 className="text-2xl font-bold mb-4">Dictionary of Sign Language</h2>
              <p className="mb-6">Learn common sign language gestures and their meanings to communicate effectively.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dictionaryItems.map((item) => (
                  <div
                    key={item.gesture}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col md:flex-row items-center gap-4"
                  >
                    <div className="md:w-1/3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={`Sign for ${item.gesture}`}
                        width={150}
                        height={150}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-lg font-medium text-blue-600 capitalize mb-2">{item.gesture}</h3>
                      <p className="text-gray-700">{item.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project */}
          {activeContent === "project" && (
            <div className="p-10 bg-white rounded-xl m-5 shadow-md">
              <button className="px-5 py-2 bg-gray-800 text-white rounded mb-5" onClick={hideContent}>
                Back
              </button>
              <h2 className="text-2xl font-bold mb-4">Our Project</h2>
              <div className="space-y-4">
                <p>
                SignEase is a cutting-edge sign language recognition system developed as part of our final year engineering project by a passionate team of four students. 
                The motivation behind SignEase is rooted in a vision for a more inclusive world—where individuals who
                use sign language can communicate seamlessly with those who do not understand it.
                </p>
                <p>
                We believe communication is a fundamental human right. Yet, for millions of people
                in the deaf and hard-of-hearing communities, everyday interactions can still pose challenges. 
                SignEase aims to bridge this communication divide by using the power of
                machine learning, computer vision, and real-time processing.
                </p>
                <h3>Our Mission </h3>

              </div>
            </div>
          )}

          {/* Contact */}
          {activeContent === "contact" && (
            <div className="p-10 bg-white rounded-xl m-5 shadow-md">
              <button className="px-5 py-2 bg-gray-800 text-white rounded mb-5" onClick={hideContent}>
                Back
              </button>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Ms. Tapaswi Jadhav</h3>
                  <p className="text-sm text-gray-600">Mobile: [Your Number]</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Ms. Tanishka Ghate</h3>
                  <p className="text-sm text-gray-600">Mobile: [Your Number]</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Mr. Aditya Bhosale</h3>
                  <p className="text-sm text-gray-600">Mobile: [Your Number]</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Ms. Aisha Baig</h3>
                  <p className="text-sm text-gray-600">Mobile: [Your Number]</p>
                </div>
              </div>
            </div>
          )}

          {/* Text to Sign Language Input */}
          {activeContent === "textToSignInput" && (
            <div className="p-10 bg-white rounded-xl m-5 shadow-md">
              <button className="px-5 py-2 bg-gray-800 text-white rounded mb-5" onClick={hideContent}>
                Back
              </button>
              <h2 className="text-2xl font-bold mb-4">Convert Text to Sign Language</h2>
              <p className="mb-4">Enter text below to convert it into sign language gestures.</p>

              <div className="mb-5">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Enter text here..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
                  onClick={handleTextToSignConversion}
                  disabled={!textInput.trim() || isConverting}
                >
                  {isConverting ? "Converting..." : "Convert to Sign Language"}
                </button>
              </div>
            </div>
          )}

          {/* Text to Sign Language Results */}
          {activeContent === "textToSign" && (
            <div className="p-10 bg-white rounded-xl m-5 shadow-md">
              <button className="px-5 py-2 bg-gray-800 text-white rounded mb-5" onClick={hideContent}>
                Back
              </button>
              <h2 className="text-2xl font-bold mb-4">Text to Sign Language Conversion</h2>
              <p className="mb-4">
                Original text: <span className="font-medium">{textInput}</span>
              </p>

              <div className="flex flex-col items-center justify-center mt-8">
                {convertedSigns.length > 0 && (
                  <div className="relative w-full max-w-md">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center">
                      {/* Display current sign */}
                      {currentSignIndex < convertedSigns.length && (
                        <>
                          <div className="mb-4">
                            {convertedSigns[currentSignIndex].type === "letter" ? (
                              <img
                                src={`/alphabet/${convertedSigns[currentSignIndex].value}_small.gif`}
                                alt={`Sign for ${convertedSigns[currentSignIndex].value}`}
                                className="w-64 h-64 object-contain"
                              />
                            ) : (
                              <img
                                src={convertedSigns[currentSignIndex].path || "/placeholder.svg"}
                                alt={`Sign for ${convertedSigns[currentSignIndex].value}`}
                                className="w-64 h-64 object-contain"
                              />
                            )}
                          </div>
                          <p className="text-xl font-medium text-center">{convertedSigns[currentSignIndex].value}</p>
                        </>
                      )}
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-4 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${((currentSignIndex + 1) / convertedSigns.length) * 100}%` }}
                      ></div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-between mt-4">
                      <p className="text-sm text-gray-600">
                        Sign {currentSignIndex + 1} of {convertedSigns.length}
                      </p>
                      <button
                        onClick={restartAnimation}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        disabled={isPlaying}
                      >
                        {isPlaying ? "Playing..." : "Replay"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
