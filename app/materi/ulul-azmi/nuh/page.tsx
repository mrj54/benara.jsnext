"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Home, User, Info } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'

const NuhStory = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [showLoading, setShowLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const totalPages = 5
  const router = useRouter()

  const storyPages = {
    1: {
      title: "Membangun Kapal",
      mainImage: "/images/ulul-azmi/nuh/building-ark.jpg",
      text: "Allah memerintahkan Nabi Nuh untuk membangun sebuah kapal yang sangat besar. Meskipun banyak yang mengejek, Nabi Nuh tetap sabar dan taat pada perintah Allah.",
      funFact: "Nabi Nuh membangun kapal dengan tangannya sendiri dan membutuhkan waktu yang sangat lama!",
      funFactImage: "/images/ulul-azmi/nuh/nuh-working.jpg"
    },
    2: {
      title: "Hujan Lebat",
      mainImage: "/images/ulul-azmi/nuh/heavy-rain.jpg",
      text: "Kemudian turunlah hujan yang sangat lebat selama berhari-hari. Air mulai naik dan banjir melanda di mana-mana. Nabi Nuh mengajak orang-orang beriman untuk naik ke dalam kapal.",
      funFact: "Nabi Nuh juga membawa berbagai jenis hewan berpasangan ke dalam kapal!",
      funFactImage: "/images/ulul-azmi/nuh/animals.jpg"
    },
    3: {
      title: "Berlayar di Air Bah",
      mainImage: "/images/ulul-azmi/nuh/sailing.jpg",
      text: "Kapal Nabi Nuh berlayar di atas air bah yang sangat tinggi. Semua yang berada di dalam kapal selamat berkat pertolongan Allah SWT.",
      funFact: "Air bah menutupi seluruh permukaan bumi, bahkan sampai ke puncak gunung tertinggi!",
      funFactImage: "/images/ulul-azmi/nuh/flood.jpg"
    },
    4: {
      title: "Air Surut",
      mainImage: "/images/ulul-azmi/nuh/receding.jpg",
      text: "Setelah beberapa lama, hujan pun berhenti dan air mulai surut. Kapal Nabi Nuh akhirnya berhenti di atas Gunung Judi.",
      funFact: "Nabi Nuh mengirim burung merpati untuk mencari tahu apakah air sudah surut!",
      funFactImage: "/images/ulul-azmi/nuh/dove.jpg"
    },
    5: {
      title: "Kehidupan Baru",
      mainImage: "/images/ulul-azmi/nuh/new-life.jpg",
      text: "Setelah air surut sepenuhnya, Nabi Nuh dan pengikutnya turun dari kapal untuk memulai kehidupan baru di bumi yang telah dibersihkan.",
      funFact: "Semua manusia yang ada di bumi saat ini adalah keturunan dari orang-orang yang selamat dalam kapal Nabi Nuh!",
      funFactImage: "/images/ulul-azmi/nuh/descendants.jpg"
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'id-ID'
      utterance.onend = () => setIsPlaying(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopAudio = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
  }

  const handleAudioClick = () => {
    if (isPlaying) {
      stopAudio()
    } else {
      const currentStory = storyPages[currentPage as keyof typeof storyPages]
      playAudio(`${currentStory.title}. ${currentStory.text} Tahukah kamu? ${currentStory.funFact}`)
    }
  }

  const showQuiz = () => {
    router.push('/materi/ulul-azmi/games/quiz')
  }

  const startMemoryGame = () => {
    router.push('/materi/ulul-azmi/games/memory')
  }

  const startPuzzle = () => {
    router.push('/materi/ulul-azmi/games/puzzle')
  }

  if (showLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  }

  const currentStory = storyPages[currentPage as keyof typeof storyPages]

  return (
    <div className="bg-gradient-to-b from-blue-100 to-purple-100 min-h-screen">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="cloud float-animation absolute top-10 left-10 text-4xl md:text-6xl lg:text-7xl opacity-20">☁️</div>
        <div className="cloud float-animation absolute top-20 right-20 text-4xl md:text-6xl lg:text-7xl opacity-20" style={{ animationDelay: '1s' }}>☁️</div>
        <div className="cloud float-animation absolute bottom-10 left-1/4 text-4xl md:text-6xl lg:text-7xl opacity-20" style={{ animationDelay: '2s' }}>☁️</div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="story-card max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="text-4xl">🚢</span>
                Kisah Nabi Nuh AS
              </h2>
              <div className="bg-yellow-400 rounded-full p-3 float-animation">
                <span className="text-3xl">📖</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentPage / totalPages) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="story-illustration mb-6 rounded-xl overflow-hidden shadow-lg h-64 md:h-80">
                    <Image
                      src={currentStory.mainImage}
                      alt={currentStory.title}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {currentStory.text}
                  </p>

                  <div className="bg-yellow-100 rounded-xl p-4 border-2 border-yellow-200">
                    <h4 className="font-bold text-yellow-800 text-lg mb-2">✨ Tahukah Kamu? ✨</h4>
                    <div className="flex items-start gap-4">
                      <div className="story-illustration flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden shadow-md">
                        <Image
                          src={currentStory.funFactImage}
                          alt="Fun Fact Illustration"
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-yellow-800">
                        {currentStory.funFact}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="space-y-4 mt-6">
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => currentPage > 1 && setCurrentPage(prev => prev - 1)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold transform hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
                  disabled={currentPage === 1}
                >
                  <span className="text-2xl">⬅️</span> Sebelumnya
                </button>
                <button
                  onClick={() => currentPage < totalPages && setCurrentPage(prev => prev + 1)}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold transform hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
                  disabled={currentPage === totalPages}
                >
                  Selanjutnya <span className="text-2xl">➡️</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleAudioClick}
                  className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl text-lg font-semibold transform hover:scale-105 transition-transform duration-200"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">{isPlaying ? '⏹️' : '🔊'}</span>
                    {isPlaying ? 'Hentikan Audio' : 'Dengarkan Cerita'}
                  </div>
                </button>
                <button
                  onClick={showQuiz}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl text-lg font-semibold transform hover:scale-105 transition-transform duration-200"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">❓</span>
                    Kuis Seru
                  </div>
                </button>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">Mini Games! 🎮</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={startMemoryGame}
                    className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-xl text-lg font-semibold transform hover:scale-105 transition-transform duration-200"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl">🎯</span>
                      Permainan Memori
                    </div>
                  </button>
                  <button
                    onClick={startPuzzle}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-xl text-lg font-semibold transform hover:scale-105 transition-transform duration-200"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl">🧩</span>
                      Puzzle Seru
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuhStory
