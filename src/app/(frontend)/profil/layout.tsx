import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  MessageSquareQuote,
  Award,
  Inbox,
  Settings,
  ShieldCheck,
} from 'lucide-react'
import { getCurrentUser } from '@/lib/payload'
import { cn } from '@/lib/utils'

const items = [
  { href: '/profil', label: 'Genel', icon: LayoutDashboard },
  { href: '/profil/motivasyon', label: 'Motivasyon Paylaş', icon: MessageSquareQuote },
  { href: '/profil/sertifikalar', label: 'Sertifikalarım', icon: Award },
  { href: '/profil/geri-bildirim', label: 'Geri Bildirim', icon: Inbox },
]

export default async function ProfilLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect('/giris?redirect=/profil')

  const initial = (user.fullName || user.email || 'GY').slice(0, 1).toUpperCase()
  const roleLabel =
    user.role === 'admin'
      ? 'Yönetici'
      : user.role === 'editor'
        ? 'Editör'
        : user.role === 'volunteer'
          ? 'Onaylı Gönüllü'
          : 'Aday Gönüllü'

  const statusBadge =
    user.membershipStatus === 'approved'
      ? { label: 'Onaylandı', cls: 'bg-yesilay-50 text-yesilay-700 border-yesilay-100' }
      : user.membershipStatus === 'rejected'
        ? { label: 'Reddedildi', cls: 'bg-rose-50 text-rose-700 border-rose-100' }
        : { label: 'Beklemede', cls: 'bg-amber-50 text-amber-700 border-amber-100' }

  return (
    <section className="container-app py-12 md:py-16 grid gap-8 lg:grid-cols-[280px,1fr]">
      {/* Sidebar */}
      <aside className="self-start lg:sticky lg:top-28">
        <div className="bg-white rounded-3xl border border-kurumsal-border-soft shadow-card-soft p-6">
          {/* User card */}
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yesilay-500 to-yesilay-700 text-white grid place-items-center text-base font-semibold ring-2 ring-white shadow-sm">
              {initial}
            </div>
            <div className="leading-tight min-w-0">
              <div className="text-sm font-semibold text-kurumsal-heading truncate">
                {user.fullName || user.email}
              </div>
              <div className="text-[11px] uppercase tracking-[0.12em] text-kurumsal-text-muted mt-0.5">
                {roleLabel}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <ShieldCheck size={13} strokeWidth={1.6} className="text-kurumsal-text-muted" />
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold uppercase tracking-[0.1em] border',
                statusBadge.cls,
              )}
            >
              {statusBadge.label}
            </span>
          </div>

          {/* Nav */}
          <nav className="mt-6 pt-6 border-t border-kurumsal-border-soft space-y-1">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-kurumsal-text hover:bg-yesilay-50/60 hover:text-yesilay-700 transition"
              >
                <it.icon size={15} strokeWidth={1.5} /> {it.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-kurumsal-border-soft">
            <Link
              href="/profil/ayarlar"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-kurumsal-text-muted hover:text-yesilay-700 transition"
            >
              <Settings size={14} strokeWidth={1.5} /> Hesap Ayarları
            </Link>
          </div>
        </div>
      </aside>

      <div className="min-w-0">{children}</div>
    </section>
  )
}
