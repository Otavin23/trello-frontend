'use client'

import { Noto_Sans } from 'next/font/google'
import { type ReactNode } from 'react'
import { Providers } from './providers'

const NotoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={NotoSans.className}>
      <head></head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
