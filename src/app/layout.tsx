'use client'

import { Noto_Sans } from 'next/font/google'
import { Providers } from './providers'
import { type ReactNode } from 'react'

const PoppinsFont = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  hash: 'same-hash-on-server-and-client',
})

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={PoppinsFont.className}>
      <head>
        <meta name="description" content="Thullo plataform of cards"></meta>
        <link rel="icon" type="image/x-icon" href="../assets/Logo-small.svg"></link>
        <title>thullo</title>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
