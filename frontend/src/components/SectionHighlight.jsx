import { cn } from '@/lib/utils'
import { useVisitorMode } from '@/providers/VisitorModeProvider'

export function SectionHighlight({ sectionId, children, className }) {
  const { config } = useVisitorMode()
  const isHighlighted = config.highlightId === sectionId

  return (
    <div
      className={cn(
        className,
        isHighlighted &&
          'rounded-none ring-1 ring-inset ring-teal-400/15 shadow-[inset_0_1px_0_rgba(45,212,191,0.15)]'
      )}
    >
      {children}
    </div>
  )
}
