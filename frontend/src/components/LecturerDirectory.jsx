import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { api } from '@/lib/api'
import { useFetch } from '@/hooks/useFetch'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'
import { prefetch, cacheKey } from '@/lib/apiCache'
import { LecturerCard } from '@/components/lecturers/LecturerCard'
import { FACULTY_TABS } from '@/components/lecturers/lecturerShared'

export default function LecturerDirectory() {
  const [activeFaculty, setActiveFaculty] = useState('saintek')
  const activeTab = FACULTY_TABS.find((tab) => tab.id === activeFaculty) ?? FACULTY_TABS[0]
  const params = useMemo(() => activeTab.params, [activeTab])
  const lecturerCacheKey = cacheKey('/lecturers', activeTab.params)

  const prefetchTab = (tab) => {
    prefetch(cacheKey('/lecturers', tab.params), () => api.getLecturers(tab.params))
  }

  const { data, loading, error } = useFetch(
    () => api.getLecturers(params),
    [activeFaculty],
    { cacheKey: lecturerCacheKey }
  )
  const lecturers = data?.data ?? []
  const total = data?.meta?.total ?? lecturers.length

  useEffect(() => {
    FACULTY_TABS.forEach((tab) => {
      if (tab.id !== activeFaculty) {
        prefetchTab(tab)
      }
    })
  }, [activeFaculty])

  return (
    <section id="lecturers" className="chapter-accent-lecturers chapter-section relative flex flex-col justify-center py-24">
      <div className="section-divider absolute inset-x-0 top-0" />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <ScrollReveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            SDM
          </p>
          <h2 className="font-display text-display-xl max-w-3xl text-white">
            Tim Dosen UNIPDA
          </h2>
          <p className="text-editorial mt-6 max-w-2xl text-white/45">
            Data dosen FIP diambil live dari AcaNova Office. Saintek ditampilkan dari portal fakultas.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="mb-8 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {FACULTY_TABS.map((tab) => {
                const isActive = activeFaculty === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFaculty(tab.id)}
                    onMouseEnter={() => prefetchTab(tab)}
                    onFocus={() => prefetchTab(tab)}
                    className={cn(
                      'inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300',
                      isActive
                        ? 'bg-white text-black'
                        : 'border border-white/[0.08] bg-white/[0.03] text-white/55 hover:border-white/15 hover:text-white'
                    )}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            <Link
              to="/dosen"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/45 transition-colors hover:text-teal-300"
            >
              Lihat semua dosen
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        {!loading && !error && (
          <p className="mb-6 text-sm text-white/40">
            Menampilkan <span className="font-semibold text-white/70">{total}</span> dosen —{' '}
            {activeTab.title}
          </p>
        )}

        {error && (
          <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
            Data dosen sementara tidak tersedia. Silakan coba lagi nanti.
          </div>
        )}

        {loading && (
          <div className="horizontal-reel">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="horizontal-reel-item glass-card h-80 animate-pulse rounded-3xl" />
            ))}
          </div>
        )}

        {!loading && !error && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFaculty}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              {lecturers.length === 0 ? (
                <div className="glass-card rounded-2xl px-5 py-12 text-center text-white/45">
                  Belum ada data dosen yang dapat ditampilkan.
                </div>
              ) : (
                <div className="horizontal-reel -mx-6 px-6 pb-4 md:-mx-0 md:px-0">
                  {lecturers.map((lecturer, index) => (
                    <LecturerCard
                      key={lecturer.id ?? lecturer.public_ref ?? index}
                      lecturer={lecturer}
                      facultyId={activeFaculty}
                      index={index}
                      layout="strip"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}
