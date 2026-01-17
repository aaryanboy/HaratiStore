'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import styles from './DashboardContent.module.css'

interface Profile {
  id: string
  email: string
  full_name: string | null
  role: 'owner' | 'consumer'
  avatar_url: string | null
}

interface DashboardContentProps {
  user: User
  profile: Profile | null
}

export default function DashboardContent({ user, profile }: DashboardContentProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const isOwner = profile?.role === 'owner'

  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.dashboardNav}>
        <div className={styles.navBrand}>
          <h2>Harati Store</h2>
        </div>
        <div className={styles.navUser}>
          <span className={styles.userName}>{profile?.full_name || user.email}</span>
          <span className={`${styles.roleBadge} ${isOwner ? styles.owner : styles.consumer}`}>
            {isOwner ? 'Owner' : 'Consumer'}
          </span>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Sign Out
          </button>
        </div>
      </nav>

      <main className={styles.dashboardMain}>
        <div className={styles.welcomeSection}>
          <h1>Welcome, {profile?.full_name || 'User'}!</h1>
          <p>
            You are logged in as a <strong>{isOwner ? 'Store Owner' : 'Consumer'}</strong>
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {isOwner && (
            <>
              <Link href="/owner/images" className={`${styles.card} ${styles.ownerCard}`}>
                <div className={styles.cardIcon}>🖼️</div>
                <h3>Manage Images</h3>
                <p>Upload, view, and delete images from the store</p>
              </Link>
              <Link href="/owner/users" className={`${styles.card} ${styles.ownerCard}`}>
                <div className={styles.cardIcon}>👥</div>
                <h3>Manage Users</h3>
                <p>View and manage user accounts and roles</p>
              </Link>
              <div className={`${styles.card} ${styles.ownerCard}`}>
                <div className={styles.cardIcon}>📊</div>
                <h3>Analytics</h3>
                <p>View store statistics and insights</p>
              </div>
            </>
          )}

          <div className={styles.card}>
            <div className={styles.cardIcon}>🛒</div>
            <h3>Browse Products</h3>
            <p>Explore our collection of products</p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>❤️</div>
            <h3>Wishlist</h3>
            <p>View your saved items</p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>📦</div>
            <h3>Orders</h3>
            <p>Track your orders and history</p>
          </div>
        </div>

        <div className={styles.profileSection}>
          <h2>Your Profile</h2>
          <div className={styles.profileInfo}>
            <div className={styles.profileItem}>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>{user.email}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.label}>Full Name</span>
              <span className={styles.value}>{profile?.full_name || 'Not set'}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.label}>Role</span>
              <span className={styles.value}>{profile?.role || 'consumer'}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.label}>User ID</span>
              <span className={`${styles.value} ${styles.id}`}>{user.id}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
