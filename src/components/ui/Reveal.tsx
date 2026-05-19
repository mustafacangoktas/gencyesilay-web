'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

type Props = {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  x?: number
  direction?: Direction
  once?: boolean
  amount?: number
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'span' | 'ul' | 'li'
  className?: string
  /** stagger child <Reveal /> elements */
  stagger?: boolean
  staggerDelay?: number
}

/**
 * Soft, corporate-friendly reveal-on-scroll wrapper.
 * Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y,
  x,
  direction = 'up',
  once = true,
  amount = 0.2,
  as = 'div',
  className,
  stagger = false,
  staggerDelay = 0.08,
}: Props) {
  const reduced = useReducedMotion()

  const offset = 22
  const fromY =
    typeof y === 'number' ? y : direction === 'up' ? offset : direction === 'down' ? -offset : 0
  const fromX =
    typeof x === 'number' ? x : direction === 'left' ? offset : direction === 'right' ? -offset : 0

  const variants: Variants = {
    hidden: { opacity: 0, y: fromY, x: fromX },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: reduced ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
        delay: reduced ? 0 : delay,
        ...(stagger ? { staggerChildren: staggerDelay, delayChildren: delay } : {}),
      },
    },
  }

  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}

/** Use inside a parent <Reveal stagger> for staggered children. */
export function RevealItem({
  children,
  className,
  as = 'div',
  direction = 'up',
}: {
  children: ReactNode
  className?: string
  as?: Props['as']
  direction?: Direction
}) {
  const reduced = useReducedMotion()
  const offset = 20
  const fromY = direction === 'up' ? offset : direction === 'down' ? -offset : 0
  const fromX = direction === 'left' ? offset : direction === 'right' ? -offset : 0

  const variants: Variants = {
    hidden: { opacity: 0, y: fromY, x: fromX },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  }
  const MotionTag = motion[as ?? 'div'] as typeof motion.div
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  )
}

export default Reveal
