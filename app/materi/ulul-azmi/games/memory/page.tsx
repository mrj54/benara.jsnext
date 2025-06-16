"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Card {
    id: number
    image: string
    name: string
    isFlipped: boolean
    isMatched: boolean
}

const cardData = [
    { id: 1, image: '/images/ulul-azmi/memory/nuh.jpg', name: 'Nabi Nuh' },
    { id: 2, image: '/images/ulul-azmi/memory/ibrahim.jpg', name: 'Nabi Ibrahim' },
    { id: 3, image: '/images/ulul-azmi/memory/musa.jpg', name: 'Nabi Musa' },
    { id: 4, image: '/images/ulul-azmi/memory/isa.jpg', name: 'Nabi Isa' },
    { id: 5, image: '/images/ulul-azmi/memory/muhammad.jpg', name: 'Nabi Muhammad' },
    { id: 6, image: '/images/ulul-azmi/memory/nuh.jpg', name: 'Nabi Nuh' },
    { id: 7, image: '/images/ulul-azmi/memory/ibrahim.jpg', name: 'Nabi Ibrahim' },
    { id: 8, image: '/images/ulul-azmi/memory/musa.jpg', name: 'Nabi Musa' },
    { id: 9, image: '/images/ulul-azmi/memory/isa.jpg', name: 'Nabi Isa' },
    { id: 10, image: '/images/ulul-azmi/memory/muhammad.jpg', name: 'Nabi Muhammad' }
]

export default function MemoryGame() {
    const [cards, setCards] = useState<Card[]>([])
    const [flippedCards, setFlippedCards] = useState<number[]>([])
    const [moves, setMoves] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        initializeGame()
    }, [])

    const initializeGame = () => {
        // Shuffle cards
        const shuffledCards = [...cardData]
            .sort(() => Math.random() - 0.5)
            .map(card => ({
                ...card,
                isFlipped: false,
                isMatched: false
            }))

        setCards(shuffledCards)
        setFlippedCards([])
        setMoves(0)
        setIsComplete(false)
    }

    const handleCardClick = (clickedId: number) => {
        // Ignore if card is already flipped or matched
        if (
            cards[clickedId].isFlipped ||
            cards[clickedId].isMatched ||
            flippedCards.length === 2
        ) {
            return
        }

        // Flip the card
        const newCards = [...cards]
        newCards[clickedId].isFlipped = true
        setCards(newCards)

        // Add to flipped cards
        const newFlippedCards = [...flippedCards, clickedId]
        setFlippedCards(newFlippedCards)

        // If we have 2 cards flipped, check for match
        if (newFlippedCards.length === 2) {
            setMoves(moves + 1)
            const [firstId, secondId] = newFlippedCards

            if (cards[firstId].name === cards[secondId].name) {
                // Match found
                newCards[firstId].isMatched = true
                newCards[secondId].isMatched = true
                setCards(newCards)
                setFlippedCards([])

                // Check if game is complete
                if (newCards.every(card => card.isMatched)) {
                    setIsComplete(true)
                }
            } else {
                // No match, flip cards back
                setTimeout(() => {
                    newCards[firstId].isFlipped = false
                    newCards[secondId].isFlipped = false
                    setCards(newCards)
                    setFlippedCards([])
                }, 1000)
            }
        }
    }

    return (
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-[#2B4F60] mb-8">
                    Memory Game Nabi Ulul Azmi
                </h1>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-4 text-center">
                        <p className="text-gray-600">Langkah: {moves}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                        {cards.map((card, index) => (
                            <div
                                key={card.id}
                                onClick={() => handleCardClick(index)}
                                className={`aspect-[3/4] relative rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 ${card.isFlipped ? 'rotate-y-180' : ''
                                    }`}
                            >
                                <div
                                    className={`absolute inset-0 w-full h-full transition-all duration-300 ${card.isFlipped ? 'opacity-0' : 'opacity-100'
                                        }`}
                                >
                                    {/* Card Back */}
                                    <div className="w-full h-full bg-[#2B4F60] flex items-center justify-center">
                                        <Image
                                            src="/images/benara-logo.png"
                                            alt="Card back"
                                            width={60}
                                            height={60}
                                            className="w-16 h-16"
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`absolute inset-0 w-full h-full transition-all duration-300 ${card.isFlipped ? 'opacity-100' : 'opacity-0'
                                        }`}
                                >
                                    {/* Card Front */}
                                    <Image
                                        src={card.image}
                                        alt={card.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center text-sm">
                                        {card.name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {isComplete && (
                        <div className="text-center mb-4">
                            <p className="text-green-600 font-bold mb-2">
                                Selamat! Kamu berhasil menyelesaikan game dengan {moves} langkah!
                            </p>
                            <button
                                onClick={initializeGame}
                                className="px-6 py-2 bg-[#FFA07A] text-white rounded-full hover:bg-[#ff8c5a] transition-all"
                            >
                                Main Lagi
                            </button>
                        </div>
                    )}

                    {!isComplete && (
                        <div className="text-center">
                            <button
                                onClick={initializeGame}
                                className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all"
                            >
                                Mulai Ulang
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
        </div>
    )
} 