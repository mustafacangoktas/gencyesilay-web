'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Briefcase, Camera, AtSign, Mail } from 'lucide-react'
import type { Team, Media } from '@/payload-types'

const ease = [0.22, 1, 0.36, 1] as const
const VP = { once: true, margin: '0px 0px -120px 0px' } as const

const ICONS: Record<string, React.ElementType> = {
  linkedin: Briefcase,
  instagram: Camera,
  twitter: AtSign,
  email: Mail,
}

export default function TeamScroll({ members }: { members: Team[] }) {
  if (!members?.length) return null
  return (
    <section className="section">
      <div className="container-app">
        {/* Header — left text from right, button from left */}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.8, ease }}
          >
            <span className="badge-yesilay">Ekip</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Hareketin Liderleri</h2>
            <p className="mt-2 text-kurumsal-text max-w-xl">
              Yönetim kurulu üyeleri ve takım liderlerimizle tanış.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <Link href="/ekip" className="btn-outline">
              Tüm Ekibi Gör
            </Link>
          </motion.div>
        </div>

        <div className="overflow-x-auto -mx-6 lg:-mx-12 px-6 lg:px-12 pb-4">
          <div className="flex gap-5 min-w-max">
            {members.map((m, idx) => {
              const photo = typeof m.photo === 'object' ? (m.photo as Media) : null
              return (
                <motion.article
                  key={m.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                  transition={{ duration: 0.7, ease, delay: Math.min(idx, 5) * 0.08 }}
                  className="card-hover w-64 flex-shrink-0 overflow-hidden group"
                >
                  <div className="relative aspect-square bg-gradient-to-br from-yesilay-100 to-yesilay-50">
                    {photo?.url ? (
                      <Image
                        src={photo.url}
                        alt={photo.alt || m.name}
                        fill
                        sizes="256px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-yesilay-300">
                        {m.name.slice(0, 1)}
                      </div>
                    )}
                    {m.socialLinks && m.socialLinks.length > 0 && (
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        {m.socialLinks.map((s, i) => {
                          const Icon = ICONS[s.platform || ''] || Mail
                          if (!s.url) return null
                          const href = s.platform === 'email' ? `mailto:${s.url}` : s.url
                          return (
                            <a
                              key={i}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-full bg-white/90 hover:bg-white text-yesilay-700"
                            >
                              <Icon size={14} />
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-sm font-semibold text-kurumsal-heading">{m.name}</h3>
                    <p className="text-xs text-yesilay-700 mt-0.5">{m.role}</p>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
