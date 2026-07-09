"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { PillButton } from './Contact'
import { TechStackCarousel } from '../blocks/tech-stack-carousel'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ scale: 0.96, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full bg-brand-paper border border-brand-border/60 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-3 bg-brand-white/80 backdrop-blur-md border border-brand-border/60 hover:bg-brand-lavender rounded-full transition-all hover:scale-105"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-brand-ink" />
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto w-full relative" data-lenis-prevent="true">
              <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 py-16 md:py-24">
                
                {/* Header */}
                <div className="max-w-4xl mb-12 md:mb-16">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-brand-ink leading-[1.1] mb-8">
                    Engineering the Next Era of Digital Business
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl text-brand-ink/80 leading-relaxed font-medium">
                    AI and automation are fundamentally changing how modern businesses operate. At The Big 3 Digital Solutions LLP, an IT firm focused on digital transformation and bespoke software development, we are shaping what comes next.
                  </p>
                </div>

                {/* Banner Image */}
                <div className="w-full relative aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden mb-20 md:mb-32 bg-brand-border/30">
                  <Image 
                    src="/images/about-banner.webp" 
                    alt="About The Big 3" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 1400px) 100vw, 1400px"
                    priority
                  />
                </div>

                {/* Content Sections */}
                <div className="flex flex-col space-y-20 lg:space-y-32">
                  
                  <Section 
                    title="A New Species of Technology Partner"
                    content={
                      <p className="mb-6">
                        Software development is at an inflection point. Our mission is to accelerate digital transformation for forward-thinking businesses. We don’t just write code; we architect comprehensive business solutions that drive efficiency, growth, and operational clarity.
                      </p>
                    }
                  />

                  <Section 
                    title="Architecting Transformation (What We Do)"
                    content={
                      <>
                        <p className="mb-8 font-medium">We specialize in creating robust, scalable tools designed for the modern enterprise ecosystem.</p>
                        <ul className="space-y-8">
                          <li>
                            <strong className="text-brand-ink block mb-2 text-xl">Bespoke Web & App Development:</strong>
                            From specialized mobile apps for field force automation, audit, and expense tracking to intuitive web platforms, we build bespoke ecosystems to keep your business moving.
                          </li>
                          <li>
                            <strong className="text-brand-ink block mb-2 text-xl">SaaS Product Creation:</strong>
                            We engineer scalable Software-as-a-Service architectures. Our flagship SaaS product, MenuVerse, is actively empowering restaurants and cafes to completely streamline their operations.
                          </li>
                          <li>
                            <strong className="text-brand-ink block mb-2 text-xl">AI Software Solutions & Automation:</strong>
                            We deploy sophisticated AI integration and AI automation—including both no-code and coded AI agents, such as dedicated virtual assistants for medical clinics—to automate specialized industry workflows.
                          </li>
                        </ul>
                      </>
                    }
                  />

                  <Section 
                    title="Agility Meets Craftsmanship (Our Philosophy)"
                    content={
                      <p>
                        Founded in 2025, The Big 3 Digital Solutions LLP was born from the shared vision and deep technical expertise of three dedicated partners. We operate with a relentless focus on fast execution and a deep care for software craftsmanship. Unencumbered by legacy bureaucracy, our agile structure allows us to adapt rapidly to your specific needs, delivering precise, innovative results faster than traditional tech agencies.
                      </p>
                    }
                  />

                  <Section 
                    title="Proven Impact, Unwavering Dedication"
                    content={
                      <>
                        <p className="mb-6">
                          We bring a fierce passion to every line of code we write and every AI automation strategy we deploy. While we are a relatively new name in the industry, our momentum speaks for itself. Having successfully engineered and delivered over 15 targeted projects, we treat every client’s business as our own.
                        </p>
                        <p>
                          When you partner with us, you aren't just hiring a vendor; you are gaining a dedicated technical ally committed to your operational success.
                        </p>
                      </>
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 py-12 border-y border-brand-border/40">
                    <AnimatedStat value={32} label="Happy Clients achieve that" />
                    <AnimatedStat value={100} label="Projects get and other Services" />
                    <AnimatedStat value={2628} label="Hours Of Support or seek advantage" />
                    <AnimatedStat value={10} label="Hard Workers suffer from the roughest things" />
                  </div>

                  <TechStackCarousel />

                  <Section 
                    title="Ready to Transform Your Operations?"
                    content={
                      <>
                        <p className="mb-8">Let’s build the tools for your next phase of growth.</p>
                        <PillButton
                          onClick={(e) => {
                            e.preventDefault();
                            onClose();
                            // Dispatch custom event to open the contact modal
                            document.dispatchEvent(new CustomEvent('openContactForm'));
                          }}
                          label="Contact Us"
                          variant="light"
                          staticSrc="/gif/form-static.webp"
                          gifSrc="/gif/form.gif"
                        />
                      </>
                    }
                  />

                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Section({ title, content }: { title: React.ReactNode, content: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 relative">
      <div className="lg:col-span-5 relative">
        {/* Sticky heading on desktop */}
        <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-brand-ink leading-[1.1] lg:sticky lg:top-8 tracking-tight">
          {title}
        </h3>
      </div>
      <div className="lg:col-span-7">
        <div className="text-lg md:text-xl text-brand-ink/80 leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  )
}

function AnimatedStat({ value, label }: { value: number, label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: 'easeOut',
        onUpdate(v) {
          setCount(Math.floor(v))
        }
      })
      return controls.stop
    }
  }, [inView, value])

  return (
    <div ref={ref} className="flex flex-col space-y-3">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl lg:text-5xl font-bold text-brand-purple"
      >
        {count.toLocaleString()}+
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-brand-ink/70 font-medium leading-relaxed"
      >
        {label}
      </motion.p>
    </div>
  )
}
