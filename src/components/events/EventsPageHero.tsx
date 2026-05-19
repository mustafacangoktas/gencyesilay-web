'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
}

export default function EventsPageHero() {
  return (
    <motion.section
      className="pt-20 md:pt-28 pb-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="container-app">
        <motion.span variants={item} className="eyebrow block">
          Tüm Etkinlikler
        </motion.span>
        <motion.h1
          variants={item}
          className="mt-5 font-serif text-[44px] md:text-[60px] leading-[1.05] text-kurumsal-heading max-w-3xl"
        >
          Kampüsteki tüm hareket, tek bir yerde.
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-5 text-lg text-kurumsal-text max-w-2xl leading-relaxed"
        >
          Kategoriye veya yıla göre filtrele; ilgini çekeni keşfet ve katıl.
        </motion.p>
      </div>
    </motion.section>
  )
}
