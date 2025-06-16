"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const LoadingScreen = () => {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showLoading, setShowLoading] = useState(true)
  const [slowConnection, setSlowConnection] = useState(false)

  const updateProgress = useCallback((prev: number) => {
    const newProgress = prev + Math.random() * 10
    return newProgress > 100 ? 100 : newProgress
  }, [])

  useEffect(() => {
    let startTime = Date.now()

    // Simulate loading progress with smoother animation
    const interval = setInterval(() => {
      setLoadingProgress(updateProgress)
    }, 100)

    // Check for slow connection after 3 seconds
    const slowConnectionTimer = setTimeout(() => {
      if (loadingProgress < 70) {
        setSlowConnection(true)
      }
    }, 3000)

    // Set timer to complete loading
    const timer = setTimeout(() => {
      clearInterval(interval)
      setLoadingProgress(100)
      setTimeout(() => setShowLoading(false), 500)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
      clearTimeout(slowConnectionTimer)
    }
  }, [updateProgress])

  const letters = "BENARA".split("")

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src="/images/benara-logo.png"
                  alt="Benara Mascot"
                  fill
                  className="object-contain animate-bounce"
                  priority
                />
              </div>
            </div>

            <div className="flex justify-center mb-8">
              {letters.map((letter, index) => (
                <motion.div
                  key={index}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.05 * index,
                    duration: 0.4,
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
                transition={{ duration: 0.3, ease: "easeInOut" }}
              ></motion.div>
            </div>

            <div className="mt-4 text-blue-700 font-medium">
              <motion.span
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                {slowConnection
                  ? "Mohon tunggu sebentar, koneksi agak lambat..."
                  : "Sedang memuat materi..."}
              </motion.span>
            </div>
          </div>

          {/* Optimized floating bubbles with reduced number for better performance */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              animate={{
                y: "-100%",
                opacity: [0, 0.5, 0],
                x: Math.sin(i) * 50
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: i * 0.5,
              }}
              className="absolute bg-bubble"
              style={{
                width: `${Math.random() * 30 + 20}px`,
                height: `${Math.random() * 30 + 20}px`,
                left: `${Math.random() * 100}%`,
                bottom: `-10%`,
              }}
            ></motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
