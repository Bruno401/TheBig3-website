"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { MoveRight, PhoneCall } from "lucide-react"
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
      <div className="container mx-auto">
        <div className="flex gap-6 py-20 lg:py-40 items-start justify-center flex-col">

          {/* Eyebrow label */}
          <div>
            <Button variant="secondary" size="sm" className="gap-3 font-sans text-label uppercase tracking-widest">
              The Big 3 <MoveRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Headline */}
          <div className="flex gap-4 flex-col">
            <h1 className="font-display text-display-xl max-w-3xl tracking-tighter text-left text-brand-ink">
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
            <p className="font-sans text-body-xl text-brand-ink-muted max-w-2xl text-left">
              Websites, apps, software, and AI automation — built to your exact
              requirements.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-row gap-3 flex-wrap justify-start">
            <Button size="lg" variant="outline" className="gap-3" asChild>
              <a href="#contact">
                Jump on a call <PhoneCall className="w-4 h-4" />
              </a>
            </Button>
            <Button size="lg" className="gap-3" asChild>
              <a href="#portfolio">
                See our work <MoveRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}

export { AnimatedHero }
