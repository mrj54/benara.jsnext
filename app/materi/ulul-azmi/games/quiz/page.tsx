"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Question {
    id: number
    question: string
    options: string[]
    correctAnswer: number
    image?: string
}

const questions: Question[] = [
    {
        id: 1,
        question: "Siapa nabi Ulul Azmi yang membangun Ka'bah?",
        options: ["Nabi Nuh", "Nabi Ibrahim", "Nabi Musa", "Nabi Muhammad"],
        correctAnswer: 1,
        image: "/images/ulul-azmi/ibrahim.jpg"
    },
    {
        id: 2,
        question: "Nabi yang membawa kapal besar untuk menyelamatkan umatnya adalah...",
        options: ["Nabi Nuh", "Nabi Ibrahim", "Nabi Musa", "Nabi Isa"],
        correctAnswer: 0,
        image: "/images/ulul-azmi/nuh.jpg"
    },
    {
        id: 3,
        question: "Nabi yang dapat membelah lautan adalah...",
        options: ["Nabi Muhammad", "Nabi Ibrahim", "Nabi Musa", "Nabi Isa"],
        correctAnswer: 2,
        image: "/images/ulul-azmi/musa.jpg"
    },
    {
        id: 4,
        question: "Nabi yang dapat menghidupkan orang mati atas izin Allah adalah...",
        options: ["Nabi Nuh", "Nabi Isa", "Nabi Musa", "Nabi Muhammad"],
        correctAnswer: 1,
        image: "/images/ulul-azmi/isa.jpg"
    },
    {
        id: 5,
        question: "Nabi terakhir dan penutup para nabi adalah...",
        options: ["Nabi Nuh", "Nabi Ibrahim", "Nabi Isa", "Nabi Muhammad"],
        correctAnswer: 3,
        image: "/images/ulul-azmi/muhammad.jpg"
    }
]

export default function QuizGame() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)

    useEffect(() => {
        // Reset states when starting new game
        setCurrentQuestion(0)
        setScore(0)
        setShowScore(false)
        setSelectedAnswer(null)
        setIsAnswered(false)
    }, [])

    const handleAnswerClick = (selectedOption: number) => {
        if (isAnswered) return

        setSelectedAnswer(selectedOption)
        setIsAnswered(true)

        if (selectedOption === questions[currentQuestion].correctAnswer) {
            setScore(score + 1)
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
                setSelectedAnswer(null)
                setIsAnswered(false)
            } else {
                setShowScore(true)
            }
        }, 1500)
    }

    const restartQuiz = () => {
        setCurrentQuestion(0)
        setScore(0)
        setShowScore(false)
        setSelectedAnswer(null)
        setIsAnswered(false)
    }

    return (
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-[#2B4F60] mb-8">
                    Kuis Seru Nabi Ulul Azmi
                </h1>

                {showScore ? (
                    <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Skor Kamu: {score} dari {questions.length}</h2>
                        <p className="text-lg mb-6">
                            {score === questions.length
                                ? "Hebat! Kamu menguasai materi dengan baik!"
                                : "Ayo coba lagi untuk mendapatkan nilai sempurna!"}
                        </p>
                        <button
                            onClick={restartQuiz}
                            className="px-6 py-3 bg-[#FFA07A] text-white rounded-full hover:bg-[#ff8c5a] transition-all"
                        >
                            Main Lagi
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="mb-6">
                            <p className="text-sm text-gray-500 mb-2">
                                Pertanyaan {currentQuestion + 1} dari {questions.length}
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-[#FFA07A] h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {questions[currentQuestion].image && (
                            <div className="mb-6 flex justify-center">
                                <Image
                                    src={questions[currentQuestion].image}
                                    alt="Question illustration"
                                    width={300}
                                    height={200}
                                    className="rounded-lg"
                                />
                            </div>
                        )}

                        <h2 className="text-xl font-semibold mb-6">
                            {questions[currentQuestion].question}
                        </h2>

                        <div className="space-y-4">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerClick(index)}
                                    disabled={isAnswered}
                                    className={`w-full p-4 text-left rounded-lg transition-all ${isAnswered
                                            ? index === questions[currentQuestion].correctAnswer
                                                ? "bg-green-100 border-green-500"
                                                : index === selectedAnswer
                                                    ? "bg-red-100 border-red-500"
                                                    : "bg-gray-100"
                                            : "bg-gray-100 hover:bg-gray-200"
                                        } ${isAnswered && "cursor-default"
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 