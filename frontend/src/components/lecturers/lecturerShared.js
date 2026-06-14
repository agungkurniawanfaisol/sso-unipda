export const AVATAR_GRADIENTS = [
  'from-indigo-500 to-violet-600',
  'from-teal-500 to-cyan-600',
  'from-violet-500 to-purple-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-blue-600',
  'from-rose-500 to-pink-600',
]

export const FACULTY_TABS = [
  {
    id: 'saintek',
    label: 'Saintek',
    title: 'Fakultas Sains dan Teknologi',
    params: { source: 'saintek' },
  },
  {
    id: 'fip',
    label: 'FIP',
    title: 'Fakultas Ilmu Pendidikan',
    params: { source: 'office', faculty: 'fip' },
  },
]

export const FACULTY_BADGE = {
  fip: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
  saintek: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
}

export function getInitials(name) {
  return (name ?? 'UN')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function filterLecturers(lecturers, query) {
  const term = query.trim().toLowerCase()
  if (!term) {
    return lecturers
  }

  return lecturers.filter((lecturer) => {
    const haystack = [
      lecturer.name,
      lecturer.credentials,
      lecturer.bio,
      ...(lecturer.specializations ?? []),
      lecturer.program_studi,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return haystack.includes(term)
  })
}
