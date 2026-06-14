import { useState, useEffect } from 'react'
import { Menu, X, GraduationCap, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { cn } from '@/lib/utils'
import { PortalSearch } from './PortalSearch'

const navLinks = [
  { label: 'Intro', href: '#intro', id: 'intro', hideFrom: 'xl' },
  { label: 'Apps', href: '#applications', id: 'applications' },
  { label: 'Live', href: '#campus-today', id: 'campus-today' },
  { label: 'Fakultas', href: '#faculties', id: 'faculties' },
  { label: 'Dosen', href: '#lecturers', id: 'lecturers' },
  { label: 'Mhs', href: '#students', id: 'students', hideFrom: 'xl' },
  { label: 'Jadwal', href: '#schedules', id: 'schedules', hideFrom: 'xl' },
  { label: 'Galeri', href: '#gallery', id: 'gallery', hideFrom: 'xl' },
  { label: 'Tentang', href: '#about', id: 'about' },
]

const navSectionIds = navLinks.map((link) => link.id)

export default function Navbar({ variant = 'default' }) {
  const isMinimal = variant === 'minimal'
  const scrolled = useScrollPosition(isMinimal ? 48 : 24)
  const [mobileOpen, setMobileOpen] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const activeId = useScrollSpy(navSectionIds)

  useBodyScrollLock(mobileOpen)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isMinimal
          ? scrolled
            ? 'bg-[#050508]/60 backdrop-blur-md'
            : 'bg-transparent'
          : scrolled
            ? 'border-b border-white/[0.08] bg-[#050508]/75 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
            : 'bg-transparent'
      )}
    >
      <div
        className={cn(
          'relative mx-auto grid h-16 max-w-[100rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-6 lg:px-8',
          !isMinimal && 'h-[4.25rem] max-w-7xl'
        )}
      >
        <a href="#" className="group flex shrink-0 items-center gap-2.5">
          <div
            className={cn(
              'relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 via-violet-600 to-teal-500 transition-transform duration-300 group-hover:scale-105',
              isMinimal ? 'h-8 w-8' : 'h-10 w-10 rounded-xl shadow-lg shadow-indigo-500/20'
            )}
          >
            <GraduationCap className={cn('text-white', isMinimal ? 'h-4 w-4' : 'h-5 w-5')} />
          </div>
          <div className="leading-tight">
            <span
              className={cn(
                'font-display font-bold tracking-tight text-white',
                isMinimal ? 'text-sm' : 'text-base'
              )}
            >
              UNIPDA
            </span>
            {!isMinimal && (
              <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                Unipda Portal
              </span>
            )}
          </div>
        </a>

        <div className="hidden min-w-0 items-center justify-center md:flex">
          <nav className="flex min-w-0 items-center gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navLinks.map((link) => {
              const isActive = activeId === link.id
              const hideClass =
                link.hideFrom === 'xl'
                  ? 'hidden xl:inline-flex'
                  : link.hideFrom === 'lg'
                    ? 'hidden lg:inline-flex'
                    : 'inline-flex'

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    hideClass,
                    'relative shrink-0 px-2.5 py-2 text-xs font-medium uppercase tracking-[0.08em] transition-colors lg:px-3',
                    isMinimal && 'tracking-[0.1em]',
                    isActive ? 'text-white' : 'text-white/45 hover:text-white/80'
                  )}
                >
                  {link.label}
                  {isActive && !isMinimal ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-indigo-400 to-teal-400"
                    />
                  ) : null}
                </a>
              )
            })}
          </nav>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 lg:gap-3">
          <PortalSearch compact={isMinimal} />
          {!isMinimal ? (
            <motion.a
              href="#applications"
              whileHover={reducedMotion ? undefined : { scale: 1.03 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              className="hidden shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-white/10 transition-all hover:bg-white/90 md:inline-flex"
            >
              Jelajahi
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          ) : null}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/5 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 z-40 flex flex-col bg-[#050508]/98 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-1 flex-col justify-center px-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'border-b border-white/[0.06] py-5 font-display text-2xl font-semibold transition-colors',
                    activeId === link.id ? 'text-white' : 'text-white/40'
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#applications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                onClick={() => setMobileOpen(false)}
                className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
              >
                Jelajahi Aplikasi
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
