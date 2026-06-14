export const STUDENT_GRADIENTS = [
  'from-sky-500 to-indigo-600',
  'from-teal-500 to-emerald-600',
  'from-violet-500 to-fuchsia-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-red-600',
  'from-cyan-500 to-blue-600',
]

export function getStudentInitials(name) {
  return (name ?? 'MH')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function getStudyProgramLabel(student) {
  const program = student.study_program
  if (!program) {
    return null
  }
  if (typeof program === 'string') {
    return program
  }
  return program.nama ?? program.name ?? program.kode ?? null
}

export function getStatusLabel(status) {
  if (!status) {
    return null
  }
  const normalized = String(status).toLowerCase()
  if (normalized === 'aktif') {
    return 'Aktif'
  }
  return status
}
