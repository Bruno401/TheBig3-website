'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  const [isChatHovered, setIsChatHovered] = useState(false)
  const [chatKey, setChatKey] = useState(0)
  
  const [isMenuHovered, setIsMenuHovered] = useState(false)
  const [menuKey, setMenuKey] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className="fixed z-[9999] pointer-events-none inset-0 w-full h-0">
        
        {/* ── Logo ── */}
        <motion.div
          className="pointer-events-auto absolute top-5 left-5 md:top-10 md:left-12"
          animate={{
            opacity: scrolled ? 0 : 1,
            y: scrolled ? -20 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          style={{ pointerEvents: scrolled ? 'none' : 'auto' }}
        >
          <Link href="/" aria-label="The Big 3 — Home">
            <span className="font-display text-[25px] font-bold text-brand-ink tracking-tight">
              THE BIG 3
            </span>
          </Link>
        </motion.div>

        {/* ── Desktop pill buttons ── */}
        <div className="hidden md:flex pointer-events-auto absolute top-8 right-12 items-center gap-3">
          
          {/* Chat pill */}
          <motion.a
            href="#contact"
            aria-label="Chat with The Big 3"
            className={cn(
              'flex items-center gap-4 pl-6 pr-2.5 py-2.5 rounded-full cursor-pointer select-none',
              'bg-brand-border text-brand-ink font-sans font-semibold text-[17.5px] uppercase tracking-wider',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/50'
            )}
            whileHover={{ scale: 1.05, boxShadow: '0 6px 24px rgba(0,0,0,0.14)' }}
            transition={springTransition}
            style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}
            onMouseEnter={() => {
              setIsChatHovered(true)
              setChatKey(Date.now())
            }}
            onMouseLeave={() => setIsChatHovered(false)}
          >
            Chat with us
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-white shrink-0"
              whileHover={{ scale: 1.1 }}
              transition={springTransition}
            >
              <Image
                src={isChatHovered ? `/gif/chat.gif?t=${chatKey}` : '/gif/chat-static.png'}
                alt="Chat"
                width={25}
                height={25}
                className="object-contain"
                unoptimized
              />
            </motion.div>
          </motion.a>

          {/* Menu pill */}
          <motion.button
            aria-label="Open menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className={cn(
              'flex items-center gap-4 pl-6 pr-2.5 py-2.5 rounded-full cursor-pointer select-none',
              'bg-brand-purple text-white font-sans font-semibold text-[17.5px] uppercase tracking-wider',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/50'
            )}
            whileHover={{ scale: 1.05, boxShadow: '0 6px 24px rgba(0,0,0,0.40)' }}
            transition={springTransition}
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.25)' }}
            onMouseEnter={() => {
              setIsMenuHovered(true)
              setMenuKey(Date.now())
            }}
            onMouseLeave={() => setIsMenuHovered(false)}
          >
            Menu
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shrink-0"
              whileHover={{ scale: 1.1 }}
              transition={springTransition}
            >
              <Image
                src={isMenuHovered ? `/gif/menu.gif?t=${menuKey}` : '/gif/menu-static.png'}
                alt="Menu"
                width={22}
                height={22}
                className="object-contain"
                unoptimized
              />
            </motion.div>
          </motion.button>
        </div>

        {/* ── Mobile: single menu pill ── */}
        <motion.button
          className={cn(
            'md:hidden pointer-events-auto absolute top-5 right-5 flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full cursor-pointer',
            'bg-brand-purple text-white font-sans font-semibold text-[17.5px] uppercase tracking-wider',
          )}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          whileHover={{ scale: 1.05 }}
          transition={springTransition}
        >
          Menu
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white">
            <Image
              src="/gif/menu-static.png"
              alt="Menu"
              width={20}
              height={20}
              className="object-contain"
              unoptimized
            />
          </span>
        </motion.button>
      </nav>

      {/* ── Full-screen mobile nav overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[10000] bg-brand-ink flex flex-col px-8 pt-24 pb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="absolute top-5 right-6 text-white text-body-sm uppercase tracking-wider font-semibold"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              Close ✕
            </button>

            <nav className="flex flex-col gap-8 mt-4">
              {[
                { href: '#portfolio', label: 'Portfolio' },
                { href: '#services', label: 'Services' },
                { href: '#about', label: 'About' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-display-md text-white hover:text-brand-purple-light transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-auto flex items-center justify-center px-6 py-3.5 rounded-full bg-brand-purple text-white font-semibold text-body-md hover:bg-brand-purple-light transition-colors"
            >
              Get in touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
