import { useMemo } from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { useFetch } from '@/hooks/useFetch'
import { useVisitorMode } from '@/providers/VisitorModeProvider'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { sortAppsForMode } from '@/lib/appLauncher'
import { cacheKey, prefetch } from '@/lib/apiCache'
import { cn } from '@/lib/utils'
import {
  FALLBACK_APPS,
  getAppIcon,
  getAppTheme,
  getFacultyLabel,
  getShortDescription,
  FACULTY_BADGE,
} from '@/components/apps/appShared'

const APPS_CACHE_KEY = cacheKey('/applications', {})

export function prefetchApplications() {
  prefetch(APPS_CACHE_KEY, () => api.getApplications())
}

const tileMotion = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: index * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
}

function AppTileBase({ app, index, className, children, size = 'md' }) {
  const reducedMotion = usePrefersReducedMotion()
  const AppIcon = getAppIcon(app.id)
  const theme = getAppTheme(app.id)

  if (!app.profile_link) {
    return null
  }

  return (
    <motion.a
      href={app.profile_link}
      target="_blank"
      rel="noreferrer"
      aria-label={`Buka ${app.title}`}
      custom={index}
      variants={reducedMotion ? undefined : tileMotion}
      initial={reducedMotion ? false : 'hidden'}
      animate={reducedMotion ? undefined : 'visible'}
      whileHover={reducedMotion ? undefined : { y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 340, damping: 26 }}
      className={cn(
        'group relative isolate flex rounded-2xl border border-white/10 bg-[#0a0a12] ring-1 ring-white/5 transition-all duration-300',
        theme.glow,
        theme.ring,
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity duration-300 group-hover:opacity-100',
          theme.gradient
        )}
      />
      <div className="absolute -right-2 -top-2 opacity-[0.12] transition-transform duration-500 group-hover:scale-110 group-hover:opacity-[0.18] sm:-right-4 sm:-top-4">
        <AppIcon className={cn(size === 'hero' ? 'h-28 w-28 sm:h-36 sm:w-36' : size === 'lg' ? 'h-20 w-20 sm:h-24 sm:w-24' : 'h-14 w-14 sm:h-16 sm:w-16')} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/20 to-transparent" />
      </div>

      <div className="relative flex h-full w-full flex-col p-4 md:p-5">{children}</div>
    </motion.a>
  )
}

