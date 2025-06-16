"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface PuzzlePiece {
    id: number
    currentPosition: number
    correctPosition: number
    image: string
}

const puzzleImages = [
    '/images/ulul-azmi/puzzle/nuh.jpg',
    '/images/ulul-azmi/puzzle/ibrahim.jpg',
    '/images/ulul-azmi/puzzle/musa.jpg',
    '/images/ulul-azmi/puzzle/isa.jpg',
    '/images/ulul-azmi/puzzle/muhammad.jpg'
]

export default function PuzzleGame() {
    const [currentImage, setCurrentImage] = useState(0)
    const [pieces, setPieces] = useState<PuzzlePiece[]>([])
    const [isComplete, setIsComplete] = useState(false)
    const [moves, setMoves] = useState(0)

    const createPuzzle = (imageIndex: number) => {
        const newPieces: PuzzlePiece[] = []
        for (let i = 0; i < 9; i++) {
            newPieces.push({
                id: i,
                currentPosition: i,
                correctPosition: i,
                image: puzzleImages[imageIndex]
            })
        }
        // Shuffle pieces
        for (let i = newPieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = newPieces[i].currentPosition
            newPieces[i].currentPosition = newPieces[j].currentPosition
            newPieces[j].currentPosition = temp
        }
        setPieces(newPieces)
        setMoves(0)
        setIsComplete(false)
    }

    useEffect(() => {
        createPuzzle(currentImage)
    }, [currentImage])

    const handlePieceClick = (clickedPosition: number) => {
        const newPieces = [...pieces]
        const emptyPiece = newPieces.find(p => p.currentPosition === 8)
        const clickedPiece = newPieces.find(p => p.currentPosition === clickedPosition)

        if (!emptyPiece || !clickedPiece) return

        // Check if piece is adjacent to empty space
        const isAdjacent = (
            Math.abs(clickedPosition % 3 - 8 % 3) +
            Math.abs(Math.floor(clickedPosition / 3) - Math.floor(8 / 3))
        ) === 1

        if (isAdjacent) {
            // Swap positions
            const tempPos = emptyPiece.currentPosition
            emptyPiece.currentPosition = clickedPiece.currentPosition
            clickedPiece.currentPosition = tempPos
            setPieces(newPieces)
            setMoves(moves + 1)

            // Check if puzzle is complete
            const isComplete = newPieces.every(piece => piece.currentPosition === piece.correctPosition)
            setIsComplete(isComplete)
        }
    }

    const nextPuzzle = () => {
        setCurrentImage((prev) => (prev + 1) % puzzleImages.length)
    }

    return (
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="max-w-lg mx-auto">
                <h1 className="text-3xl font-bold text-center text-[#2B4F60] mb-8">
                    Puzzle Nabi Ulul Azmi
                </h1>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-4 text-center">
                        <p className="text-gray-600">Langkah: {moves}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-1 bg-gray-200 p-1 rounded-lg mb-4">
                        {pieces.map((piece) => (
                            <div
                                key={piece.id}
                                onClick={() => handlePieceClick(piece.currentPosition)}
                                className={`aspect-square relative overflow-hidden ${piece.currentPosition === 8 ? 'bg-gray-300' : 'cursor-pointer hover:opacity-90'
                                    }`}
                            >
                                {piece.currentPosition !== 8 && (
                                    <div className="w-full h-full relative">
                                        <Image
                                            src={piece.image}
                                            alt={`Puzzle piece ${piece.id + 1}`}
                                            fill
                                            className="object-cover"
                                            style={{
                                                objectPosition: `${(piece.id % 3) * -100}% ${Math.floor(piece.id / 3) * -100}%`
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {isComplete && (
                        <div className="text-center mb-4">
                            <p className="text-green-600 font-bold mb-2">Selamat! Puzzle selesai!</p>
                            <button
                                onClick={nextPuzzle}
                                className="px-6 py-2 bg-[#FFA07A] text-white rounded-full hover:bg-[#ff8c5a] transition-all"
                            >
                                Puzzle Selanjutnya
                            </button>
                        </div>
                    )}

                    <div className="text-center">
                        <button
                            onClick={() => createPuzzle(currentImage)}
                            className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all"
                        >
                            Acak Ulang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 