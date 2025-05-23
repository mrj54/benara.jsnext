"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Home, User, Info } from "lucide-react"

export default function NabiNuhPage() {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#3b82f6] to-[#1e40af] font-poppins relative overflow-x-hidden pb-20">
      <div className="container mx-auto px-4 pt-6">
        <Link
          href="/materi/ulul-azmi"
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full text-white mb-6"
        >
          <ArrowLeft size={18} />
          <span>Kembali</span>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-4 flex-grow">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative w-full md:w-1/3 aspect-square rounded-xl overflow-hidden">
              <Image
                src="/images/nabi-nuh.jpg"
                alt="Nabi Nuh"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Nabi Nuh AS</h1>
              <div className="text-white/90 space-y-4">
                <p>
                  Nabi Nuh AS adalah salah satu dari lima Nabi Ulul Azmi yang memiliki keteguhan luar biasa. Beliau
                  dikenal karena kesabarannya dalam berdakwah selama 950 tahun.
                </p>
                <p>
                  Allah SWT memerintahkan Nabi Nuh untuk membangun sebuah kapal besar untuk menyelamatkan orang-orang
                  beriman dan berbagai jenis hewan dari banjir besar yang akan melanda bumi.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Kisah Nabi Nuh</h2>
          <div className="text-white/90 space-y-4">
            <p>
              Nabi Nuh AS diutus kepada kaumnya yang menyembah berhala. Beliau mengajak mereka untuk menyembah Allah
              SWT, namun sebagian besar menolak dan mengolok-oloknya.
            </p>
            <p>
              Setelah berdakwah selama 950 tahun, hanya sedikit yang beriman. Allah kemudian memerintahkan Nabi Nuh
              untuk membangun kapal besar di atas gunung, meskipun tidak ada air di sekitarnya.
            </p>
            <p>
              Ketika kapal selesai, Allah menurunkan hujan deras selama 40 hari 40 malam yang menyebabkan banjir besar.
              Nabi Nuh, para pengikutnya, dan pasangan dari setiap jenis hewan naik ke kapal dan selamat.
            </p>
            <p>
              Salah satu putra Nabi Nuh, Kan'an, menolak naik ke kapal dan memilih untuk berlindung di gunung. Ia
              akhirnya tenggelam bersama orang-orang yang tidak beriman.
            </p>
            <p>
              Setelah banjir surut, kapal Nabi Nuh mendarat di Gunung Judi. Kisah ini mengajarkan tentang keteguhan
              iman, kesabaran, dan ketaatan kepada Allah SWT.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-navigation fixed bottom-0 left-0 right-0 py-3 md:py-4 z-50 bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-white text-center">
            <Link href="/page" className="flex flex-col items-center justify-center">
              <Home className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center justify-center">
              <User className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
            <button className="flex flex-col items-center justify-center">
              <Info className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs mt-1">Info</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}
