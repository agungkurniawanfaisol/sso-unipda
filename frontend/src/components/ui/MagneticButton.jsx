import { useRef } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  type = 'button',
  target,
  rel,
  ...props
}) {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  const handleMove = (event) => {
    if (reducedMotion || !ref.current) {
      return
    }

    const rect = ref.current.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`
  }

  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform = ''
    }
  }

  const shared = {
    ref,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    whileTap: reducedMotion ? undefined : { scale: 0.98 },
    className: cn('inline-flex transition-transform duration-200 ease-out', className),
    ...props,
  }

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...shared}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} onClick={onClick} {...shared}>
      {children}
    </motion.button>
  )
}
