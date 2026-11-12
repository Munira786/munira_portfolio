import { ArrowUpRight, Plus } from 'lucide-react'
import { additionalExperience, education, experience, type Experience as Exp } from '../config/site'
import { ConfigHint } from '../components/ui/ConfigHint'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Separator } from '../components/ui/Separator'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title">
      <Separator />
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionHeader index="05" label="Experience" title="EXPERIENCE" id="experience-title" />

        <ol className="border-t border-line">
          {experience.map((e) => (
            <ExperienceItem key={e.org} item={e} />
          ))}
        </ol>

        {/* Additional experience: populated from site.ts */}
        <Reveal className="mt-16">
          <h3 className="label mb-6">Additional experience &amp; contributions</h3>
          {additionalExperience.length > 0 ? (
            <ol className="border-t border-line">
              {additionalExperience.map((e) => (
                <ExperienceItem key={e.org + e.role} item={e} compact />
              ))}
            </ol>
          ) : (
            <div className="flex flex-col gap-4 border border-dashed border-line-2 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
              <div className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-line-2 text-mute">
                  <Plus className="h-4 w-4" strokeWidth={1.25} />
                </span>
                <p className="text-sm text-mute">More roles and open-source contributions will be added here.</p>
              </div>
              <ConfigHint field="additionalExperience" />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}

function ExperienceItem({ item, compact }: { item: Exp; compact?: boolean }) {
  return (
    <Reveal as="li" className="grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-8 md:py-12">
      <div className="md:col-span-4">
        <p className="label mb-3">{item.period || item.role}</p>
        <h3 className={`font-pixel uppercase leading-tight ${compact ? 'text-xl' : 'text-2xl md:text-3xl'}`}>{item.org}</h3>
        {item.period && <p className="mt-2 text-sm text-paper/80">{item.role}</p>}
        {item.location && <p className="mt-1 text-sm text-mute">{item.location}</p>}
        {item.repo && (
          <a
            href={item.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="u-link mt-6 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mute hover:text-paper"
          >
            Source code <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
        )}
      </div>
      <div className="md:col-span-7 md:col-start-6">
        <p className="text-lg leading-relaxed text-paper/90">{item.summary}</p>
        {item.points.length > 0 && (
          <ul className="mt-6 space-y-3">
            {item.points.map((p) => (
              <li key={p} className="flex gap-3 text-sm leading-relaxed text-mute">
                <span className="mt-2 block h-1 w-1 shrink-0 bg-paper" />
                {p}
              </li>
            ))}
          </ul>
        )}
        {item.stack.length > 0 && (
          <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mute-2">{item.stack.join(' / ')}</p>
        )}
      </div>
    </Reveal>
  )
}

export function Education() {
  return (
    <section aria-labelledby="education-title">
      <Separator />
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionHeader index="06" label="Education" title="EDUCATION" id="education-title" />
        <ol className="space-y-16">
          {education.map((e, i) => (
            <Reveal as="li" key={e.school} delay={i * 0.08} className="grid gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-4">
                <div className="flex items-center gap-4">
                  <span className={`block h-3 w-3 ${i === 0 ? 'bg-paper' : 'border border-paper'}`} />
                  <span className="dots-x flex-1" />
                </div>
                <p className="label mt-4 text-paper">{e.period}</p>
                <p className="mt-1 text-sm text-mute">{e.location}</p>
              </div>
              <div className="md:col-span-7 md:col-start-6">
                <p className="label mb-3">
                  {e.degree}
                  {e.affiliation && <span className="text-mute-2"> · {e.affiliation}</span>}
                </p>
                <h3 className={`font-medium leading-snug ${i === 0 ? 'text-2xl md:text-4xl md:leading-tight' : 'text-xl md:text-2xl'}`}>
                  {e.school}
                </h3>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <p className="font-pixel text-lg uppercase text-mute md:text-xl">{e.field}</p>
                  {e.grade && <p className="font-mono text-xs uppercase tracking-[0.16em] text-paper/80">{e.grade}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
