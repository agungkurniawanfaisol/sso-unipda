import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useBackgroundParallax } from '../hooks/useBackgroundParallax'

export default function MainLayout({ children }) {
  const parallax = useBackgroundParallax()

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-0 mesh-bg"
        style={{ transform: `translate3d(0, ${parallax}px, 0)` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 grid-pattern"
        style={{ transform: `translate3d(0, ${parallax * 0.5}px, 0)` }}
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 z-0 grain-overlay" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
