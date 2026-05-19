import type { Metadata } from 'next'
import { getCurrentUser, getPayloadClient } from '@/lib/payload'
import ProfilDashboard from '@/components/profil/ProfilDashboard'

export const metadata: Metadata = {
  title: 'Profilim',
  description: 'Üyelik durumu, sertifikalar ve son aktiviteler.',
  robots: { index: false, follow: false },
}

export default async function ProfilPage() {
  const user = await getCurrentUser()
  if (!user) return null

  const payload = await getPayloadClient()
  const [myMotivations, myFeedback, myCertificates] = await Promise.all([
    payload.find({
      collection: 'motivations',
      where: { createdBy: { equals: user.id } },
      sort: '-createdAt',
      limit: 5,
    }),
    payload.find({
      collection: 'feedbacks',
      where: { createdBy: { equals: user.id } },
      sort: '-createdAt',
      limit: 1,
    }),
    payload.find({
      collection: 'certificates',
      where: { participantName: { equals: user.fullName || '__none__' } },
      sort: '-createdAt',
      limit: 1,
    }),
  ])

  const firstName = user.fullName?.split(' ')[0] || 'gönüllü'
  const isApproved = user.membershipStatus === 'approved'
  const publishedCount = myMotivations.docs.filter((m) => m.status === 'published').length

  return (
    <ProfilDashboard
      firstName={firstName}
      isApproved={isApproved}
      membershipStatus={user.membershipStatus}
      publishedCount={publishedCount}
      motivationTotal={myMotivations.totalDocs}
      motivationDocs={myMotivations.docs}
      feedbackTotal={myFeedback.totalDocs}
      certificateTotal={myCertificates.totalDocs}
    />
  )
}
