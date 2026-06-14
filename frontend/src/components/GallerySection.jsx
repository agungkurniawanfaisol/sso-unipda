import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Expand, X } from 'lucide-react'
import { useFetch } from '@/hooks/useFetch'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { fetchGallery, filterGalleryItems } from '@/lib/galleryData'
import { cn } from '@/lib/utils'

function GalleryImage({ item, className, onClick }) {
  const [failed, setFailed] = useState(false)

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] text-left',
        className
      )}
    >
      {!failed ? (
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full min-h-[200px] w-full items-center justify-center bg-gradient-to-br from-indigo-950 to-teal-950 p-6">
          <p className="text-center text-sm text-white/50">{item.title}</p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <p className="font-display text-base font-semibold text-white md:text-lg">{item.title}</p>
        {item.caption ? (
          <p className="mt-1 line-clamp-2 text-xs text-white/55 md:text-sm">{item.caption}</p>
        ) : null}
      </div>
      <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        <Expand className="h-4 w-4" />
      </span>
    </button>
  )
}

function GalleryLightbox({ item, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0f]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-sm transition-colors hover:text-white"
          aria-label="Tutup"
        >
          <X className="h-4 w-4" />
        </button>

        <img
          src={item.image}
          alt={item.title}
          className="max-h-[70vh] w-full object-contain bg-black/40"
        />

        <div className="border-t border-white/[0.08] p-5 md:p-6">
          <p className="font-display text-xl font-semibold text-white">{item.title}</p>
          {item.caption ? <p className="mt-2 text-sm text-white/55">{item.caption}</p> : null}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function GallerySection() {
  const { data, loading, error } = useFetch(() => fetchGallery(), [])
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxItem, setLightboxItem] = useState(null)

  const categories = data?.categories ?? [{ id: 'all', label: 'Semua' }]
  const items = filterGalleryItems(data?.items ?? [], activeCategory)

  return (
    <section id="gallery" className="chapter-accent-gallery chapter-section relative py-16 md:py-24">
      <div className="section-divider absolute inset-x-0 top-0" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Galeri
          </p>
          <h2 className="font-display text-display-xl max-w-3xl text-white">
            {data?.title ?? 'Galeri Kampus'}
          </h2>
          {data?.subtitle ? (
            <p className="text-editorial mt-4 max-w-2xl text-white/50">{data.subtitle}</p>
          ) : null}
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors',
                  activeCategory === category.id
                    ? 'border-white/25 bg-white text-black'
                    : 'border-white/10 bg-white/[0.04] text-white/50 hover:border-white/20 hover:text-white/80'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {loading && (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  'animate-pulse rounded-2xl bg-white/[0.04]',
                  index === 0 ? 'sm:col-span-2 sm:row-span-2 min-h-[320px]' : 'min-h-[200px]'
                )}
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="mt-10 text-sm text-white/45">Galeri sementara tidak dapat dimuat.</p>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="mt-10 text-sm text-white/45">Belum ada foto di kategori ini.</p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="mt-10 grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => (
              <ScrollReveal
                key={item.id}
                delay={index * 0.04}
                className={cn(item.featured && 'sm:col-span-2 sm:row-span-2')}
              >
                <GalleryImage
                  item={item}
                  onClick={() => setLightboxItem(item)}
                  className={cn('h-full min-h-[200px]', item.featured && 'min-h-[320px]')}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxItem ? (
          <GalleryLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  )
}
