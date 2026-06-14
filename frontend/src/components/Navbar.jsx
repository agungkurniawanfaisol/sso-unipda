import { useState } from 'react'
import { Menu, X, GraduationCap } from 'lucide-react'
import { useScrollPosition } from '../hooks/useScrollPosition'

const navLinks = [
  { label: 'Applications', href: '#applications' },
  { label: 'Lecturers', href: '#lecturers' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const scrolled = useScrollPosition(20)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg text-white tracking-tight">
            UNIPDA
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#applications"
            className="ml-2 inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-all duration-200"
          >
            Explore Apps
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#applications"
              onClick={() => setMobileOpen(false)}
              className="block text-center mt-4 px-4 py-2.5 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-all"
            >
              Explore Apps
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
