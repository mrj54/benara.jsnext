"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"

export default function KisahInspirasiPage() {
  const [userData, setUserData] = useState({
    nama: "",
    sekolah: "",
  })
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

  const stories = [
    {
      id: "ayyub",
      title: "NABI AYYUB A.S",
      image: "/images/kisah-ayyub.jpg",
      gradient: "from-blue-50 to-blue-100",
      hoverGradient: "hover:from-blue-100 hover:to-blue-200",
      emoji: "📗",
      desc: "Kisah Kesabaran",
      link: "/materi/kisah-inspirasi/ayyub",
    },
    {
      id: "harun",
      title: "NABI HARUN A.S",
      image: "/images/kisah-harun.jpg",
      gradient: "from-emerald-50 to-emerald-100",
      hoverGradient: "hover:from-emerald-100 hover:to-emerald-200",
      emoji: "📘",
      desc: "Kisah Persaudaraan",
      link: "/materi/kisah-inspirasi/harun",
    },
    {
      id: "musa",
      title: "NABI MUSA A.S",
      image: "/images/kisah-musa.jpg",
      gradient: "from-amber-50 to-amber-100",
      hoverGradient: "hover:from-amber-100 hover:to-amber-200",
      emoji: "📙",
      desc: "Kisah Keberanian",
      link: "/materi/kisah-inspirasi/musa",
    },
    {
      id: "sulaiman",
      title: "NABI SULAIMAN A.S",
      image: "/images/kisah-sulaiman.jpg",
      gradient: "from-violet-50 to-violet-100",
      hoverGradient: "hover:from-violet-100 hover:to-violet-200",
      emoji: "📕",
      desc: "Kebijaksanaan",
      link: "/materi/kisah-inspirasi/sulaiman",
    },
    {
      id: "ibrahim",
      title: "NABI IBRAHIM A.S",
      image: "/images/kisah-ibrahim.jpg",
      gradient: "from-rose-50 to-rose-100",
      hoverGradient: "hover:from-rose-100 hover:to-rose-200",
      emoji: "📚",
      desc: "Kisah Keimanan",
      link: "/materi/kisah-inspirasi/ibrahim",
    },
    {
      id: "yusuf",
      title: "NABI YUSUF A.S",
      image: "/images/kisah-yusuf.jpg",
      gradient: "from-cyan-50 to-cyan-100",
      hoverGradient: "hover:from-cyan-100 hover:to-cyan-200",
      emoji: "📔",
      desc: "Kisah Kesabaran",
      link: "/materi/kisah-inspirasi/yusuf",
    },
    {
      id: "yunus",
      title: "NABI YUNUS A.S",
      image: "/images/kisah-yunus.jpg",
      gradient: "from-indigo-50 to-indigo-100",
      hoverGradient: "hover:from-indigo-100 hover:to-indigo-200",
      emoji: "📘",
      desc: "Kisah Pertobatan",
      link: "/materi/kisah-inspirasi/yunus",
    },
    {
      id: "daud",
      title: "NABI DAUD A.S",
      image: "/images/kisah-daud.jpg",
      gradient: "from-teal-50 to-teal-100",
      hoverGradient: "hover:from-teal-100 hover:to-teal-200",
      emoji: "📗",
      desc: "Kisah Kepemimpinan",
      link: "/materi/kisah-inspirasi/daud",
    },
  ]

  return (
    <div className="gradient-bg min-h-screen flex flex-col font-['Quicksand',sans-serif]">
      <div className="screen-container p-3 md:p-6">
        {/* Back button */}
        <div className="mb-4">
          <Link
            href="/page"
            className="inline-flex items-center gap-2 bg-white/80 hover:bg-white transition-colors px-4 py-2 rounded-full text-blue-600 shadow-md"
          >
            <ArrowLeft size={18} />
            <span>Kembali</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-2 md:mb-6 flex-none">
          <div className="inline-block">
            <div className="bg-white rounded-2xl p-2 md:p-4 shadow-xl floating-animation">
              <div className="relative mobile-logo w-12 h-12 md:w-20 md:h-20 mx-auto">
                <Image
                  src="/images/benara-logo.svg"
                  alt="Benara Kids Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 48px, 80px"
                />
              </div>
            </div>
          </div>
          <h1 className="mobile-header text-xl md:text-4xl font-bold text-blue-900 mt-2 mb-1">
            ⭐ Kisah Nabi untuk Anak Sholeh ⭐
          </h1>
          <p className="mobile-subheader text-sm md:text-lg text-blue-700 font-medium">
            Mari Belajar dari Kisah Para Nabi
          </p>
        </div>

        {/* Stories Grid */}
        <div className="flex-grow flex items-center justify-center px-2 md:px-4 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-6xl mx-auto">
            {stories.map((story, index) => (
              <div
                key={story.id}
                className="opacity-0 transform translate-y-8 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link
                  href={story.link}
                  className={`card-hover w-full bg-gradient-to-br ${story.gradient} ${story.hoverGradient} 
                             rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col items-center gap-2 md:gap-3 shadow-lg`}
                >
                  <div className="relative group">
                    <div
                      className="absolute inset-0 bg-white rounded-lg md:rounded-xl transform rotate-6 opacity-0 
                                  group-hover:opacity-100 transition-all duration-300"
                    ></div>
                    <div className="mobile-card-image relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-lg md:rounded-xl overflow-hidden z-10">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 112px"
                      />
                    </div>
                  </div>
                  <div className="text-center space-y-1 md:space-y-2">
                    <h2 className="mobile-card-title text-xs sm:text-sm md:text-lg font-bold text-blue-900 line-clamp-1">
                      {story.title}
                    </h2>
                    <p className="mobile-card-desc text-xs md:text-sm text-blue-700">
                      <span className="text-sm md:text-lg mr-1">{story.emoji}</span>
                      <span className="line-clamp-1">{story.desc}</span>
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Home Button */}
        <div className="flex-none text-center pb-2 md:pb-4 pt-2">
          <Link href="/page" className="inline-block">
            <button className="bg-white p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <Home className="w-6 h-6 md:w-7 md:h-7 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
