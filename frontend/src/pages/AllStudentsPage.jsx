import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { api } from '@/lib/api'
import { useFetch } from '@/hooks/useFetch'
import ListPageLayout from '@/layouts/ListPageLayout'
import { StudentCard } from '@/components/students/StudentCard'
import { cn } from '@/lib/utils'

const PER_PAGE = 24

export default function AllStudentsPage() {
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim())
      setPage(1)
    }, 350)
    return () => window.clearTimeout(timer)
  }, [searchInput])

  const { data, loading, error } = useFetch(
    () => api.getStudents({ page, per_page: PER_PAGE, search: search || undefined }),
    [page, search]
  )

  const students = data?.data ?? []
  const meta = data?.meta ?? {}
  const currentPage = meta.current_page ?? page
  const lastPage = meta.last_page ?? 1
  const total = meta.total ?? students.length

  return (
    <ListPageLayout
      title="Semua Mahasiswa UNIPDA"
      subtitle="Data mahasiswa aktif diambil live dari AcaNova Office. Gunakan pencarian nama atau NIM."
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Cari nama atau NIM..."
            className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/20"
          />
        </label>
      </div>

      {!loading && !error && (
        <p className="mb-6 text-sm text-white/40">
          Total <span className="font-semibold text-white/70">{total}</span> mahasiswa
          {lastPage > 1 && (
            <>
              {' '}
              · Halaman {currentPage} dari {lastPage}
            </>
          )}
        </p>
      )}

      {error && (
        <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
          Data mahasiswa sementara tidak tersedia. Silakan coba lagi nanti.
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="glass-card h-72 animate-pulse rounded-3xl" />
          ))}
        </div>
      )}

      {!loading && !error && students.length === 0 && (
        <div className="glass-card rounded-2xl px-5 py-12 text-center text-white/45">
          Tidak ada mahasiswa yang ditemukan.
        </div>
      )}

      {!loading && !error && students.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {students.map((student, index) => (
              <StudentCard key={student.id ?? student.nim ?? index} student={student} index={index} />
            ))}
          </div>

          {lastPage > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className={cn(
                  'inline-flex cursor-pointer items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  currentPage <= 1
                    ? 'cursor-not-allowed border-white/5 text-white/25'
                    : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                Sebelumnya
              </button>
              <span className="text-sm text-white/45">
                {currentPage} / {lastPage}
              </span>
              <button
                type="button"
                disabled={currentPage >= lastPage}
                onClick={() => setPage((value) => Math.min(lastPage, value + 1))}
                className={cn(
                  'inline-flex cursor-pointer items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  currentPage >= lastPage
                    ? 'cursor-not-allowed border-white/5 text-white/25'
                    : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                )}
              >
                Selanjutnya
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </ListPageLayout>
  )
}
