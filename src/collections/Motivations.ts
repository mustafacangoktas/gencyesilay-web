import type { CollectionConfig } from 'payload'
import { ownOrAdmin, publicRead } from '../lib/access'

export const Motivations: CollectionConfig = {
  slug: 'motivations',
  admin: {
    useAsTitle: 'preview',
    defaultColumns: ['preview', 'createdBy', 'status', 'publishedAt'],
    group: 'Topluluk Akışı',
  },
  labels: {
    singular: 'Motivasyon',
    plural: 'Motivasyon Akışı',
  },
  access: {
    // Yayında olan paylaşımlar herkese açık; admin/editor hepsini, gönüllü sadece kendininkini.
    read: ({ req }) => {
      const user = req.user as { id: string | number; role?: string } | null
      if (user?.role === 'admin' || user?.role === 'editor') return true
      if (user) {
        return {
          or: [
            { status: { equals: 'published' } },
            { createdBy: { equals: user.id } },
          ],
        } as never
      }
      return { status: { equals: 'published' } }
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => {
      const user = req.user as { role?: string } | null
      return user?.role === 'admin' || user?.role === 'editor'
    },
    delete: ({ req }) => {
      const user = req.user as { role?: string } | null
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'preview',
      type: 'text',
      admin: { hidden: true },
      hooks: {
        beforeChange: [
          ({ data }) => {
            const c = (data?.content as string) || ''
            return c.slice(0, 80)
          },
        ],
      },
    },
    {
      name: 'content',
      label: 'Motivasyon / Fikir İçeriği',
      type: 'textarea',
      required: true,
      maxLength: 1000,
    },
    {
      name: 'createdBy',
      label: 'Gönderen',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      access: {
        update: ({ req }) => (req.user as { role?: string } | null)?.role === 'admin',
      },
      hooks: {
        beforeChange: [
          ({ value, req, operation }) => {
            if (operation === 'create' && !value && req.user) {
              return req.user.id
            }
            return value
          },
        ],
      },
    },
    {
      name: 'status',
      label: 'Onay Durumu / Sansür',
      type: 'select',
      required: true,
      defaultValue: 'in_review',
      options: [
        { label: 'Taslak', value: 'draft' },
        { label: 'İncelemede', value: 'in_review' },
        { label: 'Yayında', value: 'published' },
        { label: 'Reddedildi', value: 'rejected' },
      ],
      access: {
        update: ({ req }) => {
          const user = req.user as { role?: string } | null
          return user?.role === 'admin' || user?.role === 'editor'
        },
      },
    },
    {
      name: 'publishedAt',
      label: 'Yayın Tarihi',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
      hooks: {
        beforeChange: [
          ({ data, value, originalDoc }) => {
            if (data?.status === 'published' && !value && !originalDoc?.publishedAt) {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
  ],
  timestamps: true,
}
