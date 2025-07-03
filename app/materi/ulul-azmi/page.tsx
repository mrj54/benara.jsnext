"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Home, User, Info, ArrowLeft } from "lucide-react"

export default function UlulAzmiPage() {
  const [userData, setUserData] = useState({
    nama: "",
    sekolah: "",
  })
  const bgAnimationRef = useRef<HTMLDivElement>(null)
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
    createBubbles()

    // Handle window resize for bubbles
    const handleResize = () => {
      if (bgAnimationRef.current) {
        bgAnimationRef.current.innerHTML = ""
        createBubbles()
      }
    }

    // Periodically refresh some bubbles for more dynamic effect
    const bubbleRefreshInterval = setInterval(() => {
      if (bgAnimationRef.current && bgAnimationRef.current.children.length > 15) {
        // Remove a few bubbles
        for (let i = 0; i < 5; i++) {
          if (bgAnimationRef.current.firstChild) {
            bgAnimationRef.current.removeChild(bgAnimationRef.current.firstChild)
          }
        }
        // Add new bubbles
        for (let i = 0; i < 5; i++) {
          const bubble = document.createElement("div")
          bubble.classList.add("bg-bubble")

          const size = Math.random() * 60 + 20
          bubble.style.width = `${size}px`
          bubble.style.height = `${size}px`
          bubble.style.left = `${Math.random() * 100}%`
          bubble.style.bottom = `-10%`
          bubble.style.animationDuration = `${Math.random() * 20 + 15}s`
          bubble.style.animationDelay = "0s"
          bubble.style.opacity = `${Math.random() * 0.5 + 0.1}`

          bgAnimationRef.current.appendChild(bubble)
        }
      }
    }, 5000)

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(bubbleRefreshInterval)
    }
  }, [router])

  const createBubbles = () => {
    if (!bgAnimationRef.current) return

    const bubbleCount = window.innerWidth < 640 ? 15 : 30
    bgAnimationRef.current.innerHTML = ""

    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement("div")
      bubble.classList.add("bg-bubble")

      // Create more varied bubble sizes
      const size = Math.random() * 60 + 20
      bubble.style.width = `${size}px`
      bubble.style.height = `${size}px`

      // Distribute bubbles across the entire screen
      bubble.style.left = `${Math.random() * 100}%`
      bubble.style.bottom = `${Math.random() * 100 - 20}%`

      // Add varied animation speeds and delays
      bubble.style.animationDuration = `${Math.random() * 20 + 15}s`
      bubble.style.animationDelay = `${Math.random() * 5}s`

      // Add varied opacity for depth effect
      bubble.style.opacity = `${Math.random() * 0.5 + 0.1}`

      bgAnimationRef.current.appendChild(bubble)
    }
  }

  const prophetData = [
    {
      id: "nuh",
      name: "Nabi Nuh",
      description: "Pelayaran Besar",
      image: "/images/nuh.jpg",
      link: "/materi/ulul-azmi/nuh",
    },
    {
      id: "ibrahim",
      name: "Nabi Ibrahim",
      description: "Pencari Kebenaran",
      image: "/images/ibrahim.jpeg",
      link: "/materi/ulul-azmi/ibrahim",
    },
    {
      id: "musa",
      name: "Nabi Musa",
      description: "Tongkat Ajaib",
      image: "/images/musa.jpg",
      link: "/materi/ulul-azmi/musa",
    },
    {
      id: "isa",
      name: "Nabi Isa",
      description: "Penyembuh",
      image: "/images/isa.jpg",
      link: "/materi/ulul-azmi/isa",
    },
    {
      id: "muhammad",
      name: "Nabi Muhammad",
      description: "Teladan Utama",
      image: "/images/muhammad.jpeg",
      link: "/materi/ulul-azmi/muhammad",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#667eea] to-[#764ba2] font-poppins relative overflow-x-hidden pb-20">
      {/* Background Animation */}
      <div
        className="bg-animation fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        ref={bgAnimationRef}
      ></div>

      {/* Back button */}
      <div className="container mx-auto px-4 pt-6">
        <Link
          href="/page"
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full text-white mb-6"
        >
          <ArrowLeft size={18} />
          <span>Kembali</span>
        </Link>
      </div>

      {/* Info Section about Ulul Azmi */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 border-2 border-white/30 shadow-lg overflow-hidden relative">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>

          <div className="flex flex-col md:flex-row gap-5 items-center relative z-10">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10 md:w-12 md:h-12 text-white"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>

            <div className="text-center md:text-left">
              <h2 className="font-bold text-xl md:text-2xl text-white mb-2">Apa itu Nabi Ulul Azmi?</h2>
              <p className="text-white/90 leading-relaxed">
                <span className="font-semibold text-yellow-200">Ulul Azmi</span> adalah{" "}
                <span className="bg-gradient-to-r from-pink-200 to-indigo-200 text-purple-900 px-2 rounded-md font-bold">
                  5 nabi istimewa
                </span>{" "}
                yang memiliki keteguhan hati dan kesabaran luar biasa dalam menyampaikan ajaran Allah SWT. Mereka adalah{" "}
                <span className="text-cyan-200 font-semibold">Nabi Nuh</span>,{" "}
                <span className="text-green-200 font-semibold">Nabi Ibrahim</span>,{" "}
                <span className="text-yellow-200 font-semibold">Nabi Musa</span>,{" "}
                <span className="text-indigo-200 font-semibold">Nabi Isa</span>, dan{" "}
                <span className="text-pink-200 font-semibold">Nabi Muhammad ﷺ</span>.
              </p>
            </div>
          </div>

          {/* Fun Facts - Floating Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 relative z-10">
            <div className="bg-gradient-to-br from-yellow-400/20 to-orange-400/20 backdrop-blur-md p-3 rounded-xl border border-white/30 transform hover:-translate-y-1 transition-transform">
              <h3 className="font-bold text-yellow-200 text-sm">Tahukah Kamu?</h3>
              <p className="text-white text-xs md:text-sm">
                Nabi Ulul Azmi mendapat ujian paling berat tetapi tetap sabar dan tabah!
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-md p-3 rounded-xl border border-white/30 transform hover:-translate-y-1 transition-transform">
              <h3 className="font-bold text-blue-200 text-sm">Fakta Seru!</h3>
              <p className="text-white text-xs md:text-sm">
                Mereka menerima kitab-kitab suci dan syariat baru dari Allah SWT!
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-400/20 to-teal-400/20 backdrop-blur-md p-3 rounded-xl border border-white/30 transform hover:-translate-y-1 transition-transform">
              <h3 className="font-bold text-green-200 text-sm">Wah, Hebat!</h3>
              <p className="text-white text-xs md:text-sm">
                Kisah mereka disebutkan berulang kali dalam Al-Qur'an sebagai teladan terbaik!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 flex-grow">
        <div id="mainContent">
          <div className="adventure-map grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {prophetData.map((prophet) => (
              <Link href={prophet.link} key={prophet.id}>
                <div
                  className="prophet-island p-3 sm:p-4 md:p-6 rounded-2xl text-center text-white shadow-lg hover:bg-white/20 transition-all h-[180px] sm:h-[220px] md:h-[250px] flex flex-col items-center justify-center"
                  data-prophet={prophet.id}
                >
                  <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden mb-2 sm:mb-3 md:mb-4">
                    <Image
                      src={prophet.image || "/placeholder.svg"}
                      alt={prophet.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 120px"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">{prophet.name}</h3>
                  <p className="text-xs sm:text-sm">{prophet.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
