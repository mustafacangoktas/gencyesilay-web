'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

/** Pages that must render without the global Navbar and Footer */
const AUTH_PATHS = ['/giris', '/gonullu-ol', '/etkinlikler/bilgi-yarismasi']

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuth = AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))

  if (isAuth) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] pt-28">{children}</main>
      <Footer />
    </>
  )
}
