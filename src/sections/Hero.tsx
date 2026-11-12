import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useRef } from 'react'
import { site } from '../config/site'
import { Button } from '../components/ui/Button'
import { HeroVisual } from '../components/visuals/HeroVisual'

const ease = [0.16, 1, 0.3, 1] as const
const lines = ['Engineering', 'ideas into', 'real products.']

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 md:pt-32">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 pb-14 md:px-10 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-12 lg:items-center lg:gap-6 lg:pb-20">
        <motion.div style={{ y: textY, opacity: fade }} className="lg:col-span-7">
          <motion.p
            className="label mb-8 flex flex-wrap items-center gap-x-3 gap-y-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping bg-paper opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-paper" />
            </span>
            <span className="text-paper">{site.name}</span>
            <span className="inline-block h-px w-6 bg-line-2" />
            <span>{site.designation}</span>
          </motion.p>

          <h1 id="hero-title" className="font-pixel text-[clamp(2.1rem,5.5vw,5rem)] uppercase leading-[0.98] tracking-[-0.01em]">
            <span className="sr-only">{site.name}: </span>
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease, delay: 0.35 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="mt-10 grid max-w-xl gap-10 md:mt-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.85 }}
          >
            <p className="text-[1.02rem] leading-relaxed text-mute md:text-lg">
              I build thoughtful software experiences, interactive applications, and AI-powered solutions that turn complex
              ideas into practical products.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="#work" variant="solid" className="sm:min-w-[230px]">
                Explore my work
              </Button>
              <Button href="#contact" className="sm:min-w-[210px]">
                Let&apos;s connect
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: visualY }} className="mx-auto w-full max-w-[560px] lg:col-span-5 lg:max-w-none">
          <HeroVisual />
        </motion.div>
      </div>

      {/* meta strip */}
      <motion.div
        className="relative mx-auto max-w-[1440px] px-5 md:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="dots-x" />
        <dl className="grid grid-cols-2 gap-y-5 py-6 md:grid-cols-4">
          <Meta k="Currently" v="B.E. Computer Engineering" />
          <Meta k="Focus" v="React · AI · Automation" />
          <Meta k="Flagship" v="AI Workflow Builder" />
          <div className="flex items-end justify-start md:justify-end">
            <a href="#work" className="group label inline-flex items-center gap-3 hover:text-paper">
              Scroll
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-1" strokeWidth={1.5} />
            </a>
          </div>
        </dl>
      </motion.div>
    </section>
  )
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="label mb-1.5 text-mute-2">{k}</dt>
      <dd className="text-sm text-paper">{v}</dd>
    </div>
  )
}
