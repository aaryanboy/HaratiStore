'use client'

import { Instagram, Music } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-[#fbf6e6] border-b border-[#5e1e22]/10 py-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Empty left side for balance or search later */}
        <div className="w-24 hidden md:block" />

        <div className="text-center">
          <Link href="/" className="group">
            <h1 className="text-3xl md:text-5xl font-serif text-[#5e1e22] tracking-widest group-hover:opacity-80 transition-opacity">
              HARATI STORE
            </h1>
            <div className="h-0.5 w-1/2 mx-auto bg-gradient-to-r from-transparent via-[#5e1e22]/50 to-transparent mt-2 rounded-full" />
          </Link>
        </div>

        <div className="flex items-center gap-4 w-24 justify-end">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#5e1e22]/70 hover:text-[#5e1e22] transition-colors">
            <Instagram size={20} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[#5e1e22]/70 hover:text-[#5e1e22] transition-colors">
            <Music size={20} />
          </a>
        </div>
      </div>
    </header>
  )
}
