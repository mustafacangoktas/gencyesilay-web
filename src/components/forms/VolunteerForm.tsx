'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Copy, Upload, Loader2, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { registerVolunteer } from '@/app/actions'

const IBAN = 'TR52 0001 5001 5800 7309 4902 66'
const IBAN_HOLDER = 'Yasemin Uğurlu'

const steps = [
  { id: 1, label: 'Aidat / IBAN' },
  { id: 2, label: 'Dekont' },
  { id: 3, label: 'Bilgiler' },
  { id: 4, label: 'Şifre' },
]

type State = {
  dekontFile: File | null
  dekontPreview: string | null
  dekontId?: string
  fullName: string
  department: string
  classYear: string
  studentNumber: string
  tcKimlik: string
  phone: string
  email: string
  password: string
}

const initial: State = {
  dekontFile: null,
  dekontPreview: null,
  fullName: '',
  department: '',
  classYear: '',
  studentNumber: '',
  tcKimlik: '',
  phone: '',
  email: '',
  password: '',
}

function passwordStrength(pw: string) {
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[a-z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s // 0..5
}

export default function VolunteerForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<State>(initial)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const uploading = false
  const [showPw, setShowPw] = useState(false)
  const [pending, startTransition] = useTransition()

  function update<K extends keyof State>(k: K, v: State[K]) {
    setData((d) => ({ ...d, [k]: v }))
  }

  function handleDekontSelect(file: File) {
    update('dekontFile', file)
    update('dekontPreview', URL.createObjectURL(file))
  }

  function next() {
    setError(null)
    if (step === 2) {
      if (!data.dekontFile) return setError('Dekont seçilmesi zorunlu.')
    }
    if (step === 3) {
      if (
        !data.fullName ||
        !data.department ||
        !data.classYear ||
        !data.studentNumber ||
        !data.tcKimlik ||
        !data.email
      )
        return setError('Lütfen tüm zorunlu alanları doldurun.')
      if (!/^\d{11}$/.test(data.tcKimlik)) return setError('TC Kimlik 11 haneli olmalı.')
    }
    setStep((s) => Math.min(4, s + 1))
  }
  function prev() {
    setError(null)
    setStep((s) => Math.max(1, s - 1))
  }

  function submit() {
    setError(null)
    const pwS = passwordStrength(data.password)
    if (pwS < 3) return setError('Daha güçlü bir şifre seçin (en az 8 karakter, harf+rakam).')

    const fd = new FormData()
    Object.entries(data).forEach(([k, v]) => {
      if (k === 'dekontPreview') return
      if (k === 'dekontFile' && v instanceof File) {
        fd.append('dekontFile', v)
        return
      }
      if (v != null) fd.append(k, String(v))
    })

    startTransition(async () => {
      const res = await registerVolunteer(null, fd)
      if (res && !res.ok) setError(res.error || 'Kayıt başarısız.')
      else router.push('/giris?registered=1')
    })
  }

  const pwS = passwordStrength(data.password)

  return (
    <div>
      {/* Sleek step progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2.5">
          {steps.map((s) => (
            <span
              key={s.id}
              className={cn(
                'text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors',
                step > s.id
                  ? 'text-emerald-600'
                  : step === s.id
                    ? 'text-slate-700'
                    : 'text-slate-300',
              )}
            >
              {s.label}
            </span>
          ))}
        </div>
        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-slate-400">
          Adım {step} / {steps.length}
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="mb-4 text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3"
        >
          {error}
        </p>
      )}

      {step === 1 && (
        <div className="space-y-5 animate-fade-up">
          <h2 className="text-xl font-bold">Aidat Transferi</h2>
          <p className="text-sm text-kurumsal-text">
            Kulüp aidatımız, etkinliklerin maliyetini ve gönüllü destek paketlerini karşılamak
            içindir. Aşağıdaki IBAN’a transfer yapıp dekontunu bir sonraki adımda yükle.
          </p>{' '}
          <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <span className="text-2xl font-extrabold text-emerald-600">₺100</span>
            <span className="text-sm text-emerald-800">bağış ücreti (tek seferlik aidat)</span>
          </div>{' '}
          <div className="card !shadow-none p-4 bg-yesilay-50/40 border-yesilay-100 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500 mb-1">
                Hesap Sahibi
              </div>
              <div className="text-sm font-semibold text-kurumsal-heading mb-2">{IBAN_HOLDER}</div>
              <code className="font-mono text-sm block break-all">{IBAN}</code>
            </div>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(IBAN.replace(/\s/g, ''))
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }}
              className="btn-ghost shrink-0"
            >
              {copied ? (
                <>
                  <Check size={14} /> Kopyalandı
                </>
              ) : (
                <>
                  <Copy size={14} /> Kopyala
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Açıklamaya “Genç Yeşilay - Ad Soyad - Öğrenci No” yazmayı unutma.
          </p>
          <button onClick={next} className="btn-pill-green w-full justify-center">
            Devam Et
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5 animate-fade-up">
          <h2 className="text-xl font-bold">Dekont Yükle</h2>
          <p className="text-sm text-kurumsal-text">
            PNG / JPG / PDF formatında dekont görselini yükle.
          </p>
          <label className="block border-2 border-dashed border-kurumsal-border rounded-2xl p-8 text-center cursor-pointer hover:border-yesilay-500 transition relative">
            <input
              type="file"
              accept="image/*,application/pdf"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) handleDekontSelect(f)
              }}
            />
            {data.dekontFile ? (
              <div className="flex flex-col items-center gap-2">
                {data.dekontPreview && (
                  <img
                    src={data.dekontPreview}
                    alt="Dekont"
                    className="max-h-40 rounded shadow-sm"
                  />
                )}
                <span className="text-sm text-yesilay-700 font-medium inline-flex items-center gap-1">
                  <Check size={14} /> Dekont seçildi
                </span>
                <span className="text-xs text-slate-500">Değiştirmek için tıkla</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-500">
                <Upload size={28} />
                <span className="text-sm">Dosyayı sürükle bırak ya da tıkla</span>
              </div>
            )}
          </label>
          <div className="flex gap-3">
            <button onClick={prev} className="btn-pill-ghost flex-1 justify-center">
              Geri
            </button>
            <button
              onClick={next}
              disabled={!data.dekontFile}
              className="btn-pill-green flex-1 justify-center disabled:opacity-50"
            >
              Devam Et
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 animate-fade-up">
          <h2 className="text-xl font-bold">Kişisel Bilgiler</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label">Ad Soyad</label>
              <input
                className="input"
                value={data.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Bölüm</label>
              <input
                className="input"
                value={data.department}
                onChange={(e) => update('department', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Sınıf</label>
              <input
                className="input"
                value={data.classYear}
                onChange={(e) => update('classYear', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Öğrenci No</label>
              <input
                className="input"
                value={data.studentNumber}
                onChange={(e) => update('studentNumber', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Telefon</label>
              <input
                className="input"
                value={data.phone}
                onChange={(e) => update('phone', e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">TC Kimlik No</label>
              <input
                className="input font-mono tracking-wider"
                value={data.tcKimlik}
                onChange={(e) => update('tcKimlik', e.target.value.replace(/\D/g, '').slice(0, 11))}
                inputMode="numeric"
                maxLength={11}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                KVKK kapsamında AES-256 şifreli olarak saklanır.
              </p>
            </div>
            <div className="sm:col-span-2">
              <label className="label">E-posta</label>
              <input
                type="email"
                className="input"
                value={data.email}
                onChange={(e) => update('email', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={prev} className="btn-pill-ghost flex-1 justify-center">
              Geri
            </button>
            <button onClick={next} className="btn-pill-green flex-1 justify-center">
              Devam Et
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-5 animate-fade-up">
          <h2 className="text-xl font-bold">Şifre Belirle</h2>
          <div>
            <label className="label">Şifre</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                className="input pr-10"
                value={data.password}
                onChange={(e) => update('password', e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-yesilay-700"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={cn(
                    'h-1 flex-1 rounded-full',
                    i <= pwS
                      ? pwS < 3
                        ? 'bg-rose-500'
                        : pwS < 4
                          ? 'bg-amber-500'
                          : 'bg-yesilay-500'
                      : 'bg-kurumsal-border',
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              En az 8 karakter, büyük-küçük harf ve rakam önerilir.
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={prev}
              className="btn-pill-ghost flex-1 justify-center"
              disabled={pending}
            >
              Geri
            </button>
            <button
              onClick={submit}
              disabled={pending}
              className="btn-pill-green flex-1 justify-center disabled:opacity-60"
            >
              {pending && <Loader2 size={14} className="animate-spin" />} Kaydımı Tamamla
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Kaydın “Beklemede” statüsüyle düşer. Yönetim dekontunu onayladığında hesabın aktifleşir.
          </p>
        </div>
      )}
    </div>
  )
}
