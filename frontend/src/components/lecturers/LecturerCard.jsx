import { ExternalLink, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { AVATAR_GRADIENTS, FACULTY_BADGE } from './lecturerShared'
import { LecturerAvatar } from './LecturerAvatar'

export function LecturerCard({ lecturer, facultyId, index = 0, layout = 'card' }) {
  const reducedMotion = usePrefersReducedMotion()
  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]
  const specializations = lecturer.specializations ?? []
  const faculty = lecturer.faculty ?? facultyId
  const isStrip = layout === 'strip'

  return (
    <motion.article
      whileHover={reducedMotion ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={cn(
        'group flex flex-col rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5',
        isStrip && 'horizontal-reel-item w-full md:max-w-[320px]'
      )}
    >
      <LecturerAvatar lecturer={lecturer} gradient={gradient} layout={layout === 'strip' ? 'strip' : 'grid'} />

      <div className="mt-5 min-w-0 flex-1">
        {faculty && (
          <span
            className={cn(
              'mb-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
              FACULTY_BADGE[faculty] ?? FACULTY_BADGE.saintek
            )}
          >
            {faculty === 'fip' ? 'FIP' : 'Saintek'}
          </span>
        )}
        <h3 className="font-display line-clamp-2 text-lg font-semibold leading-snug text-white">
          {lecturer.name}
        </h3>
        {lecturer.credentials && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-teal-300/80">
            <GraduationCap className="h-3.5 w-3.5 shrink-0" />
            {lecturer.credentials}
          </p>
        )}
        {lecturer.program_studi && (
          <p className="mt-1 text-xs text-white/40">{lecturer.program_studi}</p>
        )}
      </div>

      {lecturer.bio && (
        <p className={cn('mt-3 text-sm leading-relaxed text-white/45', isStrip ? 'line-clamp-2' : 'line-clamp-3')}>
          {lecturer.bio}
        </p>
      )}

      {specializations.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {specializations.slice(0, isStrip ? 3 : 5).map((spec) => (
            <span
              key={spec}
              className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/55"
            >
              {spec}
            </span>
          ))}
        </div>
      )}

      {lecturer.scholar_link && (
        <a
          href={lecturer.scholar_link}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white/40 transition-colors hover:text-indigo-300"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Profil
        </a>
      )}
    </motion.article>
  )
}
