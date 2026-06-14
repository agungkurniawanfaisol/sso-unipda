const cache = new Map()

export function prefetch(key, fetcher) {
  if (!cache.has(key)) {
    const promise = fetcher().catch((error) => {
      cache.delete(key)
      throw error
    })
    cache.set(key, promise)
  }
  return cache.get(key)
}

export function getCached(key) {
  return cache.get(key) ?? null
}

export function cacheKey(path, params = {}) {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&')
  return `${path}?${sorted}`
}
