'use client'

import { useEffect } from 'react'

// Short haptic tap when pressing buttons/links, phones and tablets only.
// All conditions are checked per click: the Vibration API must exist
// (Android browsers have it; iOS Safari doesn't and silently gets nothing)
// and the device must be touch-first, so mouse clicks never vibrate — even
// on touch-screen laptops, whose primary pointer is still fine.
export default function HapticFeedback() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target?.closest('button, a, [role="button"], [role="switch"]')) return
      if (!('vibrate' in navigator)) return
      if (!window.matchMedia('(hover: none) and (pointer: coarse)').matches) return
      try {
        navigator.vibrate(15)
      } catch {
        // Vibration is best-effort feedback; never let it break a click.
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
