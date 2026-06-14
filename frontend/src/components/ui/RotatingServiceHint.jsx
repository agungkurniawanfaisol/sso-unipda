import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const HINTS = [
  'Layanan populer · klik untuk membuka',
  'SIA UNIPDA · akademik & KRS',
  'AcaNova Office · SDM & jadwal',
  'Portal Saintek · fakultas & dosen',
  'PMB UNIPDA · pendaftaran mahasiswa',
  'Brader · layanan kampus terintegrasi',
]

const INTERVAL_MS = 3200

export function RotatingServiceHint({ className }) {
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % HINTS.length)
    }, INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [reducedMotion])

  return (
    <p
      className={className}
      aria-live="polite"
    >
      {reducedMotion ? (
        HINTS[0]
      ) : (
        <span className="relative inline-flex min-h-[1.25rem] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={HINTS[index]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {HINTS[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
    </p>
  )
}
