"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

export default function KisahAyyubPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-['Quicksand',sans-serif] pb-6">
      <div className="container mx-auto px-4 py-6">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/materi/kisah-inspirasi"
            className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 transition-colors px-4 py-2 rounded-full text-blue-600 shadow-md"
          >
            <ArrowLeft size={18} />
            <span>Kembali</span>
          </Link>
        </div>

        {/* Story Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative w-full md:w-1/3 aspect-square rounded-xl overflow-hidden">
              <Image
                src="/images/kisah-ayyub.jpg"
                alt="Nabi Ayyub"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Kisah Nabi Ayyub A.S</h1>
              <div className="text-blue-800 space-y-4">
                <p className="text-lg">
                  <span className="text-2xl mr-2">📗</span>
                  <span className="font-semibold">Kisah Kesabaran</span>
                </p>
                <p>
                  Nabi Ayyub A.S dikenal sebagai teladan kesabaran dalam menghadapi ujian. Beliau kehilangan harta,
                  keluarga, dan kesehatan, namun tetap teguh dalam keimanan kepada Allah SWT.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Kisah Inspiratif Nabi Ayyub</h2>
          <div className="prose prose-blue max-w-none">
            <p className="mb-4">
              Nabi Ayyub A.S adalah seorang yang kaya raya dan memiliki banyak ternak, tanah yang luas, serta keluarga
              yang besar. Beliau selalu bersyukur atas nikmat yang diberikan Allah SWT dan selalu berbagi dengan
              orang-orang yang membutuhkan.
            </p>

            <p className="mb-4">
              Suatu hari, Allah SWT menguji keimanan Nabi Ayyub dengan berbagai cobaan. Pertama, seluruh harta
              kekayaannya hilang. Kemudian, anak-anaknya meninggal dunia. Meskipun demikian, Nabi Ayyub tetap bersabar
              dan beriman kepada Allah SWT.
            </p>

            <p className="mb-4">
              Ujian terberat datang ketika Nabi Ayyub diberikan penyakit kulit yang sangat parah. Tubuhnya dipenuhi luka
              dan borok yang menyakitkan. Kondisi ini berlangsung selama bertahun-tahun. Semua orang menjauhinya kecuali
              istrinya yang setia, Rahmah.
            </p>

            <p className="mb-4">
              Meskipun dalam kondisi yang sangat menderita, Nabi Ayyub tidak pernah mengeluh atau mempertanyakan takdir
              Allah SWT. Beliau terus beribadah dan berdoa dengan penuh kesabaran.
            </p>

            <p className="mb-4">
              Setelah bertahun-tahun menderita, Nabi Ayyub akhirnya berdoa kepada Allah SWT:
              <br />
              <span className="italic block my-2 text-center">
                "Ya Tuhanku, sesungguhnya aku telah ditimpa penyakit dan Engkau adalah Tuhan Yang Maha Penyayang di
                antara semua penyayang."
              </span>
            </p>

            <p className="mb-4">
              Allah SWT mengabulkan doa Nabi Ayyub. Allah memerintahkan beliau untuk menghentakkan kakinya ke tanah.
              Ketika Nabi Ayyub melakukannya, muncullah mata air yang sejuk. Allah memerintahkan Nabi Ayyub untuk mandi
              dan minum dari air tersebut. Seketika itu juga, seluruh penyakit di tubuhnya sembuh.
            </p>

            <p className="mb-4">
              Allah SWT kemudian mengembalikan keluarga dan harta Nabi Ayyub, bahkan lebih banyak dari sebelumnya. Kisah
              Nabi Ayyub mengajarkan kita tentang nilai kesabaran dalam menghadapi ujian hidup dan tetap beriman kepada
              Allah SWT dalam kondisi apapun.
            </p>

            <div className="bg-blue-50 p-4 rounded-xl mt-6">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Hikmah dari Kisah Nabi Ayyub</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Kesabaran adalah kunci dalam menghadapi ujian hidup</li>
                <li>Tetap bersyukur dalam kondisi apapun</li>
                <li>Allah SWT selalu bersama orang-orang yang sabar</li>
                <li>Setelah kesulitan pasti ada kemudahan</li>
                <li>Ujian adalah cara Allah SWT menguji dan meningkatkan keimanan kita</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Home Button */}
        <div className="text-center">
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
