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
  const [activeSection, setActiveSection] = useState('portfolio')
  
  const [chatState, setChatState] = useState({ playing: false, key: 0 })
  const playChat = () => {
    if (chatState.playing) return
    setChatState({ playing: true, key: Date.now() })
    setTimeout(() => {
      setChatState(prev => ({ playing: false, key: prev.key }))
    }, 1500)
  }
  
  const [menuState, setMenuState] = useState({ playing: false, key: 0 })
  const playMenu = () => {
    if (menuState.playing) return
    setMenuState({ playing: true, key: Date.now() })
    setTimeout(() => {
      setMenuState(prev => ({ playing: false, key: prev.key }))
    }, 1500)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const sections = ['home', 'about', 'services', 'portfolio', 'ai-automation', 'contact']
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 3) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
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
            <span className="font-display text-[25px] font-bold text-brand-ink tracking-widest">
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
            onMouseEnter={playChat}
            onClick={playChat}
          >
            Chat with us
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-white shrink-0"
              whileHover={{ scale: 1.1 }}
              transition={springTransition}
            >
              <Image
                src={chatState.playing ? `/gif/chat.gif?t=${chatState.key}` : '/gif/chat-static.png'}
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
            onClick={() => {
              playMenu()
              setMenuOpen((prev) => !prev)
            }}
            className={cn(
              'flex items-center gap-4 pl-6 pr-2.5 py-2.5 rounded-full cursor-pointer select-none',
              'bg-brand-purple text-white font-sans font-semibold text-[17.5px] uppercase tracking-wider',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/50'
            )}
            whileHover={{ scale: 1.05, boxShadow: '0 6px 24px rgba(0,0,0,0.40)' }}
            transition={springTransition}
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.25)' }}
            onMouseEnter={playMenu}
          >
            Menu
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shrink-0"
              whileHover={{ scale: 1.1 }}
              transition={springTransition}
            >
              <Image
                src={menuState.playing ? `/gif/menu.gif?t=${menuState.key}` : '/gif/menu-static.png'}
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
          onClick={() => {
            playMenu()
            setMenuOpen((prev) => !prev)
          }}
          onMouseEnter={playMenu}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          whileHover={{ scale: 1.05 }}
          transition={springTransition}
        >
          Menu
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white">
            <Image
              src={menuState.playing ? `/gif/menu.gif?t=${menuState.key}` : '/gif/menu-static.png'}
              alt="Menu"
              width={20}
              height={20}
              className="object-contain"
              unoptimized
            />
          </span>
        </motion.button>
      </nav>

      {/* ── Dropdown Nav Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[9998]"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed z-[10000] top-[5.5rem] right-5 md:top-[6.5rem] md:right-12 bg-[#F3F4F6] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col px-8 py-8 rounded-[2rem] min-w-[220px]"
              initial={{ opacity: 0, y: -10, scale: 0.95, transformOrigin: 'top right' }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <nav className="flex flex-col gap-4">
                {[
                  { href: '#home', label: 'Home' },
                  { href: '#about', label: 'About Us' },
                  { href: '#services', label: 'Service' },
                  { href: '#portfolio', label: 'Portfolio' },
                  { href: '#products', label: 'Products' },
                  { href: '#ai-automation', label: 'Ai Automation' },
                  { href: '#contact', label: 'Contact' },
                ].map((link) => {
                  const isActive = activeSection === link.href.slice(1)
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      data-sound-hover="pop"
                      onClick={() => {
                        setMenuOpen(false)
                        setActiveSection(link.href.slice(1))
                      }}
                      className={cn(
                        "font-sans text-[32px] md:text-[36px] font-bold tracking-tight transition-colors",
                        isActive ? "text-brand-ink/40" : "text-brand-ink hover:text-brand-purple"
                      )}
                    >
                      {link.label}
                    </a>
                  )
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
