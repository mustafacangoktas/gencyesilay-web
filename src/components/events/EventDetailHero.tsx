'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

type Props = {
  category: string
  title: string
  date: string
  location?: string | null
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
}

export default function EventDetailHero({ category, title, date, location }: Props) {
  return (
    <motion.div
      className="container-app relative z-10 h-full flex flex-col justify-end pb-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Link
          href="/etkinlikler"
          className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-3 w-fit"
        >
          <ArrowLeft size={14} /> Tüm Etkinlikler
        </Link>
      </motion.div>
      <motion.span
        variants={item}
        className="badge bg-white/15 text-white border border-white/20 backdrop-blur capitalize w-fit"
      >
        {category}
      </motion.span>
      <motion.h1
        variants={item}
        className="mt-3 text-3xl md:text-5xl font-bold text-white max-w-3xl"
      >
        {title}
      </motion.h1>
      <motion.div variants={item} className="mt-4 flex flex-wrap gap-4 text-sm text-white/85">
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={14} />
          {formatDateTime(date)}
        </span>
        {location && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} />
            {location}
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}
