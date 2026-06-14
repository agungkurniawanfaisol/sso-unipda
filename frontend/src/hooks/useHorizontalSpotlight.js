import { useCallback, useEffect, useState } from 'react'

export function useHorizontalSpotlight(containerRef, itemCount, enabled = true) {
  const [activeIndex, setActiveIndex] = useState(0)

  const updateActive = useCallback(() => {
    const container = containerRef.current
    if (!container || itemCount === 0) {
      return
    }

    const items = container.querySelectorAll('[data-reel-item]')
    if (items.length === 0) {
      return
    }

    const containerCenter = container.scrollLeft + container.clientWidth / 2
    let closest = 0
    let closestDistance = Infinity

    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2
      const distance = Math.abs(containerCenter - itemCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closest = index
      }
    })

    setActiveIndex(closest)
  }, [containerRef, itemCount])

  useEffect(() => {
    if (!enabled) {
      return
    }

    const container = containerRef.current
    if (!container) {
      return
    }

    updateActive()
    container.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)

    return () => {
      container.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [containerRef, enabled, itemCount, updateActive])

  return activeIndex
}
