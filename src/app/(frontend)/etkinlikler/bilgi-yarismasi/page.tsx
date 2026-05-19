import type { Metadata } from 'next'
import QuizGame from './QuizGame'
import questionsData from './questions.json'

export const metadata: Metadata = {
  title: 'Bilgi Yarışması · Genç Yeşilay NÖHÜ',
  description:
    'Yeşilay temalı, güncel ve sürpriz dolu bir bilgi yarışması. Bir soru çek, cevabı bul — efektler patlasın!',
  robots: { index: false, follow: false },
}

export default function BilgiYarismasiPage() {
  return <QuizGame data={questionsData} />
}
