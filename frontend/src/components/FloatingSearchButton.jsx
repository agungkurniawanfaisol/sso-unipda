import { Search } from 'lucide-react'
import { usePortalSearch } from '@/providers/PortalSearchProvider'

export function FloatingSearchButton() {
  const { openSearch } = usePortalSearch()

  return (
    <button
      type="button"
      onClick={openSearch}
      className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-4 z-[60] flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-3 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-transform hover:scale-[1.03] sm:right-6 md:bottom-8 md:right-8 md:px-5"
      aria-label="Buka launcher kampus"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Cari layanan</span>
      <kbd className="hidden rounded border border-black/10 px-1.5 py-0.5 text-[10px] font-medium text-black/50 md:inline">
        ⌘K
      </kbd>
    </button>
  )
}
