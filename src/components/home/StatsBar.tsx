'use client'

import { motion } from 'framer-motion'
import { Users, CalendarDays, GraduationCap, HandHeart } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const
const VP = { once: true, margin: '0px 0px -60px 0px' } as const

const items = [
  { icon: Users, value: '150+', label: 'Aktif Gönüllü', sub: 'Sahada görev alan' },
  { icon: CalendarDays, value: '60+', label: 'Yıllık Etkinlik', sub: 'Akademik yıl başına' },
  { icon: GraduationCap, value: '5.000+', label: 'Ulaşılan Öğrenci', sub: 'Kampüs genelinde' },
  { icon: HandHeart, value: '12', label: 'Kurumsal Ortak', sub: 'Üniversite ve STK' },
]

const statItem = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
}

export default function StatsBar() {
  return (
    <section className="relative -mt-20 md:-mt-24 z-20">
      <div className="container-app">
        <motion.div
          className="card-flat shadow-card-lift overflow-hidden"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.9, ease }}
        >
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-kurumsal-border-soft"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={VP}
          >
            {items.map(({ icon: Icon, value, label, sub }) => (
              <motion.div
                key={label}
                variants={statItem}
                className="px-6 py-8 md:py-10 flex flex-col items-start gap-3"
              >
                <span className="h-10 w-10 grid place-items-center rounded-full bg-yesilay-50 text-yesilay-700 ring-1 ring-yesilay-100">
                  <Icon size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <div className="font-serif text-3xl md:text-4xl text-kurumsal-heading leading-none">
                    {value}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-kurumsal-heading">{label}</div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-kurumsal-text-muted mt-0.5">
                    {sub}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
