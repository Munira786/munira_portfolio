import { motion } from 'framer-motion'
import { ArrowRight, ArrowUp, FileText, Mail } from 'lucide-react'
import type { ReactNode } from 'react'
import { site } from '../config/site'
import { ConfigHint } from '../components/ui/ConfigHint'
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons'
import { fadeUp, stagger } from '../components/ui/motion'
import { Separator } from '../components/ui/Separator'
import { Logo } from './Nav'

const ease = [0.16, 1, 0.3, 1] as const
const YEAR = new Date().getFullYear()

type Channel = { label: string; value: string; href: string; icon: ReactNode; field: string; external?: boolean }

function channels(): Channel[] {
  const { github, linkedin, email, resume } = site.links
  return [
    { label: 'GitHub', value: github.replace('https://', ''), href: github, icon: <GithubIcon className="h-4 w-4" />, field: 'links.github', external: true },
    {
      label: 'LinkedIn',
      value: linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: linkedin,
      icon: <LinkedinIcon className="h-4 w-4" />,
      field: 'links.linkedin',
      external: true,
    },
    { label: 'Email', value: email, href: email ? `mailto:${email}` : '', icon: <Mail className="h-4 w-4" strokeWidth={1.5} />, field: 'links.email' },
    { label: 'Resume', value: 'Download PDF', href: resume, icon: <FileText className="h-4 w-4" strokeWidth={1.5} />, field: 'links.resume', external: true },
  ]
}

const words = ["Let's build", 'something', 'meaningful.']

// Static class names so Tailwind can detect them
const gridCols: Record<number, string> = {
  1: 'sm:max-w-md',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

export function Contact() {
  const primary = site.links.email ? `mailto:${site.links.email}` : site.links.linkedin || site.links.github
  const visible = channels().filter((c) => c.href || import.meta.env.DEV)

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden">
      <Separator />
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <p className="label mb-10 flex items-center gap-3">
          <span className="text-paper">[07]</span>
          <span className="inline-block h-px w-8 bg-line-2" />
          Contact
        </p>

        <motion.a
          href={primary}
          {...(primary.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          className="group block"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger(0.1)}
        >
          <h2 id="contact-title" className="font-pixel text-[clamp(2.1rem,8vw,7.5rem)] uppercase leading-[0.98]">
            {words.map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.05em]">
                <motion.span
                  className="flex items-center gap-[0.25em]"
                  variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 1, ease } } }}
                >
                  <span className={i === 2 ? 'transition-colors duration-500 group-hover:text-mute' : ''}>{w}</span>
                  {i === 2 && (
                    <span className="relative inline-block h-[0.7em] w-[0.7em] shrink-0 overflow-hidden">
                      <ArrowRight
                        className="absolute inset-0 h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full"
                        strokeWidth={1.25}
                      />
                      <ArrowRight
                        className="absolute inset-0 h-full w-full -translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
                        strokeWidth={1.25}
                      />
                    </span>
                  )}
                </motion.span>
              </span>
            ))}
          </h2>
        </motion.a>

        <motion.p
          className="mt-10 max-w-lg leading-relaxed text-mute md:text-lg"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Open to software engineering and frontend roles, internships and collaborations on products that matter.
        </motion.p>

        <motion.ul
          className={`mt-16 grid border-t border-line ${gridCols[Math.min(visible.length, 4)]}`}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger(0.08)}
        >
          {visible.map((c) => (
            <motion.li key={c.label} variants={fadeUp} className="border-b border-line sm:odd:border-r lg:border-r lg:last:border-r-0">
              {c.href ? (
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  className="group flex h-full items-center justify-between gap-4 px-1 py-6 sm:px-6"
                >
                  <span className="min-w-0">
                    <span className="label mb-2 flex items-center gap-2">
                      {c.icon}
                      {c.label}
                    </span>
                    <span className="block truncate text-sm text-paper">{c.value}</span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 -rotate-45 text-mute transition-all duration-500 group-hover:rotate-0 group-hover:text-paper"
                    strokeWidth={1.5}
                  />
                </a>
              ) : (
                <div className="flex h-full flex-col justify-center gap-2 px-1 py-6 sm:px-6">
                  <span className="label flex items-center gap-2">
                    {c.icon}
                    {c.label}
                  </span>
                  <span>
                    <ConfigHint field={c.field} />
                  </span>
                </div>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export function Footer() {
  const { github, linkedin, email } = site.links
  const links = [
    { label: 'GitHub', href: github, external: true },
    { label: 'LinkedIn', href: linkedin, external: true },
    { label: 'Email', href: email ? `mailto:${email}` : '', external: false },
  ].filter((l) => l.href)

  return (
    <footer>
      <Separator />
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 md:grid-cols-3 md:items-center md:px-10">
        <Logo />
        <div className="md:text-center">
          <p className="text-sm text-paper">{site.name}</p>
          <p className="label mt-1">{site.title}</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 md:justify-end">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              className="u-link u-link-static font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mute hover:text-paper"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div className="dots-x" />
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-6 md:px-10">
        <p className="label text-mute-2">
          © {YEAR} {site.name}
        </p>
        <a href="#home" className="group label inline-flex items-center gap-3 hover:text-paper">
          Back to top
          <span className="flex h-8 w-8 items-center justify-center border border-line-2 transition-colors duration-500 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={1.5} />
          </span>
        </a>
      </div>
    </footer>
  )
}
