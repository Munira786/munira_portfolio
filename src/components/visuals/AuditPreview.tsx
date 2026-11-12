import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'

/**
 * Illustration of Ayushma's pre-audit report: the four required
 * documents, the three validation checks, and the three possible
 * outcomes defined in the project README.
 */
const docs = ['Clinical notes', 'Discharge summary', 'Hospital bill', 'Photo evidence']
const outcomes = [
  { status: 'CLEAN', checks: ['pass', 'pass', 'pass'] },
  { status: 'PARTIAL_APPROVAL', checks: ['pass', 'flag', 'pass'] },
  { status: 'REVIEW_REQUIRED', checks: ['flag', 'pass', 'flag'] },
] as const
const checks = ['Package code', 'Billing limit', 'Documents']

export function AuditPreview() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((x) => (x + 1) % outcomes.length), 2600)
    return () => clearInterval(id)
  }, [reduce])
  const o = outcomes[i]

  return (
    <div className="relative flex aspect-[4/3] w-full flex-col lg:aspect-[16/9] border border-line bg-ink-2 p-5 font-mono sm:p-6" aria-hidden="true">
      <div className="mb-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-mute-2">
        <span>Pre-audit report</span>
        <span>PM-JAY</span>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-4">
        <div>
          <p className="mb-2.5 text-[9px] uppercase tracking-[0.2em] text-mute-2">Inputs</p>
          <ul className="space-y-1.5">
            {docs.map((d) => (
              <li key={d} className="flex items-center gap-2 border border-line px-2 py-1.5 text-[10px] text-mute sm:text-[11px]">
                <Check className="h-3 w-3 shrink-0 text-paper" strokeWidth={2} />
                <span className="truncate">{d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2.5 text-[9px] uppercase tracking-[0.2em] text-mute-2">Checks</p>
          <ul className="space-y-1.5">
            {checks.map((c, k) => (
              <li key={c} className="flex items-center justify-between gap-2 border border-line px-2 py-1.5 text-[10px] sm:text-[11px]">
                <span className="truncate text-mute">{c}</span>
                <span
                  className={`shrink-0 px-1 text-[9px] uppercase transition-colors duration-500 ${
                    o.checks[k] === 'pass' ? 'bg-paper text-ink' : 'border border-paper text-paper'
                  }`}
                >
                  {o.checks[k]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
        <span className="text-[9px] uppercase tracking-[0.2em] text-mute-2">Claim status</span>
        <div className="relative h-6 overflow-hidden text-right">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={o.status}
              className="block font-pixel text-sm text-paper sm:text-base"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {o.status}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
