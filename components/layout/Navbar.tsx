'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Menu, X, Heart } from 'lucide-react'

interface NavbarProps {
  onDonateClick: () => void
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#mission', label: 'Our Mission' },
  { href: '/financial-literacy', label: 'Financial Hub' },
  { href: '/#about', label: 'About' },
]

export default function Navbar({ onDonateClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-turkana-deep/95 backdrop-blur-md shadow-lg shadow-black/20 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-width flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-cta-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <div className="font-outfit font-bold text-white text-lg leading-none">Dear Diaries</div>
              <div className="text-sand-200 text-xs font-inter tracking-widest uppercase opacity-80">Initiative</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sand-100 hover:text-terracotta-400 font-inter text-sm font-medium tracking-wide transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Donate CTA + Mobile hamburger */}
          <div className="flex items-center gap-4">
            <button
              id="nav-donate-btn"
              onClick={onDonateClick}
              className="btn-primary text-sm py-2.5 px-6 flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" />
              Donate Now
            </button>
            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-turkana-deep/98 backdrop-blur-md border-t border-white/10 animate-slide-down">
            <div className="container-width py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sand-100 hover:text-terracotta-400 font-inter py-3 px-4 rounded-lg hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { setMobileOpen(false); onDonateClick() }}
                className="btn-primary mt-2 text-center"
              >
                Donate Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
