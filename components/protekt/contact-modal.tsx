'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ButtonHTMLAttributes, type FormEvent, type ReactNode } from 'react'
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react'

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
  const formRef = useRef<HTMLFormElement>(null)
  const submissionTimeoutRef = useRef<number | null>(null)
  const [selectedService, setSelectedService] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reference, setReference] = useState('')

  const openContact = useCallback((service?: string) => {
    if (submissionTimeoutRef.current !== null) window.clearTimeout(submissionTimeoutRef.current)
    submissionTimeoutRef.current = null
    formRef.current?.reset()
    setSelectedService(contactServices.includes(service ?? '') ? service ?? '' : '')
    setIsSubmitting(false)
    setReference('')
    if (!dialogRef.current?.open) dialogRef.current?.showModal()
  }, [])

  useEffect(() => () => {
    if (submissionTimeoutRef.current !== null) window.clearTimeout(submissionTimeoutRef.current)
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    const form = event.currentTarget
    setIsSubmitting(true)
    setReference('')
    submissionTimeoutRef.current = window.setTimeout(() => {
      const date = new Date().toISOString().slice(0, 10).replaceAll('-', '')
      const suffix = window.crypto.randomUUID().slice(0, 8).toUpperCase()

      form.reset()
      setSelectedService('')
      setReference(`CT-DEMO-${date}-${suffix}`)
      setIsSubmitting(false)
      submissionTimeoutRef.current = null
    }, 750)
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
        onClose={() => {
          if (submissionTimeoutRef.current !== null) window.clearTimeout(submissionTimeoutRef.current)
          submissionTimeoutRef.current = null
          formRef.current?.reset()
          setSelectedService('')
          setIsSubmitting(false)
          setReference('')
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
            Preencha os campos para experimentar o formulário. Esta é uma demonstração: os dados não são enviados nem guardados.
          </p>

          <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
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
              <p>Demonstração: os dados não são enviados por e-mail nem guardados.</p>
              <button aria-busy={isSubmitting} className="button button-primary contact-submit" disabled={isSubmitting} type="submit">
                {isSubmitting ? <><span aria-hidden="true" className="contact-spinner" /> A processar…</> : <>Enviar pedido <ArrowUpRight aria-hidden="true" size={17} /></>}
              </button>
            </div>
          </form>

          {isSubmitting && (
            <div aria-live="polite" className="contact-submit-status contact-processing-status" role="status">
              <span aria-hidden="true" className="contact-spinner" />
              <p>A registar pedido de demonstração…</p>
            </div>
          )}

          {reference && (
            <div aria-live="polite" className="contact-submit-status" role="status">
              <CheckCircle2 aria-hidden="true" size={20} />
              <p>Pedido recebido com sucesso! Obrigado pelo seu contacto. A solicitação foi registada para efeitos de demonstração.<strong>Referência de demonstração: {reference}</strong></p>
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
