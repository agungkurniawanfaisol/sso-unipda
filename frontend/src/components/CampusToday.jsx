import { ArrowUpRight, Calendar, Clock, MapPin, Search } from 'lucide-react'
import { api } from '@/lib/api'
import { useFetch } from '@/hooks/useFetch'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CampusLiveStatsStrip } from '@/components/CampusLiveStatsStrip'
import { useVisitorMode } from '@/providers/VisitorModeProvider'
import { usePortalSearch } from '@/providers/PortalSearchProvider'
import {
  formatTime,
  getTodayLabel,
  getTodaySchedules,
  getUpcomingSchedules,
} from '@/lib/campusData'

const SHORTCUTS = [
  { label: 'SIA UNIPDA', href: 'https://sia.universitaspgridelta.ac.id/' },
  { label: 'AcaNova', href: 'https://office.universitaspgridelta.ac.id/' },
  { label: 'Saintek', href: 'https://saintek.universitaspgridelta.ac.id/' },
]

export default function CampusToday() {
  const { mode, config } = useVisitorMode()
  const { openSearch } = usePortalSearch()
  const now = new Date()

  const { data: scheduleData, loading: scheduleLoading } = useFetch(
    () => api.getSchedules({ year: now.getFullYear(), month: now.getMonth() + 1 }),
    []
  )

  const todaySchedules = getTodaySchedules(scheduleData?.data ?? [], 5)
  const fallbackSchedules = getUpcomingSchedules(scheduleData?.data ?? [], 3)
  const schedules = todaySchedules.length > 0 ? todaySchedules : fallbackSchedules

  return (
    <section id="campus-today" className="relative border-y border-white/[0.06] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300/90">
                  Kampus Hari Ini · Live
                </p>
              </div>
              <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
                {mode === 'dosen' ? 'Ringkasan kampus untuk dosen' : 'Ringkasan kampus hari ini'}
              </h2>
              <p className="text-editorial mt-2 max-w-2xl text-white/45">
                {config.description} — data diambil live dari AcaNova Office & portal Saintek.
              </p>
            </div>
            <p className="text-sm text-white/40">{getTodayLabel()}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.03}>
          <CampusLiveStatsStrip />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7">
              <div className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-sky-300" />
                  <h3 className="font-display text-lg font-semibold text-white">
                    {todaySchedules.length > 0 ? 'Jadwal hari ini' : 'Jadwal terdekat'}
                  </h3>
                </div>

                {scheduleLoading && (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-14 animate-pulse rounded-xl bg-white/[0.04]" />
                    ))}
                  </div>
                )}

                {!scheduleLoading && schedules.length === 0 && (
                  <p className="text-sm text-white/40">Belum ada jadwal untuk ditampilkan.</p>
                )}

                {!scheduleLoading && schedules.length > 0 && (
                  <ul className="space-y-3">
                    {schedules.map((item) => (
                      <li
                        key={`${item.id}-${item.date}`}
                        className="rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3"
                      >
                        <p className="font-medium text-white">{item.subject?.nama ?? 'Mata Kuliah'}</p>
                        <div className="mt-1 flex flex-wrap gap-3 text-xs text-white/45">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(item.start_time)} – {formatTime(item.end_time)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {item.classroom?.nama ?? '—'}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href="#schedules"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-sky-300/90 hover:text-sky-200"
                >
                  Lihat semua jadwal
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </ScrollReveal>

          <ScrollReveal delay={0.05} className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/10 to-teal-500/5 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Search className="h-4 w-4 text-white/70" />
                <h3 className="font-display text-lg font-semibold text-white">Launcher kampus</h3>
              </div>
              <p className="mb-4 text-sm text-white/50">
                Cari & buka SIA, AcaNova, PMB, Brader, dan layanan lain dalam hitungan detik.
              </p>

              <button
                type="button"
                onClick={openSearch}
                className="mb-4 w-full cursor-pointer rounded-xl border border-white/15 bg-white px-4 py-3 text-left text-sm font-semibold text-black transition-colors hover:bg-white/90"
              >
                Buka pencarian · ⌘K
              </button>

              <div className="mt-auto space-y-2">
                {SHORTCUTS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-black/20 px-3 py-2 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
