'use client'

import { useActionState } from 'react'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { updateProfile, changePassword } from '@/app/actions'

type ProfileInitial = {
  fullName: string
  phone: string
  bio: string
  email: string
}

function ProfileForm({ initial }: { initial: ProfileInitial }) {
  const [state, action, pending] = useActionState(
    updateProfile,
    null as null | { ok: boolean; error?: string },
  )

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="label">E-posta</label>
        <input
          type="email"
          defaultValue={initial.email}
          disabled
          className="input bg-slate-50 text-slate-500"
        />
        <p className="mt-1 text-[11px] text-kurumsal-text-muted">E-posta değiştirilemez.</p>
      </div>
      <div>
        <label className="label">Ad Soyad *</label>
        <input
          name="fullName"
          defaultValue={initial.fullName}
          required
          minLength={3}
          className="input"
        />
      </div>
      <div>
        <label className="label">Telefon</label>
        <input
          name="phone"
          defaultValue={initial.phone}
          className="input"
          placeholder="+90 5XX XXX XX XX"
        />
      </div>
      <div>
        <label className="label">Biyografi</label>
        <textarea
          name="bio"
          defaultValue={initial.bio}
          rows={4}
          maxLength={500}
          className="input resize-none"
          placeholder="Kendinden kısaca bahset…"
        />
      </div>
      {state?.error && (
        <p className="flex items-start gap-2 text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-md px-3 py-2">
          <AlertCircle size={14} className="mt-0.5 shrink-0" /> {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="flex items-center gap-2 text-sm text-yesilay-700 bg-yesilay-50 border border-yesilay-100 rounded-md px-3 py-2">
          <CheckCircle2 size={14} /> Profil bilgilerin güncellendi.
        </p>
      )}
      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Kaydediliyor…
          </>
        ) : (
          'Kaydet'
        )}
      </button>
    </form>
  )
}

function PasswordForm() {
  const [state, action, pending] = useActionState(
    changePassword,
    null as null | { ok: boolean; error?: string },
  )

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="label">Mevcut Şifre *</label>
        <input
          type="password"
          name="currentPassword"
          required
          autoComplete="current-password"
          className="input"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Yeni Şifre *</label>
          <input
            type="password"
            name="newPassword"
            required
            minLength={8}
            autoComplete="new-password"
            className="input"
          />
        </div>
        <div>
          <label className="label">Yeni Şifre (Tekrar) *</label>
          <input
            type="password"
            name="confirmPassword"
            required
            minLength={8}
            autoComplete="new-password"
            className="input"
          />
        </div>
      </div>
      {state?.error && (
        <p className="flex items-start gap-2 text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-md px-3 py-2">
          <AlertCircle size={14} className="mt-0.5 shrink-0" /> {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="flex items-center gap-2 text-sm text-yesilay-700 bg-yesilay-50 border border-yesilay-100 rounded-md px-3 py-2">
          <CheckCircle2 size={14} /> Şifren başarıyla değiştirildi.
        </p>
      )}
      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Güncelleniyor…
          </>
        ) : (
          'Şifreyi Değiştir'
        )}
      </button>
    </form>
  )
}

export { PasswordForm }
export default ProfileForm
