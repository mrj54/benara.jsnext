import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { poppins, nunito } from "./fonts"

export const metadata: Metadata = {
  title: "Benara - Belajar Nabi dan Rasul",
  description: "Website belajar kisah nabi dan rasul untuk anak",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${poppins.variable} ${nunito.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
