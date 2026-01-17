'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import styles from './UsersManager.module.css'

interface Profile {
  id: string
  email: string
  full_name: string | null
  role: 'owner' | 'consumer'
  avatar_url: string | null
  created_at: string
}

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
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)

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
    <div className={styles.usersManager}>
      <nav className={styles.managerNav}>
        <Link href="/dashboard" className={styles.backBtn}>
          ← Back to Dashboard
        </Link>
        <h1>User Management</h1>
      </nav>

      <main className={styles.managerMain}>
        {error && (
          <div className={`${styles.message} ${styles.error}`}>
            {error}
          </div>
        )}
        {success && (
          <div className={`${styles.message} ${styles.success}`}>
            {success}
          </div>
        )}

        <div className={styles.usersStats}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{users.length}</span>
            <span className={styles.statLabel}>Total Users</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{users.filter(u => u.role === 'owner').length}</span>
            <span className={styles.statLabel}>Owners</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{users.filter(u => u.role === 'consumer').length}</span>
            <span className={styles.statLabel}>Consumers</span>
          </div>
        </div>

        <div className={styles.usersSection}>
          <h2>All Users</h2>
          {users.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>👥</span>
              <p>No users found</p>
            </div>
          ) : (
            <div className={styles.usersTable}>
              <div className={styles.tableHeader}>
                <span>User</span>
                <span>Role</span>
                <span>Created</span>
                <span>Actions</span>
              </div>
              {users.map((user) => (
                <div key={user.id} className={`${styles.tableRow} ${user.id === currentUserId ? styles.current : ''}`}>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.full_name || 'No name'}</span>
                    <span className={styles.userEmail}>{user.email}</span>
                  </div>
                  <div className={styles.userRole}>
                    <span className={`${styles.roleBadge} ${styles[user.role]}`}>
                      {user.role}
                    </span>
                    {user.id === currentUserId && (
                      <span className={styles.youBadge}>You</span>
                    )}
                  </div>
                  <div className={styles.userDate}>
                    {new Date(user.created_at).toLocaleDateString()}
                  </div>
                  <div className={styles.userActions}>
                    {user.id !== currentUserId && (
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as 'owner' | 'consumer')}
                        disabled={updating === user.id}
                        className={styles.roleSelect}
                      >
                        <option value="consumer">Consumer</option>
                        <option value="owner">Owner</option>
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
