import type { Metadata } from 'next'
import { getCurrentUser, getPayloadClient } from '@/lib/payload'
import MotivationForm from '@/components/forms/MotivationForm'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Motivasyon Paylaş',
  robots: { index: false, follow: false },
}

export default async function MotivasyonPage() {
  const user = await getCurrentUser()
  if (!user) return null
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'motivations',
    where: { createdBy: { equals: user.id } },
    sort: '-createdAt',
    limit: 50,
  })

  const canPost =
    user.role === 'admin' || user.role === 'editor' || user.membershipStatus === 'approved'

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold">Motivasyon Paylaş</h1>
        <p className="mt-1.5 text-kurumsal-text max-w-xl">
          Onaylanan paylaşımların anasayfa akışında topluluğa görünür.
        </p>
      </header>

      {!canPost && (
        <div className="card p-4 text-sm text-amber-800 bg-amber-50 border-amber-100">
          Üyeliğin “Beklemede”. Dekontun onaylandığında motivasyon paylaşabileceksin.
        </div>
      )}

      <MotivationForm disabled={!canPost} />

      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">Önceki Paylaşımların</h2>
        {docs.length === 0 ? (
          <p className="text-sm text-kurumsal-text">Henüz paylaşım yok.</p>
        ) : (
          <ul className="space-y-4">
            {docs.map((m) => (
              <li key={m.id} className="border-b border-kurumsal-border pb-4 last:border-0">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm text-kurumsal-heading flex-1 leading-relaxed">{m.content}</p>
                  <span className={
                    m.status === 'published' ? 'badge-approved' :
                    m.status === 'rejected' ? 'badge-rejected' :
                    m.status === 'in_review' ? 'badge-pending' : 'badge'
                  }>
                    {m.status === 'published' ? 'Yayında' : m.status === 'rejected' ? 'Reddedildi' : m.status === 'in_review' ? 'İncelemede' : 'Taslak'}
                  </span>
                </div>
                <span className="text-xs text-slate-500 mt-1 inline-block">{formatDate(m.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
