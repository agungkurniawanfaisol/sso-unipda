import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ScrollProgress } from '../components/ui/ScrollProgress'
import { FloatingSearchButton } from '../components/FloatingSearchButton'

export default function ListPageLayout({ title, subtitle, backHref = '/', children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050508]">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.08),transparent)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 z-0 grain-overlay" aria-hidden="true" />

      <ScrollProgress />
      <FloatingSearchButton />
      <div className="relative z-10">
        <Navbar variant="minimal" />
        <main className="pb-20 pt-24 md:pt-28">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              to={backHref}
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/45 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke portal
            </Link>

            <div className="mb-10 md:mb-12">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Direktori
              </p>
              <h1 className="font-display text-display-xl max-w-3xl text-white">{title}</h1>
              {subtitle ? (
                <p className="text-editorial mt-4 max-w-2xl text-white/45">{subtitle}</p>
              ) : null}
            </div>

            {children}
          </div>
        </main>
        <Footer variant="minimal" />
      </div>
    </div>
  )
}
