'use client'

interface TopBarProps {
  offerText?: string | null
}

export default function TopBar({ offerText }: TopBarProps) {
  if (!offerText) return null

  return (
    <div className="bg-[#4a0404] text-white py-1.5 px-4 overflow-hidden relative">
      <div className="animate-marquee inline-block text-xs font-medium tracking-wide">
        {offerText}
      </div>
    </div>
  )
}
