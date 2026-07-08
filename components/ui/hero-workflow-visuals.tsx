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
 * All elements use absolute positioning within the local hero
 * visual stage. The character video sits behind these elements.
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
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
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
      <span className="h-[6px] w-[6px] rounded-full bg-[#FF6259] md:h-[7px] md:w-[7px]" />
      <span className="h-[6px] w-[6px] rounded-full bg-[#FFBF2F] md:h-[7px] md:w-[7px]" />
      <span className="h-[6px] w-[6px] rounded-full bg-[#29CE42] md:h-[7px] md:w-[7px]" />
    </div>
  )
}

function CodeCardContent() {
  return (
    <div className="select-none whitespace-nowrap font-mono text-[11px] leading-[1.8] text-brand-ink-muted max-[319px]:text-[9px] md:text-[12px] lg:text-[13px]">
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
      <p className="mt-2 font-medium text-brand-purple md:mt-3">
        {"<the big 3 />"}
      </p>
    </div>
  )
}




/* ── Main export ── */

function HeroWorkflowVisuals() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-20 overflow-visible"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      {/* ── 1. Purple dot node ── */}
      <motion.div
        className="absolute right-[28%] top-0 lg:right-[24%] lg:top-[-5%]"
        variants={fadeInUp}
      >
        <motion.div
          className="h-[10px] w-[10px] rounded-full bg-brand-purple"
          animate={pulseNode}
        />
      </motion.div>

      {/* ── 2. Dashed vertical line from dot to code card ── */}
      <motion.div
        className="absolute right-[calc(28%_+_3px)] top-[2%] h-[6%] w-[1.5px] lg:right-[calc(24%_+_4px)] lg:top-[-2%] lg:h-[5%]"
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
        className="absolute right-0 top-[9%] w-[48%] max-w-[210px] lg:right-[-4%] lg:top-0 lg:w-[34%]"
        variants={fadeInUp}
      >
        <motion.div
          className="
            w-full
            bg-white
            border border-brand-border
            rounded-[20px] xl:rounded-[24px]
            px-5 py-4 xl:px-6 xl:py-5
            max-[319px]:px-3.5 max-[319px]:py-3
          "
          style={{
            boxShadow: "0 4px 24px rgba(18, 14, 30, 0.06), 0 1px 4px rgba(18, 14, 30, 0.03)",
          }}
          animate={floatCodeCard}
        >
          {/* Browser dots */}
          <div className="mb-4 max-[319px]:mb-2">
            <BrowserDots />
          </div>

          {/* Code content */}
          <CodeCardContent />
        </motion.div>

        {/* ── 4. SVG Dashed L-connector from code card to process card ── */}
        <svg
          className="pointer-events-none absolute h-[150px] w-[75px] max-[319px]:h-[100px] max-[319px]:w-[50px] md:h-[180px] md:w-[90px] lg:h-[200px] lg:w-[100px]"
          viewBox="0 0 100 200"
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
            d="M0 0 L0 136 Q0 156 20 156 L60 156"
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
        className="absolute right-0 top-[52%] w-[38%] max-w-[160px] lg:right-[-8%] lg:top-[50%] lg:w-[30%]"
        variants={fadeInUp}
      >
        <motion.div
          className="
            w-full
            bg-white
            border border-brand-border
            rounded-[18px] xl:rounded-[20px]
            px-4 py-3.5 xl:px-5 xl:py-4
            max-[319px]:px-3 max-[319px]:py-2.5
          "
          style={{
            boxShadow: "0 4px 20px rgba(18, 14, 30, 0.05), 0 1px 3px rgba(18, 14, 30, 0.02)",
          }}
          animate={floatProcessCard}
        >
          {/* Top row — icon + status dot */}
          <div className="mb-2.5 flex items-start justify-between">
            {/* Purple circle icon */}
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-brand-lavender max-[319px]:h-[26px] max-[319px]:w-[26px] md:h-[36px] md:w-[36px] lg:h-[40px] lg:w-[40px]">
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
            <div className="mt-1 h-[8px] w-[8px] rounded-full bg-[#29CE42]" />
          </div>

          {/* Text */}
          <p className="font-sans text-[12px] font-medium leading-tight text-brand-ink max-[319px]:text-[11px] md:text-[13px] lg:text-[14px]">
            Process
          </p>
          <p className="mt-0.5 font-sans text-[10px] leading-tight text-brand-ink-muted max-[319px]:text-[9px] md:text-[11px] lg:text-[12px]">
            Automated
          </p>
        </motion.div>
      </motion.div>

      {/* ── 6. Decorative outlined purple ring ── */}
      <motion.div
        className="absolute left-[50%] top-[58%] lg:left-[4%] lg:top-[70%]"
        variants={fadeInUp}
      >
        <div className="h-[14px] w-[14px] rounded-full border-[1.5px] border-brand-purple-light" />
      </motion.div>
    </motion.div>
  )
}

export { HeroWorkflowVisuals }
