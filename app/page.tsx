"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function WelcomePage() {
  const [formData, setFormData] = useState({
    nama: "",
    sekolah: "",
    avatar: "", // Added avatar field
  })
  const [step, setStep] = useState(1) // Added step for multi-step form
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleAvatarSelect = (avatar: string) => {
    setFormData((prev) => ({
      ...prev,
      avatar,
    }))
  }

  const handleNextStep = (event: React.FormEvent) => {
    event.preventDefault()
    const { nama, sekolah } = formData

    if (nama && sekolah) {
      setStep(2) // Move to avatar selection
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const { nama, sekolah, avatar } = formData

    if (nama && sekolah && avatar) {
      localStorage.setItem("nama", nama)
      localStorage.setItem("sekolah", sekolah)
      localStorage.setItem("avatar", avatar)
      router.push("/beranda")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="relative w-full max-w-[1024px] md:aspect-[16/9] flex items-center justify-center py-2 md:py-0">
        <div className="bg-[#59b3b3] rounded-[32px] w-full max-w-sm relative flex flex-col p-4 shadow-xl
                    md:w-[90%] md:h-[85%] md:flex-row md:max-w-none md:p-8">
          <Image
            src="/images/benara-logo.png"
            alt="Owl mascot"
            width={120}
            height={120}
            className="absolute w-[80px] h-auto top-[-40px] left-1/2 -translate-x-1/2 z-[2] animate-bounce
                   md:w-[120px] md:top-[-40px] md:left-[-20px] md:-translate-x-0"
          />

          <div className="flex-1 flex items-center justify-center mt-4 md:mt-0">
            <Image
              src="/images/students-studying.png"
              alt="Students studying"
              width={400}
              height={400}
              className="w-full max-w-[300px] h-auto object-contain md:max-w-[400px]"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center p-4 md:p-8 md:pl-8">
            <h1 className="text-[#ebebeb] text-2xl md:text-4xl mb-4 md:mb-8 font-bold text-center md:text-left">Selamat datang</h1>

            {step === 1 ? (
              // Step 1: Name and School
              <form onSubmit={handleNextStep} className="w-full">
                <p className="text-center text-[#dddddd] mb-4 text-sm md:text-base leading-relaxed font-bold md:text-left">
                  Benara adalah website yang dirancang khusus untuk belajar kisah nabi dan rasul untuk anak. Web ini
                  berkarakter kids friendly.
                </p>

                <div className="w-full">
                  <input
                    type="text"
                    className="w-full py-2 md:py-3 px-4 border-none rounded-[24px] text-sm md:text-base bg-white mb-4"
                    placeholder="Nama"
                    id="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    className="w-full py-2 md:py-3 px-4 border-none rounded-[24px] text-sm md:text-base bg-white mb-4"
                    placeholder="Sekolah"
                    id="sekolah"
                    value={formData.sekolah}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 md:py-3 px-4 bg-[#7946cc] text-[rgb(245,239,239)] border-none rounded-[24px] text-sm md:text-base cursor-pointer transition-colors duration-300 mt-4 font-bold hover:bg-[#ff8a52]"
                >
                  Lanjutkan
                </button>
              </form>
            ) : (
              // Step 2: Avatar Selection
              <form onSubmit={handleSubmit} className="w-full">
                <p className="text-center text-[#dddddd] mb-4 text-sm md:text-base leading-relaxed font-bold md:text-left">
                  Pilih avatar yang kamu suka!
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => handleAvatarSelect("boy")}
                    className={`p-4 rounded-2xl transition-all ${formData.avatar === "boy"
                      ? "bg-[#7946cc] scale-105"
                      : "bg-white hover:scale-105"
                      }`}
                  >
                    <Image
                      src="/images/avatar-boy.png"
                      alt="Boy Avatar"
                      width={100}
                      height={100}
                      className="w-full h-auto"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAvatarSelect("girl")}
                    className={`p-4 rounded-2xl transition-all ${formData.avatar === "girl"
                      ? "bg-[#7946cc] scale-105"
                      : "bg-white hover:scale-105"
                      }`}
                  >
                    <Image
                      src="/images/avatar-girl.png"
                      alt="Girl Avatar"
                      width={100}
                      height={100}
                      className="w-full h-auto"
                    />
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 md:py-3 px-4 bg-[#7946cc] text-[rgb(245,239,239)] border-none rounded-[24px] text-sm md:text-base cursor-pointer transition-colors duration-300 mt-4 font-bold hover:bg-[#ff8a52]"
                >
                  Mulai Belajar
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
