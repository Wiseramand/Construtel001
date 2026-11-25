'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown, Menu } from 'lucide-react'
import { ContactTrigger } from './contact-modal'

const links = [
  { label: 'Início', href: '#home' },
  { label: 'Quem somos', href: '#about' },
  { label: 'Serviços', href: '#services' },
  { label: 'Experiência', href: '#experience' },
  { label: 'Projectos', href: '#projects' },
  { label: 'Contactos', href: '#contact' },
]

export function Header() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const mobileNavRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section instanceof HTMLElement)

    if (sections.length === 0) return

    const updateActiveSection = () => {
      const headerOffset = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0
      const active = sections.reduce((current, section) => (
        section.getBoundingClientRect().top <= headerOffset + 20 ? section : current
      ), sections[0])

      setActiveSection((current) => current === active.id ? current : active.id)
    }

    let animationFrame = 0
    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  function closeMobileNav() {
    if (mobileNavRef.current) mobileNavRef.current.open = false
    setIsMobileNavOpen(false)
  }

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <a className="brand" href="#home" aria-label="Construtel — início" onClick={closeMobileNav}>
          <span className="brand-mark"><img src="/protekt/construtel-logo-mark.png" alt="" /></span>
          <span className="brand-copy"><strong>CONSTRUTEL</strong><small>Infraestruturas de telecomunicações</small></span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map((link) => (
            <a
              aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
              className="nav-link"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <ContactTrigger className="button button-primary header-contact">
            Fale connosco <ArrowUpRight aria-hidden="true" size={16} />
          </ContactTrigger>
          <details
            className="mobile-nav"
            onToggle={(event) => setIsMobileNavOpen(event.currentTarget.open)}
            ref={mobileNavRef}
          >
            <summary
              aria-controls="mobile-navigation-panel"
              aria-expanded={isMobileNavOpen}
              aria-label={isMobileNavOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              <Menu aria-hidden="true" size={25} />
            </summary>
            <nav className="mobile-nav-panel" id="mobile-navigation-panel" aria-label="Navegação móvel">
              {links.map((link) => (
                <a
                  aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                  href={link.href}
                  key={link.label}
                  onClick={closeMobileNav}
                >
                  {link.label}<ChevronDown aria-hidden="true" size={15} />
                </a>
              ))}
              <a className="mobile-nav-contact" href="tel:+244923690124" onClick={closeMobileNav}>
                Ligar +244 923 690 124<ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
