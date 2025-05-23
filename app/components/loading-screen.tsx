"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const LoadingScreen = () => {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        return newProgress > 100 ? 100 : newProgress
      })
    }, 200)

    // Set timer to complete loading
    const timer = setTimeout(() => {
      clearInterval(interval)
      setLoadingProgress(100)
      setTimeout(() => setShowLoading(false), 500)
    }, 1500)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  const letters = "BENARA".split("")

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] z-50 flex items-center justify-center transition-opacity duration-500 ${showLoading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <Image src="/images/owl-mascot.png" alt="Benara Mascot" fill className="object-contain animate-bounce" />
          </div>
        </div>

        <div className="flex justify-center mb-8">
          {letters.map((letter, index) => (
            <motion.div
              key={index}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.1 * index,
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                repeatDelay: 0.1,
              }}
              className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mx-1"
            >
              {letter}
            </motion.div>
          ))}
        </div>

        <div className="w-64 md:w-80 h-3 bg-white/50 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.2 }}
          ></motion.div>
        </div>

        <div className="mt-4 text-blue-700 font-medium">
          <span className="inline-block animate-pulse">Sedang memuat materi...</span>
        </div>
      </div>

      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-bubble animate-float-bubbles"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-10%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default LoadingScreen
