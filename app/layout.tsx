import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Construtel — Infraestruturas de Telecomunicações',
  description: 'Desenho, fornecimento, implementação e manutenção de infraestruturas de telecomunicações em Angola. Soluções para torres, fibra óptica, rádio e centros de dados.',
  generator: 'Next.js',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Construtel — Infraestruturas de Telecomunicações',
    description: 'Desenho, fornecimento, implementação e manutenção de infraestruturas de telecomunicações em Angola.',
    locale: 'pt_AO',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1b2c3b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-AO">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
