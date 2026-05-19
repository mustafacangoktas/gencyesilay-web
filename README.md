# Genç Yeşilay — Niğde Ömer Halisdemir Üniversitesi (NÖHÜ) Web Sitesi

Bu proje, **Niğde Ömer Halisdemir Üniversitesi Genç Yeşilay Kulübü**'nün resmi web sitesi ve içerik yönetim altyapısını barındırmaktadır. "Sessiz modern" (quiet & clean) tasarım prensipleriyle oluşturulmuş olup, kurumsallığın yanında gönüllülerin kolaylıkla kullanabileceği erişilebilir bir deneyim sunmayı amaçlar.

## 🚀 Teknolojiler ve Mimari

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **İçerik Yönetim Sistemi (CMS):** [Payload CMS v3](https://payloadcms.com/) (Next.js içerisine entegre)
*   **Arayüz & Stil:** [Tailwind CSS](https://tailwindcss.com/) & [Preline UI](https://preline.co/) / Framer Motion
*   **Veritabanı:** SQLite
*   **Dil:** TypeScript
*   **Test:** Vitest (Entegrasyon) & Playwright (E2E)

## 🎨 Tasarım Sistemi (Sessiz Modern Yeşilay)

Projenin tasarımında "Kurumsal" ve "Güven Verici" tonlar tercih edilmiştir:
-   **Yeşilay Renk Paleti:** Logoya ve kültüre sadık `yesilay` tonları öğeleri.
-   **Arka Plan:** Saf beyaz yerine göz yormayan, profesyonel hissettiren açık gri renkleri (`kurumsal` sınıfı).

## 🛠️ Yerel Kurulum & Geliştirme

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin. (Paket yöneticisi olarak **pnpm** önerilir.)

### 1. Depoyu Hazırlayın

```bash
git clone <repo-url>
cd website
```

### 2. Ortam Değişkenlerini (Environment Variables) Ayarlayın

Projenin düzgün çalışabilmesi için `.env` dosyasına ihtiyacınız var.

```bash
cp .env.example .env
```
Gerekiyorsa değerleri güncelleyin. 

### 3. Bağımlılıkları Yükleyin ve Çalıştırın

```bash
pnpm install
pnpm dev
```

Sunucu ayağa kalktığında:
- **Web Sitesi:** [http://localhost:3000](http://localhost:3000)
- **Yönetici Paneli (Payload CMS):** [http://localhost:3000/admin](http://localhost:3000/admin) adresinden erişilebilir.

## 🗃️ Yönetici Paneli

Yönetim paneli üzerinden teknik bilgiye ihtiyaç duymadan veri girişi yapılabilir:
-   **Events:** Etkinlik haberleri ve etkinlik duyuruları eklenebilir.
-   **Team:** Koordinatör vb. ekip listesi
-   **Certificates:** Kulüp üyeleri ve etkinlik katılım belgeleri
-   **Motivations** ve **Feedbacks:** Kullanıcı dönütleri
-   **Media:** Resim ve belgeleriniz.

## 📜 Lisans & Kullanım Hakları

Bu proje **TİCARİ KULLANIMA KAPALIDIR**. Bu deponun veya kodlarının üçüncü şahıslar tarafından kullanılması durumunda repoya referans (atıf) gösterilmesi zorunludur. Detaylar için `LICENSE` dosyasına bakınız.
