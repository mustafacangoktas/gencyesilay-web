import crypto from 'crypto'

/**
 * KVKK uyumlu simetrik şifreleme: AES-256-CBC
 * TC kimlik numaraları gibi hassas verileri DB'de düz metin tutmamak için.
 *
 * KEY: 32-byte (256-bit) anahtar — base64 yada hex olarak ENCRYPTION_KEY env'de olmalı.
 */

const ALGO = 'aes-256-cbc'
const IV_LENGTH = 16

function getKey(): Buffer {
  const raw = process.env.ENCRYPTION_KEY
  if (!raw) {
    // Dev fallback — production'da hata fırlatır.
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ENCRYPTION_KEY env değişkeni ayarlanmamış (KVKK ihlali!)')
    }
    return crypto.createHash('sha256').update('dev-only-fallback-key-do-not-use').digest()
  }

  // hex (64 char) yada base64 destekli; ham karakter de olabilir → sha256 ile 32 byte'a indiriyoruz.
  if (/^[0-9a-f]{64}$/i.test(raw)) return Buffer.from(raw, 'hex')
  if (raw.length === 44 && /=$/.test(raw)) return Buffer.from(raw, 'base64')
  return crypto.createHash('sha256').update(raw).digest()
}

export function encrypt(plain: string): string {
  if (!plain) return ''
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGO, getKey(), iv)
  const enc = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  return `${iv.toString('hex')}:${enc.toString('hex')}`
}

export function decrypt(payload: string): string {
  if (!payload || !payload.includes(':')) return payload
  const [ivHex, encHex] = payload.split(':')
  try {
    const decipher = crypto.createDecipheriv(ALGO, getKey(), Buffer.from(ivHex, 'hex'))
    const dec = Buffer.concat([decipher.update(Buffer.from(encHex, 'hex')), decipher.final()])
    return dec.toString('utf8')
  } catch {
    return ''
  }
}

/**
 * "12345678901" → "123******01" gibi maskeli görünüm.
 */
export function maskTC(tc: string): string {
  if (!tc || tc.length < 5) return '***'
  return `${tc.slice(0, 3)}******${tc.slice(-2)}`
}
