'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, HeartPulse, ChevronLeft, ChevronRight } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const textVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

const badgeVariant = {
  hidden: { opacity: 0, y: -14, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease } },
}

const headingVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
}

const subVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

const btnVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

const slides = [
  {
    title: 'Sağlıklı bir kampüs, aydınlık bir gelecek.',
    subtitle:
      'Genç Yeşilay NÖHÜ — öğrenciler, mentorlar ve kampüs hemşiremiz, bağımlılıksız bir yaşam etrafında bir araya geliyor.',
    image: '/ig/ilkokul-ziyareti.jpg',
  },
  {
    title: 'Bilinçli bir nesil, paylaşılan bir kalp.',
    subtitle:
      'Bağımlılıksız, üretken ve farkındalığı yüksek bir gençlik için aynı kalbi paylaşan gönüllüler.',
    image: '/ig/ucurtma-festivali.jpg',
  },
  {
    title: 'Tek bir hareket, binlerce gönül.',
    subtitle:
      'Eğitim, sağlık, sosyal sorumluluk ve sporda; öğrencilerin liderliğinde, profesyonellerin desteğiyle.',
    image: '/ig/konferans.jpg',
  },
]

export default function Hero() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 7500)
    return () => clearInterval(t)
  }, [])

  const slide = slides[i]

  return (
    <section className="relative w-full overflow-hidden -mt-28">
      <div className="relative h-[calc(88vh+7rem)] min-h-[calc(620px+7rem)] max-h-[calc(860px+7rem)] w-full">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
            style={{ opacity: idx === i ? 1 : 0 }}
            aria-hidden={idx !== i}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt={s.title}
              className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
            />
            {/* Layered, low-saturation overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/45 to-slate-900/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-transparent to-transparent" />
          </div>
        ))}

        {/* Soft warm vignette to merge into greige page bg */}
        <div className="absolute inset-x-0 -bottom-px h-32 bg-gradient-to-b from-transparent to-kurumsal-bg pointer-events-none" />

        <div className="relative z-10 h-full container-app flex items-end pb-24 md:pb-36">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              className="max-w-2xl text-white"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.span
                variants={badgeVariant}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/25 backdrop-blur text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-yesilay-400 inline-block" />
                NÖHÜ Genç Yeşilay
              </motion.span>
              <motion.h1
                variants={headingVariant}
                className="font-serif text-[42px] md:text-[64px] leading-[1.05] text-white drop-shadow-sm"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                variants={subVariant}
                className="mt-6 text-base md:text-lg text-white/85 max-w-xl leading-relaxed font-light"
              >
                {slide.subtitle}
              </motion.p>

              {/* Distinctly pill-shaped CTA buttons */}
              <motion.div variants={btnVariant} className="mt-9 flex items-center gap-3 flex-wrap">
                <Link href="/gonullu-ol" className="btn-pill-green">
                  <Heart size={18} strokeWidth={1.6} />
                  Aramıza Katıl
                </Link>
                <Link href="/iletisim" className="btn-pill-dark">
                  <HeartPulse size={18} strokeWidth={1.6} />
                  Bağış Yap
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-8 right-8 z-30 hidden md:flex items-center gap-2">
          <button
            onClick={() => setI((v) => (v - 1 + slides.length) % slides.length)}
            className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/25 backdrop-blur transition"
            aria-label="Önceki"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setI((v) => (v + 1) % slides.length)}
            className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/25 backdrop-blur transition"
            aria-label="Sonraki"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1 rounded-full transition-all ${idx === i ? 'w-10 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'}`}
              aria-label={`Slayt ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
