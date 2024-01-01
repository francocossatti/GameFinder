"use client"
import Footer from '@/components/Footer'
import '../styles/globals.css'
import { ThemeProvider } from "next-themes"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider enableSystem={true} attribute="class">
          {children}
          <Footer />
        </ThemeProvider>
        </body>
    </html>
  )
}
