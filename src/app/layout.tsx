import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'
import '@/editable/theme/editable-global.css'

import { buildSiteMetadata } from '@/lib/seo'
import { getEditableBodyProps } from '@/editable/shell/editable-body'

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata()
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const body = getEditableBodyProps()

  return (
    <html lang="en">
      <body
        data-site-shell={body.dataSiteShell}
        data-motion-pack={body.dataMotionPack}
        className={body.className}
        style={body.style}
      >
        {children}
      </body>
    </html>
  )
}
