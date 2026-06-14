import { Suspense } from 'react'
import { useInViewOnce } from '@/hooks/useInViewOnce'

function SectionFallback({ minHeight = '40vh' }) {
  return (
    <div
      className="mx-auto max-w-7xl animate-pulse px-6 py-24"
      style={{ minHeight }}
      aria-hidden="true"
    >
      <div className="mb-6 h-3 w-24 rounded bg-white/10" />
      <div className="mb-4 h-10 max-w-md rounded bg-white/10" />
      <div className="h-4 max-w-lg rounded bg-white/5" />
    </div>
  )
}

export function LazySection({ children, minHeight, className = '' }) {
  const { ref, inView } = useInViewOnce({ rootMargin: '300px 0px' })

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <Suspense fallback={<SectionFallback minHeight={minHeight} />}>{children}</Suspense>
      ) : (
        <SectionFallback minHeight={minHeight} />
      )}
    </div>
  )
}
