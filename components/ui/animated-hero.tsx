"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroWorkflowVisuals } from "@/components/ui/hero-workflow-visuals"
import Image from "next/image"
import { cn } from "@/lib/utils"

const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
}

interface HeroPillProps {
  href: string
  label: string
  variant: 'purple' | 'light'
  staticSrc: string
  gifSrc: string
}

function HeroPill({ href, label, variant, staticSrc, gifSrc }: HeroPillProps) {
  const [state, setState] = useState({ playing: false, key: 0 })

  const playGif = () => {
    if (state.playing) return
    setState({ playing: true, key: Date.now() })
    setTimeout(() => {
      setState(prev => ({ playing: false, key: prev.key }))
    }, 1500)
  }

  return (
    <motion.a
      href={href}
      className={cn(
        'flex items-center gap-4 pl-6 pr-2.5 py-2.5 rounded-full cursor-pointer select-none',
        'font-sans font-semibold text-[17.5px] uppercase tracking-wider whitespace-nowrap',
        'max-[319px]:gap-3 max-[319px]:pl-5 max-[319px]:text-[14px]',
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
      onMouseEnter={playGif}
      onClick={playGif}
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
          <Image
            src={state.playing ? `${gifSrc}?t=${state.key}` : staticSrc}
            alt=""
            width={25}
            height={25}
            className="object-contain"
            unoptimized
          />
      </motion.div>
    </motion.a>
  )
}

function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ["websites", "apps", "software", "automation", "products"],
    [],
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <section
      id="home"
      className="overflow-hidden bg-brand-white pt-24 md:pt-28 lg:pt-16"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid min-h-[600px] grid-cols-1 items-center gap-8 py-8 md:gap-10 lg:min-h-[720px] lg:grid-cols-2 lg:gap-12 lg:py-12">
          <div className="relative z-30 flex w-full flex-col items-center gap-5 lg:items-start">
            <div className="pointer-events-auto">
              <Button
                variant="secondary"
                size="sm"
                className="h-9 gap-2.5 rounded-[8px] px-4 font-sans text-[10px] uppercase tracking-widest md:h-8 md:px-2.5"
              >
                The Big 3 <MoveRight className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex flex-col gap-5 text-center lg:text-left">
              <h1 className="font-display text-[clamp(3.15rem,13vw,4.35rem)] leading-[0.98] text-brand-ink drop-shadow-md max-[319px]:text-[13vw] md:text-[clamp(2.75rem,5.5vw,4.4rem)] md:leading-[1.03] lg:text-[clamp(3rem,4.5vw,4.8rem)]">
                <span className="block md:inline">Think Big.</span>{" "}
                <span className="block md:inline">We Build</span>
                <span className="relative block h-[1.05em] overflow-hidden text-brand-purple">
                  {titles.map((title, index) => (
                    <motion.span
                      key={title}
                      className="absolute inset-x-0 whitespace-nowrap text-center lg:text-left"
                      initial={{ opacity: 0, y: -80 }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? { y: 0, opacity: 1 }
                          : {
                              y: titleNumber > index ? -120 : 120,
                              opacity: 0,
                            }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <p className="mx-auto max-w-[19rem] font-sans text-[1.08rem] leading-[1.7] text-brand-ink-muted drop-shadow-sm md:max-w-xl md:text-body-md lg:mx-0 lg:text-body-lg">
                Websites, apps, software, and AI automation — built to your
                exact requirements.
              </p>
            </div>

            <div className="pointer-events-auto flex w-full flex-row flex-wrap justify-center gap-3 lg:justify-start">
              <HeroPill
                href="tel:+919016856450"
                label="Jump on a call "
                variant="purple"
                staticSrc="/gif/call-static.webp"
                gifSrc="/gif/call.gif"
              />
              <HeroPill
                href="#portfolio"
                label="See our work"
                variant="light"
                staticSrc="/gif/arrow-static.webp"
                gifSrc="/gif/arrow.gif"
              />
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[380px] md:max-w-[560px] lg:max-w-[520px]">
            {/* Fixed-aspect stage: the video zooms into the character region of the
                16:9 source via % offsets, so the crop scales with the wrapper.
                Below lg the stage is taller (4/5) and the character sits smaller
                at the left so the floating cards fit on the right. */}
            <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[6/7]">
              <video
                src="/video/Hero_video.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute bottom-0 left-[-45%] w-[140%] max-w-none object-contain md:left-[-41%] lg:left-[-30%] lg:w-[170%]"
              />
            </div>
            <HeroWorkflowVisuals />
          </div>
        </div>
      </div>
    </section>
  )
}

export { AnimatedHero }
