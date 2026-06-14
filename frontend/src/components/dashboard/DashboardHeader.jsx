import { Menu, Search, Bell, User } from 'lucide-react'

export default function DashboardHeader({ onMenuToggle }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/10 bg-black/60 backdrop-blur-xl px-4 lg:px-6">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuToggle}
        className="md:hidden p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Spacer for desktop sidebar offset */}
      <div className="hidden md:block w-0" />

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80 placeholder-white/30 focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.07] transition-all"
          />
        </div>
      </div>

      {/* Right area */}
      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-400 ring-2 ring-black" />
        </button>
        <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer" aria-label="User menu">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
            <User className="w-4 h-4 text-white" />
          </div>
        </button>
      </div>
    </header>
  )
}
