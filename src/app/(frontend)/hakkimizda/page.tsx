import type { Metadata } from 'next'
import HakkimizdaContent from '@/components/hakkimizda/HakkimizdaContent'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description:
    'Genç Yeşilay NÖHÜ — vizyonumuz, misyonumuz ve genç bir neslin sağlıklı bir gelecek için verdiği söz.',
  alternates: { canonical: '/hakkimizda' },
}

export default function HakkimizdaPage() {
  return <HakkimizdaContent />
}
