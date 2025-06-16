"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Moon, Sun } from "lucide-react"

export default function KisahMusaPage() {
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
            content: `Nabi Musa AS lahir di masa Firaun yang kejam. Ketika itu, Firaun memerintahkan untuk membunuh semua bayi laki-laki dari Bani Israil. Allah SWT mengilhamkan kepada ibu Musa untuk memasukkan bayinya ke dalam peti dan menghanyutkannya di sungai Nil.

Peti tersebut ditemukan oleh istri Firaun, yang kemudian mengangkat Musa sebagai anak. Dengan perlindungan Allah, Musa tumbuh di istana Firaun, bahkan disusui oleh ibu kandungnya sendiri yang dipanggil sebagai ibu susu.`
        },
        {
            id: 2,
            title: "Chapter 2",
            content: `Setelah dewasa, Musa meninggalkan Mesir dan pergi ke Madyan. Di sana ia menikah dengan putri Nabi Syu'aib. Setelah beberapa tahun, Allah mengutusnya menjadi nabi dan memerintahkannya kembali ke Mesir untuk mengajak Firaun dan kaumnya menyembah Allah.

Allah memberi Musa dua mukjizat: tongkat yang bisa berubah menjadi ular dan tangan yang bercahaya. Bersama saudaranya, Harun, Musa menghadap Firaun dan mengajaknya beriman kepada Allah.`
        },
        {
            id: 3,
            title: "Chapter 3",
            content: `Firaun menolak dan menantang Musa. Terjadilah pertandingan antara Musa dan para penyihir Firaun. Tongkat Musa berubah menjadi ular besar dan menelan semua ular sihir. Para penyihir pun beriman kepada Allah, tetapi Firaun tetap ingkar.

Allah menurunkan berbagai azab kepada Firaun dan kaumnya: banjir, katak, kutu, darah, dan lainnya. Namun mereka tetap tidak beriman dan malah semakin memusuhi Bani Israil.`
        },
        {
            id: 4,
            title: "Chapter 4",
            content: `Akhirnya, Allah memerintahkan Musa untuk membawa Bani Israil keluar dari Mesir. Ketika sampai di tepi laut, Firaun dan pasukannya hampir mengejar mereka. Allah memerintahkan Musa memukul laut dengan tongkatnya, dan laut terbelah membentuk jalan.

Bani Israil selamat menyeberang, sedangkan Firaun dan pasukannya tenggelam saat mencoba mengejar. Kisah Nabi Musa mengajarkan:
• Yakin pada pertolongan Allah dalam setiap kesulitan
• Berani membela kebenaran meski menghadapi penguasa zalim
• Sabar dalam menghadapi cobaan dan rintangan
• Allah selalu melindungi orang-orang yang beriman`
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
                            src="/images/kisah-musa.jpg"
                            alt="Kisah Nabi Musa"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Kisah Nabi Musa
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