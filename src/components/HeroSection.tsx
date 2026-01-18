'use client'

import Image from 'next/image'

interface HeroSectionProps {
  images?: string[] // Array of 4 image URLs
}

export default function HeroSection({ images = [] }: HeroSectionProps) {
  // Default placeholder images if none provided
  const displayImages = [
    images[0] || 'https://images.unsplash.com/photo-1549497557-cd6b306b9967?q=80&w=2070&auto=format&fit=crop', // Saree/Fashion example
    images[1] || 'https://images.unsplash.com/photo-1543360256-4299b87f4628?q=80&w=2070&auto=format&fit=crop',
    images[2] || 'https://images.unsplash.com/photo-1605370200882-7c70c061732e?q=80&w=1974&auto=format&fit=crop',
    images[3] || 'https://images.unsplash.com/photo-1551065975-6b3a2bb60b29?q=80&w=1974&auto=format&fit=crop',
  ]

  return (
    <section className="relative w-full py-12 md:py-20 px-4">
      {/* Decorative Background Element representing the 'gate' feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-2 md:gap-8">
          {displayImages.map((src, index) => (
            <div key={index} className="group relative flex flex-col items-center">
              {/* Arch Frame */}
              <div className="relative w-full aspect-[3/5] overflow-hidden rounded-t-[50px] md:rounded-t-[100px] border border-white/20 transition-all duration-500 group-hover:border-amber-200/50 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                <Image
                  src={src}
                  alt={`Hero Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Optional Label or decorative element below */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-white/60 text-xs tracking-widest uppercase">Explore</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
