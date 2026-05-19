import type { Metadata } from 'next'
import EventsGrid from '@/components/home/EventsGrid'
import EventsPageHero from '@/components/events/EventsPageHero'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Etkinlikler',
  description:
    'Genç Yeşilay NÖHÜ etkinlikleri — sosyal, eğitim, sağlık, kampanya ve spor kategorilerinde tüm aktiviteler.',
  alternates: { canonical: '/etkinlikler' },
}

export const revalidate = 60

export default async function EtkinliklerPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'events',
    sort: '-date',
    depth: 1,
    limit: 100,
  })

  return (
    <>
      <EventsPageHero />
      <EventsGrid events={docs} variant="page" showFilters />
    </>
  )
}
