import { useSyncExternalStore } from 'react'

// Tree scavenger hunt. Found cairns are remembered in localStorage so the hunt carries across pages.
export const TOTAL_CAIRNS = 8
const KEY = 'meagan-cairns'

const listeners = new Set<() => void>()
let found: string[] = read()
let celebrating = false

function read(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(raw) ? raw.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

function emit() {
  listeners.forEach((l) => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function collect(id: string) {
  if (found.includes(id)) return
  found = [...found, id]
  localStorage.setItem(KEY, JSON.stringify(found))
  if (found.length >= TOTAL_CAIRNS) celebrating = true
  emit()
}

export function resetHunt() {
  found = []
  celebrating = false
  localStorage.removeItem(KEY)
  emit()
}

export function closeCelebration() {
  celebrating = false
  emit()
}

export function useHunt() {
  const foundNow = useSyncExternalStore(subscribe, () => found)
  const isCelebrating = useSyncExternalStore(subscribe, () => celebrating)
  return { found: foundNow, celebrating: isCelebrating }
}

type Variant = 'obvious' | 'subtle' | 'hover' | 'camo'

/** A hidden cairn. Place inside any `position: relative` container and style with `style`. */
export function Cairn({ id, variant = 'subtle', style }: { id: string; variant?: Variant; style?: React.CSSProperties }) {
  const { found: list } = useHunt()
  const got = list.includes(id)
  return (
    <button
      type="button"
      className={`cairn cairn--${variant} ${got ? 'cairn--found' : ''}`}
      style={style}
      aria-label={got ? 'Tree (already found)' : 'Hidden tree'}
      onClick={(e) => {
        e.stopPropagation()
        collect(id)
      }}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 2 L24 12 H19.5 L27 21 H18 V29 H14 V21 H5 L12.5 12 H8 Z" />
      </svg>
    </button>
  )
}

const bits = ['🍂', '🌲', '⛰️', '🔥', '⭐', '🥾', '🍁', '🦌']

export function HuntHud() {
  const { found: list, celebrating: party } = useHunt()
  const count = Math.min(list.length, TOTAL_CAIRNS)
  const done = count >= TOTAL_CAIRNS

  return (
    <>
      <div className={`hunt-counter ${done ? 'done' : ''}`} title="Hidden trees found. Keep looking!" aria-live="polite">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 2 L24 12 H19.5 L27 21 H18 V29 H14 V21 H5 L12.5 12 H8 Z" />
        </svg>
        <span>
          {count}/{TOTAL_CAIRNS}
        </span>
        <span className="sr-only"> hidden trees found</span>
      </div>

      {party && (
        <div className="hunt-overlay" role="dialog" aria-modal="true" aria-label="Scavenger hunt complete">
          <div className="hunt-confetti" aria-hidden="true">
            {Array.from({ length: 36 }, (_, i) => (
              <span
                key={i}
                style={{
                  left: `${(i * 97) % 100}%`,
                  animationDelay: `${((i * 37) % 30) / 10}s`,
                  animationDuration: `${3.5 + ((i * 13) % 25) / 10}s`,
                  fontSize: `${1.2 + ((i * 7) % 12) / 10}rem`,
                }}
              >
                {bits[i % bits.length]}
              </span>
            ))}
          </div>
          <div className="hunt-card">
            <button className="hunt-close" onClick={closeCelebration} aria-label="Close">
              ×
            </button>
            <div className="hunt-badge" aria-hidden="true">
              ⚑
            </div>
            <h3>You found all {TOTAL_CAIRNS} trees!</h3>
            <p>Summit badge unlocked. You are officially a very thorough hiker (and can't see the forest for the trees).</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <button className="btn btn-solid" onClick={closeCelebration}>
                Back to the trail
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  resetHunt()
                }}
              >
                Hunt again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
