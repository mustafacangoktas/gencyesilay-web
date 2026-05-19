'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const
const VP = { once: true, margin: '0px 0px -80px 0px' } as const

type Props = {
  main: ReactNode
  aside: ReactNode
}

export default function EventDetailBody({ main, aside }: Props) {
  return (
    <div className="container-app py-12 grid gap-10 lg:grid-cols-[1fr,300px]">
      <motion.div
        className="prose prose-slate max-w-none"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP}
        transition={{ duration: 0.85, ease }}
      >
        {main}
      </motion.div>
      <motion.aside
        className="space-y-4"
        initial={{ opacity: 0, x: 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VP}
        transition={{ duration: 0.85, ease, delay: 0.15 }}
      >
        {aside}
      </motion.aside>
    </div>
  )
}
