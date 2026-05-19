import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order'],
    group: 'Yönetim',
  },
  labels: {
    singular: 'Ekip Üyesi',
    plural: 'Ekip / Yönetim Kurulu',
  },
  fields: [
    {
      name: 'name',
      label: 'Ad Soyad',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Görev / Unvan',
      type: 'text',
      required: true,
    },
    {
      name: 'photo',
      label: 'Fotoğraf',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      label: 'Sosyal Medya Linkleri',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'Platform',
          type: 'select',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'E-posta', value: 'email' },
          ],
        },
        {
          name: 'url',
          label: 'Link / Adres',
          type: 'text',
        },
      ],
    },
    {
      name: 'order',
      label: 'Sıralama',
      type: 'number',
      defaultValue: 99,
      admin: {
        description: 'Küçük sayı daha önce görünür',
      },
    },
  ],
}
