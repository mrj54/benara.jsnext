"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, ArrowLeft, Star, Book, Info } from "lucide-react"

export default function NamaNabiPage() {
  const [userData, setUserData] = useState({
    nama: "",
    sekolah: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [activeProphet, setActiveProphet] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const bubbleChatRef = useRef<HTMLDivElement>(null)
  const bubbleTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Prophet categories for better organization
  const prophetCategories = {
    "Ulul Azmi": ["Nuh", "Ibrahim", "Musa", "Isa", "Muhammad"],
    "Sebelum Ibrahim": ["Adam", "Idris", "Nuh", "Hud", "Shaleh"],
    "Keturunan Ibrahim": ["Ibrahim", "Ismail", "Ishaq", "Yaqub", "Yusuf"],
    "Bani Israil": ["Musa", "Harun", "Daud", "Sulaiman", "Zakaria", "Yahya", "Isa"],
    Lainnya: ["Luth", "Ayyub", "Syu'aib", "Dzulkifli", "Ilyas", "Ilyasa", "Yunus"],
  }

  // All prophet names in a flat array
  const prophetNames = [
    "Adam",
    "Idris",
    "Nuh",
    "Hud",
    "Shaleh",
    "Ibrahim",
    "Luth",
    "Ismail",
    "Ishaq",
    "Yaqub",
    "Yusuf",
    "Ayyub",
    "Syu'aib",
    "Musa",
    "Harun",
    "Dzulkifli",
    "Daud",
    "Sulaiman",
    "Ilyas",
    "Ilyasa",
    "Yunus",
    "Zakaria",
    "Yahya",
    "Isa",
    "Muhammad",
  ]

  // Prophet colors for unique identification
  const prophetColors: Record<string, string> = {
    Adam: "from-emerald-400 to-emerald-600",
    Idris: "from-sky-400 to-sky-600",
    Nuh: "from-blue-400 to-blue-600",
    Hud: "from-indigo-400 to-indigo-600",
    Shaleh: "from-violet-400 to-violet-600",
    Ibrahim: "from-purple-400 to-purple-600",
    Luth: "from-fuchsia-400 to-fuchsia-600",
    Ismail: "from-pink-400 to-pink-600",
    Ishaq: "from-rose-400 to-rose-600",
    Yaqub: "from-orange-400 to-orange-600",
    Yusuf: "from-amber-400 to-amber-600",
    Ayyub: "from-yellow-400 to-yellow-600",
    "Syu'aib": "from-lime-400 to-lime-600",
    Musa: "from-teal-400 to-teal-600",
    Harun: "from-cyan-400 to-cyan-600",
    Dzulkifli: "from-blue-400 to-indigo-600",
    Daud: "from-violet-400 to-purple-600",
    Sulaiman: "from-purple-400 to-pink-600",
    Ilyas: "from-rose-400 to-red-600",
    Ilyasa: "from-red-400 to-orange-600",
    Yunus: "from-amber-400 to-yellow-600",
    Zakaria: "from-lime-400 to-emerald-600",
    Yahya: "from-emerald-400 to-teal-600",
    Isa: "from-teal-400 to-cyan-600",
    Muhammad: "from-purple-400 to-blue-600",
  }

  // Prophet icons for visual representation
  const prophetIcons: Record<string, string> = {
    Adam: "Manusia Pertama",
    Idris: "Penulis Bijak",
    Nuh: "Pembuat Kapal",
    Hud: "Pembawa Pesan",
    Shaleh: "Pemilik Unta",
    Ibrahim: "Pembangun Ka'bah",
    Luth: "Penyelamat",
    Ismail: "Putra Ibrahim",
    Ishaq: "Putra Kedua",
    Yaqub: "Ayah 12 Putra",
    Yusuf: "Penafsir Mimpi",
    Ayyub: "Yang Sabar",
    "Syu'aib": "Penegak Keadilan",
    Musa: "Pembelah Laut",
    Harun: "Saudara Musa",
    Dzulkifli: "Penepat Janji",
    Daud: "Pemilik Suara Indah",
    Sulaiman: "Raja Bijaksana",
    Ilyas: "Pemberi Peringatan",
    Ilyasa: "Penyembuh",
    Yunus: "Di Perut Ikan",
    Zakaria: "Ayah Yahya",
    Yahya: "Pembaptis",
    Isa: "Penyembuh Sakit",
    Muhammad: "Penutup Para Nabi",
  }

  const descriptions: Record<string, string> = {
    Adam: "Adam adalah manusia pertama dan nabi pertama dalam Islam, diciptakan oleh Allah langsung dari tanah.",
    Idris:
      "Idris dikenal sebagai nabi yang sangat pandai membaca dan menulis, serta memiliki ilmu pengetahuan yang luas.",
    Nuh: "Nuh dikenal sebagai nabi yang membangun bahtera besar untuk menyelamatkan orang-orang beriman dan hewan dari banjir besar.",
    Hud: "Hud adalah nabi yang diutus kepada kaum 'Ad yang kuat dan tinggi, tetapi sombong dan tidak beriman.",
    Shaleh: "Shaleh diutus kepada kaum Tsamud dengan mukjizat unta yang keluar dari batu sebagai bukti kenabiannya.",
    Ibrahim: "Ibrahim adalah bapak para nabi dan tokoh penting monoteisme yang berani menentang pemujaan berhala.",
    Luth: "Luth diutus untuk memperbaiki akhlak kaum Sodom yang rusak dengan perilaku homoseksual dan perbuatan keji lainnya.",
    Ismail:
      "Ismail adalah putra Ibrahim dan nenek moyang bangsa Arab, terkenal dengan kesabarannya saat akan dikurbankan.",
    Ishaq: "Ishaq adalah putra kedua Ibrahim yang diutus ke Bani Israil dan ayah dari nabi Yaqub.",
    Yaqub: "Yaqub dikenal sebagai ayah dari dua belas putra yang kemudian menjadi dua belas suku Israel.",
    Yusuf:
      "Yusuf memiliki mukjizat berupa ketampanan dan kemampuan menafsirkan mimpi, serta kisah perjalanannya yang penuh hikmah.",
    Ayyub:
      "Ayyub dikenal karena kesabaran luar biasa saat menghadapi cobaan penyakit dan kehilangan harta serta keluarga.",
    "Syu'aib": "Syu'aib diutus kepada kaum Madyan untuk memperbaiki sistem ekonomi mereka yang curang dalam timbangan.",
    Musa: "Musa memimpin Bani Israil keluar dari Mesir dengan mukjizat tongkat yang bisa berubah menjadi ular dan membelah lautan.",
    Harun: "Harun adalah saudara Musa dan membantu dakwahnya dengan kemampuan berbicaranya yang lebih baik.",
    Dzulkifli: "Dzulkifli adalah nabi yang dikenal sebagai hakim yang adil dan selalu menepati janjinya.",
    Daud: "Daud memiliki mukjizat dapat melembutkan besi dengan tangannya dan memiliki suara yang sangat merdu.",
    Sulaiman:
      "Sulaiman menguasai ilmu berbicara dengan hewan dan mengendalikan jin, serta memiliki kerajaan yang megah.",
    Ilyas: "Ilyas diutus untuk mengingatkan kaum yang menyembah berhala Baal dan mengajak mereka kembali kepada Allah.",
    Ilyasa: "Ilyasa adalah penerus dakwah nabi Ilyas dan dikenal dengan kemampuannya menyembuhkan orang sakit.",
    Yunus:
      "Yunus terkenal karena kisahnya tertelan dalam perut ikan paus selama beberapa waktu sebagai ujian dari Allah.",
    Zakaria: "Zakaria adalah nabi yang terus berdoa hingga dikaruniai anak di usia tua yaitu Yahya.",
    Yahya: "Yahya adalah putra Zakaria dan dikenal sebagai nabi yang penuh kasih serta pembaptis Isa.",
    Isa: "Isa adalah nabi yang membawa Injil dan melakukan banyak mukjizat seperti menyembuhkan orang sakit dan menghidupkan orang mati.",
    Muhammad:
      "Muhammad adalah nabi terakhir dan penutup para nabi, pembawa risalah Islam dan Al-Qur'an sebagai mukjizatnya.",
  }

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

  const filteredProphets = prophetNames.filter((name) => {
    // First filter by search term
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase())

    // Then filter by category if one is selected
    if (activeCategory && activeCategory !== "Semua Nabi") {
      return matchesSearch && prophetCategories[activeCategory].includes(name)
    }

    // If no category is selected or "Semua Nabi" is selected, just filter by search
    return matchesSearch
  })

  const showProphetDetails = (name: string) => {
    setActiveProphet(name)

    if (bubbleTimeoutRef.current) {
      clearTimeout(bubbleTimeoutRef.current)
    }

    bubbleTimeoutRef.current = setTimeout(() => {
      setActiveProphet(null)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] p-4 font-nunito">
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-[10%] left-[5%] w-24 h-24 rounded-full bg-blue-100 opacity-40"></div>
        <div className="absolute top-[30%] right-[8%] w-32 h-32 rounded-full bg-purple-100 opacity-40"></div>
        <div className="absolute bottom-[15%] left-[15%] w-40 h-40 rounded-full bg-green-100 opacity-30"></div>
        <div className="absolute top-[60%] right-[15%] w-28 h-28 rounded-full bg-yellow-100 opacity-40"></div>

        {/* Decorative patterns */}
        <div className="absolute top-[5%] right-[20%] w-16 h-16 bg-pink-100 opacity-30 rotate-45"></div>
        <div className="absolute bottom-[25%] right-[10%] w-20 h-20 bg-blue-100 opacity-30 rounded-lg rotate-12"></div>
        <div className="absolute top-[40%] left-[8%] w-12 h-12 bg-purple-100 opacity-30 rounded-lg -rotate-12"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back button and title */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/page"
            className="flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all hover:scale-105"
          >
            <ArrowLeft className="text-blue-600" size={24} />
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 drop-shadow-md">Nama-Nama Nabi & Rasul</h1>
        </div>

        {/* Header Card with user info and search */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border-2 border-[#93c5fd] transition-transform hover:-translate-y-1 mb-6">
          <div className="p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="relative flex items-center w-full md:w-auto">
                <Search className="absolute left-3 text-[#3b82f6] w-5 h-5" />
                <input
                  type="text"
                  placeholder="cari nama nabi..."
                  className="pl-10 pr-4 py-3 rounded-full border-2 border-[#93c5fd] outline-none w-full md:w-[300px] text-base transition-all focus:border-[#3b82f6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.3)]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-[#3b82f6]">Hello {userData.nama}!</h1>
                <div className="w-12 h-12 rounded-full border-3 border-[#93c5fd] overflow-hidden transition-transform hover:scale-110 hover:rotate-6">
                  <Image
                    src="/images/owl-mascot.png"
                    alt="Kid Avatar"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg mb-6 p-6 border-2 border-[#93c5fd]">
          <div className="flex items-start gap-3">
            <Info className="text-blue-500 min-w-[24px]" />
            <p className="text-gray-700">
              Islam mengakui 25 nabi yang nama-namanya disebutkan dalam Al-Quran. Klik pada nama untuk melihat informasi
              lebih lanjut.
              <span className="text-blue-600 font-semibold">
                {" "}
                Nama yang berlatar belakang berbeda menunjukkan kelompok nabi yang berbeda.
              </span>
            </p>
          </div>
        </div>

        {/* Progress Bar with decorative elements */}
        <div className="relative w-full h-4 bg-[#bfdbfe] rounded-full mb-8 overflow-hidden">
          <div className="w-1/2 h-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] rounded-full animate-pulse"></div>
          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg">
              <Star className="text-white" size={16} />
            </div>
          </div>
        </div>

        {/* Category indicator */}
        {activeCategory && activeCategory !== "Semua Nabi" && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Book className="text-blue-600 w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-blue-800">Kategori: {activeCategory}</h3>
              <p className="text-sm text-blue-600">
                {activeCategory === "Ulul Azmi" &&
                  "Nabi yang memiliki keteguhan luar biasa dalam menyampaikan risalah Allah."}
                {activeCategory === "Keturunan Ibrahim" && "Nabi-nabi yang merupakan keturunan dari Nabi Ibrahim AS."}
                {activeCategory === "Bani Israil" &&
                  "Nabi-nabi yang diutus kepada Bani Israil (keturunan Nabi Yaqub AS)."}
              </p>
            </div>
          </div>
        )}

        {/* Category tabs */}
        <div className="mb-6 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 pb-2">
            <button
              className={`px-4 py-2 ${
                activeCategory === null || activeCategory === "Semua Nabi"
                  ? "bg-blue-600 text-white"
                  : "bg-white/70 backdrop-blur-sm text-blue-600"
              } 
                font-semibold rounded-full shadow-md hover:bg-blue-700 hover:text-white transition-colors whitespace-nowrap`}
              onClick={() => setActiveCategory("Semua Nabi")}
            >
              Semua Nabi
            </button>
            <button
              className={`px-4 py-2 ${
                activeCategory === "Ulul Azmi" ? "bg-blue-600 text-white" : "bg-white/70 backdrop-blur-sm text-blue-600"
              } 
                font-semibold rounded-full shadow-md hover:bg-blue-700 hover:text-white transition-colors whitespace-nowrap`}
              onClick={() => setActiveCategory("Ulul Azmi")}
            >
              Ulul Azmi
            </button>
            <button
              className={`px-4 py-2 ${
                activeCategory === "Keturunan Ibrahim"
                  ? "bg-blue-600 text-white"
                  : "bg-white/70 backdrop-blur-sm text-blue-600"
              } 
                font-semibold rounded-full shadow-md hover:bg-blue-700 hover:text-white transition-colors whitespace-nowrap`}
              onClick={() => setActiveCategory("Keturunan Ibrahim")}
            >
              Keturunan Ibrahim
            </button>
            <button
              className={`px-4 py-2 ${
                activeCategory === "Bani Israil"
                  ? "bg-blue-600 text-white"
                  : "bg-white/70 backdrop-blur-sm text-blue-600"
              } 
                font-semibold rounded-full shadow-md hover:bg-blue-700 hover:text-white transition-colors whitespace-nowrap`}
              onClick={() => setActiveCategory("Bani Israil")}
            >
              Bani Israil
            </button>
          </div>
        </div>

        {/* Prophets Grid - Updated with kid-friendly modern style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {filteredProphets.length > 0 ? (
            filteredProphets.map((name) => (
              <button
                key={name}
                className={`bg-white text-blue-800 p-4 rounded-2xl font-bold text-base shadow-lg cursor-pointer transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 relative overflow-hidden flex flex-col items-center justify-center gap-1 min-h-[120px] border-2 border-${prophetColors[name].split("from-")[1].split(" ")[0]}`}
                onClick={() => showProphetDetails(name)}
              >
                {/* Decorative top pattern */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${prophetColors[name]}`}></div>

                {/* Prophet name */}
                <span className="z-10 text-center mb-1">{name}</span>

                {/* Prophet role/description - replacing emojis */}
                <span className="text-xs text-blue-600 text-center font-medium z-10">{prophetIcons[name]}</span>

                {/* Decorative corner */}
                <div
                  className={`absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl ${prophetColors[name]} rounded-bl-xl opacity-20`}
                ></div>
              </button>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Tidak Ada Hasil</h3>
                <p className="text-gray-600">Tidak ada nabi yang sesuai dengan pencarian atau kategori yang dipilih.</p>
              </div>
            </div>
          )}
        </div>

        {/* Did you know section - updated with more kid-friendly style */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-3xl shadow-lg mb-12">
          <div className="flex items-start gap-4">
            <div className="bg-white/30 rounded-full p-3 backdrop-blur-sm">
              <Book className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">Tahukah kamu?</h3>
              <p className="text-white/90">
                Para nabi dan rasul dalam Islam dikenal memiliki sifat wajib yaitu Siddiq (jujur), Amanah (dapat
                dipercaya), Tabligh (menyampaikan), dan Fathanah (cerdas). Sifat-sifat ini membuat mereka menjadi
                teladan terbaik bagi umat manusia.
              </p>
            </div>
          </div>
        </div>

        {/* Bubble Chat with improved styling */}
        <div
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 p-5 rounded-3xl transition-all max-w-sm z-50 ${
            activeProphet
              ? "opacity-100 -translate-y-2 bg-white shadow-xl border-2 border-blue-200 backdrop-blur-md"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          {activeProphet && (
            <>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${prophetColors[activeProphet]} flex items-center justify-center text-white font-bold`}
                >
                  {activeProphet.charAt(0)}
                </div>
                <h3 className="font-extrabold text-xl text-blue-800">{activeProphet}</h3>
              </div>
              <p className="text-gray-700 text-base font-medium leading-relaxed">{descriptions[activeProphet]}</p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r-2 border-b-2 border-blue-200"></div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
