'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const res = await login(email.trim(), password)
    setLoading(false)
    if (!res.ok) {
      setError(res.error || 'Giriş başarısız.')
      return
    }
    router.push('/profil')
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* E-posta */}
      <div>
        <label htmlFor="email" className="field-label">
          Öğrenci Numarası / E-posta
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          placeholder="ornek@ohu.edu.tr"
          autoComplete="email"
        />
      </div>

      {/* Şifre */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="password" className="field-label mb-0">
            Şifre
          </label>
          <Link
            href="/sifremi-unuttum"
            tabIndex={-1}
            className="text-[12px] text-kurumsal-text-muted hover:text-yesilay-700 transition-colors"
          >
            Şifremi Unuttum
          </Link>
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPw ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input pr-11"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-kurumsal-text-muted hover:text-kurumsal-heading transition-colors"
            tabIndex={-1}
            aria-label={showPw ? 'Şifreyi gizle' : 'Şifreyi göster'}
          >
            {showPw ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p
          role="alert"
          className="text-[13px] text-rose-700 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3"
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-pill-green w-full justify-center mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading && <Loader2 size={16} strokeWidth={1.5} className="animate-spin" />}
        Giriş Yap
      </button>
    </form>
  )
}
