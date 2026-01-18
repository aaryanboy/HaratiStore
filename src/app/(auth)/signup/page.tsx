'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/api'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Sign up with Supabase
    const { error } = await api.auth.signUp(supabase, {
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Redirect to dashboard after signup
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <div className="w-full max-w-[420px] bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl shadow-black/50">
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-white/60 text-sm">Join Harati Store today</p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-white/80 text-sm font-medium">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 focus:bg-white/15 focus:ring-4 focus:ring-indigo-500/15 transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white/80 text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 focus:bg-white/15 focus:ring-4 focus:ring-indigo-500/15 transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-white/80 text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              required
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 focus:bg-white/15 focus:ring-4 focus:ring-indigo-500/15 transition-all duration-200"
            />
            <span className="text-white/40 text-xs text-right">Must be at least 6 characters</span>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-semibold py-3.5 rounded-xl mt-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-white/10">
          <p className="text-white/60 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
