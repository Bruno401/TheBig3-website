"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

/* ────────────────────────────────────────────────────────────
 * HeroKpiCard
 *
 * Single 125×100px floating card that cycles through 3 KPI
 * metrics every 1 second with a horizontal slide transition.
 * Placed at absolute center — reposition via className prop.
 * ──────────────────────────────────────────────────────────── */

/* ── Icons ── */

function BriefcaseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="#FFFFFF"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

/* ── Metrics data ── */

interface Metric {
  id: string
  icon: React.ReactNode
  value: string
  label: string
}

const metrics: Metric[] = [
  {
    id: "projects",
    icon: <BriefcaseIcon />,
    value: "50+",
    label: "Projects Delivered",
  },
  {
    id: "satisfaction",
    icon: <StarIcon />,
    value: "98%",
    label: "Client Satisfaction",
  },
  {
    id: "years",
    icon: <CodeIcon />,
    value: "5+",
    label: "Years of Building",
  },
]

/* ── Animation variants ── */

const fadeVariants = {
  enter: {
    opacity: 0,
    y: 6,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ── Props ── */

interface HeroKpiCardProps {
  className?: string
}

/* ── Component ── */

export function HeroKpiCard({ className = "" }: HeroKpiCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  /* Total cycle = 0.5s fade-in + 3s hold + 0.5s fade-out = 4s */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % metrics.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const current = metrics[currentIndex]

  return (
    /* Outer wrapper — positioning */
    <div
      className={`absolute z-30 pointer-events-none ${className}`}
      style={{
        left: "825px",
        bottom: "75px",
      }}
    >
      {/* Card shell — fixed 125×100px */}
      <div
        style={{
          width: "125px",
          height: "100px",
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Metric content — slides in/out */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
              padding: "10px 8px",
            }}
          >
            {/* Icon */}
            <div style={{ marginBottom: "2px" }}>{current.icon}</div>

            {/* Metric value */}
            <p
              style={{
                fontFamily: "inherit",
                fontSize: "30px",
                fontWeight: 600,
                lineHeight: 1,
                color: "#FFFFFF",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {current.value}
            </p>

            {/* Label */}
            <p
              style={{
                fontFamily: "inherit",
                fontSize: "11px",
                fontWeight: 500,
                lineHeight: 1.3,
                color: "#FFFFFF",
                margin: 0,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {current.label}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
