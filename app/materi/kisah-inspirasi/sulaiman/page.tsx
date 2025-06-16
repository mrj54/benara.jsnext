"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Moon, Sun } from "lucide-react"

export default function KisahSulaimanPage() {
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
            content: `Nabi Sulaiman AS adalah putra Nabi Daud AS. Allah SWT memberinya kerajaan yang sangat besar dan kekuatan yang luar biasa. Beliau bisa berbicara dengan hewan, mengendalikan angin, dan memahami bahasa jin.

Meski memiliki kekuasaan yang besar, Nabi Sulaiman tetap rendah hati dan selalu bersyukur kepada Allah. Beliau menggunakan kemampuannya untuk menegakkan keadilan dan menyebarkan kebaikan.`
        },
        {
            id: 2,
            title: "Chapter 2",
            content: `Suatu hari, Nabi Sulaiman memeriksa pasukannya yang terdiri dari manusia, jin, dan burung-burung. Beliau menyadari burung Hud-hud tidak hadir. Tak lama kemudian, Hud-hud datang membawa berita tentang Ratu Balqis dari negeri Saba.

Hud-hud menceritakan bahwa Ratu Balqis dan rakyatnya menyembah matahari. Nabi Sulaiman kemudian mengirim surat mengajak mereka untuk beriman kepada Allah.`
        },
        {
            id: 3,
            title: "Chapter 3",
            content: `Ratu Balqis adalah pemimpin yang bijaksana. Ia mengadakan musyawarah dengan para pembesar kerajaan untuk membahas surat Nabi Sulaiman. Ia memutuskan untuk mengirim hadiah untuk menguji Nabi Sulaiman.

Nabi Sulaiman menolak hadiah tersebut dan menegaskan bahwa ia hanya mengajak kepada kebenaran. Ratu Balqis terkesan dengan sikap Nabi Sulaiman dan memutuskan untuk mengunjunginya.`
        },
        {
            id: 4,
            title: "Chapter 4",
            content: `Nabi Sulaiman meminta jin untuk memindahkan singgasana Ratu Balqis ke istananya sebelum kedatangannya. Ketika Ratu Balqis tiba, ia terkejut melihat singgasananya dan kagum dengan kebesaran kekuasaan Allah.

Ratu Balqis akhirnya beriman kepada Allah setelah melihat bukti-bukti kebesaran-Nya. Kisah Nabi Sulaiman mengajarkan:
• Gunakan kelebihan untuk kebaikan
• Tetap rendah hati meski memiliki kekuasaan
• Bijaksana dalam mengambil keputusan
• Mengajak orang lain kepada kebenaran dengan cara yang baik`
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
                            src="/images/kisah-sulaiman.jpg"
                            alt="Kisah Nabi Sulaiman"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Kisah Nabi Sulaiman
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