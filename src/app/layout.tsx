'use client'

import { Poppins } from 'next/font/google'
import { type ReactNode } from 'react'
import { Providers } from './providers'

const PoppinsFont = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={PoppinsFont.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
