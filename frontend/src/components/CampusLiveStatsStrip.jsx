import { Calendar, Users, Zap } from 'lucide-react'
import { api } from '@/lib/api'
import { useFetch } from '@/hooks/useFetch'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export function CampusLiveStatsStrip() {
  const now = new Date()

  const { data: scheduleData } = useFetch(
    () => api.getSchedules({ year: now.getFullYear(), month: now.getMonth() + 1 }),
    []
  )
  const { data: lecturerData } = useFetch(() => api.getLecturers({ source: 'saintek' }), [])
  const { data: appsData } = useFetch(() => api.getApplications(), [])

  const lecturerTotal = lecturerData?.meta?.total ?? lecturerData?.data?.length ?? 0
  const appCount = appsData?.data?.length ?? 0
  const scheduleCount = (scheduleData?.data ?? []).reduce(
    (sum, day) => sum + (day.schedules?.length ?? 0),
    0
  )

  const stats = [
    { icon: Zap, value: `${appCount || 7}`, label: 'Apps' },
    { icon: Users, value: `${lecturerTotal || 40}+`, label: 'Dosen' },
    { icon: Calendar, value: `${scheduleCount}`, label: 'Jadwal' },
  ]

  return (
    <div className="mb-8 grid grid-cols-3 gap-2 sm:gap-3 md:max-w-md">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-3 text-center"
        >
          <stat.icon className="mx-auto mb-1.5 h-3.5 w-3.5 text-indigo-300/70" />
          <div className="font-display text-lg font-semibold text-white">
            <AnimatedCounter value={stat.value} />
          </div>
          <div className="text-[10px] uppercase tracking-wide text-white/35">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
