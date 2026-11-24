'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'

type CarouselProps = {
  items: ReactNode[]
  label: string
  className?: string
}

export function Carousel({ items, label, className = '' }: CarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const itemCount = items.length
  const slides = itemCount > 1 ? [items[itemCount - 1], ...items, ...items.slice(0, 3)] : items

  const getSlideOffset = useCallback((physicalIndex: number) => {
    const viewport = viewportRef.current
    const slide = trackRef.current?.children.item(physicalIndex)

    if (!viewport || !(slide instanceof HTMLElement)) return 0

    return slide.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft
  }, [])

  const goToPhysicalSlide = useCallback((physicalIndex: number, behavior: ScrollBehavior = 'smooth') => {
    const viewport = viewportRef.current

    if (!viewport) return

    viewport.scrollTo({ left: getSlideOffset(physicalIndex), behavior })
  }, [getSlideOffset])

  const goToSlide = useCallback((index: number) => {
    const nextIndex = (index + itemCount) % itemCount
    setActiveIndex(nextIndex)
    goToPhysicalSlide(itemCount > 1 ? nextIndex + 1 : nextIndex)
  }, [goToPhysicalSlide, itemCount])

  const moveBy = useCallback((direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + itemCount) % itemCount
    let physicalIndex = nextIndex + (itemCount > 1 ? 1 : 0)

    if (itemCount > 1 && direction === 1 && activeIndex === itemCount - 1) {
      physicalIndex = itemCount + 1
    } else if (itemCount > 1 && direction === -1 && activeIndex === 0) {
      physicalIndex = 0
    }

    setActiveIndex(nextIndex)
    goToPhysicalSlide(physicalIndex)
  }, [activeIndex, goToPhysicalSlide, itemCount])

  useEffect(() => {
    const viewport = viewportRef.current

    if (!viewport || itemCount < 2) return

    viewport.scrollLeft = getSlideOffset(1)

    const syncActiveSlide = () => {
      const track = trackRef.current
      const firstSlide = track?.children.item(0)
      const secondSlide = track?.children.item(1)

      if (!(firstSlide instanceof HTMLElement) || !(secondSlide instanceof HTMLElement)) return

      const step = secondSlide.getBoundingClientRect().left - firstSlide.getBoundingClientRect().left
      if (!step) return

      const physicalIndex = Math.round(viewport.scrollLeft / step)
      setActiveIndex((physicalIndex - 1 + itemCount) % itemCount)

      if (scrollTimeoutRef.current !== null) window.clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = window.setTimeout(() => {
        const settledIndex = Math.round(viewport.scrollLeft / step)
        const resetIndex = settledIndex === 0 ? itemCount : settledIndex === itemCount + 1 ? 1 : null

        if (resetIndex !== null) {
          const previousBehavior = viewport.style.scrollBehavior
          viewport.style.scrollBehavior = 'auto'
          viewport.scrollLeft = getSlideOffset(resetIndex)
          viewport.style.scrollBehavior = previousBehavior
        }
      }, 140)
    }

    viewport.addEventListener('scroll', syncActiveSlide, { passive: true })

    return () => {
      viewport.removeEventListener('scroll', syncActiveSlide)
      if (scrollTimeoutRef.current !== null) window.clearTimeout(scrollTimeoutRef.current)
    }
  }, [getSlideOffset, itemCount])

  useEffect(() => {
    if (itemCount < 2 || isPaused || isInteracting) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => moveBy(1), 5000)
    return () => window.clearInterval(interval)
  }, [isInteracting, isPaused, itemCount, moveBy])

  return (
    <div
      className={`carousel ${className}`.trim()}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={() => setIsInteracting(true)}
      onPointerLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsInteracting(false)
      }}
    >
      <div className="carousel-viewport" ref={viewportRef} aria-live="off">
        <div className="carousel-track" ref={trackRef}>
          {slides.map((item, physicalIndex) => {
            const isClone = itemCount > 1 && (physicalIndex === 0 || physicalIndex > itemCount)
            const logicalIndex = itemCount > 1 ? (physicalIndex - 1 + itemCount) % itemCount : 0

            return (
              <div
                className="carousel-slide"
                data-carousel-index={physicalIndex}
                role={isClone ? undefined : 'group'}
                aria-roledescription={isClone ? undefined : 'slide'}
                aria-label={isClone ? undefined : `${logicalIndex + 1} of ${itemCount}`}
                aria-hidden={isClone ? true : undefined}
                inert={isClone}
                key={`slide-${physicalIndex}`}
              >
                {item}
              </div>
            )
          })}
        </div>
      </div>

      {itemCount > 1 && (
        <div className="carousel-controls">
          <button className="carousel-arrow" type="button" onClick={() => moveBy(-1)} aria-label={`Previous ${label} slide`}>
            <ArrowLeft aria-hidden="true" size={17} />
          </button>
          <div className="carousel-pagination" aria-label={`Choose a ${label} slide`}>
            {items.map((_, index) => (
              <button
                type="button"
                key={`pagination-${index}`}
                className={activeIndex === index ? 'is-active' : ''}
                aria-label={`Go to slide ${index + 1} of ${itemCount}`}
                aria-pressed={activeIndex === index}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          <button className="carousel-arrow" type="button" onClick={() => moveBy(1)} aria-label={`Next ${label} slide`}>
            <ArrowRight aria-hidden="true" size={17} />
          </button>
          <button
            className="carousel-autoplay"
            type="button"
            onClick={() => {
              setIsPaused((paused) => !paused)
              setIsInteracting(false)
            }}
            aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
          >
            {isPaused ? <Play aria-hidden="true" size={15} /> : <Pause aria-hidden="true" size={15} />}
          </button>
        </div>
      )}
    </div>
  )
}
