'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'

// Phaser is imported dynamically (client-side only) to avoid SSR issues.
// The game instance is created once on mount and destroyed on unmount.
export function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<import('phaser').Game | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return

    const container = containerRef.current

    const init = async () => {
      const [Phaser, { GameScene }] = await Promise.all([
        import('phaser').then((m) => m.default),
        import('./GameScene'),
      ])

      // Guard against double-init (React StrictMode fires effects twice in dev)
      if (gameRef.current || !containerRef.current) return

      const w = container.clientWidth || 900
      const h = container.clientHeight || 500

      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        width: w,
        height: h,
        backgroundColor: '#1a0a2e',
        parent: container,
        scene: [GameScene],
        physics: {
          default: 'arcade',
          arcade: { gravity: { x: 0, y: 0 }, debug: false },
        },
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: w,
          height: h,
        },
        render: {
          antialias: true,
          pixelArt: false,
        },
        audio: { noAudio: true },
        banner: false,
      })
    }

    init()

    return () => {
      gameRef.current?.destroy(true)
      gameRef.current = null
    }
  }, [])

  const togglePause = useCallback(() => {
    const game = gameRef.current
    if (!game) return
    if (isPaused) {
      game.scene.resume('GameScene')
      setIsPaused(false)
    } else {
      game.scene.pause('GameScene')
      setIsPaused(true)
    }
  }, [isPaused])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 overflow-hidden" />

      <button
        type="button"
        onClick={togglePause}
        aria-label={isPaused ? 'Play' : 'Pause'}
        className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-colors cursor-pointer"
      >
        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
      </button>
    </div>
  )
}
