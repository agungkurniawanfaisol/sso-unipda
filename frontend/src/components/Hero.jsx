import { ArrowRight, Award, Users, BookOpen, ExternalLink } from 'lucide-react'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'

const stats = [
  { icon: BookOpen, label: 'Applications', value: '24+' },
  { icon: Users, label: 'Lecturers', value: '48+' },
  { icon: Award, label: 'Research Projects', value: '15+' },
  { icon: ExternalLink, label: 'Active Users', value: '2K+' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

      {/* Spotlight effect */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-black/50 backdrop-blur-sm text-xs font-medium text-white/70 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Faculty of Computer Science — UNIPDA
        </div>

        {/* Title */}
        <h1 className="text-hero text-white max-w-4xl mx-auto leading-[1.05]">
          Innovation Starts{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Here
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Discover applications built by UNIPDA's students and faculty.
          Showcasing innovation across Web, Mobile, IoT, and beyond.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#applications"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all duration-200 group"
          >
            Browse Applications
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#lecturers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
          >
            Meet Our Lecturers
          </a>
        </div>

        {/* Stats Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-5 hover:bg-black/60 hover:border-white/20 transition-all duration-300"
            >
              <stat.icon className="w-5 h-5 text-indigo-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
