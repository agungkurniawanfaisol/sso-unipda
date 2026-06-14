import { Lightbulb, Target, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react'

const standards = [
  {
    icon: BookOpen,
    title: 'OBE-Based Curriculum',
    description: 'Outcome-Based Education framework ensuring every graduate achieves measurable competencies aligned with industry needs.',
  },
  {
    icon: Target,
    title: 'KKNI Level 6',
    description: 'Curriculum aligned with Indonesian National Qualifications Framework for bachelor-level competency standards.',
  },
  {
    icon: CheckCircle2,
    title: 'International Accreditation',
    description: 'Program standards meeting international accreditation requirements for global recognition.',
  },
]

export default function InstitutionalInfo() {
  return (
    <section id="about" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-300 mb-4">
            About UNIPDA
          </span>
          <h2 className="text-section text-white mb-4">
            Vision, Mission & Standards
          </h2>
          <p className="text-white/50 text-base leading-relaxed">
            Our commitment to excellence in computer science education through
            clear vision, actionable mission, and world-class standards.
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Vision Card */}
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-indigo-500/5 to-transparent p-8 hover:border-white/[0.12] transition-all duration-500">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/20">
                <Lightbulb className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Vision</h3>
            </div>
            <p className="text-white/60 leading-relaxed text-base">
              To become a leading center of excellence in computer science education,
              research, and innovation that produces globally competitive graduates
              with strong ethical values and entrepreneurial spirit.
            </p>
          </div>

          {/* Mission Card */}
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-emerald-500/5 to-transparent p-8 hover:border-white/[0.12] transition-all duration-500">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/20">
                <Target className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Mission</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Deliver high-quality education through innovative teaching methods and industry-aligned curriculum.',
                'Foster cutting-edge research and community service that addresses real-world challenges.',
                'Develop graduates with strong character, leadership skills, and technological competency.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-white/60 text-sm leading-relaxed">
                  <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {standards.map((standard) => {
            const Icon = standard.icon
            return (
              <div
                key={standard.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500"
              >
                <Icon className="w-6 h-6 text-amber-400 mb-4" />
                <h3 className="text-base font-semibold text-white mb-2">{standard.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{standard.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
