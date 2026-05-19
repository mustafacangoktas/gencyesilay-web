import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { MotivasyonHero, MotivasyonWall } from '@/components/motivasyon/MotivasyonComponents'

export const metadata: Metadata = {
  title: 'Gönüllülerimizden Notlar',
  description:
    'Genç Yeşilay NÖHÜ gönüllülerinin kendi sözleriyle paylaştığı motivasyon ve hikâyeler — kampüsün canlı duvarı.',
  alternates: { canonical: '/motivasyon' },
}

export const revalidate = 60

export default async function MotivasyonPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'motivations',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 1,
    limit: 60,
  })

  return (
    <>
      <MotivasyonHero />
      <MotivasyonWall docs={docs} />
    </>
  )
}
