import { ArrowDown, ArrowUpRight, Boxes, RadioTower, Workflow } from 'lucide-react'
import { Header } from './header'
import { ContactTrigger } from './contact-modal'

const proofPoints = [
  { icon: RadioTower, value: '4', label: 'parceiros certificados UNITEL, SA' },
  { icon: Boxes, value: '10+', label: 'marcas internacionais de referência' },
  { icon: Workflow, value: '360°', label: 'do produto à implementação' },
]

export function Hero() {
  return (
    <section className="hero-section" id="home">
      <img className="hero-image" src="/protekt/construtel-hero.webp" alt="" fetchPriority="high" />
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/protekt/construtel-hero.webp"
        aria-hidden="true"
      >
        <source src="/protekt/construtel-showreel.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" aria-hidden="true" />
      <Header />

      <div className="hero-content shell">
        <div className="hero-copy">
          <p className="hero-eyebrow"><span className="eyebrow-dot" /> Infraestruturas de telecomunicações · Angola</p>
          <h1>
            Infra-estruturas que ligam o <span>futuro.</span>
          </h1>
          <p className="hero-description">
            Desenho, fornecimento, implementação e manutenção — um parceiro para todo o ciclo da sua infraestrutura de telecomunicações.
          </p>
          <div className="hero-buttons">
            <a className="button button-primary" href="#projects">
              Explorar projectos <ArrowUpRight aria-hidden="true" size={17} />
            </a>
            <ContactTrigger className="button button-glass">
              Fale connosco <ArrowUpRight aria-hidden="true" size={17} />
            </ContactTrigger>
          </div>
        </div>

        <div className="hero-proof" aria-label="Construtel em números">
          {proofPoints.map(({ icon: Icon, value, label }) => (
            <div className="hero-proof-item" key={label}>
              <span className="hero-proof-icon"><Icon aria-hidden="true" size={19} /></span>
              <span className="hero-proof-value">{value}</span>
              <span className="hero-proof-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Continuar para Quem somos">
        <ArrowDown aria-hidden="true" size={17} />
      </a>
    </section>
  )
}
