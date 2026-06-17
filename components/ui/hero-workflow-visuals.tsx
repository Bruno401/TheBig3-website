"use client"

import { motion } from "framer-motion"

/* ────────────────────────────────────────────────────────────
 * HeroWorkflowVisuals
 *
 * Right-side floating UI composition for the hero section.
 * Consists of:
 *   1. Purple dot node (top)
 *   2. Dashed vertical connector
 *   3. Browser-style code card
 *   4. Dashed L-shaped workflow path
 *   5. Process automation card
 *   6. Small decorative purple ring
 *
 * All elements use absolute positioning within the hero's
 * right column area. The character (video) sits behind these
 * elements — this component only renders the floating UI.
 * ──────────────────────────────────────────────────────────── */

/* ── Shared animation config ── */

const floatCodeCard = {
  y: [0, -10, 0],
  transition: {
    duration: 4,
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
}

const floatProcessCard = {
  y: [0, -8, 0],
  transition: {
    duration: 4.5,
    ease: "easeInOut" as const,
    repeat: Infinity,
    delay: 0.8,
  },
}

const pulseNode = {
  scale: [1, 1.3, 1],
  opacity: [0.7, 1, 0.7],
  transition: {
    duration: 2.5,
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

/* ── Sub-components ── */

function BrowserDots() {
  return (
    <div className="flex items-center gap-[5px]">
      <span className="w-[7px] h-[7px] rounded-full bg-[#FF6259]" />
      <span className="w-[7px] h-[7px] rounded-full bg-[#FFBF2F]" />
      <span className="w-[7px] h-[7px] rounded-full bg-[#29CE42]" />
    </div>
  )
}

function CodeCardContent() {
  return (
    <div className="font-mono text-[12px] md:text-[13px] leading-[1.8] text-brand-ink-muted select-none">
      <p>
        <span className="text-brand-ink-muted/60">{"// "}</span>
        <span>automate</span>
      </p>
      <p>
        <span className="text-brand-ink-muted/60">{"// "}</span>
        <span>simplify</span>
      </p>
      <p>
        <span className="text-brand-ink-muted/60">{"// "}</span>
        <span>scale</span>
      </p>
      <p className="mt-3 text-brand-purple font-medium">
        {"<the big 3 />"}
      </p>
    </div>
  )
}




/* ── Main export ── */

function HeroWorkflowVisuals() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-20"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      {/* ── 1. Purple dot node ── */}
      <motion.div
        className="absolute"
        style={{
          top: "2%",
          right: "18%",
        }}
        variants={fadeInUp}
      >
        <motion.div
          className="w-[10px] h-[10px] rounded-full bg-brand-purple"
          animate={pulseNode}
        />
      </motion.div>

      {/* ── 2. Dashed vertical line from dot to code card ── */}
      <motion.div
        className="absolute"
        style={{
          top: "5%",
          right: "calc(18% + 4px)",
          width: "1.5px",
          height: "8%",
        }}
        variants={fadeInUp}
      >
        <svg
          width="2"
          height="100%"
          className="w-full h-full"
          aria-hidden="true"
        >
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="#A392C6"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
        </svg>
      </motion.div>

      {/* ── 3. Browser-style Code Card ── */}
      <motion.div
        className="absolute"
        style={{
          top: "13%",
          right: "14%",
        }}
        variants={fadeInUp}
      >
        <motion.div
          className="
            w-[180px] md:w-[210px] lg:w-[230px]
            bg-white
            border border-brand-border
            rounded-[20px] md:rounded-[24px]
            px-5 py-4 md:px-6 md:py-5
          "
          style={{
            boxShadow: "0 4px 24px rgba(18, 14, 30, 0.06), 0 1px 4px rgba(18, 14, 30, 0.03)",
          }}
          animate={floatCodeCard}
        >
          {/* Browser dots */}
          <div className="mb-4">
            <BrowserDots />
          </div>

          {/* Code content */}
          <CodeCardContent />
        </motion.div>

        {/* ── 4. SVG Dashed L-connector from code card to process card ── */}
        <svg
          className="absolute pointer-events-none"
          width="150"
          height="150"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            top: "100%",
            left: "50%",
            marginTop: "-2px",
          }}
          aria-hidden="true"
        >
          <path
            d="M0 0 L0 80 Q0 100 20 100 L110 100"
            stroke="#A392C6"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* ── 5. Process Automation Card ── */}
      <motion.div
        className="absolute"
        style={{
          top: "54%",
          right: "8%",
        }}
        variants={fadeInUp}
      >
        <motion.div
          className="
            w-[130px] md:w-[140px] lg:w-[150px]
            bg-white
            border border-brand-border
            rounded-[18px] md:rounded-[20px]
            px-4 py-3.5 md:px-5 md:py-4
          "
          style={{
            boxShadow: "0 4px 20px rgba(18, 14, 30, 0.05), 0 1px 3px rgba(18, 14, 30, 0.02)",
          }}
          animate={floatProcessCard}
        >
          {/* Top row — icon + status dot */}
          <div className="flex items-start justify-between mb-2.5">
            {/* Purple circle icon */}
            <div className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] rounded-full bg-brand-lavender flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7562AB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Tiny status indicator */}
            <div className="w-[8px] h-[8px] rounded-full bg-[#29CE42] mt-1" />
          </div>

          {/* Text */}
          <p className="font-sans text-[13px] md:text-[14px] font-medium text-brand-ink leading-tight">
            Process
          </p>
          <p className="font-sans text-[11px] md:text-[12px] text-brand-ink-muted leading-tight mt-0.5">
            Automated
          </p>
        </motion.div>
      </motion.div>

      {/* ── 6. Decorative outlined purple ring ── */}
      <motion.div
        className="absolute"
        style={{
          top: "60%",
          right: "30%",
        }}
        variants={fadeInUp}
      >
        <div className="w-[14px] h-[14px] rounded-full border-[1.5px] border-brand-purple-light" />
      </motion.div>
    </motion.div>
  )
}

export { HeroWorkflowVisuals }
