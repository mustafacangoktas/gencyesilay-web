'use client'

import { motion } from 'framer-motion'
import { Quote, Heart, Sparkles } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Motivation, User } from '@/payload-types'

const ease = [0.22, 1, 0.36, 1] as const
const VP = { once: true, margin: '0px 0px -120px 0px' } as const

const cardIcons = [Quote, Heart, Sparkles]

const headerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
}
const headerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

export default function MotivationFeed({ items }: { items: Motivation[] }) {
  if (!items || items.length === 0) {
    return (
      <section className="section">
        <div className="container-app text-center">
          <span className="eyebrow">Topluluk Akışı</span>
          <h2 className="mt-4 text-3xl md:text-4xl">Henüz paylaşım yok</h2>
          <p className="mt-3 text-kurumsal-text">
            İlk motivasyonu paylaşan sen ol — kulübün nabzı seninle başlasın.
          </p>
        </div>
      </section>
    )
  }

  const featured = items.slice(0, 3)

  return (
    <section className="section">
      <div className="container-app">
        {/* Section header — cascade */}
        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VP}
        >
          <motion.span variants={headerItem} className="eyebrow block">
            Topluluğun Sesleri
          </motion.span>
          <motion.h2 variants={headerItem} className="mt-4 text-3xl md:text-[40px]">
            Gönüllülerimizden notlar
          </motion.h2>
          <motion.p variants={headerItem} className="mt-4 text-kurumsal-text leading-relaxed">
            Onaylı gönüllülerimizin kendi sözleriyle paylaştığı motivasyonlar — kampüsün nabzı,
            burada attıkça duyuluyor.
          </motion.p>
        </motion.div>

        {/* Cards — each enters individually on scroll */}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((m, idx) => {
            const author = typeof m.createdBy === 'object' ? (m.createdBy as User) : null
            const Icon = cardIcons[idx % cardIcons.length]
            const initial = (author?.fullName || 'GY').slice(0, 1).toUpperCase()
            return (
              <motion.article
                key={m.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={VP}
                transition={{ duration: 0.8, ease, delay: idx * 0.13 }}
                className="relative bg-white rounded-2xl border border-kurumsal-border-soft shadow-card-soft hover:shadow-card-lift transition-shadow duration-300 px-7 pt-14 pb-7"
              >
                <div className="absolute -top-6 left-7 h-12 w-12 rounded-full bg-white border border-kurumsal-border-soft shadow-card-soft grid place-items-center">
                  <Icon size={18} className="text-yesilay-700" strokeWidth={1.8} />
                </div>

                <p className="font-serif text-[17px] md:text-[18px] leading-relaxed text-kurumsal-heading">
                  "{m.content}"
                </p>

                <div className="mt-6 pt-5 border-t border-kurumsal-border-soft flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yesilay-500 to-yesilay-700 text-white flex items-center justify-center text-sm font-semibold ring-2 ring-white">
                    {initial}
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-semibold text-kurumsal-heading">
                      {author?.fullName || 'Genç Yeşilay Gönüllüsü'}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.12em] text-kurumsal-text-muted mt-0.5">
                      {formatDate(m.publishedAt || m.updatedAt)}
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
