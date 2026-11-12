import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Illustration of the AI Workflow Builder editor, built from the
 * project's real node types (Input → Text → LLM → Output) and its
 * live per-node status model (pending → running → succeeded).
 * Rendered at a fixed design size and scaled to fit its container.
 */

const W = 880
const H = 420

type Status = 'pending' | 'running' | 'succeeded'

const palette = [
  { name: 'Input', live: true },
  { name: 'Text', live: true },
  { name: 'LLM', live: true },
  { name: 'Output', live: true },
  { name: 'API', live: false },
  { name: 'Database', live: false },
  { name: 'Email', live: false },
  { name: 'Filter', live: false },
  { name: 'Math', live: false },
]

const nodes = [
  { id: 'in', x: 166, y: 110, w: 144, type: 'Input', title: 'topic' },
  { id: 'txt', x: 340, y: 220, w: 176, type: 'Text', title: 'prompt' },
  { id: 'llm', x: 560, y: 100, w: 148, type: 'LLM', title: 'claude' },
  { id: 'out', x: 738, y: 230, w: 136, type: 'Output', title: 'summary' },
]

/** Vertical offset of every handle from its node's top edge */
const HANDLE_Y = 54
const edges: [string, string][] = [
  ['in', 'txt'],
  ['txt', 'llm'],
  ['llm', 'out'],
]

function useCycle(reduce: boolean | null) {
  // step 0..4: how many nodes have finished; one node runs at a time
  const [step, setStep] = useState(reduce ? 4 : 0)
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setStep((s) => (s + 1) % 6), 1100)
    return () => clearInterval(id)
  }, [reduce])
  return (i: number): Status => {
    const s = Math.min(step, 4)
    if (i < s) return 'succeeded'
    if (i === s && step < 4) return 'running'
    return step >= 4 ? 'succeeded' : 'pending'
  }
}

function useScale() {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return { ref, scale }
}

export function WorkflowPreview() {
  const reduce = useReducedMotion()
  const statusOf = useCycle(reduce)
  const { ref, scale } = useScale()
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const allDone = nodes.every((_, i) => statusOf(i) === 'succeeded')

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: H * scale }} aria-hidden="true">
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        <div className="flex h-full flex-col border border-line bg-ink-2 font-mono text-paper">
          {/* toolbar */}
          <div className="flex h-11 items-center justify-between border-b border-line px-4 text-[11px]">
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5">
                <i className="block h-2 w-2 border border-line-2" />
                <i className="block h-2 w-2 border border-line-2" />
                <i className="block h-2 w-2 border border-line-2" />
              </span>
              <span className="text-mute">pipelines /</span>
              <span>summarize-topic</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-mute">{allDone ? 'run complete' : 'run in progress'}</span>
              <span className="flex items-center gap-2 bg-paper px-3 py-1.5 text-ink">
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <path d="M1 0 8 4 1 8Z" fill="currentColor" />
                </svg>
                RUN
              </span>
            </div>
          </div>

          <div className="flex min-h-0 flex-1">
            {/* node palette */}
            <aside className="w-[150px] shrink-0 border-r border-line p-3">
              <p className="mb-3 text-[9px] uppercase tracking-[0.2em] text-mute-2">Nodes</p>
              <ul className="space-y-1.5">
                {palette.map((p) => (
                  <li
                    key={p.name}
                    className={`flex items-center justify-between border px-2.5 py-1.5 text-[11px] ${
                      p.live ? 'border-line-2 text-paper' : 'border-line text-mute-2'
                    }`}
                  >
                    {p.name}
                    <span className="text-[9px]">{p.live ? '●' : 'soon'}</span>
                  </li>
                ))}
              </ul>
            </aside>

            {/* canvas */}
            <div className="dot-grid relative flex-1">
              <svg className="pointer-events-none absolute overflow-visible" style={{ left: -150, top: -44 }} width={W} height={H}>
                {edges.map(([a, b], i) => {
                  const A = byId[a]
                  const B = byId[b]
                  const x1 = A.x + A.w
                  const y1 = A.y + HANDLE_Y
                  const x2 = B.x
                  const y2 = B.y + HANDLE_Y
                  const mx = (x1 + x2) / 2
                  const d = `M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`
                  const active = statusOf(i) === 'succeeded'
                  return (
                    <g key={i}>
                      <path d={d} fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
                      {active && <path d={d} fill="none" stroke="#f4f4f2" strokeWidth="1.5" className="edge-flow" />}
                    </g>
                  )
                })}
              </svg>

              {nodes.map((n, i) => (
                <Node key={n.id} x={n.x - 150} y={n.y - 44} w={n.w} type={n.type} title={n.title} status={statusOf(i)}>
                  {n.type === 'Input' && <Field k="value" v="“renewable energy”" />}
                  {n.type === 'Text' && (
                    <p className="text-[11px] leading-relaxed text-mute">
                      Summarize <span className="text-paper">{'{{topic}}'}</span> in three bullet points.
                    </p>
                  )}
                  {n.type === 'LLM' && (
                    <>
                      <Field k="model" v="claude" />
                      <Field k="inputs" v="prompt · system" />
                    </>
                  )}
                  {n.type === 'Output' && <Field k="name" v="summary" />}
                </Node>
              ))}

              <span className="absolute text-[9px] text-mute-2" style={{ left: 340 - 150 + 8, top: 220 - 44 - 16 }}>
                ▸ handle: topic
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Node({
  x,
  y,
  w,
  type,
  title,
  status,
  children,
}: {
  x: number
  y: number
  w: number
  type: string
  title: string
  status: Status
  children: ReactNode
}) {
  return (
    <div
      className={`absolute border bg-ink transition-[border-color,box-shadow] duration-500 ${
        status === 'running' ? 'border-paper shadow-[0_0_0_4px_rgba(244,244,242,0.08)]' : 'border-line-2'
      }`}
      style={{ left: x, top: y, width: w }}
    >
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <span className="text-[10px] uppercase tracking-[0.18em] text-mute">{type}</span>
        <StatusChip status={status} />
      </div>
      <div className="space-y-1.5 px-3 py-2.5">
        <p className="text-[12px] text-paper">{title}</p>
        {children}
      </div>
      {/* handles */}
      {type !== 'Input' && <i className="absolute -left-[5px] block h-2 w-2 -translate-y-1/2 border border-paper bg-ink" style={{ top: HANDLE_Y }} />}
      {type !== 'Output' && <i className="absolute -right-[5px] block h-2 w-2 -translate-y-1/2 border border-paper bg-paper" style={{ top: HANDLE_Y }} />}
    </div>
  )
}

function StatusChip({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    pending: 'border-line-2 text-mute-2',
    running: 'border-paper text-paper',
    succeeded: 'border-paper bg-paper text-ink',
  }
  return (
    <span className={`flex items-center gap-1.5 border px-1.5 py-0.5 text-[9px] uppercase tracking-wider transition-colors duration-300 ${styles[status]}`}>
      {status === 'running' && <i className="block h-1 w-1 animate-pulse bg-paper motion-reduce:animate-none" />}
      {status}
    </span>
  )
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-2 border border-line px-2 py-1 text-[10px]">
      <span className="text-mute-2">{k}</span>
      <span className="truncate text-mute">{v}</span>
    </div>
  )
}
