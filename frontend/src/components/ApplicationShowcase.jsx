import { useMemo, useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Monitor,
  Filter,
  ArrowUpRight,
} from 'lucide-react'
import { api } from '@/lib/api'
import { useFetch } from '@/hooks/useFetch'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useHorizontalSpotlight } from '@/hooks/useHorizontalSpotlight'
import {
  CARD_GRADIENTS,
  FACULTY_LABELS,
  getAppIcon,
} from '@/components/apps/appShared'

const categories = [
  { id: 'all', label: 'Semua', icon: Filter },
  { id: 'web', label: 'Web', icon: Monitor },
]

function buildTags(app) {
  const tags = []
  if (app.category) tags.push(categories.find((c) => c.id === app.category)?.label ?? app.category)
  if (app.faculty) tags.push(FACULTY_LABELS[app.faculty] ?? app.faculty)
  tags.push('UNIPDA')
  return tags
}

export default function ApplicationShowcase() {
  const reelRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const reducedMotion = usePrefersReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const params = useMemo(
    () => (activeCategory === 'all' ? {} : { category: activeCategory }),
    [activeCategory]
  )

  const { data, loading, error } = useFetch(() => api.getApplications(params), [activeCategory])
  const applications = data?.data ?? []
  const activeIndex = useHorizontalSpotlight(
    reelRef,
    applications.length,
    !reducedMotion && !isMobile && applications.length > 0
  )

  return (
    <section id="applications" className="chapter-accent-apps chapter-section relative flex flex-col justify-center py-24">
      <div className="section-divider absolute inset-x-0 top-0" />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <ScrollReveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Featured Work
          </p>
          <h2 className="font-display text-display-xl max-w-3xl text-white">
            Ekosistem Digital Kampus
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="mb-8 mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      'inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                      isActive
                        ? 'bg-white text-black'
                        : 'border border-white/[0.08] bg-white/[0.03] text-white/55 hover:border-white/15 hover:text-white'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {cat.label}
                  </button>
                )
              })}
            </div>
            <p className="hidden text-xs uppercase tracking-[0.18em] text-white/30 md:block">
              Scroll / drag to explore
            </p>
          </div>
        </ScrollReveal>

        {error && (
          <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
            Data aplikasi sementara tidak tersedia.
          </div>
        )}

        {loading && (
          <div className="horizontal-reel px-0">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="horizontal-reel-item glass-card h-[min(70vh,520px)] animate-pulse rounded-3xl" />
            ))}
          </div>
        )}

        {!loading && applications.length === 0 && (
          <div className="glass-card rounded-2xl px-5 py-12 text-center text-white/45">
            Tidak ada aplikasi untuk kategori ini.
          </div>
        )}

        {!loading && applications.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div ref={reelRef} className="horizontal-reel horizontal-reel--stack pb-4">
                {applications.map((app, index) => {
                  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length]
                  const AppIcon = getAppIcon(app.id)
                  const tags = buildTags(app)
                  const isSpotlight = index === activeIndex

                  return (
                    <motion.article
                      key={app.id ?? index}
                      data-reel-item
                      animate={
                        reducedMotion || isMobile
                          ? undefined
                          : {
                              scale: isSpotlight ? 1.04 : 0.93,
                              opacity: isSpotlight ? 1 : 0.5,
                              filter: isSpotlight
                                ? 'blur(0px) saturate(1)'
                                : 'blur(3px) saturate(0.55)',
                            }
                      }
                      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                      className={cn(
                        'horizontal-reel-item group relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl border bg-white/[0.02] transition-shadow duration-500 md:h-[min(70vh,520px)]',
                        isSpotlight
                          ? 'border-white/15 shadow-[0_24px_48px_rgba(0,0,0,0.35)]'
                          : 'border-white/[0.06]'
                      )}
                    >
                      <div className="relative flex flex-1 items-end overflow-hidden">
                        {app.image_url ? (
                          <img
                            src={app.image_url}
                            alt={app.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div
                            className={cn(
                              'absolute inset-0 flex items-center justify-center bg-gradient-to-br',
                              gradient
                            )}
                          >
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                              <AppIcon className="h-10 w-10 text-white/70" />
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />

                        <div className="relative w-full p-8 md:p-10">
                          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">
                            {tags.join(' • ')}
                          </p>
                          <h3 className="font-display text-3xl font-semibold text-white md:text-4xl">
                            {app.title}
                          </h3>
                          <p className="text-editorial mt-3 max-w-lg text-white/55">
                            {app.description}
                          </p>
                          {app.profile_link && (
                            <a
                              href={app.profile_link}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.12]"
                            >
                              Buka Aplikasi
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}
