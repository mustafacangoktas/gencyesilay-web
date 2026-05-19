import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Montserrat, Noto_Serif } from 'next/font/google'
import './styles.css'

import { SITE } from '@/lib/utils'
import { getCurrentUser } from '@/lib/payload'
import { AuthProvider, type AuthUser } from '@/context/AuthContext'
import AmbientBackground from '@/components/layout/AmbientBackground'
import ConditionalShell from '@/components/layout/ConditionalShell'
import MotionProvider from '@/components/layout/MotionProvider'

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})
const notoSerif = Noto_Serif({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-noto-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Dijital Hareket Merkezi`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  keywords: [
    'Genç Yeşilay',
    'Yeşilay',
    'Niğde Ömer Halisdemir Üniversitesi',
    'NÖHÜ',
    'gönüllü',
    'sağlıklı yaşam',
    'bağımlılıkla mücadele',
    'üniversite kulübü',
  ],
  authors: [{ name: SITE.organization }],
  creator: SITE.organization,
  publisher: SITE.organization,
  applicationName: SITE.name,
  category: 'community',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: SITE.url },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Dijital Hareket Merkezi`,
    description: SITE.description,
    images: [{ url: '/icons/gencyesliaylogo.png', width: 512, height: 512, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
    images: ['/icons/gencyesliaylogo.png'],
  },
  icons: { icon: '/favicon.ico', shortcut: '/favicon.ico', apple: '/icons/gencyesliaylogo.png' },
}

export const viewport: Viewport = { themeColor: '#00A651', width: 'device-width', initialScale: 1 }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const u = await getCurrentUser()
  const initialUser: AuthUser | null = u
    ? {
        id: u.id,
        email: u.email,
        fullName: u.fullName ?? undefined,
        role: (u.role as AuthUser['role']) ?? undefined,
        membershipStatus: (u.membershipStatus as AuthUser['membershipStatus']) ?? undefined,
      }
    : null

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: SITE.organization,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: `${SITE.url}/icons/gencyesliaylogo.png`,
    description: SITE.description,
    email: SITE.email,
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: 'Niğde Ömer Halisdemir Üniversitesi',
    },
  }

  return (
    <html lang="tr" className={`${montserrat.variable} ${notoSerif.variable}`}>
      <body>
        <AmbientBackground />
        <AuthProvider initialUser={initialUser}>
          <MotionProvider>
            <ConditionalShell>{children}</ConditionalShell>
          </MotionProvider>
        </AuthProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  )
}
