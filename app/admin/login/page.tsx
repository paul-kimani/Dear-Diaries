'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Heart, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0D2B3E] via-[#0E4484] to-[#0D2B3E] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-terracotta-400 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-accent-orange blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-cta-gradient flex items-center justify-center mx-auto mb-4 shadow-lg shadow-terracotta-600/30">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="font-outfit font-bold text-white text-2xl">Admin Dashboard</h1>
          <p className="text-sand-300/70 text-sm mt-1 font-inter">Dear Diaries Initiative</p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sand-200 text-xs font-medium mb-2 font-inter">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-300/60" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="paul@deardiaries.org"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-terracotta-400 focus:bg-white/15 transition-all font-inter"
                />
              </div>
            </div>

            <div>
              <label className="block text-sand-200 text-xs font-medium mb-2 font-inter">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-300/60" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-12 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-terracotta-400 focus:bg-white/15 transition-all font-inter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/15 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm font-inter text-center">
                {error}
              </div>
            )}

            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sand-300/50 text-xs mt-6 font-inter">
          Admin access only · Dear Diaries Initiative
        </p>
      </div>
    </main>
  )
}
