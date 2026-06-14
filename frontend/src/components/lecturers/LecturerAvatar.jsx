import { useState } from 'react'
import { cn } from '@/lib/utils'
import { getInitials } from './lecturerShared'

export function LecturerAvatar({ lecturer, gradient, layout = 'strip' }) {
  const [imageFailed, setImageFailed] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const showImage = lecturer.profile_image && !imageFailed
  const isStrip = layout === 'strip'

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.06] to-black/30 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-indigo-400/30',
        'aspect-[3/4] w-full',
        isStrip && 'mx-auto max-w-[200px]'
      )}
    >
      {!imageLoaded && showImage && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.06] to-white/[0.02]" />
      )}
      {showImage ? (
        <img
          src={lecturer.profile_image}
          alt={lecturer.name}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-contain object-center p-1 transition-opacity duration-500',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      ) : (
        <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient}`}>
          <span className="font-display text-3xl font-bold text-white">{getInitials(lecturer.name)}</span>
        </div>
      )}
    </div>
  )
}
