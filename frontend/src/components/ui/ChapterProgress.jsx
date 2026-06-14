import { useScrollSpy } from '@/hooks/useScrollSpy'
import { cn } from '@/lib/utils'

const CHAPTERS = [
  { id: 'intro', label: 'Intro' },
  { id: 'applications', label: 'Apps' },
  { id: 'campus-today', label: 'Live' },
  { id: 'statement', label: 'Statement' },
  { id: 'faculties', label: 'Faculties' },
  { id: 'lecturers', label: 'Lecturers' },
  { id: 'students', label: 'Students' },
  { id: 'schedules', label: 'Schedule' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'about', label: 'About' },
]

const chapterIds = CHAPTERS.map((c) => c.id)

export function ChapterProgress() {
  const activeId = useScrollSpy(chapterIds)

  return (
    <nav
      className="pointer-events-none fixed right-5 top-1/2 z-[55] hidden -translate-y-1/2 flex-col gap-3 md:flex"
      aria-label="Chapter progress"
    >
      {CHAPTERS.map((chapter) => {
        const isActive = activeId === chapter.id
        return (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className="pointer-events-auto group flex items-center justify-end gap-2"
            aria-label={chapter.label}
            aria-current={isActive ? 'step' : undefined}
          >
            <span
              className={cn(
                'whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.16em] transition-all duration-300',
                isActive ? 'text-white/70 opacity-100' : 'text-white/40 opacity-0 group-hover:opacity-60'
              )}
            >
              {chapter.label}
            </span>
            <span
              className={cn(
                'block rounded-full transition-all duration-300',
                isActive
                  ? 'h-6 w-1 bg-gradient-to-b from-indigo-400 to-teal-400'
                  : 'h-1.5 w-1.5 bg-white/20 group-hover:bg-white/40'
              )}
            />
          </a>
        )
      })}
    </nav>
  )
}
