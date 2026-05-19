import type { CollectionConfig } from 'payload'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  admin: {
    useAsTitle: 'participantName',
    defaultColumns: ['participantName', 'event', 'issuedAt', 'certificateNo'],
    group: 'Sertifikalar',
  },
  labels: {
    singular: 'Sertifika',
    plural: 'Sertifikalar',
  },
  fields: [
    {
      name: 'participantName',
      label: 'Katılımcı Adı Soyadı',
      type: 'text',
      required: true,
    },
    {
      name: 'event',
      label: 'Etkinlik',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
    {
      name: 'certificateNo',
      label: 'Sertifika No',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Otomatik oluşturulur',
      },
    },
    {
      name: 'issuedAt',
      label: 'Verilme Tarihi',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'pdfUrl',
      label: 'PDF Linki',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Sertifika oluşturulduğunda otomatik doldurulur',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Yeni kayıt oluşturulurken otomatik sertifika numarası ata
        if (operation === 'create' && !data.certificateNo) {
          const year = new Date().getFullYear()
          const random = Math.floor(Math.random() * 90000) + 10000
          data.certificateNo = `NOHU-GY-${year}-${random}`
        }
        return data
      },
    ],
  },
}
