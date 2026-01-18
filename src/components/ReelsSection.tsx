'use client'

import { useState, useRef } from 'react'

interface ReelsSectionProps {
  videos?: string[]
  descriptions?: string[]
}

export default function ReelsSection({ videos = [], descriptions = [] }: ReelsSectionProps) {
  const displayItems = [0, 1].map(index => ({
    src: videos[index],
    desc: descriptions[index]
  })).filter(item => item.src)

  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const handlePlayClick = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      // Pause other videos
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index) {
          v.pause()
        }
      })
      
      if (playingIndex === index) {
        video.pause()
        setPlayingIndex(null)
      } else {
        video.play()
        setPlayingIndex(index)
      }
    }
  }

  const handleVideoEnd = (index: number) => {
    if (playingIndex === index) {
      setPlayingIndex(null)
    }
  }

  if (displayItems.length === 0) return null

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fbf6e6] via-[#f5edd8] to-[#fbf6e6]" />
      
      {/* Decorative pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235e1e22' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#5e1e22]/40" />
            <span className="text-[#5e1e22]/60 text-sm font-medium tracking-[0.3em] uppercase">
              Exclusive
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#5e1e22]/40" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#5e1e22] mb-4 tracking-tight">
            New Collection
          </h2>
          
          <p className="text-[#5e1e22]/70 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Discover our latest handcrafted kurtha designs, woven with tradition and modern elegance
          </p>
        </div>

        {/* Reels Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {displayItems.map((item, index) => (
            <div 
              key={index} 
              className="group relative w-full max-w-sm"
            >
              {/* Card Container */}
              <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(94,30,34,0.25)] overflow-hidden transform transition-all duration-500 hover:shadow-[0_30px_80px_-15px_rgba(94,30,34,0.35)] hover:-translate-y-2">
                
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-3 -left-8 w-20 h-6 bg-[#5e1e22] rotate-45 opacity-90" />
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-3 -right-8 w-20 h-6 bg-[#5e1e22] -rotate-45 opacity-90" />
                </div>

                {/* Video Container */}
                <div className="relative aspect-[9/16] bg-gradient-to-br from-[#3d1315] to-[#5e1e22] overflow-hidden">
                  <video 
                    ref={el => { videoRefs.current[index] = el }}
                    src={item.src}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    playsInline
                    muted
                    loop
                    onEnded={() => handleVideoEnd(index)}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                  
                  {/* Play button overlay */}
                  <button
                    onClick={() => handlePlayClick(index)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
                    aria-label={playingIndex === index ? 'Pause video' : 'Play video'}
                  >
                    <div className={`
                      relative w-20 h-20 rounded-full 
                      bg-white/20 backdrop-blur-sm 
                      border-2 border-white/40
                      flex items-center justify-center
                      transition-all duration-300
                      ${playingIndex === index ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}
                      group-hover/play:opacity-100 group-hover/play:scale-110 group-hover/play:bg-white/30
                    `}>
                      {/* Play icon */}
                      <svg 
                        className="w-8 h-8 text-white ml-1" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      
                      {/* Pulse animation ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping opacity-75" />
                    </div>
                  </button>

                  {/* Reel indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                    </svg>
                    <span className="text-white text-xs font-medium">Reel</span>
                  </div>
                </div>

                {/* Description Area */}
                {item.desc && (
                  <div className="relative p-6 bg-gradient-to-br from-[#5e1e22] to-[#4a171a]">
                    {/* Decorative element */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[#d4a574] to-transparent" />
                    
                    <p className="text-[#fbf6e6] text-center font-medium text-lg leading-relaxed">
                      {item.desc}
                    </p>
                    
                    {/* Shop Now Link */}
                    <div className="mt-4 flex justify-center">
                      <button className="group/btn flex items-center gap-2 text-[#d4a574] hover:text-[#fbf6e6] transition-colors duration-300 text-sm font-medium tracking-wide">
                        <span>View Collection</span>
                        <svg 
                          className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating badge for first item */}
              {index === 0 && (
                <div className="absolute -top-3 -right-3 z-20">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-[#d4a574] to-[#c49660] text-[#3d1315] text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      NEW
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#d4a574] to-[#c49660] rounded-full animate-ping opacity-30" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="flex items-center justify-center mt-12 md:mt-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5e1e22]/30" />
            <span className="w-3 h-3 rounded-full bg-[#5e1e22]/50" />
            <span className="w-2 h-2 rounded-full bg-[#5e1e22]/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
