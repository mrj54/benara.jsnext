"use client"

import Link from 'next/link'
import Image from 'next/image'

const games = [
    {
        title: 'Kuis Seru',
        description: 'Uji pengetahuanmu tentang Nabi Ulul Azmi dengan kuis interaktif',
        image: '/images/ulul-azmi/games/quiz-thumbnail.jpg',
        link: '/materi/ulul-azmi/games/quiz'
    },
    {
        title: 'Puzzle Game',
        description: 'Susun gambar para Nabi Ulul Azmi dalam puzzle yang menantang',
        image: '/images/ulul-azmi/games/puzzle-thumbnail.jpg',
        link: '/materi/ulul-azmi/games/puzzle'
    },
    {
        title: 'Memory Game',
        description: 'Latih ingatanmu dengan mencari pasangan kartu Nabi Ulul Azmi',
        image: '/images/ulul-azmi/games/memory-thumbnail.jpg',
        link: '/materi/ulul-azmi/games/memory'
    }
]

export default function GamesPage() {
    return (
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-[#2B4F60] mb-4">
                    Games Seru Nabi Ulul Azmi
                </h1>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Belajar tentang Nabi Ulul Azmi jadi lebih menyenangkan dengan berbagai permainan interaktif.
                    Pilih game favoritmu dan mulai bermain!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {games.map((game, index) => (
                        <Link
                            key={index}
                            href={game.link}
                            className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={game.image}
                                    alt={game.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#2B4F60] mb-2 group-hover:text-[#FFA07A] transition-colors">
                                    {game.title}
                                </h3>
                                <p className="text-gray-600">
                                    {game.description}
                                </p>
                                <div className="mt-4 flex items-center text-[#FFA07A] font-medium">
                                    Main Sekarang
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/materi/ulul-azmi"
                        className="inline-flex items-center text-[#2B4F60] hover:text-[#FFA07A] transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Kembali ke Materi Ulul Azmi
                    </Link>
                </div>
            </div>
        </div>
    )
} 