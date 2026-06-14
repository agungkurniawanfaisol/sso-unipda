import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { api } from '@/lib/api'
import { useFetch } from '@/hooks/useFetch'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { StudentCard } from '@/components/students/StudentCard'

const PREVIEW_LIMIT = 8

export default function StudentDirectory() {
  const { data, loading, error } = useFetch(
    () => api.getStudents({ page: 1, per_page: PREVIEW_LIMIT }),
    []
  )

  const students = data?.data ?? []
  const total = data?.meta?.total ?? students.length

  return (
    <section id="students" className="chapter-accent-students chapter-section relative flex flex-col justify-center py-24">
      <div className="section-divider absolute inset-x-0 top-0" />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <ScrollReveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Mahasiswa
          </p>
          <h2 className="font-display text-display-xl max-w-3xl text-white">
            Direktori Mahasiswa
          </h2>
          <p className="text-editorial mt-6 max-w-2xl text-white/45">
            Data mahasiswa UNIPDA diambil live dari AcaNova Office — nama, NIM, program studi, dan status.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="mb-8 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {!loading && !error && (
              <p className="text-sm text-white/40">
                Pratinjau <span className="font-semibold text-white/70">{students.length}</span> dari{' '}
                <span className="font-semibold text-white/70">{total}</span> mahasiswa
              </p>
            )}

            <Link
              to="/mahasiswa"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/45 transition-colors hover:text-teal-300"
            >
              Lihat semua mahasiswa
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        {error && (
          <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
            Data mahasiswa sementara tidak tersedia. Silakan coba lagi nanti.
          </div>
        )}

        {loading && (
          <div className="horizontal-reel">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="horizontal-reel-item glass-card h-72 animate-pulse rounded-3xl" />
            ))}
          </div>
        )}

        {!loading && !error && (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              {students.length === 0 ? (
                <div className="glass-card rounded-2xl px-5 py-12 text-center text-white/45">
                  Belum ada data mahasiswa yang dapat ditampilkan.
                </div>
              ) : (
                <div className="horizontal-reel -mx-6 px-6 pb-4 md:-mx-0 md:px-0">
                  {students.map((student, index) => (
                    <StudentCard
                      key={student.id ?? student.nim ?? index}
                      student={student}
                      index={index}
                      layout="strip"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}
