"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function SifatNabiQuizPage() {
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

  // Quiz questions specifically about prophet characteristics
  const questions = [
    {
      question: "Apa arti dari sifat Shiddiq?",
      options: ["Cerdas", "Jujur", "Menyampaikan", "Dapat dipercaya"],
      correct: 1,
      fact: "Shiddiq artinya benar dan jujur dalam setiap perkataan dan perbuatan. Nabi Muhammad ﷺ selalu berkata jujur sehingga dijuluki 'Al-Amin' (yang dapat dipercaya).",
    },
    {
      question: "Sifat wajib nabi yang berarti dapat dipercaya adalah...",
      options: ["Tabligh", "Fathanah", "Amanah", "Shiddiq"],
      correct: 2,
      fact: "Amanah artinya dapat dipercaya dalam menjalankan tugas dan tanggung jawab. Para nabi selalu menjaga amanah dengan baik.",
    },
    {
      question: "Sifat Tabligh pada nabi berarti...",
      options: ["Cerdas dan bijaksana", "Menyampaikan wahyu Allah", "Dapat dipercaya", "Jujur dalam perkataan"],
      correct: 1,
      fact: "Tabligh artinya menyampaikan seluruh wahyu Allah kepada umat manusia tanpa mengurangi atau menambahkan.",
    },
    {
      question: "Sifat mustahil yang berlawanan dengan Shiddiq adalah...",
      options: ["Khianat", "Kitman", "Baladah", "Kidzib"],
      correct: 3,
      fact: "Kidzib (dusta) adalah kebalikan dari Shiddiq (jujur). Para nabi mustahil bersifat dusta dalam perkataan dan perbuatan.",
    },
    {
      question: "Sifat Fathanah pada nabi berarti...",
      options: ["Cerdas dan bijaksana", "Jujur dalam perkataan", "Menyampaikan wahyu", "Dapat dipercaya"],
      correct: 0,
      fact: "Fathanah artinya cerdas dan bijaksana dalam menghadapi setiap persoalan. Para nabi memiliki kecerdasan luar biasa dalam menyelesaikan masalah.",
    },
    {
      question: "Sifat mustahil yang berlawanan dengan Amanah adalah...",
      options: ["Kidzib", "Khianat", "Kitman", "Baladah"],
      correct: 1,
      fact: "Khianat (berkhianat) adalah kebalikan dari Amanah (dapat dipercaya). Para nabi mustahil mengkhianati amanah yang diberikan.",
    },
    {
      question: "Sifat mustahil yang berlawanan dengan Tabligh adalah...",
      options: ["Kitman", "Kidzib", "Khianat", "Baladah"],
      correct: 0,
      fact: "Kitman (menyembunyikan) adalah kebalikan dari Tabligh (menyampaikan). Para nabi mustahil menyembunyikan wahyu Allah.",
    },
    {
      question: "Sifat mustahil yang berlawanan dengan Fathanah adalah...",
      options: ["Kidzib", "Khianat", "Baladah", "Kitman"],
      correct: 2,
      fact: "Baladah (bodoh) adalah kebalikan dari Fathanah (cerdas). Para nabi mustahil bersifat bodoh dan tidak memiliki kecerdasan.",
    },
    {
      question: "Nabi Muhammad ﷺ dijuluki 'Al-Amin' yang menunjukkan sifat...",
      options: ["Shiddiq", "Amanah", "Tabligh", "Fathanah"],
      correct: 1,
      fact: "Nabi Muhammad ﷺ dijuluki 'Al-Amin' yang artinya 'yang dapat dipercaya', menunjukkan sifat Amanah beliau yang sangat kuat.",
    },
    {
      question: "Sifat wajib nabi yang memungkinkan mereka menyelesaikan masalah dengan bijaksana adalah...",
      options: ["Fathanah", "Shiddiq", "Amanah", "Tabligh"],
      correct: 0,
      fact: "Fathanah (cerdas dan bijaksana) memungkinkan para nabi menyelesaikan berbagai masalah dengan bijaksana, seperti saat Nabi Muhammad ﷺ menyelesaikan perselisihan tentang peletakan Hajar Aswad.",
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



  // Save quiz result to localStorage
  const saveQuizResult = (score: number) => {
    // Get existing quiz history or initialize empty array
    const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]")

    // Create new quiz result object
    const today = new Date()
    const formattedDate = today.toISOString().split("T")[0]
    const hours = today.getHours()
    const minutes = today.getMinutes()

    // Calculate time with proper overflow handling
    let newMinutes = minutes + 2
    let newHours = hours

    if (newMinutes >= 60) {
      newMinutes = newMinutes - 60
      newHours = newHours + 1
    }

    if (newHours >= 24) {
      newHours = newHours - 24
    }

    const createdAt = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`

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
    if (currentQuestionIndex >= questions.length) {
      return
    }

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
      const nextIndex = currentQuestionIndex + 1
      if (nextIndex >= questions.length) {
        // Quiz completed
        saveQuizResult(currentScore)
        setGameState("completion")
      } else {
        setCurrentQuestionIndex(nextIndex)
        setGameState("quiz")
      }
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
            href="/materi/sifat"
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
            Adventure Sifat Nabi
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
                  <p className="mb-8 text-xl text-yellow-100">Uji Pengetahuanmu tentang Sifat-sifat Nabi</p>
                  <button
                    onClick={startGame}
                    className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-bold text-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-900"
                  >
                    Ayo Kita Mulai
                  </button>
                </motion.div>
              )}

              {/* Quiz Area */}
              {gameState === "quiz" && currentQuestionIndex < questions.length && (
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
                    Kamu telah menyelesaikan semua pertanyaan tentang Sifat-sifat Nabi!
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
