import type { CollectionConfig } from 'payload'
import { slugify } from '../lib/utils'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'date', 'location', '_status'],
    group: 'İçerik',
  },
  labels: { singular: 'Etkinlik', plural: 'Etkinlikler' },
  versions: { drafts: true },
  access: {
    read: () => true,
    create: ({ req }) => {
      const role = (req.user as { role?: string } | null)?.role
      return role === 'admin' || role === 'editor'
    },
    update: ({ req }) => {
      const role = (req.user as { role?: string } | null)?.role
      return role === 'admin' || role === 'editor'
    },
    delete: ({ req }) => (req.user as { role?: string } | null)?.role === 'admin',
  },
  fields: [
    { name: 'title', label: 'Başlık', type: 'text', required: true },
    {
      name: 'slug',
      label: 'URL Kısa Adı',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          label: 'Kategori',
          type: 'select',
          required: true,
          defaultValue: 'sosyal',
          options: [
            { label: 'Sosyal', value: 'sosyal' },
            { label: 'Eğitim', value: 'egitim' },
            { label: 'Sağlık', value: 'saglik' },
            { label: 'Kampanya', value: 'kampanya' },
            { label: 'Spor', value: 'spor' },
          ],
        },
        {
          name: 'year',
          label: 'Yıl',
          type: 'number',
          required: true,
          defaultValue: () => new Date().getFullYear(),
        },
      ],
    },
    { name: 'description', label: 'Açıklama', type: 'richText' },
    {
      name: 'shortDescription',
      label: 'Kısa Özet',
      type: 'textarea',
      maxLength: 200,
      admin: { description: 'Liste sayfalarında ve SEO için.' },
    },
    {
      name: 'date',
      label: 'Etkinlik Tarihi',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd/MM/yyyy HH:mm' } },
    },
    { name: 'location', label: 'Konum', type: 'text' },
    { name: 'mapEmbedUrl', label: 'Harita Embed URL', type: 'text' },
    { name: 'coverImage', label: 'Kapak Fotoğrafı', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      label: 'Galeri',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.title && !data.slug) {
          data.slug = slugify(String(data.title))
        }
        return data
      },
    ],
  },
}
