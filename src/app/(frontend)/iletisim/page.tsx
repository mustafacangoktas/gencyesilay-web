import type { Metadata } from 'next'
import IletisimContent from '@/components/contact/IletisimContent'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Genç Yeşilay NÖHÜ ile iletişime geç — soru, öneri ve iş birliği talepleri için.',
  alternates: { canonical: '/iletisim' },
}

export default function IletisimPage() {
  return <IletisimContent />
}
