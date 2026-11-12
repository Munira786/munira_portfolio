import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

/* ── CSS-3D wireframe cube ─────────────────────────────────── */
function WireCube({
  size,
  fill = 'transparent',
  stroke = 'rgba(244,244,242,0.85)',
  style,
}: {
  size: number
  fill?: string
  stroke?: string
  style?: CSSProperties
}) {
  const h = size / 2
  const faces = [
    `rotateY(0deg) translateZ(${h}px)`,
    `rotateY(180deg) translateZ(${h}px)`,
    `rotateY(90deg) translateZ(${h}px)`,
    `rotateY(-90deg) translateZ(${h}px)`,
    `rotateX(90deg) translateZ(${h}px)`,
    `rotateX(-90deg) translateZ(${h}px)`,
  ]
  return (
    <div style={{ width: size, height: size, transformStyle: 'preserve-3d', position: 'relative', ...style }}>
      {faces.map((t, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            transform: t,
            border: `1px solid ${stroke}`,
            background: fill,
            backfaceVisibility: 'visible',
          }}
        />
      ))}
    </div>
  )
}

/** A wire cube that spins forever on its own axis. */
function Spinner({
  size,
  duration,
  reverse,
  tilt = -22,
  fill,
  stroke,
}: {
  size: number
  duration: number
  reverse?: boolean
  tilt?: number
  fill?: string
  stroke?: string
}) {
  return (
    <div style={{ transformStyle: 'preserve-3d', transform: `rotateX(${tilt}deg)` }}>
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        <WireCube size={size} fill={fill} stroke={stroke} />
      </motion.div>
    </div>
  )
}

/* ── Tiny solid isometric cube (SVG, cheap to render many) ──── */
function IsoCube({ s = 12, tone = 1 }: { s?: number; tone?: number }) {
  const w = s
  const h = s * 1.15
  return (
    <svg width={w} height={h} viewBox="0 0 20 23" aria-hidden="true">
      <path d="M10 0 20 5.75 10 11.5 0 5.75Z" fill={`rgba(244,244,242,${0.95 * tone})`} />
      <path d="M0 5.75 10 11.5V23L0 17.25Z" fill={`rgba(150,150,148,${tone})`} />
      <path d="M20 5.75 10 11.5V23l10-5.75Z" fill={`rgba(70,70,68,${tone})`} />
    </svg>
  )
}

const particles = [
  { x: 8, y: 18, s: 10, d: 0 },
  { x: 18, y: 8, s: 8, d: 1.2 },
  { x: 30, y: 4, s: 12, d: 0.4 },
  { x: 92, y: 30, s: 9, d: 2.1 },
  { x: 86, y: 70, s: 11, d: 0.8 },
  { x: 74, y: 90, s: 8, d: 1.6 },
  { x: 12, y: 74, s: 12, d: 2.4 },
  { x: 4, y: 48, s: 7, d: 1.1 },
  { x: 48, y: 94, s: 9, d: 0.2 },
  { x: 60, y: 6, s: 7, d: 1.9 },
  { x: 96, y: 52, s: 6, d: 2.8 },
  { x: 24, y: 92, s: 6, d: 0.6 },
]

