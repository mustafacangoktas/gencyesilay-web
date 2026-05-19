import { describe, it, expect } from 'vitest'
import { slugify, formatDate } from '../../src/lib/utils'

describe('utils', () => {
  it('Türkçe karakterli slug üretir', () => {
    expect(slugify('Bahar Şenliği 2026')).toBe('bahar-senligi-2026')
    expect(slugify('Çocuklar İçin Eğlence')).toBe('cocuklar-icin-eglence')
  })

  it('boş input için boş string döner', () => {
    expect(slugify('')).toBe('')
  })

  it('formatDate Türkçe biçim döner', () => {
    const out = formatDate('2026-05-02T10:00:00Z')
    expect(out).toMatch(/2026/)
  })

  it('geçersiz tarihte boş string', () => {
    expect(formatDate('lol')).toBe('')
    expect(formatDate(undefined)).toBe('')
  })
})
