/**
 * Deterministic, mirrored pixel glyph generated from a project name.
 * A neutral placeholder visual for projects whose case study isn't written yet.
 */
function hash(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function PendingGlyph({ seed, className = '' }: { seed: string; className?: string }) {
  const n = 7
  let h = hash(seed)
  const cells: [number, number][] = []
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < Math.ceil(n / 2); x++) {
      h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0
      if (h % 100 < 48) {
        cells.push([x, y])
        if (x !== n - 1 - x) cells.push([n - 1 - x, y])
      }
    }
  }
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} className={className} aria-hidden="true" shapeRendering="crispEdges">
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x + 0.08} y={y + 0.08} width="0.84" height="0.84" fill="currentColor" />
      ))}
    </svg>
  )
}
