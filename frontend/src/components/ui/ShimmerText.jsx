import { cn } from '@/lib/utils'

export function ShimmerText({ children, className }) {
  return (
    <span className={cn('text-shimmer-animate inline-block', className)}>
      {children}
    </span>
  )
}
