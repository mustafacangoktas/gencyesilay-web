'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export type AuthUser = {
  id: number | string
  email: string
  fullName?: string
  role?: 'admin' | 'editor' | 'volunteer' | 'candidate'
  membershipStatus?: 'pending' | 'approved' | 'rejected'
}

type AuthContextType = {
  user: AuthUser | null
  loading: boolean
  refresh: () => Promise<void>
  logout: () => Promise<void>
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: AuthUser | null
  children: React.ReactNode
}) {
  const [user, setUser] = useState<AuthUser | null>(initialUser)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/users/me', { credentials: 'include' })
      if (!res.ok) return setUser(null)
      const data = await res.json()
      setUser(data?.user || null)
    } catch {
      setUser(null)
    }
  }, [])

  const login = useCallback<AuthContextType['login']>(async (email, password) => {
    setLoading(true)
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        return { ok: false, error: j?.errors?.[0]?.message || 'Giriş başarısız.' }
      }
      const data = await res.json()
      setUser(data?.user || null)
      router.refresh()
      return { ok: true }
    } finally {
      setLoading(false)
    }
  }, [router])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
      setUser(null)
      router.push('/')
      router.refresh()
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (!initialUser) refresh()
  }, [initialUser, refresh])

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
