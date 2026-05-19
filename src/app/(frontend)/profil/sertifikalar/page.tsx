import type { Metadata } from 'next'
import { getCurrentUser, getPayloadClient } from '@/lib/payload'
import { formatDate } from '@/lib/utils'
import type { Event } from '@/payload-types'
import { Award, Download } from 'lucide-react'

export const metadata: Metadata = { title: 'Sertifikalarım', robots: { index: false, follow: false } }

export default async function SertifikalarPage() {
  const user = await getCurrentUser()
  if (!user) return null
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'certificates',
    where: { participantName: { equals: user.fullName } },
    depth: 1,
    sort: '-issuedAt',
  })

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold">Sertifikalarım</h1>
        <p className="mt-1.5 text-kurumsal-text">Etkinliklere katılımının belgesi tek tıkla burada.</p>
      </header>

      {docs.length === 0 ? (
        <div className="card p-10 text-center">
          <Award size={32} className="mx-auto text-yesilay-500" />
          <p className="mt-3 text-kurumsal-text text-sm">Henüz sertifikan yok. Etkinliklere katıldıkça burada görünecek.</p>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {docs.map((c) => {
            const event = typeof c.event === 'object' ? (c.event as Event) : null
            return (
              <li key={c.id} className="card-hover p-5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-500">{c.certificateNo}</div>
                  <div className="font-semibold text-kurumsal-heading">{event?.title || 'Etkinlik'}</div>
                  <div className="text-xs text-slate-500 mt-1">{formatDate(c.issuedAt)}</div>
                </div>
                {c.pdfUrl && (
                  <a href={c.pdfUrl} download className="btn-outline">
                    <Download size={14} /> İndir
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
