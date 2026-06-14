import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full bg-white/[0.04]"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-indigo-400 via-violet-400 to-teal-400 transition-[width] duration-150 ease-out"
        style={{ width: `${Math.min(100, progress * 100)}%` }}
      />
    </div>
  )
}
