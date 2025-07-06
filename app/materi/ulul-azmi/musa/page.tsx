"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const MusaStory = () => {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const [showLoading, setShowLoading] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const totalPages = 5

    const storyPages = {
        1: {
            title: "Bayi dalam Keranjang",
            mainImage: "/images/sungai.jpg",
            text: "Untuk menyelamatkan bayi Musa dari kekejaman Firaun, ibunya memasukkan Musa ke dalam keranjang dan mengapungkannya di Sungai Nil. Allah mengatur sehingga Musa ditemukan dan dibesarkan di istana Firaun.",
            funFact: "Musa kecil diasuh oleh ibu kandungnya sendiri di istana Firaun!",
            funFactImage: "/images/ibu.jpg"
        },
        2: {
            title: "Mendapat Wahyu",
            mainImage: "/images/gn4.jpg",
            text: "Allah berbicara langsung kepada Nabi Musa di Bukit Sinai. Di sana beliau menerima wahyu dan perintah untuk mengajak Firaun dan kaumnya menyembah Allah.",
            funFact: "Nabi Musa adalah satu-satunya nabi yang berbicara langsung dengan Allah!",
            funFactImage: "/images/gn3.jpg"
        },
        3: {
            title: "Mukjizat Tongkat",
            mainImage: "/images/tong .jpg",
            text: "Allah memberi Nabi Musa mukjizat berupa tongkat yang bisa berubah menjadi ular. Mukjizat ini mengalahkan para penyihir Firaun dan membuktikan kekuasaan Allah.",
            funFact: "Tongkat Nabi Musa juga bisa membelah laut dan mengeluarkan air dari batu!",
            funFactImage: "/images/laut belah.jpg"
        },
        4: {
            title: "Membelah Laut",
            mainImage: "/images/laut belah.jpg",
            text: "Ketika dikejar pasukan Firaun, Allah memerintahkan Nabi Musa untuk memukul laut dengan tongkatnya. Laut terbelah membentuk jalan, dan Bani Israil selamat menyeberang.",
            funFact: "Air laut yang terbelah berdiri seperti dinding yang tinggi di kiri dan kanan!",
            funFactImage: "/images/belah.jpg"
        },
        5: {
            title: "Menerima Taurat",
            mainImage: "/images/gng.jpg",
            text: "Allah memberikan Kitab Taurat kepada Nabi Musa di Bukit Sinai. Taurat berisi petunjuk dan hukum-hukum untuk membimbing Bani Israil.",
            funFact: "Nabi Musa berada di Bukit Sinai selama 40 hari untuk menerima Taurat!",
            funFactImage: "/images/gn.jpg"
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
                                <span className="text-4xl">🌊</span>
                                Kisah Nabi Musa AS
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
                            <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4">
                                <button
                                    onClick={() => currentPage > 1 && setCurrentPage(prev => prev - 1)}
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 md:px-6 rounded-full text-base md:text-lg font-semibold transform hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
                                    disabled={currentPage === 1}
                                >
                                    <span className="text-2xl">⬅️</span> Sebelumnya
                                </button>
                                <button
                                    onClick={() => currentPage < totalPages && setCurrentPage(prev => prev + 1)}
                                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 md:px-6 rounded-full text-base md:text-lg font-semibold transform hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
                                    disabled={currentPage === totalPages}
                                >
                                    Selanjutnya <span className="text-2xl">➡️</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
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
                                <h3 className="text-xl md:text-2xl font-bold text-purple-600 mb-4">Mini Games! 🎮</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    <button
                                        onClick={startMemoryGame}
                                        className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-xl text-base md:text-lg font-semibold transform hover:scale-105 transition-transform duration-200"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-2xl">🎯</span>
                                            Permainan Memori
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

export default MusaStory 