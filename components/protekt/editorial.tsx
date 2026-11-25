import { ArrowUpRight, Mail, MapPin, Phone, Globe2, ArrowRight } from 'lucide-react'
import { ContactTrigger } from './contact-modal'

const nextSteps = [
  'Reunião de âmbito e requisitos do projecto',
  'Levantamento técnico (site survey) e negociação de espaços',
  'Proposta técnico-comercial chave-na-mão',
]

export function ContactCta() {
  return (
    <section className="contact-section section-space" id="contact">
      <div className="shell">
        <div className="contact-heading" data-gsap-stagger="true">
          <div data-gsap-item="true"><p className="eyebrow"><span className="eyebrow-dot" /> Fale connosco</p><h2 id="contact-title">Vamos desenhar a infraestrutura certa para o seu projecto.</h2></div>
          <ContactTrigger className="button button-primary" data-gsap-item="true">Solicitar contacto <ArrowUpRight aria-hidden="true" size={17} /></ContactTrigger>
        </div>

        <div className="contact-grid" aria-labelledby="contact-title" data-gsap-stagger="true">
          <div className="contact-card" data-gsap-item="true">
            <p className="contact-card-label">Construtel Serviços, Limitada</p>
            <div className="contact-item"><MapPin aria-hidden="true" size={20} /><div><strong>Morada</strong><address>Edifício da Unta, Coqueiro<br />Rua Rainha Gingas<br />Luanda, República de Angola</address></div></div>
            <div className="contact-item"><Phone aria-hidden="true" size={20} /><div><strong>Telefone</strong><a href="tel:+244923690124">+244 923 690 124</a><a href="tel:+244946608395">+244 946 608 395</a></div></div>
            <div className="contact-item"><Mail aria-hidden="true" size={20} /><div><strong>Email</strong><a href="mailto:geral@construtel.co.ao">geral@construtel.co.ao</a></div></div>
            <div className="contact-item"><Globe2 aria-hidden="true" size={20} /><div><strong>Website</strong><a href="https://www.construtel.co.ao" target="_blank" rel="noreferrer">www.construtel.co.ao <ArrowUpRight aria-hidden="true" size={13} /></a></div></div>
            <p className="contact-tax">NIF: 5417042986</p>
          </div>

          <div className="next-steps-card" data-gsap-item="true">
            <p className="eyebrow"><span className="eyebrow-dot" /> Próximos passos</p>
            <h3>Começamos por compreender o que precisa.</h3>
            <ol>
              {nextSteps.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}
            </ol>
            <ContactTrigger className="text-link">Iniciar conversa <ArrowRight aria-hidden="true" size={17} /></ContactTrigger>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div className="footer-brand-column">
            <a className="brand footer-brand" href="#home" aria-label="Construtel — voltar ao início"><span className="brand-mark"><img src="/protekt/construtel-logo-mark.png" alt="" /></span><span className="brand-copy"><strong>CONSTRUTEL</strong><small>Infraestruturas de telecomunicações</small></span></a>
            <p>Infraestruturas de telecomunicações. Desenho, fornecimento, implementação e manutenção em Angola.</p>
          </div>
          <div className="footer-column"><h2>Navegação</h2><a href="#about">Quem somos</a><a href="#services">Produtos & serviços</a><a href="#experience">Experiência & parceiros</a><a href="#projects">Portfólio de projectos</a><a href="#contact">Contactos</a></div>
          <div className="footer-column footer-contact"><h2>Contactos</h2><a href="tel:+244923690124">+244 923 690 124</a><a href="tel:+244946608395">+244 946 608 395</a><a href="mailto:geral@construtel.co.ao">geral@construtel.co.ao</a><a href="https://www.construtel.co.ao" target="_blank" rel="noreferrer">construtel.co.ao</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Construtel Serviços, Limitada.</span><span>Luanda, República de Angola · NIF 5417042986</span><a href="#home">Voltar ao início ↑</a></div>
      </div>
    </footer>
  )
}
