import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { site } from '../config/site'
import { GithubIcon } from '../components/ui/Icons'

const items = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const ease = [0.16, 1, 0.3, 1] as const

export function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#home" aria-label={`${site.name}, back to top`} className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="font-pixel text-[1.6rem] leading-none tracking-tight text-paper">
        M<span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">B</span>
      </span>
      <span className="hidden h-5 w-px bg-line-2 sm:block" />
      <span className="hidden font-mono text-[0.62rem] uppercase leading-tight tracking-[0.2em] text-mute sm:block">
        Munira
        <br />
        Bhabarawala
      </span>
    </a>
  )
}

function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open ? 'bg-ink/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10">
          <Logo />

          <ul className="hidden items-center gap-9 lg:flex">
            {items.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  data-active={active === item.id}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`u-link font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    active === item.id ? 'text-paper' : 'text-mute hover:text-paper'
                  }`}
                >
                  <span className="mr-1.5 text-mute-2">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="group flex items-center gap-4 lg:hidden"
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-paper">{open ? 'Close' : 'Menu'}</span>
            <span className="relative block h-4 w-7" aria-hidden="true">
              <motion.span
                className="absolute right-0 top-0 h-px bg-paper"
                animate={open ? { top: 8, rotate: 45, width: 28 } : { top: 0, rotate: 0, width: 28 }}
                transition={{ duration: 0.5, ease }}
              />
              <motion.span
                className="absolute right-0 top-2 h-px bg-paper"
                animate={open ? { opacity: 0, width: 0 } : { opacity: 1, width: 20 }}
                transition={{ duration: 0.3, ease }}
              />
              <motion.span
                className="absolute right-0 top-4 h-px bg-paper"
                animate={open ? { top: 8, rotate: -45, width: 28 } : { top: 16, rotate: 0, width: 14 }}
                transition={{ duration: 0.5, ease }}
              />
            </span>
          </button>
        </nav>
        <div className={`dots-x transition-opacity duration-500 ${scrolled && !open ? 'opacity-100' : 'opacity-0'}`} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-5 pb-8 pt-28 md:px-10 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
            <motion.ul
              className="relative flex flex-1 flex-col justify-center gap-2"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            >
              {items.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.7, ease } } }}
                    className="group flex items-baseline gap-4 py-1"
                  >
                    <span className="font-mono text-xs text-mute-2">0{i + 1}</span>
                    <span
                      className={`font-pixel text-[clamp(2.4rem,11vw,4.5rem)] leading-none transition-colors ${
                        active === item.id ? 'text-paper' : 'text-mute group-hover:text-paper'
                      }`}
                    >
                      {item.label}
                    </span>
                  </motion.a>
                </li>
              ))}
            </motion.ul>
            <motion.div
              className="relative flex items-center justify-between border-t border-line pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <span className="label">{site.title}</span>
              <a href={site.links.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub profile" className="text-mute hover:text-paper">
                <GithubIcon className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
