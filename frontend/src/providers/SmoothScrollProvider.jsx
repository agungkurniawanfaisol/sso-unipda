import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const ScrollContext = createContext({ lenis: null, progress: 0 })

export function useLenis() {
  return useContext(ScrollContext)
}

function useCoarseMobile() {
  const [coarseMobile, setCoarseMobile] = useState(false)

  useEffect(() => {
    const pointer = window.matchMedia('(pointer: coarse)')
    const narrow = window.matchMedia('(max-width: 768px)')
    const update = () => setCoarseMobile(pointer.matches && narrow.matches)
    update()
    pointer.addEventListener('change', update)
    narrow.addEventListener('change', update)
    return () => {
      pointer.removeEventListener('change', update)
      narrow.removeEventListener('change', update)
    }
  }, [])

  return coarseMobile
}

export function SmoothScrollProvider({ children }) {
  const reducedMotion = usePrefersReducedMotion()
  const coarseMobile = useCoarseMobile()
  const useSmoothScroll = !reducedMotion && !coarseMobile
  const lenisRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!useSmoothScroll) {
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    let frame = 0
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const onScroll = (lenis) => {
      setProgress(lenis.progress ?? (lenis.limit > 0 ? lenis.scroll / lenis.limit : 0))
      window.dispatchEvent(new Event('scroll'))
    }
    lenis.on('scroll', onScroll)
    onScroll(lenis)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [useSmoothScroll])

  useEffect(() => {
    if (useSmoothScroll) {
      return
    }

    const onScroll = () => {
      const limit = document.documentElement.scrollHeight - window.innerHeight
      setProgress(limit > 0 ? window.scrollY / limit : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [useSmoothScroll])

  const value = useMemo(() => ({ lenis: lenisRef.current, progress }), [progress])

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}
