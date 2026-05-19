import type { Metadata } from 'next'
import { Settings, KeyRound, UserCog } from 'lucide-react'
import { getCurrentUser } from '@/lib/payload'
import { redirect } from 'next/navigation'
import ProfileSettingsForms, { PasswordForm } from './forms'

export const metadata: Metadata = {
  title: 'Hesap Ayarları · Genç Yeşilay NÖHÜ',
}

export default async function AyarlarPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/giris?redirect=/profil/ayarlar')

  return (
    <div className="space-y-8">
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yesilay-50 text-yesilay-700 border border-yesilay-100 text-[11px] font-semibold uppercase tracking-[0.14em]">
          <Settings size={12} /> Ayarlar
        </div>
        <h1 className="mt-3 text-2xl md:text-3xl font-bold text-kurumsal-heading">
          Hesap Ayarları
        </h1>
        <p className="mt-1.5 text-kurumsal-text max-w-xl">
          Profil bilgilerini güncelle ve hesap güvenliğini koru.
        </p>
      </header>

      <section className="bg-white rounded-3xl border border-kurumsal-border-soft shadow-card-soft p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <UserCog size={20} className="text-yesilay-700" strokeWidth={1.6} />
          <h2 className="text-lg font-semibold text-kurumsal-heading">Profil Bilgileri</h2>
        </div>
        <ProfileSettingsForms
          initial={{
            fullName: user.fullName ?? '',
            phone: user.phone ?? '',
            bio: user.bio ?? '',
            email: user.email ?? '',
          }}
        />
      </section>

      <section className="bg-white rounded-3xl border border-kurumsal-border-soft shadow-card-soft p-6 md:p-8">
        <div className="flex items-center gap-3 mb-1.5">
          <KeyRound size={20} className="text-yesilay-700" strokeWidth={1.6} />
          <h2 className="text-lg font-semibold text-kurumsal-heading">Şifre Değiştir</h2>
        </div>
        <p className="text-sm text-kurumsal-text mb-5">
          Güvenliğin için en az 8 karakter, harf ve rakam içeren bir şifre kullan.
        </p>
        <PasswordForm />
      </section>
    </div>
  )
}
