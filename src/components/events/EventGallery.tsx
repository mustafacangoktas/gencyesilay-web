'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import Video from 'yet-another-react-lightbox/plugins/video'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import { Play } from 'lucide-react'

export type GalleryMedia = {
  id: number | string
  url: string
  alt?: string
  mimeType?: string | null
  width?: number | null
  height?: number | null
}

type Props = {
  items: GalleryMedia[]
}

function isVideo(m: GalleryMedia): boolean {
  if (m.mimeType?.startsWith('video/')) return true
  return /\.(mp4|webm|mov)$/i.test(m.url)
}

export default function EventGallery({ items }: Props) {
  const [index, setIndex] = useState<number>(-1)

  if (!items.length) return null

  const slides = items.map((m) =>
    isVideo(m)
      ? {
          type: 'video' as const,
          width: m.width || 1280,
          height: m.height || 720,
          sources: [{ src: m.url, type: m.mimeType || 'video/mp4' }],
        }
      : {
          src: m.url,
          alt: m.alt,
          width: m.width || 1600,
          height: m.height || 1600,
        },
  )

  return (
    <>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      >
        {items.map((m, i) => {
          const video = isVideo(m)
          return (
            <motion.button
              key={m.id}
              type="button"
              onClick={() => setIndex(i)}
              variants={{
                hidden: { opacity: 0, scale: 0.93 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 ring-1 ring-kurumsal-border-soft hover:ring-yesilay-400 transition"
              aria-label={video ? 'Videoyu oynat' : 'Görseli büyüt'}
            >
              {video ? (
                <>
                  {/* Posterless mp4 → ilk kareyi gösteren video etiketi */}
                  <video
                    src={m.url}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="h-11 w-11 rounded-full bg-white/90 text-yesilay-700 grid place-items-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={18} fill="currentColor" />
                    </span>
                  </div>
                  <span className="absolute top-2 right-2 text-[10px] font-semibold uppercase tracking-wider bg-black/55 text-white px-1.5 py-0.5 rounded">
                    Video
                  </span>
                </>
              ) : (
                <Image
                  src={m.url}
                  alt={m.alt || ''}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </motion.button>
          )
        })}
      </motion.div>

      <Lightbox
        open={index >= 0}
        index={index < 0 ? 0 : index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Video, Thumbnails, Counter]}
        video={{ autoPlay: true, controls: true, playsInline: true }}
        carousel={{ finite: false }}
        thumbnails={{ position: 'bottom', width: 80, height: 56, border: 0, gap: 8 }}
        styles={{ container: { backgroundColor: 'rgba(8, 14, 11, 0.94)' } }}
      />
    </>
  )
}