function HeroAppTile({ app, index, isPrimary, className }) {
  const AppIcon = getAppIcon(app.id)
  const theme = getAppTheme(app.id)
  const description = getShortDescription(app)

  return (
    <AppTileBase
      app={app}
      index={index}
      size="hero"
      className={cn(
        'col-span-2 min-h-[180px] sm:col-span-2 sm:min-h-[168px] lg:col-span-2 lg:row-span-2 lg:min-h-[260px]',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-black/25 backdrop-blur-md shadow-lg">
          <AppIcon className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {isPrimary && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              <Sparkles className="h-3 w-3" />
              Utama
            </span>
          )}
          {app.faculty && (
            <span
              className={cn(
                'rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                FACULTY_BADGE[app.faculty] ?? FACULTY_BADGE.universitas
              )}
            >
              {getFacultyLabel(app.faculty)}
            </span>
          )}
        </div>
      </div>

      <div className="mt-auto pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
          {theme.tag}
        </p>
        <h3 className="font-display mt-1 text-xl font-bold text-white md:text-2xl">{app.title}</h3>
        {description && (
          <p className="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-white/60">{description}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-black">
          Buka aplikasi
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </AppTileBase>
  )
}

function FeaturedAppTile({ app, index }) {
  const AppIcon = getAppIcon(app.id)
  const theme = getAppTheme(app.id)

  return (
    <AppTileBase
      app={app}
      index={index}
      size="lg"
      className="col-span-1 min-h-[116px] sm:min-h-[132px] lg:min-h-[124px]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/25 backdrop-blur-sm">
          <AppIcon className="h-5 w-5 text-white/90" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-white/45">{theme.tag}</span>
      </div>
      <div className="mt-auto pt-3">
        <h3 className="font-display text-base font-semibold text-white">{app.title}</h3>
        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-white/55 group-hover:text-white">
          Buka
          <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </AppTileBase>
  )
}

function CompactAppTile({ app, index }) {
  const AppIcon = getAppIcon(app.id)

  return (
    <AppTileBase
      app={app}
      index={index}
      size="sm"
      className="col-span-1 min-h-[100px] sm:min-h-[108px]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-black/25 backdrop-blur-sm">
          <AppIcon className="h-4 w-4 text-white/85" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display line-clamp-2 text-sm font-semibold leading-snug text-white">{app.title}</h3>
          <span className="mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-medium text-white/50 group-hover:text-white/80">
            Buka
            <ArrowUpRight className="h-2.5 w-2.5" />
          </span>
        </div>
      </div>
    </AppTileBase>
  )
}

function SkeletonTile({ className }) {
  return (
    <div className={cn('animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.04]', className)} />
  )
}

export default function AppLauncherGrid({ className, variant = 'default' }) {
  const { mode } = useVisitorMode()
  const { data, loading, error } = useFetch(() => api.getApplications(), [], {
    cacheKey: APPS_CACHE_KEY,
  })

  const isSidebar = variant === 'sidebar'

  const applications = useMemo(() => {
    const items = data?.data?.length ? data.data : error ? FALLBACK_APPS : []
    return sortAppsForMode(items, mode)
  }, [data, error, mode])

  const heroApp = applications[0]
  const featuredApps = applications.slice(1, 3)
  const compactApps = applications.slice(3)

  return (
    <div id="applications" className={cn('scroll-mt-24', className)}>
      {loading && isSidebar && (
        <div className="flex flex-col gap-2.5">
          <SkeletonTile className="min-h-[168px]" />
          <div className="grid grid-cols-2 gap-2.5">
            <SkeletonTile className="min-h-[120px]" />
            <SkeletonTile className="min-h-[120px]" />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonTile key={index} className="min-h-[96px]" />
            ))}
          </div>
        </div>
      )}

      {loading && !isSidebar && (
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 lg:grid-rows-2">
          <SkeletonTile className="col-span-2 min-h-[168px] lg:row-span-2 lg:min-h-[260px]" />
          <SkeletonTile className="min-h-[132px]" />
          <SkeletonTile className="min-h-[132px]" />
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonTile key={index} className="col-span-1 min-h-[100px] lg:col-span-1" />
          ))}
        </div>
      )}

      {error && !loading && (
        <p className="mb-3 text-xs text-amber-200/80">
          Menampilkan layanan utama — data aplikasi sementara tidak dapat dimuat.
        </p>
      )}

      {!loading && applications.length > 0 && isSidebar && (
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {heroApp && (
            <HeroAppTile
              app={heroApp}
              index={0}
              isPrimary
              className="col-span-1 min-h-[168px] sm:min-h-[180px]"
            />
          )}
          {featuredApps.length > 0 && (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {featuredApps.map((app, index) => (
                <FeaturedAppTile key={app.id ?? index} app={app} index={index + 1} />
              ))}
            </div>
          )}
          {compactApps.length > 0 && (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {compactApps.map((app, index) => (
                <CompactAppTile key={app.id ?? index} app={app} index={index + 3} />
              ))}
            </div>
          )}
        </div>
      )}

      {!loading && applications.length > 0 && !isSidebar && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 lg:grid-rows-2">
            {heroApp && <HeroAppTile app={heroApp} index={0} isPrimary />}
            {featuredApps.map((app, index) => (
              <FeaturedAppTile key={app.id ?? index} app={app} index={index + 1} />
            ))}
          </div>
          {compactApps.length > 0 && (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
              {compactApps.map((app, index) => (
                <CompactAppTile key={app.id ?? index} app={app} index={index + 3} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
