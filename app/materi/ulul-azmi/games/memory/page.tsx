"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star, Heart, RotateCcw, Trophy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Card {
    id: number
    content: string
    isFlipped: boolean
    isMatched: boolean
    category: string
}

export default function MemoryGamePage() {
    const [userData, setUserData] = useState({
        nama: "",
        sekolah: "",
    })
    const [cards, setCards] = useState<Card[]>([])
    const [flippedCards, setFlippedCards] = useState<number[]>([])
    const [moves, setMoves] = useState(0)
    const [score, setScore] = useState(0)
    const [gameState, setGameState] = useState<"welcome" | "playing" | "completed">("welcome")
    const [selectedProphet, setSelectedProphet] = useState<string>("")
    const [timer, setTimer] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const confettiRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    // Prophet-specific card data
    const prophetData = {
        nuh: {
            title: "Nabi Nuh",
            description: "Kapal Besar",
            cards: [
                { content: "Nabi Nuh", category: "nama" },
                { content: "Kapal", category: "objek" },
                { content: "Manusia", category: "penumpang" },
                { content: "Hewan", category: "penumpang" },
                { content: "Air Bah", category: "bencana" },
                { content: "Gunung Judi", category: "tempat" },
                { content: "Merpati", category: "burung" },
            ]
        },
        ibrahim: {
            title: "Nabi Ibrahim",
            description: "Pencari Kebenaran",
            cards: [
                { content: "Nabi Ibrahim", category: "nama" },
                { content: "Ka'bah", category: "tempat" },
                { content: "Ismail", category: "anak" },
                { content: "Qurban", category: "ibadah" },
                { content: "Api", category: "ujian" },
                { content: "Hajar Aswad", category: "batu" },
                { content: "Zamzam", category: "air" },
            ]
        },
        musa: {
            title: "Nabi Musa",
            description: "Tongkat Ajaib",
            cards: [
                { content: "Nabi Musa", category: "nama" },
                { content: "Tongkat", category: "objek" },
                { content: "Firaun", category: "musuh" },
                { content: "Laut Merah", category: "tempat" },
                { content: "Taurat", category: "kitab" },
                { content: "Harun", category: "saudara" },
                { content: "Mukjizat", category: "keajaiban" },
            ]
        },
        isa: {
            title: "Nabi Isa",
            description: "Penyembuh",
            cards: [
                { content: "Nabi Isa", category: "nama" },
                { content: "Injil", category: "kitab" },
                { content: "Maryam", category: "ibu" },
                { content: "Penyembuhan", category: "mukjizat" },
                { content: "Orang Sakit", category: "pasien" },
                { content: "Hawariyyun", category: "pengikut" },
                { content: "Kedamaian", category: "pesan" },
            ]
        },
        muhammad: {
            title: "Nabi Muhammad",
            description: "Teladan Utama",
            cards: [
                { content: "Nabi Muhammad", category: "nama" },
                { content: "Al-Qur'an", category: "kitab" },
                { content: "Makkah", category: "tempat" },
                { content: "Hijrah", category: "peristiwa" },
                { content: "Khadijah", category: "istri" },
                { content: "Sahabat", category: "pengikut" },
                { content: "Shalat", category: "ibadah" },
            ]
        }
    }

    useEffect(() => {
        // Check if user is logged in
        const nama = localStorage.getItem("nama")
        const sekolah = localStorage.getItem("sekolah")

        if (!nama || !sekolah) {
            router.push("/")
            return
        }

        setUserData({ nama, sekolah })
    }, [router])

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isTimerRunning])

    const initializeGame = (prophet: string) => {
        const data = prophetData[prophet as keyof typeof prophetData]
        if (!data) return

        setSelectedProphet(prophet)

        // Create pairs of cards
        const cardPairs = [...data.cards, ...data.cards]
        const shuffledCards = cardPairs
            .map((card, index) => ({
                ...card,
                id: index,
                isFlipped: false,
                isMatched: false,
            }))
            .sort(() => Math.random() - 0.5)

        setCards(shuffledCards)
        setFlippedCards([])
        setMoves(0)
        setScore(0)
        setTimer(0)
        setIsTimerRunning(true)
        setGameState("playing")
    }

    const handleCardClick = (cardId: number) => {
        if (gameState !== "playing") return

        const card = cards.find(c => c.id === cardId)
        if (!card || card.isFlipped || card.isMatched) return

        // Play flip sound effect
        playFlipSound()

        const newCards = cards.map(c =>
            c.id === cardId ? { ...c, isFlipped: true } : c
        )
        setCards(newCards)

        const newFlippedCards = [...flippedCards, cardId]
        setFlippedCards(newFlippedCards)

        if (newFlippedCards.length === 2) {
            setMoves(prev => prev + 1)

            const [firstId, secondId] = newFlippedCards
            const firstCard = cards.find(c => c.id === firstId)
            const secondCard = cards.find(c => c.id === secondId)

            if (firstCard && secondCard && firstCard.content === secondCard.content) {
                // Match found
                playMatchSound()
                setTimeout(() => {
                    setCards(prev => prev.map(c =>
                        c.id === firstId || c.id === secondId
                            ? { ...c, isMatched: true, isFlipped: true }
                            : c
                    ))
                    setScore(prev => prev + 10)
                    setFlippedCards([])

                    // Check if game is completed
                    const matchedCount = cards.filter(c => c.isMatched).length + 2
                    if (matchedCount === cards.length) {
                        setIsTimerRunning(false)
                        setGameState("completed")
                        saveGameResult()
                        playWinSound()
                        triggerConfetti()
                    }
                }, 500)
            } else {
                // No match
                playMismatchSound()
                setTimeout(() => {
                    setCards(prev => prev.map(c =>
                        c.id === firstId || c.id === secondId
                            ? { ...c, isFlipped: false }
                            : c
                    ))
                    setFlippedCards([])
                }, 1000)
            }
        }
    }

    // Sound effects
    const playFlipSound = () => {
        // Create a simple flip sound using Web Audio API
        if (typeof window !== 'undefined' && window.AudioContext) {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.1)
        }
    }

    const playMatchSound = () => {
        if (typeof window !== 'undefined' && window.AudioContext) {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.setValueAtTime(523, audioContext.currentTime) // C
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1) // E
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2) // G

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + 0.1)
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + 0.2)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.3)
        }
    }

    const playMismatchSound = () => {
        if (typeof window !== 'undefined' && window.AudioContext) {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
            oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.2)

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.2)
        }
    }

    const playWinSound = () => {
        if (typeof window !== 'undefined' && window.AudioContext) {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            // Play a victory melody
            const notes = [523, 659, 784, 1047, 784, 659, 523] // C E G C G E C
            notes.forEach((freq, index) => {
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1)
            })

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.7)

            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.7)
        }
    }

    const triggerConfetti = () => {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
    }

    const saveGameResult = () => {
        const gameHistory = JSON.parse(localStorage.getItem("memoryGameHistory") || "[]")
        const today = new Date()
        const formattedDate = today.toISOString().split("T")[0]

        const newResult = {
            username: userData.nama,
            prophet: selectedProphet,
            score: score,
            moves: moves,
            time: timer,
            date: formattedDate,
            accuracy: cards.length > 0 ? Math.round((score / (cards.length * 10)) * 100) : 0,
        }

        gameHistory.push(newResult)
        localStorage.setItem("memoryGameHistory", JSON.stringify(gameHistory))
    }

    const resetGame = () => {
        if (selectedProphet) {
            initializeGame(selectedProphet)
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const getCategoryColor = (category: string) => {
        const colors = {
            nama: "from-blue-500 to-blue-600",
            objek: "from-purple-500 to-purple-600",
            tempat: "from-green-500 to-green-600",
            penumpang: "from-yellow-500 to-yellow-600",
            fenomena: "from-red-500 to-red-600",
            bencana: "from-gray-500 to-gray-600",
            burung: "from-pink-500 to-pink-600",
            tanda: "from-indigo-500 to-indigo-600",
            waktu: "from-orange-500 to-orange-600",
            hasil: "from-teal-500 to-teal-600",
            batu: "from-amber-500 to-amber-600",
            air: "from-cyan-500 to-cyan-600",
            anak: "from-emerald-500 to-emerald-600",
            istri: "from-rose-500 to-rose-600",
            ibadah: "from-violet-500 to-violet-600",
            hewan: "from-lime-500 to-lime-600",
            ujian: "from-red-600 to-red-700",
            raja: "from-yellow-600 to-yellow-700",
            petunjuk: "from-blue-600 to-blue-700",
            ajaran: "from-green-600 to-green-700",
            musuh: "from-red-700 to-red-800",
            kitab: "from-purple-600 to-purple-700",
            hukum: "from-indigo-600 to-indigo-700",
            saudara: "from-pink-600 to-pink-700",
            pengikut: "from-cyan-600 to-cyan-700",
            keajaiban: "from-yellow-600 to-yellow-700",
            tujuan: "from-emerald-600 to-emerald-700",
            mukjizat: "from-violet-600 to-violet-700",
            pasien: "from-rose-600 to-rose-700",
            ibu: "from-pink-500 to-pink-600",
            pesan: "from-blue-500 to-blue-600",
        }
        return colors[category as keyof typeof colors] || "from-gray-500 to-gray-600"
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4 relative overflow-hidden">
            {/* Confetti */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50">
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: -10,
                                rotate: 0,
                            }}
                            animate={{
                                y: window.innerHeight + 10,
                                rotate: 360,
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                ease: "easeOut",
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 6)],
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="max-w-6xl mx-auto">
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
                <header className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text">
                        Permainan Memori
                    </h1>
                    <p className="text-xl text-yellow-100">Temukan Pasangan Kartu yang Sama</p>
                </header>

                {/* Game Container */}
                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-20">
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
                                <div className="mb-8">
                                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center animate-float">
                                        <Star className="w-16 h-16 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text">
                                    Pilih Nabi Ulul Azmi
                                </h2>
                                <p className="mb-8 text-xl text-yellow-100">Pilih nabi untuk memulai permainan memori</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                    {Object.entries(prophetData).map(([key, data]) => (
                                        <motion.button
                                            key={key}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => initializeGame(key)}
                                            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-2xl p-6 text-white font-bold text-lg shadow-lg transition-all duration-300"
                                        >
                                            <h3 className="text-2xl mb-2">{data.title}</h3>
                                            <p className="text-sm opacity-90">{data.description}</p>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Playing Game */}
                        {gameState === "playing" && (
                            <motion.div
                                key="playing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {/* Game Info */}
                                <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                                    <div className="flex items-center space-x-6">
                                        <div className="bg-yellow-400 bg-opacity-20 rounded-full px-4 py-2 flex items-center space-x-2">
                                            <Trophy className="w-5 h-5 text-yellow-300" />
                                            <span className="text-yellow-300 font-medium">Score:</span>
                                            <span className="font-bold text-xl">{score}</span>
                                        </div>
                                        <div className="bg-green-400 bg-opacity-20 rounded-full px-4 py-2 flex items-center space-x-2">
                                            <RotateCcw className="w-5 h-5 text-green-300" />
                                            <span className="text-green-300 font-medium">Moves:</span>
                                            <span className="font-bold text-xl">{moves}</span>
                                        </div>
                                        <div className="bg-blue-400 bg-opacity-20 rounded-full px-4 py-2 flex items-center space-x-2">
                                            <span className="text-blue-300 font-medium">Time:</span>
                                            <span className="font-bold text-xl">{formatTime(timer)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={resetGame}
                                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full font-bold transition-colors"
                                    >
                                        Reset Game
                                    </button>
                                </div>

                                {/* Prophet Info */}
                                {selectedProphet && (
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-yellow-300">
                                            {prophetData[selectedProphet as keyof typeof prophetData].title}
                                        </h3>
                                        <p className="text-yellow-100">
                                            {prophetData[selectedProphet as keyof typeof prophetData].description}
                                        </p>
                                    </div>
                                )}

                                {/* Cards Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                    {cards.map((card, index) => (
                                        <motion.div
                                            key={card.id}
                                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleCardClick(card.id)}
                                            className={`aspect-square cursor-pointer rounded-xl shadow-lg transition-all duration-300 ${card.isFlipped || card.isMatched
                                                ? 'bg-gradient-to-br ' + getCategoryColor(card.category)
                                                : 'bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'
                                                } ${card.isMatched ? 'ring-4 ring-yellow-400 animate-pulse' : ''}`}
                                        >
                                            <div className="w-full h-full flex items-center justify-center p-2">
                                                {card.isFlipped || card.isMatched ? (
                                                    <motion.div
                                                        initial={{ rotateY: 180, scale: 0.8 }}
                                                        animate={{ rotateY: 0, scale: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="text-center"
                                                    >
                                                        <p className="text-xs md:text-sm font-bold text-white leading-tight">
                                                            {card.content}
                                                        </p>
                                                        <p className="text-xs text-white/70 mt-1">
                                                            {card.category}
                                                        </p>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        initial={{ rotateY: 0, scale: 1 }}
                                                        animate={{ rotateY: 180, scale: 0.8 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="text-center"
                                                    >
                                                        <Star className="w-8 h-8 mx-auto text-white/50" />
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Game Completed */}
                        {gameState === "completed" && (
                            <motion.div
                                key="completed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-10"
                            >
                                <div className="mb-8">
                                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center animate-float">
                                        <Trophy className="w-16 h-16 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text">
                                    Selamat! Game Selesai!
                                </h2>
                                <p className="mb-4 text-lg text-yellow-100">
                                    Kamu telah menyelesaikan permainan memori tentang {prophetData[selectedProphet as keyof typeof prophetData]?.title}!
                                </p>
                                <div className="mb-6">
                                    {score === cards.length * 10 ? (
                                        <p className="text-xl text-yellow-300 font-bold">🌟 Sempurna! Kamu luar biasa! 🌟</p>
                                    ) : score >= (cards.length * 10) * 0.8 ? (
                                        <p className="text-xl text-green-300 font-bold">✨ Hebat! Hasil yang sangat bagus! ✨</p>
                                    ) : score >= (cards.length * 10) * 0.6 ? (
                                        <p className="text-xl text-blue-300 font-bold">💫 Bagus! Terus berlatih! 💫</p>
                                    ) : (
                                        <p className="text-xl text-orange-300 font-bold">💪 Semangat! Coba lagi untuk hasil yang lebih baik! 💪</p>
                                    )}
                                </div>
                                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md mx-auto">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-yellow-300">{score}</p>
                                            <p className="text-sm text-yellow-100">Score</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-green-300">{moves}</p>
                                            <p className="text-sm text-green-100">Moves</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-blue-300">{formatTime(timer)}</p>
                                            <p className="text-sm text-blue-100">Time</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-purple-300">{cards.length > 0 ? Math.round((score / (cards.length * 10)) * 100) : 0}%</p>
                                            <p className="text-sm text-purple-100">Accuracy</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <button
                                        onClick={resetGame}
                                        className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105"
                                    >
                                        Main Lagi
                                    </button>
                                    <button
                                        onClick={() => setGameState("welcome")}
                                        className="block mx-auto bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600 px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105"
                                    >
                                        Pilih Nabi Lain
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Custom animations */}
            <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    )
}
