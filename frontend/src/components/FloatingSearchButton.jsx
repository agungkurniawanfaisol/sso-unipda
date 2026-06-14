import { Search } from 'lucide-react'
import { usePortalSearch } from '@/providers/PortalSearchProvider'

export function FloatingSearchButton() {
  const { openSearch } = usePortalSearch()

  return (
    <button
      type="button"
      onClick={openSearch}
      className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-4 z-[60] flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white text-black shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-transform hover:scale-[1.03] md:bottom-8 md:right-8 md:h-auto md:w-auto md:gap-2 md:px-5 md:py-3 md:text-sm md:font-semibold"
      aria-label="Cari layanan"
    >
      <Search className="h-4 w-4 shrink-0" />
      <span className="hidden whitespace-nowrap md:inline">Cari layanan</span>
      <kbd className="hidden shrink-0 rounded border border-black/10 px-1.5 py-0.5 text-[10px] font-medium text-black/50 lg:inline">
        ⌘K
      </kbd>
    </button>
  )
}
