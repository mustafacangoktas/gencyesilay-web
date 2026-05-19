'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, HeartPulse } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const
const VP = { once: true, margin: '0px 0px -120px 0px' } as const

export default function CTA() {
  return (
    <section className="section">
      <div className="container-app">
        <motion.div
          className="relative overflow-hidden rounded-[32px] px-8 py-16 md:px-16 md:py-24 text-white shadow-card-lift"
          style={{
            backgroundImage: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%)',
          }}
          initial={{ opacity: 0, y: 52 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.9, ease }}
        >
          {/* Depth halos */}
          <div
            aria-hidden
            className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-white/8 rounded-full blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-yesilay-950/40 rounded-full blur-3xl"
          />

          <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-10 md:gap-14 items-end">
            {/* Left text — slides from left */}
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, x: -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.85, ease, delay: 0.15 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                Harekete Katıl
              </span>
              <h2 className="mt-6 font-serif text-3xl md:text-[52px] leading-[1.08] text-white">
                Sen de bu hareketin parçası ol.
              </h2>
              <p className="mt-5 text-base md:text-lg text-white/85 leading-relaxed max-w-xl font-light">
                Sertifikalı etkinliklere erişim, mentorluk fırsatları ve sıcak bir topluluk — Genç
                Yeşilay NÖHÜ ailesi seni bekliyor.
              </p>
            </motion.div>

            {/* Right buttons — slides from right */}
            <motion.div
              className="btn-pair"
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.85, ease, delay: 0.28 }}
            >
              <Link href="/gonullu-ol" className="btn-pill-green">
                <Heart size={18} strokeWidth={1.6} />
                Aramıza Katıl
              </Link>
              <Link href="/iletisim" className="btn-pill-dark">
                <HeartPulse size={18} strokeWidth={1.6} />
                Bağış Yap
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
