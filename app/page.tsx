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
      <div className="relative w-full max-w-[1024px] aspect-[16/9] flex justify-center items-center">
        <div className="bg-[#59b3b3] rounded-[32px] w-[90%] h-[85%] relative flex p-8">
          <Image
            src="/images/owl-mascot.png"
            alt="Owl mascot"
            width={120}
            height={120}
            className="absolute w-[120px] h-auto top-[-40px] left-[-20px] z-[2] animate-bounce"
          />

          <div className="flex-1 flex items-center justify-center">
            <Image
              src="/images/students-studying.png"
              alt="Students studying"
              width={400}
              height={400}
              className="w-full max-w-[400px] h-auto object-contain"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center pl-8">
            <h1 className="text-[#ebebeb] text-4xl mb-8 font-bold text-left">Selamat datang</h1>

            {step === 1 ? (
              // Step 1: Name and School
              <form onSubmit={handleNextStep}>
                <p className="text-center text-[#dddddd] mb-4 text-base leading-relaxed font-bold">
                  Benara adalah website yang dirancang khusus untuk belajar kisah nabi dan rasul untuk anak. Web ini
                  berkarakter kids friendly.
                </p>

                <div className="w-full">
                  <input
                    type="text"
                    className="w-full py-3 px-4 border-none rounded-[24px] text-base bg-white mb-4"
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
                    className="w-full py-3 px-4 border-none rounded-[24px] text-base bg-white mb-4"
                    placeholder="Sekolah"
                    id="sekolah"
                    value={formData.sekolah}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#7946cc] text-[rgb(245,239,239)] border-none rounded-[24px] text-base cursor-pointer transition-colors duration-300 mt-4 font-bold hover:bg-[#ff8a52]"
                >
                  Lanjutkan
                </button>
              </form>
            ) : (
              // Step 2: Avatar Selection
              <form onSubmit={handleSubmit}>
                <p className="text-center text-[#dddddd] mb-4 text-base leading-relaxed font-bold">
                  Pilih avatar kamu:
                </p>

                <div className="flex justify-center gap-6 mb-6">
                  {/* Boy Avatar Option */}
                  <div
                    className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      formData.avatar === "boy" ? "scale-110 ring-4 ring-[#ff8a52] rounded-full" : ""
                    }`}
                    onClick={() => handleAvatarSelect("boy")}
                  >
                    <div className="bg-white rounded-full p-2 w-[100px] h-[100px] flex items-center justify-center">
                      <Image
                        src="/images/avatar-boy.png"
                        alt="Boy Avatar"
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-center text-white mt-2 font-medium">Laki-laki</p>
                  </div>

                  {/* Girl with Hijab Avatar Option */}
                  <div
                    className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      formData.avatar === "girl" ? "scale-110 ring-4 ring-[#ff8a52] rounded-full" : ""
                    }`}
                    onClick={() => handleAvatarSelect("girl")}
                  >
                    <div className="bg-white rounded-full p-2 w-[100px] h-[100px] flex items-center justify-center">
                      <Image
                        src="/images/avatar-girl.png"
                        alt="Girl with Hijab Avatar"
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-center text-white mt-2 font-medium">Perempuan</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 px-4 bg-[#5b8585] text-[rgb(245,239,239)] border-none rounded-[24px] text-base cursor-pointer transition-colors duration-300 mt-4 font-bold hover:bg-[#4a6e6e]"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.avatar}
                    className={`w-2/3 py-3 px-4 border-none rounded-[24px] text-base cursor-pointer transition-colors duration-300 mt-4 font-bold ${
                      formData.avatar
                        ? "bg-[#7946cc] text-[rgb(245,239,239)] hover:bg-[#ff8a52]"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                  >
                    Masuk
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
