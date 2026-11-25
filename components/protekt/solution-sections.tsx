import { ArrowUpRight } from 'lucide-react'
import { Carousel } from './carousel'
import { PhotoReveal } from './photo-reveal'
import { ContactTrigger } from './contact-modal'

const projects = [
  {
    title: 'Torres & estações',
    type: 'Fast deployment · Green field',
    description: 'Desenho, fornecimento e implementação de estações — desde soluções de fast deployment a projectos green field standard.',
    image: '/protekt/construtel-tower.webp',
    alt: 'Engenheiros angolanos a inspeccionar uma torre de telecomunicações e a sua cabine técnica',
  },
  {
    title: 'Cabines técnicas & rádio',
    type: 'Rádio · Micro-ondas · WiMAX',
    description: 'Cabines, shelters e instalação de sistemas de rádio e micro-ondas, integrados como uma solução chave-na-mão.',
    image: '/protekt/construtel-radio.webp',
    alt: 'Técnicos angolanos a instalar uma antena de rádio micro-ondas numa estação',
  },
  {
    title: 'Fibra óptica',
    type: 'Redes de acesso · Backbone FO',
    description: 'Construção de redes de acesso e backbone — da abertura de vala às caixas de visita, fusões e terminações em ODF.',
    image: '/protekt/construtel-fiber.webp',
    alt: 'Técnicos angolanos a instalar cabos de fibra óptica numa rede de acesso',
  },
  {
    title: 'Centros de dados',
    type: 'Desenho modular · Sala técnica',
    description: 'Desenho, fornecimento e implementação de centros de dados modulares, da infraestrutura de suporte à sala operacional.',
    image: '/protekt/construtel-datacenter.webp',
    alt: 'Engenheiros angolanos a analisar cablagem estruturada num centro de dados modular',
  },
]

export function ProjectsSection() {
  return (
    <section className="projects-section section-space" id="projects">
      <div className="shell">
        <div className="section-heading section-heading-split section-heading-light" data-gsap-stagger="true">
          <div data-gsap-item="true"><p className="eyebrow"><span className="eyebrow-dot" /> Portfólio de projectos</p><h2>Infraestruturas preparadas para ligar pessoas e negócios.</h2></div>
          <p className="projects-intro" data-gsap-item="true">Soluções dimensionadas ao terreno, ao prazo e aos requisitos de cada cliente.</p>
        </div>
        <Carousel
          className="project-carousel"
          label="Áreas do portfólio de projectos"
          items={projects.map((project, index) => (
            <article className="project-card" data-gsap-item="true" key={project.title}>
              <PhotoReveal className="project-photo">
                <img src={project.image} alt={project.alt} loading="lazy" />
              </PhotoReveal>
              <div className="project-card-shade" aria-hidden="true" />
              <span className="project-number">0{index + 1}</span>
              <div className="project-caption">
                <div><small>{project.type}</small><h3>{project.title}</h3><p>{project.description}</p></div>
                <ContactTrigger aria-label={`Falar connosco sobre ${project.title}`} className="project-contact-trigger" service={project.title}><ArrowUpRight aria-hidden="true" size={19} /></ContactTrigger>
              </div>
            </article>
          ))}
        />
      </div>
    </section>
  )
}
