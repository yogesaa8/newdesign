import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useHashScroll() {
  const { hash } = useLocation()

  useLayoutEffect(() => {
    if (!hash) return undefined
    const id = decodeURIComponent(hash.slice(1))
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [hash])
}
