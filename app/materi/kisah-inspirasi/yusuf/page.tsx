"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Moon, Sun } from "lucide-react"

export default function KisahYusufPage() {
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
            content: `Nabi Yusuf AS adalah putra Nabi Yakub AS. Sejak kecil, ia mendapat mimpi yang istimewa. Dalam mimpinya, ia melihat sebelas bintang, matahari, dan bulan bersujud kepadanya.

Yusuf sangat dicintai oleh ayahnya karena kebaikan hatinya. Namun, hal ini membuat saudara-saudaranya iri. Mereka merencanakan sesuatu yang jahat terhadap Yusuf.`
        },
        {
            id: 2,
            title: "Chapter 2",
            content: `Saudara-saudara Yusuf meminta izin kepada ayah mereka untuk mengajak Yusuf bermain. Setelah mendapat izin, mereka memasukkan Yusuf ke dalam sumur dan pulang dengan membawa baju Yusuf yang dilumuri darah palsu.

Mereka berbohong kepada ayah mereka bahwa Yusuf dimakan serigala. Nabi Yakub sangat sedih, tetapi tetap bersabar dan berserah diri kepada Allah.`
        },
        {
            id: 3,
            title: "Chapter 3",
            content: `Yusuf kemudian diselamatkan oleh kafilah yang menemukan dia di sumur. Mereka menjualnya sebagai budak di Mesir. Di sana, Yusuf dibeli oleh seorang pejabat tinggi dan tinggal di rumahnya.

Yusuf tumbuh menjadi pemuda yang tampan dan bijaksana. Allah memberinya kemampuan untuk menafsirkan mimpi. Kemampuan ini kelak akan sangat berguna bagi Mesir.`
        },
        {
            id: 4,
            title: "Chapter 4",
            content: `Setelah mengalami berbagai cobaan, termasuk fitnah dan penjara, Yusuf akhirnya menjadi bendahara Mesir. Ia menyelamatkan Mesir dari bencana kelaparan dengan kebijaksanaannya dalam menafsirkan mimpi raja.

Akhirnya, Yusuf bertemu kembali dengan saudara-saudaranya yang datang ke Mesir mencari makanan. Ia memaafkan mereka dan mengundang seluruh keluarganya tinggal di Mesir.

Hikmah dari kisah Nabi Yusuf:
• Sabar dalam menghadapi cobaan
• Memaafkan kesalahan orang lain
• Tetap berbuat baik meski diperlakukan buruk
• Allah selalu menolong orang yang sabar
• Kebaikan akan menang atas kejahatan`
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
                            src="/images/kisah-yusuf.jpg"
                            alt="Kisah Nabi Yusuf"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Kisah Nabi Yusuf
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