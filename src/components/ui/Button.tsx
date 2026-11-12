import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline'
  external?: boolean
  className?: string
  icon?: ReactNode
}

/** Square-edged button with an arrow that slides out diagonally on hover. */
export function Button({ href, children, variant = 'outline', external, className = '', icon }: Props) {
  const base =
    'group relative inline-flex items-center justify-between gap-6 overflow-hidden px-5 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-300'
  const styles =
    variant === 'solid'
      ? 'bg-paper text-ink hover:bg-white'
      : 'border border-line-2 text-paper hover:border-paper'
  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {variant === 'outline' && (
        <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
      )}
      <span className={`relative z-10 ${variant === 'outline' ? 'transition-colors duration-300 group-hover:text-ink' : ''}`}>
        {children}
      </span>
      <span
        className={`relative z-10 block h-4 w-4 overflow-hidden ${variant === 'outline' ? 'transition-colors duration-300 group-hover:text-ink' : ''}`}
      >
        {icon ?? (
          <>
            <ArrowUpRight className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 group-hover:-translate-y-4" strokeWidth={1.5} />
            <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={1.5} />
          </>
        )}
      </span>
    </a>
  )
}
