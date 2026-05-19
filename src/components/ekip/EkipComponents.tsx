'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Briefcase, Mail, Camera, AtSign } from 'lucide-react'
import type { Team, Media } from '@/payload-types'

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

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  linkedin: Briefcase,
  instagram: Camera,
  twitter: AtSign,
  email: Mail,
}

export function EkipHero() {
  return (
    <motion.section
      className="pt-20 md:pt-28 pb-14"
      variants={headerV}
      initial="hidden"
      animate="show"
    >
      <div className="container-app">
        <motion.span className="eyebrow" variants={headerItemV}>
          Ekibimiz
        </motion.span>
        <motion.h1
          className="mt-5 font-serif text-[44px] md:text-[60px] leading-[1.05] text-kurumsal-heading max-w-3xl"
          variants={headerItemV}
        >
          Hareketin arkasındaki yüzler.
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-kurumsal-text leading-relaxed max-w-2xl"
          variants={headerItemV}
        >
          Yönetim kurulundan kıdemli gönüllülere — Genç Yeşilay NÖHÜ&apos;yü ayakta tutan, kampüste
          değişimi yöneten ve mentorluk yapan gönüllülerimizle tanışın.
        </motion.p>
      </div>
    </motion.section>
  )
}

export function EkipGrid({ docs }: { docs: Team[] }) {
  return (
    <section className="pb-28">
      <div className="container-app">
        {docs.length === 0 ? (
          <p className="text-center text-kurumsal-text py-20">Henüz ekip üyesi eklenmemiş.</p>
        ) : (
          <motion.div
            className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          >
            {docs.map((m) => {
              const photo = typeof m.photo === 'object' ? (m.photo as Media) : null
              return (
                <motion.article
                  key={m.id}
                  className="group bg-white rounded-3xl border border-kurumsal-border-soft shadow-card-soft hover:shadow-card-lift transition-shadow duration-300 p-3"
                  variants={{
                    hidden: { opacity: 0, y: 32, scale: 0.96 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
                  }}
                  whileHover={{ y: -4 }}
                >
                  {/* Headshot */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-kurumsal-bg-alt via-white to-yesilay-50">
                    {photo?.url ? (
                      <Image
                        src={photo.url}
                        alt={photo.alt || m.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center">
                        <span className="font-serif text-6xl text-yesilay-700/20">
                          {m.name.slice(0, 1).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/30 to-transparent" />
                  </div>

                  {/* Meta */}
                  <div className="px-4 pt-5 pb-4">
                    <h3 className="font-serif text-[19px] text-kurumsal-heading leading-snug">
                      {m.name}
                    </h3>
                    <p className="mt-1 text-[13px] font-semibold text-yesilay-700">{m.role}</p>

                    {m.socialLinks && m.socialLinks.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-kurumsal-border-soft flex items-center gap-2">
                        {m.socialLinks.map((s, i) => {
                          const Icon = SOCIAL_ICONS[s.platform || ''] || Mail
                          if (!s.url) return null
                          const href = s.platform === 'email' ? `mailto:${s.url}` : s.url
                          return (
                            <a
                              key={i}
                              href={href}
                              target={s.platform === 'email' ? undefined : '_blank'}
                              rel={s.platform === 'email' ? undefined : 'noopener noreferrer'}
                              aria-label={s.platform || 'link'}
                              className="h-8 w-8 grid place-items-center rounded-full text-kurumsal-text-muted border border-kurumsal-border-soft hover:bg-yesilay-50 hover:text-yesilay-700 hover:border-yesilay-200 transition"
                            >
                              <Icon size={13} strokeWidth={1.5} />
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}
