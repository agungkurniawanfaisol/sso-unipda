import { useEffect, useRef, useState } from 'react'

export function useInViewOnce(options = {}) {
  const { rootMargin = '200px 0px', threshold = 0 } = options
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || inView) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [inView, rootMargin, threshold])

  return { ref, inView }
}
