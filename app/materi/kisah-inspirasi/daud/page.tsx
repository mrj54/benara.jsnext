"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Moon, Sun } from "lucide-react"

export default function KisahDaudPage() {
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
            content: `Nabi Daud AS adalah seorang pemuda yang berani. Ketika tentara Raja Thalut berhadapan dengan tentara Jalut, Daud maju untuk melawan Jalut yang terkenal sangat kuat dan kejam.

Meski masih muda dan bertubuh kecil, Daud tidak takut. Ia yakin Allah akan menolongnya. Dengan hanya menggunakan ketapel dan batu kecil, Daud berhasil mengalahkan Jalut.`
        },
        {
            id: 2,
            title: "Chapter 2",
            content: `Allah menganugerahi Nabi Daud dengan suara yang sangat indah. Ketika beliau membaca Zabur dan bertasbih, gunung-gunung dan burung-burung ikut bertasbih bersamanya.

Allah juga memberi Nabi Daud kemampuan untuk melunakkan besi dengan tangannya. Beliau bisa membuat baju besi dan peralatan perang tanpa perlu memanaskan besi terlebih dahulu.`
        },
        {
            id: 3,
            title: "Chapter 3",
            content: `Nabi Daud kemudian menjadi raja yang adil dan bijaksana. Beliau selalu memutuskan perkara dengan adil dan mengajarkan kebaikan kepada rakyatnya.

Suatu hari, dua orang datang mengadu kepada Nabi Daud. Dengan kebijaksanaannya, beliau bisa menyelesaikan perselisihan mereka dengan cara yang adil dan damai.`
        },
        {
            id: 4,
            title: "Chapter 4",
            content: `Nabi Daud mengajarkan kepada kita bahwa seorang pemimpin harus adil dan bijaksana. Beliau juga mengajarkan untuk selalu bersyukur atas nikmat Allah dengan cara bertasbih dan beribadah.

Hikmah dari kisah Nabi Daud:
• Berani membela kebenaran
• Yakin pada pertolongan Allah
• Menggunakan kelebihan untuk kebaikan
• Adil dalam memimpin
• Selalu bersyukur kepada Allah
• Rajin beribadah dan bertasbih`
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
                            src="/images/kisah-daud.jpg"
                            alt="Kisah Nabi Daud"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Kisah Nabi Daud
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