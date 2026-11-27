import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Compass,
  DraftingCompass,
  Factory,
  RadioTower,
  Settings2,
} from 'lucide-react'
import { PhotoReveal } from './photo-reveal'
import { ContactTrigger } from './contact-modal'

const services = [
  {
    category: '01 · Oferta integrada',
    title: 'Produtos',
    description: 'Equipamento e infra-estrutura seleccionados para responder às necessidades de cada cliente.',
    image: '/protekt/construtel-tower.webp',
    imageAlt: 'Técnicos angolanos junto de uma torre e cabine de telecomunicações',
    icon: Boxes,
    items: ['Torres e cabines técnicas', 'Centros de comutação e data centres', 'Sistemas de energia e HVAC', 'Infra-estrutura de apoio a estações', 'Material RF, fibra óptica e soluções à medida'],
  },
  {
    category: '02 · Do desenho à solução',
    title: 'Desenho & engenharia',
    description: 'Engenharia multidisciplinar para projectos dimensionados ao terreno e ao prazo.',
    image: '/protekt/construtel-radio.webp',
    imageAlt: 'Engenheiros angolanos a instalar e alinhar equipamento de rádio numa estação',
    icon: DraftingCompass,
    items: ['Engenharia civil e estrutural', 'Engenharia mecânica e eléctrica', 'Engenharia electrónica', 'Rádio frequência', 'Desenho de redes de fibra óptica'],
  },
  {
    category: '03 · Chave-na-mão',
    title: 'Implementação',
    description: 'Gestão no terreno, instalação e comissionamento com controlo de qualidade.',
    image: '/protekt/construtel-fiber.webp',
    imageAlt: 'Técnicos angolanos a trabalhar na instalação de uma rede de fibra óptica',
    icon: Factory,
    items: ['Gestão de projectos e controlo de qualidade', 'Apoio logístico, fabricação e construção', 'Arvoramento e instalação', 'Testes e comissionamento', 'Site survey, negociação de espaços e backbone FO'],
  },
]

export function AboutSection() {
  return (
    <section className="about-section section-space" id="about">
      <div className="shell">
        <div className="about-heading" data-gsap-stagger="true">
          <div data-gsap-item="true">
            <p className="eyebrow"><span className="eyebrow-dot" /> Quem somos</p>
            <h2>Um parceiro angolano, de projecto à operação.</h2>
          </div>
          <span className="about-location" data-gsap-item="true"><BadgeCheck aria-hidden="true" size={19} /> Luanda, Angola</span>
        </div>

        <div className="about-grid">
          <div className="about-visual">
            <PhotoReveal className="about-main-reveal">
              <img className="about-main-image" src="/protekt/construtel-team.webp" alt="Equipa angolana de engenharia de telecomunicações num local de instalação" loading="lazy" />
            </PhotoReveal>
            <div className="about-photo-badge">
              <RadioTower aria-hidden="true" size={23} />
              <span><strong>Construtel Serviços, Limitada</strong><small>Infraestruturas de telecomunicações</small></span>
            </div>
          </div>
          <div className="about-copy" data-gsap-reveal="true">
            <p className="eyebrow"><span className="eyebrow-dot" /> Engenharia com visão integrada</p>
            <h3>Tecnologia, engenharia e implementação num só parceiro.</h3>
            <p className="body-copy">
              A Construtel é uma empresa de direito angolano criada para apoiar profissionalmente as indústrias tecnológicas, com particular incidência nas telecomunicações. Fornecemos produtos e equipamentos de infra-estrutura, assegurando a sua montagem, integração e manutenção com elevados padrões de qualidade.
            </p>
            <p className="body-copy about-secondary-copy">
              Preparamos o rollout da infraestrutura específica de cada cliente, combinando produto, engenharia e implementação — sempre com as suas necessidades como ponto de partida.
            </p>
            <a className="text-link" href="#services">Conheça a nossa oferta <ArrowRight aria-hidden="true" size={17} /></a>
          </div>
        </div>

        <div className="purpose-grid" aria-label="Visão e missão da Construtel" data-gsap-stagger="true">
          <article className="purpose-card purpose-card-vision" aria-labelledby="purpose-vision-title" data-gsap-item="true">
            <div className="purpose-card-label"><span>01 · Direcção</span><Compass aria-hidden="true" size={21} /></div>
            <h3 id="purpose-vision-title">Visão</h3>
            <p>Ser uma empresa de referência no mercado angolano das telecomunicações, reconhecida pela excelência na prestação de serviços, inovação tecnológica, eficiência operacional, qualidade das suas soluções e compromisso com os clientes, contribuindo para o desenvolvimento das infra-estruturas de telecomunicações em Angola.</p>
          </article>
          <article className="purpose-card purpose-card-mission" aria-labelledby="purpose-mission-title" data-gsap-item="true">
            <div className="purpose-card-label"><span>02 · Compromisso</span><RadioTower aria-hidden="true" size={21} /></div>
            <h3 id="purpose-mission-title">Missão</h3>
            <p>Prestar serviços especializados no sector das telecomunicações, através de soluções técnicas inovadoras, eficientes e de elevada qualidade, assegurando a manutenção, construção, instalação, gestão e optimização de infra-estruturas e equipamentos, com profissionais qualificados, responsabilidade, segurança e compromisso com a satisfação dos clientes.</p>
            <p>A nossa missão é criar valor para os clientes, colaboradores e parceiros, garantindo resultados sustentáveis, crescimento empresarial e uma contribuição activa para o desenvolvimento tecnológico de Angola.</p>
          </article>
        </div>

        <div className="about-metrics" aria-label="Construtel em resumo" data-gsap-stagger="true">
          <article className="metric-card" data-gsap-item="true"><strong>4</strong><span>parceiros certificados pela UNITEL, SA</span></article>
          <article className="metric-card" data-gsap-item="true"><strong>10+</strong><span>marcas internacionais de referência entre os clientes</span></article>
          <article className="metric-card" data-gsap-item="true"><strong>360°</strong><span>ciclo completo: produto, engenharia e implementação</span></article>
        </div>
      </div>
    </section>
  )
}

