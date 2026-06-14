import { SearchTrigger } from '@/components/PortalSearchModal'
import { Search } from 'lucide-react'

export function PortalSearch({ compact = false }) {
  if (compact) {
    return (
      <SearchTrigger className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/45 transition-colors hover:border-white/20 hover:text-white/70">
        <Search className="h-4 w-4" />
      </SearchTrigger>
    )
  }

  return (
    <SearchTrigger className="hidden shrink-0 cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/45 transition-colors hover:border-white/20 hover:text-white/70 xl:inline-flex">
      <Search className="h-3.5 w-3.5" />
      <span className="whitespace-nowrap">Cari layanan</span>
      <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/30">⌘K</kbd>
    </SearchTrigger>
  )
}
