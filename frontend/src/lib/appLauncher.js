const MODE_PRIORITY = {
  mahasiswa: ['sia-unipda', 'acanova-office', 'website-unipda', 'portal-saintek', 'brader-unipda', 'gamifikasi-unipda', 'pmb-unipda'],
  dosen: ['acanova-office', 'sia-unipda', 'website-unipda', 'portal-saintek', 'brader-unipda', 'gamifikasi-unipda', 'pmb-unipda'],
}

function priorityIndex(id, priorityList) {
  const index = priorityList.indexOf(id)
  return index === -1 ? 999 : index
}

export function sortAppsForMode(apps, mode = 'mahasiswa') {
  const priority = MODE_PRIORITY[mode] ?? MODE_PRIORITY.mahasiswa

  return [...apps].sort((a, b) => {
    const byMode = priorityIndex(a.id, priority) - priorityIndex(b.id, priority)
    if (byMode !== 0) {
      return byMode
    }
    if (a.featured && !b.featured) {
      return -1
    }
    if (!a.featured && b.featured) {
      return 1
    }
    return (a.title ?? '').localeCompare(b.title ?? '')
  })
}

export function splitAppsForBento(apps) {
  const featured = apps.slice(0, 3)
  const compact = apps.slice(3)
  return { featured, compact }
}
