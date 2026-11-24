'use client'

import { useRef } from 'react'
import { ArrowUpRight, Play, X } from 'lucide-react'
import { PhotoReveal } from './photo-reveal'

export function IntroVideoSection() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  function openVideo() {
    dialogRef.current?.showModal()
    void videoRef.current?.play().catch(() => {})
  }

  function closeVideo() {
    videoRef.current?.pause()
    if (videoRef.current) videoRef.current.currentTime = 0
  }

  return (
    <section className="intro-video-section section-space" aria-labelledby="intro-video-title">
      <div className="shell">
        <div className="intro-video-card">
          <PhotoReveal className="intro-video-photo">
            <img src="/protekt/construtel-hero.webp" alt="" loading="lazy" />
          </PhotoReveal>
          <div className="intro-video-shade" aria-hidden="true" />
          <div className="intro-video-content">
            <p className="eyebrow"><span className="eyebrow-dot" /> Do terreno à operação</p>
            <h2 id="intro-video-title">Infraestruturas construídas à medida de cada desafio.</h2>
            <p>Um olhar sobre as equipas, a engenharia e as soluções que mantêm Angola ligada.</p>
            <a className="text-link intro-video-link" href="#projects">Ver áreas de projecto <ArrowUpRight aria-hidden="true" size={16} /></a>
          </div>
          <button className="intro-video-play" type="button" onClick={openVideo} aria-label="Reproduzir apresentação visual da Construtel">
            <Play aria-hidden="true" size={23} fill="currentColor" />
          </button>
        </div>
      </div>

      <dialog
        className="video-dialog"
        ref={dialogRef}
        aria-label="Apresentação visual da Construtel"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close()
        }}
        onClose={closeVideo}
      >
        <div className="video-dialog-inner">
          <button className="video-dialog-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Fechar apresentação">
            <X aria-hidden="true" size={21} />
          </button>
          <video ref={videoRef} controls playsInline preload="none" poster="/protekt/construtel-hero.webp" aria-label="Apresentação visual de equipas e projectos de telecomunicações">
            <source src="/protekt/construtel-showreel.mp4" type="video/mp4" />
            O seu navegador não suporta a reprodução de vídeo.
          </video>
        </div>
      </dialog>
    </section>
  )
}
