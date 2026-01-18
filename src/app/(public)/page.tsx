import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ReelsSection from '@/components/ReelsSection'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createClient()
  
  // Fetch site settings
  const { data: settings } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('key', ['offer_text', 'hero_images', 'video_reels', 'reel_descriptions'])

  // Parse settings
  const offerText = settings?.find(s => s.key === 'offer_text')?.value
  const heroImages = settings?.find(s => s.key === 'hero_images')?.value
  const reels = settings?.find(s => s.key === 'video_reels')?.value
  const reelDescriptions = settings?.find(s => s.key === 'reel_descriptions')?.value

  return (
    <div className="min-h-screen bg-[#5e1e22] text-[#fbf6e6]">
      {/* 
        Maroon background to match "Maha Gauri" reference. 
        Text color set to off-white/cream for contrast.
      */}
      
      <TopBar offerText={typeof offerText === 'string' ? offerText : null} />
      <Header />
      <Navbar />
      
      <main className="flex-1">
        <HeroSection images={Array.isArray(heroImages) ? heroImages : undefined} />
        
        <ReelsSection 
          videos={Array.isArray(reels) ? reels : undefined} 
          descriptions={Array.isArray(reelDescriptions) ? reelDescriptions : undefined}
        />
        
        {/* Placeholder for future sections */}
        <div className="h-40" />
      </main>
    </div>
  )
}
