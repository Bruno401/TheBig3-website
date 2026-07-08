'use client'

import { useEffect, useRef } from 'react'

export default function AudioProvider({ children }: { children: React.ReactNode }) {
  const clickAudio = useRef<HTMLAudioElement | null>(null)
  const popAudio = useRef<HTMLAudioElement | null>(null)
  const projectHoverAudio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    clickAudio.current = new Audio('/audio/click.mp3')
    popAudio.current = new Audio('/audio/pop.mp3')
    projectHoverAudio.current = new Audio('/audio/projectHover.mp3')
    
    // Reduce volume of pop.mp3 by 50%
    popAudio.current.volume = 0.5

    clickAudio.current.preload = 'auto'
    popAudio.current.preload = 'auto'
    projectHoverAudio.current.preload = 'auto'
  }, [])

  useEffect(() => {
    const playSound = (audio: HTMLAudioElement | null) => {
      if (audio) {
        audio.currentTime = 0
        audio.play().catch(e => {
          // Ignore play errors (e.g. autoplay restrictions before user interaction)
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // If clicking a project in portfolio
      if (target.closest('[data-project="true"]')) {
        playSound(clickAudio.current)
        return
      }
      
      // If clicking any button or link
      if (target.closest('button') || target.closest('a')) {
        playSound(clickAudio.current)
      }
    }

    let lastHovered: HTMLElement | null = null

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // If hovering a project in portfolio
      const projectEl = target.closest('[data-project="true"]') as HTMLElement
      if (projectEl) {
        if (lastHovered !== projectEl) {
          playSound(projectHoverAudio.current)
          lastHovered = projectEl
        }
        return
      }

      // Do not add generic hover sounds to elements inside the portfolio section
      if (target.closest('#portfolio')) {
        lastHovered = null
        return
      }
      
      // If hovering menu links, form buttons, inputs, buttons, anchor tags
      const interactiveEl = target.closest('button, a, input, textarea, [data-sound-hover="pop"]') as HTMLElement
      if (interactiveEl) {
        if (lastHovered !== interactiveEl) {
          playSound(popAudio.current)
          lastHovered = interactiveEl
        }
        return
      }
      
      lastHovered = null
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return <>{children}</>
}
