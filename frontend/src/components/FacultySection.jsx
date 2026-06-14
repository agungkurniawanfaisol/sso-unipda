import { useState } from 'react'
import { ArrowUpRight, BookOpen, GraduationCap, Atom } from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { useFetch } from '@/hooks/useFetch'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const ACCENT_STYLES = {
  amber: {
    glow: 'from-amber-500/30 via-orange-500/15 to-transparent',
    badge: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    icon: 'bg-amber-500/15 text-amber-400',
    panel: 'hover:bg-amber-500/[0.06]',
    ring: 'ring-amber-400/30',
  },
  indigo: {
    glow: 'from-indigo-500/30 via-violet-500/15 to-transparent',
    badge: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
    icon: 'bg-indigo-500/15 text-indigo-400',
    panel: 'hover:bg-indigo-500/[0.06]',
    ring: 'ring-indigo-400/30',
  },
}

const ICONS = {
  fip: BookOpen,
  saintek: Atom,
}

export default function FacultySection() {
  const [hoveredId, setHoveredId] = useState(null)
  const reducedMotion = usePrefersReducedMotion()
  const { data, loading } = useFetch(() => api.getFaculties(), [])
  const faculties = data?.data ?? []

  return (
    <section id="faculties" className="chapter-accent-faculties chapter-section relative py-12 md:py-24">
      <div className="section-divider absolute inset-x-0 top-0" />

      <div className="relative mx-auto flex min-h-[80svh] max-w-7xl flex-col px-6">
        <ScrollReveal className="mb-10 md:mb-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Fakultas
          </p>
          <h2 className="font-display text-display-xl max-w-3xl text-white">
            Dua Fakultas, Satu Portal
          </h2>
        </ScrollReveal>

        {loading && (
          <div className="grid min-h-[60svh] flex-1 grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="glass-card animate-pulse rounded-3xl" />
            ))}
          </div>
        )}

        {!loading && faculties.length > 0 && (
          <div className="grid min-h-[60svh] flex-1 grid-cols-1 gap-4 md:grid-cols-2">
            {faculties.map((faculty) => {
              const styles = ACCENT_STYLES[faculty.accent] ?? ACCENT_STYLES.indigo
              const Icon = ICONS[faculty.id] ?? GraduationCap
              const isActive = hoveredId === faculty.id
              const isDimmed = hoveredId !== null && hoveredId !== faculty.id

              return (
                <motion.article
                  key={faculty.id}
                  onClick={() => setHoveredId(hoveredId === faculty.id ? null : faculty.id)}
                  onMouseEnter={() => setHoveredId(faculty.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          scale: isActive ? 1.02 : 1,
                          opacity: isDimmed ? 0.65 : 1,
                        }
                  }
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                  className={cn(
                    'group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 transition-colors duration-500 md:min-h-0 md:p-10',
                    styles.panel,
                    isActive && `ring-1 ${styles.ring}`
                  )}
                >
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0.55 }}
                    className={cn(
                      'pointer-events-none absolute inset-0 bg-gradient-to-br',
                      styles.glow
                    )}
                  />

                  <div className="relative">
                    <motion.div
                      animate={isActive && !reducedMotion ? { y: -4 } : { y: 0 }}
                      className={cn('mb-6 flex h-14 w-14 items-center justify-center rounded-2xl', styles.icon)}
                    >
                      <Icon className="h-7 w-7" />
                    </motion.div>

                    <span
                      className={cn(
                        'mb-4 inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider',
                        styles.badge
                      )}
                    >
                      {faculty.short_name}
                    </span>

                    <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                      {faculty.name}
                    </h3>
                    <p className="text-editorial mt-4 max-w-md text-white/50">{faculty.description}</p>

                    {faculty.programs?.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2 md:hidden">
                        {faculty.programs.map((program) => (
                          <span
                            key={program}
                            className="rounded-lg border border-white/[0.06] bg-black/20 px-2.5 py-1 text-[11px] text-white/55"
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    )}

                    <motion.div
                      initial={false}
                      animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                      className="hidden overflow-hidden md:block"
                    >
                      {faculty.programs?.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {faculty.programs.map((program) => (
                            <span
                              key={program}
                              className="rounded-lg border border-white/[0.06] bg-black/20 px-2.5 py-1 text-[11px] text-white/55"
                            >
                              {program}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>

                    {faculty.profile_link && (
                      <a
                        href={faculty.profile_link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white"
                      >
                        Kunjungi {faculty.short_name}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </motion.article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
