'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: {
        offset: 0,
        duration: 1.15,
      },
      prevent: (node: Element | null) => node?.hasAttribute('data-lenis-prevent') ?? false,
    })

    ;(window as any).lenis = lenis

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'style') {
          if (document.body.style.overflow === 'hidden') {
            lenis.stop()
          } else {
            lenis.start()
          }
        }
      }
    })
    observer.observe(document.body, { attributes: true })

    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    // Wire Lenis into GSAP's ticker so ScrollTrigger pin works correctly.
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      observer.disconnect()
      gsap.ticker.remove(updateLenis)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.destroy()
      delete (window as any).lenis
    }
  }, [])

  return <>{children}</>
}

