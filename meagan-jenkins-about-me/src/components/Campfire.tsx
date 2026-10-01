import { useEffect, useState } from 'react'
import { fireMessages } from '../content'

function formatTime(total: number) {
  const m = String(Math.floor(total / 60)).padStart(2, '0')
  const s = String(total % 60).padStart(2, '0')
  return `${m}:${s}`
}

export function Campfire() {
  const [staring, setStaring] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [logs, setLogs] = useState(2)

  useEffect(() => {
    if (!staring) return
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [staring])

  const drifting = seconds >= 15
  const message = fireMessages[Math.floor(seconds / 4) % fireMessages.length]
  const clock = seconds < 15 ? formatTime(seconds) : seconds < 30 ? formatTime(seconds).replace(/\d(?=:)/, '?') : '??:??'
  const scale = 0.72 + logs * 0.14

  return (
    <div className={`campfire ${staring ? 'lit-up' : ''}`}>
      <div className="campfire-stage" style={{ '--flame': scale } as React.CSSProperties}>
        <div className="stars" aria-hidden="true" />
        <svg viewBox="0 0 240 200" className="fire-svg" role="img" aria-label="An animated campfire">
          <defs>
            <radialGradient id="glow" cx="50%" cy="70%" r="55%">
              <stop offset="0" stopColor="#ffb347" stopOpacity=".55" />
              <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="120" cy="140" r="110" fill="url(#glow)" className="fire-glow" />
          <g className="flames">
            <path className="flame f1" d="M120 40 C150 78 158 104 150 128 C144 146 96 146 90 128 C82 104 100 78 120 40Z" fill="#ff6a2b" />
            <path className="flame f2" d="M120 62 C142 90 146 108 140 128 C136 142 104 142 100 128 C94 108 106 90 120 62Z" fill="#ffb02e" />
            <path className="flame f3" d="M120 88 C133 104 134 116 130 128 C127 137 113 137 110 128 C106 116 112 104 120 88Z" fill="#fff0b3" />
          </g>
          <g className="embers" fill="#ffcf70">
            <circle className="ember e1" cx="104" cy="60" r="2.2" />
            <circle className="ember e2" cx="138" cy="52" r="1.8" />
            <circle className="ember e3" cx="122" cy="36" r="2" />
          </g>
          <g stroke="#2a1a12" strokeLinecap="round">
            <line x1="72" y1="158" x2="164" y2="132" strokeWidth="14" stroke="#5a3a24" />
            <line x1="76" y1="132" x2="170" y2="160" strokeWidth="14" stroke="#4a2f1d" />
            {logs >= 3 && <line x1="88" y1="146" x2="154" y2="146" strokeWidth="12" stroke="#6b4429" />}
            {logs >= 4 && <line x1="96" y1="128" x2="146" y2="128" strokeWidth="10" stroke="#5a3a24" />}
          </g>
          <ellipse cx="120" cy="170" rx="82" ry="10" fill="#0d0716" opacity=".45" />
        </svg>
      </div>

      <div className="campfire-panel">
        <div className="clock" aria-hidden={!staring}>
          <small>time spent staring</small>
          <strong className={drifting ? 'drift' : ''}>{staring || seconds > 0 ? clock : '00:00'}</strong>
          <em>{staring ? (drifting ? message : 'settling in…') : seconds > 0 ? 'the fire will wait' : 'press start when ready'}</em>
        </div>
        <div className="campfire-actions">
          <button className="btn btn-solid" onClick={() => setStaring((s) => !s)}>
            {staring ? 'Look away' : seconds > 0 ? 'Keep staring' : 'Start staring'}
          </button>
          <button className="btn btn-ghost" onClick={() => setLogs((l) => Math.min(4, l + 1))} disabled={logs >= 4}>
            {logs >= 4 ? 'Fire is roaring' : 'Add a log'}
          </button>
          {seconds > 0 && (
            <button
              className="btn btn-ghost"
              onClick={() => {
                setStaring(false)
                setSeconds(0)
                setLogs(2)
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
