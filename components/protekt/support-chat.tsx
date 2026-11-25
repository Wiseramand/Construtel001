'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, Bot, MessageCircle, Phone, Send, X } from 'lucide-react'
import { MessageScroller } from '@shadcn/react/message-scroller'
import { Bubble, BubbleContent } from '@/components/ui/bubble'
import { Message, MessageContent, MessageHeader } from '@/components/ui/message'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  handoff?: boolean
}

type ChatResponse = {
  reply?: unknown
  handoff?: unknown
}

const whatsappNumber = '244923690124'

function createWhatsAppHref(messages: ChatMessage[]) {
  const transcript = messages.slice(-8).map((message) => {
    const speaker = message.role === 'user' ? 'Cliente' : 'Assistente Construtel'
    return `${speaker}: ${message.content}`
  }).join('\n')
  const text = transcript
    ? `Olá, gostaria de falar com a equipa da Construtel.\n\n${transcript}`
    : 'Olá, gostaria de falar com a equipa da Construtel.'

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
}

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Olá! Sou o assistente virtual da Construtel. Posso esclarecer dúvidas sobre os nossos serviços e projectos. Se a questão exigir informação que não está no website, encaminho a conversa para um operador.',
    },
  ])
  const launcherRef = useRef<HTMLButtonElement>(null)
  const draftRef = useRef<HTMLTextAreaElement>(null)
  const whatsappHref = useMemo(() => createWhatsAppHref(messages), [messages])

  useEffect(() => {
    if (isOpen) draftRef.current?.focus()
  }, [isOpen])

  function closeChat() {
    setIsOpen(false)
    window.requestAnimationFrame(() => launcherRef.current?.focus())
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const content = draft.trim()
    if (!content || isLoading) return

    const userMessage: ChatMessage = {
      id: `user-${crypto.randomUUID()}`,
      role: 'user',
      content,
    }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setDraft('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/support-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.slice(-10).map(({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          })),
        }),
      })
      const data = (await response.json()) as ChatResponse
      if (typeof data.reply !== 'string') throw new Error('Invalid assistant response')

      setMessages((currentMessages) => [...currentMessages, {
        id: `assistant-${crypto.randomUUID()}`,
        role: 'assistant',
        content: data.reply as string,
        handoff: data.handoff === true,
      }])
    } catch {
      setMessages((currentMessages) => [...currentMessages, {
        id: `assistant-${crypto.randomUUID()}`,
        role: 'assistant',
        content: 'Não consegui responder automaticamente neste momento. Pode continuar pelo WhatsApp para falar directamente com um operador da Construtel.',
        handoff: true,
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isOpen && (
        <section
          aria-labelledby="support-chat-title"
          className="support-chat-panel"
          id="support-chat-panel"
          onKeyDown={(event) => {
            if (event.key === 'Escape') closeChat()
          }}
          role="dialog"
        >
          <header className="support-chat-header">
            <span className="support-chat-avatar"><Bot aria-hidden="true" size={20} /></span>
            <div className="support-chat-heading">
              <h2 id="support-chat-title">Assistente Construtel</h2>
              <p><span aria-hidden="true" className="support-chat-presence" /> Respostas automáticas</p>
            </div>
            <button aria-label="Fechar conversa" className="support-chat-close" onClick={closeChat} type="button">
              <X aria-hidden="true" size={19} />
            </button>
          </header>

          <MessageScroller.Provider autoScroll defaultScrollPosition="end">
            <MessageScroller.Root className="support-chat-scroller">
              <MessageScroller.Viewport
                aria-busy={isLoading}
                aria-label="Conversa com o assistente virtual da Construtel"
                aria-live="polite"
                className="support-chat-transcript"
                role="log"
              >
                <MessageScroller.Content className="support-chat-transcript-content">
                  {messages.map((message, index) => {
                    const align = message.role === 'user' ? 'end' : 'start'
                    return (
                      <MessageScroller.Item
                        className="support-chat-turn"
                        key={message.id}
                        messageId={message.id}
                        scrollAnchor={index === messages.length - 1}
                      >
                        <Message align={align} className="support-chat-message">
                          <MessageContent className="support-chat-message-content">
                            <MessageHeader className="support-chat-message-label">
                              {message.role === 'user' ? 'Você' : 'Assistente Construtel'}
                            </MessageHeader>
                            <Bubble align={align} className="support-chat-bubble" variant={message.role === 'user' ? 'default' : 'muted'}>
                              <BubbleContent className="support-chat-bubble-content">{message.content}</BubbleContent>
                            </Bubble>
                            {message.handoff && (
                              <a className="support-chat-handoff" href={whatsappHref} rel="noopener noreferrer" target="_blank">
                                Falar com um operador no WhatsApp <ArrowUpRight aria-hidden="true" size={15} />
                              </a>
                            )}
                          </MessageContent>
                        </Message>
                      </MessageScroller.Item>
                    )
                  })}
                  {isLoading && (
                    <MessageScroller.Item className="support-chat-turn" messageId="assistant-typing" scrollAnchor>
                      <Message align="start" className="support-chat-message">
                        <MessageContent className="support-chat-message-content">
                          <MessageHeader className="support-chat-message-label">Assistente Construtel</MessageHeader>
                          <Bubble align="start" className="support-chat-bubble" variant="muted">
                            <BubbleContent className="support-chat-bubble-content">A preparar resposta…</BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScroller.Item>
                  )}
                </MessageScroller.Content>
              </MessageScroller.Viewport>
            </MessageScroller.Root>
          </MessageScroller.Provider>

          <form aria-label="Enviar uma pergunta à Construtel" className="support-chat-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="support-chat-draft">Escreva a sua pergunta</label>
            <div className="support-chat-compose">
              <textarea
                disabled={isLoading}
                id="support-chat-draft"
                maxLength={1200}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Escreva a sua pergunta…"
                ref={draftRef}
                rows={2}
                value={draft}
              />
              <button aria-label="Enviar mensagem" className="support-chat-send" disabled={!draft.trim() || isLoading} type="submit">
                <Send aria-hidden="true" size={17} />
              </button>
            </div>
            <p className="support-chat-disclaimer">Assistente com IA, baseado no website. Evite partilhar dados sensíveis.</p>
          </form>
        </section>
      )}

      <div className="support-chat-dock">
        <button
          aria-controls={isOpen ? 'support-chat-panel' : undefined}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={isOpen ? 'Fechar chat da Construtel' : 'Abrir chat da Construtel'}
          className="support-chat-launcher"
          onClick={() => setIsOpen((open) => !open)}
          ref={launcherRef}
          type="button"
        >
          {isOpen ? <X aria-hidden="true" size={22} /> : <MessageCircle aria-hidden="true" size={23} />}
        </button>
        <a aria-label="Conversar directamente pelo WhatsApp" className="support-chat-whatsapp" href={whatsappHref} rel="noopener noreferrer" target="_blank" title="WhatsApp da Construtel">
          <Phone aria-hidden="true" size={21} />
        </a>
      </div>
    </>
  )
}
