const GALLERY_URL = '/gallery/gallery.json'

export async function fetchGallery() {
  const response = await fetch(GALLERY_URL)
  if (!response.ok) {
    throw new Error(`Galeri tidak dapat dimuat (${response.status})`)
  }
  return normalizeGallery(await response.json())
}

export function normalizeGallery(payload) {
  const items = (payload?.items ?? []).filter((item) => item?.image)
  const categories = payload?.categories ?? [{ id: 'all', label: 'Semua' }]

  return {
    title: payload?.title ?? 'Galeri Kampus',
    subtitle: payload?.subtitle ?? '',
    categories,
    items,
  }
}

export function filterGalleryItems(items, categoryId) {
  if (!categoryId || categoryId === 'all') {
    return items
  }
  return items.filter((item) => item.category === categoryId)
}
