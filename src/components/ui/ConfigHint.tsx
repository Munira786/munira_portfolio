/** Shown only in `npm run dev` for config fields that are still empty. */
export function ConfigHint({ field }: { field: string }) {
  if (!import.meta.env.DEV) return null
  return (
    <span
      className="inline-flex items-center border border-dashed border-line-2 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-mute-2"
      title={`Set ${field} in src/config/site.ts`}
    >
      set {field}
    </span>
  )
}
