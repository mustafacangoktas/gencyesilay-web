import type { Access } from 'payload'
import type { User } from '@/payload-types'

export const isAdmin: Access = ({ req }) => {
  const user = req.user as User | null
  return user?.role === 'admin'
}

export const isAdminOrEditor: Access = ({ req }) => {
  const user = req.user as User | null
  return user?.role === 'admin' || user?.role === 'editor'
}

export const isAdminFieldLevel = ({ req }: { req: { user?: unknown } }) => {
  const user = req.user as User | null
  return user?.role === 'admin'
}

/** Onaylı gönüllüler veya üst roller. */
export const isApprovedVolunteer: Access = ({ req }) => {
  const user = req.user as User | null
  if (!user) return false
  if (user.role === 'admin' || user.role === 'editor') return true
  return user.role === 'volunteer' && user.membershipStatus === 'approved'
}

/** Bir gönüllü sadece kendi gönderdiklerini görebilir; admin/editor hepsini görür. */
export const ownOrAdmin =
  (field: string = 'createdBy'): Access =>
  ({ req }) => {
    const user = req.user as User | null
    if (!user) return false
    if (user.role === 'admin' || user.role === 'editor') return true
    return { [field]: { equals: user.id } }
  }

export const publicRead: Access = () => true

export const adminOnly: Access = ({ req }) => {
  const user = req.user as User | null
  return user?.role === 'admin'
}
