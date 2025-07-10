import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Soundsphere_music',
  description: 'Soundsphere_music',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
