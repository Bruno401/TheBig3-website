'use client'

import { company } from '@/data/company'
import { ArrowUp, Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useRef, useEffect, useState } from 'react'

// Lazy-load the Phaser canvas only on the client, never during SSR.
const GameCanvas = dynamic(
  () => import('@/components/game/GameCanvas').then((m) => ({ default: m.GameCanvas })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[#1a0a2e] animate-pulse" />
    ),
  }
)

export default function Footer() {
  const year = new Date().getFullYear()
  const gameWrapRef = useRef<HTMLDivElement>(null)
  const [gameVisible, setGameVisible] = useState(false)

  /* The runner game is landscape-only. On portrait screens (height > width)
     the game layer is rotated 90° inside the card, so players hold the
     device sideways to play. */
  const [portrait, setPortrait] = useState(false)
  const [cardSize, setCardSize] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait)')
    const sync = () => setPortrait(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const el = gameWrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setCardSize({ w: Math.round(width), h: Math.round(height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Mount the game only when the footer card scrolls into view.
  useEffect(() => {
    const el = gameWrapRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGameVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <footer className="bg-[#fbf9f8] pt-12 md:pt-24 pb-12 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="mx-auto max-w-[1440px] flex flex-col relative">

        {/* ── Lavender Game Card ──────────────────────────────────── */}
        <div
          ref={gameWrapRef}
          className="relative z-10 bg-[#E4D8EB] rounded-[2.5rem] overflow-hidden shadow-sm"
          style={{ minHeight: '70vh' }}
        >
          {/* In portrait the game layer gets the card's dimensions swapped and
              is rotated 90°, so the game itself always runs landscape. */}
          <div
            className="absolute"
            style={
              portrait && cardSize
                ? {
                    top: '50%',
                    left: '50%',
                    width: cardSize.h,
                    height: cardSize.w,
                    transform: 'translate(-50%, -50%) rotate(90deg)',
                  }
                : { inset: 0 }
            }
          >
            {gameVisible && (!portrait || cardSize) ? (
              <GameCanvas key={portrait ? 'portrait' : 'landscape'} rotated={portrait} />
            ) : (
              <div className="absolute inset-0 bg-[#1a0a2e]" />
            )}
          </div>
        </div>

        {/* ── Dark Nav Card ────────────────────────────────────────── */}
        <motion.div 
          initial={{ y: -100 }}
          whileInView={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          viewport={{ once: false, margin: "-50px" }}
          className="relative z-0 bg-[#120e1e] w-[90%] mx-auto rounded-[2rem] pb-8 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md -mt-8 pt-12"
        >

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            {/* Email Pill */}
            <motion.a
              href="mailto:info@thebig3.in"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-brand-white text-brand-ink font-sans font-bold text-[14px] md:text-[15px] tracking-wider hover:bg-brand-lavender transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>info@thebig3.in</span>
            </motion.a>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <motion.a
                href="https://www.instagram.com/hardik._10_/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-11 h-11 rounded-full border border-brand-white/20 hover:border-brand-purple bg-transparent hover:bg-brand-purple text-brand-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://github.com/Bruno401"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-11 h-11 rounded-full border border-brand-white/20 hover:border-brand-purple bg-transparent hover:bg-brand-purple text-brand-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/hardikghodasara/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-11 h-11 rounded-full border border-brand-white/20 hover:border-brand-purple bg-transparent hover:bg-brand-purple text-brand-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="tel:+919016856450"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-11 h-11 rounded-full border border-brand-white/20 hover:border-brand-purple bg-transparent hover:bg-brand-purple text-brand-white transition-colors"
                aria-label="Call Us"
              >
                <Phone className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full border border-brand-white/20 hover:border-brand-white/40 bg-transparent text-white font-sans font-bold text-[14px] md:text-[15px] uppercase tracking-wider transition-colors group cursor-pointer shrink-0"
          >
            <span>Go Up</span>
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-white text-brand-ink group-hover:-translate-y-0.5 transition-transform shrink-0">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </motion.button>
        </motion.div>

        {/* ── Copyright ────────────────────────────────────────────── */}
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          viewport={{ once: false, margin: "-50px" }}
          className="relative z-0 text-center mt-3 text-[13px] md:text-body-sm text-brand-ink-muted/50 font-sans"
        >
          © {year} {company.name}. All rights reserved.
        </motion.div>

      </div>
    </footer>
  )
}

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
