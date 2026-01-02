import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SoundVerse.ai',
  description: 'AI-powered music creation interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload PowerGrotesk fonts for better loading performance */}
        <link
          rel="preload"
          href="/fonts/PTF-PowerGrotesk-Trial Fonts/PTF-PowerGrotesk-Trial Fonts/PowerGroteskTrial-WOFF2+HTML/PowerGroteskTrial-Heavy.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/PTF-PowerGrotesk-Trial Fonts/PTF-PowerGrotesk-Trial Fonts/PowerGroteskTrial-WOFF2+HTML/PowerGroteskTrial-UltraBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/PTF-PowerGrotesk-Trial Fonts/PTF-PowerGrotesk-Trial Fonts/PowerGroteskTrial-WOFF2+HTML/PowerGroteskTrial-Black.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}