/* Graph nodes (percent coords) — a nod to the workflow work */
const nodes = [
  { x: 14, y: 30 },
  { x: 30, y: 62 },
  { x: 52, y: 50 },
  { x: 78, y: 22 },
  { x: 82, y: 78 },
]
const edges: [number, number][] = [
  [0, 2],
  [1, 2],
  [2, 3],
  [2, 4],
]

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [w, setW] = useState(0)
  const core = w * 0.4
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const rotY = useTransform(sx, [-1, 1], [-10, 10])
  const rotX = useTransform(sy, [-1, 1], [8, -8])
  const near = { x: useTransform(sx, [-1, 1], [-22, 22]), y: useTransform(sy, [-1, 1], [-22, 22]) }
  const far = { x: useTransform(sx, [-1, 1], [8, -8]), y: useTransform(sy, [-1, 1], [8, -8]) }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (reduce) return
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my, reduce])

  return (
    <div ref={ref} className="relative aspect-square w-full select-none" aria-hidden="true">
      {/* dot field, faded at the edges */}
      <div
        className="dot-grid absolute inset-0"
        style={{ maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 70%)' }}
      />

      {/* far layer: graph lines */}
      <motion.svg style={far} className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map(([a, b], i) => {
          const A = nodes[a]
          const B = nodes[b]
          const mid = (A.x + B.x) / 2
          const d = `M${A.x} ${A.y} C${mid} ${A.y}, ${mid} ${B.y}, ${B.x} ${B.y}`
          return (
            <g key={i}>
              <motion.path
                d={d}
                fill="none"
                stroke="rgba(244,244,242,0.18)"
                strokeWidth="0.25"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
              <path d={d} fill="none" stroke="rgba(244,244,242,0.55)" strokeWidth="1" vectorEffect="non-scaling-stroke" className="edge-flow" />
            </g>
          )
        })}
      </motion.svg>
      {nodes.map((n, i) => (
        <motion.span
          key={i}
          className="absolute block h-2 w-2 -translate-x-1/2 -translate-y-1/2 border border-paper bg-ink"
          style={{ left: `${n.x}%`, top: `${n.y}%`, x: far.x, y: far.y }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
        />
      ))}

      {/* main 3D stage */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: 1100, rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      >
        {/* central tesseract: outer wire + inner frosted cube */}
        {w > 0 && (
          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <Centered size={core}>
              <Spinner size={core} duration={46} />
            </Centered>
            <Centered size={core * 0.47}>
              <Spinner size={core * 0.47} duration={28} reverse fill="rgba(244,244,242,0.07)" stroke="rgba(244,244,242,0.95)" />
            </Centered>
          </motion.div>
        )}

        {/* satellites */}
        <Float className="left-[6%] top-[12%]" delay={0.2} amp={10}>
          <Spinner size={w * 0.12} duration={30} tilt={-30} stroke="rgba(244,244,242,0.6)" />
        </Float>
        <Float className="right-[8%] top-[52%]" delay={1} amp={14}>
          <Spinner size={w * 0.16} duration={38} reverse tilt={-18} stroke="rgba(244,244,242,0.7)" />
        </Float>
        <Float className="left-[18%] bottom-[10%]" delay={0.6} amp={8}>
          <Spinner size={w * 0.08} duration={22} tilt={-35} fill="rgba(244,244,242,0.12)" />
        </Float>
      </motion.div>

      {/* near layer: tiny solid cubes */}
      <motion.div className="absolute inset-0" style={near}>
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 1], y: [10, -6, 10] }}
            transition={{
              opacity: { duration: 1, delay: 0.8 + p.d * 0.2 },
              y: { duration: 6 + p.d, repeat: Infinity, ease: 'easeInOut', delay: p.d },
            }}
          >
            <IsoCube s={p.s} tone={p.s > 9 ? 1 : 0.7} />
          </motion.div>
        ))}
      </motion.div>

      {/* corner annotations */}
      <div className="absolute left-0 top-0 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute-2">
        fig.01 / composition
      </div>
      <div className="absolute bottom-0 right-0 text-right font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute-2">
        nodes · edges · systems
      </div>
    </div>
  )
}

function Float({ children, className, delay = 0, amp = 10 }: { children: React.ReactNode; className: string; delay?: number; amp?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -amp, 0] }}
      transition={{ opacity: { duration: 1.2, delay: 0.8 + delay }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay } }}
    >
      {children}
    </motion.div>
  )
}

function Centered({ size, children }: { size: number; children: React.ReactNode }) {
  return (
    <div className="absolute" style={{ transformStyle: 'preserve-3d', left: -size / 2, top: -size / 2 }}>
      {children}
    </div>
  )
}
