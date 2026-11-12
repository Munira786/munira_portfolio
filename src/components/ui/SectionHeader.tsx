import { motion } from 'framer-motion'
import { fadeUp, stagger } from './motion'

/** Index label + pixel heading used to open each section. */
export function SectionHeader({
  index,
  label,
  title,
  id,
  aside,
}: {
  index: string
  label: string
  title: string
  id?: string
  aside?: React.ReactNode
}) {
  return (
    <motion.header
      className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger(0.1)}
    >
      <div>
        <motion.p variants={fadeUp} className="label mb-5 flex items-center gap-3">
          <span className="text-paper">[{index}]</span>
          <span className="inline-block h-px w-8 bg-line-2" />
          {label}
        </motion.p>
        <motion.h2
          id={id}
          variants={fadeUp}
          className="font-pixel text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-paper"
        >
          {title}
        </motion.h2>
      </div>
      {aside && <motion.div variants={fadeUp}>{aside}</motion.div>}
    </motion.header>
  )
}
