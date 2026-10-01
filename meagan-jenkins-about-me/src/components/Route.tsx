import { useMemo, useState } from 'react'
import { certs, education, route } from '../content'
import { useReveal } from '../hooks'

const W = 1000
const H = 300
const PAD_X = 40
const PAD_TOP = 24
const PAD_BOTTOM = 20

export function Route() {
  const [active, setActive] = useState(route.length - 1)
  const [ref, shown] = useReveal<HTMLDivElement>(0.3)

  const points = useMemo(
    () =>
      route.map((s, i) => {
        const x = PAD_X + (i * (W - PAD_X * 2)) / (route.length - 1)
        const y = H - PAD_BOTTOM - (s.elev / 100) * (H - PAD_TOP - PAD_BOTTOM)
        return { x, y }
      }),
    [],
  )

  const line = points.reduce((d, p, i) => {
    if (i === 0) return `M${p.x} ${p.y}`
    const prev = points[i - 1]
    const mid = (prev.x + p.x) / 2
    return `${d} C${mid} ${prev.y} ${mid} ${p.y} ${p.x} ${p.y}`
  }, '')
  const first = points[0]
  const last = points[points.length - 1]
  const area = `M0 ${first.y} L${line.slice(1)} L${W} ${last.y} L${W} ${H} L0 ${H} Z`
  const stop = route[active]

  return (
    <div className="route">
      <div className={`route-chart ${shown ? 'shown' : ''}`} ref={ref}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--purple)" stopOpacity=".38" />
              <stop offset="1" stopColor="var(--green)" stopOpacity=".04" />
            </linearGradient>
            <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--green)" />
              <stop offset="1" stopColor="var(--purple)" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} className="grid-line" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={area} fill="url(#area)" className="route-area" />
          <path d={line} fill="none" stroke="url(#stroke)" strokeWidth="4" strokeLinecap="round" pathLength="1" className="route-line" vectorEffect="non-scaling-stroke" />
        </svg>
        {route.map((s, i) => (
          <button
            key={s.when + s.where}
            className={`node ${i === active ? 'on' : ''} ${i === route.length - 1 ? 'peak' : ''}`}
            style={{ left: `${(points[i].x / W) * 100}%`, top: `${(points[i].y / H) * 100}%` }}
            aria-label={`${s.when}: ${s.role} at ${s.where}`}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          />
        ))}
        <div className="axis" aria-hidden="true">
          <span>2011</span>
          <span>today</span>
        </div>
      </div>

      <article className="route-detail" aria-live="polite">
        <div className="route-meta">
          <span className="camp">{stop.camp}</span>
          <time>{stop.when}</time>
        </div>
        <h3>{stop.role}</h3>
        <strong>{stop.where}</strong>
        <p>{stop.note}</p>
        <div className="route-nav">
          <button className="btn btn-ghost" onClick={() => setActive((a) => Math.max(0, a - 1))} disabled={active === 0}>
            ← earlier
          </button>
          <span>
            {active + 1} of {route.length}
          </span>
          <button className="btn btn-ghost" onClick={() => setActive((a) => Math.min(route.length - 1, a + 1))} disabled={active === route.length - 1}>
            later →
          </button>
        </div>
      </article>

      <div className="route-extras">
        <div>
          <h4>Schooling</h4>
          <ul>
            {education.map((e) => (
              <li key={e.degree}>
                <b>{e.degree}</b>
                <span>{e.school}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Badges earned</h4>
          <ul className="badge-list">
            {certs.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
