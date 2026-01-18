'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Upload, X, Loader2 } from 'lucide-react'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [offerText, setOfferText] = useState('')
  const [heroImages, setHeroImages] = useState<string[]>(['', '', '', ''])
  const [reels, setReels] = useState<string[]>(['', ''])
  const [reelDescriptions, setReelDescriptions] = useState<string[]>(['', ''])
  const [uploadingReels, setUploadingReels] = useState<boolean[]>([false, false])
  const [uploadingState, setUploadingState] = useState<boolean[]>([false, false, false, false])
  const [message, setMessage] = useState('')

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .in('key', ['offer_text', 'hero_images', 'video_reels', 'reel_descriptions'])

      if (error) throw error

      if (data) {
        const text = data.find(item => item.key === 'offer_text')?.value
        if (typeof text === 'string') setOfferText(text)

        const images = data.find(item => item.key === 'hero_images')?.value
        if (Array.isArray(images)) {
          const newImages = [...images]
          while (newImages.length < 4) newImages.push('')
          setHeroImages(newImages.slice(0, 4))
        }

        const videoReels = data.find(item => item.key === 'video_reels')?.value
        if (Array.isArray(videoReels)) {
            const newReels = [...videoReels]
            while (newReels.length < 2) newReels.push('')
            setReels(newReels.slice(0, 2))
        }

        const descs = data.find(item => item.key === 'reel_descriptions')?.value
        if (Array.isArray(descs)) {
            const newDescs = [...descs]
            while (newDescs.length < 2) newDescs.push('')
            setReelDescriptions(newDescs.slice(0, 2))
        }
      }
    } catch (err) {
      console.error('Error fetching settings:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
        const { error: err1 } = await supabase
            .from('site_settings')
            .upsert({ key: 'offer_text', value: offerText })
        if (err1) throw err1

        const { error: err2 } = await supabase
            .from('site_settings')
            .upsert({ key: 'hero_images', value: heroImages })
        if (err2) throw err2

        const { error: err3 } = await supabase
            .from('site_settings')
            .upsert({ key: 'video_reels', value: reels })
        if (err3) throw err3

        const { error: err4 } = await supabase
            .from('site_settings')
            .upsert({ key: 'reel_descriptions', value: reelDescriptions })
        if (err4) throw err4

        setMessage('Settings saved successfully!')
        router.refresh()
    } catch (err: any) {
        console.error('Error saving settings:', err)
        setMessage('Failed to save settings: ' + err.message)
    } finally {
        setSaving(false)
    }
  }

  const handleReelDescriptionChange = (index: number, value: string) => {
      const newDescs = [...reelDescriptions]
      newDescs[index] = value
      setReelDescriptions(newDescs)
  }

  const handleReelUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `reel_${index}_${Date.now()}.${fileExt}`
    const filePath = `reels/${fileName}`

    const newUploading = [...uploadingReels]
    newUploading[index] = true
    setUploadingReels(newUploading)

    try {
        const { error: uploadError } = await supabase.storage
            .from('site_assets')
            .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
            .from('site_assets')
            .getPublicUrl(filePath)

        const newReels = [...reels]
        newReels[index] = publicUrl
        setReels(newReels)
        
    } catch (error: any) {
        console.error('Error uploading video:', error)
        alert('Error uploading video: ' + error.message)
    } finally {
        const newUploading = [...uploadingReels]
        newUploading[index] = false
        setUploadingReels(newUploading)
    }
  }

  const removeReel = (index: number) => {
    const newReels = [...reels]
    newReels[index] = ''
    setReels(newReels)
  }

  const handleFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `hero_${index}_${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const newUploading = [...uploadingState]
    newUploading[index] = true
    setUploadingState(newUploading)

    try {
        const { error: uploadError } = await supabase.storage
            .from('site_assets')
            .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
            .from('site_assets')
            .getPublicUrl(filePath)

        const newImages = [...heroImages]
        newImages[index] = publicUrl
        setHeroImages(newImages)
        
    } catch (error: any) {
        console.error('Error uploading image:', error)
        alert('Error uploading image: ' + error.message)
    } finally {
        const newUploading = [...uploadingState]
        newUploading[index] = false
        setUploadingState(newUploading)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...heroImages]
    newImages[index] = ''
    setHeroImages(newImages)
  }

  if (loading) return <div className="p-8 text-white flex items-center gap-2"><Loader2 className="animate-spin" /> Loading settings...</div>

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Site Settings</h1>

      <form onSubmit={handleSave} className="space-y-8">
        {message && (
          <div className={`p-4 rounded-xl ${message.includes('Failed') ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
            {message}
          </div>
        )}

        {/* Offer Text */}
        <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Top Bar Offer</h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/60">Announcement Text</label>
            <input
              type="text"
              value={offerText}
              onChange={(e) => setOfferText(e.target.value)}
              placeholder="e.g., FREE SHIPPING ON ORDERS OVER $50"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </section>

        {/* Hero Images */}
        <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Hero Images</h2>
          <p className="text-sm text-white/60 mb-6">Upload 4 images for the arched frames on the homepage. Recommended aspect ratio: 3:5 (Portrait).</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {heroImages.map((url, index) => (
              <div key={index} className="flex flex-col gap-3">
                <span className="text-xs text-white/50 uppercase tracking-widest font-bold">Slot {index + 1}</span>
                
                <div className="relative aspect-[3/5] w-full bg-black/20 rounded-xl border-2 border-dashed border-white/10 overflow-hidden group hover:border-indigo-500/50 transition-colors">
                    {uploadingState[index] ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                            <Loader2 className="animate-spin text-white" size={24} />
                        </div>
                    ) : null}

                    {url ? (
                        <>
                            <Image 
                                src={url} 
                                alt={`Slot ${index + 1}`} 
                                fill 
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button 
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"
                                    title="Remove Image"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
                            <Upload className="text-white/40 mb-2" size={24} />
                            <span className="text-xs text-white/40">Upload Image</span>
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => handleFileUpload(index, e)}
                            />
                        </label>
                    )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Reels */}
        <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">New Kurtha Reels</h2>
          <p className="text-sm text-white/60 mb-6">Upload 2 vertical videos (Reels) to be displayed on the homepage.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reels.map((url, index) => (
              <div key={index} className="flex flex-col gap-3">
                <span className="text-xs text-white/50 uppercase tracking-widest font-bold">Video Reel {index + 1}</span>
                
                <div className="relative aspect-[9/16] w-full max-w-[200px] mx-auto bg-black/20 rounded-xl border-2 border-dashed border-white/10 overflow-hidden group hover:border-indigo-500/50 transition-colors">
                    {uploadingReels[index] ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                            <Loader2 className="animate-spin text-white" size={24} />
                        </div>
                    ) : null}

                    {url ? (
                        <>
                            <video 
                                src={url} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button 
                                    type="button"
                                    onClick={() => removeReel(index)}
                                    className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"
                                    title="Remove Video"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
                            <Upload className="text-white/40 mb-2" size={24} />
                            <span className="text-xs text-white/40">Upload Video</span>
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="video/*"
                                onChange={(e) => handleReelUpload(index, e)}
                            />
                        </label>
                    )}
                </div>

                <div className="mt-2">
                    <label className="text-xs text-white/50 mb-1 block">Description / Caption</label>
                    <input
                      type="text"
                      value={reelDescriptions[index]}
                      onChange={(e) => handleReelDescriptionChange(index, e.target.value)}
                      placeholder="e.g. New Summer Arrival"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
                <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={18} /> Saving...
                </span>
            ) : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
