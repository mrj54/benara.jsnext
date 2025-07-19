"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function QuizPage() {
  const [userData, setUserData] = useState({
    nama: "",
    sekolah: "",
  })
  const [currentScore, setCurrentScore] = useState(0)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [correctStreak, setCorrectStreak] = useState(0)

  const [gameState, setGameState] = useState<"welcome" | "quiz" | "result" | "gameOver" | "completion">("welcome")
  const [resultData, setResultData] = useState({
    isCorrect: false,
    fact: "",
  })
  const starsContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Quiz questions about prophets
  const questions = [
    {
      question: "Siapa nabi pertama?",
      options: ["Adam AS", "Nuh AS", "Ibrahim AS", "Musa AS"],
      correct: 0,
      fact: "Adam AS adalah manusia dan nabi pertama di Bumi!",
    },
    {
      question: "Nabi manakah yang membangun bahtera besar?",
      options: ["Ibrahim AS", "Nuh AS", "Isa AS", "Musa AS"],
      correct: 1,
      fact: "Nuh AS membangun bahtera untuk menyelamatkan orang-orang beriman dan hewan dari banjir besar!",
    },
    {
      question: "Siapa yang membangun Ka'bah?",
      options: ["Musa AS", "Isa AS", "Ibrahim AS", "Sulaiman AS"],
      correct: 2,
      fact: "Ibrahim AS membangun Ka'bah bersama putranya Ismail AS!",
    },
    {
      question: "Nabi manakah yang membelah laut?",
      options: ["Dawud AS", "Yusuf AS", "Nuh AS", "Musa AS"],
      correct: 3,
      fact: "Musa AS membelah laut dengan tongkatnya atas izin Allah!",
    },
    {
      question: "Siapakah nabi terakhir?",
      options: ["Muhammad saw.", "Isa AS", "Yusuf AS", "Ibrahim AS"],
      correct: 0,
      fact: "Muhammad saw. adalah utusan terakhir Allah!",
    },
    {
      question: "Nabi yang terkenal dengan kesabarannya menghadapi penyakit adalah...",
      options: ["Ayyub AS", "Yunus AS", "Zakaria AS", "Yahya AS"],
      correct: 0,
      fact: "Nabi Ayyub AS terkenal dengan kesabarannya yang luar biasa saat menghadapi cobaan penyakit dan kehilangan harta serta keluarga.",
    },
    {
      question: "Nabi yang bisa berbicara dengan hewan adalah...",
      options: ["Dawud AS", "Sulaiman AS", "Yusuf AS", "Yunus AS"],
      correct: 1,
      fact: "Nabi Sulaiman AS bisa berbicara dengan hewan dan memimpin jin.",
    },
    {
      question: "Nabi yang tertelan ikan paus adalah...",
      options: ["Yunus AS", "Ayyub AS", "Zakaria AS", "Yahya AS"],
      correct: 0,
      fact: "Nabi Yunus AS tertelan ikan paus dan berdoa kepada Allah dari dalam perut ikan tersebut.",
    },
    {
      question: "Nabi yang memiliki mukjizat tongkat berubah menjadi ular adalah...",
      options: ["Ibrahim AS", "Isa AS", "Musa AS", "Harun AS"],
      correct: 2,
      fact: "Nabi Musa AS memiliki mukjizat tongkat yang bisa berubah menjadi ular dan membelah lautan.",
    },
    {
      question: "Nabi yang bisa menghidupkan orang mati atas izin Allah adalah...",
      options: ["Isa AS", "Sulaiman AS", "Daud AS", "Zakaria AS"],
      correct: 0,
      fact: "Nabi Isa AS memiliki mukjizat dapat menghidupkan orang mati, menyembuhkan orang buta dan penyakit kusta atas izin Allah.",
    },
  ]

  useEffect(() => {
    // Check if user is logged in
    const nama = localStorage.getItem("nama")
    const sekolah = localStorage.getItem("sekolah")

    if (!nama || !sekolah) {
      router.push("/")
      return
    }

    setUserData({ nama, sekolah })
    createStars()
  }, [router])

  // Create stars background
  const createStars = () => {
    if (!starsContainerRef.current) return

    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div")
      star.className = "absolute w-[2px] h-[2px] bg-white rounded-full animate-twinkle"
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.animationDelay = `${Math.random() * 1}s`
      starsContainerRef.current.appendChild(star)
    }
  }

  // Update progress bar
  const getProgressWidth = () => {
    return `${(currentQuestionIndex / questions.length) * 100}%`
  }

  // Start game
  const startGame = () => {
    setGameState("quiz")
  }

  // Show question
  const showQuestion = () => {
    // Check if we've reached the end of questions
    if (currentQuestionIndex >= questions.length) {
      saveQuizResult(currentScore)
      setGameState("completion")
      return
    }
  }

  // Save quiz result to localStorage
  const saveQuizResult = (score: number) => {
    // Get existing quiz history or initialize empty array
    const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]")

    // Create new quiz result object
    const today = new Date()
    const formattedDate = today.toISOString().split("T")[0]
    const hours = today.getHours()
    const minutes = today.getMinutes()
    const createdAt = minutes >= 58 ? `${hours === 23 ? 0 : hours + 1}:00` : `${hours}:${minutes + 2}`

    const newResult = {
      username: userData.nama,
      no: quizHistory.length + 1,
      tanggal: formattedDate,
      score: score,
      hours: createdAt,
      minutes: createdAt,
    }

    // Add new result to array
    quizHistory.push(newResult)

    // Save back to localStorage
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory))
  }

  // Check answer
  const checkAnswer = (selectedIndex: number) => {
    const question = questions[currentQuestionIndex]
    if (selectedIndex === question.correct) {
      setCurrentScore((prev) => prev + 10)
      setCorrectStreak((prev) => prev + 1)
      setResultData({
        isCorrect: true,
        fact: question.fact,
      })
    } else {
      setLives((prev) => prev - 1)
      setCorrectStreak(0)
      setResultData({
        isCorrect: false,
        fact: "Jawaban salah. Coba lagi.",
      })
    }
    setGameState("result")
  }

  // Handle next question
  const handleNextQuestion = () => {
    if (resultData.isCorrect) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setGameState("quiz")
    } else {
      if (lives <= 0) {
        saveQuizResult(currentScore)
        setGameState("gameOver")
      } else {
        setGameState("quiz")
      }
    }
  }

  // Reset game
  const resetGame = () => {
    setCurrentQuestionIndex(0)
    setCurrentScore(0)
    setLives(3)
    setCorrectStreak(0)
    setGameState("quiz")
  }

  // Get completion message based on score
  const getCompletionMessage = () => {
    const maxScore = questions.length * 10
    const percentage = (currentScore / maxScore) * 100

    if (percentage === 100) {
      return "Mashaa Allah! Kamu mendapat nilai sempurna! 🌟"
    } else if (percentage >= 80) {
      return "Alhamdulillah! Hasil yang sangat bagus! ✨"
    } else if (percentage >= 60) {
      return "Bagus! Terus tingkatkan pengetahuanmu! 💫"
    } else {
      return "Semangat! Coba lagi untuk hasil yang lebih baik! 💪"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4">
      {/* Stars Container */}
      <div ref={starsContainerRef} className="fixed inset-0 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/page"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-full text-white"
          >
            <ArrowLeft size={18} />
            <span>Kembali</span>
          </Link>
        </div>

        {/* Header */}
        <header className="text-center mb-8 relative pt-16">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center animate-float">
              <Star className="w-16 h-16 text-white animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text">
            Adventure Pertanyaan Nabi
          </h1>
          <p className="text-xl text-yellow-100 font-light">Ayo Tingkatkan Pengetahuanmu</p>
        </header>

        {/* Game Container */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-20">
          {/* Game Progress */}
          <div className="space-y-4 mb-8">
            {/* Score and Level */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6">
                {/* Score */}
                <div className="bg-yellow-400 bg-opacity-20 rounded-full px-6 py-3 flex items-center space-x-2">
                  <svg
                    className="w-6 h-6 text-yellow-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span className="text-yellow-300 font-medium">Score:</span>
                  <span className="font-bold text-2xl">{currentScore}</span>
                </div>

                {/* Level */}
                <div className="bg-green-400 bg-opacity-20 rounded-full px-6 py-3 flex items-center space-x-2">
                  <svg
                    className="w-6 h-6 text-green-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    ></path>
                  </svg>
                  <span className="text-green-300 font-medium">Level:</span>
                  <span className="font-bold text-2xl">{currentLevel}</span>
                </div>
              </div>

              {/* Lives */}
              <div className="flex space-x-1">
                {Array.from({ length: lives }).map((_, i) => (
                  <Heart key={i} className="w-6 h-6 text-red-400 fill-red-400" />
                ))}
                {Array.from({ length: 3 - lives }).map((_, i) => (
                  <Heart key={i + lives} className="w-6 h-6 text-gray-400" />
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white bg-opacity-10 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full"
                initial={{ width: "0%" }}
                animate={{ width: getProgressWidth() }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>

          {/* Game Area */}
          <div className="min-h-[400px] relative">
            <AnimatePresence mode="wait">
              {/* Welcome Screen */}
              {gameState === "welcome" && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <div className="mb-8 relative inline-block">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        ></path>
                      </svg>
                    </div>
                    <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-2 animate-pulse">
                      <svg
                        className="w-6 h-6 text-indigo-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text">
                    Ayo Mulai Adventurmu!!!
                  </h2>
                  <p className="mb-8 text-xl text-yellow-100">Temukan Kisah Inspiratif Para Nabi</p>
                  <button
                    onClick={startGame}
                    className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-bold text-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-900"
                  >
                    Ayo Kita Mulai
                  </button>
                </motion.div>
              )}

              {/* Quiz Area */}
              {gameState === "quiz" && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <h3 className="text-3xl font-bold mb-8">{questions[currentQuestionIndex].question}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {questions[currentQuestionIndex].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-2xl transition-colors"
                        onClick={() => checkAnswer(index)}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Result Modal */}
              {gameState === "result" && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-2xl text-center"
                >
                  <div className="text-6xl mb-4">{resultData.isCorrect ? "🎉" : "😔"}</div>
                  <h3 className="text-3xl font-bold mb-4">{resultData.isCorrect ? "Benar!" : "Salah!"}</h3>
                  <p className="mb-6 text-lg">{resultData.fact}</p>
                  <button
                    onClick={handleNextQuestion}
                    className="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full font-bold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                  >
                    {resultData.isCorrect
                      ? currentQuestionIndex === questions.length - 1
                        ? "Selesaikan Quest!"
                        : "Pertanyaan Berikutnya"
                      : "Coba Lagi"}
                  </button>
                </motion.div>
              )}

              {/* Game Over */}
              {gameState === "gameOver" && (
                <motion.div
                  key="gameOver"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <div className="mb-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-300 to-red-500 text-transparent bg-clip-text">
                    Game Over
                  </h2>
                  <p className="mb-4 text-xl text-red-100">Skor Akhir: {currentScore}</p>
                  <p className="mb-8 text-lg text-red-100">Jangan menyerah! Coba lagi untuk skor yang lebih baik!</p>
                  <button
                    onClick={resetGame}
                    className="group relative px-8 py-4 bg-gradient-to-r from-red-400 to-orange-500 rounded-full font-bold text-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-purple-900"
                  >
                    Mulai Lagi
                  </button>
                </motion.div>
              )}

              {/* Completion */}
              {gameState === "completion" && (
                <motion.div
                  key="completion"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <div className="mb-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center animate-float">
                      <svg
                        className="w-16 h-16 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text">
                    Quest Selesai!
                  </h2>
                  <p className="mb-4 text-xl text-yellow-100">Skor Akhir: {currentScore}</p>
                  <p className="mb-8 text-lg text-yellow-100">
                    Kamu telah menyelesaikan semua pertanyaan tentang para Nabi!
                  </p>
                  <div className="space-y-4">
                    <p className="text-md text-yellow-100">{getCompletionMessage()}</p>
                    <button
                      onClick={resetGame}
                      className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-bold text-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-900"
                    >
                      Mulai Quest Baru
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 1s infinite;
        }
      `}</style>
    </div>
  )
}
