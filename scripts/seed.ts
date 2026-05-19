import 'dotenv/config'
import { getPayloadClient } from '../src/lib/payload'

async function seed() {
  console.log('🌱 Seeding database...')
  const payload = await getPayloadClient()

  // First, find or create admin user
  let adminUserId: number | string | null = null

  try {
    const users = await payload.find({
      collection: 'users',
      where: { role: { equals: 'admin' } },
      limit: 1,
    })

    if (users.totalDocs > 0) {
      adminUserId = users.docs[0].id
      console.log(`✓ Found admin user: ${adminUserId}`)
    } else {
      // Create admin user
      const adminUser = await payload.create({
        collection: 'users',
        data: {
          email: 'admin@gencyesliay.org',
          password: 'ChangeMe123!',
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
      console.log(`✓ Created admin user: ${adminUserId}`)
    }
  } catch (error) {
    console.error('Error with admin user:', error)
    process.exit(1)
  }

  // Check if data already exists
  const existingMotivations = await payload.find({
    collection: 'motivations',
    limit: 1,
  })

  const existingEvents = await payload.find({
    collection: 'events',
    limit: 1,
  })

  if (existingMotivations.totalDocs > 0) {
    console.log('✅ Motivations already exist, skipping...')
  } else {
    console.log('📝 Creating motivations...')

    // Get admin user
    const users = await payload.find({
      collection: 'users',
      where: { role: { equals: 'admin' } },
      limit: 1,
    })

    let adminUserId = 1
    if (users.totalDocs > 0) {
      adminUserId = users.docs[0].id
    }

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
        createdBy: adminUserId,
        publishedAt: new Date().toISOString(),
      },
      {
        content:
          '💚 Genç Yeşilay ile birlikte olmak, toplumun nabzını tutmak ve değişime liderlik etmek demektir. Biz buradayız!',
        status: 'published',
        createdBy: adminUserId,
        publishedAt: new Date().toISOString(),
      },
      {
        content:
          '🚀 Sosyal sorumluluk projelerimiz aracılığıyla gençlerin potansiyelini ortaya çıkarıyoruz. Seni de bekliyoruz!',
        status: 'published',
        createdBy: adminUserId,
        publishedAt: new Date().toISOString(),
      },
      {
        content:
          '❤️ Bir gönüllü bir kahramandır. Yıl boyunca yüzlerce insanın yüzüne tebessüm taşıyoruz.',
        status: 'published',
        createdBy: adminUserId,
        publishedAt: new Date().toISOString(),
      },
      {
        content:
          '🎯 Toplumsal duyarlılık ve gençlik gücü bir araya geldiğinde, harika şeyler gerçekleşir. Biz buna tanık olduk.',
        status: 'published',
        createdBy: adminUserId,
        publishedAt: new Date().toISOString(),
      },
    ]

    for (const data of motivationsData) {
      try {
        await payload.create({
          collection: 'motivations',
          data,
          overrideAccess: true,
        })
        console.log(`  ✓ Created motivation: "${data.content.slice(0, 40)}..."`)
      } catch (error) {
        console.error(`  ✗ Error creating motivation:`, error)
      }
    }
  }

  if (existingEvents.totalDocs > 0) {
    console.log('✅ Events already exist, skipping...')
  } else {
    console.log('📅 Creating events...')

    const makeLexical = (text: string) => ({
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [{ type: 'text', version: 1, text }],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    })

    const now = new Date()
    const eventsData: {
      title: string
      slug: string
      category: 'sosyal' | 'egitim' | 'saglik' | 'kampanya' | 'spor'
      year: number
      date: string
      location: string
      shortDescription: string
      description: ReturnType<typeof makeLexical>
      _status: 'draft' | 'published'
    }[] = [
      {
        title: 'Gönüllü Yönlendirme Toplantısı',
        slug: 'gonullu-yonlendirme-toplantisi',
        category: 'egitim',
        year: now.getFullYear(),
        date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'NÖHÜ Ana Kampüsü',
        shortDescription: 'Yeni gönüllülerimiz için oryantasyon ve eğitim toplantısı.',
        description: makeLexical(
          'Genç Yeşilay ailesine yeni katılacak gönüllülerimiz için tanıtım ve rehberlik toplantısı. Tüm gönüllüler davetlidir.',
        ),
        _status: 'published',
      },
      {
        title: 'Sosyal Sorumluluk Kampı',
        slug: 'sosyal-sorumluluk-kampi',
        category: 'sosyal',
        year: now.getFullYear(),
        date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'İstanbul - Sosyal Tesisler',
        shortDescription: 'İmam Hatip gençliğini bir araya getiren sosyal gelişim kampı.',
        description: makeLexical(
          'Gençlerimizin sosyal sorumluluk bilincini geliştirmek amacıyla düzenlenen hafta sonu kampı. Spor, eğitim ve sosyal aktivitelerden oluşmaktadır.',
        ),
        _status: 'published',
      },
      {
        title: 'Sağlık Taraması Programı',
        slug: 'saglik-taramasi-programi',
        category: 'saglik',
        year: now.getFullYear(),
        date: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Kampüs Tıbbi Merkezi',
        shortDescription: 'Gönüllüler için ücretsiz sağlık taraması hizmetleri.',
        description: makeLexical(
          'Gönüllülerimizin sağlığını kontrol etmek amacıyla düzenlenen taraması programı. Çeşitli branşlardan doktor ve hemşireler bulunacaktır.',
        ),
        _status: 'published',
      },
      {
        title: 'Spor Turnuvası',
        slug: 'spor-turnuvasi',
        category: 'spor',
        year: now.getFullYear(),
        date: new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Spor Salonu',
        shortDescription:
          'Gönüllüler arasında dostluk ve birlik ruhu oluşturmak için futsal turnuvası.',
        description: makeLexical(
          'Gençlerimizin bir araya gelmesi ve dostluk bağlarını güçlendirmesi amacıyla düzenlenen futsal turnuvası. Tüm kulüpler katılabilir.',
        ),
        _status: 'published',
      },
    ]

    for (const data of eventsData) {
      try {
        await payload.create({
          collection: 'events',
          data,
          overrideAccess: true,
        })
        console.log(`  ✓ Created event: "${data.title}"`)
      } catch (error) {
        console.error(`  ✗ Error creating event:`, error)
      }
    }
  }

  console.log('✅ Seeding complete!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error)
  process.exit(1)
})
