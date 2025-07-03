"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { User } from "lucide-react"

export default function LearningDashboard() {
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
    <div className="bg-[#f5f8ff] bg-[url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239ab6df' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E')] p-5 min-h-screen">
      <div className="max-w-[1200px] mx-auto bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-[-100px] right-[-100px] w-[200px] h-[200px] rounded-full bg-[rgba(91,133,133,0.1)] z-0"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-[150px] h-[150px] rounded-full bg-[rgba(114,159,177,0.1)] z-0"></div>

        {/* Header */}
        <header className="flex justify-between items-center mb-10 relative z-[1]">
          <div className="flex items-center gap-3 z-50">
            <Image
              src="/images/benara-logo.png"
              alt="Benara Logo"
              width={48}
              height={48}
              className="w-12 h-12 filter drop-shadow-md transition-all hover:rotate-[10deg]"
            />
            <span className="text-2xl font-extrabold text-[#5b8585] drop-shadow-md">Benara.</span>
          </div>
          <div className="flex items-center gap-3 z-50">
            <div className="hidden md:block text-base font-semibold text-[#555]">Halo, {userData.nama}</div>
            <Link href="/profile" className="block">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#5b8585] to-[#729fb1] flex items-center justify-center text-white text-lg shadow-[0_4px_10px_rgba(91,133,133,0.3)] cursor-pointer transition-all hover:scale-110 hover:shadow-[0_6px_15px_rgba(91,133,133,0.4)]">
                <User size={20} />
              </div>
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main>
          {/* Hero section */}
          <div className="mb-12 relative z-[1]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-[60px] h-[60px] bg-[#e8fae8] rounded-full flex items-center justify-center text-[28px] shadow-[0_8px_20px_rgba(114,159,177,0.2)] animate-[float_3s_ease-in-out_infinite]">
                ✨
              </div>
              <h1 className="text-5xl font-extrabold leading-tight text-[#5b8585] drop-shadow-md relative">
                Belajar
                <br />
                Nabi dan Rasul
                <span className="absolute w-[60px] h-[4px] bg-gradient-to-r from-[#5b8585] to-[#80b8a3] bottom-[-10px] left-0 rounded-[10px]"></span>
              </h1>
            </div>
            <p className="text-[#555] max-w-[500px] text-lg leading-relaxed mt-5">
              Pelajari tentang kehidupan, sifat, dan kisah inspiratif para nabi yang dapat menjadi teladan dalam
              kehidupan kita sehari-hari.
            </p>
          </div>

          {/* Course grid - first row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 relative z-[1]">
            {/* Card 1 */}
            <div className="rounded-[24px] p-6 cursor-pointer transition-all overflow-hidden relative shadow-[0_8px_20px_rgba(0,0,0,0.1)] h-full flex flex-col bg-gradient-to-br from-[#729fb1] to-[#5bc8ac] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]">
              <div className="overflow-hidden rounded-2xl mb-4 relative shadow-[0_4px_10px_rgba(0,0,0,0.1)] h-[200px] w-[200px] mx-auto bg-white flex items-center justify-center p-2">
                <Image
                  src="/images/course-1.jpg"
                  alt="Pengertian Nabi dan Rasul"
                  width={300}
                  height={140}
                  className="w-full h-full object-contain max-w-full max-h-full p-0 rounded-xl transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col gap-3 mt-auto">
                <h3 className="text-2xl font-bold text-white mt-auto relative pb-2 after:content-[''] after:absolute after:w-[40px] after:h-[3px] after:bg-[rgba(255,255,255,0.5)] after:bottom-0 after:left-0 after:rounded-[10px]">
                  Pengertian Nabi & Rasul
                </h3>
                <Link
                  href="/materi/pengertian"
                  className="bg-[rgba(255,255,255,0.25)] border-2 border-[rgba(255,255,255,0.5)] rounded-[20px] py-2 px-4 text-sm font-bold text-white text-center transition-all backdrop-blur-[5px] inline-block mt-2 hover:bg-[rgba(255,255,255,0.4)] hover:-translate-y-[3px] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]"
                >
                  Ayo Belajar!
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-[24px] p-6 cursor-pointer transition-all overflow-hidden relative shadow-[0_8px_20px_rgba(0,0,0,0.1)] h-full flex flex-col bg-gradient-to-br from-[#80b8a3] to-[#5086c8] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]">
              <div className="overflow-hidden rounded-2xl mb-4 relative shadow-[0_4px_10px_rgba(0,0,0,0.1)] h-[200px] w-[200px] mx-auto bg-white flex items-center justify-center p-2">
                <Image
                  src="/images/course-2.jpg"
                  alt="Nama-nama Nabi dan Rasul"
                  width={300}
                  height={140}
                  className="w-full h-full object-contain max-w-full max-h-full p-0 rounded-xl transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col gap-3 mt-auto">
                <h3 className="text-2xl font-bold text-white mt-auto relative pb-2 after:content-[''] after:absolute after:w-[40px] after:h-[3px] after:bg-[rgba(255,255,255,0.5)] after:bottom-0 after:left-0 after:rounded-[10px]">
                  Nama Nama Nabi & Rasul
                </h3>
                <Link
                  href="/materi/nama-nama-nabi"
                  className="bg-[rgba(255,255,255,0.25)] border-2 border-[rgba(255,255,255,0.5)] rounded-[20px] py-2 px-4 text-sm font-bold text-white text-center transition-all backdrop-blur-[5px] inline-block mt-2 hover:bg-[rgba(255,255,255,0.4)] hover:-translate-y-[3px] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]"
                >
                  Ayo Belajar!
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-[24px] p-6 cursor-pointer transition-all overflow-hidden relative shadow-[0_8px_20px_rgba(0,0,0,0.1)] h-full flex flex-col bg-gradient-to-br from-[#9c94e0] to-[#d096e0] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]">
              <div className="overflow-hidden rounded-2xl mb-4 relative shadow-[0_4px_10px_rgba(0,0,0,0.1)] h-[200px] w-[200px] mx-auto bg-white flex items-center justify-center p-2">
                <Image
                  src="/images/course-3.jpg"
                  alt="Sifat-sifat Nabi dan Rasul"
                  width={300}
                  height={140}
                  className="w-full h-full object-contain max-w-full max-h-full p-0 rounded-xl transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col gap-3 mt-auto">
                <h3 className="text-2xl font-bold text-white mt-auto relative pb-2 after:content-[''] after:absolute after:w-[40px] after:h-[3px] after:bg-[rgba(255,255,255,0.5)] after:bottom-0 after:left-0 after:rounded-[10px]">
                  Sifat Sifat Nabi & Rasul
                </h3>
                <Link
                  href="/materi/sifat"
                  className="bg-[rgba(255,255,255,0.25)] border-2 border-[rgba(255,255,255,0.5)] rounded-[20px] py-2 px-4 text-sm font-bold text-white text-center transition-all backdrop-blur-[5px] inline-block mt-2 hover:bg-[rgba(255,255,255,0.4)] hover:-translate-y-[3px] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]"
                >
                  Ayo Belajar!
                </Link>
              </div>
            </div>
          </div>

          {/* Course grid - second row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-[1] mb-6">
            {/* Card 4 */}
            <div className="rounded-[24px] p-6 cursor-pointer transition-all overflow-hidden relative shadow-[0_8px_20px_rgba(0,0,0,0.1)] h-full flex flex-col bg-gradient-to-br from-[#699bab] to-[#c8b350] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]">
              <div className="overflow-hidden rounded-2xl mb-4 relative shadow-[0_4px_10px_rgba(0,0,0,0.1)] h-[200px] w-[200px] mx-auto bg-white flex items-center justify-center p-2">
                <Image
                  src="/images/course-4.jpg"
                  alt="Kisah Rasul Ulul Azmi"
                  width={300}
                  height={140}
                  className="w-full h-full object-contain max-w-full max-h-full p-0 rounded-xl transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col gap-3 mt-auto">
                <h3 className="text-2xl font-bold text-white mt-auto relative pb-2 after:content-[''] after:absolute after:w-[40px] after:h-[3px] after:bg-[rgba(255,255,255,0.5)] after:bottom-0 after:left-0 after:rounded-[10px]">
                  Kisah Rasul Ulul Azmi
                </h3>
                <Link
                  href="/materi/ulul-azmi"
                  className="bg-[rgba(255,255,255,0.25)] border-2 border-[rgba(255,255,255,0.5)] rounded-[20px] py-2 px-4 text-sm font-bold text-white text-center transition-all backdrop-blur-[5px] inline-block mt-2 hover:bg-[rgba(255,255,255,0.4)] hover:-translate-y-[3px] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]"
                >
                  Ayo Belajar!
                </Link>
              </div>
            </div>

            {/* Card 5 */}
            <div className="rounded-[24px] p-6 cursor-pointer transition-all overflow-hidden relative shadow-[0_8px_20px_rgba(0,0,0,0.1)] h-full flex flex-col bg-gradient-to-br from-[#658ace] to-[#50b4c8] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]">
              <div className="overflow-hidden rounded-2xl mb-4 relative shadow-[0_4px_10px_rgba(0,0,0,0.1)] h-[200px] w-[200px] mx-auto bg-white flex items-center justify-center p-2">
                <Image
                  src="/images/course-6.jpg"
                  alt="Ayo Berlatih"
                  width={300}
                  height={140}
                  className="w-full h-full object-contain max-w-full max-h-full p-0 rounded-xl transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col gap-3 mt-auto">
                <h3 className="text-2xl font-bold text-white mt-auto relative pb-2 after:content-[''] after:absolute after:w-[40px] after:h-[3px] after:bg-[rgba(255,255,255,0.5)] after:bottom-0 after:left-0 after:rounded-[10px]">
                  Ayo Berlatih!!!
                </h3>
                <Link
                  href="/materi/quiz"
                  className="bg-[rgba(255,255,255,0.25)] border-2 border-[rgba(255,255,255,0.5)] rounded-[20px] py-2 px-4 text-sm font-bold text-white text-center transition-all backdrop-blur-[5px] inline-block mt-2 hover:bg-[rgba(255,255,255,0.4)] hover:-translate-y-[3px] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]"
                >
                  Ayo Belajar!
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
