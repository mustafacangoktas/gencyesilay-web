import type { CollectionConfig } from 'payload'
import { encrypt, decrypt, maskTC } from '../lib/crypto'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['fullName', 'email', 'studentNumber', 'membershipStatus', 'role'],
    group: 'Gönüllüler',
  },
  labels: { singular: 'Gönüllü', plural: 'Gönüllüler' },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7,
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
  },
  access: {
    read: ({ req }) => {
      const user = req.user as { id: string | number; role?: string } | null
      if (!user) return false
      if (user.role === 'admin' || user.role === 'editor') return true
      return { id: { equals: user.id } }
    },
    create: () => true,
    update: ({ req }) => {
      const user = req.user as { id: string | number; role?: string } | null
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    delete: ({ req }) => (req.user as { role?: string } | null)?.role === 'admin',
    admin: ({ req }) => {
      const user = req.user as { role?: string } | null
      return user?.role === 'admin' || user?.role === 'editor'
    },
  },
  fields: [
    { name: 'fullName', label: 'İsim Soyisim', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'department', label: 'Bölüm', type: 'text', required: true },
        { name: 'classYear', label: 'Sınıf', type: 'text', required: true },
      ],
    },
    { name: 'studentNumber', label: 'Öğrenci Numarası', type: 'text', required: true, unique: true, index: true },
    { name: 'phone', label: 'Telefon', type: 'text' },
    {
      name: 'tcKimlik',
      label: 'TC Kimlik No (Şifrelenmiş)',
      type: 'text',
      required: true,
      admin: { description: 'KVKK gereği AES-256 şifrelenmiş şekilde saklanır.' },
      hooks: {
        beforeChange: [
          ({ value, originalDoc }) => {
            if (!value) return originalDoc?.tcKimlik
            if (typeof value === 'string' && /^[0-9a-f]+:[0-9a-f]+$/.test(value)) return value
            return encrypt(String(value).replace(/\D/g, ''))
          },
        ],
        afterRead: [
          ({ value, req }) => {
            if (!value) return value
            const user = req.user as { role?: string } | null
            if (user?.role === 'admin') return decrypt(String(value))
            return maskTC(decrypt(String(value)))
          },
        ],
      },
    },
    {
      name: 'dekont',
      label: 'Dekont Görseli',
      type: 'upload',
      relationTo: 'media',
      // Frontend kayıt formunda zorunlu; admin tarafında esnek (manuel ekleme).
    },
    {
      name: 'membershipStatus',
      label: 'Üyelik Statüsü',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Beklemede', value: 'pending' },
        { label: 'Onaylandı', value: 'approved' },
        { label: 'Reddedildi', value: 'rejected' },
      ],
      access: {
        update: ({ req }) => (req.user as { role?: string } | null)?.role === 'admin',
      },
    },
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      defaultValue: 'candidate',
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Onaylı Gönüllü', value: 'volunteer' },
        { label: 'Aday', value: 'candidate' },
      ],
      access: {
        update: ({ req }) => (req.user as { role?: string } | null)?.role === 'admin',
      },
    },
    { name: 'bio', label: 'Kısa Biyografi', type: 'textarea' },
  ],
}
