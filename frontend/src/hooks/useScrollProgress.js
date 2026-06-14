import { useLenis } from '@/providers/SmoothScrollProvider'

export function useScrollProgress() {
  const { progress } = useLenis()
  return progress
}
