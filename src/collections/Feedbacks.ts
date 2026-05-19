import type { CollectionConfig } from 'payload'

export const Feedbacks: CollectionConfig = {
  slug: 'feedbacks',
  admin: {
    useAsTitle: 'category',
    defaultColumns: ['category', 'status', 'createdBy', 'createdAt'],
    group: 'Topluluk Akışı',
  },
  labels: {
    singular: 'Geri Bildirim',
    plural: 'Dilek / İstek / Geri Bildirimler',
  },
  access: {
    read: ({ req }) => {
      const user = req.user as { id: string | number; role?: string } | null
      if (!user) return false
      if (user.role === 'admin' || user.role === 'editor') return true
      return { createdBy: { equals: user.id } }
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => {
      const user = req.user as { role?: string } | null
      return user?.role === 'admin' || user?.role === 'editor'
    },
    delete: ({ req }) => (req.user as { role?: string } | null)?.role === 'admin',
  },
  fields: [
    {
      name: 'category',
      label: 'Kategori',
      type: 'select',
      required: true,
      options: [
        { label: 'Kulüp İsteği', value: 'kulup_istegi' },
        { label: 'Etkinlik İsteği', value: 'etkinlik_istegi' },
        { label: 'Öneri / Talep', value: 'oneri' },
        { label: 'Eleştiri', value: 'elestiri' },
        { label: 'Alternatif Fikir', value: 'fikir' },
      ],
    },
    {
      name: 'content',
      label: 'İçerik Detayı',
      type: 'richText',
      required: true,
    },
    {
      name: 'isAnonymous',
      label: 'Anonim Gönder',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'createdBy',
      label: 'Gönderen',
      type: 'relationship',
      relationTo: 'users',
      hooks: {
        beforeChange: [
          ({ value, req, operation }) => {
            if (operation === 'create' && !value && req.user) return req.user.id
            return value
          },
        ],
      },
    },
    {
      name: 'status',
      label: 'Durum',
      type: 'select',
      required: true,
      defaultValue: 'unread',
      options: [
        { label: 'Okunmadı', value: 'unread' },
        { label: 'İşleme Alındı', value: 'in_progress' },
        { label: 'Çözüldü', value: 'resolved' },
      ],
      access: {
        update: ({ req }) => {
          const user = req.user as { role?: string } | null
          return user?.role === 'admin' || user?.role === 'editor'
        },
      },
    },
    {
      name: 'adminNote',
      label: 'Yönetici Notu',
      type: 'textarea',
      access: {
        read: ({ req }) => {
          const user = req.user as { role?: string } | null
          return user?.role === 'admin' || user?.role === 'editor'
        },
        update: ({ req }) => {
          const user = req.user as { role?: string } | null
          return user?.role === 'admin' || user?.role === 'editor'
        },
      },
    },
  ],
  timestamps: true,
}
