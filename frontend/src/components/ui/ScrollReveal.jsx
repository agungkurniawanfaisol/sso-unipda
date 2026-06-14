import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useInViewOnce } from '@/hooks/useInViewOnce'

export function ScrollReveal({ children, delay = 0, className, y = 28, rootMargin = '-40px 0px' }) {
  const { ref, inView } = useInViewOnce({ rootMargin })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y, scale: 0.98 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerReveal({ children, className, stagger = 0.08, rootMargin = '-40px 0px' }) {
  const { ref, inView } = useInViewOnce({ rootMargin })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
