const bats = [
  { top: '12%', delay: '0s', dur: '18s', size: 46 },
  { top: '26%', delay: '-6s', dur: '24s', size: 32 },
  { top: '48%', delay: '-11s', dur: '20s', size: 40 },
  { top: '70%', delay: '-3s', dur: '27s', size: 42 },
  { top: '84%', delay: '-15s', dur: '22s', size: 42 },
]

export function Atmosphere() {
  return (
    <>
      <svg className="contours" aria-hidden="true" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 900">
        <defs>
          <filter id="warp" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.006" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="140" />
          </filter>
        </defs>
        <g filter="url(#warp)" fill="none" stroke="currentColor" strokeWidth="1.4">
          {Array.from({ length: 16 }, (_, i) => (
            <ellipse key={i} cx="820" cy="360" rx={40 + i * 46} ry={26 + i * 34} />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <ellipse key={`b${i}`} cx="200" cy="720" rx={30 + i * 42} ry={20 + i * 30} />
          ))}
        </g>
      </svg>
      <div className="bats" aria-hidden="true">
        {bats.map((b, i) => (
          <svg
            key={i}
            className="bat"
            viewBox="0 0 64 32"
            style={{ top: b.top, width: b.size, animationDelay: b.delay, animationDuration: b.dur }}
          >
            <path
              className="bat-body"
              d="M32 10c2 0 3 2 4 4 3-3 7-6 14-6 4 0 9 2 14 6-5-1-8 0-10 4-2 1-4 3-4 6-3-3-5-3-8-1-2-2-3-4-5-4l-2 6-2-6c-2 0-3 2-5 4-3-2-5-2-8 1 0-3-2-5-4-6-2-4-5-5-10-4 5-4 10-6 14-6 7 0 11 3 14 6 1-2 2-4 4-4z"
              fill="currentColor" stroke="#e4d2ff" strokeWidth="1"
            />
          </svg>
        ))}
      </div>
    </>
  )
}
