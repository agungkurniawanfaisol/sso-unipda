import { cn } from '@/lib/utils'
import { VISITOR_MODES } from '@/lib/visitorMode'
import { useVisitorMode } from '@/providers/VisitorModeProvider'

export function VisitorModeSwitcher({ className, compact = false }) {
  const { mode, setMode, modes } = useVisitorMode()

  const handleSelect = (id) => {
    setMode(id)
    const target = VISITOR_MODES[id]?.primaryHref
    if (!target) return
    window.setTimeout(() => {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  return (
    <div
      className={cn(
        'inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1',
        className
      )}
      role="tablist"
      aria-label="Mode pengunjung"
    >
      {modes.map((item) => {
        const isActive = mode === item.id
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleSelect(item.id)}
            className={cn(
              'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full px-4 py-2.5 text-xs font-semibold transition-all sm:px-4',
              compact ? 'min-h-10 px-3 py-2' : 'md:px-4',
              isActive
                ? 'bg-white text-black shadow-sm'
                : 'text-white/50 hover:text-white/80'
            )}
          >
            {compact ? item.shortLabel : item.label}
          </button>
        )
      })}
    </div>
  )
}
