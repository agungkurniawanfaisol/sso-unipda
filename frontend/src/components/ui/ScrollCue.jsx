import { cn } from '@/lib/utils'

export function ScrollCue({ className, label = 'Scroll to explore' }) {
  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
        {label}
      </span>
      <div className="relative h-10 w-px overflow-hidden bg-white/10">
        <div className="scroll-hint absolute inset-x-0 top-0 h-3 w-full bg-gradient-to-b from-teal-400/80 to-transparent" />
      </div>
    </div>
  )
}
