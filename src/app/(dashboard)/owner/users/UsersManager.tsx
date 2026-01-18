'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { api, Profile } from '@/api'

interface UsersManagerProps {
  initialUsers: Profile[]
  currentUserId: string
}

export default function UsersManager({ initialUsers, currentUserId }: UsersManagerProps) {
  const [users, setUsers] = useState<Profile[]>(initialUsers)
  const [updating, setUpdating] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const supabase = createClient()

  const handleRoleChange = async (userId: string, newRole: 'owner' | 'consumer') => {
    if (userId === currentUserId) {
      setError("You cannot change your own role")
      return
    }

    setUpdating(userId)
    setError(null)
    setSuccess(null)

    try {
      const { error: updateError } = await api.users.updateUserRole(supabase, userId, newRole)

      if (updateError) throw updateError

      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ))
      setSuccess(`Successfully updated user role to ${newRole}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role')
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <nav className="flex items-center gap-6 px-8 py-4 bg-white/5 backdrop-blur-md border-b border-white/10">
        <Link href="/dashboard" className="text-white/60 hover:text-white text-sm transition-colors">
          ← Back to Dashboard
        </Link>
        <h1 className="text-white text-xl font-bold">User Management</h1>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 md:px-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-5 py-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-5 py-4 rounded-xl mb-6 text-sm">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <span className="text-4xl font-bold text-white mb-2 block">{users.length}</span>
            <span className="text-white/50 text-sm uppercase tracking-wider">Total Users</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <span className="text-4xl font-bold text-white mb-2 block">{users.filter(u => u.role === 'owner').length}</span>
            <span className="text-white/50 text-sm uppercase tracking-wider">Owners</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <span className="text-4xl font-bold text-white mb-2 block">{users.filter(u => u.role === 'consumer').length}</span>
            <span className="text-white/50 text-sm uppercase tracking-wider">Consumers</span>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-white text-lg font-semibold mb-5">All Users</h2>
          {users.length === 0 ? (
            <div className="text-center p-12 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-5xl block mb-4 grayscale opacity-50">👥</span>
              <p className="text-white/50 m-0">No users found</p>
            </div>
          ) : (
            <div className="w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] p-4 bg-white/5 border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-white/50">
                <span>User</span>
                <span>Role</span>
                <span>Created</span>
                <span className="text-right">Actions</span>
              </div>
              {users.map((user) => (
                <div key={user.id} className={`grid grid-cols-[2fr_1fr_1fr_1fr] p-4 items-center border-b border-white/5 hover:bg-white/5 transition-colors ${user.id === currentUserId ? 'bg-indigo-500/10' : ''}`}>
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{user.full_name || 'No name'}</span>
                    <span className="text-white/50 text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase inline-block ${
                      user.role === 'owner' 
                        ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white' 
                        : 'bg-indigo-500/20 text-indigo-400'
                    }`}>
                      {user.role}
                    </span>
                    {user.id === currentUserId && (
                      <span className="text-xs text-white/40 ml-1">(You)</span>
                    )}
                  </div>
                  <div className="text-white/60 text-sm">
                    {new Date(user.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-right">
                    {user.id !== currentUserId && (
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as 'owner' | 'consumer')}
                        disabled={updating === user.id}
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                      >
                        <option value="consumer" className="bg-gray-800">Consumer</option>
                        <option value="owner" className="bg-gray-800">Owner</option>
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
