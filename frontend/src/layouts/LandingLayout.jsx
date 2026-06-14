import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ScrollProgress } from '../components/ui/ScrollProgress'
import { ChapterProgress } from '../components/ui/ChapterProgress'
import { FloatingSearchButton } from '../components/FloatingSearchButton'

export default function LandingLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050508]">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.08),transparent)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 z-0 grain-overlay" aria-hidden="true" />

      <ScrollProgress />
      <ChapterProgress />
      <FloatingSearchButton />
      <div className="relative z-10">
        <Navbar variant="minimal" />
        <main className="pb-24">{children}</main>
        <Footer variant="minimal" />
      </div>
    </div>
  )
}
