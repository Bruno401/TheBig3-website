'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/* ─── All local portfolio PNG images ─────────────────────────────────────── */

const portfolioImages = [
  { src: '/images/portfolio/NextWebsite.png',              alt: 'Next.js Website' },
  { src: '/images/portfolio/interier-design-demo.png',     alt: 'Interior Design Demo' },
  { src: '/images/portfolio/family-golf-clonee.png',       alt: 'Family Golf Clone' },
  { src: '/images/portfolio/hotelbooking.png',             alt: 'Hotel Booking App' },
  { src: '/images/portfolio/fanta-demo.png',               alt: 'Fanta Demo' },
  { src: '/images/portfolio/mountain-explorer.png',        alt: 'Mountain Explorer' },
  { src: '/images/portfolio/Animated-Monkey-Design.png',   alt: 'Animated Monkey Design' },
  { src: '/images/portfolio/portfolio-website-demoo.png',  alt: 'Portfolio Website Demo' },
  { src: '/images/portfolio/basic-simple-portfolio.png',   alt: 'Simple Portfolio' },
  { src: '/images/portfolio/fitness-gym-design.png',       alt: 'Fitness Gym Design' },
  { src: '/images/portfolio/duo-studio-clonee.png',        alt: 'Duo Studio Clone' },
  { src: '/images/portfolio/Apple-Vision-Pro-Clone.png',   alt: 'Apple Vision Pro Clone' },
  { src: '/images/portfolio/D-Task.png',                   alt: 'D-Task App' },
  { src: '/images/portfolio/basic-portfolio-designs.png',  alt: 'Basic Portfolio Designs' },
  { src: '/images/portfolio/cubarto-clone.png',            alt: 'Cubarto Clone' },
]

// Pre-calculate positions for the 15 images to look scattered over the canvas
const imageLayout = [
  { top: '8%', left: '4%', width: 'clamp(140px, 15vw, 300px)', zIndex: 10 },
  { top: '15%', left: '22%', width: 'clamp(180px, 20vw, 400px)', zIndex: 12 },
  { top: '5%', left: '45%', width: 'clamp(140px, 15vw, 300px)', zIndex: 15 },
  { top: '20%', left: '65%', width: 'clamp(220px, 25vw, 500px)', zIndex: 11 },
  { top: '10%', left: '85%', width: 'clamp(180px, 20vw, 400px)', zIndex: 14 },

  { top: '45%', left: '10%', width: 'clamp(220px, 25vw, 500px)', zIndex: 20 },
  { top: '55%', left: '30%', width: 'clamp(140px, 15vw, 300px)', zIndex: 22 },
  { top: '40%', left: '50%', width: 'clamp(220px, 25vw, 500px)', zIndex: 18 },
  { top: '60%', left: '70%', width: 'clamp(180px, 20vw, 400px)', zIndex: 25 },
  { top: '38%', left: '88%', width: 'clamp(180px, 20vw, 400px)', zIndex: 19 },

  { top: '82%', left: '6%', width: 'clamp(180px, 20vw, 400px)', zIndex: 30 },
  { top: '75%', left: '26%', width: 'clamp(140px, 15vw, 300px)', zIndex: 35 },
  { top: '88%', left: '48%', width: 'clamp(220px, 25vw, 500px)', zIndex: 32 },
  { top: '72%', left: '68%', width: 'clamp(180px, 20vw, 400px)', zIndex: 31 },
  { top: '80%', left: '86%', width: 'clamp(140px, 15vw, 300px)', zIndex: 36 },
]

export default function Portfolio() {
  const [constraints, setConstraints] = useState({ left: -2000, right: 2000, top: -1000, bottom: 1000 })

  useEffect(() => {
    const updateConstraints = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      setConstraints({
        left: -1.5 * vw,
        right: 0.5 * vw,
        top: -0.25 * vh,
        bottom: 0.25 * vh,
      })
    }
    updateConstraints()
    window.addEventListener('resize', updateConstraints)
    return () => window.removeEventListener('resize', updateConstraints)
  }, [])

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative bg-brand-white h-[100vh] w-full overflow-hidden touch-none"
    >
      {/* ── Fixed overlay header ────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-50 flex flex-col items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4 text-center px-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-sans text-label font-semibold uppercase tracking-[0.14em] text-brand-purple bg-brand-white/80 px-4 py-1 rounded-full backdrop-blur-sm">
            Our work
          </p>
          <h2
            id="portfolio-heading"
            className="font-display max-w-2xl text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[1.0] tracking-[-0.025em] text-brand-ink drop-shadow-xl"
          >
            Built with{' '}
            <span
              style={{
                WebkitTextStroke: '1.5px #7562AB',
                color: 'transparent',
              }}
            >
              craft
            </span>
            .
          </h2>
          {/* Drag instruction */}
          <p className="mt-4 text-brand-ink/60 font-medium tracking-wide animate-pulse bg-brand-white/80 px-4 py-2 rounded-full backdrop-blur-sm border border-brand-purple/10 pointer-events-auto select-none">
            Click & Drag to explore
          </p>
        </motion.div>
      </div>

      {/* ── The Viewport ────────────────────────────────────────────── */}
      <div 
        className="absolute inset-0 overflow-hidden"
      >
        {/* ── The Canvas ────────────────────────────────────────────── */}
        <motion.div
          className="absolute top-[-25vh] left-[-50vw] w-[300vw] h-[150vh] cursor-grab active:cursor-grabbing"
          drag
          dragConstraints={constraints}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        >
          {portfolioImages.map((image, i) => {
            const layout = imageLayout[i] || imageLayout[0]
            return (
              <motion.div
                key={image.src}
                className="absolute shadow-2xl rounded-2xl overflow-hidden hover:scale-105 hover:z-[60] transition-all duration-300 bg-brand-purple/5"
                style={{
                  top: layout.top,
                  left: layout.left,
                  width: layout.width,
                  zIndex: layout.zIndex,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "200px" }}
                transition={{ duration: 0.6, delay: (i % 5) * 0.1, ease: 'easeOut' }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  draggable={false} // Crucial for framer-motion drag to work
                  className="w-full h-auto object-cover pointer-events-none"
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Bottom divider glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px z-50"
        style={{
          background: 'linear-gradient(to right, transparent, #EAE3F1, transparent)',
        }}
      />
    </section>
  )
}
