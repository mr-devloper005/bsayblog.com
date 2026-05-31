import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'
import '@/editable/theme/editable-global.css'

import { buildSiteMetadata } from '@/lib/seo'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { editableRootStyle } from '@/editable/layouts/design-contract'

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata()
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const { recipe, brandPack } = getFactoryState()

  return (
    <html lang="en">
      <body
        data-site-shell={recipe.homeLayout}
        data-motion-pack={recipe.motionPack}
        className={`${brandPack.bodyClassName} ${brandPack.fontClassName} ${brandPack.paletteClassName}`}
        style={editableRootStyle}
      >
        {children}
      </body>
    </html>
  )
}
