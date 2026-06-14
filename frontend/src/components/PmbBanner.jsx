import { ArrowUpRight, GraduationCap } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'

const PMB_URL = 'https://pmb.universitaspgridelta.ac.id/pmb/'

export default function PmbBanner() {
  return (
    <section id="pmb" className="relative py-8">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent p-8 md:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15">
                  <GraduationCap className="h-6 w-6 text-amber-300" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300/80">
                    Penerimaan Mahasiswa Baru
                  </p>
                  <h2 className="font-display mt-1 text-2xl font-semibold text-white md:text-3xl">
                    Bergabung dengan UNIPDA
                  </h2>
                  <p className="text-editorial mt-2 max-w-xl text-white/50">
                    Daftar sekarang — pilih program studi FIP & Saintek, cek jalur pendaftaran,
                    dan informasi biaya kuliah.
                  </p>
                </div>
              </div>

              <MagneticButton
                href={PMB_URL}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black hover:bg-white/90"
              >
                Daftar PMB
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
