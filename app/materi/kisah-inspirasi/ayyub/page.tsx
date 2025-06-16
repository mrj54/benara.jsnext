"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Moon, Sun } from "lucide-react"

export default function KisahAyyubPage() {
  const [userData, setUserData] = useState({
    nama: "",
    sekolah: "",
  })
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeChapter, setActiveChapter] = useState<number | null>(null)
  const router = useRouter()

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

  const chapters = [
    {
      id: 1,
      title: "Chapter 1",
      content: `Nabi Ayyub AS adalah seorang yang kaya raya dan memiliki banyak ternak, tanah yang luas, serta keluarga yang besar. Beliau selalu bersyukur atas nikmat yang diberikan Allah SWT dan selalu berbagi dengan orang-orang yang membutuhkan.

Suatu hari, Allah SWT menguji keimanan Nabi Ayyub dengan berbagai cobaan. Pertama, seluruh harta kekayaannya hilang. Kemudian, anak-anaknya meninggal dunia. Meskipun demikian, Nabi Ayyub tetap bersabar dan beriman kepada Allah SWT.`
    },
    {
      id: 2,
      title: "Chapter 2",
      content: `Ujian terberat datang ketika Nabi Ayyub diberikan penyakit kulit yang sangat parah. Tubuhnya dipenuhi luka dan borok yang menyakitkan. Kondisi ini berlangsung selama bertahun-tahun. Semua orang menjauhinya kecuali istrinya yang setia, Rahmah.

Meskipun dalam kondisi yang sangat menderita, Nabi Ayyub tidak pernah mengeluh atau mempertanyakan takdir Allah SWT. Beliau terus beribadah dan berdoa dengan penuh kesabaran.`
    },
    {
      id: 3,
      title: "Chapter 3",
      content: `Setelah bertahun-tahun menderita, Nabi Ayyub akhirnya berdoa kepada Allah SWT:

"Ya Tuhanku, sesungguhnya aku telah ditimpa penyakit dan Engkau adalah Tuhan Yang Maha Penyayang di antara semua penyayang."

Allah SWT mengabulkan doa Nabi Ayyub. Allah memerintahkan beliau untuk menghentakkan kakinya ke tanah. Ketika Nabi Ayyub melakukannya, muncullah mata air yang sejuk.`
    },
    {
      id: 4,
      title: "Chapter 4",
      content: `Allah memerintahkan Nabi Ayyub untuk mandi dan minum dari air tersebut. Seketika itu juga, seluruh penyakit di tubuhnya sembuh.

Allah SWT kemudian mengembalikan keluarga dan harta Nabi Ayyub, bahkan lebih banyak dari sebelumnya. Kisah Nabi Ayyub mengajarkan kita tentang nilai kesabaran dalam menghadapi ujian hidup dan tetap beriman kepada Allah SWT dalam kondisi apapun.

Hikmah dari kisah Nabi Ayyub:
• Kesabaran adalah kunci dalam menghadapi ujian hidup
• Tetap bersyukur dalam kondisi apapun
• Allah SWT selalu bersama orang-orang yang sabar
• Setelah kesulitan pasti ada kemudahan`
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
              src="/images/kisah-ayyub.jpg"
              alt="Kisah Nabi Ayyub"
              fill
              className="object-cover"
            />
          </div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Kisah Nabi Ayyub
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
