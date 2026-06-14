import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ScrollCue } from '@/components/ui/ScrollCue'
import { LiveStats, prefetchLiveStats } from '@/components/LiveStats'
import { useEffect } from 'react'
import { useInViewOnce } from '@/hooks/useInViewOnce'

const lines = [
  'Ide digital kampus,',
  'dihidupkan dalam',
  'satu portal.',
]

const lineVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function StatementSection() {
  const { ref: linesRef, inView: linesInView } = useInViewOnce({ rootMargin: '-15% 0px' })

  useEffect(() => {
    prefetchLiveStats()
  }, [])

  return (
    <section id="statement" className="chapter-accent-statement chapter-section relative flex min-h-[100svh] items-center py-24">
      <div className="section-divider absolute inset-x-0 top-0" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Bold Ideas, Brought to Life
          </p>
        </ScrollReveal>

        <motion.h2
          ref={linesRef}
          className="text-display-xl font-display max-w-4xl text-white"
          initial="hidden"
          animate={linesInView ? 'visible' : 'hidden'}
        >
          {lines.map((line, index) => (
            <motion.span
              key={line}
              custom={index}
              variants={lineVariant}
              className="block"
            >
              {index === lines.length - 1 ? (
                <span className="text-gradient-brand">{line}</span>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </motion.h2>

        <ScrollReveal delay={0.15}>
          <p className="text-editorial mt-10 max-w-2xl text-white/50">
            Unipda Portal menggabungkan desain, motion, dan data live — dari AcaNova
            Office hingga direktori dosen FIP & Saintek — dalam pengalaman digital yang
            terasa premium dan mudah dijelajahi.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <LiveStats />
        </ScrollReveal>

        <div className="mt-20 flex justify-center md:justify-start">
          <ScrollCue />
        </div>
      </div>
    </section>
  )
}
