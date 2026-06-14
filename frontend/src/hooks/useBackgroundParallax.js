import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function useBackgroundParallax() {
  const reducedMotion = usePrefersReducedMotion()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    const onScroll = () => setOffset(window.scrollY * 0.08)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [reducedMotion])

  return offset
}
