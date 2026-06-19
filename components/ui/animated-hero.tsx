"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { PhoneCall, ArrowRight, MoveRight } from "lucide-react"
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
  StaticIcon: React.ElementType
  gifSrc: string
}

function HeroPill({ href, label, variant, StaticIcon, gifSrc }: HeroPillProps) {
  const [hovered, setHovered] = useState(false)
  const [gifKey, setGifKey] = useState(0)

  return (
    <motion.a
      href={href}
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
      onMouseEnter={() => { setHovered(true); setGifKey(Date.now()) }}
      onMouseLeave={() => setHovered(false)}
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
      id="hero"
      className="min-h-screen overflow-hidden bg-brand-white pt-24 md:pt-28 lg:pt-16"
    >
      <div className="container mx-auto">
        <div className="relative grid items-start gap-4 py-4 md:min-h-[calc(100svh-7rem)] md:grid-cols-[minmax(0,0.92fr)_minmax(320px,1.08fr)] md:items-center md:gap-4 md:py-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,0.68fr)] lg:gap-8 lg:py-24 xl:py-28">
          <div className="relative z-30 flex w-full flex-col items-center gap-5 md:items-start lg:max-w-[44rem]">
            <div className="pointer-events-auto">
              <Button
                variant="secondary"
                size="sm"
                className="h-9 gap-2.5 rounded-[8px] px-4 font-sans text-[10px] uppercase tracking-widest md:h-8 md:px-2.5"
              >
                The Big 3 <MoveRight className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex flex-col gap-5 text-center md:text-left">
              <h1 className="font-display text-[clamp(3.15rem,13vw,4.35rem)] leading-[0.98] text-brand-ink drop-shadow-md md:text-[clamp(2.35rem,4.8vw,4.4rem)] md:leading-[1.03] lg:text-[clamp(3.4rem,5.4vw,4.8rem)]">
                <span className="block lg:inline">Think Big.</span>{" "}
                <span className="block lg:inline">We Build</span>
                <span className="relative block h-[1.05em] overflow-hidden text-brand-purple">
                  {titles.map((title, index) => (
                    <motion.span
                      key={title}
                      className="absolute inset-x-0 text-center md:text-left"
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

              <p className="mx-auto max-w-[19rem] font-sans text-[1.08rem] leading-[1.7] text-brand-ink-muted drop-shadow-sm md:mx-0 md:max-w-xl md:text-body-md lg:text-body-lg">
                Websites, apps, software, and AI automation — built to your
                exact requirements.
              </p>
            </div>

            <div className="pointer-events-auto flex w-full flex-row flex-wrap gap-3 md:justify-start">
              <HeroPill
                href="#contact"
                label="Jump on a call"
                variant="purple"
                StaticIcon={PhoneCall}
                gifSrc="/gif/chat.gif"
              />
              <HeroPill
                href="#portfolio"
                label="See our work"
                variant="light"
                StaticIcon={ArrowRight}
                gifSrc="/gif/meeting.gif"
              />
            </div>
          </div>

          <div className="relative z-10 mx-auto h-[430px] w-full max-w-[430px] md:mt-0 md:h-[520px] md:max-w-none md:translate-y-4 lg:h-[560px] lg:translate-y-8 xl:h-[640px]">
            <video
              src="/video/Hero_video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute bottom-[-8%] left-[-48%] z-10 w-[132%] max-w-none object-contain md:bottom-[2%] md:left-[-7%] md:w-[105%] lg:bottom-[-4%] lg:left-[-38%] lg:w-[130%] xl:left-[-34%]"
            />
            <HeroWorkflowVisuals />
          </div>
        </div>
      </div>
    </section>
  )
}

export { AnimatedHero }
