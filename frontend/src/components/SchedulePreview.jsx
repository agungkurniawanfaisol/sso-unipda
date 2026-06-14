import { Calendar, Clock, MapPin, User, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { useFetch } from '@/hooks/useFetch'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { cn } from '@/lib/utils'

const DAY_NAMES = ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

function formatTime(value) {
  if (!value) return '—'
  return value.slice(0, 5)
}

function isToday(dateStr) {
  if (!dateStr) return false
  const today = new Date()
  const iso = today.toISOString().slice(0, 10)
  return dateStr.startsWith(iso) || dateStr === today.toLocaleDateString('id-ID')
}

export default function SchedulePreview() {
  const { ref: timelineRef, inView: timelineInView } = useInViewOnce({ rootMargin: '-10% 0px' })
  const now = new Date()
  const { data, loading, error } = useFetch(
    () => api.getSchedules({ year: now.getFullYear(), month: now.getMonth() + 1 }),
    []
  )

  const days = data?.data ?? []
  const upcoming = days
    .flatMap((day) =>
      (day.schedules ?? []).map((schedule) => ({
        ...schedule,
        date: day.date,
      }))
    )
    .slice(0, 8)

  return (
    <section id="schedules" className="chapter-accent-schedules chapter-section relative flex flex-col justify-center py-24">
      <div className="section-divider absolute inset-x-0 top-0" />

      <div className="relative mx-auto w-full max-w-4xl px-6">
        <ScrollReveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Akademik
          </p>
          <h2 className="font-display text-display-xl text-white">
            Jadwal Perkuliahan
          </h2>
          <p className="text-editorial mt-6 max-w-xl text-white/45">
            Jadwal kuliah live dari sistem AcaNova Office — diperbarui otomatis dari kampus.
          </p>
        </ScrollReveal>

        {loading && (
          <div className="mt-16 space-y-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="glass-card h-32 animate-pulse rounded-2xl" />
            ))}
          </div>
        )}

        {error && (
          <div className="mt-12 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
            Data jadwal sementara tidak tersedia. Silakan coba lagi nanti.
          </div>
        )}

        {!loading && !error && upcoming.length === 0 && (
          <div className="glass-card mt-12 rounded-2xl px-5 py-12 text-center text-white/45">
            Belum ada jadwal untuk bulan ini.
          </div>
        )}

        {!loading && !error && upcoming.length > 0 && (
          <div className="relative mt-16 md:mt-20">
            <motion.div
              ref={timelineRef}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: timelineInView ? 1 : 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-4 left-[1.125rem] top-4 w-px origin-top bg-gradient-to-b from-indigo-500/50 via-teal-500/25 to-transparent md:left-6"
            />
            <StaggerReveal className="relative space-y-8 md:space-y-10">
              {upcoming.map((item) => {
                const today = isToday(item.date)
                return (
                <StaggerItem key={`${item.id}-${item.date}`}>
                  <motion.article
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    className={cn(
                      'relative ml-0 rounded-2xl border bg-white/[0.02] p-6 pl-14 md:p-8 md:pl-16',
                      today
                        ? 'border-teal-400/30 bg-teal-500/[0.04] shadow-[0_0_24px_rgba(45,212,191,0.08)]'
                        : 'border-white/[0.06]'
                    )}
                  >
                    <div
                      className={cn(
                        'absolute left-4 top-8 h-3.5 w-3.5 rounded-full border-2 bg-[#050508] md:left-5',
                        today
                          ? 'border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.6)]'
                          : 'border-indigo-400 shadow-[0_0_16px_rgba(99,102,241,0.5)]'
                      )}
                    />

                    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-sky-300/90">
                      {today && (
                        <span className="rounded-full border border-teal-400/30 bg-teal-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-teal-300">
                          Hari Ini
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wide">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.date}
                      </span>
                      {item.day_of_week != null && (
                        <span className="text-white/35">· {DAY_NAMES[item.day_of_week] ?? ''}</span>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                      {item.subject?.nama ?? 'Mata Kuliah'}
                    </h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-white/35">
                      {item.subject?.kode_mata_kuliah}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      <div className="flex items-center gap-2 text-sm text-white/50">
                        <Clock className="h-4 w-4 shrink-0 text-indigo-400/70" />
                        {formatTime(item.start_time)} – {formatTime(item.end_time)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/50">
                        <MapPin className="h-4 w-4 shrink-0 text-teal-400/70" />
                        {item.classroom?.nama ?? item.classroom?.kode ?? '—'}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/50">
                        <User className="h-4 w-4 shrink-0 text-violet-400/70" />
                        {item.lecturer?.display_name ?? item.lecturer?.nama_lengkap ?? '—'}
                      </div>
                    </div>
                  </motion.article>
                </StaggerItem>
              )})}
            </StaggerReveal>
          </div>
        )}

        <ScrollReveal delay={0.1}>
          <a
            href="https://office.universitaspgridelta.ac.id/"
            target="_blank"
            rel="noreferrer"
            className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-white/45 transition-colors hover:text-white"
          >
            Lihat jadwal lengkap di AcaNova
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
