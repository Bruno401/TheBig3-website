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
    <div className="select-none font-mono text-[11px] leading-[1.8] text-brand-ink-muted md:text-[12px] lg:text-[13px]">
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
        className="absolute right-[24%] top-[2%] md:right-[14%] md:top-[7%] lg:right-[18%] lg:top-[2%]"
        variants={fadeInUp}
      >
        <motion.div
          className="h-[9px] w-[9px] rounded-full bg-brand-purple md:h-[10px] md:w-[10px]"
          animate={pulseNode}
        />
      </motion.div>

      {/* ── 2. Dashed vertical line from dot to code card ── */}
      <motion.div
        className="absolute right-[calc(24%_+_4px)] top-[5%] h-[8%] w-[1.5px] md:right-[calc(14%_+_4px)] md:top-[10%] md:h-[7%] lg:right-[calc(18%_+_4px)] lg:top-[5%] lg:h-[8%]"
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
        className="absolute right-[3%] top-[13%] md:right-0 md:top-[17%] lg:right-[9%] lg:top-[13%]"
        variants={fadeInUp}
      >
        <motion.div
          className="
            w-[194px] md:w-[190px] lg:w-[230px]
            bg-white
            border border-brand-border
            rounded-[18px] md:rounded-[20px] lg:rounded-[24px]
            px-4 py-3.5 md:px-5 md:py-4 lg:px-6 lg:py-5
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
          width="142"
          height="142"
          viewBox="0 0 142 142"
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
            d="M0 0 L0 76 Q0 96 20 96 L110 96"
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
        className="absolute right-[2%] top-[54%] md:right-0 md:top-[58%] lg:right-[2%] lg:top-[54%]"
        variants={fadeInUp}
      >
        <motion.div
          className="
            w-[120px] md:w-[126px] lg:w-[150px]
            bg-white
            border border-brand-border
            rounded-[16px] md:rounded-[18px] lg:rounded-[20px]
            px-3.5 py-3 md:px-4 md:py-3.5 lg:px-5 lg:py-4
          "
          style={{
            boxShadow: "0 4px 20px rgba(18, 14, 30, 0.05), 0 1px 3px rgba(18, 14, 30, 0.02)",
          }}
          animate={floatProcessCard}
        >
          {/* Top row — icon + status dot */}
          <div className="mb-2.5 flex items-start justify-between">
            {/* Purple circle icon */}
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-brand-lavender md:h-[36px] md:w-[36px] lg:h-[40px] lg:w-[40px]">
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
          <p className="font-sans text-[12px] font-medium leading-tight text-brand-ink md:text-[13px] lg:text-[14px]">
            Process
          </p>
          <p className="mt-0.5 font-sans text-[10px] leading-tight text-brand-ink-muted md:text-[11px] lg:text-[12px]">
            Automated
          </p>
        </motion.div>
      </motion.div>

      {/* ── 6. Decorative outlined purple ring ── */}
      <motion.div
        className="absolute right-[44%] top-[64%] md:right-[34%] md:top-[60%] lg:right-[30%]"
        variants={fadeInUp}
      >
        <div className="h-[14px] w-[14px] rounded-full border-[1.5px] border-brand-purple-light" />
      </motion.div>
    </motion.div>
  )
}

export { HeroWorkflowVisuals }
