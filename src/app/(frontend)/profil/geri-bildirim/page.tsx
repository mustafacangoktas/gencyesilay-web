import type { Metadata } from 'next'
import { getCurrentUser, getPayloadClient } from '@/lib/payload'
import FeedbackForm from '@/components/forms/FeedbackForm'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Geri Bildirim',
  robots: { index: false, follow: false },
}

const CAT: Record<string, string> = {
  kulup_istegi: 'Kulüp İsteği',
  etkinlik_istegi: 'Etkinlik İsteği',
  oneri: 'Öneri / Talep',
  elestiri: 'Eleştiri',
  fikir: 'Alternatif Fikir',
}

const ST: Record<string, string> = {
  unread: 'Okunmadı',
  in_progress: 'İşleme Alındı',
  resolved: 'Çözüldü',
}

export default async function GeriBildirimPage() {
  const user = await getCurrentUser()
  if (!user) return null
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'feedbacks',
    where: { createdBy: { equals: user.id } },
    sort: '-createdAt',
    limit: 50,
  })

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold">Dilek, İstek ve Geri Bildirim</h1>
        <p className="mt-1.5 text-kurumsal-text max-w-xl">
          Kulüp yönetimine doğrudan ulaştır; düşüncelerini ve önerilerini paylaş.
        </p>
      </header>

      <FeedbackForm />

      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">Geçmiş Bildirimlerin</h2>
        {docs.length === 0 ? (
          <p className="text-sm text-kurumsal-text">Henüz bir bildirim göndermedin.</p>
        ) : (
          <ul className="divide-y divide-kurumsal-border">
            {docs.map((f) => (
              <li key={f.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <span className="badge-yesilay">{CAT[f.category] || f.category}</span>
                  <span className="text-xs text-slate-500 ml-2">{formatDate(f.createdAt)}</span>
                </div>
                <span
                  className={
                    f.status === 'resolved'
                      ? 'badge-approved'
                      : f.status === 'in_progress'
                        ? 'badge-pending'
                        : 'badge'
                  }
                >
                  {ST[f.status] || f.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
