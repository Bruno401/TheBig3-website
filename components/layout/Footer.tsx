'use client'

import { useRef } from 'react'
import { company } from '@/data/company'
import { navigationLinks } from '@/data/navigation'
import { ArrowRight, ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)
  const leftEyeSvgRef = useRef<HTMLDivElement>(null)
  const rightEyeSvgRef = useRef<HTMLDivElement>(null)

  return (
    <footer className="bg-[#fbf9f8] pt-72 md:pt-[440px] pb-12 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1440px] flex flex-col gap-5">
        
        {/* Big Lavender Square Card */}
        <div className="relative bg-[#E4D8EB] rounded-[2.5rem] min-h-[70vh] py-16 px-6 md:px-12 flex flex-col items-center justify-center text-center shadow-sm">
          
          {/* Mascot Character Image (Centered, 50% inside, 50% outside) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] md:w-[560px] aspect-[2/3] pointer-events-none">
            <div className="character-wrapper relative w-full h-full">
              <Image
                src="/images/footer.png"
                alt="The Big 3 mascot character"
                fill
                sizes="(max-width: 768px) 360px, 560px"
                className="character-image object-contain"
                priority
              />

              {/* Left eye — SVG asset */}
              <div ref={leftEyeRef} className="eye-anchor eye-left absolute w-[22px] h-[22px] pointer-events-none rounded-full left-[44.5%] top-[19.3%]">
                <div ref={leftEyeSvgRef} className="absolute w-[90%] h-[90%] left-[10%] top-[0%]">
                  <Image
                    src="/images/left-eye.svg"
                    alt=""
                    fill
                    draggable={false}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right eye — SVG asset */}
              <div ref={rightEyeRef} className="eye-anchor eye-right absolute w-[22px] h-[22px] pointer-events-none rounded-full left-[53.3%] top-[19.3%]">
                <div ref={rightEyeSvgRef} className="absolute w-[90%] h-[90%] left-[-1%] top-[0%] opacity-0.5">
                  <Image
                    src="/images/right-eye.svg"
                    alt=""
                    fill
                    draggable={false}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="translate-y-12 md:translate-y-20">
            <h2 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-bold text-brand-ink leading-none tracking-[0.25em] pl-[0.25em] uppercase">
              THE BIG 3
            </h2>
            <p className="font-sans text-body-lg md:text-body-xl text-brand-ink-muted/95 mt-6 font-semibold uppercase tracking-wider">
              Think big we do the rest
            </p>
          </div>
        </div>

        {/* Small Dark Rectangle Card */}
        <div className="bg-[#120e1e] rounded-[2rem] py-5 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          
          {/* Quick Links */}
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

          {/* Go Up Button */}
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

        {/* Copyright */}
        <div className="text-center mt-3 text-[13px] md:text-body-sm text-brand-ink-muted/50 font-sans">
          © {year} {company.name}. All rights reserved.
        </div>

      </div>
    </footer>
  )
}
