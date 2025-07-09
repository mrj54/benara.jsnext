"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, MessageCircle, Book, Award, Heart, Target } from "lucide-react"
import { motion } from "framer-motion"

export default function PengertianPage() {
  const [userData, setUserData] = useState({
    nama: "",
    sekolah: "",
  })
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [popupContent, setPopupContent] = useState({ title: "", content: "" })
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

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

  const handleSectionClick = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  const showInfoPopup = (title: string, content: string) => {
    setPopupContent({ title, content })
    setShowPopup(true)
  }

  const sections = [
    {
      id: "pengertian",
      title: "Apa itu Nabi dan Rasul?",
      content: (
        <div className="space-y-4">
          <p>
            <span className="font-bold text-blue-600">Nabi</span> adalah orang yang dipilih Allah untuk menerima wahyu
            dan membimbing manusia ke jalan yang benar. Mereka seperti guru spesial yang diutus Allah untuk mengajarkan
            kebaikan.
          </p>
          <p>
            <span className="font-bold text-purple-600">Rasul</span> adalah nabi yang juga diberi tugas khusus untuk
            menyampaikan ajaran baru (syariat) dan kitab suci kepada manusia. Semua rasul adalah nabi, tapi tidak semua
            nabi adalah rasul.
          </p>
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
            <p className="text-yellow-800 font-medium">
              Bayangkan seperti ini: Nabi seperti guru di sekolah, sedangkan Rasul seperti kepala sekolah yang membawa
              peraturan baru!
            </p>
          </div>
        </div>
      ),
      icon: <Book className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "beriman",
      title: "Beriman kepada Nabi dan Rasul",
      content: (
        <div className="space-y-4">
          <p>
            Beriman kepada nabi dan rasul adalah salah satu rukun iman yang wajib diyakini oleh setiap muslim. Ini berarti kita harus:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h3 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                  <span className="text-blue-700">1</span>
                </div>
                Meyakini Keberadaan Mereka
              </h3>
              <p className="text-blue-800">
                Percaya bahwa Allah telah mengutus para nabi dan rasul untuk membimbing manusia.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <h3 className="font-bold text-purple-700 mb-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
                  <span className="text-purple-700">2</span>
                </div>
                Mencintai dan Menghormati
              </h3>
              <p className="text-purple-800">
                Mencintai dan menghormati semua nabi dan rasul tanpa membeda-bedakan.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <h3 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
                  <span className="text-green-700">3</span>
                </div>
                Mempelajari Kisah Mereka
              </h3>
              <p className="text-green-800">
                Mempelajari dan mengambil pelajaran dari kisah-kisah para nabi dan rasul.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
              <h3 className="font-bold text-yellow-700 mb-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center">
                  <span className="text-yellow-700">4</span>
                </div>
                Mengikuti Teladan Mereka
              </h3>
              <p className="text-yellow-800">
                Mencontoh dan mengamalkan sifat-sifat terpuji para nabi dan rasul.
              </p>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 mt-4">
            <p className="text-orange-800">
              <span className="font-bold">Ingat:</span> Beriman kepada nabi dan rasul bukan hanya sekedar percaya, tapi juga harus mengikuti ajaran dan teladan mereka dalam kehidupan sehari-hari.
            </p>
          </div>
        </div>
      ),
      icon: <Heart className="w-6 h-6" />,
      color: "bg-red-100 text-red-600",
    },
    {
      id: "tujuan",
      title: "Tujuan Diutusnya Nabi dan Rasul",
      content: (
        <div className="space-y-4">
          <p>
            Allah SWT mengutus para nabi dan rasul dengan tujuan-tujuan mulia untuk kebaikan manusia:
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
              <h3 className="font-bold text-blue-700 mb-2">1. Mengajarkan Tauhid</h3>
              <p className="text-blue-800">
                Mengajak manusia untuk menyembah Allah SWT dan tidak menyekutukan-Nya dengan apapun.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
              <h3 className="font-bold text-purple-700 mb-2">2. Membimbing ke Jalan yang Benar</h3>
              <p className="text-purple-800">
                Menunjukkan manusia jalan kebenaran dan membimbing mereka menuju kebahagiaan dunia dan akhirat.
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-red-50 p-4 rounded-xl border border-pink-200">
              <h3 className="font-bold text-pink-700 mb-2">3. Menyampaikan Hukum Allah</h3>
              <p className="text-pink-800">
                Menyampaikan perintah dan larangan Allah serta mengajarkan halal dan haram.
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border border-red-200">
              <h3 className="font-bold text-red-700 mb-2">4. Memberi Teladan</h3>
              <p className="text-red-800">
                Memberikan contoh nyata bagaimana menjalani kehidupan sesuai dengan ajaran Allah.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200">
              <h3 className="font-bold text-orange-700 mb-2">5. Memperingatkan Manusia</h3>
              <p className="text-orange-800">
                Memberi kabar gembira bagi orang yang berbuat baik dan peringatan bagi yang berbuat buruk.
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-xl border border-green-200 mt-4">
            <p className="text-green-800">
              <span className="font-bold">Hikmah:</span> Diutusnya para nabi dan rasul adalah bentuk kasih sayang Allah kepada manusia agar mereka tidak tersesat dan dapat mencapai kebahagiaan di dunia dan akhirat.
            </p>
          </div>
        </div>
      ),
      icon: <Target className="w-6 h-6" />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: "perbedaan",
      title: "Perbedaan Nabi dan Rasul",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h3 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                  <span className="text-blue-700">N</span>
                </div>
                Nabi
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-blue-800">
                <li>Menerima wahyu dari Allah</li>
                <li>Mengikuti ajaran nabi sebelumnya</li>
                <li>Tidak selalu membawa kitab suci baru</li>
                <li>Diutus untuk kaum tertentu</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <h3 className="font-bold text-purple-700 mb-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
                  <span className="text-purple-700">R</span>
                </div>
                Rasul
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-purple-800">
                <li>Menerima wahyu dari Allah</li>
                <li>Membawa ajaran baru (syariat)</li>
                <li>Biasanya membawa kitab suci</li>
                <li>Diutus untuk menyampaikan pesan Allah</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <p className="text-green-800">
              <span className="font-bold">Contoh:</span> Nabi Muhammad SAW adalah seorang Nabi dan juga Rasul karena
              beliau menerima wahyu (Al-Qur'an) dan membawa syariat baru.
            </p>
          </div>
        </div>
      ),
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "jumlah",
      title: "Jumlah Nabi dan Rasul",
      content: (
        <div className="space-y-4">
          <p>
            Allah telah mengutus banyak nabi dan rasul sepanjang sejarah manusia. Dalam hadits disebutkan bahwa jumlah
            nabi ada <span className="font-bold text-green-600">124.000</span> dan jumlah rasul ada{" "}
            <span className="font-bold text-green-600">313</span>.
          </p>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <p className="text-blue-800">
              Namun, dalam Al-Qur'an hanya disebutkan <span className="font-bold">25 nama nabi dan rasul</span> yang
              wajib kita ketahui.
            </p>
            <div className="mt-4">
              <Link href="/materi/nama-nama-nabi" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full text-center transition-colors">
                Lihat 25 Nama Nabi & Rasul
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Hapus tombol dengan ikon bintang dan teks 'Lihat 25 Nabi dan Rasul' */}
            {/* <button
              onClick={() =>
                showInfoPopup(
                  "25 Nabi dan Rasul",
                  "1. Adam AS\n2. Idris AS\n3. Nuh AS\n4. Hud AS\n5. Shaleh AS\n6. Ibrahim AS\n7. Luth AS\n8. Ismail AS\n9. Ishaq AS\n10. Ya'qub AS\n11. Yusuf AS\n12. Ayyub AS\n13. Syu'aib AS\n14. Musa AS\n15. Harun AS\n16. Dzulkifli AS\n17. Daud AS\n18. Sulaiman AS\n19. Ilyas AS\n20. Ilyasa AS\n21. Yunus AS\n22. Zakaria AS\n23. Yahya AS\n24. Isa AS\n25. Muhammad SAW",
                )
              }
              className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <Star className="w-4 h-4" />
              <span>Lihat 25 Nabi dan Rasul</span>
            </button> */}
          </div>
        </div>
      ),
      icon: <Award className="w-6 h-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "sifat",
      title: "Sifat-sifat Nabi dan Rasul",
      content: (
        <div className="space-y-4">
          <p>
            Para nabi dan rasul memiliki sifat-sifat istimewa yang membuat mereka menjadi teladan terbaik bagi manusia.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 cursor-pointer hover:shadow-md transition-all"
              onClick={() =>
                showInfoPopup(
                  "Sifat Wajib",
                  "1. Shiddiq (Jujur): Para nabi selalu berkata jujur dan tidak pernah berbohong.\n\n2. Amanah (Dapat Dipercaya): Para nabi selalu menjaga kepercayaan yang diberikan kepada mereka.\n\n3. Tabligh (Menyampaikan): Para nabi menyampaikan semua wahyu Allah tanpa mengurangi atau menambahkan.\n\n4. Fathanah (Cerdas): Para nabi memiliki kecerdasan luar biasa dalam menyelesaikan masalah.",
                )
              }
            >
              <h3 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                  <span className="text-blue-700">✓</span>
                </div>
                Sifat Wajib
              </h3>
              <p className="text-blue-800">Sifat-sifat yang pasti dimiliki oleh para nabi dan rasul.</p>
            </div>

            <div
              className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200 cursor-pointer hover:shadow-md transition-all"
              onClick={() =>
                showInfoPopup(
                  "Sifat Mustahil",
                  "1. Kidzib (Dusta): Para nabi mustahil berdusta dalam perkataan dan perbuatan.\n\n2. Khianat (Berkhianat): Para nabi mustahil mengkhianati amanah yang diberikan.\n\n3. Kitman (Menyembunyikan): Para nabi mustahil menyembunyikan wahyu Allah.\n\n4. Baladah (Bodoh): Para nabi mustahil bersifat bodoh dan tidak memiliki kecerdasan.",
                )
              }
            >
              <h3 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center">
                  <span className="text-red-700">✗</span>
                </div>
                Sifat Mustahil
              </h3>
              <p className="text-red-800">Sifat-sifat yang tidak mungkin dimiliki oleh para nabi dan rasul.</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
            <p className="text-yellow-800">
              <span className="font-bold">Tahukah kamu?</span> Sifat-sifat para nabi ini bisa kita jadikan contoh dalam
              kehidupan sehari-hari. Misalnya, kita harus selalu jujur seperti sifat Shiddiq para nabi.
            </p>
            <div className="mt-4">
              <Link href="/materi/sifat" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full text-center transition-colors">
                Lihat Sifat-Sifat Nabi & Rasul
              </Link>
            </div>
          </div>
        </div>
      ),
      icon: <Star className="w-6 h-6" />,
      color: "bg-yellow-100 text-yellow-600",
    },
  ]

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
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] p-4 font-nunito">
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-[10%] left-[5%] w-24 h-24 rounded-full bg-blue-100 opacity-40"></div>
        <div className="absolute top-[30%] right-[8%] w-32 h-32 rounded-full bg-purple-100 opacity-40"></div>
        <div className="absolute bottom-[15%] left-[15%] w-40 h-40 rounded-full bg-green-100 opacity-30"></div>
        <div className="absolute top-[60%] right-[15%] w-28 h-28 rounded-full bg-yellow-100 opacity-40"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10" ref={containerRef}>
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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-3xl -z-10"></div>
          <div className="relative inline-block">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-200 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-blue-200 rounded-full opacity-70 animate-pulse delay-700"></div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 py-8">
              Pengertian Nabi & Rasul
            </h1>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-4">
            Mari belajar tentang siapa itu Nabi dan Rasul, apa perbedaannya, dan mengapa mereka penting dalam Islam.
          </p>
        </header>

        {/* Materi Tambahan Anak-Anak: Apakah Iman Itu? (PINDAH KE ATAS) */}
        <motion.div
          variants={item}
          className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl shadow-lg p-6 my-6"
        >
          <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Anak-Anak, Tahukah Kalian Apakah Iman Itu?
          </h2>
          <div className="space-y-4 text-gray-800">
            <p>
              Iman <span className="font-semibold">artinya percaya</span>. Misalnya, ada sahabatmu berkata, “Di saku celanaku ada uang sebanyak sepuluh ribu rupiah.” Hatimu membenarkan yang diucapkan sahabatmu. Itu berarti kamu <span className="font-semibold text-blue-700">percaya</span> ada uang dalam saku. Tetapi jika sebelumnya kalian telah melihat uang itu di saku sahabatmu, lalu mendengar ucapan di atas, itu tidak dinamai percaya, tetapi <span className="font-semibold text-green-700">tahu</span>.
            </p>
            <p>
              <span className="font-semibold">Iman kepada rasul-rasul Allah</span> berarti kalian percaya bahwa Allah mengutus rasul-rasul-Nya sebagai teladan dan contoh bagi manusia.
            </p>
            <p>
              Allah mengutus rasul-rasul-Nya sebagai teladan dan contoh bagi manusia dalam menjalani kehidupan. Allah berfirman:
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl my-2">
              <p className="italic text-blue-800 font-semibold mb-2">
                "Sesungguhnya telah ada pada diri Rasul itu suri teladan yang baik bagimu." <br />
                <span className="text-sm">(Q.S. al-Ahzāb/33: 21)</span>
              </p>
            </div>
            <p>
              Anak-Anak, tahukah kalian bahwa Nabi Muhammad saw. juga rasul-rasul lain adalah manusia biasa? Ya, mereka makan, minum, mempunyai keluarga dan anak-anak, juga bekerja. Mengapa kita perlu menjadikan mereka teladan dan idola? Karena mereka memiliki akhlak yang baik. Allah mengangkat mereka menjadi rasul, karena memiliki empat sifat yang baik.
            </p>
            <p>
              Pertanyaan ini pernah diajukan sahabat kepada Rasulullah saw. Pada suatu hari, Rasulullah saw. berkumpul dengan para sahabatnya. Seketika seorang laki-laki hadir dan bertanya, <span className="italic">"Ya Rasulallah, apakah iman itu?"</span>
            </p>
            <p>
              Rasul menjawab, <span className="font-semibold text-blue-700">"Iman itu kamu percaya kepada Allah, malaikat, kitab-kitab yang diturunkan Allah, rasul-rasul yang diutus-Nya, hari kemudian dan takdir-Nya yang baik dan yang buruk."</span>
            </p>
            <div className="bg-white/80 border-l-4 border-yellow-400 p-4 rounded-xl">
              <p className="text-yellow-800 font-medium">
                Yuk, kita amalkan rukun iman ini dalam kehidupan sehari-hari agar menjadi anak yang beriman dan bertakwa!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
          {/* Introduction */}
          <motion.div
            variants={item}
            className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6 border-2 border-blue-200"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 aspect-square relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/prophets-illustration.png"
                  alt="Nabi dan Rasul"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Mengenal Nabi dan Rasul</h2>
                <p className="text-gray-700 leading-relaxed">
                  Nabi dan Rasul adalah orang-orang istimewa yang dipilih Allah SWT untuk membimbing manusia ke jalan
                  yang benar. Mereka menerima wahyu dari Allah dan menjadi teladan bagi umat manusia.
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  Dalam Islam, kita percaya bahwa Allah telah mengutus banyak nabi dan rasul sepanjang sejarah, mulai
                  dari Nabi Adam AS hingga Nabi Muhammad SAW sebagai nabi dan rasul terakhir.
                </p>
                <div className="bg-blue-50 p-4 rounded-xl mt-4 border border-blue-100">
                  <p className="text-blue-800 font-medium flex items-start gap-2">
                    <span className="text-2xl">💡</span>
                    <span>
                      Mempelajari tentang nabi dan rasul membantu kita memahami ajaran Islam dan bagaimana menjadi
                      manusia yang baik.
                    </span>
                  </p>
                </div>
                {/* Hapus link ke materi nama-nama nabi dan sifat */}
              </div>
            </div>
          </motion.div>

          {/* Accordion sections */}
          {sections.map((section) => (
            <motion.div
              key={section.id}
              variants={item}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden border-2 border-blue-100"
            >
              <button
                className="w-full p-6 flex items-center justify-between text-left"
                onClick={() => handleSectionClick(section.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${section.color} flex items-center justify-center`}>
                    {section.icon}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">{section.title}</h2>
                </div>
                <div
                  className={`w-6 h-6 border-2 border-blue-500 rounded-full flex items-center justify-center transition-transform ${activeSection === section.id ? "rotate-180" : ""
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${activeSection === section.id ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="p-6 pt-0 border-t border-gray-100">{section.content}</div>
              </div>
            </motion.div>
          ))}

          {/* Fun Facts */}
          <motion.div
            variants={item}
            className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl shadow-xl p-6 text-white"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Star className="w-6 h-6" />
              Tahukah Kamu?
            </h2>
            <div className="space-y-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5">
                <p className="leading-relaxed">
                  Nabi Muhammad SAW adalah nabi dan rasul terakhir yang diutus Allah. Beliau menerima Al-Qur'an sebagai
                  kitab suci dan menjadi teladan terbaik bagi umat manusia.
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5">
                <p className="leading-relaxed">
                  Nabi Nuh AS membuat kapal besar untuk menyelamatkan orang-orang beriman dan hewan-hewan dari banjir
                  besar yang melanda bumi.
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5">
                <p className="leading-relaxed">
                  Ada 5 nabi yang disebut sebagai "Ulul Azmi" karena keteguhan hati mereka yang luar biasa. Mereka
                  adalah Nabi Nuh AS, Nabi Ibrahim AS, Nabi Musa AS, Nabi Isa AS, dan Nabi Muhammad SAW.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quiz Section */}
          <motion.div
            variants={item}
            className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden border-2 border-green-200"
          >
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Ayo Berlatih!</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Uji pemahamanmu tentang nabi dan rasul dengan menjawab pertanyaan berikut:
              </p>
              <div className="bg-green-50 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-green-800 mb-3">Pertanyaan:</h3>
                <p className="text-gray-700 mb-4">Apa perbedaan utama antara nabi dan rasul?</p>
                <Link
                  href="/materi/pengertian/quiz"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
                >
                  Jawab Quiz
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Info Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
              <div className="bg-blue-500 p-4">
                <h3 className="text-xl font-bold text-white">{popupContent.title}</h3>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {popupContent.content.split("\n").map((line, index) => (
                  <p key={index} className="mb-2">
                    {line}
                  </p>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
