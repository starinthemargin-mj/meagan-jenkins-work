import { useEffect, useRef, useState } from 'react'

export type Theme = 'trail' | 'spooky'

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('theme')
    const value = fromUrl ?? localStorage.getItem('meagan-theme')
    return value === 'spooky' ? 'spooky' : 'trail'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('meagan-theme', theme)
  }, [theme])

  return [theme, () => setTheme((t) => (t === 'trail' ? 'spooky' : 'trail'))] as const
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return progress
}

export function useReveal<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, shown] as const
}
