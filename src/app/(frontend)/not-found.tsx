import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container-app py-32 text-center">
      <p className="text-yesilay-700 font-medium">404</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-bold">Sayfa bulunamadı</h1>
      <p className="mt-4 text-kurumsal-text max-w-md mx-auto">
        Aradığınız sayfa taşınmış, kaldırılmış ya da hiç var olmamış olabilir.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">Anasayfaya Dön</Link>
        <Link href="/etkinlikler" className="btn-outline">Etkinliklere Bak</Link>
      </div>
    </section>
  )
}
