"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { MoveRight, PhoneCall } from "lucide-react"
import { HeroWorkflowVisuals } from "@/components/ui/hero-workflow-visuals"
import { HeroKpiCard } from "@/components/ui/hero-kpi-card"
import { Button } from "@/components/ui/button"

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
      className="min-h-screen flex items-center bg-brand-white pt-16"
    >
      <div className="container mx-auto relative">
        
        {/* Absolute Centered & Slightly Left Video Layer */}
        <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none">
          <video
            src="/video/hero_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-lg lg:max-w-3xl scale-[1.2] translate-x-[5%] translate-y-[15%] object-contain"
          />
        </div>

        {/* Right-side floating workflow UI elements */}
        <HeroWorkflowVisuals />

        {/* Cycling KPI stats card — centered temporarily */}
        <HeroKpiCard />

        <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-8 py-20 lg:py-40 items-center justify-between pointer-events-none">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-5 items-start justify-center w-full lg:w-[60%]">

          {/* Eyebrow label */}
          <div className="pointer-events-auto">
            <Button variant="secondary" size="sm" className="gap-2.5 font-sans text-[10px] uppercase tracking-widest h-8 px-2.5">
              The Big 3 <MoveRight className="w-3 h-3" />
            </Button>
          </div>

          {/* Headline */}
          <div className="flex gap-3 flex-col pointer-events-auto">
            <h1 className="font-display text-[clamp(2.4rem,6.4vw,4.8rem)] leading-[1.05] tracking-tighter max-w-2xl text-left text-brand-ink drop-shadow-md">
              <span>Think Big. We Build</span>
              <span className="relative flex w-full justify-start overflow-hidden text-left md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute text-brand-purple"
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

            {/* Subtext */}
            <p className="font-sans text-body-md text-brand-ink-muted max-w-xl text-left drop-shadow-sm pointer-events-auto">
              Websites, apps, software, and AI automation — built to your exact
              requirements.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-row gap-2.5 flex-wrap justify-start pointer-events-auto">
            <Button size="default" variant="outline" className="gap-2.5" asChild>
              <a href="#contact">
                Jump on a call <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </Button>
            <Button size="default" className="gap-2.5" asChild>
              <a href="#portfolio">
                See our work <MoveRight className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>

          </div>

          {/* Right Column Removed (Video is now absolutely positioned) */}


        </div>
      </div>
    </section>
  )
}

export { AnimatedHero }
