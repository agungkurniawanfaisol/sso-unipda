import { ExternalLink, BookOpen, Award, Globe } from 'lucide-react'

const lecturers = [
  {
    id: 1,
    name: 'Dr. Ahmad Fauzi',
    credentials: 'S.Kom., M.Kom.',
    specializations: ['Laravel', 'React', 'AI'],
    scholarLink: '#',
    image: null,
    bio: 'Expert in web development and artificial intelligence with 15+ years of teaching experience.',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    id: 2,
    name: 'Dr. Siti Nurhaliza',
    credentials: 'S.T., M.T.',
    specializations: ['IoT', 'Embedded Systems', 'Arduino'],
    scholarLink: '#',
    image: null,
    bio: 'Specializes in Internet of Things and embedded system design for smart environments.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 3,
    name: 'Bambang Suprapto',
    credentials: 'S.Kom., M.Kom.',
    specializations: ['Mobile Dev', 'Flutter', 'UI/UX'],
    scholarLink: '#',
    image: null,
    bio: 'Mobile application development expert with focus on cross-platform solutions.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 4,
    name: 'Dr. Dewi Sartika',
    credentials: 'S.Si., M.Sc.',
    specializations: ['Data Science', 'Machine Learning', 'Python'],
    scholarLink: '#',
    image: null,
    bio: 'Data science researcher focused on machine learning applications in education.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 5,
    name: 'Rudi Hartono',
    credentials: 'S.Kom., M.Kom.',
    specializations: ['DevOps', 'Cloud', 'Kubernetes'],
    scholarLink: '#',
    image: null,
    bio: 'Cloud infrastructure and DevOps specialist managing campus digital infrastructure.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 6,
    name: 'Dr. Maya Indah',
    credentials: 'S.T., M.T.',
    specializations: ['Cyber Security', 'Network', 'Cryptography'],
    scholarLink: '#',
    image: null,
    bio: 'Cybersecurity expert with research focus on network security and cryptography.',
    color: 'from-rose-500 to-red-600',
  },
]

export default function LecturerDirectory() {
  return (
    <section id="lecturers" className="py-28 bg-[#08080e]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300 mb-4">
            Faculty
          </span>
          <h2 className="text-section text-white mb-4">
            Meet Our Lecturers
          </h2>
          <p className="text-white/50 text-base leading-relaxed">
            Our dedicated faculty members bring expertise across computer science
            disciplines, driving innovation in research and education.
          </p>
        </div>

        {/* Lecturers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lecturers.map((lecturer) => (
            <div
              key={lecturer.id}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* Avatar placeholder */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden mb-5">
                {lecturer.image ? (
                  <img src={lecturer.image} alt={lecturer.name} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${lecturer.color} flex items-center justify-center`}>
                    <span className="text-xl font-bold text-white">
                      {lecturer.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                )}
              </div>

              {/* Name & Credentials */}
              <h3 className="text-lg font-semibold text-white mb-1">{lecturer.name}</h3>
              <p className="text-sm text-indigo-300/70 mb-2">{lecturer.credentials}</p>
              <p className="text-sm text-white/40 leading-relaxed mb-4">{lecturer.bio}</p>

              {/* Specializations */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {lecturer.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-white/60"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <a
                href={lecturer.scholarLink}
                className="inline-flex items-center gap-2 text-xs font-medium text-white/40 hover:text-indigo-300 transition-colors duration-200 group/link"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Academic Profile
                <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
