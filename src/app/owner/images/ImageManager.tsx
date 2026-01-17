'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import type { FileObject } from '@supabase/storage-js'
import styles from './ImageManager.module.css'

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

        const { error: uploadError } = await supabase
          .storage
          .from('images')
          .upload(fileName, file)

        if (uploadError) {
          throw uploadError
        }
      }

      setSuccess(`Successfully uploaded ${files.length} image(s)`)
      
      // Refresh the image list
      const { data: newImages } = await supabase
        .storage
        .from('images')
        .list('', {
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
      const { error: deleteError } = await supabase
        .storage
        .from('images')
        .remove([fileName])

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
    const { data } = supabase.storage.from('images').getPublicUrl(fileName)
    return data.publicUrl
  }

  return (
    <div className={styles.imageManager}>
      <nav className={styles.managerNav}>
        <Link href="/dashboard" className={styles.backBtn}>
          ← Back to Dashboard
        </Link>
        <h1>Image Manager</h1>
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

        <div className={styles.uploadSection}>
          <h2 className={styles.sectionTitle}>Upload Images</h2>
          <div className={styles.uploadArea}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              id="file-upload"
              className={styles.fileInput}
            />
            <label htmlFor="file-upload" className={styles.uploadLabel}>
              {uploading ? (
                <>
                  <span className={styles.uploadIcon}>⏳</span>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <span className={styles.uploadIcon}>📤</span>
                  <span>Click or drag images here to upload</span>
                  <span className={styles.uploadHint}>Supports: JPG, PNG, GIF, WebP</span>
                </>
              )}
            </label>
          </div>
        </div>

        <div className={styles.imagesSection}>
          <h2 className={styles.sectionTitle}>Uploaded Images ({images.length})</h2>
          {images.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🖼️</span>
              <p>No images uploaded yet</p>
            </div>
          ) : (
            <div className={styles.imagesGrid}>
              {images.map((image) => (
                <div key={image.name} className={styles.imageCard}>
                  <div className={styles.imagePreview}>
                    <img
                      src={getImageUrl(image.name)}
                      alt={image.name}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.imageInfo}>
                    <span className={styles.imageName}>{image.name}</span>
                    <span className={styles.imageSize}>
                      {((image.metadata?.size || 0) / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <div className={styles.imageActions}>
                    <a
                      href={getImageUrl(image.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.viewBtn}
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(image.name)}
                      disabled={deleting === image.name}
                      className={styles.deleteBtn}
                    >
                      {deleting === image.name ? 'Deleting...' : 'Delete'}
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