export function ServicesSection() {
  return (
    <section className="services-section section-space" id="services">
      <div className="shell">
        <div className="section-heading section-heading-centered" data-gsap-reveal="true">
          <p className="eyebrow"><span className="eyebrow-dot" /> O que fazemos</p>
          <h2>Uma oferta integrada para todo o ciclo da infraestrutura.</h2>
          <p className="body-copy">Produtos, engenharia e implementação que se complementam — do desenho ao comissionamento.</p>
        </div>
        <div className="service-grid" data-gsap-stagger="true">
          {services.map(({ category, title, description, image, imageAlt, icon: Icon, items }) => (
            <article className="service-card" data-gsap-item="true" key={title}>
              <PhotoReveal className="service-photo">
                <img src={image} alt={imageAlt} loading="lazy" />
              </PhotoReveal>
              <div className="service-card-content">
                <div className="service-card-topline"><span className="service-card-icon"><Icon aria-hidden="true" size={21} /></span><span className="service-category">{category}</span></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul>
                  {items.map((item) => <li key={item}><span aria-hidden="true" />{item}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <ContactTrigger className="services-contact-link">Vamos falar sobre o seu projecto <ArrowUpRight aria-hidden="true" size={17} /></ContactTrigger>
      </div>
    </section>
  )
}

const partners = ['MOVICEL', 'ALCATEL-LUCENT', 'MULTITEL', 'ACS', 'STARTEL', 'AFRICELL', 'ANGOLA TELECOM', 'CERAGON', 'TELRAD', 'ERICSSON']

export function WhyProtektSection() {
  return (
    <section className="experience-section section-space" id="experience">
      <div className="shell">
        <div className="experience-grid">
          <div className="experience-copy" data-gsap-reveal="true">
            <p className="eyebrow"><span className="eyebrow-dot" /> Experiência & parceiros</p>
            <h2>Experiência no terreno. Parcerias que ampliam possibilidades.</h2>
            <p className="experience-description">
              A Construtel implementa projectos de grande dimensão com parceiros tecnológicos e uma equipa especializada. Mantemos relações em diferentes mercados para identificar a melhor relação preço/qualidade para cada cliente.
            </p>
            <div className="unitel-highlight">
              <span className="unitel-mark"><RadioTower aria-hidden="true" size={24} /></span>
              <div><span>Parceiro certificado</span><strong>UNITEL, SA</strong><p>Um dos quatro parceiros aprovados para soluções chave-na-mão de estações de telecomunicações.</p></div>
            </div>
          </div>
          <div className="experience-visual">
            <PhotoReveal className="experience-photo">
              <img src="/protekt/construtel-team.webp" alt="Equipa de engenharia angolana reunida num projecto de telecomunicações" loading="lazy" />
            </PhotoReveal>
            <div className="experience-photo-note"><Settings2 aria-hidden="true" size={19} /><span>Equipa especializada<small>Da concepção à manutenção</small></span></div>
          </div>
        </div>
        <div className="partner-panel">
          <div className="partner-panel-heading" data-gsap-reveal="true"><span>Clientes & parceiros</span><span>Marcas de referência no sector</span></div>
          <ul className="partner-list" aria-label="Clientes e parceiros da Construtel" data-gsap-stagger="true">
            {partners.map((partner) => <li data-gsap-item="true" key={partner}>{partner}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
