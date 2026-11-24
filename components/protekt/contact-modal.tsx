'use client'

import { createContext, useCallback, useContext, useRef, useState, type ButtonHTMLAttributes, type FormEvent, type ReactNode } from 'react'
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react'

const contactAddress = 'geral@construtel.co.ao'
const contactServices = [
  'Produtos',
  'Desenho & engenharia',
  'Implementação',
  'Torres & estações',
  'Cabines técnicas & rádio',
  'Fibra óptica',
  'Centros de dados',
  'Outro',
]

type ContactModalContextValue = (service?: string) => void

const ContactModalContext = createContext<ContactModalContextValue | null>(null)

type ContactModalProviderProps = {
  children: ReactNode
}

export function ContactModalProvider({ children }: ContactModalProviderProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [selectedService, setSelectedService] = useState('')
  const [mailtoHref, setMailtoHref] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const openContact = useCallback((service?: string) => {
    setSelectedService(contactServices.includes(service ?? '') ? service ?? '' : '')
    setMailtoHref('')
    setSubmitted(false)
    if (!dialogRef.current?.open) dialogRef.current?.showModal()
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const service = String(formData.get('service') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const subject = `Pedido de contacto — ${service}`
    const body = [
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Telefone: ${phone || 'Não indicado'}`,
      `Serviço: ${service}`,
      '',
      'Mensagem:',
      message,
    ].join('\n')
    const nextMailtoHref = `mailto:${contactAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setMailtoHref(nextMailtoHref)
    setSubmitted(true)
    window.location.href = nextMailtoHref
  }

  return (
    <ContactModalContext.Provider value={openContact}>
      {children}
      <dialog
        aria-labelledby="contact-dialog-title"
        aria-describedby="contact-dialog-description"
        className="contact-dialog"
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
      >
        <div className="contact-dialog-panel">
          <button
            aria-label="Fechar formulário de contacto"
            className="contact-dialog-close"
            onClick={() => dialogRef.current?.close()}
            type="button"
          >
            <X aria-hidden="true" size={20} />
          </button>
          <p className="eyebrow"><span className="eyebrow-dot" /> Novo pedido</p>
          <h2 className="contact-dialog-title" id="contact-dialog-title">Vamos falar sobre o seu projecto.</h2>
          <p className="contact-dialog-description" id="contact-dialog-description">
            Conte-nos o que precisa. A sua mensagem será preparada no aplicativo de e-mail para envio a {contactAddress}.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-grid">
              <label className="contact-field">
                <span className="contact-field-label">Nome completo <span className="contact-required" aria-hidden="true">*</span></span>
                <input autoComplete="name" maxLength={120} name="name" placeholder="O seu nome" required />
              </label>
              <label className="contact-field">
                <span className="contact-field-label">E-mail <span className="contact-required" aria-hidden="true">*</span></span>
                <input autoComplete="email" maxLength={254} name="email" placeholder="nome@empresa.com" required type="email" />
              </label>
              <label className="contact-field">
                <span className="contact-field-label">Telefone <span className="contact-optional">Opcional</span></span>
                <input autoComplete="tel" maxLength={40} name="phone" placeholder="+244" type="tel" />
              </label>
              <label className="contact-field">
                <span className="contact-field-label">Serviço pretendido <span className="contact-required" aria-hidden="true">*</span></span>
                <select name="service" onChange={(event) => setSelectedService(event.target.value)} required value={selectedService}>
                  <option disabled value="">Seleccione um serviço</option>
                  {contactServices.map((service) => <option key={service} value={service}>{service}</option>)}
                </select>
              </label>
              <label className="contact-field contact-field-full">
                <span className="contact-field-label">A sua mensagem <span className="contact-required" aria-hidden="true">*</span></span>
                <textarea maxLength={3000} name="message" placeholder="Descreva brevemente o projecto ou a necessidade…" required rows={4} />
              </label>
            </div>

            <div className="contact-form-footer">
              <p>Os dados não ficam guardados neste site. O envio é concluído no seu aplicativo de e-mail.</p>
              <button className="button button-primary contact-submit" type="submit">
                Preparar pedido <ArrowUpRight aria-hidden="true" size={17} />
              </button>
            </div>
          </form>

          {submitted && (
            <div className="contact-submit-status" role="status">
              <CheckCircle2 aria-hidden="true" size={20} />
              <p>A mensagem foi preparada. Confirme o envio na aplicação de e-mail que abrir. Se não abrir, <a href={mailtoHref}>clique aqui para abrir o pedido.</a></p>
            </div>
          )}
        </div>
      </dialog>
    </ContactModalContext.Provider>
  )
}

type ContactTriggerProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  service?: string
}

export function ContactTrigger({ children, className, onClick, service, ...buttonProps }: ContactTriggerProps) {
  const openContact = useContext(ContactModalContext)
  if (!openContact) throw new Error('ContactTrigger must be rendered inside ContactModalProvider.')

  return (
    <button
      {...buttonProps}
      aria-haspopup="dialog"
      className={['contact-trigger', className].filter(Boolean).join(' ')}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) openContact(service)
      }}
      type="button"
    >
      {children}
    </button>
  )
}
