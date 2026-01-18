import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardContent from './DashboardContent'
import { api } from '@/api'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await api.auth.getUser(supabase)

  if (!user) {
    redirect('/login')
  }

  // Get user profile with role
  const { data: profile } = await api.users.getUserProfile(supabase, user.id)

  return <DashboardContent user={user} profile={profile} />
}
