import { Mail, ArrowUpRight } from 'lucide-react'

const quickLinks = [
  { label: 'Aplikasi', href: '#applications' },
  { label: 'Fakultas', href: '#faculties' },
  { label: 'Dosen', href: '#lecturers' },
  { label: 'Mahasiswa', href: '#students' },
  { label: 'Jadwal', href: '#schedules' },
]

const portals = [
  { label: 'SIA', href: 'https://sia.universitaspgridelta.ac.id/' },
  { label: 'AcaNova', href: 'https://office.universitaspgridelta.ac.id/' },
  { label: 'Saintek', href: 'https://saintek.universitaspgridelta.ac.id/' },
  { label: 'Website', href: 'https://universitaspgridelta.ac.id/' },
]

export default function Footer({ variant = 'default' }) {
  const isMinimal = variant === 'minimal'

  if (isMinimal) {
    return (
      <footer id="contact" className="relative border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-white md:text-3xl">
              Unipda Portal
            </p>
            <p className="text-editorial mt-3 max-w-sm text-white/40">
              Satu pintu masuk ke ekosistem digital Universitas PGRI Delta.
            </p>
            <a
              href="mailto:info@universitaspgridelta.ac.id"
              className="mt-4 inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" />
              info@universitaspgridelta.ac.id
            </a>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Navigasi
              </p>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/40 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Portal
              </p>
              <ul className="space-y-2">
                {portals.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 text-sm text-white/40 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] px-6 py-6">
          <p className="text-center text-xs text-white/30">
            &copy; {new Date().getFullYear()} Copyright IT Universitas PGRI Delta
          </p>
        </div>
      </footer>
    )
  }

  return (
    <footer id="contact" className="relative border-t border-white/[0.06]">
      <div className="section-divider absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500">
                <span className="font-display text-sm font-bold text-white">U</span>
              </div>
              <div>
                <span className="font-display text-base font-bold text-white">UNIPDA</span>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">Unipda Portal</p>
              </div>
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/40">
              Unipda Portal — akses aplikasi kampus, data akademik, dan layanan
              Universitas PGRI Delta dalam satu tempat.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
              Navigasi
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-indigo-300"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
              Portal Kampus
            </h4>
            <ul className="space-y-3">
              {portals.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-teal-300"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.06] pt-8 text-center">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Copyright IT Universitas PGRI Delta
          </p>
        </div>
      </div>
    </footer>
  )
}
