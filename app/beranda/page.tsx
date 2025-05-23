"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, X } from "lucide-react"

export default function BerandaPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchResultsRef = useRef<HTMLDivElement>(null)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)

  // Define all available materials for search
  const materials = [
    {
      title: "Pengertian Nabi & Rasul",
      description: "Pelajari dasar-dasar tentang nabi dan rasul",
      link: "/materi/pengertian",
      keywords: ["pengertian", "nabi", "rasul", "dasar", "perbedaan"],
    },
    {
      title: "Nama-nama Nabi & Rasul",
      description: "Kenali 25 nabi yang disebutkan dalam Al-Quran",
      link: "/materi/nama-nama-nabi",
      keywords: ["nama", "nabi", "rasul", "25", "al-quran"],
    },
    {
      title: "Nabi Ulul Azmi",
      description: "Pelajari 5 nabi dengan keteguhan luar biasa",
      link: "/materi/ulul-azmi",
      keywords: ["ulul", "azmi", "nuh", "ibrahim", "musa", "isa", "muhammad"],
    },
    {
      title: "Kisah Inspirasi Nabi",
      description: "Kisah-kisah inspiratif dari kehidupan para nabi",
      link: "/materi/kisah-inspirasi",
      keywords: ["kisah", "inspirasi", "cerita", "hikmah", "teladan"],
    },
    {
      title: "Ayo Berlatih!",
      description: "Uji pengetahuanmu tentang para nabi",
      link: "/materi/quiz",
      keywords: ["quiz", "berlatih", "uji", "pengetahuan", "pertanyaan"],
    },
    // Individual prophets for more specific searches
    {
      title: "Nabi Adam",
      description: "Manusia pertama dan nabi pertama",
      link: "/materi/nama-nama-nabi",
      keywords: ["adam", "manusia pertama"],
    },
    {
      title: "Nabi Nuh",
      description: "Pembuat kapal besar",
      link: "/materi/ulul-azmi/nuh",
      keywords: ["nuh", "kapal", "banjir", "bahtera"],
    },
    {
      title: "Nabi Ibrahim",
      description: "Bapak para nabi",
      link: "/materi/ulul-azmi/ibrahim",
      keywords: ["ibrahim", "ka'bah", "bapak nabi"],
    },
    {
      title: "Nabi Musa",
      description: "Pembelah lautan",
      link: "/materi/ulul-azmi/musa",
      keywords: ["musa", "tongkat", "firaun", "laut"],
    },
    {
      title: "Nabi Isa",
      description: "Nabi dengan mukjizat menyembuhkan",
      link: "/materi/ulul-azmi/isa",
      keywords: ["isa", "yesus", "sembuh", "mukjizat"],
    },
    {
      title: "Nabi Muhammad",
      description: "Nabi terakhir dan penutup para nabi",
      link: "/materi/ulul-azmi/muhammad",
      keywords: ["muhammad", "terakhir", "penutup", "al-quran"],
    },
  ]

  useEffect(() => {
    // Check if user is logged in
    const nama = localStorage.getItem("nama")
    const sekolah = localStorage.getItem("sekolah")

    if (!nama || !sekolah) {
      router.push("/")
      return
    }
  }, [router])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // Close mobile menu if clicked outside
      if (mobileMenuOpen && !target.closest(".mobile-menu-container")) {
        setMobileMenuOpen(false)
      }

      // Close search results if clicked outside
      if (showSearchResults && !target.closest(".search-container") && !target.closest(".search-results")) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileMenuOpen, showSearchResults])

  const handleStartLearning = () => {
    router.push("/page")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // If there's only one result, navigate directly to it
      const filteredResults = getSearchResults()
      if (filteredResults.length === 1) {
        router.push(filteredResults[0].link)
        setSearchTerm("")
        setShowSearchResults(false)
      } else if (filteredResults.length > 1) {
        // If there are multiple results, show them
        setShowSearchResults(true)
      }
    }
  }

  const getSearchResults = () => {
    if (!searchTerm.trim()) return []

    const normalizedSearchTerm = searchTerm.toLowerCase().trim()

    return materials.filter((material) => {
      // Check if search term is in title
      if (material.title.toLowerCase().includes(normalizedSearchTerm)) return true

      // Check if search term is in description
      if (material.description.toLowerCase().includes(normalizedSearchTerm)) return true

      // Check if search term matches any keywords
      return material.keywords.some((keyword) => keyword.toLowerCase().includes(normalizedSearchTerm))
    })
  }

  const handleSearchItemClick = (link: string) => {
    router.push(link)
    setSearchTerm("")
    setShowSearchResults(false)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setShowSearchResults(false)
    searchInputRef.current?.focus()
  }

  return (
    <>
      <nav className="flex justify-between items-center p-4 md:p-8 bg-white shadow-md fixed w-full top-0 z-[1000]">
        <div className="flex items-center gap-2">
          <Image src="/images/benara-logo.svg" alt="Benara Logo" width={40} height={40} className="w-10 h-10" />
          <span className="text-2xl font-semibold text-[#2B4F60]">Benara.</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <div className="relative group">
            <button className="text-[#333] font-medium text-lg hover:text-[#2B4F60] transition-colors flex items-center gap-1">
              Materi
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:rotate-180"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-64 rounded-xl bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              <div className="p-2">
                <Link
                  href="/materi/pengertian"
                  className="block px-4 py-3 text-[#333] hover:bg-[#f0f9ff] rounded-lg transition-colors"
                >
                  <div className="font-medium">Pengertian Nabi & Rasul</div>
                  <div className="text-sm text-[#666]">Pelajari dasar-dasar tentang nabi dan rasul</div>
                </Link>
                <Link
                  href="/materi/nama-nama-nabi"
                  className="block px-4 py-3 text-[#333] hover:bg-[#f0f9ff] rounded-lg transition-colors"
                >
                  <div className="font-medium">Nama-nama Nabi & Rasul</div>
                  <div className="text-sm text-[#666]">Kenali 25 nabi yang disebutkan dalam Al-Quran</div>
                </Link>
                <Link
                  href="/materi/ulul-azmi"
                  className="block px-4 py-3 text-[#333] hover:bg-[#f0f9ff] rounded-lg transition-colors"
                >
                  <div className="font-medium">Nabi Ulul Azmi</div>
                  <div className="text-sm text-[#666]">Pelajari 5 nabi dengan keteguhan luar biasa</div>
                </Link>
                <Link
                  href="/materi/kisah-inspirasi"
                  className="block px-4 py-3 text-[#333] hover:bg-[#f0f9ff] rounded-lg transition-colors"
                >
                  <div className="font-medium">Kisah Inspirasi Nabi</div>
                  <div className="text-sm text-[#666]">Kisah-kisah inspiratif dari kehidupan para nabi</div>
                </Link>
                <Link
                  href="/materi/quiz"
                  className="block px-4 py-3 text-[#333] hover:bg-[#f0f9ff] rounded-lg transition-colors"
                >
                  <div className="font-medium">Ayo Berlatih!</div>
                  <div className="text-sm text-[#666]">Uji pengetahuanmu tentang para nabi</div>
                </Link>
              </div>
            </div>
          </div>
          <a
            href="https://wa.me/6282119111590"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#333] font-medium text-lg hover:text-[#2B4F60] transition-colors"
          >
            Kontak
          </a>
          <div className="relative search-container">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    if (e.target.value.trim()) {
                      setShowSearchResults(true)
                    } else {
                      setShowSearchResults(false)
                    }
                  }}
                  placeholder="Cari materi..."
                  className="py-2 pl-4 pr-10 border border-[#ddd] rounded-[20px] w-[200px] text-sm focus:outline-none focus:border-[#2B4F60] focus:ring-1 focus:ring-[#2B4F60]"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-transparent border-none cursor-pointer text-[#2B4F60] text-lg hover:text-[#1a3a4a] transition-colors"
              >
                <Search size={20} />
              </button>
            </form>

            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div
                ref={searchResultsRef}
                className="search-results absolute right-0 mt-2 w-[300px] max-h-[400px] overflow-y-auto bg-white rounded-xl shadow-lg z-50"
              >
                <div className="p-2">
                  {getSearchResults().length > 0 ? (
                    getSearchResults().map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearchItemClick(result.link)}
                        className="w-full text-left px-4 py-3 hover:bg-[#f0f9ff] rounded-lg transition-colors block"
                      >
                        <div className="font-medium text-[#2B4F60]">{result.title}</div>
                        <div className="text-sm text-[#666]">{result.description}</div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-center">
                      <div className="font-medium text-gray-500">Tidak ada hasil</div>
                      <div className="text-sm text-gray-400">Coba kata kunci lain</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="block md:hidden relative mobile-menu-container">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-2xl cursor-pointer text-[#2B4F60]">
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="absolute right-0 mt-2 w-[250px] bg-white rounded-xl shadow-lg z-50 mobile-menu-container">
              <div className="p-4 flex flex-col gap-3">
                <div className="border-b pb-2">
                  <div className="font-medium text-[#2B4F60] mb-2">Materi</div>
                  <Link
                    href="/materi/pengertian"
                    className="block py-2 px-3 text-[#333] hover:bg-[#f0f9ff] rounded-lg text-sm"
                  >
                    Pengertian Nabi & Rasul
                  </Link>
                  <Link
                    href="/materi/nama-nama-nabi"
                    className="block py-2 px-3 text-[#333] hover:bg-[#f0f9ff] rounded-lg text-sm"
                  >
                    Nama-nama Nabi & Rasul
                  </Link>
                  <Link
                    href="/materi/ulul-azmi"
                    className="block py-2 px-3 text-[#333] hover:bg-[#f0f9ff] rounded-lg text-sm"
                  >
                    Nabi Ulul Azmi
                  </Link>
                  <Link
                    href="/materi/kisah-inspirasi"
                    className="block py-2 px-3 text-[#333] hover:bg-[#f0f9ff] rounded-lg text-sm"
                  >
                    Kisah Inspirasi Nabi
                  </Link>
                  <Link
                    href="/materi/quiz"
                    className="block py-2 px-3 text-[#333] hover:bg-[#f0f9ff] rounded-lg text-sm"
                  >
                    Ayo Berlatih!
                  </Link>
                </div>
                <a
                  href="https://wa.me/6282119111590"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 px-3 text-[#333] hover:bg-[#f0f9ff] rounded-lg"
                >
                  Kontak
                </a>
                <div className="mt-2">
                  <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        ref={mobileSearchInputRef}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari materi..."
                        className="py-2 pl-4 pr-10 border border-[#ddd] rounded-[20px] w-full text-sm"
                      />
                      {searchTerm && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="bg-[#2B4F60] text-white p-2 rounded-full hover:bg-[#1a3a4a] transition-colors"
                    >
                      <Search size={16} />
                    </button>
                  </form>

                  {/* Mobile Search Results */}
                  {showSearchResults && searchTerm && (
                    <div className="mt-2 max-h-[200px] overflow-y-auto bg-gray-50 rounded-lg">
                      {getSearchResults().length > 0 ? (
                        getSearchResults().map((result, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearchItemClick(result.link)}
                            className="w-full text-left px-3 py-2 hover:bg-[#f0f9ff] transition-colors block border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-[#2B4F60] text-sm">{result.title}</div>
                            <div className="text-xs text-[#666]">{result.description}</div>
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-center">
                          <div className="font-medium text-gray-500 text-sm">Tidak ada hasil</div>
                          <div className="text-xs text-gray-400">Coba kata kunci lain</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="mt-20 p-8">
        <section className="relative flex flex-col md:flex-row items-center justify-between gap-8 mb-12 p-8 max-w-[1200px] mx-auto overflow-hidden">
          <div className="flex-1 order-2 md:order-1 max-w-[400px]">
            <Image
              src="/images/kids-reading.svg"
              alt="Kids Reading"
              width={400}
              height={400}
              className="w-full h-auto"
            />
          </div>
          <div className="flex-1 text-center md:text-left order-1 md:order-2">
            <h1 className="text-4xl md:text-5xl text-[#2B4F60] mb-6 font-bold leading-tight capitalize">
              Belajar nabi
              <br />
              dan rasul
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#666] max-w-[600px] tracking-wide">
              BENARA ADALAH WEB YANG DIKEMBANGKAN UNTUK ANAK DAPAT BELAJAR KISAH NABI DAN RASUL SECARA DIGITAL,
              INTERAKTIF, DAN KIDS FRIENDLY
            </p>
            <button
              onClick={handleStartLearning}
              className="inline-block py-3 px-6 bg-[#FFA07A] text-white text-xl font-semibold rounded-[25px] mt-6 hover:bg-[#ff8c5a] transition-all hover:-translate-y-1 active:translate-y-0.5"
            >
              Mulai Belajar
            </button>
          </div>

          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {[1, 2, 3, 4, 5].map((i) => (
              <Image
                key={i}
                src={`/images/icon-${i}.svg`}
                alt={`Icon ${i}`}
                width={50}
                height={50}
                className="absolute w-[50px] h-auto animate-[move_10s_linear_infinite]"
                style={{
                  top: `${10 * i}%`,
                  left: `${i === 1 ? 10 : i === 2 ? 30 : i === 3 ? 50 : i === 4 ? 70 : 90}%`,
                }}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Font Awesome script */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js" async></script>
    </>
  )
}
