import { motion } from 'framer-motion'
import portrait from '../../assets/munira.webp'
import { site } from '../../config/site'

/**
 * Circular profile photo (Instagram / LinkedIn style) framed by
 * a thin ring and a slowly rotating dashed orbit, with an MB badge.
 */
export function Portrait({ className = '' }: { className?: string }) {
  return (
    <div className={`relative aspect-square ${className}`}>
      {/* rotating dashed orbit */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <motion.svg
          viewBox="0 0 100 100"
          className="h-full w-full text-line-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="49.5" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="0.8 1.6" />
          <rect x="49" y="0" width="2" height="2" fill="#f4f4f2" />
        </motion.svg>
      </div>

      {/* photo */}
      <motion.div
        className="group absolute inset-[7%] overflow-hidden rounded-full border border-paper/80 bg-paper"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={portrait}
          alt={`Portrait of ${site.name}`}
          width={375}
          height={375}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </motion.div>

      {/* MB badge */}
      <motion.div
        className="absolute bottom-[10%] right-[10%] flex h-[19%] w-[19%] items-center justify-center rounded-full border border-paper bg-ink"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <span className="font-pixel text-[clamp(0.9rem,2.4vw,1.5rem)] leading-none text-paper">{site.initials}</span>
      </motion.div>

      <span className="absolute -bottom-8 left-0 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute-2">
        fig.02 / {site.name}
      </span>
    </div>
  )
}
