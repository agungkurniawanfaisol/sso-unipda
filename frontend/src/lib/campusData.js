const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

export function formatTime(value) {
  if (!value) return '—'
  return value.slice(0, 5)
}

export function isToday(dateStr) {
  if (!dateStr) return false
  const today = new Date()
  const iso = today.toISOString().slice(0, 10)
  return dateStr.startsWith(iso)
}

export function getTodayLabel() {
  const now = new Date()
  return `${DAY_NAMES[now.getDay()]}, ${now.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}`
}

export function flattenSchedules(days) {
  return (days ?? []).flatMap((day) =>
    (day.schedules ?? []).map((schedule) => ({
      ...schedule,
      date: day.date,
    }))
  )
}

export function getTodaySchedules(days, limit = 4) {
  return flattenSchedules(days)
    .filter((item) => isToday(item.date))
    .slice(0, limit)
}

export function getUpcomingSchedules(days, limit = 4) {
  return flattenSchedules(days).slice(0, limit)
}
