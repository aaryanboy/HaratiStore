'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { name: 'NEW', href: '/collections/new' },
    { name: 'COLLECTIONS', href: '/collections' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'BEST SELLER', href: '/collections/best-seller' },
    { name: 'SALE', href: '/collections/sale' },
  ]

  return (
    <nav className="bg-[#fbf6e6] py-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-center px-4">
        <div className="flex gap-8 md:gap-12 min-w-max border-y border-black/80 py-3 px-12">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[10px] md:text-xs font-medium tracking-[0.2em] transition-all hover:text-black ${
                pathname === link.href ? 'text-black' : 'text-black/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
