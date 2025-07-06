"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const questions = [
    {
        question: "Siapa nabi Ulul Azmi yang membangun Ka'bah?",
        options: ["Nabi Nuh", "Nabi Ibrahim", "Nabi Musa", "Nabi Muhammad"],
        correct: 1,
        fact: "Nabi Ibrahim membangun Ka'bah bersama putranya, Ismail, atas perintah Allah.",
    },
    {
        question: "Nabi yang membawa kapal besar untuk menyelamatkan umatnya adalah...",
        options: ["Nabi Nuh", "Nabi Ibrahim", "Nabi Musa", "Nabi Isa"],
        correct: 0,
        fact: "Nabi Nuh membangun kapal besar untuk menyelamatkan umatnya dari banjir besar.",
    },
    {
        question: "Nabi yang dapat membelah lautan adalah...",
        options: ["Nabi Muhammad", "Nabi Ibrahim", "Nabi Musa", "Nabi Isa"],
        correct: 2,
        fact: "Nabi Musa membelah Laut Merah dengan izin Allah untuk menyelamatkan Bani Israil.",
    },
    {
        question: "Nabi yang dapat menghidupkan orang mati atas izin Allah adalah...",
        options: ["Nabi Nuh", "Nabi Isa", "Nabi Musa", "Nabi Muhammad"],
        correct: 1,
        fact: "Nabi Isa diberi mukjizat oleh Allah untuk menyembuhkan orang sakit dan menghidupkan orang mati.",
    },
    {
        question: "Nabi terakhir dan penutup para nabi adalah...",
        options: ["Nabi Nuh", "Nabi Ibrahim", "Nabi Isa", "Nabi Muhammad"],
        correct: 3,
        fact: "Nabi Muhammad adalah nabi terakhir dan penutup para nabi (Khatamun Nabiyyin).",
    },
]

export default function UlulAzmiQuizPage() {
    const [userData, setUserData] = useState({ nama: "", sekolah: "" })
    const [currentScore, setCurrentScore] = useState(0)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [lives, setLives] = useState(3)
    const [gameState, setGameState] = useState<"welcome" | "quiz" | "result" | "gameOver" | "completion">("welcome")
    const [resultData, setResultData] = useState({ isCorrect: false, fact: "" })
    const starsContainerRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

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

    const getProgressWidth = () => {
        return `${(currentQuestionIndex / questions.length) * 100}%`
    }

    const startGame = () => {
        setGameState("quiz")
    }

    const checkAnswer = (selectedIndex: number) => {
        if (currentQuestionIndex >= questions.length) return
        const question = questions[currentQuestionIndex]
        if (selectedIndex === question.correct) {
            setCurrentScore((prev) => prev + 10)
            setResultData({ isCorrect: true, fact: question.fact })
        } else {
            setLives((prev) => prev - 1)
            setResultData({ isCorrect: false, fact: "Jawaban salah. Coba lagi." })
        }
        setGameState("result")
    }

    const handleNextQuestion = () => {
        if (resultData.isCorrect) {
            const nextIndex = currentQuestionIndex + 1
            if (nextIndex >= questions.length) {
                setGameState("completion")
            } else {
                setCurrentQuestionIndex(nextIndex)
                setGameState("quiz")
            }
        } else {
            if (lives <= 0) {
                setGameState("gameOver")
            } else {
                setGameState("quiz")
            }
        }
    }

    const resetGame = () => {
        setCurrentQuestionIndex(0)
        setCurrentScore(0)
        setLives(3)
        setGameState("quiz")
    }

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
                        href="/materi/ulul-azmi"
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
                        Kuis Nabi Ulul Azmi
                    </h1>
                    <p className="text-xl text-yellow-100 font-light">Ayo Uji Pengetahuanmu</p>
                </header>
                {/* Game Container */}
                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-20">
                    <div className="space-y-4 mb-8">
                        {/* Score and Progress */}
                        <div className="flex justify-between items-center">
                            <div className="bg-yellow-400 bg-opacity-20 rounded-full px-6 py-3 flex items-center space-x-2">
                                <Star className="w-6 h-6 text-yellow-300" />
                                <span className="text-yellow-300 font-medium">Score:</span>
                                <span className="font-bold text-2xl">{currentScore}</span>
                            </div>
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
                    <div className="min-h-[300px] relative">
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
                                            <Star className="w-16 h-16 text-white" />
                                        </div>
                                    </div>
                                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text">
                                        Ayo Mulai Kuis!
                                    </h2>
                                    <p className="mb-8 text-xl text-yellow-100">Uji Pengetahuanmu tentang Nabi Ulul Azmi</p>
                                    <button
                                        onClick={startGame}
                                        className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-bold text-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-900"
                                    >
                                        Mulai Kuis
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
                                                ? "Selesaikan Kuis!"
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
                                            <Star className="w-16 h-16 text-white" />
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
                                            <Star className="w-16 h-16 text-white" />
                                        </div>
                                    </div>
                                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text">
                                        Kuis Selesai!
                                    </h2>
                                    <p className="mb-4 text-xl text-yellow-100">Skor Akhir: {currentScore}</p>
                                    <p className="mb-8 text-lg text-yellow-100">
                                        Kamu telah menyelesaikan semua pertanyaan tentang Nabi Ulul Azmi!
                                    </p>
                                    <div className="space-y-4">
                                        <p className="text-md text-yellow-100">{getCompletionMessage()}</p>
                                        <button
                                            onClick={resetGame}
                                            className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-bold text-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-900"
                                        >
                                            Main Lagi
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