import { useState } from 'react'
import { Monitor, Smartphone, Cpu, Gauge, Wifi, Filter, ExternalLink, User } from 'lucide-react'

const categories = [
  { id: 'all', label: 'All Apps', icon: Filter },
  { id: 'web', label: 'Web', icon: Monitor },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
  { id: 'iot', label: 'IoT', icon: Cpu },
  { id: 'arduino', label: 'Arduino', icon: Gauge },
  { id: 'network', label: 'Network', icon: Wifi },
]

const applications = [
  {
    id: 1,
    title: 'E-Learning Platform',
    description: 'Online learning management system with real-time collaboration features.',
    category: 'web',
    thumbnail: null,
    creator: 'Tim Pengembang',
    creatorType: 'Student',
    color: 'from-blue-600 to-cyan-500',
  },
  {
    id: 2,
    title: 'Smart Campus App',
    description: 'Mobile application for campus navigation, schedules, and academic info.',
    category: 'mobile',
    thumbnail: null,
    creator: 'Riset & Tim Mobile',
    creatorType: 'Student',
    color: 'from-purple-600 to-pink-500',
  },
  {
    id: 3,
    title: 'IoT Weather Station',
    description: 'Real-time weather monitoring system using distributed sensor networks.',
    category: 'iot',
    thumbnail: null,
    creator: 'Lab IoT',
    creatorType: 'Student',
    color: 'from-emerald-600 to-teal-500',
  },
  {
    id: 4,
    title: 'Greenhouse Controller',
    description: 'Arduino-based automated greenhouse monitoring and control system.',
    category: 'arduino',
    thumbnail: null,
    creator: 'Tim Embedded Systems',
    creatorType: 'Student',
    color: 'from-amber-600 to-orange-500',
  },
  {
    id: 5,
    title: 'Digital Library',
    description: 'Web-based digital library with search, borrow, and e-book support.',
    category: 'web',
    thumbnail: null,
    creator: 'Tim Perpustakaan Digital',
    creatorType: 'Lecturer',
    color: 'from-rose-600 to-red-500',
  },
  {
    id: 6,
    title: 'Network Monitor',
    description: 'Network traffic analysis and monitoring dashboard for campus infrastructure.',
    category: 'network',
    thumbnail: null,
    creator: 'Tim Infrastruktur',
    creatorType: 'Student',
    color: 'from-indigo-600 to-violet-500',
  },
  {
    id: 7,
    title: 'Siakad Mobile',
    description: 'Mobile academic information system for students and faculty.',
    category: 'mobile',
    thumbnail: null,
    creator: 'Tim SIAKAD',
    creatorType: 'Lecturer',
    color: 'from-sky-600 to-blue-500',
  },
  {
    id: 8,
    title: 'Smart Parking System',
    description: 'IoT-based smart parking with real-time slot availability detection.',
    category: 'iot',
    thumbnail: null,
    creator: 'Tim Riset IoT',
    creatorType: 'Student',
    color: 'from-lime-600 to-green-500',
  },
]

export default function ApplicationShowcase() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredApps = activeCategory === 'all'
    ? applications
    : applications.filter((app) => app.category === activeCategory)

  return (
    <section id="applications" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300 mb-4">
            Showcase
          </span>
          <h2 className="text-section text-white mb-4">
            Application Showcase
          </h2>
          <p className="text-white/50 text-base leading-relaxed">
            Explore applications built by our talented students and faculty members
            across various categories and technologies.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredApps.map((app) => (
            <article
              key={app.id}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden">
                {app.thumbnail ? (
                  <img
                    src={app.thumbnail}
                    alt={app.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${app.color} opacity-40`}>
                    <Monitor className="w-10 h-10 text-white/40" />
                  </div>
                )}
                {/* Category badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-medium text-white/80 border border-white/10">
                  {categories.find((c) => c.id === app.category)?.label}
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-headline text-white mb-1.5">{app.title}</h3>
                <p className="text-sm text-white/40 line-clamp-2 mb-4 leading-relaxed">
                  {app.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10">
                      <User className="w-3 h-3 text-white/60" />
                    </div>
                    <span className="text-xs text-white/40">{app.creator}</span>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    app.creatorType === 'Lecturer'
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                  }`}>
                    {app.creatorType}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
