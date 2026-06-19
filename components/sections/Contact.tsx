'use client'

import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { company } from '@/data/company'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CalendarDays, MessageCircle } from 'lucide-react'

const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
}

/* ─────────────────────────────────────────────
   Shared pill button — mirrors the navbar pill.
   - staticIcon : shown when NOT hovering
   - gifSrc     : played ONCE per hover via key change
   ───────────────────────────────────────────── */
interface PillButtonProps {
  href: string
  label: string
  variant: 'purple' | 'light'
  StaticIcon: React.ElementType
  gifSrc: string
}

function PillButton({ href, label, variant, StaticIcon, gifSrc }: PillButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [gifKey, setGifKey] = useState(0)

  const handleMouseEnter = () => {
    setHovered(true)
    setGifKey(Date.now()) // new key forces GIF to restart from frame 1 — plays exactly once
  }
  const handleMouseLeave = () => setHovered(false)

  return (
    <motion.a
      href={href}
      aria-label={label}
      className={cn(
        'flex items-center gap-4 pl-6 pr-2.5 py-2.5 rounded-full cursor-pointer select-none',
        'font-sans font-semibold text-[17.5px] uppercase tracking-wider',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/50',
        variant === 'purple'
          ? 'bg-brand-purple text-white'
          : 'bg-brand-border text-brand-ink',
      )}
      whileHover={{
        scale: 1.05,
        boxShadow: variant === 'purple'
          ? '0 6px 24px rgba(0,0,0,0.40)'
          : '0 6px 24px rgba(0,0,0,0.14)',
      }}
      transition={springTransition}
      style={{
        boxShadow: variant === 'purple'
          ? '0 2px 12px rgba(0,0,0,0.25)'
          : '0 2px 10px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
      <motion.div
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-full shrink-0',
          variant === 'purple' ? 'bg-white' : 'bg-brand-white',
        )}
        whileHover={{ scale: 1.1 }}
        transition={springTransition}
      >
        {hovered ? (
          <Image
            key={gifKey}
            src={`${gifSrc}?t=${gifKey}`}
            alt=""
            width={25}
            height={25}
            className="object-contain"
            unoptimized
          />
        ) : (
          <StaticIcon
            className={cn(
              'h-5 w-5',
              variant === 'purple' ? 'text-brand-purple' : 'text-brand-ink',
            )}
            aria-hidden="true"
          />
        )}
      </motion.div>
    </motion.a>
  )
}

function ContactCopy({ mobile = false }: { mobile?: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-start"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.h2
        id={mobile ? 'contact-heading-mobile' : 'contact-heading'}
        variants={fadeUp}
        className={cn(
          'font-display text-brand-ink',
          mobile
            ? 'text-[clamp(3.75rem,16vw,5rem)] leading-[0.9]'
            : 'text-[clamp(5.5rem,9.5vw,10rem)] leading-[0.9]',
        )}
      >
        Don&apos;t
        <br />
        Be Shy
      </motion.h2>

      <motion.div
        variants={fadeUp}
        className={cn(
          'flex gap-3',
          mobile ? 'mt-6 flex-row flex-wrap' : 'mt-10 flex-row flex-wrap',
        )}
      >
        <PillButton
          href={`mailto:${company.email}`}
          label="Chat with TheBig3"
          variant="purple"
          StaticIcon={MessageCircle}
          gifSrc="/gif/chat.gif"
        />
        <PillButton
          href="https://cal.com"
          label="Book a Meeting"
          variant="light"
          StaticIcon={CalendarDays}
          gifSrc="/gif/meeting.gif"
        />
      </motion.div>
    </motion.div>
  )
}

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative overflow-hidden bg-[#fbf9f8]"
    >
      {/* ── Desktop / Tablet (md+) ── */}
      <div className="relative hidden h-[90svh] min-h-[46rem] max-h-[62rem] md:block">
        <Image
          src="/images/conatct_pc.png"
          alt="The Big 3 mascot sitting on a bench among lavender flowers"
          fill
          sizes="100vw"
          className="object-cover object-right-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,249,248,0.98)_0%,rgba(251,249,248,0.92)_34%,rgba(251,249,248,0.28)_58%,rgba(251,249,248,0)_74%)]"
        />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-12 lg:px-20">
          <div className="w-[53%] max-w-[46rem] pt-12">
            <ContactCopy />
          </div>
        </div>
      </div>

      {/* ── Mobile (<md) ── */}
      <div className="relative mx-auto aspect-[862/1824] w-full max-w-[47.9rem] md:hidden">
        <Image
          src="/images/contact_mobile.png"
          alt="The Big 3 mascot sitting with a notebook among lavender flowers"
          fill
          sizes="100vw"
          className="object-contain object-top"
        />

        <div className="absolute inset-x-0 top-[58%] z-10 px-6 pb-8 sm:px-10">
          <ContactCopy mobile />
        </div>
      </div>
    </section>
  )
}
