'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const UI = '/images/game_assets/ui'

// Audio prefs persist across visits and are pushed into the running game via
// the Phaser registry, where GameScene checks them before playing anything.
const AUDIO_PREFS_KEY = 'big3-runner-audio'

type AudioPrefs = { musicOn: boolean; sfxOn: boolean }

function loadAudioPrefs(): AudioPrefs {
  if (typeof window === 'undefined') return { musicOn: true, sfxOn: true }
  try {
    const saved = JSON.parse(window.localStorage.getItem(AUDIO_PREFS_KEY) ?? '{}')
    return { musicOn: saved.musicOn !== false, sfxOn: saved.sfxOn !== false }
  } catch {
    return { musicOn: true, sfxOn: true }
  }
}

// Phaser is imported dynamically (client-side only) to avoid SSR issues.
// The game instance is created once on mount and destroyed on unmount.
// `rotated` = the container is CSS-rotated 90° for portrait screens; Phaser's
// FIT mode measures the rotated bounding box and letterboxes the canvas, so
// in that case we use NONE — the container is already exactly game-sized.
export function GameCanvas({ rotated = false }: { rotated?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<import('phaser').Game | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [prefs, setPrefs] = useState<AudioPrefs>(loadAudioPrefs)
  const prefsRef = useRef(prefs)

  useEffect(() => {
    prefsRef.current = prefs
    try {
      window.localStorage.setItem(AUDIO_PREFS_KEY, JSON.stringify(prefs))
    } catch {
      // private mode etc. — prefs just won't persist
    }
    gameRef.current?.registry.set('musicOn', prefs.musicOn)
    gameRef.current?.registry.set('sfxOn', prefs.sfxOn)
  }, [prefs])

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

      const game = new Phaser.Game({
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
          mode: rotated ? Phaser.Scale.NONE : Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: w,
          height: h,
        },
        render: {
          antialias: true,
          pixelArt: false,
        },
        banner: false,
      })

      // Seed audio prefs before the scene boots so the first sounds respect them
      game.registry.set('musicOn', prefsRef.current.musicOn)
      game.registry.set('sfxOn', prefsRef.current.sfxOn)
      gameRef.current = game
    }

    init()

    return () => {
      gameRef.current?.destroy(true)
      gameRef.current = null
    }
  }, [rotated])

  const pauseGame = useCallback(() => {
    const game = gameRef.current
    if (!game) return
    if (!game.scene.isPaused('GameScene')) game.scene.pause('GameScene')
    setIsPaused(true)
  }, [])

  const resumeGame = useCallback(() => {
    const game = gameRef.current
    if (!game) return
    if (game.scene.isPaused('GameScene')) game.scene.resume('GameScene')
    setIsPaused(false)
  }, [])

  // Music must not keep playing when the player scrolls away, so a run in
  // progress auto-pauses once the card leaves the viewport (the scene pauses
  // its own music on PAUSE). Start/game-over screens are silent already.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) return
      const game = gameRef.current
      if (game && game.registry.get('phase') === 'running' && !game.scene.isPaused('GameScene')) {
        pauseGame()
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [pauseGame])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 overflow-hidden" />

      {/* HUD controls in the game's own button art, sitting right of the
          hearts row the scene draws at the top-left of the canvas. */}
      <div className="absolute top-2 left-[142px] z-20 flex items-center gap-2">
        <ArtButton
          src={isPaused ? `${UI}/play.webp` : `${UI}/pause.webp`}
          label={isPaused ? 'Resume game' : 'Pause game'}
          onClick={() => (isPaused ? resumeGame() : pauseGame())}
        />
        <ArtButton
          src={`${UI}/setting.webp`}
          label="Audio settings"
          pressed={settingsOpen}
          onClick={() => setSettingsOpen((o) => !o)}
        />
      </div>

      {settingsOpen && (
        <div className="absolute top-[56px] left-[142px] z-20 w-52 rounded-2xl border border-[#c9a8e2]/30 bg-[#1a0a2e]/95 p-4 font-sans shadow-xl backdrop-blur-sm">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a8e2]/70">
            Audio
          </p>
          <ToggleRow
            label="Music"
            on={prefs.musicOn}
            onToggle={() => setPrefs((p) => ({ ...p, musicOn: !p.musicOn }))}
          />
          <ToggleRow
            label="Sound FX"
            on={prefs.sfxOn}
            onToggle={() => setPrefs((p) => ({ ...p, sfxOn: !p.sfxOn }))}
          />
        </div>
      )}
    </div>
  )
}

// Buttons blur themselves after a click: the game jumps on SPACE, and a
// still-focused button would get "clicked" again by that same key press.
function ArtButton({
  src,
  label,
  pressed,
  onClick,
}: {
  src: string
  label: string
  pressed?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      onClick={(e) => {
        e.currentTarget.blur()
        onClick()
      }}
      className="h-10 w-10 cursor-pointer drop-shadow-md transition-transform hover:scale-110 active:scale-95"
    >
      <img src={src} alt="" draggable={false} className="h-full w-full select-none object-contain" />
    </button>
  )
}

function ToggleRow({
  label,
  on,
  onToggle,
}: {
  label: string
  on: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={(e) => {
        e.currentTarget.blur()
        onToggle()
      }}
      className="flex w-full cursor-pointer items-center justify-between gap-4 py-2"
    >
      <span className="text-[13px] font-bold text-white/90">{label}</span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          on ? 'bg-[#7b2d8b]' : 'bg-white/20'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            on ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
    </button>
  )
}
