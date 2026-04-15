import type { Metadata } from 'next'
import { Outfit, Inter } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dear Diary Initiatives Kenya | DISABILITY is not INABILITY',
  description:
    'Dear Diary Initiatives Kenya is a registered CBO (#09138) founded by Miss Nafisa Khanbhai. We advocate for the rights of people with disabilities, fight period poverty, and empower women across Kenya through education, art, and community action.',
  keywords: ['NGO', 'Kenya', 'disability', 'period poverty', 'women empowerment', 'Mombasa', 'Nafisa Khanbhai', 'CBO', 'sanitary pads', 'wheelchair'],
  openGraph: {
    title: 'Dear Diary Initiatives Kenya',
    description: 'Empowering communities through meals and dignity in the Turkana region.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">{children}</body>
    </html>
  )
}
