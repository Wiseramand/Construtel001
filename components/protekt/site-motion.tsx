'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type SiteMotionProps = {
  children: ReactNode
}

gsap.registerPlugin(ScrollTrigger)

export function SiteMotion({ children }: SiteMotionProps) {
  const siteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const site = siteRef.current
    if (!site) return

    const media = gsap.matchMedia(site)

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      heroTimeline
        .fromTo('.hero-eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65 }, 0)
        .fromTo('.hero-copy h1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.08)
        .fromTo('.hero-description', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.22)
        .fromTo('.hero-buttons', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65 }, 0.38)
        .fromTo('.hero-proof-item', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, 0.58)

      site.querySelectorAll<HTMLElement>('[data-gsap-reveal]').forEach((target) => {
        gsap.fromTo(
          target,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            immediateRender: false,
            clearProps: 'opacity,visibility,transform',
            scrollTrigger: { trigger: target, start: 'top 86%', once: true },
          },
        )
      })

      site.querySelectorAll<HTMLElement>('[data-gsap-stagger]').forEach((group) => {
        const items = Array.from(group.querySelectorAll<HTMLElement>('[data-gsap-item]'))
        if (items.length === 0) return

        gsap.fromTo(
          items,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            immediateRender: false,
            clearProps: 'opacity,visibility,transform',
            scrollTrigger: { trigger: group, start: 'top 86%', once: true },
          },
        )
      })
    })

    return () => media.revert()
  }, [])

  return <div className="construtel-site" ref={siteRef}>{children}</div>
}
