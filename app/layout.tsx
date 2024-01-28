"use client"
import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/icon.ico" sizes="any" />
      </head>
      
      <body>
      {children}
      </body>
    </html>
  );
}
