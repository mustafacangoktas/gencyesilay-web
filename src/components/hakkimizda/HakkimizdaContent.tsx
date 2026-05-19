'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Target, Users, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react'

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

const bentoV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const cardV = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease } },
}

export default function HakkimizdaContent() {
  return (
    <>
      {/* HEADER */}
      <motion.section
        className="pt-20 md:pt-28 pb-12"
        variants={headerV}
        initial="hidden"
        animate="show"
      >
        <div className="container-app">
          <motion.span className="eyebrow" variants={headerItemV}>
            Hakkımızda
          </motion.span>
          <motion.h1
            className="mt-5 font-serif text-[44px] md:text-[68px] leading-[1.04] text-kurumsal-heading max-w-4xl"
            variants={headerItemV}
          >
            Sağlıklı bir kampüs,
            <br />
            <span className="text-yesilay-700">aydınlık bir gelecek.</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-kurumsal-text max-w-2xl leading-relaxed"
            variants={headerItemV}
          >
            Genç Yeşilay NÖHÜ olarak; eğitim, sağlık, sosyal sorumluluk ve kişisel gelişim
            alanlarında öğrencilerle birlikte kıvılcım çakıyoruz. Her ay yeni bir kampanya, her
            dönem yeni bir gönüllü hareketi.
          </motion.p>
        </div>
      </motion.section>

      {/* BENTO GRID */}
      <motion.section
        className="pb-24"
        variants={bentoV}
        initial="hidden"
        whileInView="show"
        viewport={VP}
      >
        <div className="container-app">
          <div className="grid gap-5 md:gap-6 grid-cols-1 md:grid-cols-6 md:auto-rows-[180px]">
            {/* VISION — large feature, top-left */}
            <motion.article
              className="bg-white border border-kurumsal-border-soft rounded-3xl shadow-card-soft p-8 md:p-10 md:col-span-4 md:row-span-2 relative overflow-hidden"
              variants={cardV}
            >
              <div
                aria-hidden
                className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-yesilay-100/70 blur-2xl"
              />
              <div
                aria-hidden
                className="absolute right-10 bottom-8 w-40 h-40 rounded-full bg-gradient-to-br from-yesilay-500/15 to-yesilay-700/10"
              />
              <div className="relative">
                <span className="badge-yesilay">Vizyon</span>
                <h2 className="mt-5 font-serif text-3xl md:text-[40px] leading-tight max-w-xl">
                  Bağımlılıksız, üretken ve dayanışmacı bir gençlik.
                </h2>
                <p className="mt-5 text-kurumsal-text leading-relaxed max-w-lg">
                  Sahada üreten, dijitalde paylaşan, kampüste değişimi başlatan kıvılcımlar.
                  Türkiye&apos;nin en aktif üniversite topluluklarından biri olmak.
                </p>
                <Link
                  href="/gonullu-ol"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-yesilay-700 hover:text-yesilay-800 group"
                >
                  Aramıza katıl
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </motion.article>

            {/* MISSION — top-right tall */}
            <motion.article
              className="bg-yesilay-700 text-white rounded-3xl shadow-card-soft p-8 md:col-span-2 md:row-span-2 relative overflow-hidden"
              variants={cardV}
            >
              <div
                aria-hidden
                className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl"
              />
              <div className="relative h-full flex flex-col">
                <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-[11px] font-semibold uppercase tracking-[0.12em]">
                  Misyon
                </span>
                <Target size={28} className="mt-6 text-yesilay-200" strokeWidth={1.6} />
                <h3 className="mt-5 font-serif text-2xl md:text-[28px] leading-snug text-white">
                  Bilimsel, sürdürülebilir ve sıcak bir topluluk modeli.
                </h3>
                <p className="mt-4 text-sm text-white/85 leading-relaxed">
                  Üniversite öğrencilerine sağlıklı yaşam farkındalığı kazandırmak; bağımlılıklarla
                  mücadelede genç ve aktif çözüm üretmek.
                </p>
              </div>
            </motion.article>

            {/* IMAGE / CUTOUT — wide */}
            <motion.div
              className="rounded-3xl overflow-hidden md:col-span-3 md:row-span-2 relative bg-kurumsal-bg-alt border border-kurumsal-border-soft"
              variants={cardV}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1974&auto=format&fit=crop"
                alt="Üniversite öğrencileri kampüste birlikte"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/15 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-7 text-white">
                <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 backdrop-blur text-[11px] font-semibold uppercase tracking-[0.14em]">
                  Kampüste
                </span>
                <p className="mt-4 font-serif text-2xl leading-snug max-w-sm text-white">
                  150+ gönüllü, tek bir vizyon etrafında.
                </p>
              </div>
            </motion.div>

            {/* VALUE — Sağlık */}
            <motion.article
              className="bg-white border border-kurumsal-border-soft rounded-3xl shadow-card-soft p-7 md:col-span-3 md:row-span-1 flex items-start gap-5"
              variants={cardV}
            >
              <span className="shrink-0 h-12 w-12 grid place-items-center rounded-2xl bg-yesilay-50 text-yesilay-700 ring-1 ring-yesilay-100">
                <Heart size={20} strokeWidth={1.8} />
              </span>
              <div>
                <h4 className="text-base font-semibold text-kurumsal-heading">Sağlık</h4>
                <p className="mt-1.5 text-sm text-kurumsal-text leading-relaxed">
                  Bedensel, ruhsal ve sosyal sağlıkta farkındalık — bilimsel temellere dayalı,
                  kişiyi merkeze alan bir yaklaşım.
                </p>
              </div>
            </motion.article>

            {/* VALUE — Topluluk */}
            <motion.article
              className="bg-white border border-kurumsal-border-soft rounded-3xl shadow-card-soft p-7 md:col-span-3 md:row-span-1 flex items-start gap-5"
              variants={cardV}
            >
              <span className="shrink-0 h-12 w-12 grid place-items-center rounded-2xl bg-yesilay-50 text-yesilay-700 ring-1 ring-yesilay-100">
                <Users size={20} strokeWidth={1.8} />
              </span>
              <div>
                <h4 className="text-base font-semibold text-kurumsal-heading">Topluluk</h4>
                <p className="mt-1.5 text-sm text-kurumsal-text leading-relaxed">
                  Hiçbir gönüllüyü yalnız bırakmayan, mentorluk ve dayanışmaya açık güçlü bir aile.
                </p>
              </div>
            </motion.article>

            {/* VALUE — Güven */}
            <motion.article
              className="bg-white border border-kurumsal-border-soft rounded-3xl shadow-card-soft p-7 md:col-span-2 md:row-span-1 flex items-start gap-5"
              variants={cardV}
            >
              <span className="shrink-0 h-12 w-12 grid place-items-center rounded-2xl bg-yesilay-50 text-yesilay-700 ring-1 ring-yesilay-100">
                <ShieldCheck size={20} strokeWidth={1.8} />
              </span>
              <div>
                <h4 className="text-base font-semibold text-kurumsal-heading">Güven</h4>
                <p className="mt-1.5 text-sm text-kurumsal-text leading-relaxed">
                  Kurumsal ortaklıklar ve şeffaf yönetim ile kalıcı bir etki.
                </p>
              </div>
            </motion.article>

            {/* VALUE — Vizyoner */}
            <motion.article
              className="rounded-3xl p-7 md:col-span-2 md:row-span-1 relative overflow-hidden bg-gradient-to-br from-yesilay-50 via-white to-kurumsal-bg-alt border border-yesilay-100"
              variants={cardV}
            >
              <Sparkles size={22} className="text-yesilay-700" strokeWidth={1.7} />
              <h4 className="mt-3 text-base font-semibold text-kurumsal-heading">Vizyoner</h4>
              <p className="mt-1.5 text-sm text-kurumsal-text leading-relaxed">
                Yeniliğe açık, dijital çağı kucaklayan bir gönüllülük kültürü.
              </p>
            </motion.article>

            {/* CTA tile — dark */}
            <motion.article
              className="rounded-3xl p-7 md:col-span-2 md:row-span-1 relative overflow-hidden text-white"
              style={{ backgroundImage: 'linear-gradient(135deg, #0F172A, #064E3B 90%)' }}
              variants={cardV}
            >
              <div
                aria-hidden
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-yesilay-500/20 blur-2xl"
              />
              <h4 className="font-serif text-xl leading-tight text-white">Sen de katıl.</h4>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                Kayıt 2 dakika sürer; sertifikalı etkinliklerin kapısını aralar.
              </p>
              <Link
                href="/gonullu-ol"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-yesilay-300 hover:text-yesilay-200"
              >
                Gönüllü Ol <ArrowRight size={14} />
              </Link>
            </motion.article>
          </div>
        </div>
      </motion.section>
    </>
  )
}
