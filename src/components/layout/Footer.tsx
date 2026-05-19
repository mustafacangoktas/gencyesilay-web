import Link from 'next/link'
import Image from 'next/image'
import { Mail, Camera, AtSign, Briefcase, MapPin, ArrowUpRight } from 'lucide-react'
import { SITE } from '@/lib/utils'

const linkGroups = [
  {
    title: 'Topluluk',
    links: [
      { href: '/etkinlikler', label: 'Etkinlikler' },
      { href: '/motivasyon', label: 'Motivasyon Akışı' },
      { href: '/ekip', label: 'Ekibimiz' },
      { href: '/hakkimizda', label: 'Hakkımızda' },
    ],
  },
  {
    title: 'Katılım',
    links: [
      { href: '/gonullu-ol', label: 'Gönüllü Ol' },
      { href: '/giris', label: 'Üye Girişi' },
      { href: '/profil', label: 'Profilim' },
      { href: '/iletisim', label: 'İletişim' },
    ],
  },
]

const socials = [
  { href: `mailto:${SITE.email}`, icon: Mail, label: 'E-posta' },
  { href: 'https://instagram.com', icon: Camera, label: 'Instagram' },
  { href: 'https://twitter.com', icon: AtSign, label: 'X / Twitter' },
  { href: 'https://linkedin.com', icon: Briefcase, label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer
      className="relative mt-32 text-slate-300 overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(180deg, #0B1220 0%, #0A1A14 100%)',
      }}
    >
      {/* Subtle emerald accent halo */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(5,150,105,0.18) 0%, transparent 65%)',
        }}
      />

      <div className="relative container-app pt-20 pb-10">
        {/* Top row — brand + newsletter prompt */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] pb-14 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-full bg-white grid place-items-center ring-1 ring-white/10">
                <Image
                  src="/icons/gencyesliaylogo.png"
                  alt="Genç Yeşilay"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white tracking-tight leading-none">
                  {SITE.shortName}
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-yesilay-300/80 mt-1.5 leading-none">
                  NÖHÜ Topluluğu
                </div>
              </div>
            </div>
            <p className="mt-6 text-[13.5px] leading-relaxed text-slate-400 max-w-sm">
              {SITE.description}
            </p>

            <div className="mt-7 flex items-start gap-3 text-[13px] text-slate-400">
              <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-yesilay-300" />
              <span>
                Niğde Ömer Halisdemir Üniversitesi
                <br />
                Merkez Kampüs, Niğde / Türkiye
              </span>
            </div>
          </div>

          {linkGroups.map((g) => (
            <div key={g.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-yesilay-300/90 mb-5">
                {g.title}
              </h4>
              <ul className="space-y-3">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1.5 text-[13.5px] text-slate-300 hover:text-white transition-colors"
                    >
                      {l.label}
                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.5}
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-yesilay-300/90 mb-5">
              Bizi Takip Et
            </h4>
            <p className="text-[13.5px] leading-relaxed text-slate-400 mb-5">
              Kampanyalarımızdan, etkinliklerden ve gönüllü hikâyelerinden ilk sen haberdar ol.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="h-10 w-10 grid place-items-center rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-yesilay-600 hover:text-white hover:border-yesilay-600 transition"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-7 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[12px] text-slate-500">
          <p>
            © {new Date().getFullYear()} {SITE.organization}. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500">Niğde Ömer Halisdemir Üniversitesi</span>
            <span className="hidden md:inline-block h-3 w-px bg-white/15" />
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-yesilay-400 inline-block" />
              Genç Yeşilay Topluluğu
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
