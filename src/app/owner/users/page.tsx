import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import UsersManager from './UsersManager'

export default async function OwnerUsersPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user is owner
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'owner') {
    redirect('/dashboard')
  }

  // Get all user profiles
  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return <UsersManager initialUsers={users || []} currentUserId={user.id} />
}
