import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { api } from '@/api'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await api.auth.getUser(supabase)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <nav className="flex justify-between items-center p-6 md:p-12">
        <div className="text-white text-2xl font-bold">
          <h2>Harati Store</h2>
        </div>
        <div className="flex gap-3">
          {user ? (
            <Link 
              href="/dashboard" 
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 bg-gradient-to-br from-indigo-500 to-violet-500 text-white hover:-translate-y-0.5 hover:shadow-lg shadow-indigo-500/40"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link 
                href="/login" 
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-white/80 hover:text-white"
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 bg-gradient-to-br from-indigo-500 to-violet-500 text-white hover:-translate-y-0.5 hover:shadow-lg shadow-indigo-500/40"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center mb-20">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Harati Store</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Your premium destination for quality products. 
            Experience seamless shopping with our role-based platform.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {user ? (
              <Link 
                href="/dashboard" 
                className="px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 bg-gradient-to-br from-indigo-500 to-violet-500 text-white hover:-translate-y-1 hover:shadow-2xl shadow-indigo-500/40"
              >
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link 
                  href="/signup" 
                  className="px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 bg-gradient-to-br from-indigo-500 to-violet-500 text-white hover:-translate-y-1 hover:shadow-2xl shadow-indigo-500/40"
                >
                  Create Account
                </Link>
                <Link 
                  href="/login" 
                  className="px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 bg-white/10 border border-white/20 text-white hover:bg-white/15"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl shadow-black/20">
            <div className="text-5xl mb-5">🛡️</div>
            <h3 className="text-white text-xl font-semibold mb-3">Role-Based Access</h3>
            <p className="text-white/50 text-base leading-relaxed">Secure owner and consumer accounts with different permissions</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl shadow-black/20">
            <div className="text-5xl mb-5">🖼️</div>
            <h3 className="text-white text-xl font-semibold mb-3">Image Management</h3>
            <p className="text-white/50 text-base leading-relaxed">Owners can upload and manage product images easily</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl shadow-black/20">
            <div className="text-5xl mb-5">⚡</div>
            <h3 className="text-white text-xl font-semibold mb-3">Fast & Secure</h3>
            <p className="text-white/50 text-base leading-relaxed">Built with Next.js and Supabase for optimal performance</p>
          </div>
        </div>
      </main>
    </div>
  )
}
