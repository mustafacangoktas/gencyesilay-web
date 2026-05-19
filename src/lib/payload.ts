import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers as nextHeaders } from 'next/headers.js'
import type { User } from '@/payload-types'

export async function getPayloadClient() {
  const cfg = await config
  return getPayload({ config: cfg })
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const payload = await getPayloadClient()
    const headers = await nextHeaders()
    const { user } = await payload.auth({ headers })
    return (user as User) || null
  } catch {
    return null
  }
}
