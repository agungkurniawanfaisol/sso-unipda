import { Lightbulb, Target, ArrowRight } from 'lucide-react'
import { api } from '@/lib/api'
import { useFetch } from '@/hooks/useFetch'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'

export default function InstitutionalInfo() {
  const { data, loading, error } = useFetch(() => api.getInstitutional(), [])
  const visiMisi = data?.data?.visi_misi

  return (
    <section id="about" className="chapter-accent-about chapter-section relative flex flex-col justify-center py-24">
      <div className="section-divider absolute inset-x-0 top-0" />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <ScrollReveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Profil
          </p>
          <h2 className="font-display text-display-xl max-w-4xl text-white">
            {visiMisi?.title ?? "Let's explore the portal"}
          </h2>
          <p className="text-editorial mt-8 max-w-2xl text-white/50">
            {visiMisi?.subtitle ??
              'Landasan akademik UNIPDA dalam mewujudkan pendidikan berkualitas, inovatif, dan berdampak bagi masyarakat.'}
          </p>
        </ScrollReveal>

        {error && (
          <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
            Data institusi sementara tidak tersedia. Menampilkan konten fallback.
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15">
                <Lightbulb className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-display mb-4 text-xl font-semibold text-white">Visi</h3>
                {loading ? (
                  <div className="h-24 animate-pulse rounded-xl bg-white/5" />
                ) : (
                  <p className="text-editorial text-white/55">
                    {visiMisi?.visi ??
                      'Menjadi universitas unggulan yang menghasilkan lulusan berintegritas, inovatif, dan berdaya saing global.'}
                  </p>
                )}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/15">
                <Target className="h-5 w-5 text-teal-400" />
              </div>
              <div>
                <h3 className="font-display mb-4 text-xl font-semibold text-white">Misi</h3>
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-4 animate-pulse rounded bg-white/5" />
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {(visiMisi?.misi ?? []).map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-xs font-bold text-teal-300">
                          {index + 1}
                        </span>
                        <span className="text-editorial text-white/55">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.15}>
          <div className="mt-20 border-t border-white/[0.06] pt-16">
            <p className="mb-8 text-sm uppercase tracking-[0.18em] text-white/35">
              Mulai dari sini
            </p>
            <MagneticButton
              href="#applications"
              className="group items-center gap-3 rounded-full border border-white/15 bg-white px-8 py-4 text-base font-semibold text-black hover:bg-white/90"
            >
              Jelajahi Aplikasi Kampus
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
