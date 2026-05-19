import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { SITE } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, '')
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/hakkimizda',
    '/etkinlikler',
    '/ekip',
    '/iletisim',
    '/gonullu-ol',
    '/giris',
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.7,
  }))

  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'events', limit: 500, depth: 0 })
    const eventRoutes: MetadataRoute.Sitemap = docs
      .filter((e) => e.slug)
      .map((e) => ({
        url: `${base}/etkinlikler/${e.slug}`,
        lastModified: e.updatedAt ? new Date(e.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    return [...staticRoutes, ...eventRoutes]
  } catch {
    return staticRoutes
  }
}
