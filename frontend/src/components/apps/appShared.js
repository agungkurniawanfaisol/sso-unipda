import {
  Monitor,
  Building2,
  GraduationCap,
  Globe,
  BookOpenCheck,
  Cpu,
  Radio,
  Gamepad2,
} from 'lucide-react'

export const APP_ICONS = {
  'acanova-office': Building2,
  'sia-unipda': GraduationCap,
  'website-unipda': Globe,
  'portal-saintek': Cpu,
  'pmb-unipda': BookOpenCheck,
  'brader-unipda': Radio,
  'gamifikasi-unipda': Gamepad2,
}

export const FACULTY_LABELS = {
  fip: 'FIP',
  saintek: 'Saintek',
  universitas: 'UNIPDA',
}

export const FACULTY_BADGE = {
  fip: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
  saintek: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
  universitas: 'border-indigo-500/25 bg-indigo-500/10 text-indigo-300',
}

export const CARD_GRADIENTS = [
  'from-indigo-600/80 via-violet-600/60 to-blue-800/40',
  'from-teal-600/70 via-cyan-600/50 to-indigo-800/40',
  'from-amber-600/60 via-orange-600/40 to-rose-800/40',
  'from-violet-600/70 via-purple-600/50 to-fuchsia-800/40',
  'from-emerald-600/60 via-teal-600/40 to-cyan-800/40',
  'from-sky-600/60 via-blue-600/40 to-indigo-800/40',
]

export const TILE_ACCENTS = [
  'from-indigo-500/20 to-violet-500/5',
  'from-teal-500/20 to-cyan-500/5',
  'from-amber-500/20 to-orange-500/5',
  'from-violet-500/20 to-purple-500/5',
  'from-emerald-500/20 to-teal-500/5',
  'from-sky-500/20 to-blue-500/5',
  'from-rose-500/20 to-pink-500/5',
]

export const APP_THEMES = {
  'sia-unipda': {
    gradient: 'from-teal-600/90 via-cyan-700/70 to-indigo-900/80',
    glow: 'group-hover:shadow-[0_0_40px_rgba(45,212,191,0.25)]',
    ring: 'group-hover:ring-teal-400/40',
    tag: 'Akademik',
  },
  'acanova-office': {
    gradient: 'from-indigo-600/90 via-violet-700/70 to-blue-900/80',
    glow: 'group-hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]',
    ring: 'group-hover:ring-indigo-400/40',
    tag: 'SDM & Jadwal',
  },
  'website-unipda': {
    gradient: 'from-amber-600/80 via-orange-700/60 to-rose-900/70',
    glow: 'group-hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]',
    ring: 'group-hover:ring-amber-400/35',
    tag: 'Portal Resmi',
  },
  'portal-saintek': {
    gradient: 'from-emerald-600/85 via-teal-700/65 to-cyan-900/75',
    glow: 'group-hover:shadow-[0_0_32px_rgba(52,211,153,0.22)]',
    ring: 'group-hover:ring-emerald-400/35',
    tag: 'Fakultas',
  },
  'pmb-unipda': {
    gradient: 'from-violet-600/85 via-purple-700/65 to-fuchsia-900/75',
    glow: 'group-hover:shadow-[0_0_32px_rgba(167,139,250,0.22)]',
    ring: 'group-hover:ring-violet-400/35',
    tag: 'Pendaftaran',
  },
  'brader-unipda': {
    gradient: 'from-sky-600/85 via-blue-700/65 to-indigo-900/75',
    glow: 'group-hover:shadow-[0_0_32px_rgba(56,189,248,0.2)]',
    ring: 'group-hover:ring-sky-400/35',
    tag: 'Kampus',
  },
  'gamifikasi-unipda': {
    gradient: 'from-rose-600/80 via-pink-700/60 to-purple-900/75',
    glow: 'group-hover:shadow-[0_0_32px_rgba(244,114,182,0.2)]',
    ring: 'group-hover:ring-rose-400/35',
    tag: 'Pembelajaran',
  },
}

export function getAppTheme(appId) {
  return (
    APP_THEMES[appId] ?? {
      gradient: 'from-indigo-600/80 via-violet-700/60 to-slate-900/80',
      glow: 'group-hover:shadow-[0_0_32px_rgba(99,102,241,0.2)]',
      ring: 'group-hover:ring-indigo-400/30',
      tag: 'Layanan',
    }
  )
}

export function getShortDescription(app) {
  if (!app.description) {
    return null
  }
  const text = app.description.trim()
  return text.length > 72 ? `${text.slice(0, 72)}…` : text
}

export function getAppIcon(appId) {
  return APP_ICONS[appId] ?? Monitor
}

export function getFacultyLabel(faculty) {
  return FACULTY_LABELS[faculty] ?? faculty ?? 'UNIPDA'
}

export const FALLBACK_APPS = [
  {
    id: 'sia-unipda',
    title: 'SIA UNIPDA',
    faculty: 'universitas',
    profile_link: 'https://sia.universitaspgridelta.ac.id/',
    featured: true,
  },
  {
    id: 'acanova-office',
    title: 'AcaNova Office',
    faculty: 'universitas',
    profile_link: 'https://office.universitaspgridelta.ac.id/',
    featured: true,
  },
  {
    id: 'website-unipda',
    title: 'Website UNIPDA',
    faculty: 'universitas',
    profile_link: 'https://universitaspgridelta.ac.id/',
    featured: true,
  },
]
