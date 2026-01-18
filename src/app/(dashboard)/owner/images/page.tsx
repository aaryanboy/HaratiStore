import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ImageManager from './ImageManager'
import { api } from '@/api'

export default async function OwnerImagesPage() {
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

  // Get images from bucket
  const { data: images } = await api.images.listImages(supabase, 'images', '', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    })

  return <ImageManager initialImages={images || []} />
}
