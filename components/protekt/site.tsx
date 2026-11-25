import { Hero } from './hero'
import { IntroVideoSection } from './intro-video'
import { AboutSection, ServicesSection, WhyProtektSection } from './intro-sections'
import { ContactCta, Footer } from './editorial'
import { ProjectsSection } from './solution-sections'
import { ContactModalProvider } from './contact-modal'
import { SiteMotion } from './site-motion'
import { SupportChat } from './support-chat'

export function ConstrutelSite() {
  return (
    <ContactModalProvider>
      <SiteMotion>
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
      </SiteMotion>
      <SupportChat />
    </ContactModalProvider>
  )
}
