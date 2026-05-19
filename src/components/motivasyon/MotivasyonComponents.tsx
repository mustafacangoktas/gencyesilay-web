'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Quote, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Motivation, User } from '@/payload-types'

const ease = [0.22, 1, 0.36, 1] as const
const VP = { once: true, margin: '0px 0px -100px 0px' } as const

const headerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}
const headerItemV = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

const cardV = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
}

export function MotivasyonHero() {
  return (
    <motion.section
      className="pt-20 md:pt-28 pb-14"
      variants={headerV}
      initial="hidden"
      animate="show"
    >
      <div className="container-app">
        <motion.span className="eyebrow" variants={headerItemV}>
          Topluluk Akışı
        </motion.span>
        <motion.h1
          className="mt-5 font-serif text-[44px] md:text-[60px] leading-[1.05] text-kurumsal-heading max-w-3xl"
          variants={headerItemV}
        >
          <span className="md:hidden">
            Gönüllü-
            <br />
            lerimizden
            <br />
            notlar.
          </span>
          <span className="hidden md:inline">Gönüllülerimizden notlar.</span>
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-kurumsal-text leading-relaxed max-w-2xl"
          variants={headerItemV}
        >
          Onaylı gönüllülerimizin paylaştığı motivasyon, deneyim ve düşünceler — kampüsün canlı bir
          duvarı, samimi cümlelerle yazılmış.
        </motion.p>
      </div>
    </motion.section>
  )
}

export function MotivasyonWall({ docs }: { docs: Motivation[] }) {
  return (
    <section className="pb-24">
      <div className="container-app">
        {docs.length === 0 ? (
          <div className="card max-w-xl mx-auto p-10 text-center">
            <Quote className="mx-auto text-yesilay-700" size={26} strokeWidth={1.5} />
            <p className="mt-4 text-kurumsal-text">
              Henüz yayınlanan bir paylaşım yok. İlk notu paylaşan sen ol — kulübün nabzı seninle
              başlasın.
            </p>
            <Link href="/profil/motivasyon" className="btn-pill-green mt-7">
              Motivasyonunu Paylaş <ArrowRight size={16} strokeWidth={1.6} />
            </Link>
          </div>
        ) : (
          <>
            <motion.div
              className="columns-1 sm:columns-2 lg:columns-3 gap-7 [column-fill:_balance]"
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            >
              {docs.map((m) => {
                const author = typeof m.createdBy === 'object' ? (m.createdBy as User) : null
                const initial = (author?.fullName || 'GY').slice(0, 1).toUpperCase()
                return (
                  <motion.article
                    key={m.id}
                    className="break-inside-avoid mb-7 bg-white rounded-2xl border border-kurumsal-border-soft shadow-card-soft hover:shadow-card-lift transition-shadow duration-300 p-7"
                    variants={cardV}
                    whileHover={{ y: -3 }}
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yesilay-50 text-yesilay-700 ring-1 ring-yesilay-100 mb-5">
                      <Quote size={15} strokeWidth={1.5} />
                    </span>

                    <p className="text-[15px] md:text-[15.5px] leading-[1.7] text-kurumsal-heading">
                      {m.content}
                    </p>

                    <div className="mt-6 pt-5 border-t border-kurumsal-border-soft flex items-center gap-3">
                      <span className="h-9 w-9 rounded-full bg-gradient-to-br from-yesilay-500 to-yesilay-700 text-white grid place-items-center text-[12px] font-semibold ring-2 ring-white">
                        {initial}
                      </span>
                      <div className="leading-tight min-w-0">
                        <div className="text-[13px] font-semibold text-kurumsal-heading truncate">
                          {author?.fullName || 'Genç Yeşilay Gönüllüsü'}
                        </div>
                        <div className="text-[10.5px] uppercase tracking-[0.14em] text-kurumsal-text-muted mt-0.5">
                          {formatDate(m.publishedAt || m.updatedAt)}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>

            {/* Inline CTA strip */}
            <motion.div
              className="mt-14 rounded-3xl bg-white border border-kurumsal-border-soft shadow-card-soft p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.7, ease }}
            >
              <div>
                <h3 className="font-serif text-2xl text-kurumsal-heading">
                  Senin de paylaşacak bir notun var.
                </h3>
                <p className="mt-2 text-sm text-kurumsal-text max-w-lg leading-relaxed">
                  Onaylı gönüllüler, kampüsün bu canlı duvarına kendi sözleriyle katkı sağlıyor.
                  Aramıza katıl, kalemini konuştur.
                </p>
              </div>
              <Link href="/profil/motivasyon" className="btn-pill-green shrink-0">
                Motivasyon Paylaş <ArrowRight size={16} strokeWidth={1.6} />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
