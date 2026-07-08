'use client'

import { ReactNode } from 'react'
import { HTMLMotionProps, motion, useReducedMotion } from 'framer-motion'

const premiumEase = [0.22, 1, 0.36, 1] as const

type RevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  delay?: number
  y?: number
  once?: boolean
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  transition,
  viewport,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.24, margin: '0px 0px -80px 0px', ...viewport }}
      transition={{ duration: 0.78, delay, ease: premiumEase, ...transition }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({
  children,
  className,
  delay = 0,
  once = true,
  ...props
}: Omit<RevealProps, 'y'>) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'show'}
      viewport={{ once, amount: 0.22, margin: '0px 0px -80px 0px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.08,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'> & { children: ReactNode }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={
        reduceMotion
          ? undefined
          : {
              hidden: { opacity: 0, y: 22, scale: 0.98 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.68, ease: premiumEase },
              },
            }
      }
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { premiumEase }
