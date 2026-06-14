import { useRef, useState, useEffect } from 'react'
import { ArrowDown, Search } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'
import { SpotlightMouse } from '@/components/ui/spotlight-mouse'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'
import { ShimmerText } from '@/components/ui/ShimmerText'
import { ScrollCue } from '@/components/ui/ScrollCue'
import { MagneticButton } from '@/components/ui/MagneticButton'
import AppLauncherGrid, { prefetchApplications } from '@/components/AppLauncherGrid'
import { RotatingServiceHint } from '@/components/ui/RotatingServiceHint'
import { VisitorModeSwitcher } from '@/components/VisitorModeSwitcher'
import { useVisitorMode } from '@/providers/VisitorModeProvider'
import { usePortalSearch } from '@/providers/PortalSearchProvider'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const MODE_COPY = {
  mahasiswa: 'Akses SIA, jadwal, dan layanan akademik dalam satu klik.',
  dosen: 'Buka AcaNova Office, SIA, dan layanan SDM kampus.',
}

const BOOT_MS = 1200
const SCENE_DWELL_MS = 2500

const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
}

const headlineItem = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { mode } = useVisitorMode()
  const { openSearch } = usePortalSearch()
  const reducedMotion = usePrefersReducedMotion()

  const [splineReady, setSplineReady] = useState(false)
  const [mountSpline, setMountSpline] = useState(true)
  const [phase, setPhase] = useState(reducedMotion ? 'content' : 'boot')

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  useEffect(() => {
    prefetchApplications()
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const bootTimer = window.setTimeout(() => {
      setPhase((current) => (current === 'boot' ? 'scene' : current))
    }, BOOT_MS)

    return () => window.clearTimeout(bootTimer)
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion || phase !== 'scene' || !splineReady) return

    const sceneTimer = window.setTimeout(() => setPhase('content'), SCENE_DWELL_MS)
    return () => window.clearTimeout(sceneTimer)
  }, [phase, splineReady, reducedMotion])

  useEffect(() => {
    if (reducedMotion && splineReady) {
      setPhase('content')
    }
  }, [reducedMotion, splineReady])

  useEffect(() => {
    return scrollYProgress.on('change', (value) => {
      if (value > 0.88) {
        setMountSpline(false)
      }
    })
  }, [scrollYProgress])

  const splineScale = useTransform(scrollYProgress, [0, 0.65], reducedMotion ? [1, 1] : [1, 1.12])
  const splineY = useTransform(scrollYProgress, [0, 0.65], reducedMotion ? [0, 0] : [0, 140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4, 0.78], [1, 1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.78], [0, 80])
  const topVignette = useTransform(scrollYProgress, [0, 0.65], [0.3, 0.7])
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.5], [0.06, 0.02])

  const showBoot = phase === 'boot' && !reducedMotion
  const showApps = phase === 'content' || reducedMotion

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="chapter-accent-intro relative h-[150svh]"
    >
        <div className="sticky top-0 h-[100svh] overflow-x-hidden overflow-y-auto md:overflow-hidden">
        <div className="hero-aurora hero-aurora-animated pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
        <FloatingOrbs className="z-[2] opacity-50" />

        <motion.div style={{ scale: splineScale, y: splineY }} className="absolute inset-0 z-0">
          {mountSpline ? (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              onLoad={() => setSplineReady(true)}
              className="h-full w-full [&_canvas]:!h-full [&_canvas]:!w-full"
            />
          ) : (
            <div
              className="h-full w-full bg-gradient-to-br from-indigo-950/90 via-violet-950/80 to-[#050508]"
              aria-hidden="true"
            />
          )}
        </motion.div>

        <motion.div
          style={{ opacity: watermarkOpacity }}
          className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <span className="hero-watermark font-display select-none uppercase text-white">Portal</span>
        </motion.div>

        <motion.div
          style={{ opacity: topVignette }}
          className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-[#050508]/60 via-transparent to-transparent"
        />
        <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-[#050508] via-[#050508]/55 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-[#050508]/80 via-[#050508]/35 to-transparent md:max-w-[58%]" />

        <Spotlight className="-top-40 left-1/2 -translate-x-1/2 md:-top-20" fill="white" />
        {!reducedMotion && mountSpline && phase !== 'boot' && (
          <SpotlightMouse
            className="from-indigo-400/15 via-violet-400/10 to-teal-400/10 z-[4] opacity-55"
            size={320}
          />
        )}

        <div className="pointer-events-none absolute left-6 top-24 z-10 hidden text-[10px] font-medium uppercase tracking-[0.22em] text-white/30 md:block">
          Universitas PGRI Delta
        </div>
        <div className="pointer-events-none absolute right-6 top-24 z-10 hidden text-[10px] font-medium uppercase tracking-[0.22em] text-white/30 md:block">
          Digital Campus · Live
        </div>

        <AnimatePresence>
          {showBoot && (
            <motion.div
              key="boot"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050508] px-6 text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full text-xs font-semibold uppercase tracking-[0.28em] text-white/40"
              >
                Unipda Portal
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.12, duration: 0.75 }}
                className="font-display mx-auto mt-4 max-w-[16ch] text-3xl font-bold leading-tight text-white sm:max-w-none sm:text-4xl md:text-5xl"
              >
                Membuka pengalaman
              </motion.h2>
              <div className="mx-auto mt-8 h-px w-20 overflow-hidden bg-white/10">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-full w-full bg-gradient-to-r from-transparent via-indigo-400/80 to-transparent"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6 pb-8 pt-20 md:px-8 md:pt-24"
        >
          <AnimatePresence>
            {showApps && (
              <motion.div
                key="hero-apps"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full min-h-0 flex-col"
              >
                <motion.div
                  variants={headlineContainer}
                  initial="hidden"
                  animate="visible"
                  className="mb-5 md:mb-6"
                >
                  <motion.p
                    variants={headlineItem}
                    className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300/70"
                  >
                    Interactive 3D · UNIPDA
                  </motion.p>
                  <motion.h1
                    variants={headlineContainer}
                    className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl"
                  >
                    <motion.span variants={headlineItem} className="inline">
                      Unipda{' '}
                    </motion.span>
                    <motion.span variants={headlineItem} className="inline">
                      <ShimmerText>Portal</ShimmerText>
                    </motion.span>
                  </motion.h1>
                  <motion.p
                    variants={headlineItem}
                    className="text-editorial mt-2 max-w-xl text-sm text-white/50 md:text-base"
                  >
                    {MODE_COPY[mode]}
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.45 }}
                  className="mb-4 md:mb-5"
                >
                  <VisitorModeSwitcher />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-2 md:overflow-visible md:pb-0"
                >
                  <RotatingServiceHint className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35" />
                  <AppLauncherGrid />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.45 }}
                  className="mt-4 flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4 md:mt-5 md:pt-5"
                >
                  <MagneticButton
                    type="button"
                    onClick={openSearch}
                    className="group items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/[0.1]"
                  >
                    <Search className="h-4 w-4" />
                    Cari layanan
                    <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/40">
                      ⌘K
                    </span>
                  </MagneticButton>

                  <a
                    href="#campus-today"
                    className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/40 transition-colors hover:text-white/70"
                  >
                    Jelajahi kampus
                    <ArrowDown className="h-3.5 w-3.5" />
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
          <ScrollCue
            label={
              showBoot
                ? 'Memuat...'
                : phase === 'scene'
                  ? 'Menyiapkan scene 3D'
                  : 'Scroll to explore'
            }
          />
        </div>
      </div>
    </section>
  )
}
