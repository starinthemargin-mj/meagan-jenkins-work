import { useState } from 'react'
import { signs } from '../content'

export function TrailSigns() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="signs">
      <ul className="signpost">
        {signs.map((s, i) => (
          <li key={s.label} className={i % 2 ? 'right' : 'left'}>
            <button
              className={`sign ${open === i ? 'open' : ''}`}
              aria-expanded={open === i}
              aria-controls={`sign-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="sign-emoji" aria-hidden="true">
                {s.emoji}
              </span>
              <span className="sign-label">{s.label}</span>
            </button>
            <p id={`sign-${i}`} className="sign-blurb" hidden={open !== i}>
              {s.blurb}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
