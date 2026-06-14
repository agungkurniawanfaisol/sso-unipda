import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const ORBS = [
  { className: 'left-[8%] top-[18%] h-48 w-48 bg-indigo-500/25', delay: 0 },
  { className: 'right-[10%] top-[22%] h-56 w-56 bg-teal-500/20', delay: 0.4 },
  { className: 'left-[20%] bottom-[20%] h-40 w-40 bg-violet-500/20', delay: 0.8 },
  { className: 'right-[18%] bottom-[16%] h-44 w-44 bg-amber-500/15', delay: 1.2 },
]

export function FloatingOrbs({ className }) {
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) {
    return null
  }

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {ORBS.map((orb, index) => (
        <motion.div
          key={index}
          className={cn('absolute rounded-full blur-3xl', orb.className)}
          animate={{
            y: [0, -18, 8, 0],
            x: [0, 12, -8, 0],
            scale: [1, 1.06, 0.96, 1],
          }}
          transition={{
            duration: 10 + index * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  )
}
