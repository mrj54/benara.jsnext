"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Moon, Sun } from "lucide-react"

export default function KisahIbrahimPage() {
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
            content: `Nabi Ibrahim AS lahir di tengah masyarakat yang menyembah berhala. Sejak kecil, beliau sudah mempertanyakan mengapa orang-orang menyembah patung yang tidak bisa berbuat apa-apa.

Ibrahim muda sering mengamati bintang, bulan, dan matahari. Ia menyadari bahwa semua itu tidak layak disembah karena ada yang menciptakan mereka, yaitu Allah SWT.`
        },
        {
            id: 2,
            title: "Chapter 2",
            content: `Suatu hari, ketika orang-orang sedang pergi ke luar kota untuk sebuah perayaan, Ibrahim menghancurkan semua berhala di kuil kecuali yang terbesar. Ketika orang-orang kembali dan bertanya siapa yang melakukannya, Ibrahim menjawab dengan cerdas.

"Tanyakan saja pada berhala yang besar itu. Jika mereka bisa berbicara, mereka akan memberitahu siapa yang melakukannya." Jawaban ini membuat mereka sadar bahwa berhala-berhala itu tidak bisa berbuat apa-apa.`
        },
        {
            id: 3,
            title: "Chapter 3",
            content: `Raja Namrud sangat marah mendengar Ibrahim mengajak orang-orang menyembah Allah. Ia memerintahkan untuk membakar Ibrahim hidup-hidup dalam api yang sangat besar.

Namun Allah melindungi Ibrahim. Api yang panas itu menjadi dingin dan tidak membakarnya. Ini adalah mukjizat yang menunjukkan kekuasaan Allah.`
        },
        {
            id: 4,
            title: "Chapter 4",
            content: `Allah menguji keimanan Ibrahim dengan memerintahkannya untuk menyembelih putranya, Ismail. Dengan keimanan yang kuat, Ibrahim dan Ismail siap melaksanakan perintah Allah.

Ketika Ibrahim hendak menyembelih Ismail, Allah menggantinya dengan seekor domba. Ini menunjukkan bahwa Ibrahim dan Ismail lulus ujian keimanan.

Hikmah dari kisah Nabi Ibrahim:
• Berani membela kebenaran
• Yakin pada kekuasaan Allah
• Taat pada perintah Allah
• Menggunakan akal untuk mencari kebenaran
• Sabar dalam menghadapi ujian`
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
                            src="/images/kisah-ibrahim.jpg"
                            alt="Kisah Nabi Ibrahim"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Kisah Nabi Ibrahim
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