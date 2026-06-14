import { cn } from '@/lib/utils'

const ACCENTS = {
  indigo: 'border-indigo-500/25 bg-indigo-500/10 text-indigo-300',
  emerald: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
  sky: 'border-sky-500/25 bg-sky-500/10 text-sky-300',
  amber: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
  violet: 'border-violet-500/25 bg-violet-500/10 text-violet-300',
}

export function SectionHeader({ badge, title, description, accent = 'indigo', align = 'left', className }) {
  const isCenter = align === 'center'

  return (
    <div className={cn('mb-10 max-w-2xl', isCenter && 'mx-auto text-center', className)}>
      {badge && (
        <span
          className={cn(
            'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-4',
            ACCENTS[accent] ?? ACCENTS.indigo
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
          {badge}
        </span>
      )}
      <h2 className="text-section font-display mb-3 text-white">{title}</h2>
      {description && (
        <p className="text-sm leading-relaxed text-white/48 md:text-[15px]">{description}</p>
      )}
    </div>
  )
}
