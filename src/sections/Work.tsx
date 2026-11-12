import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Boxes, FileCode2, Info, Layers, Plus, X } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { projects, type Project } from '../config/site'
import { Button } from '../components/ui/Button'
import { ConfigHint } from '../components/ui/ConfigHint'
import { GithubIcon } from '../components/ui/Icons'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Separator } from '../components/ui/Separator'
import { AuditPreview } from '../components/visuals/AuditPreview'
import { PendingGlyph } from '../components/visuals/PendingGlyph'
import { WorkflowPreview } from '../components/visuals/WorkflowPreview'

const ease = [0.16, 1, 0.3, 1] as const
const num = (i: number) => String(i + 1).padStart(2, '0')

export function Work() {
  const [open, setOpen] = useState<Project | null>(null)
  const shown = projects.filter((p) => p.documented)
  const rest = projects.filter((p) => !p.documented)

  return (
    <section id="work" aria-labelledby="work-title" className="relative">
      <div className="mx-auto max-w-[1440px] px-5 pt-24 md:px-10 md:pt-32">
        <SectionHeader
          index="02"
          label="Selected work"
          title="SELECTED WORK"
          id="work-title"
          aside={
            <p className="max-w-xs text-sm leading-relaxed text-mute">
              Products I've designed and engineered, from visual automation tools to applied AI.
            </p>
          }
        />
      </div>

      {shown.map((p, i) => (
        <div key={p.id}>
          <Separator />
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">
            <ProjectBlock project={p} index={i} onOpen={() => setOpen(p)} />
          </div>
        </div>
      ))}
      <Separator />

      {rest.length > 0 && (
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-24">
          <Reveal className="mb-8 flex items-center justify-between">
            <p className="label">More projects</p>
            <p className="label text-mute-2">{num(2)} — {num(projects.length - 1)}</p>
          </Reveal>
          <ul className="border-t border-line">
            {rest.map((p, k) => (
              <IndexRow key={p.id} project={p} index={k + 2} onOpen={() => setOpen(p)} />
            ))}
          </ul>
        </div>
      )}

      <ProjectDrawer project={open} onClose={() => setOpen(null)} />
    </section>
  )
}

/* ── Project block (nod to the reference's release layout) ── */
function ProjectBlock({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const meta: { icon: ReactNode; k: string; v: string }[] = [
    ...(project.domain ? [{ icon: <Boxes className="h-4 w-4" strokeWidth={1.25} />, k: 'Domain', v: project.domain }] : []),
    ...(project.kind ? [{ icon: <Layers className="h-4 w-4" strokeWidth={1.25} />, k: 'Type', v: project.kind }] : []),
    { icon: <FileCode2 className="h-4 w-4" strokeWidth={1.25} />, k: 'Stack', v: project.stack.join(', ') },
    { icon: <Info className="h-4 w-4" strokeWidth={1.25} />, k: 'Description', v: project.description },
  ]
  return (
    <article aria-labelledby={`${project.id}-title`} className="relative grid gap-10 py-20 md:py-24 xl:grid-cols-12 xl:gap-12">
      <div className="hidden xl:col-span-1 xl:flex xl:items-end">
        <p className="label origin-bottom-left translate-x-4 -rotate-90 whitespace-nowrap text-paper">Project {num(index)}{project.label && ` — ${project.label}`}</p>
      </div>

      <Reveal className="xl:col-span-6 xl:self-center">
        <button type="button" onClick={onOpen} className="group relative block w-full text-left" aria-label={`Open details for ${project.name}`}>
          <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]">
            <Preview visual={project.visual} seed={project.name} />
          </div>
          <Corners />
          <span className="absolute bottom-4 right-4 flex items-center gap-2 bg-paper px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
            View case study <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </span>
        </button>
        {project.visual === 'workflow' && (
          <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-mute-2">
            Interface illustration · built from the project's node types and run-status model
          </p>
        )}
      </Reveal>

      <Reveal className="max-w-3xl xl:col-span-5 xl:max-w-none" delay={0.1}>
        <p className="label mb-4 xl:hidden">Project {num(index)}{project.label && ` — ${project.label}`}</p>
        <h3 id={`${project.id}-title`} className="text-2xl font-medium uppercase tracking-wide md:text-3xl">
          {project.name}
        </h3>
        <span className="mt-4 block h-0.5 w-8 bg-paper" />
        <p className="mt-4 text-sm text-mute">{project.tagline}</p>

        <dl className="mt-8 space-y-4">
          {meta.map((m) => (
            <div key={m.k} className="flex gap-4 text-sm leading-relaxed">
              <span className="mt-0.5 text-mute">{m.icon}</span>
              <div>
                <dt className="inline text-mute">{m.k}: </dt>
                <dd className="inline text-paper/90">{m.v}</dd>
              </div>
            </div>
          ))}
        </dl>
        {project.context && <p className="label mt-8 text-mute-2">{project.context}</p>}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          {project.repo && (
            <Button href={project.repo} external variant="solid" className="sm:min-w-[220px]" icon={<GithubIcon className="h-4 w-4" />}>
              Repository
            </Button>
          )}
          <button
            type="button"
            onClick={onOpen}
            className="u-link u-link-static self-start whitespace-nowrap font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mute hover:text-paper sm:self-center"
          >
            Detailed information
          </button>
        </div>
      </Reveal>
    </article>
  )
}

function Preview({ visual, seed }: { visual: Project['visual']; seed: string }) {
  if (visual === 'workflow') return <WorkflowPreview />
  if (visual === 'audit') return <AuditPreview />
  return (
    <div className="grid-bg flex aspect-[16/9] items-center justify-center border border-line">
      <PendingGlyph seed={seed} className="h-24 w-24 text-paper" />
    </div>
  )
}

