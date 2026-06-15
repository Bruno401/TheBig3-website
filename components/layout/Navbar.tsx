'use client'

import Link from 'next/link'
import { navigationLinks } from '@/data/navigation'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-brand-white/95 backdrop-blur-md border-b border-brand-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav
        className="container mx-auto h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" aria-label="The Big 3 — Home">
          <span className="font-display text-xl font-bold text-brand-ink tracking-tight">
            THE BIG 3
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-body-sm text-brand-ink-muted hover:text-brand-purple transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-brand-purple text-white text-body-sm font-medium hover:bg-brand-ink transition-colors duration-200"
        >
          Get in touch
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-brand-ink"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-white border-t border-brand-border px-6 py-6">
          <ul className="flex flex-col gap-5" role="list">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-body-lg text-brand-ink hover:text-brand-purple transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={handleNavClick}
            className="mt-6 flex items-center justify-center px-5 py-3 rounded-lg bg-brand-purple text-white font-medium text-body-md hover:bg-brand-ink transition-colors duration-200"
          >
            Get in touch
          </a>
        </div>
      )}
    </header>
  )
}
