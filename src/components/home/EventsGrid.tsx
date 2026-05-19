'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Event, Media } from '@/payload-types'

const ease = [0.22, 1, 0.36, 1] as const
const VP = { once: true, margin: '0px 0px -120px 0px' } as const

const CATS: { value: string; label: string }[] = [
  { value: 'all', label: 'Tümü' },
  { value: 'sosyal', label: 'Sosyal' },
  { value: 'egitim', label: 'Eğitim' },
  { value: 'saglik', label: 'Sağlık' },
  { value: 'kampanya', label: 'Kampanya' },
  { value: 'spor', label: 'Spor' },
]

type Props = {
  events: Event[]
  showFilters?: boolean
  variant?: 'home' | 'page'
}

export default function EventsGrid({ events, showFilters = true, variant = 'home' }: Props) {
  const [cat, setCat] = useState('all')
  const [year, setYear] = useState<'all' | number>('all')

  const years = useMemo(() => {
    const s = new Set<number>()
    events.forEach((e) => e.year && s.add(e.year))
    return Array.from(s).sort((a, b) => b - a)
  }, [events])

  const filtered = events.filter(
    (e) => (cat === 'all' || e.category === cat) && (year === 'all' || e.year === year),
  )

  const isPage = variant === 'page'
  const visible = isPage ? filtered : filtered.slice(0, 3)

  return (
    <section className={isPage ? 'pb-24' : 'section'}>
      <div className="container-app">
        {/* ── Home variant header ─────────────────────────────────────── */}
        {!isPage && (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, x: -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.85, ease }}
            >
              <span className="eyebrow">Son Programlar</span>
              <h2 className="mt-4 text-3xl md:text-[40px]">Kampüsteki hareket</h2>
              <p className="mt-3 text-kurumsal-text leading-relaxed">
                Eğitim, sağlık, kampanya ve sosyal sorumluluk; her bölüme ve her gönüllüye açık
                programlar.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.85, ease, delay: 0.1 }}
            >
              <Link
                href="/etkinlikler"
                className="self-start md:self-end inline-flex items-center gap-1.5 text-sm font-semibold text-yesilay-700 hover:text-yesilay-800 group"
              >
                Tüm etkinlikler
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </motion.div>
          </div>
        )}

        {/* ── Page variant filters ────────────────────────────────────── */}
        {showFilters && isPage && (
          <motion.div
            className="mb-12 flex flex-wrap items-center gap-2.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            {CATS.map((c) => (
              <button
                key={c.value}
                type="button"
                aria-pressed={cat === c.value}
                onClick={() => setCat(c.value)}
                className="chip"
              >
                {c.label}
              </button>
            ))}
            {years.length > 0 && (
              <div className="ml-auto flex items-center gap-2">
                <label
                  htmlFor="year"
                  className="text-[11px] uppercase tracking-[0.12em] text-kurumsal-text-muted"
                >
                  Yıl
                </label>
                <select
                  id="year"
                  value={year}
                  onChange={(e) =>
                    setYear(e.target.value === 'all' ? 'all' : Number(e.target.value))
                  }
                  className="h-10 rounded-full bg-white border border-kurumsal-border px-4 text-sm font-medium text-kurumsal-heading focus:outline-none focus:border-yesilay-500 focus:shadow-focus-glow"
                >
                  <option value="all">Tümü</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </motion.div>
        )}

        {/* ── Cards grid ─────────────────────────────────────────────── */}
        {visible.length === 0 ? (
          <p className="text-center text-kurumsal-text py-20">
            Bu filtreyle eşleşen etkinlik bulunamadı.
          </p>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={cat + String(year)}
              className="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((e, idx) => {
                const cover = typeof e.coverImage === 'object' ? (e.coverImage as Media) : null
                const catMeta = CATS.find((c) => c.value === e.category)
                return (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                    transition={{ duration: 0.75, ease, delay: (idx % 3) * 0.1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                  >
                    <Link
                      href={`/etkinlikler/${e.slug}`}
                      className="group bg-white border border-kurumsal-border-soft rounded-2xl shadow-card-soft hover:shadow-card-lift hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-yesilay-50 via-white to-kurumsal-bg-alt">
                        {cover?.url ? (
                          <Image
                            src={cover.url}
                            alt={cover.alt || e.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="absolute inset-0 grid place-items-center">
                            <span className="font-serif text-5xl text-yesilay-700/20">GY</span>
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/15 to-transparent" />
                      </div>

                      {/* Meta */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between gap-3">
                          <span className="badge-yesilay">{catMeta?.label || e.category}</span>
                          <span className="text-[11px] uppercase tracking-[0.12em] text-kurumsal-text-muted inline-flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(e.date)}
                          </span>
                        </div>

                        <h3 className="mt-4 font-serif text-xl text-kurumsal-heading leading-snug group-hover:text-yesilay-700 transition-colors">
                          {e.title}
                        </h3>

                        {e.shortDescription && (
                          <p className="mt-2 text-sm text-kurumsal-text leading-relaxed line-clamp-2">
                            {e.shortDescription}
                          </p>
                        )}

                        {e.location && (
                          <div className="mt-5 pt-4 border-t border-kurumsal-border-soft flex items-center gap-1.5 text-xs text-kurumsal-text-muted">
                            <MapPin size={13} className="text-yesilay-700" />
                            <span>{e.location}</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}
