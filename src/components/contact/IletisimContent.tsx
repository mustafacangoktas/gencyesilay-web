'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
import { SITE } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const itemV = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export default function IletisimContent() {
  return (
    <section className="section">
      <div className="container-app">
        <motion.div
          className="mx-auto max-w-6xl bg-white/40 backdrop-blur border border-kurumsal-border-soft rounded-[32px] p-3 md:p-4 shadow-card-soft"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="grid lg:grid-cols-2 rounded-[24px] overflow-hidden">
            {/* LEFT — Info column */}
            <motion.div
              className="relative p-6 sm:p-10 md:p-14 bg-gradient-to-br from-kurumsal-bg-alt via-white to-kurumsal-bg flex flex-col"
              variants={containerV}
              initial="hidden"
              animate="show"
            >
              <motion.span className="eyebrow" variants={itemV}>
                İletişim
              </motion.span>
              <motion.h1
                className="mt-5 font-serif text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05] text-kurumsal-heading"
                variants={itemV}
              >
                Bize ulaşın.
              </motion.h1>
              <motion.p
                className="mt-5 text-kurumsal-text leading-relaxed max-w-md"
                variants={itemV}
              >
                Sorularınız, iş birliği teklifleri ve etkinlik önerileri için kapımız her zaman
                açık. Genelde 1–2 iş günü içinde yanıtlıyoruz.
              </motion.p>

              <motion.ul className="mt-8 md:mt-12 space-y-5 md:space-y-7" variants={itemV}>
                <li className="flex items-start gap-5">
                  <span className="shrink-0 h-12 w-12 grid place-items-center rounded-full bg-white border border-kurumsal-border-soft text-yesilay-700 shadow-card-soft">
                    <Mail size={18} strokeWidth={1.6} />
                  </span>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-kurumsal-text-muted">
                      E-posta
                    </div>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-1 inline-block text-[15px] font-semibold text-kurumsal-heading hover:text-yesilay-700 transition"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-5">
                  <span className="shrink-0 h-12 w-12 grid place-items-center rounded-full bg-white border border-kurumsal-border-soft text-yesilay-700 shadow-card-soft">
                    <MapPin size={18} strokeWidth={1.6} />
                  </span>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-kurumsal-text-muted">
                      Kampüs
                    </div>
                    <p className="mt-1 text-[15px] font-semibold text-kurumsal-heading max-w-xs leading-snug">
                      Niğde Ömer Halisdemir Üniversitesi
                      <span className="block text-kurumsal-text font-normal text-sm mt-0.5">
                        Merkez Kampüs, Niğde / Türkiye
                      </span>
                    </p>
                  </div>
                </li>
              </motion.ul>

              {/* Decorative quote */}
              <motion.p
                className="mt-auto pt-12 font-serif italic text-kurumsal-text-muted text-sm max-w-sm"
                variants={itemV}
              >
                "Sağlıklı bir kampüs, sağlıklı bir gelecektir."
              </motion.p>
            </motion.div>

            {/* RIGHT — Form column */}
            <motion.div
              className="bg-white p-6 sm:p-10 md:p-14"
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.25 }}
            >
              <form className="space-y-6" aria-label="İletişim formu">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="field-label">
                      Ad Soyad
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="input"
                      placeholder="Adınız"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="field-label">
                      E-posta
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="input"
                      placeholder="ornek@ohu.edu.tr"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="field-label">
                    Konu
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="input"
                    placeholder="Mesajınızın konusu"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="field-label">
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="input resize-none"
                    placeholder="Bize neyi anlatmak istersin?"
                  />
                </div>

                <button type="submit" className="btn-pill-green w-full">
                  <Send size={16} />
                  Mesaj Gönder
                </button>

                <p className="text-xs text-kurumsal-text-muted text-center leading-relaxed">
                  Bu form henüz aktif değildir; lütfen e-posta adresimizi kullanın. Bilgileriniz
                  yalnızca yanıt vermek amacıyla saklanır.
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
