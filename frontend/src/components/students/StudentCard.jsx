import { useState } from 'react'
import { BookOpen, Hash } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { getStatusLabel, getStudentInitials, getStudyProgramLabel, STUDENT_GRADIENTS } from './studentShared'

export function StudentCard({ student, index = 0, layout = 'card' }) {
  const reducedMotion = usePrefersReducedMotion()
  const [imageFailed, setImageFailed] = useState(false)
  const gradient = STUDENT_GRADIENTS[index % STUDENT_GRADIENTS.length]
  const showImage = student.photo && !imageFailed
  const program = getStudyProgramLabel(student)
  const status = getStatusLabel(student.status)
  const isStrip = layout === 'strip'

  return (
    <motion.article
      whileHover={reducedMotion ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={cn(
        'group flex flex-col rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5',
        isStrip && 'horizontal-reel-item w-full md:max-w-[300px]'
      )}
    >
      <div
        className={cn(
          'relative flex w-full items-center justify-center overflow-hidden rounded-2xl ring-1 ring-white/10',
          isStrip ? 'h-28' : 'h-32'
        )}
      >
        {showImage ? (
          <img
            src={student.photo}
            alt={student.name}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient}`}>
            <span className="font-display text-3xl font-bold text-white">{getStudentInitials(student.name)}</span>
          </div>
        )}
      </div>

      <div className="mt-5 min-w-0 flex-1">
        {status && (
          <span className="mb-2 inline-flex rounded-full border border-sky-500/25 bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky-300">
            {status}
          </span>
        )}
        <h3 className="font-display line-clamp-2 text-lg font-semibold leading-snug text-white">
          {student.name ?? 'Mahasiswa'}
        </h3>
        {student.nim && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-white/45">
            <Hash className="h-3.5 w-3.5 shrink-0" />
            {student.nim}
          </p>
        )}
      </div>

      <div className="mt-4 space-y-2 text-xs text-white/45">
        {program && (
          <p className="flex items-start gap-1.5">
            <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-300/80" />
            <span className="line-clamp-2">{program}</span>
          </p>
        )}
        {student.semester != null && (
          <p>
            Semester <span className="font-semibold text-white/70">{student.semester}</span>
          </p>
        )}
        {student.entry_year && (
          <p>
            Angkatan <span className="font-semibold text-white/70">{student.entry_year}</span>
          </p>
        )}
      </div>
    </motion.article>
  )
}
