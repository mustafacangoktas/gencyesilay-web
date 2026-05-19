import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    group: 'İçerik',
  },
  labels: {
    singular: 'Haber / Blog',
    plural: 'Haberler / Blog',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      label: 'Başlık',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL Kısa Adı',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      label: 'Kategori',
      type: 'select',
      required: true,
      options: [
        { label: 'Haber', value: 'haber' },
        { label: 'Duyuru', value: 'duyuru' },
        { label: 'Etkinlik Haberi', value: 'etkinlik' },
        { label: 'Blog', value: 'blog' },
      ],
    },
    {
      name: 'coverImage',
      label: 'Kapak Görseli',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'excerpt',
      label: 'Özet',
      type: 'textarea',
      admin: {
        description: 'Liste sayfalarında gösterilecek kısa özet (maks. 160 karakter)',
      },
    },
    {
      name: 'content',
      label: 'İçerik',
      type: 'richText',
    },
    {
      name: 'author',
      label: 'Yazar',
      type: 'text',
    },
    {
      name: 'publishedAt',
      label: 'Yayın Tarihi',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
  ],
}
