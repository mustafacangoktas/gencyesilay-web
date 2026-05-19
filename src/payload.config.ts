import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Events } from './collections/Events'
import { Posts } from './collections/Posts'
import { Certificates } from './collections/Certificates'
import { Team } from './collections/Team'
import { Motivations } from './collections/Motivations'
import { Feedbacks } from './collections/Feedbacks'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Genç Yeşilay NÖHÜ',
      description: 'Genç Yeşilay NÖHÜ — Dijital Hareket Merkezi Yönetim Paneli',
    },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media, Events, Motivations, Feedbacks, Posts, Certificates, Team],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URL || '' } }),
  sharp,
  plugins: [],
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'].filter(Boolean),
})
