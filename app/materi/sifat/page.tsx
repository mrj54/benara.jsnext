"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star, Check, X } from "lucide-react"
import { motion } from "framer-motion"

export default function SifatNabiPage() {
  const [userData, setUserData] = useState({
    nama: "",
    sekolah: "",
  })
  const [activeCard, setActiveCard] = useState<string | null>(null)
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

  const sifatWajib = [
    {
      id: "shiddiq",
      title: "Shiddiq (الصِّدْقُ)",
      description: "Benar dan jujur dalam setiap perkataan dan perbuatan",
      icon: "/images/sifat-shiddiq.svg",
      color: "from-emerald-400 to-emerald-600",
      example:
        "Nabi Muhammad ﷺ selalu berkata jujur, bahkan sebelum menjadi nabi beliau dijuluki 'Al-Amin' (yang dapat dipercaya).",
    },
    {
      id: "amanah",
      title: "Amanah (الأَمَانَةُ)",
      description: "Dapat dipercaya dalam menjalankan tugas dan tanggung jawab",
      icon: "/images/sifat-amanah.svg",
      color: "from-blue-400 to-blue-600",
      example:
        "Ketika penduduk Makkah menitipkan barang berharga, Nabi Muhammad ﷺ selalu menjaganya dengan baik dan mengembalikannya utuh.",
    },
    {
      id: "tabligh",
      title: "Tabligh (التَّبْلِيغُ)",
      description: "Menyampaikan seluruh wahyu Allah kepada umat manusia",
      icon: "/images/sifat-tabligh.svg",
      color: "from-purple-400 to-purple-600",
      example:
        "Nabi Muhammad ﷺ menyampaikan semua ajaran Islam tanpa mengurangi atau menambahkan, meskipun menghadapi banyak tantangan.",
    },
    {
      id: "fathanah",
      title: "Fathanah (الفَطَانَةُ)",
      description: "Cerdas dan bijaksana dalam menghadapi setiap persoalan",
      icon: "/images/sifat-fathanah.svg",
      color: "from-amber-400 to-amber-600",
      example:
        "Nabi Muhammad ﷺ selalu menemukan solusi bijaksana untuk masalah yang rumit, seperti saat meletakkan Hajar Aswad di Ka'bah.",
    },
  ]

  const sifatMustahil = [
    {
      id: "kidzib",
      title: "Kidzib (الكِذْبُ)",
      description: "Dusta dalam perkataan dan perbuatan",
      icon: "/images/sifat-kidzib.svg",
      color: "from-red-400 to-red-600",
      example: "Nabi Muhammad ﷺ tidak pernah berbohong, bahkan kepada musuh-musuhnya.",
    },
    {
      id: "khianat",
      title: "Khianat (الخِيَانَةُ)",
      description: "Berkhianat terhadap amanah yang diberikan",
      icon: "/images/sifat-khianat.svg",
      color: "from-pink-400 to-pink-600",
      example: "Nabi Muhammad ﷺ tidak pernah mengkhianati janji atau amanah, bahkan terhadap orang yang memusuhinya.",
    },
    {
      id: "kitman",
      title: "Kitman (الكِتْمَانُ)",
      description: "Menyembunyikan wahyu Allah",
      icon: "/images/sifat-kitman.svg",
      color: "from-indigo-400 to-indigo-600",
      example:
        "Nabi Muhammad ﷺ menyampaikan semua wahyu yang diterimanya, meskipun terkadang wahyu tersebut berisi teguran untuk beliau sendiri.",
    },
    {
      id: "baladah",
      title: "Baladah (البَلَادَةُ)",
      description: "Bodoh dan tidak memiliki kecerdasan",
      icon: "/images/sifat-baladah.svg",
      color: "from-orange-400 to-orange-600",
      example:
        "Nabi Muhammad ﷺ selalu menunjukkan kecerdasan dan kebijaksanaan dalam setiap keputusan dan tindakannya.",
    },
  ]

  const handleCardClick = (id: string) => {
    if (activeCard === id) {
      setActiveCard(null)
    } else {
      setActiveCard(id)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] to-[#f0f9ff] p-4 font-nunito">
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Floating shapes */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/30 animate-float"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/page"
            className="inline-flex items-center gap-2 bg-white/80 hover:bg-white transition-colors px-4 py-2 rounded-full text-blue-600 shadow-md"
          >
            <ArrowLeft size={18} />
            <span>Kembali</span>
          </Link>
        </div>

        {/* Header */}
        <header className="text-center mb-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-3xl -z-10"></div>
          <div className="relative inline-block">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-200 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-blue-200 rounded-full opacity-70 animate-pulse delay-700"></div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 py-8">
              Sifat-sifat Nabi dan Rasul
            </h1>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-4">
            Para nabi dan rasul memiliki sifat-sifat khusus yang membuat mereka menjadi teladan terbaik bagi umat
            manusia.
          </p>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Sifat Wajib Section */}
          <section className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border-2 border-emerald-200">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Check className="text-white" size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Sifat Wajib</h2>
            </div>

            <motion.div className="p-6" variants={container} initial="hidden" animate="show">
              <p className="text-gray-700 mb-6">
                Sifat wajib adalah sifat-sifat yang pasti dimiliki oleh setiap nabi dan rasul.
              </p>

              <div className="space-y-4">
                {sifatWajib.map((sifat) => (
                  <motion.div key={sifat.id} variants={item} className="relative">
                    <div
                      className={`bg-white rounded-2xl p-5 shadow-md cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ${
                        activeCard === sifat.id ? "ring-2 ring-emerald-400" : ""
                      }`}
                      onClick={() => handleCardClick(sifat.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${sifat.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <div className="w-6 h-6 text-white">
                            {sifat.id === "shiddiq" && <Star className="w-full h-full" />}
                            {sifat.id === "amanah" && <Check className="w-full h-full" />}
                            {sifat.id === "tabligh" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-full h-full"
                              >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                              </svg>
                            )}
                            {sifat.id === "fathanah" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-full h-full"
                              >
                                <path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                              </svg>
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{sifat.title}</h3>
                          <p className="text-gray-600">{sifat.description}</p>
                        </div>
                      </div>

                      {activeCard === sifat.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-100"
                        >
                          <div className="bg-gray-50 p-4 rounded-xl">
                            <h4 className="font-bold text-gray-700 mb-2">Contoh:</h4>
                            <p className="text-gray-600">{sifat.example}</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Sifat Mustahil Section */}
          <section className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border-2 border-red-200">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <X className="text-white" size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Sifat Mustahil</h2>
            </div>

            <motion.div className="p-6" variants={container} initial="hidden" animate="show">
              <p className="text-gray-700 mb-6">
                Sifat mustahil adalah sifat-sifat yang tidak mungkin dimiliki oleh para nabi dan rasul.
              </p>

              <div className="space-y-4">
                {sifatMustahil.map((sifat) => (
                  <motion.div key={sifat.id} variants={item} className="relative">
                    <div
                      className={`bg-white rounded-2xl p-5 shadow-md cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ${
                        activeCard === sifat.id ? "ring-2 ring-red-400" : ""
                      }`}
                      onClick={() => handleCardClick(sifat.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${sifat.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <div className="w-6 h-6 text-white">
                            {sifat.id === "kidzib" && <X className="w-full h-full" />}
                            {sifat.id === "khianat" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-full h-full"
                              >
                                <path d="M2 12h20M2 12l10 10M2 12L12 2"></path>
                              </svg>
                            )}
                            {sifat.id === "kitman" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-full h-full"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                              </svg>
                            )}
                            {sifat.id === "baladah" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-full h-full"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="8" y1="15" x2="16" y2="15"></line>
                                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                <line x1="15" y1="9" x2="15.01" y2="9"></line>
                              </svg>
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{sifat.title}</h3>
                          <p className="text-gray-600">{sifat.description}</p>
                        </div>
                      </div>

                      {activeCard === sifat.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-100"
                        >
                          <div className="bg-gray-50 p-4 rounded-xl">
                            <h4 className="font-bold text-gray-700 mb-2">Contoh:</h4>
                            <p className="text-gray-600">{sifat.example}</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        </div>

        {/* Fun Facts Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl shadow-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-6 h-6" />
            Tahukah Kamu?
          </h2>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5">
            <p className="text-white leading-relaxed">
              Sifat-sifat wajib dan mustahil para nabi dan rasul ini sangat penting untuk dipahami. Sifat wajib
              menunjukkan kualitas yang harus kita teladani, sedangkan sifat mustahil menunjukkan sifat-sifat buruk yang
              harus kita hindari. Dengan memahami sifat-sifat ini, kita bisa belajar menjadi pribadi yang lebih baik
              sesuai dengan ajaran para nabi dan rasul.
            </p>
          </div>
        </section>

        {/* Interactive Quiz */}
        <section className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border-2 border-purple-200 mb-12">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Ayo Berlatih!</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-6">
              Uji pemahamanmu tentang sifat-sifat nabi dan rasul dengan menjawab pertanyaan berikut:
            </p>
            <div className="bg-purple-50 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-purple-800 mb-3">Pertanyaan:</h3>
              <p className="text-gray-700 mb-4">Apa saja 4 sifat wajib yang dimiliki oleh para nabi dan rasul?</p>
              <Link
                href="/materi/sifat/quiz"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                Jawab Quiz
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
