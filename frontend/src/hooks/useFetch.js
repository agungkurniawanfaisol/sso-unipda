import { useEffect, useState } from 'react'
import { getCached } from '@/lib/apiCache'

export function useFetch(fetcher, deps = [], options = {}) {
  const { cacheKey } = options
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        if (cacheKey) {
          const cached = getCached(cacheKey)
          if (cached) {
            const result = await cached
            if (!cancelled) {
              setData(result)
              setLoading(false)
            }
            return
          }
        }

        const result = await fetcher()
        if (!cancelled) {
          setData(result)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err)
          setData(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, deps)

  return { data, loading, error }
}
