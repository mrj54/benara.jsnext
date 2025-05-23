"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Home, User, LogOut, Calendar, Clock, Award, ChevronRight, BarChart2, BookOpen } from "lucide-react"

type QuizResult = {
  username: string
  no: number
  tanggal: string
  score: number
  hours: string
  minutes: string
}

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    nama: "",
    sekolah: "",
    avatar: "", // Added avatar field
  })
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([])
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "settings">("overview")
  const [totalScore, setTotalScore] = useState(0)
  const [averageScore, setAverageScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [completedQuizzes, setCompletedQuizzes] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const nama = localStorage.getItem("nama")
    const sekolah = localStorage.getItem("sekolah")
    const avatar = localStorage.getItem("avatar") || "owl" // Default to owl if no avatar selected

    if (!nama || !sekolah) {
      router.push("/")
      return
    }

    setUserData({ nama, sekolah, avatar })

    // Get quiz history from localStorage
    const storedHistory = localStorage.getItem("quizHistory")
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory) as QuizResult[]
        setQuizHistory(parsedHistory.sort((a, b) => b.no - a.no)) // Sort by newest first

        // Calculate statistics
        if (parsedHistory.length > 0) {
          const total = parsedHistory.reduce((sum, item) => sum + item.score, 0)
          const best = Math.max(...parsedHistory.map((item) => item.score))
          setTotalScore(total)
          setAverageScore(Math.round(total / parsedHistory.length))
          setBestScore(best)
          setCompletedQuizzes(parsedHistory.length)
        }
      } catch (error) {
        console.error("Error parsing quiz history:", error)
      }
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("nama")
    localStorage.removeItem("sekolah")
    // Don't remove avatar so it persists across sessions
    router.push("/")
  }

  // Get avatar image based on selection
  const getAvatarImage = () => {
    switch (userData.avatar) {
      case "boy":
        return "/images/avatar-boy.png"
      case "girl":
        return "/images/avatar-girl.png"
      default:
        return "/images/owl-mascot.png"
    }
  }

  // Calculate progress based on completed quizzes
  const calculateProgress = () => {
    // Assuming 10 is the total number of possible quizzes
    const totalPossibleQuizzes = 10
    return Math.min(Math.round((completedQuizzes / totalPossibleQuizzes) * 100), 100)
  }

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date)
    } catch (error) {
      return dateString
    }
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

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with user info */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border-2 border-[#93c5fd] mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 relative">
            <div className="absolute top-0 right-0 p-4">
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-full text-white"
              >
                <LogOut size={20} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white">
                <Image
                  src={getAvatarImage() || "/placeholder.svg"}
                  alt="User Avatar"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white">{userData.nama}</h1>
                <p className="text-blue-100">{userData.sekolah}</p>

                <div className="mt-4 bg-white/20 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-white h-full rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                </div>
                <p className="text-sm text-blue-100 mt-1">Progress Belajar: {calculateProgress()}%</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
                activeTab === "history"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("history")}
            >
              Riwayat Quiz
            </button>
            <button
              className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
                activeTab === "settings"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Pengaturan
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-20">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-4 flex flex-col items-center justify-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-gray-500 text-sm">Skor Terbaik</p>
                  <p className="text-2xl font-bold text-blue-600">{bestScore}</p>
                </div>

                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-4 flex flex-col items-center justify-center">
                  <div className="bg-green-100 p-3 rounded-full mb-3">
                    <BarChart2 className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-gray-500 text-sm">Rata-rata</p>
                  <p className="text-2xl font-bold text-green-600">{averageScore}</p>
                </div>

                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-4 flex flex-col items-center justify-center">
                  <div className="bg-purple-100 p-3 rounded-full mb-3">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-gray-500 text-sm">Quiz Selesai</p>
                  <p className="text-2xl font-bold text-purple-600">{completedQuizzes}</p>
                </div>

                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-4 flex flex-col items-center justify-center">
                  <div className="bg-yellow-100 p-3 rounded-full mb-3">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <p className="text-gray-500 text-sm">Total Skor</p>
                  <p className="text-2xl font-bold text-yellow-600">{totalScore}</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Aktivitas Terbaru</h2>

                {quizHistory.length > 0 ? (
                  <div className="space-y-4">
                    {quizHistory.slice(0, 3).map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Award className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Quiz #{result.no}</p>
                            <p className="text-sm text-gray-500">{formatDate(result.tanggal)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">{result.score} poin</p>
                        </div>
                      </div>
                    ))}

                    <button
                      className="w-full py-2 text-blue-600 font-medium flex items-center justify-center gap-1 hover:bg-blue-50 rounded-xl transition-colors"
                      onClick={() => setActiveTab("history")}
                    >
                      Lihat Semua <ChevronRight size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Belum ada aktivitas quiz</p>
                    <Link
                      href="/materi/quiz"
                      className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                      Mulai Quiz
                    </Link>
                  </div>
                )}
              </div>

              {/* Recommended Content */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Rekomendasi Materi</h2>

                <div className="space-y-3">
                  <Link
                    href="/materi/ulul-azmi"
                    className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 p-2 rounded-full">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                      </div>
                      <p className="font-medium text-gray-800">Nabi Ulul Azmi</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-indigo-600" />
                  </Link>

                  <Link
                    href="/materi/sifat"
                    className="flex items-center justify-between p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <BookOpen className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="font-medium text-gray-800">Sifat-sifat Nabi</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-green-600" />
                  </Link>

                  <Link
                    href="/materi/kisah-inspirasi"
                    className="flex items-center justify-between p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                      </div>
                      <p className="font-medium text-gray-800">Kisah Inspirasi Nabi</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-600" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Riwayat Quiz</h2>

              {quizHistory.length > 0 ? (
                <div className="space-y-4">
                  {quizHistory.map((result, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="p-4 md:flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                                result.score >= 80
                                  ? "bg-green-500"
                                  : result.score >= 60
                                    ? "bg-blue-500"
                                    : result.score >= 40
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                              }`}
                            >
                              {Math.floor(result.score / 10)}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800">Quiz #{result.no}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar size={14} />
                                <span>{formatDate(result.tanggal)}</span>
                                <Clock size={14} className="ml-2" />
                                <span>{result.hours}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-4 md:w-32 text-center ${
                            result.score >= 80
                              ? "bg-green-50 text-green-700"
                              : result.score >= 60
                                ? "bg-blue-50 text-blue-700"
                                : result.score >= 40
                                  ? "bg-yellow-50 text-yellow-700"
                                  : "bg-red-50 text-red-700"
                          }`}
                        >
                          <div className="text-2xl font-bold">{result.score}</div>
                          <div className="text-sm">Skor</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Belum ada riwayat quiz</p>
                  <Link
                    href="/materi/quiz"
                    className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                  >
                    Mulai Quiz
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Pengaturan Akun</h2>

              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-xl">
                  <h3 className="font-medium text-gray-800 mb-2">Informasi Pribadi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Nama</label>
                      <input
                        type="text"
                        value={userData.nama}
                        readOnly
                        className="w-full p-2 bg-gray-100 rounded-lg text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Sekolah</label>
                      <input
                        type="text"
                        value={userData.sekolah}
                        readOnly
                        className="w-full p-2 bg-gray-100 rounded-lg text-gray-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Avatar Selection */}
                <div className="p-4 border border-gray-200 rounded-xl">
                  <h3 className="font-medium text-gray-800 mb-4">Avatar</h3>
                  <div className="flex justify-center gap-6">
                    {/* Boy Avatar Option */}
                    <div
                      className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        userData.avatar === "boy" ? "scale-110" : ""
                      }`}
                      onClick={() => {
                        localStorage.setItem("avatar", "boy")
                        setUserData({ ...userData, avatar: "boy" })
                      }}
                    >
                      <div
                        className={`bg-white rounded-full p-2 w-[80px] h-[80px] flex items-center justify-center border-4 ${
                          userData.avatar === "boy" ? "border-blue-500" : "border-transparent"
                        }`}
                      >
                        <Image
                          src="/images/avatar-boy.png"
                          alt="Boy Avatar"
                          width={60}
                          height={60}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-center text-gray-700 mt-2 font-medium">Laki-laki</p>
                    </div>

                    {/* Girl with Hijab Avatar Option */}
                    <div
                      className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        userData.avatar === "girl" ? "scale-110" : ""
                      }`}
                      onClick={() => {
                        localStorage.setItem("avatar", "girl")
                        setUserData({ ...userData, avatar: "girl" })
                      }}
                    >
                      <div
                        className={`bg-white rounded-full p-2 w-[80px] h-[80px] flex items-center justify-center border-4 ${
                          userData.avatar === "girl" ? "border-pink-500" : "border-transparent"
                        }`}
                      >
                        <Image
                          src="/images/avatar-girl.png"
                          alt="Girl with Hijab Avatar"
                          width={60}
                          height={60}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-center text-gray-700 mt-2 font-medium">Perempuan</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Bar */}
        <div className="fixed bottom-4 left-0 right-0 px-4 z-20">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-2 max-w-md mx-auto">
            <div className="flex justify-around items-center">
              <Link
                href="/page"
                className="flex flex-col items-center gap-1 p-3 text-gray-500 rounded-xl transition-all hover:bg-[#eff6ff] hover:-translate-y-1"
              >
                <Home className="w-6 h-6" />
                <span className="text-xs font-medium">Home</span>
              </Link>
              <Link
                href="/profile"
                className="flex flex-col items-center gap-1 p-3 text-blue-600 rounded-xl transition-all hover:bg-[#eff6ff] hover:-translate-y-1 bg-[#eff6ff]"
              >
                <User className="w-6 h-6" />
                <span className="text-xs font-medium">Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
