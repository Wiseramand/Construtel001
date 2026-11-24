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
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <a className="brand" href="#home" aria-label="Construtel — início">
          <span className="brand-mark"><img src="/protekt/construtel-logo-mark.png" alt="" /></span>
          <span className="brand-copy"><strong>CONSTRUTEL</strong><small>Infraestruturas de telecomunicações</small></span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map((link) => (
            <a className="nav-link" href={link.href} key={link.label}>{link.label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <ContactTrigger className="button button-primary header-contact">
            Fale connosco <ArrowUpRight aria-hidden="true" size={16} />
          </ContactTrigger>
          <details className="mobile-nav">
            <summary aria-label="Abrir menu de navegação">
              <Menu aria-hidden="true" size={25} />
            </summary>
            <nav className="mobile-nav-panel" aria-label="Navegação móvel">
              {links.map((link) => (
                <a href={link.href} key={link.label}>
                  {link.label}<ChevronDown aria-hidden="true" size={15} />
                </a>
              ))}
              <a className="mobile-nav-contact" href="tel:+244923690124">
                Ligar +244 923 690 124<ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
