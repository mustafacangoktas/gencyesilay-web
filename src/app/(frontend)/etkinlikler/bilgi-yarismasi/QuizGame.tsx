'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Sparkles, ArrowLeft, RotateCcw, Zap, Trophy, Flame, Brain, Shuffle } from 'lucide-react'

type Choice = string
type Question = {
  id: string
  category: string
  difficulty: 'kolay' | 'orta' | 'zor' | string
  prompt: string
  choices: Choice[]
  answerIndex: number
  explanation?: string
}
type QuizData = {
  meta: { title: string; subtitle: string; version?: number }
  praise: string[]
  roast: string[]
  questions: Question[]
}

type Phase = 'idle' | 'rolling' | 'asking' | 'correct' | 'wrong'

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

/* ----------------------------- Particle field ----------------------------- */
function ParticleField({ intensity = 1 }: { intensity?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // multi-colour palette: emerald, cyan, violet, fuchsia, amber
    const HUES = [155, 162, 192, 198, 262, 296, 305, 42, 48]

    const count = Math.floor(165 * intensity)
    type P = {
      x: number
      y: number
      vx: number
      vy: number
      r: number
      a: number
      hue: number
      pulse: number
      pulseSpeed: number
    }
    const ps: P[] = Array.from({ length: count }, () => ({
      x: Math.random() * (w || 1200),
      y: Math.random() * (h || 800),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2.2 + 0.5,
      a: Math.random() * 0.55 + 0.2,
      hue: HUES[Math.floor(Math.random() * HUES.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.012 + Math.random() * 0.02,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i]
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed
        const displayA = p.a * (0.65 + 0.35 * Math.sin(p.pulse))

        if (p.x < -12) p.x = w + 12
        if (p.x > w + 12) p.x = -12
        if (p.y < -12) p.y = h + 12
        if (p.y > h + 12) p.y = -12

        // connections
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d2 = dx * dx + dy * dy
          if (d2 < 145 * 145) {
            const dist = Math.sqrt(d2)
            const a = (1 - dist / 145) * 0.22
            ctx.strokeStyle = `hsla(${p.hue}, 75%, 72%, ${a})`
            ctx.lineWidth = 0.75
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }

        // glow halo
        const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        gr.addColorStop(0, `hsla(${p.hue}, 95%, 78%, ${displayA * 0.6})`)
        gr.addColorStop(1, `hsla(${p.hue}, 95%, 78%, 0)`)
        ctx.fillStyle = gr
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()

        // core dot
        ctx.fillStyle = `hsla(${p.hue}, 95%, 88%, ${displayA})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [intensity, reduced])

  return (
    <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />
  )
}

/* ------------------------------ Confetti burst ----------------------------- */
function ConfettiBurst({ trigger }: { trigger: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (!trigger) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const w = canvas.clientWidth
    const h = canvas.clientHeight

    type C = {
      x: number
      y: number
      vx: number
      vy: number
      g: number
      r: number
      rot: number
      vr: number
      color: string
      life: number
    }
    const colors = ['#10B981', '#34D399', '#FBBF24', '#F472B6', '#60A5FA', '#A78BFA', '#FFFFFF']
    const N = 180
    const cx = w / 2
    const cy = h * 0.42
    const parts: C[] = Array.from({ length: N }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 4 + Math.random() * 9
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        g: 0.18,
        r: 4 + Math.random() * 5,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
      }
    })

    let raf = 0
    const start = performance.now()
    const draw = (t: number) => {
      const elapsed = t - start
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        p.vy += p.g
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr
        p.life = Math.max(0, 1 - elapsed / 2500)
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r)
        ctx.restore()
      }
      if (elapsed < 2600) raf = requestAnimationFrame(draw)
      else ctx.clearRect(0, 0, w, h)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [trigger, reduced])

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 w-full h-full pointer-events-none z-[60]"
      aria-hidden
    />
  )
}

/* ------------------------------ Shooting stars ---------------------------- */
function ShootingStars() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const HUES = [155, 195, 300, 42]
    type Star = {
      x: number
      y: number
      len: number
      speed: number
      a: number
      angle: number
      hue: number
      active: boolean
      timer: number
    }
    const stars: Star[] = Array.from({ length: 8 }, () => ({
      x: 0,
      y: 0,
      len: 0,
      speed: 0,
      a: 0,
      angle: 0,
      hue: 0,
      active: false,
      timer: 0,
    }))

    const spawn = (s: Star) => {
      s.x = Math.random() * (w || 1200)
      s.y = Math.random() * (h || 800) * 0.6
      s.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.6
      s.speed = 8 + Math.random() * 12
      s.len = 90 + Math.random() * 130
      s.hue = HUES[Math.floor(Math.random() * HUES.length)]
      s.a = 0.9
      s.active = true
      s.timer = 0
    }

    let lastSpawn = -9999

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)

      if (t - lastSpawn > 1600 + Math.random() * 800) {
        const idle = stars.find((s) => !s.active)
        if (idle) {
          spawn(idle)
          lastSpawn = t
        }
      }

      for (const s of stars) {
        if (!s.active) continue
        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
        s.timer += 1
        s.a = Math.max(0, 0.9 - s.timer / 55)
        if (s.a <= 0 || s.x > w + 150 || s.y > h + 150) {
          s.active = false
          continue
        }

        const tailX = s.x - Math.cos(s.angle) * s.len
        const tailY = s.y - Math.sin(s.angle) * s.len
        const grd = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        grd.addColorStop(0, `hsla(${s.hue}, 90%, 80%, 0)`)
        grd.addColorStop(0.7, `hsla(${s.hue}, 90%, 85%, ${s.a * 0.4})`)
        grd.addColorStop(1, `hsla(${s.hue}, 90%, 95%, ${s.a})`)
        ctx.strokeStyle = grd
        ctx.lineWidth = 1.8
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(s.x, s.y)
        ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  return (
    <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />
  )
}

/* ------------------------------- Pulse rings ------------------------------ */
function PulseRing({ trigger, correct }: { trigger: number; correct: boolean }) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (!trigger) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = canvas.clientWidth * dpr
    canvas.height = canvas.clientHeight * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    const cx = w / 2
    const cy = h * 0.42

    const hue = correct ? 155 : 0
    const maxR = Math.min(w, h) * 0.75
    let raf = 0
    const born = performance.now()
    const rings = Array.from({ length: 6 }, (_, i) => i * 160)

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const elapsed = t - born
      let anyActive = false
      for (const delay of rings) {
        const age = elapsed - delay
        if (age < 0) continue
        const r = (age / 1400) * maxR
        const a = Math.max(0, 1 - r / maxR) * 0.55
        if (a > 0) {
          ctx.strokeStyle = `hsla(${hue}, 80%, 65%, ${a})`
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(cx, cy, r, 0, Math.PI * 2)
          ctx.stroke()
          anyActive = true
        }
      }
      if (anyActive || elapsed < rings[rings.length - 1] + 100) raf = requestAnimationFrame(draw)
      else ctx.clearRect(0, 0, w, h)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [trigger, correct, reduced])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
      aria-hidden
    />
  )
}

/* --------------------------------- Helpers -------------------------------- */
const difficultyMeta: Record<string, { label: string; color: string; dot: string }> = {
  kolay: { label: 'Kolay', color: 'from-emerald-400 to-teal-400', dot: 'bg-emerald-400' },
  orta: { label: 'Orta', color: 'from-amber-400 to-orange-400', dot: 'bg-amber-400' },
  zor: { label: 'Zor', color: 'from-fuchsia-500 to-rose-500', dot: 'bg-rose-400' },
}

function shuffle<T>(arr: T[]) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* ---------------------------------- Main ---------------------------------- */
export default function QuizGame({ data }: { data: QuizData }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [current, setCurrent] = useState<Question | null>(null)
  const [order, setOrder] = useState<number[]>([])
  const [picked, setPicked] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<string>('')
  const [score, setScore] = useState({ correct: 0, total: 0, streak: 0, best: 0 })
  const [confettiTick, setConfettiTick] = useState(0)
  const [rollTick, setRollTick] = useState(0)
  const [pulseTick, setPulseTick] = useState(0)
  const reduced = useReducedMotion()
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const askedSet = useRef<Set<string>>(new Set())

  // Get a random un-asked question
  const nextQuestion = useCallback(() => {
    setPhase('rolling')
    setPicked(null)
    setFeedback('')
    setRollTick((v) => v + 1)

    // shuffle category names visually for the spinner
    const cats = shuffle(data.questions.map((q) => q.category))
    setOrder(cats.slice(0, 18).map((_, i) => i))

    const remaining = data.questions.filter((q) => !askedSet.current.has(q.id))
    const pool = remaining.length ? remaining : data.questions
    if (!remaining.length) askedSet.current.clear()
    const next = pick(pool)
    askedSet.current.add(next.id)

    const delay = reduced ? 250 : 1500
    window.setTimeout(() => {
      setCurrent(next)
      setPhase('asking')
    }, delay)
  }, [data.questions, reduced])

  const answer = useCallback(
    (idx: number) => {
      if (!current || phase !== 'asking') return
      setPicked(idx)
      const isCorrect = idx === current.answerIndex
      setScore((s) => {
        const streak = isCorrect ? s.streak + 1 : 0
        return {
          correct: s.correct + (isCorrect ? 1 : 0),
          total: s.total + 1,
          streak,
          best: Math.max(s.best, streak),
        }
      })
      if (isCorrect) {
        setFeedback(pick(data.praise))
        setPhase('correct')
        setConfettiTick((v) => v + 1)
        setPulseTick((v) => v + 1)
      } else {
        setFeedback(pick(data.roast))
        setPhase('wrong')
        setPulseTick((v) => v + 1)
        // shake
        const el = wrapperRef.current
        if (el && !reduced) {
          el.animate(
            [
              { transform: 'translateX(0)' },
              { transform: 'translateX(-12px)' },
              { transform: 'translateX(10px)' },
              { transform: 'translateX(-8px)' },
              { transform: 'translateX(6px)' },
              { transform: 'translateX(0)' },
            ],
            { duration: 460, easing: 'ease-out' },
          )
        }
      }
    },
    [current, phase, data.praise, data.roast, reduced],
  )

  const reset = () => {
    askedSet.current.clear()
    setScore({ correct: 0, total: 0, streak: 0, best: 0 })
    setCurrent(null)
    setPhase('idle')
    setPicked(null)
    setFeedback('')
  }

  const diff = current ? (difficultyMeta[current.difficulty] ?? difficultyMeta.orta) : null

  /* Keyboard shortcuts: 1-4 to answer, Space/Enter to draw next */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase === 'asking' && current) {
        const n = Number(e.key)
        if (n >= 1 && n <= current.choices.length) answer(n - 1)
      } else if (phase === 'idle' || phase === 'correct' || phase === 'wrong') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          nextQuestion()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, current, answer, nextQuestion])

  const accuracy = score.total ? Math.round((score.correct / score.total) * 100) : 0

  return (
    <div
      ref={wrapperRef}
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        backgroundImage:
          'radial-gradient(1200px 600px at 10% -10%, rgba(16,185,129,0.25), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(56,189,248,0.18), transparent 60%), radial-gradient(700px 400px at 50% 110%, rgba(168,85,247,0.22), transparent 60%), linear-gradient(180deg, #050816 0%, #0a0f24 50%, #060713 100%)',
      }}
    >
      <style>
        {`
             h2 {
             color: white !important;
                }
                `}
      </style>
      <ConfettiBurst trigger={confettiTick} />
      <ParticleField intensity={phase === 'rolling' ? 1.8 : 1} />
      <ShootingStars />
      <PulseRing trigger={pulseTick} correct={phase === 'correct'} />

      {/* Aurora blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.55), transparent 60%)' }}
        animate={
          reduced ? undefined : { x: [0, 70, -20, 0], y: [0, 30, -10, 0], scale: [1, 1.1, 0.95, 1] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -right-32 h-[560px] w-[560px] rounded-full blur-[150px]"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.48), transparent 60%)' }}
        animate={
          reduced ? undefined : { x: [0, -40, 30, 0], y: [0, -50, 20, 0], scale: [1, 0.9, 1.1, 1] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/2 -translate-y-1/2 -left-20 h-[400px] w-[400px] rounded-full blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.38), transparent 60%)' }}
        animate={
          reduced
            ? undefined
            : { x: [0, 40, -10, 0], y: [0, -30, 40, 0], scale: [1, 1.12, 0.92, 1] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/3 right-1/4 h-[340px] w-[340px] rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.28), transparent 60%)' }}
        animate={
          reduced ? undefined : { x: [0, -30, 20, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.08, 1] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-1/4 left-1/3 h-[300px] w-[300px] rounded-full blur-[95px]"
        style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.28), transparent 60%)' }}
        animate={
          reduced
            ? undefined
            : { x: [0, 20, -35, 0], y: [0, -25, 15, 0], scale: [1, 1.05, 0.93, 1] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top bar */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-6 sm:pt-8 flex items-center justify-between gap-3">
        <Link
          href="/etkinlikler"
          className="inline-flex items-center gap-2 px-3.5 h-10 rounded-full bg-white/8 hover:bg-white/14 border border-white/15 text-[12px] sm:text-[13px] font-medium backdrop-blur transition"
        >
          <ArrowLeft size={14} /> Etkinlikler
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 h-10 rounded-full bg-white/8 border border-white/15 backdrop-blur text-[12px]">
            <Trophy size={13} className="text-amber-300" />
            <span className="font-semibold text-white">{score.correct}</span>
            <span className="text-white/55">/ {score.total}</span>
            <span className="text-white/40 mx-1">·</span>
            <span className="text-white/70">{accuracy}%</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 h-10 rounded-full bg-white/8 border border-white/15 backdrop-blur text-[12px]">
            <Flame size={13} className="text-orange-300" />
            <span className="font-semibold">{score.streak}</span>
            <span className="text-white/40">·</span>
            <span className="text-white/60">en iyi {score.best}</span>
          </div>
          <button
            onClick={reset}
            title="Sıfırla"
            className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/8 hover:bg-white/14 border border-white/15 backdrop-blur transition"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Hero header */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-[11px] uppercase tracking-[0.18em] font-semibold"
        >
          <Sparkles size={12} className="text-emerald-300" /> Genç Yeşilay · Bilgi Yarışması
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mt-5 font-serif text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-cyan-200 to-fuchsia-300">
            {data.meta.title}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 text-sm sm:text-base text-white/70 max-w-2xl mx-auto"
        >
          {data.meta.subtitle}
        </motion.p>
      </div>

      {/* Stage */}
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 mt-10 sm:mt-14 pb-24">
        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative rounded-[32px] bg-white/8 border border-white/15 backdrop-blur-xl p-8 sm:p-12 text-center overflow-hidden">
                <motion.div
                  aria-hidden
                  className="absolute inset-0 -z-0"
                  style={{
                    background:
                      'conic-gradient(from 0deg, rgba(16,185,129,0.18), rgba(168,85,247,0.18), rgba(56,189,248,0.18), rgba(16,185,129,0.18))',
                  }}
                  animate={reduced ? undefined : { rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                />
                <div className="relative">
                  <Brain size={42} className="mx-auto text-emerald-300" />
                  <h2 className="font-serif text-2xl sm:text-3xl mt-4 font-semibold">
                    Hazır mısın? 🍀
                  </h2>
                  <p className="text-white/70 mt-2 max-w-md mx-auto text-sm sm:text-base">
                    Aşağıdan rastgele bir soru çek. Bilirsen efektler patlar, bilemezsen… eh, tatlı
                    bir laf yersin.
                  </p>
                  <button
                    onClick={nextQuestion}
                    className="group mt-7 inline-flex items-center gap-2.5 h-14 px-8 rounded-full text-base font-semibold text-white bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_12px_40px_-10px_rgba(16,185,129,0.8)]"
                  >
                    <Shuffle size={18} />
                    Rastgele Soru
                    <Zap
                      size={16}
                      className="text-white/80 group-hover:rotate-12 transition-transform"
                    />
                  </button>
                  <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-white/40">
                    Klavye: <kbd className="text-white/70">Enter</kbd> ile soru çek ·{' '}
                    <kbd className="text-white/70">1-4</kbd> ile cevapla
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'rolling' && (
            <motion.div
              key={`rolling-${rollTick}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-[32px] bg-white/8 border border-white/15 backdrop-blur-xl p-8 text-center overflow-hidden"
            >
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                Soru seçiliyor…
              </div>
              <div className="relative h-16 mt-5 overflow-hidden">
                <motion.div
                  className="absolute inset-0 flex flex-col items-center"
                  initial={{ y: 0 }}
                  animate={{ y: -16 * 60 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {order.map((i) => (
                    <div
                      key={i}
                      className="h-16 grid place-items-center text-xl sm:text-2xl font-serif font-semibold bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 to-cyan-200"
                    >
                      {data.questions[i % data.questions.length]?.category ?? '—'}
                    </div>
                  ))}
                </motion.div>
              </div>
              <div className="mt-4 text-[12px] text-white/50">tamburaaa 🥁</div>
            </motion.div>
          )}

          {(phase === 'asking' || phase === 'correct' || phase === 'wrong') && current && (
            <motion.div
              key={current.id + phase}
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative rounded-[32px] bg-white/8 border border-white/15 backdrop-blur-xl p-7 sm:p-10 overflow-hidden">
                {/* Difficulty + category */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/70">
                    <span className={`h-2 w-2 rounded-full ${diff?.dot}`} />
                    {diff?.label}
                  </div>
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.14em] font-bold text-white bg-gradient-to-r ${diff?.color} shadow-sm`}
                  >
                    {current.category}
                  </div>
                </div>

                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.5 }}
                  className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold leading-snug"
                >
                  {current.prompt}
                </motion.h2>

                <div className="mt-7 grid sm:grid-cols-2 gap-3">
                  {current.choices.map((c, i) => {
                    const isAnswer = i === current.answerIndex
                    const isPicked = picked === i
                    const revealed = phase === 'correct' || phase === 'wrong'
                    let cls =
                      'group relative text-left px-4 py-4 rounded-2xl border bg-white/5 border-white/15 hover:bg-white/12 hover:border-white/25 transition'
                    if (revealed && isAnswer)
                      cls =
                        'relative text-left px-4 py-4 rounded-2xl border bg-emerald-400/15 border-emerald-300/60 text-white shadow-[0_0_0_4px_rgba(16,185,129,0.15)]'
                    else if (revealed && isPicked && !isAnswer)
                      cls =
                        'relative text-left px-4 py-4 rounded-2xl border bg-rose-500/15 border-rose-400/60 text-white'
                    else if (revealed)
                      cls =
                        'relative text-left px-4 py-4 rounded-2xl border bg-white/5 border-white/10 text-white/60'

                    return (
                      <motion.button
                        key={i}
                        type="button"
                        disabled={revealed}
                        onClick={() => answer(i)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                        whileHover={!revealed ? { scale: 1.02 } : undefined}
                        whileTap={!revealed ? { scale: 0.98 } : undefined}
                        className={cls}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`shrink-0 h-7 w-7 rounded-lg grid place-items-center text-[12px] font-bold ${
                              revealed && isAnswer
                                ? 'bg-emerald-400 text-white'
                                : revealed && isPicked && !isAnswer
                                  ? 'bg-rose-400 text-white'
                                  : 'bg-white/10 text-white/80'
                            }`}
                          >
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-[14.5px] leading-snug">{c}</span>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {(phase === 'correct' || phase === 'wrong') && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-7"
                    >
                      <div
                        className={`rounded-2xl px-5 py-4 border ${
                          phase === 'correct'
                            ? 'bg-emerald-400/12 border-emerald-300/40'
                            : 'bg-rose-500/12 border-rose-400/40'
                        }`}
                      >
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                          className={`font-serif text-xl sm:text-2xl font-semibold ${
                            phase === 'correct' ? 'text-emerald-200' : 'text-rose-200'
                          }`}
                        >
                          {feedback}
                        </motion.div>
                        {current.explanation && (
                          <p className="mt-1.5 text-[13.5px] text-white/75 leading-relaxed">
                            {current.explanation}
                          </p>
                        )}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          onClick={nextQuestion}
                          className="inline-flex items-center gap-2 h-12 px-6 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_-10px_rgba(16,185,129,0.6)]"
                        >
                          <Shuffle size={16} /> Bir tane daha
                        </button>
                        <button
                          onClick={reset}
                          className="inline-flex items-center gap-2 h-12 px-5 rounded-full font-medium bg-white/10 hover:bg-white/16 border border-white/15 transition"
                        >
                          <RotateCcw size={15} /> Sıfırla
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Streak burst banner */}
              {phase === 'correct' && score.streak >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] font-bold text-white bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 shadow-[0_4px_20px_-4px_rgba(251,191,36,0.8)]"
                >
                  <Flame size={12} /> {score.streak}'li Seri!
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile score chip */}
        <div className="sm:hidden mt-6 flex items-center justify-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-white/8 border border-white/15 backdrop-blur text-[12px]">
            <Trophy size={12} className="text-amber-300" />
            <span className="font-semibold">{score.correct}</span>
            <span className="text-white/55">/ {score.total}</span>
            <span className="text-white/40 mx-0.5">·</span>
            <span className="text-white/70">{accuracy}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
