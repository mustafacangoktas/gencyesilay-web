import type { Payload } from 'payload'

export async function seedData(payload: Payload) {
  // Check if data already exists
  const existingMotivations = await payload.find({
    collection: 'motivations',
    limit: 1,
  })

  const existingEvents = await payload.find({
    collection: 'events',
    limit: 1,
  })

  if (existingMotivations.totalDocs > 0 && existingEvents.totalDocs > 0) {
    return
  }

  // Get or create admin user for seed data
  const users = await payload.find({
    collection: 'users',
    where: { role: { equals: 'admin' } },
    limit: 1,
  })

  let adminUserId: number | string = 1
  if (users.totalDocs > 0) {
    adminUserId = users.docs[0].id
  } else {
    // Create admin user if doesn't exist
    const adminUser = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@gencyesliay.org',
        password: 'ChangeMe123!**',
        fullName: 'Yönetici',
        department: 'Yönetim',
        classYear: '2024',
        studentNumber: 'ADMIN001',
        tcKimlik: '00000000000',
        role: 'admin',
        membershipStatus: 'approved',
      },
      overrideAccess: true,
    })
    adminUserId = adminUser.id
  }

  // Seed Motivations if needed
  if (existingMotivations.totalDocs === 0) {
    const createdById = Number(adminUserId)
    const motivationsData: {
      content: string
      status: 'draft' | 'published' | 'rejected' | 'in_review'
      createdBy: number
      publishedAt: string
    }[] = [
      {
        content:
          '🌟 Gönüllülük sadece bir aktivite değil, bir yaşam tarzıdır. Her gün birisinin hayatında fark yaratmak için elini uzatırız.',
        status: 'published',
        createdBy: createdById,
        publishedAt: new Date().toISOString(),
      },
      {
        content:
          '💚 Genç Yeşilay ile birlikte olmak, toplumun nabzını tutmak ve değişime liderlik etmek demektir. Biz buradayız!',
        status: 'published',
        createdBy: createdById,
        publishedAt: new Date().toISOString(),
      },
      {
        content:
          '🚀 Sosyal sorumluluk projelerimiz aracılığıyla gençlerin potansiyelini ortaya çıkarıyoruz. Seni de bekliyoruz!',
        status: 'published',
        createdBy: createdById,
        publishedAt: new Date().toISOString(),
      },
      {
        content:
          '❤️ Bir gönüllü bir kahramandır. Yıl boyunca yüzlerce insanın yüzüne tebessüm taşıyoruz.',
        status: 'published',
        createdBy: createdById,
        publishedAt: new Date().toISOString(),
      },
      {
        content:
          '🎯 Toplumsal duyarlılık ve gençlik gücü bir araya geldiğinde, harika şeyler gerçekleşir. Biz buna tanık olduk.',
        status: 'published',
        createdBy: createdById,
        publishedAt: new Date().toISOString(),
      },
    ]

    for (const data of motivationsData) {
      await payload.create({
        collection: 'motivations',
        data,
        overrideAccess: true,
      })
    }
  }

  // Seed Events if needed
  if (existingEvents.totalDocs === 0) {
    const now = new Date()
    const eventsData: never[] = []

    for (const data of eventsData) {
      await payload.create({
        collection: 'events',
        data,
        overrideAccess: true,
      })
    }
  }
}
