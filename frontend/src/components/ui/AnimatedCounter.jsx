import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

function parseValue(value) {
  const match = String(value).match(/^(\d+)(.*)$/)
  if (!match) {
    return { number: null, suffix: String(value) }
  }

  return { number: Number(match[1]), suffix: match[2] ?? '' }
}

export function AnimatedCounter({ value, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reducedMotion = usePrefersReducedMotion()
  const { number, suffix } = parseValue(value)
  const [display, setDisplay] = useState(number ?? value)

  useEffect(() => {
    if (!inView || number === null || reducedMotion) {
      setDisplay(value)
      return
    }

    let frame = 0
    const totalFrames = 36
    const timer = window.setInterval(() => {
      frame += 1
      const progress = frame / totalFrames
      const eased = 1 - (1 - progress) ** 3
      setDisplay(Math.round(number * eased))

      if (frame >= totalFrames) {
        window.clearInterval(timer)
        setDisplay(number)
      }
    }, 16)

    return () => window.clearInterval(timer)
  }, [inView, number, reducedMotion, value])

  return (
    <motion.span ref={ref} className={className} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }}>
      {number === null ? value : `${display}${suffix}`}
    </motion.span>
  )
}
