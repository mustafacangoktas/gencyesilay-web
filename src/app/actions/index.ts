'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { getPayloadClient, getCurrentUser } from '@/lib/payload'

const motivationSchema = z.object({
  content: z.string().min(20, 'En az 20 karakter olmalı.').max(1000, 'En fazla 1000 karakter.'),
})

export async function submitMotivation(
  _prev: { ok: boolean; error?: string } | null,
  formData: FormData,
) {
  const parsed = motivationSchema.safeParse({ content: formData.get('content') })
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message }
  }

  const payload = await getPayloadClient()
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: 'Önce giriş yapmalısınız.' }

  // Onaylı gönüllü değilse engelle
  const u = user as { membershipStatus?: string; role?: string; id: string | number }
  if (u.role !== 'admin' && u.role !== 'editor' && u.membershipStatus !== 'approved') {
    return { ok: false, error: 'Sadece onaylı gönüllüler motivasyon paylaşabilir.' }
  }

  await payload.create({
    collection: 'motivations',
    data: {
      content: parsed.data.content,
      status: 'in_review',
      createdBy: u.id as never,
    },
  })

  revalidatePath('/profil/motivasyon')
  revalidatePath('/')
  return { ok: true }
}

const feedbackSchema = z.object({
  category: z.enum(['kulup_istegi', 'etkinlik_istegi', 'oneri', 'elestiri', 'fikir']),
  content: z.string().min(20, 'En az 20 karakter olmalı.').max(4000),
  isAnonymous: z.boolean().optional(),
})

export async function submitFeedback(
  _prev: { ok: boolean; error?: string } | null,
  formData: FormData,
) {
  const parsed = feedbackSchema.safeParse({
    category: formData.get('category'),
    content: formData.get('content'),
    isAnonymous: formData.get('isAnonymous') === 'on',
  })
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message }

  const payload = await getPayloadClient()
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: 'Önce giriş yapmalısınız.' }

  const u = user as { id: string | number }

  await payload.create({
    collection: 'feedbacks',
    data: {
      category: parsed.data.category,
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [{ type: 'text', text: parsed.data.content, version: 1 }],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      isAnonymous: parsed.data.isAnonymous || false,
      createdBy: u.id,
    } as never,
  })

  revalidatePath('/profil/geri-bildirim')
  return { ok: true }
}

const registerSchema = z.object({
  fullName: z.string().min(3, 'Ad soyad zorunlu.'),
  email: z.string().email('Geçersiz e-posta.'),
  password: z.string().min(8, 'Şifre en az 8 karakter olmalı.'),
  department: z.string().min(2),
  classYear: z.string().min(1),
  studentNumber: z.string().min(3),
  tcKimlik: z.string().regex(/^\d{11}$/, 'TC Kimlik 11 haneli olmalı.'),
  phone: z.string().optional(),
})

export type RegisterState = { ok: boolean; error?: string }

export async function registerVolunteer(
  _prev: RegisterState | null,
  formData: FormData,
): Promise<RegisterState> {
  const data = Object.fromEntries(formData.entries())
  const parsed = registerSchema.safeParse(data)
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message }

  const dekontFile = formData.get('dekontFile')
  if (!(dekontFile instanceof File) || dekontFile.size === 0) {
    return { ok: false, error: 'Dekont dosyası gerekli.' }
  }

  const payload = await getPayloadClient()

  // Check for duplicate email before saving anything
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: parsed.data.email } },
    limit: 1,
  })
  if (existing.totalDocs > 0) {
    return { ok: false, error: 'Bu e-posta adresi zaten kayıtlı.' }
  }

  // Upload dekont server-side (no client auth needed)
  let dekontId: string | number
  try {
    const fileBuffer = Buffer.from(await dekontFile.arrayBuffer())
    const mediaDoc = await payload.create({
      collection: 'media',
      data: { alt: `Dekont — ${parsed.data.fullName}` },
      file: {
        data: fileBuffer,
        mimetype: dekontFile.type || 'application/octet-stream',
        name: dekontFile.name,
        size: dekontFile.size,
      },
      overrideAccess: true,
    })
    dekontId = mediaDoc.id
  } catch (err) {
    return { ok: false, error: 'Dekont yüklenemedi, lütfen tekrar deneyin.' }
  }

  try {
    await payload.create({
      collection: 'users',
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        password: parsed.data.password,
        department: parsed.data.department,
        classYear: parsed.data.classYear,
        studentNumber: parsed.data.studentNumber,
        tcKimlik: parsed.data.tcKimlik,
        phone: parsed.data.phone || undefined,
        dekont: dekontId as never,
        membershipStatus: 'pending',
        role: 'candidate',
      },
    })
  } catch (err) {
    // Clean up uploaded media if user creation fails
    await payload.delete({ collection: 'media', id: dekontId }).catch(() => {})
    const message = err instanceof Error ? err.message : 'Kayıt başarısız.'
    return { ok: false, error: message }
  }

  redirect('/giris?registered=1')
}

// -------- Hesap Ayarları --------

const profileSchema = z.object({
  fullName: z.string().min(3, 'Ad soyad zorunlu.'),
  phone: z.string().optional().or(z.literal('')),
  bio: z.string().max(500, 'Biyografi en fazla 500 karakter.').optional().or(z.literal('')),
})

export async function updateProfile(
  _prev: { ok: boolean; error?: string } | null,
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const parsed = profileSchema.safeParse({
    fullName: formData.get('fullName'),
    phone: formData.get('phone'),
    bio: formData.get('bio'),
  })
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message }

  const payload = await getPayloadClient()
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: 'Önce giriş yapmalısınız.' }
  const u = user as { id: string | number }

  try {
    await payload.update({
      collection: 'users',
      id: u.id,
      data: {
        fullName: parsed.data.fullName,
        phone: parsed.data.phone || undefined,
        bio: parsed.data.bio || undefined,
      },
      overrideAccess: false,
      user,
    })
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Güncelleme başarısız.' }
  }

  revalidatePath('/profil')
  revalidatePath('/profil/ayarlar')
  return { ok: true }
}

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Mevcut şifre gerekli.'),
    newPassword: z
      .string()
      .min(8, 'Yeni şifre en az 8 karakter olmalı.')
      .max(128, 'Şifre çok uzun.'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Yeni şifreler uyuşmuyor.',
    path: ['confirmPassword'],
  })

export async function changePassword(
  _prev: { ok: boolean; error?: string } | null,
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const parsed = passwordSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
    confirmPassword: formData.get('confirmPassword'),
  })
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message }

  const payload = await getPayloadClient()
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: 'Önce giriş yapmalısınız.' }
  const u = user as { id: string | number; email: string }

  // Mevcut şifreyi doğrula
  try {
    const result = await payload.login({
      collection: 'users',
      data: { email: u.email, password: parsed.data.currentPassword },
    })
    if (!result?.user) {
      return { ok: false, error: 'Mevcut şifre hatalı.' }
    }
  } catch {
    return { ok: false, error: 'Mevcut şifre hatalı.' }
  }

  try {
    await payload.update({
      collection: 'users',
      id: u.id,
      data: { password: parsed.data.newPassword },
      overrideAccess: false,
      user,
    })
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Şifre güncellenemedi.',
    }
  }

  return { ok: true }
}
