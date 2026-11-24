'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type PhotoRevealProps = {
  children: ReactNode
  className?: string
}

export function PhotoReveal({ children, className = '' }: PhotoRevealProps) {
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = revealRef.current

    if (!element) return

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window) ||
      element.getBoundingClientRect().top < window.innerHeight * 0.92
    ) {
      element.dataset.revealState = 'visible'
      return
    }

    element.dataset.revealState = 'hidden'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.revealState = 'visible'
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={revealRef}
      className={`photo-reveal ${className}`.trim()}
      data-reveal-state="visible"
    >
      {children}
    </div>
  )
}
