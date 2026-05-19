'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  CheckCircle2,
  CalendarDays,
  Award,
  MessageSquareQuote,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Motivation } from '@/payload-types'

const ease = [0.22, 1, 0.36, 1] as const
const VP = { once: true, margin: '0px 0px -80px 0px' } as const

const bentoV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const cardV = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
}

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  published: { label: 'Yayında', cls: 'bg-yesilay-50 text-yesilay-700 border-yesilay-100' },
  in_review: { label: 'İncelemede', cls: 'bg-amber-50 text-amber-700 border-amber-100' },
  rejected: { label: 'Reddedildi', cls: 'bg-rose-50 text-rose-700 border-rose-100' },
  draft: { label: 'Taslak', cls: 'bg-slate-50 text-slate-600 border-slate-200' },
}

interface Props {
  firstName: string
  isApproved: boolean
  membershipStatus: string | null | undefined
  publishedCount: number
  motivationTotal: number
  motivationDocs: Motivation[]
  feedbackTotal: number
  certificateTotal: number
}

function MiniStat({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-2xl px-4 py-3.5 border backdrop-blur ${
        accent ? 'bg-yesilay-500/15 border-yesilay-300/30' : 'bg-white/8 border-white/15'
      }`}
    >
      <div className="text-[10px] uppercase tracking-[0.16em] text-white/65 font-semibold">
        {label}
      </div>
      <div className="mt-1 font-serif text-[22px] leading-none text-white">{value}</div>
    </div>
  )
}

export default function ProfilDashboard({
  firstName,
  isApproved,
  membershipStatus,
  publishedCount,
  motivationTotal,
  motivationDocs,
  feedbackTotal,
  certificateTotal,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Welcome — wide bento */}
      <motion.section
        className="relative overflow-hidden rounded-3xl p-8 md:p-10 text-white shadow-card-lift"
        style={{ backgroundImage: 'linear-gradient(135deg,#0F172A 0%,#064E3B 60%,#047857 100%)' }}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-yesilay-500/15 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-3xl"
        />

        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.15 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/12 border border-white/20 text-[10.5px] font-semibold uppercase tracking-[0.18em]">
              <Sparkles size={12} strokeWidth={1.6} /> Kontrol Paneli
            </span>
            <h1 className="mt-5 font-serif text-3xl md:text-[40px] leading-[1.1] text-white">
              Hoş geldin, {firstName} 👋
            </h1>
            <p className="mt-4 text-sm md:text-base text-white/80 leading-relaxed max-w-lg">
              Üyelik durumun, motivasyon paylaşımların ve sertifikaların — hepsi tek bir yerde.
              {isApproved
                ? ' Onaylı bir gönüllü olarak topluluk akışına katkı yapabilirsin.'
                : ' Dekontun onaylandığında topluluk akışına paylaşım yapabilirsin.'}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/profil/motivasyon" className="btn-pill-green">
                <MessageSquareQuote size={16} strokeWidth={1.6} /> Motivasyon Paylaş
              </Link>
              <Link
                href="/etkinlikler"
                className="inline-flex items-center gap-1.5 h-12 px-5 rounded-full bg-white/10 border border-white/20 text-[13px] font-semibold hover:bg-white/15 transition"
              >
                Etkinlikleri Gör <ArrowUpRight size={14} strokeWidth={1.6} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.25 }}
          >
            <MiniStat
              label="Üyelik"
              value={isApproved ? 'Onaylı' : 'Beklemede'}
              accent={isApproved}
            />
            <MiniStat label="Yayında" value={String(publishedCount)} />
            <MiniStat label="Sertifika" value={String(certificateTotal)} />
            <MiniStat label="Geri Bildirim" value={String(feedbackTotal)} />
          </motion.div>
        </div>
      </motion.section>

      {/* Bento grid */}
      <motion.div
        className="grid gap-6 md:grid-cols-6 md:auto-rows-min"
        variants={bentoV}
        initial="hidden"
        whileInView="show"
        viewport={VP}
      >
        {/* Status card */}
        <motion.article
          className="md:col-span-2 bg-white border border-kurumsal-border-soft rounded-3xl shadow-card-soft p-6"
          variants={cardV}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.16em] text-kurumsal-text-muted font-semibold">
              Üyelik Durumu
            </span>
            <CheckCircle2
              size={18}
              strokeWidth={1.5}
              className={isApproved ? 'text-yesilay-700' : 'text-kurumsal-text-muted'}
            />
          </div>
          <div className="mt-5 font-serif text-[28px] leading-tight text-kurumsal-heading">
            {isApproved
              ? 'Onaylı Gönüllü'
              : membershipStatus === 'rejected'
                ? 'Onaylanmadı'
                : 'İncelemede'}
          </div>
          <p className="mt-2 text-[13px] text-kurumsal-text leading-relaxed">
            {isApproved
              ? 'Topluluk akışına paylaşım yapma yetkin aktif.'
              : 'Yatırım dekontun ekibimiz tarafından inceleniyor.'}
          </p>
        </motion.article>

        {/* Motivasyon count */}
        <motion.article
          className="md:col-span-2 bg-white border border-kurumsal-border-soft rounded-3xl shadow-card-soft p-6"
          variants={cardV}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.16em] text-kurumsal-text-muted font-semibold">
              Motivasyon
            </span>
            <MessageSquareQuote size={18} strokeWidth={1.5} className="text-yesilay-700" />
          </div>
          <div className="mt-5 font-serif text-[40px] leading-none text-kurumsal-heading">
            {motivationTotal}
          </div>
          <p className="mt-3 text-[13px] text-kurumsal-text leading-relaxed">
            Toplam paylaşım ·{' '}
            <span className="text-yesilay-700 font-semibold">{publishedCount}</span> yayında
          </p>
        </motion.article>

        {/* Sertifikalar */}
        <motion.article
          className="md:col-span-2 bg-white border border-kurumsal-border-soft rounded-3xl shadow-card-soft p-6 flex flex-col"
          variants={cardV}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.16em] text-kurumsal-text-muted font-semibold">
              Sertifikalar
            </span>
            <Award size={18} strokeWidth={1.5} className="text-yesilay-700" />
          </div>
          <div className="mt-5 font-serif text-[40px] leading-none text-kurumsal-heading">
            {certificateTotal}
          </div>
          <p className="mt-3 text-[13px] text-kurumsal-text leading-relaxed flex-1">
            Katıldığın etkinliklerden kazandığın sertifikalar.
          </p>
          <Link
            href="/profil/sertifikalar"
            className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-yesilay-700 hover:text-yesilay-800 group"
          >
            Sertifikalarımı gör
            <ArrowUpRight
              size={14}
              strokeWidth={1.6}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </motion.article>

        {/* Recent activity feed — wide */}
        <motion.article
          className="md:col-span-4 bg-white border border-kurumsal-border-soft rounded-3xl shadow-card-soft p-7"
          variants={cardV}
        >
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-serif text-xl text-kurumsal-heading">
              Son Motivasyon Paylaşımların
            </h2>
            <Link
              href="/profil/motivasyon"
              className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-yesilay-700 hover:text-yesilay-800"
            >
              Tümü <ArrowUpRight size={13} strokeWidth={1.6} />
            </Link>
          </div>
          <p className="text-[12.5px] text-kurumsal-text-muted">
            Onay sürecindeki ve yayındaki paylaşımlarının durumu.
          </p>

          {motivationDocs.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-kurumsal-border p-8 text-center">
              <MessageSquareQuote
                size={20}
                strokeWidth={1.5}
                className="mx-auto text-kurumsal-text-muted"
              />
              <p className="mt-3 text-sm text-kurumsal-text">
                Henüz paylaşım yok — ilk notunu yazmak için harika bir gün.
              </p>
              <Link href="/profil/motivasyon" className="btn-pill-green mt-5">
                İlk Notunu Paylaş
              </Link>
            </div>
          ) : (
            <ul className="mt-5 divide-y divide-kurumsal-border-soft">
              {motivationDocs.map((m) => {
                const status = STATUS_LABEL[m.status as string] || STATUS_LABEL.draft
                return (
                  <li key={m.id} className="py-4 flex items-start justify-between gap-5">
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] text-kurumsal-heading line-clamp-2 leading-relaxed">
                        {m.content}
                      </p>
                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-kurumsal-text-muted">
                        <CalendarDays size={11} strokeWidth={1.6} /> {formatDate(m.createdAt)}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] font-semibold uppercase tracking-[0.1em] border ${status.cls}`}
                    >
                      {status.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </motion.article>

        {/* Quick action — narrow card */}
        <motion.article
          className="md:col-span-2 rounded-3xl p-7 text-white relative overflow-hidden shadow-card-soft"
          style={{ backgroundImage: 'linear-gradient(135deg,#047857 0%,#064E3B 100%)' }}
          variants={cardV}
        >
          <div
            aria-hidden
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-2xl"
          />
          <Sparkles size={20} strokeWidth={1.5} className="text-yesilay-300" />
          <h3 className="mt-4 font-serif text-2xl leading-snug text-white">
            İlham veren bir not paylaş.
          </h3>
          <p className="mt-3 text-[13px] text-white/80 leading-relaxed">
            Onaylanan paylaşımların anasayfa akışında, kampüsün gözü önünde yer alır.
          </p>
          <Link
            href="/profil/motivasyon"
            className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-yesilay-300 hover:text-yesilay-200"
          >
            Motivasyon Paylaş <ArrowUpRight size={14} strokeWidth={1.6} />
          </Link>
        </motion.article>
      </motion.div>
    </div>
  )
}
