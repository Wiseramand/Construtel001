import { Hero } from './hero'
import { IntroVideoSection } from './intro-video'
import { AboutSection, ServicesSection, WhyProtektSection } from './intro-sections'
import { ContactCta, Footer } from './editorial'
import { ProjectsSection } from './solution-sections'
import { ContactModalProvider } from './contact-modal'

export function ConstrutelSite() {
  return (
    <ContactModalProvider>
      <div className="construtel-site">
        <Hero />
        <main>
          <AboutSection />
          <ServicesSection />
          <WhyProtektSection />
          <IntroVideoSection />
          <ProjectsSection />
          <ContactCta />
        </main>
        <Footer />
      </div>
    </ContactModalProvider>
  )
}
