import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPayloadClient } from '@/lib/payload'
import { formatDateTime, SITE } from '@/lib/utils'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Event, Media } from '@/payload-types'
import EventGallery, { type GalleryMedia } from '@/components/events/EventGallery'
import EventDetailHero from '@/components/events/EventDetailHero'
import EventDetailBody from '@/components/events/EventDetailBody'

type Params = { params: Promise<{ slug: string }> }

async function getEvent(slug: string): Promise<Event | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return docs[0] || null
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const e = await getEvent(slug)
  if (!e) return { title: 'Etkinlik bulunamadı' }
  const cover = typeof e.coverImage === 'object' ? (e.coverImage as Media) : null
  return {
    title: e.title,
    description: e.shortDescription || `${e.title} — Genç Yeşilay NÖHÜ etkinliği.`,
    alternates: { canonical: `/etkinlikler/${e.slug}` },
    openGraph: {
      title: e.title,
      description: e.shortDescription || undefined,
      images: cover?.url ? [{ url: cover.url }] : undefined,
      type: 'article',
    },
  }
}

export default async function EtkinlikDetay({ params }: Params) {
  const { slug } = await params
  const e = await getEvent(slug)
  if (!e) notFound()

  const cover = typeof e.coverImage === 'object' ? (e.coverImage as Media) : null

  const galleryItems: GalleryMedia[] = Array.isArray(e.gallery)
    ? e.gallery
        .map((g) => (typeof g.image === 'object' ? (g.image as Media) : null))
        .filter((m): m is Media => !!m && !!m.url)
        .map((m) => ({
          id: m.id,
          url: m.url as string,
          alt: m.alt || e.title,
          mimeType: m.mimeType ?? null,
          width: m.width ?? null,
          height: m.height ?? null,
        }))
    : []

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.title,
    startDate: e.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: e.location ? { '@type': 'Place', name: e.location } : undefined,
    image: cover?.url ? [`${SITE.url}${cover.url}`] : undefined,
    description: e.shortDescription || undefined,
    organizer: { '@type': 'Organization', name: SITE.organization, url: SITE.url },
  }

  return (
    <article>
      {/* ── Cover hero with animated text ─────────────────────────── */}
      <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        {cover?.url ? (
          <Image
            src={cover.url}
            alt={cover.alt || e.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-yesilay-700 to-yesilay-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <EventDetailHero
          category={e.category}
          title={e.title}
          date={e.date}
          location={e.location}
        />
      </div>

      {/* ── Animated content + aside ───────────────────────────────── */}
      <EventDetailBody
        main={
          <>
            {e.shortDescription && <p className="lead text-lg">{e.shortDescription}</p>}
            {e.description && <RichText data={e.description} />}

            {galleryItems.length > 0 && (
              <div className="not-prose mt-10">
                <h2 className="text-xl md:text-2xl font-semibold text-kurumsal-heading mb-4">
                  Galeri{' '}
                  <span className="text-sm font-normal text-kurumsal-text-muted">
                    ({galleryItems.length} medya)
                  </span>
                </h2>
                <EventGallery items={galleryItems} />
              </div>
            )}
          </>
        }
        aside={
          <>
            <div className="card p-5">
              <h3 className="font-semibold mb-3">Detaylar</h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-slate-500">Tarih</dt>
                  <dd>{formatDateTime(e.date)}</dd>
                </div>
                {e.location && (
                  <div>
                    <dt className="text-slate-500">Konum</dt>
                    <dd>{e.location}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-slate-500">Yıl</dt>
                  <dd>{e.year}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Kategori</dt>
                  <dd className="capitalize">{e.category}</dd>
                </div>
              </dl>
              <Link href="/gonullu-ol" className="btn-primary w-full mt-5">
                Aramıza Katıl
              </Link>
            </div>
            {e.mapEmbedUrl && (
              <div className="card overflow-hidden">
                <iframe
                  src={e.mapEmbedUrl}
                  title="Konum"
                  className="w-full aspect-square border-0"
                  loading="lazy"
                />
              </div>
            )}
          </>
        }
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
    </article>
  )
}
