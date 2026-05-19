'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Settings,
  Award,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'

const navItems = [
  { href: '/', label: 'Anasayfa' },
  { href: '/etkinlikler', label: 'Etkinlikler' },
  { href: '/motivasyon', label: 'Motivasyon' },
  { href: '/ekip', label: 'Ekip' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/iletisim', label: 'İletişim' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const { user, logout, loading } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => {
    setOpen(false)
    setMenuOpen(false)
  }, [pathname])

  const initial = (user?.fullName || user?.email || 'GY').slice(0, 1).toUpperCase()

  return (
    <header className="fixed top-5 inset-x-5 md:top-6 md:inset-x-8 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <div
          className={cn(
            'flex items-center justify-between gap-6 px-5 md:px-7 transition-all duration-300 rounded-full border shadow-lg',
            scrolled
              ? 'h-14 bg-white border-slate-200/60 shadow-[0_2px_20px_rgba(15,23,42,0.08)]'
              : 'h-16 bg-white border-slate-200/60 shadow-[0_8px_32px_rgba(0,0,0,0.10)]',
          )}
        >
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-black/5 shadow-sm overflow-hidden">
              <Image
                src="/icons/gencyesliaylogo.png"
                alt="Genç Yeşilay"
                width={32}
                height={32}
                className="object-contain"
              />
            </span>
            <div className="leading-tight">
              <div
                className={cn(
                  'text-[13px] font-semibold tracking-tight leading-none transition-colors duration-300',
                  scrolled ? 'text-slate-800' : 'text-slate-800',
                )}
              >
                Genç Yeşilay
              </div>
              <div
                className={cn(
                  'hidden sm:block text-[10px] uppercase tracking-[0.16em] mt-1.5 leading-none transition-colors duration-300',
                  scrolled ? 'text-slate-500' : 'text-slate-500',
                )}
              >
                NÖHÜ Topluluğu
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((it) => {
              const active = pathname === it.href
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={cn(
                    'relative px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-300',
                    active
                      ? scrolled
                        ? 'text-emerald-700 bg-emerald-50/80'
                        : 'text-slate-800 bg-slate-100'
                      : scrolled
                        ? 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                        : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-100',
                  )}
                >
                  {it.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {loading ? (
              <div
                className={cn(
                  'h-9 w-24 rounded-full animate-pulse',
                  scrolled ? 'bg-slate-200' : 'bg-slate-200',
                )}
              />
            ) : user ? (
              <div ref={menuRef} className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2.5 pl-1.5 pr-3 h-10 rounded-full bg-white border border-slate-200 hover:border-emerald-200 transition shadow-sm"
                >
                  <span className="h-7 w-7 rounded-full bg-emerald-600 text-white grid place-items-center text-[11px] font-semibold">
                    {initial}
                  </span>
                  <span className="text-[12px] font-semibold text-slate-800 max-w-[100px] truncate">
                    {user.fullName?.split(' ')[0] || 'Profil'}
                  </span>
                  <ChevronDown
                    size={13}
                    strokeWidth={1.7}
                    className={cn('text-slate-400 transition-transform', menuOpen && 'rotate-180')}
                  />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-[24px] bg-white border border-slate-100 shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="text-sm font-semibold text-slate-800 truncate">
                        {user.fullName || 'Gönüllü'}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                    </div>
                    <div className="py-1.5">
                      <MenuItem
                        href="/profil"
                        icon={LayoutDashboard}
                        label="Profilim"
                        onClick={() => setMenuOpen(false)}
                      />
                      <MenuItem
                        href="/profil/sertifikalar"
                        icon={Award}
                        label="Sertifikalarım"
                        onClick={() => setMenuOpen(false)}
                      />
                    </div>
                    <div className="border-t border-slate-100 py-1.5">
                      <button
                        onClick={() => {
                          setMenuOpen(false)
                          logout()
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-rose-600 hover:bg-rose-50 transition"
                      >
                        <LogOut size={14} /> Çıkış Yap
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/giris"
                  className={cn(
                    'flex items-center gap-2 h-10 px-4 rounded-full text-[13px] font-medium transition-colors duration-300',
                    'text-slate-700 hover:bg-slate-100',
                  )}
                >
                  <LogIn size={14} /> Giriş
                </Link>
                <Link
                  href="/gonullu-ol"
                  className="flex items-center gap-2 h-10 px-5 rounded-full text-[13px] font-medium bg-emerald-600 text-white hover:bg-emerald-500 transition shadow-md"
                >
                  <UserPlus size={14} /> Aramıza Katıl
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-emerald-700 hover:border-emerald-200 transition shadow-sm shrink-0"
          >
            {open ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
          </button>
        </div>

        {/* Mobile menu drawer */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-out',
            open ? 'mt-3 max-h-[80vh] opacity-100' : 'mt-0 max-h-0 opacity-0',
          )}
        >
          <div className="rounded-3xl bg-white border border-slate-200/60 shadow-[0_8px_32px_rgba(0,0,0,0.10)] p-3">
            <nav className="flex flex-col">
              {navItems.map((it) => {
                const active = pathname === it.href
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'px-4 py-2.5 text-[14px] font-medium rounded-2xl transition-colors',
                      active
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50',
                    )}
                  >
                    {it.label}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-2 pt-3 border-t border-slate-100 flex flex-col gap-2">
              {loading ? (
                <div className="h-10 w-full rounded-full bg-slate-200 animate-pulse" />
              ) : user ? (
                <>
                  <div className="px-3 py-2">
                    <div className="text-sm font-semibold text-slate-800 truncate">
                      {user.fullName || 'Gönüllü'}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                  </div>
                  <Link
                    href="/profil"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-2xl transition"
                  >
                    <LayoutDashboard size={15} /> Profilim
                  </Link>
                  <Link
                    href="/profil/sertifikalar"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-2xl transition"
                  >
                    <Award size={15} /> Sertifikalarım
                  </Link>
                  <Link
                    href="/profil/ayarlar"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-2xl transition"
                  >
                    <Settings size={15} /> Ayarlar
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false)
                      logout()
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-rose-600 hover:bg-rose-50 rounded-2xl transition text-left"
                  >
                    <LogOut size={15} /> Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/giris"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 h-11 rounded-full text-[13px] font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition"
                  >
                    <LogIn size={15} /> Giriş Yap
                  </Link>
                  <Link
                    href="/gonullu-ol"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 h-11 rounded-full text-[13px] font-medium bg-emerald-600 text-white hover:bg-emerald-500 transition shadow-md"
                  >
                    <UserPlus size={15} /> Aramıza Katıl
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function MenuItem({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string
  icon: React.ElementType
  label: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
    >
      <Icon size={14} /> {label}
    </Link>
  )
}
