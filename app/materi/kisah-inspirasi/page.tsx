"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const prophets = [
  {
    name: "NABI AYYUB A.S",
    subtitle: "Kisah Kesabaran",
    image: "/images/kisah-ayyub.jpg",
    link: "/materi/kisah-inspirasi/ayyub",
    bgColor: "bg-white",
    bookColor: "bg-green-500"
  },
  {
    name: "NABI HARUN A.S",
    subtitle: "Kisah Persaudaraan",
    image: "/images/kisah-harun.jpg",
    link: "/materi/kisah-inspirasi/harun",
    bgColor: "bg-[#E8FFF1]",
    bookColor: "bg-blue-500"
  },
  {
    name: "NABI MUSA A.S",
    subtitle: "Kisah Keberanian",
    image: "/images/kisah-musa.jpg",
    link: "/materi/kisah-inspirasi/musa",
    bgColor: "bg-[#FFF8E7]",
    bookColor: "bg-orange-500"
  },
  {
    name: "NABI SULAIMAN A.S",
    subtitle: "Kebijaksanaan",
    image: "/images/kisah-sulaiman.jpg",
    link: "/materi/kisah-inspirasi/sulaiman",
    bgColor: "bg-[#FFE8F7]",
    bookColor: "bg-red-500"
  }
]

export default function KisahInspirasiPage() {
  const [userData, setUserData] = useState({ nama: "", sekolah: "" })
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F3FF] to-[#F5F9FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Back Button - Only visible on desktop */}
        <div className="hidden md:block mb-6">
          <Link
            href="/page"
            className="inline-flex items-center gap-2 px-4 py-2 text-[#1E3A8A] hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </Link>
        </div>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto">
          {/* Logo */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-white rounded-3xl shadow-md flex items-center justify-center">
            <Image
              src="/images/benara-logo.png"
              alt="Benara Kids Logo"
              width={48}
              height={48}
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#1E3A8A] mb-2 flex items-center justify-center gap-2">
              <span className="text-xl sm:text-2xl">⭐</span>
              Kisah Nabi untuk Anak Sholeh
              <span className="text-xl sm:text-2xl">⭐</span>
            </h1>
            <p className="text-base sm:text-lg text-[#1E3A8A]">
              Mari Belajar dari Kisah Para Nabi
            </p>
          </div>

          {/* Prophet Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
            {prophets.map((prophet) => (
              <Link
                key={prophet.name}
                href={prophet.link}
                className={`block p-3 sm:p-4 rounded-3xl shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${prophet.bgColor}`}
              >
                {/* Image */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3">
                  <Image
                    src={prophet.image}
                    alt={prophet.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 250px"
                  />
                </div>

                {/* Text Content */}
                <div className="text-center">
                  <h2 className="text-[#1E3A8A] font-bold text-xs sm:text-sm md:text-base mb-1 line-clamp-1">
                    {prophet.name}
                  </h2>
                  <div className="flex justify-center">
                    <div className={`w-4 sm:w-6 h-1 sm:h-1.5 rounded-full ${prophet.bookColor}`} />
                  </div>
                  <p className="text-[#1E3A8A] text-xs sm:text-sm mt-1 line-clamp-1">
                    {prophet.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Home Indicator */}
          <div className="mt-8 md:mt-12 flex justify-center">
            <div className="w-24 sm:w-32 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
