"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface HeroActionButtonsProps {
  chatGif?: string
  menuGif?: string
  onChatClick?: () => void
  onMenuClick?: () => void
}

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
}

export function HeroActionButtons({
  chatGif = "/gif/chat.gif",
  menuGif = "/gif/menu.gif",
  onChatClick,
  onMenuClick,
}: HeroActionButtonsProps) {
  return (
    <div
      className="flex flex-col lg:flex-row gap-6 w-full"
      role="group"
      aria-label="Hero actions"
    >
      {/* ── Button 1: Chat ── */}
      <motion.button
        aria-label="Chat with SoHub"
        onClick={onChatClick}
        className="
          flex items-center justify-between
          w-full lg:flex-1
          h-20 md:h-[90px] lg:h-[110px]
          px-6 md:px-8 lg:px-10
          rounded-full
          cursor-pointer
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple/40
        "
        style={{
          background: "#D9DEE3",
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 8px 40px 0 rgba(0,0,0,0.18)",
        }}
        transition={springTransition}
      >
        {/* Label */}
        <span
          className="
            font-sans font-bold uppercase tracking-tight text-brand-ink
            text-[22px] md:text-[32px] lg:text-[40px]
            leading-none select-none
          "
        >
          Chat with us
        </span>

        {/* Icon circle */}
        <motion.div
          className="
            flex items-center justify-center shrink-0
            w-[60px] h-[60px]
            md:w-[75px] md:h-[75px]
            lg:w-[90px] lg:h-[90px]
            rounded-full overflow-hidden
          "
          style={{ background: "#E8ECF0" }}
          whileHover={{ scale: 1.1 }}
          transition={springTransition}
        >
          <Image
            src={chatGif}
            alt="Chat icon"
            width={52}
            height={52}
            className="object-contain"
            unoptimized // required to preserve GIF animation
          />
        </motion.div>
      </motion.button>

      {/* ── Button 2: Menu ── */}
      <motion.button
        aria-label="Open menu"
        onClick={onMenuClick}
        className="
          flex items-center justify-between
          w-full lg:flex-1
          h-20 md:h-[90px] lg:h-[110px]
          px-6 md:px-8 lg:px-10
          rounded-full
          cursor-pointer
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple/40
        "
        style={{
          background: "#030A16",
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.30)",
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 8px 48px 0 rgba(0,0,0,0.50)",
        }}
        transition={springTransition}
      >
        {/* Label */}
        <span
          className="
            font-sans font-bold uppercase tracking-tight text-white
            text-[22px] md:text-[32px] lg:text-[40px]
            leading-none select-none
          "
        >
          Menu
        </span>

        {/* Icon circle */}
        <motion.div
          className="
            flex items-center justify-center shrink-0
            w-[60px] h-[60px]
            md:w-[75px] md:h-[75px]
            lg:w-[90px] lg:h-[90px]
            rounded-full overflow-hidden
          "
          style={{ background: "#0D1829" }}
          whileHover={{ scale: 1.1 }}
          transition={springTransition}
        >
          <Image
            src={menuGif}
            alt="Menu icon"
            width={44}
            height={44}
            className="object-contain"
            unoptimized
          />
        </motion.div>
      </motion.button>
    </div>
  )
}
