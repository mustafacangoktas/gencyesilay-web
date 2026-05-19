import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { EkipHero, EkipGrid } from '@/components/ekip/EkipComponents'

export const metadata: Metadata = {
  title: 'Ekibimiz',
  description:
    'Genç Yeşilay NÖHÜ — yönetim kurulu, takım liderleri ve hareketin arkasındaki gönüllü yüzler.',
  alternates: { canonical: '/ekip' },
}

export const revalidate = 60

export default async function EkipPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'team',
    sort: 'order',
    depth: 1,
    limit: 200,
  })

  return (
    <>
      <EkipHero />
      <EkipGrid docs={docs} />
    </>
  )
}
