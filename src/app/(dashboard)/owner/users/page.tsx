import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import UsersManager from './UsersManager'
import { api } from '@/api'

export default async function OwnerUsersPage() {
  const supabase = await createClient()

  const { data: { user } } = await api.auth.getUser(supabase)

  if (!user) {
    redirect('/login')
  }

  // Check if user is owner
  const { data: profile } = await api.users.getUserProfile(supabase, user.id)

  if (profile?.role !== 'owner') {
    redirect('/dashboard')
  }

  // Get all user profiles
  const { data: users } = await api.users.getUsers(supabase)

  return <UsersManager initialUsers={users || []} currentUserId={user.id} />
}
