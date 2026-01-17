import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import styles from './page.module.css'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className={styles.homeContainer}>
      <nav className={styles.homeNav}>
        <div className={styles.navBrand}>
          <h2>Harati Store</h2>
        </div>
        <div className={styles.navLinks}>
          {user ? (
            <Link href="/dashboard" className={`${styles.navBtn} ${styles.primary}`}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className={styles.navBtn}>
                Sign In
              </Link>
              <Link href="/signup" className={`${styles.navBtn} ${styles.primary}`}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Welcome to <span className={styles.gradientText}>Harati Store</span></h1>
          <p>
            Your premium destination for quality products. 
            Experience seamless shopping with our role-based platform.
          </p>
          <div className={styles.heroButtons}>
            {user ? (
              <Link href="/dashboard" className={`${styles.heroBtn} ${styles.primary}`}>
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link href="/signup" className={`${styles.heroBtn} ${styles.primary}`}>
                  Create Account
                </Link>
                <Link href="/login" className={`${styles.heroBtn} ${styles.secondary}`}>
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛡️</div>
            <h3>Role-Based Access</h3>
            <p>Secure owner and consumer accounts with different permissions</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🖼️</div>
            <h3>Image Management</h3>
            <p>Owners can upload and manage product images easily</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Fast & Secure</h3>
            <p>Built with Next.js and Supabase for optimal performance</p>
          </div>
        </div>
      </main>
    </div>
  )
}
