import { useMemo } from 'react'
import { api } from '@/lib/api'
import { useFetch } from '@/hooks/useFetch'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { prefetch, cacheKey } from '@/lib/apiCache'

export function LiveStats() {
  const now = new Date()
  const lecturerKey = cacheKey('/lecturers', { source: 'saintek' })
  const scheduleKey = cacheKey('/schedules', {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  })
  const appsKey = cacheKey('/applications', {})

  const { data: lecturerData } = useFetch(
    () => api.getLecturers({ source: 'saintek' }),
    [],
    { cacheKey: lecturerKey }
  )
  const { data: scheduleData } = useFetch(
    () => api.getSchedules({ year: now.getFullYear(), month: now.getMonth() + 1 }),
    [],
    { cacheKey: scheduleKey }
  )
  const { data: appsData } = useFetch(() => api.getApplications(), [], { cacheKey: appsKey })

  const stats = useMemo(() => {
    const lecturerTotal = lecturerData?.meta?.total ?? lecturerData?.data?.length ?? 0
    const scheduleDays = scheduleData?.data ?? []
    const scheduleCount = scheduleDays.reduce(
      (sum, day) => sum + (day.schedules?.length ?? 0),
      0
    )
    const appCount = appsData?.data?.length ?? 0

    return [
      { value: '2', label: 'Fakultas' },
      { value: `${appCount || 7}+`, label: 'Aplikasi' },
      { value: `${lecturerTotal || 40}+`, label: 'Dosen Saintek' },
      { value: `${scheduleCount || 0}`, label: 'Jadwal Bulan Ini' },
    ]
  }, [lecturerData, scheduleData, appsData])

  return (
    <div className="mt-16 flex flex-wrap gap-10 border-t border-white/[0.06] pt-12 md:gap-14">
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="font-display text-4xl font-semibold text-white md:text-5xl">
            <AnimatedCounter value={stat.value} />
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.15em] text-white/40">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

export function prefetchLiveStats() {
  const now = new Date()
  prefetch(cacheKey('/lecturers', { source: 'saintek' }), () =>
    api.getLecturers({ source: 'saintek' })
  )
  prefetch(cacheKey('/schedules', { year: now.getFullYear(), month: now.getMonth() + 1 }), () =>
    api.getSchedules({ year: now.getFullYear(), month: now.getMonth() + 1 })
  )
  prefetch(cacheKey('/applications', {}), () => api.getApplications())
}
