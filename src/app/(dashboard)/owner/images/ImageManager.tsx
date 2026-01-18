'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import type { FileObject } from '@supabase/storage-js'
import { api } from '@/api'

interface ImageManagerProps {
  initialImages: FileObject[]
}

export default function ImageManager({ initialImages }: ImageManagerProps) {
  const [images, setImages] = useState<FileObject[]>(initialImages)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setError(null)
    setSuccess(null)

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

        const { error: uploadError } = await api.images.uploadImage(supabase, 'images', fileName, file)

        if (uploadError) {
          throw uploadError
        }
      }

      setSuccess(`Successfully uploaded ${files.length} image(s)`)
      
      // Refresh the image list
      const { data: newImages } = await api.images.listImages(supabase, 'images', '', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' },
        })

      setImages(newImages || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDelete = async (fileName: string) => {
    setDeleting(fileName)
    setError(null)
    setSuccess(null)

    try {
      const { error: deleteError } = await api.images.deleteImage(supabase, 'images', fileName)

      if (deleteError) {
        throw deleteError
      }

      setImages(images.filter(img => img.name !== fileName))
      setSuccess(`Successfully deleted ${fileName}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    } finally {
      setDeleting(null)
    }
  }

  const getImageUrl = (fileName: string) => {
    const { data } = api.images.getPublicUrl(supabase, 'images', fileName)
    return data.publicUrl
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <nav className="flex items-center gap-6 px-8 py-4 bg-white/5 backdrop-blur-md border-b border-white/10">
        <Link href="/dashboard" className="text-white/60 hover:text-white text-sm transition-colors">
          ← Back to Dashboard
        </Link>
        <h1 className="text-white text-xl font-bold">Image Manager</h1>
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

        <div className="mb-12">
          <h2 className="text-white text-lg font-semibold mb-5">Upload Images</h2>
          <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors group">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              id="file-upload"
              className="hidden"
            />
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center p-12 cursor-pointer w-full h-full">
              {uploading ? (
                <>
                  <span className="text-4xl mb-4 animate-bounce">⏳</span>
                  <span className="text-white/80 text-base">Uploading...</span>
                </>
              ) : (
                <>
                  <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">📤</span>
                  <span className="text-white/80 text-base font-medium">Click or drag images here to upload</span>
                  <span className="text-white/40 text-xs mt-2">Supports: JPG, PNG, GIF, WebP</span>
                </>
              )}
            </label>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-white text-lg font-semibold mb-5">Uploaded Images ({images.length})</h2>
          {images.length === 0 ? (
            <div className="text-center p-12 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-5xl block mb-4 grayscale opacity-50">🖼️</span>
              <p className="text-white/50 m-0">No images uploaded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {images.map((image) => (
                <div key={image.name} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 group hover:border-white/20 transition-colors">
                  <div className="aspect-square overflow-hidden bg-black/20 relative">
                    <img
                      src={getImageUrl(image.name)}
                      alt={image.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <span className="text-white/90 text-xs truncate block" title={image.name}>{image.name}</span>
                    <span className="text-white/40 text-[10px]">
                      {((image.metadata?.size || 0) / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <div className="flex gap-2 p-3 pt-0">
                    <a
                      href={getImageUrl(image.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-lg text-xs font-medium text-center bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(image.name)}
                      disabled={deleting === image.name}
                      className="flex-1 py-2 rounded-lg text-xs font-medium bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {deleting === image.name ? '...' : 'Delete'}
                    </button>
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
