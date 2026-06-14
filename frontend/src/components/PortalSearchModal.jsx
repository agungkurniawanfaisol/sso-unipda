import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Building2, Cpu, GraduationCap, Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '@/lib/api'
import { prefetch, cacheKey } from '@/lib/apiCache'
import { usePortalSearch } from '@/providers/PortalSearchProvider'

const APP_ICONS = {
  'acanova-office': Building2,
  'sia-unipda': GraduationCap,
  'portal-saintek': Cpu,
}

export function PortalSearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || apps.length > 0) {
      return
    }

    const key = cacheKey('/applications', {})
    setLoading(true)
    prefetch(key, () => api.getApplications())
      .then((result) => setApps(result?.data ?? []))
      .catch(() => setApps([]))
      .finally(() => setLoading(false))
  }, [open, apps.length])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) {
      return apps.slice(0, 10)
    }
    return apps.filter(
      (app) =>
        app.title?.toLowerCase().includes(term) ||
        app.description?.toLowerCase().includes(term)
    )
  }, [apps, query])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/75 px-4 pt-[12vh] backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0f] shadow-2xl"
          >
            <div className="border-b border-white/[0.06] px-5 py-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300/80">
                Launcher Kampus UNIPDA
              </p>
              <div className="flex items-center gap-3">
                <Search className="h-4 w-4 shrink-0 text-white/40" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ketik SIA, AcaNova, Saintek, PMB..."
                  className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/30"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer rounded-lg p-1 text-white/40 hover:text-white"
                  aria-label="Tutup pencarian"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <ul className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
              {loading && (
                <li className="px-3 py-8 text-center text-sm text-white/40">Memuat aplikasi...</li>
              )}
              {!loading && filtered.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-white/40">Tidak ditemukan.</li>
              )}
              {!loading &&
                filtered.map((app) => {
                  const Icon = APP_ICONS[app.id] ?? GraduationCap
                  return (
                    <li key={app.id}>
                      <a
                        href={app.profile_link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.05]"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15">
                          <Icon className="h-4 w-4 text-indigo-300" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">{app.title}</p>
                          <p className="truncate text-xs text-white/40">{app.description}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-white/25" />
                      </a>
                    </li>
                  )
                })}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export function SearchTrigger({ className, children }) {
  const { openSearch } = usePortalSearch()

  return (
    <button type="button" onClick={openSearch} className={className}>
      {children}
    </button>
  )
}
