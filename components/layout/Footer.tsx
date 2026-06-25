'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
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

  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout
    let idleTimeout: NodeJS.Timeout
    let moveTimeout: NodeJS.Timeout
    let isMoving = false

    // BLINKING
    const blink = () => {
      if (!isMoving) {
        ;[leftEyeSvgRef, rightEyeSvgRef].forEach((eyeSvg) => {
          if (!eyeSvg.current) return
          gsap.to(eyeSvg.current, {
            scaleY: 0.1,
            duration: 0.055, // ~110ms total for open-close-open
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1,
            transformOrigin: 'center center'
          })
        })
      }
      blinkTimeout = setTimeout(blink, Math.random() * 8000 + 6000) // 6-14s
    }
    blinkTimeout = setTimeout(blink, 6000)

    // IDLE GLANCE
    const scheduleGlance = () => {
      clearTimeout(idleTimeout)
      idleTimeout = setTimeout(() => {
        if (!isMoving) {
          const type = Math.floor(Math.random() * 4)
          let gX = 0; let gY = 0;
          if (type === 0) gX = -0.5
          else if (type === 1) gX = 0.5
          else if (type === 2) gY = 0.5
          
          ;[leftEyeRef, rightEyeRef].forEach((eyeRef, i) => {
            if (!eyeRef.current) return
            let finalX = gX;
            if (type === 3) finalX = i === 0 ? 0.3 : -0.3 // inward for laptop
            let finalY = type === 3 ? 0.5 : gY;
            
            const dur = 0.8 + Math.random() * 0.4 // 0.8-1.2s
            
            gsap.to(eyeRef.current, {
              x: finalX,
              y: finalY,
              duration: dur,
              ease: 'sine.inOut',
              overwrite: 'auto',
              onComplete: () => {
                if (!isMoving) {
                  gsap.to(eyeRef.current, {
                    x: 0,
                    y: 0,
                    duration: dur,
                    delay: 1,
                    ease: 'sine.inOut',
                    overwrite: 'auto'
                  })
                }
              }
            })
          })
        }
        scheduleGlance()
      }, Math.random() * 4000 + 8000) // 8-12s
    }
    scheduleGlance()

    // MOUSE TRACKING
    const handleMouseMove = (e: MouseEvent) => {
      isMoving = true
      clearTimeout(moveTimeout)
      moveTimeout = setTimeout(() => { isMoving = false }, 500)
      
      scheduleGlance() // Reset idle timer
      
      ;[leftEyeRef, rightEyeRef].forEach((eyeRef) => {
        if (!eyeRef.current) return
        
        const rect = eyeRef.current.getBoundingClientRect()
        const eyeCenterX = rect.left + rect.width / 2
        const eyeCenterY = rect.top + rect.height / 2
        
        const deltaX = e.clientX - eyeCenterX
        const deltaY = e.clientY - eyeCenterY
        const angle = Math.atan2(deltaY, deltaX)
        const distance = Math.hypot(deltaX, deltaY)
        
        const DEAD_ZONE = 80
        const maxRadius = 1.5
        const dampen = 0.65
        
        let moveX = 0
        let moveY = 0
        
        if (distance > DEAD_ZONE) {
          const activeDistance = distance - DEAD_ZONE
          const radius = Math.min(maxRadius, activeDistance * 0.05)
          moveX = Math.cos(angle) * radius * dampen
          moveY = Math.sin(angle) * radius * dampen
        }
        
        gsap.to(eyeRef.current, {
          x: moveX,
          y: moveY,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(blinkTimeout)
      clearTimeout(idleTimeout)
      clearTimeout(moveTimeout)
    }
  }, [])

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
                <div ref={leftEyeSvgRef} className="absolute w-[80%] h-[80%] left-[10%] top-[0%]" style={{ transform: 'translate(-0.3px, 0.5px)', opacity: 0.75 }}>
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
                <div ref={rightEyeSvgRef} className="absolute w-[80%] h-[80%] left-[-1%] top-[0%]" style={{ transform: 'translate(0.3px, 0.5px)', opacity: 0.75 }}>
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
