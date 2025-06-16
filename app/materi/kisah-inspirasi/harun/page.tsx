"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Moon, Sun } from "lucide-react"

export default function KisahHarunPage() {
    const [userData, setUserData] = useState({ nama: "", sekolah: "" })
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [activeChapter, setActiveChapter] = useState<number | null>(null)
    const router = useRouter()

    useEffect(() => {
        const nama = localStorage.getItem("nama")
        const sekolah = localStorage.getItem("sekolah")
        if (!nama || !sekolah) {
            router.push("/")
            return
        }
        setUserData({ nama, sekolah })
    }, [router])

    const chapters = [
        {
            id: 1,
            title: "Chapter 1",
            content: `Nabi Harun AS adalah saudara kandung Nabi Musa AS. Beliau dikenal sebagai sosok yang lemah lembut dan pandai berbicara. Allah SWT mengutus Nabi Harun untuk mendampingi Nabi Musa dalam berdakwah kepada Firaun.

Nabi Harun memiliki kemampuan berbicara yang lebih baik dari Nabi Musa. Itulah sebabnya Allah memerintahkan Nabi Harun untuk membantu saudaranya dalam menyampaikan risalah kepada Firaun dan kaumnya.`
        },
        {
            id: 2,
            title: "Chapter 2",
            content: `Ketika Nabi Musa pergi ke Bukit Sinai untuk bermunajat kepada Allah selama 40 hari, Nabi Harun ditugaskan untuk memimpin dan menjaga Bani Israil.

Pada masa itu, ada seseorang bernama Samiri yang menghasut Bani Israil untuk membuat patung anak sapi dari emas untuk disembah. Nabi Harun berusaha mencegah mereka dengan cara yang lemah lembut, namun mereka tetap keras kepala.`
        },
        {
            id: 3,
            title: "Chapter 3",
            content: `Nabi Harun terus menasihati kaumnya dengan sabar dan lemah lembut, mengingatkan mereka bahwa menyembah selain Allah adalah perbuatan yang sesat.

"Wahai kaumku, sesungguhnya kamu hanya diberi cobaan dengan (patung) anak sapi itu. Dan sesungguhnya Tuhanmu adalah (Allah) Yang Maha Pengasih, maka ikutilah aku dan taatilah perintahku." (QS. Thaha: 90)`
        },
        {
            id: 4,
            title: "Chapter 4",
            content: `Ketika Nabi Musa kembali dan marah melihat kaumnya menyembah patung anak sapi, beliau memarahi Nabi Harun. Namun Nabi Harun menjelaskan bahwa ia telah berusaha mencegah mereka dengan cara yang baik.

Hikmah dari kisah Nabi Harun:
• Pentingnya kelembutan dalam berdakwah
• Sabar dalam menghadapi kekerasan hati
• Setia membantu saudara dalam kebaikan
• Bijaksana dalam menasihati orang lain
• Teguh dalam menjaga amanah`
        }
    ]

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <div className="max-w-4xl mx-auto p-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <Link
                        href="/materi/kisah-inspirasi"
                        className={`inline-flex items-center gap-2 ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-700'
                            }`}
                    >
                        <ArrowLeft size={24} />
                        <span className="font-medium">Kembali</span>
                    </Link>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-500' : 'bg-gray-100 text-gray-900'
                            }`}
                    >
                        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                </div>

                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        KISAH INSPIRASI ANAK
                    </h1>
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4">
                        <Image
                            src="/images/kisah-harun.jpg"
                            alt="Kisah Nabi Harun"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Kisah Nabi Harun
                    </h2>
                </div>

                {/* Chapters */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    {chapters.map((chapter) => (
                        <button
                            key={chapter.id}
                            onClick={() => setActiveChapter(chapter.id)}
                            className={`p-4 rounded-xl text-center font-semibold transition-all ${isDarkMode
                                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                                }`}
                        >
                            {chapter.title}
                        </button>
                    ))}
                </div>

                {/* Chapter Content Modal */}
                {activeChapter && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div
                            className={`relative w-full max-w-2xl rounded-2xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                                }`}
                        >
                            <button
                                onClick={() => setActiveChapter(null)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                <ArrowLeft size={24} />
                            </button>
                            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {chapters[activeChapter - 1].title}
                            </h3>
                            <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
                                {chapters[activeChapter - 1].content.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 