/* ── 03+ · Index rows ───────────────────────────────────────── */
function IndexRow({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <Reveal as="li" className="border-b border-line">
      <button
        type="button"
        onClick={onOpen}
        className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[4rem_1fr_1fr_auto] md:gap-8 md:py-8"
      >
        <span className="font-mono text-xs text-mute-2">{num(index)}</span>
        <span className="font-pixel text-xl uppercase leading-tight text-mute transition-all duration-500 group-hover:translate-x-2 group-hover:text-paper md:text-3xl">
          {project.name}
        </span>
        <span className="hidden text-sm text-mute md:block">
          {project.documented ? project.tagline : 'Case study in preparation'}
          {project.documented && project.stack.length > 0 && (
            <span className="mt-1 block font-mono text-[0.65rem] uppercase tracking-widest text-mute-2">{project.stack.slice(0, 3).join(' · ')}</span>
          )}
        </span>
        <span className="flex items-center gap-5">
          <PendingGlyph
            seed={project.name}
            className="hidden h-10 w-10 text-mute-2 opacity-0 transition-all duration-500 group-hover:text-paper group-hover:opacity-100 sm:block"
          />
          <span className="flex h-9 w-9 items-center justify-center border border-line-2 transition-all duration-500 group-hover:rotate-90 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
            <Plus className="h-4 w-4" strokeWidth={1.25} />
          </span>
        </span>
      </button>
    </Reveal>
  )
}

/* ── Detail drawer ──────────────────────────────────────────── */
function ProjectDrawer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const index = project ? projects.findIndex((p) => p.id === project.id) : 0

  useEffect(() => {
    if (!project) return
    const prev = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      prev?.focus()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            className="absolute inset-y-0 right-0 flex w-full max-w-3xl flex-col overflow-y-auto border-l border-line bg-ink"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ink/90 px-6 py-5 backdrop-blur md:px-10">
              <span className="label">
                Project {num(index)} / {num(projects.length - 1)}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="group flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute hover:text-paper"
              >
                Close
                <span className="flex h-8 w-8 items-center justify-center border border-line-2 transition-transform duration-500 group-hover:rotate-90 group-hover:border-paper">
                  <X className="h-4 w-4" strokeWidth={1.25} />
                </span>
              </button>
            </div>

            <div className="flex-1 px-6 py-10 md:px-10 md:py-14">
              <h3 id="drawer-title" className="font-pixel text-3xl uppercase leading-tight md:text-5xl">
                {project.name}
              </h3>
              <p className="mt-4 text-mute">{project.tagline}</p>

              <div className="mt-10">
                <Preview visual={project.visual} seed={project.name} />
              </div>

              {project.documented ? (
                <>
                  <DrawerBlock title="Overview">
                    <p className="leading-relaxed text-paper/90">{project.description}</p>
                    {project.context && <p className="label mt-4 text-mute-2">{project.context}</p>}
                  </DrawerBlock>
                  <DrawerBlock title="Key features">
                    <ul className="grid gap-3">
                      {project.highlights.map((h, i) => (
                        <li key={h} className="grid grid-cols-[2rem_1fr] text-sm leading-relaxed text-mute">
                          <span className="font-mono text-xs text-mute-2">{num(i)}</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </DrawerBlock>
                  <DrawerBlock title="Technology">
                    <Stack items={project.stack} />
                  </DrawerBlock>
                </>
              ) : (
                <DrawerBlock title="Status">
                  <p className="leading-relaxed text-mute">
                    A full write-up of this project is being prepared. Check the GitHub profile for the latest public work.
                  </p>
                  <div className="mt-4">
                    <ConfigHint field={`projects["${project.id}"] description, highlights, stack`} />
                  </div>
                </DrawerBlock>
              )}

              <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                {project.repo ? (
                  <Button href={project.repo} external variant="solid" icon={<GithubIcon className="h-4 w-4" />} className="sm:min-w-[220px]">
                    View repository
                  </Button>
                ) : (
                  <Button href="https://github.com/Munira786" external icon={<GithubIcon className="h-4 w-4" />} className="sm:min-w-[220px]">
                    GitHub profile
                  </Button>
                )}
                {project.demo && (
                  <Button href={project.demo} external className="sm:min-w-[200px]">
                    Live demo
                  </Button>
                )}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DrawerBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 grid gap-4 border-t border-line pt-6 md:grid-cols-[10rem_1fr] md:gap-8">
      <h4 className="label">{title}</h4>
      <div>{children}</div>
    </section>
  )
}

function Stack({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
      {items.map((s) => (
        <li key={s} className="border border-line-2 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-mute">
          {s}
        </li>
      ))}
    </ul>
  )
}

/** Crop-mark corners that draw in on hover. */
function Corners() {
  const c = 'absolute h-3 w-3 border-paper opacity-0 transition-all duration-500 group-hover:opacity-100'
  return (
    <>
      <span className={`${c} -left-2 -top-2 border-l border-t group-hover:-left-3 group-hover:-top-3`} />
      <span className={`${c} -right-2 -top-2 border-r border-t group-hover:-right-3 group-hover:-top-3`} />
      <span className={`${c} -bottom-2 -left-2 border-b border-l group-hover:-bottom-3 group-hover:-left-3`} />
      <span className={`${c} -bottom-2 -right-2 border-b border-r group-hover:-bottom-3 group-hover:-right-3`} />
    </>
  )
}
