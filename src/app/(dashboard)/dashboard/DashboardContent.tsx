'use client'

import { api, Profile } from '@/api'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'

interface DashboardContentProps {
  user: User
  profile: Profile | null
}

export default function DashboardContent({ user, profile }: DashboardContentProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await api.auth.signOut(supabase)
    router.push('/')
    router.refresh()
  }

  const isOwner = profile?.role === 'owner'

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <nav className="flex justify-between items-center px-8 py-4 bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="text-white text-xl font-bold">
          <h2>Harati Store</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/80 text-sm hidden md:block">{profile?.full_name || user.email}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
            isOwner 
              ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white' 
              : 'bg-indigo-500/20 text-indigo-400'
          }`}>
            {isOwner ? 'Owner' : 'Consumer'}
          </span>
          <button 
            onClick={handleLogout} 
            className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg text-sm transition-all hover:bg-red-500/20"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 md:px-8">
        <div className="mb-10">
          <h1 className="text-white text-3xl font-bold mb-2">Welcome, {profile?.full_name || 'User'}!</h1>
          <p className="text-white/60 text-base">
            You are logged in as a <strong className="text-indigo-400">{isOwner ? 'Store Owner' : 'Consumer'}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {isOwner && (
            <>
              <Link href="/owner/images" className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-amber-500/30 transition-all hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl hover:border-amber-500/50 block group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">🖼️</div>
                <h3 className="text-white text-lg font-semibold mb-2">Manage Images</h3>
                <p className="text-white/50 text-sm leading-relaxed">Upload, view, and delete images from the store</p>
              </Link>
              <Link href="/owner/users" className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-amber-500/30 transition-all hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl hover:border-amber-500/50 block group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">👥</div>
                <h3 className="text-white text-lg font-semibold mb-2">Manage Users</h3>
                <p className="text-white/50 text-sm leading-relaxed">View and manage user accounts and roles</p>
              </Link>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-amber-500/30 transition-all hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl hover:border-amber-500/50 block group cursor-pointer">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">📊</div>
                <h3 className="text-white text-lg font-semibold mb-2">Analytics</h3>
                <p className="text-white/50 text-sm leading-relaxed">View store statistics and insights</p>
              </div>
            </>
          )}

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl block group cursor-pointer">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">🛒</div>
            <h3 className="text-white text-lg font-semibold mb-2">Browse Products</h3>
            <p className="text-white/50 text-sm leading-relaxed">Explore our collection of products</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl block group cursor-pointer">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">❤️</div>
            <h3 className="text-white text-lg font-semibold mb-2">Wishlist</h3>
            <p className="text-white/50 text-sm leading-relaxed">View your saved items</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl block group cursor-pointer">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">📦</div>
            <h3 className="text-white text-lg font-semibold mb-2">Orders</h3>
            <p className="text-white/50 text-sm leading-relaxed">Track your orders and history</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <h2 className="text-white text-xl font-semibold mb-6">Your Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-white/50 text-xs uppercase tracking-wider">Email</span>
              <span className="text-white text-sm">{user.email}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/50 text-xs uppercase tracking-wider">Full Name</span>
              <span className="text-white text-sm">{profile?.full_name || 'Not set'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/50 text-xs uppercase tracking-wider">Role</span>
              <span className="text-white text-sm capitalize">{profile?.role || 'consumer'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/50 text-xs uppercase tracking-wider">User ID</span>
              <span className="text-white/60 text-xs font-mono break-all">{user.id}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
