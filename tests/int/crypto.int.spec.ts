import { describe, it, expect } from 'vitest'
import { encrypt, decrypt, maskTC } from '../../src/lib/crypto'

describe('crypto / KVKK', () => {
  it('AES-256 şifrele ve çöz', () => {
    const plain = '12345678901'
    const enc = encrypt(plain)
    expect(enc).not.toBe(plain)
    expect(enc).toMatch(/^[0-9a-f]+:[0-9a-f]+$/)
    expect(decrypt(enc)).toBe(plain)
  })

  it('boş değer hata fırlatmaz', () => {
    expect(encrypt('')).toBe('')
    expect(decrypt('')).toBe('')
  })

  it('TC maskeleme', () => {
    expect(maskTC('12345678901')).toBe('123******01')
    expect(maskTC('')).toBe('***')
  })

  it('aynı plaintext farklı IV ile farklı ciphertext üretir', () => {
    const a = encrypt('test123')
    const b = encrypt('test123')
    expect(a).not.toBe(b)
    expect(decrypt(a)).toBe('test123')
    expect(decrypt(b)).toBe('test123')
  })
})
