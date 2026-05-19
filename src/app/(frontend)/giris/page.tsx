import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Leaf } from 'lucide-react'
import LoginForm from '@/components/forms/LoginForm'

export const metadata: Metadata = {
  title: 'Giriş Yap',
  description: 'Genç Yeşilay NÖHÜ portalına giriş yap.',
}

export default async function GirisPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>
}) {
  return (
    <main className="flex h-screen bg-white w-full overflow-hidden">
      {/* Visual Column / 50% */}
      <div className="hidden lg:flex flex-col w-1/2 relative bg-emerald-950 overflow-hidden">
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ig/sigarasiz-alan.jpg"
          alt="Genç Yeşilay etkinliği"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: 'overlay', opacity: 0.55 }}
        />
        {/* Multi-layer depth gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/95 via-emerald-900/60 to-emerald-800/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />

        {/* Brand mark — top */}
        <div className="relative z-10 p-10">
          <div className="flex items-center gap-2.5">
            <span className="h-7 w-7 rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/35 flex items-center justify-center">
              <Leaf size={13} className="text-emerald-300" />
            </span>
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-emerald-300/75">
              Genç Yeşilay NÖHÜ
            </span>
          </div>
        </div>

        {/* Quote — bottom */}
        <div className="relative z-10 mt-auto p-10 pb-14">
          <span className="block font-serif text-[72px] leading-none text-emerald-400/30 -ml-2 mb-1 select-none">
            "
          </span>
          <h2 className="text-white font-serif text-[2rem] leading-snug font-semibold tracking-tight">
            Sağlıklı bir kampüs,
            <br />
            <span className="text-emerald-300">aydınlık bir gelecek.</span>
          </h2>
          <p className="mt-5 text-[11px] text-emerald-200/50 uppercase tracking-[0.22em]">
            — NÖHÜ Genç Yeşilay Topluluğu
          </p>
          <div className="mt-7 flex items-center gap-1.5">
            <div className="h-0.5 w-10 bg-emerald-400 rounded-full" />
            <div className="h-0.5 w-4 bg-emerald-400/35 rounded-full" />
            <div className="h-0.5 w-2 bg-emerald-400/15 rounded-full" />
          </div>
        </div>
      </div>

      {/* Form Column / 50% */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#FAFAF8] overflow-y-auto relative">
        <Link
          href="/"
          className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition"
        >
          <ArrowLeft size={14} /> Anasayfa
        </Link>
        <div className="w-full max-w-md py-12 px-2">
          {/* Mobile brand (shows only on small screens) */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <span className="h-8 w-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <Leaf size={16} />
            </span>
            <span className="text-sm font-semibold tracking-wider uppercase text-emerald-800">
              Genç Yeşilay
            </span>
          </div>

          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 mb-3">
              Hesabına Eriş
            </p>
            <h1 className="font-serif text-4xl text-slate-900 mb-2 tracking-tight">Giriş Yap</h1>
            <p className="text-sm text-slate-500">Topluluğa erişmek için bilgilerini gir.</p>
          </div>

          <RegisteredBanner searchParams={searchParams} />

          <LoginForm />

          <div className="mt-8 text-center pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Henüz gönüllü değil misin?{' '}
              <Link
                href="/gonullu-ol"
                className="font-semibold text-emerald-600 hover:text-emerald-700 transition"
              >
                Aramıza Katıl
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

async function RegisteredBanner({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>
}) {
  const sp = await searchParams
  if (sp.registered !== '1') return null
  return (
    <div className="mb-6 flex gap-3 p-4 rounded-[24px] bg-emerald-50 text-emerald-800 text-sm">
      <Leaf size={18} className="shrink-0 mt-0.5" />
      <p>Kaydın alındı. Dekontun onaylandığında hesabın aktifleşecek.</p>
    </div>
  )
}
