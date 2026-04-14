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
  title: 'Dear Diaries Initiative | Empowering Disadvantaged Communities',
  description:
    'We serve all disadvantaged individuals — with a special focus on women who cannot afford sanitary pads in Turkana, disabled people, and anyone who needs financial literacy to budget their way to a better life.',
  keywords: ['NGO', 'Kenya', 'sanitary pads', 'disability', 'women empowerment', 'financial literacy', 'Turkana', 'disadvantaged'],
  openGraph: {
    title: 'Dear Diaries Initiative',
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
