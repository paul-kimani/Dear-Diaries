'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Heart, LayoutDashboard, Calculator, Video, BookOpen, LogOut, X, Menu
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { href: '/admin/impact', icon: Calculator, label: 'Impact Settings' },
  { href: '/admin/videos', icon: Video, label: 'Video Library' },
  { href: '/admin/notes', icon: BookOpen, label: 'Articles' },
]

interface Props {
  userEmail: string
}

export default function AdminSidebar({ userEmail }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cta-gradient flex items-center justify-center">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <div className="font-outfit font-bold text-white text-sm">Dear Diaries</div>
            <div className="text-sand-300/60 text-xs">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-inter transition-all ${
                isActive
                  ? 'bg-cta-gradient text-white shadow-md shadow-terracotta-600/20'
                  : 'text-sand-300/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User + logout */}
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-sand-300/50 font-inter mb-3 truncate px-1">{userEmail}</div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-sand-300/70 hover:bg-red-500/20 hover:text-red-300 transition-all font-inter"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-turkana-deep flex-col z-30 border-r border-white/10">
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-10 h-10 rounded-xl bg-turkana-deep shadow-lg flex items-center justify-center text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
          <aside className="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-turkana-deep flex flex-col z-50 shadow-2xl">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  )
}
