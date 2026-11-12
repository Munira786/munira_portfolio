import { motion } from 'framer-motion'
import { site, skills } from '../config/site'
import { fadeUp, stagger } from '../components/ui/motion'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Separator } from '../components/ui/Separator'
import { Portrait } from '../components/visuals/Portrait'

const focus = [
  { k: 'React', v: 'Frontend engineering' },
  { k: 'AI', v: 'Applied in real products' },
  { k: 'Flows', v: 'Workflow automation' },
  { k: 'APIs', v: 'Backend services' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionHeader index="03" label="About" title="BEYOND WRITING CODE." id="about-title" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-md pb-8 lg:mx-0">
              <Portrait className="mx-auto w-full max-w-[400px] lg:mx-0" />
            </div>
          </Reveal>

          <motion.div
            className="lg:col-span-6 lg:col-start-7"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger(0.12)}
          >
            <motion.p variants={fadeUp} className="label mb-6">
              Hi, I'm {site.firstName}
            </motion.p>
            <motion.p variants={fadeUp} className="text-xl leading-relaxed text-paper md:text-2xl md:leading-relaxed">
              I'm Munira, a Computer Engineering student interested in building software that solves practical problems. My work
              revolves around frontend development, application engineering, and exploring how AI and automation can make
              software more useful.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-6 leading-relaxed text-mute md:text-lg">
              I enjoy transforming ideas into functional applications, experimenting with new technologies, and continuously
              improving the way I build software.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* focus strip */}
      <Separator />
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <motion.ul
          className="grid grid-cols-2 md:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0.08)}
        >
          {focus.map((f, i) => (
            <motion.li
              key={f.k}
              variants={fadeUp}
              className="relative px-2 py-10 text-center md:py-14"
            >
              {i > 0 && <span className={`dots-y absolute bottom-8 left-0 top-8 ${i === 2 ? 'hidden md:block' : ''}`} />}
              <span className="block font-pixel text-4xl leading-none md:text-5xl">{f.k}</span>
              <span className="mt-3 block text-xs text-mute md:text-sm">{f.v}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <Separator />
    </section>
  )
}

export function Skills() {
  return (
    <section aria-labelledby="skills-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionHeader
          index="04"
          label="Technical skills"
          title="TECHNICAL SKILLS"
          id="skills-title"
          aside={<p className="max-w-xs text-sm leading-relaxed text-mute">The technologies I use to design, build and ship applications.</p>}
        />
        <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={i * 0.06} className="group relative border-b border-r border-line p-6 md:p-8">
              <div className="mb-10 flex items-center justify-between">
                <span className="font-mono text-xs text-mute-2">0{i + 1}</span>
                <span className="block h-2 w-2 border border-line-2 transition-colors duration-500 group-hover:border-paper group-hover:bg-paper" />
              </div>
              <h3 className="label mb-6 text-paper">{s.group}</h3>
              <ul className="space-y-2.5">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-lg text-mute transition-colors duration-300 hover:text-paper">
                    <span className="block h-px w-3 bg-line-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
