import { test, expect } from '@playwright/test'

test.describe('Genç Yeşilay — Frontend', () => {
  test('anasayfa erişilebilir ve ana CTA görünüyor', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/Genç Yeşilay/i)
    await expect(page.getByRole('link', { name: /gönüllü ol/i }).first()).toBeVisible()
  })

  test('hakkımızda sayfası açılıyor', async ({ page }) => {
    await page.goto('http://localhost:3000/hakkimizda')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/sağlıklı/i)
  })

  test('etkinlikler sayfası açılıyor', async ({ page }) => {
    await page.goto('http://localhost:3000/etkinlikler')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/etkinlikler/i)
  })

  test('giriş sayfası form alanlarını gösteriyor', async ({ page }) => {
    await page.goto('http://localhost:3000/giris')
    await expect(page.getByLabel('E-posta')).toBeVisible()
    await expect(page.getByLabel('Şifre')).toBeVisible()
  })

  test('gönüllü ol sayfası multi-step gösteriyor', async ({ page }) => {
    await page.goto('http://localhost:3000/gonullu-ol')
    await expect(page.getByRole('heading', { name: /aidat transferi/i })).toBeVisible()
  })

  test('robots.txt ve sitemap.xml çalışıyor', async ({ request }) => {
    const r = await request.get('http://localhost:3000/robots.txt')
    expect(r.ok()).toBeTruthy()
    const s = await request.get('http://localhost:3000/sitemap.xml')
    expect(s.ok()).toBeTruthy()
  })
})
