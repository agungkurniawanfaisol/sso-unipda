import { useEffect, useMemo, useState, useCallback } from 'react'
import { useLenis } from '@/providers/SmoothScrollProvider'

export function useScrollSpy(sectionIds, rootMargin = '-42% 0px -42% 0px') {
  const idsKey = useMemo(() => sectionIds.join(','), [sectionIds])
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')
  const { lenis } = useLenis()

  const updateActive = useCallback(() => {
    const viewportCenter = window.innerHeight * 0.42
    let bestId = sectionIds[0]
    let bestDistance = Number.POSITIVE_INFINITY

    for (const id of sectionIds) {
      const section = document.getElementById(id)
      if (!section) {
        continue
      }

      const rect = section.getBoundingClientRect()
      const sectionCenter = rect.top + rect.height / 2
      const distance = Math.abs(sectionCenter - viewportCenter)

      if (rect.bottom > 0 && rect.top < window.innerHeight && distance < bestDistance) {
        bestDistance = distance
        bestId = id
      }
    }

    setActiveId(bestId)
  }, [sectionIds])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (sections.length === 0) {
      return
    }

    const ratios = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio)
        })

        let bestId = sectionIds[0]
        let bestRatio = 0

        for (const id of sectionIds) {
          const ratio = ratios.get(id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }

        if (bestRatio > 0) {
          setActiveId(bestId)
        } else {
          updateActive()
        }
      },
      {
        rootMargin,
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
      }
    )

    sections.forEach((section) => observer.observe(section))
    updateActive()

    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [idsKey, rootMargin, sectionIds, updateActive, lenis])

  return activeId
}
