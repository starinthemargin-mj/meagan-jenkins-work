import { useCallback, useEffect, useRef, useState } from 'react'
import { slides } from '../content'
import { prefersReducedMotion } from '../hooks'

export function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const active = slides[index]

  const goTo = useCallback((i: number) => {
    const track = trackRef.current
    if (!track) return
    const next = (i + slides.length) % slides.length
    track.scrollTo({ left: next * track.clientWidth, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => setIndex(Math.round(track.scrollLeft / track.clientWidth))
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(index + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(index - 1)
    }
  }

  return (
    <div
      className={`carousel mode-${active.mode}`}
      role="group"
      aria-roledescription="carousel"
      aria-label="Photos of Meagan, from work to weekend"
      onKeyDown={onKeyDown}
    >
      <div className="carousel-top">
        <div className="mode-switch" aria-hidden="true">
          <span className={active.mode === 'work' ? 'on' : ''}>Work</span>
          <span className={active.mode === 'fun' ? 'on' : ''}>Off the clock</span>
        </div>
        <span className="counter" aria-live="polite">
          {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      <div className="frame">
        <div className="track" ref={trackRef} tabIndex={0} aria-label="Photo carousel, use arrow keys to change photo">
          {slides.map((s, i) => (
            <figure
              className={`slide ${s.fit}`}
              key={s.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${s.title}`}
            >
              {s.fit === 'contain' && <img className="slide-blur" src={s.src} alt="" aria-hidden="true" />}
              <img
                className="slide-img"
                src={s.src}
                alt={s.alt}
                style={{ objectPosition: s.position }}
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </figure>
          ))}
        </div>
        <button className="arrow arrow-prev" onClick={() => goTo(index - 1)} aria-label="Previous photo">
          ←
        </button>
        <button className="arrow arrow-next" onClick={() => goTo(index + 1)} aria-label="Next photo">
          →
        </button>
        <div className="slide-caption" key={index}>
          <b>{active.title}</b>
          <span>{active.caption}</span>
        </div>
      </div>

      <div className="dots">
        {slides.map((s, i) => (
          <button key={s.src} className={i === index ? 'on' : ''} aria-label={`Go to ${s.title}`} aria-current={i === index} onClick={() => goTo(i)} />
        ))}
      </div>
    </div>
  )
}
