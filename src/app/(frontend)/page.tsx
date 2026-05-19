import Hero from '@/components/home/Hero'
import StatsBar from '@/components/home/StatsBar'
import MotivationFeed from '@/components/home/MotivationFeed'
import EventsGrid from '@/components/home/EventsGrid'
import TeamScroll from '@/components/home/TeamScroll'
import CTA from '@/components/home/CTA'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 60

export default async function HomePage() {
  const payload = await getPayloadClient()
  const [motivations, events, team] = await Promise.all([
    payload.find({
      collection: 'motivations',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      depth: 1,
      limit: 9,
    }),
    payload.find({ collection: 'events', sort: '-date', depth: 1, limit: 12 }),
    payload.find({ collection: 'team', sort: 'order', depth: 1, limit: 12 }),
  ])
  return (
    <>
      <Hero />
      <StatsBar />
      <MotivationFeed items={motivations.docs} />
      <EventsGrid events={events.docs} />
      <TeamScroll members={team.docs} />
      <CTA />
    </>
  )
}
