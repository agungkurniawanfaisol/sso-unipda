import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { api } from '@/lib/api'
import { useFetch } from '@/hooks/useFetch'
import { cacheKey, prefetch } from '@/lib/apiCache'
import ListPageLayout from '@/layouts/ListPageLayout'
import { LecturerCard } from '@/components/lecturers/LecturerCard'
import { FACULTY_TABS, filterLecturers } from '@/components/lecturers/lecturerShared'
import { cn } from '@/lib/utils'

export default function AllLecturersPage() {
  const [activeFaculty, setActiveFaculty] = useState('saintek')
  const [search, setSearch] = useState('')
  const activeTab = FACULTY_TABS.find((tab) => tab.id === activeFaculty) ?? FACULTY_TABS[0]

  const prefetchTab = (tab) => {
    prefetch(cacheKey('/lecturers', tab.params), () => api.getLecturers(tab.params))
  }

  const { data, loading, error } = useFetch(
    () => api.getLecturers(activeTab.params),
    [activeFaculty],
    { cacheKey: cacheKey('/lecturers', activeTab.params) }
  )

  const lecturers = data?.data ?? []
  const filtered = useMemo(() => filterLecturers(lecturers, search), [lecturers, search])
  const total = data?.meta?.total ?? lecturers.length

  useEffect(() => {
    FACULTY_TABS.forEach((tab) => {
      if (tab.id !== activeFaculty) {
        prefetchTab(tab)
      }
    })
  }, [activeFaculty])

  return (
    <ListPageLayout
      title="Dosen UNIPDA"
      subtitle="Data dosen FIP dari AcaNova Office dan Saintek dari portal fakultas — filter dan cari nama langsung di halaman ini."
    >
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {FACULTY_TABS.map((tab) => {
            const isActive = activeFaculty === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFaculty(tab.id)}
                onMouseEnter={() => prefetchTab(tab)}
                onFocus={() => prefetchTab(tab)}
                className={cn(
                  'inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'bg-white text-black'
                    : 'border border-white/[0.08] bg-white/[0.03] text-white/55 hover:border-white/15 hover:text-white'
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <label className="relative block w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari nama, gelar, atau keahlian..."
            className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/20"
          />
        </label>
      </div>

      {!loading && !error && (
        <p className="mb-6 text-sm text-white/40">
          {search.trim() ? (
            <>
              Menampilkan <span className="font-semibold text-white/70">{filtered.length}</span> dari{' '}
              <span className="font-semibold text-white/70">{total}</span> dosen — {activeTab.title}
            </>
          ) : (
            <>
              Total <span className="font-semibold text-white/70">{total}</span> dosen — {activeTab.title}
            </>
          )}
        </p>
      )}

      {error && (
        <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
          Data dosen sementara tidak tersedia. Silakan coba lagi nanti.
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="glass-card h-80 animate-pulse rounded-3xl" />
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="glass-card rounded-2xl px-5 py-12 text-center text-white/45">
          Tidak ada dosen yang cocok dengan pencarian.
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((lecturer, index) => (
            <LecturerCard
              key={lecturer.id ?? lecturer.public_ref ?? index}
              lecturer={lecturer}
              facultyId={activeFaculty}
              index={index}
              layout="grid"
            />
          ))}
        </div>
      )}
    </ListPageLayout>
  )
}
