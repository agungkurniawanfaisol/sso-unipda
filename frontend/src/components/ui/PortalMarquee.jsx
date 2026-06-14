import { api } from '@/lib/api'
import { useFetch } from '@/hooks/useFetch'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

const FALLBACK_ITEMS = [
  'AcaNova Office',
  'SIA UNIPDA',
  'Website UNIPDA',
  'Portal Saintek',
  'Brader UNIPDA',
  'Gamifikasi UNIPDA',
  'PMB UNIPDA',
]

export function PortalMarquee({ className }) {
  const reducedMotion = usePrefersReducedMotion()
  const { data } = useFetch(() => api.getApplications(), [])
  const items = (data?.data ?? []).map((app) => app.title).filter(Boolean)
  const labels = items.length > 0 ? items : FALLBACK_ITEMS
  const loop = [...labels, ...labels]

  return (
    <div
      className={cn(
        'relative overflow-hidden border-y border-white/[0.06] bg-white/[0.02] py-3 backdrop-blur-sm',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#050508] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#050508] to-transparent" />

      <div className={cn('flex w-max gap-3', reducedMotion ? 'flex-wrap justify-center px-4' : 'animate-marquee')}>
        {loop.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/55"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400/80" />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
