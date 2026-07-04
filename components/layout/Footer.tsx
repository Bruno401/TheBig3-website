'use client'

import { company } from '@/data/company'
import { navigationLinks } from '@/data/navigation'
import { ArrowRight, ArrowUp } from 'lucide-react'
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
    <footer className="bg-[#fbf9f8] pt-12 md:pt-24 pb-12 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1440px] flex flex-col gap-5">

        {/* ── Lavender Game Card ──────────────────────────────────── */}
        <div
          ref={gameWrapRef}
          className="relative bg-[#E4D8EB] rounded-[2.5rem] overflow-hidden shadow-sm"
          style={{ minHeight: '70vh' }}
        >
          {gameVisible ? (
            <GameCanvas />
          ) : (
            <div className="absolute inset-0 bg-[#1a0a2e]" />
          )}
        </div>

        {/* ── Dark Nav Card ────────────────────────────────────────── */}
        <div className="bg-[#120e1e] rounded-[2rem] py-5 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">

          <nav aria-label="Footer navigation" className="w-full md:w-auto">
            <ul className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4" role="list">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-brand-white text-brand-ink font-sans font-bold text-[14px] md:text-[15px] uppercase tracking-wider hover:bg-brand-lavender transition-colors group cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-ink text-brand-white group-hover:translate-x-0.5 transition-transform shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

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
        </div>

        {/* ── Copyright ────────────────────────────────────────────── */}
        <div className="text-center mt-3 text-[13px] md:text-body-sm text-brand-ink-muted/50 font-sans">
          © {year} {company.name}. All rights reserved.
        </div>

      </div>
    </footer>
  )
}
