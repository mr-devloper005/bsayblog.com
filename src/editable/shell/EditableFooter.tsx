import Link from 'next/link'
import type { CSSProperties } from 'react'
import { globalContent } from '@/editable/content/global.content'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#0b0b0b', '--editable-footer-text': '#ffffff' } as CSSProperties
  const year = new Date().getFullYear()

  return (
    <footer style={footerVars} className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-4">
            {globalContent.site.logo ? (
              <img
                src={globalContent.site.logo}
                alt={`${globalContent.site.displayName} logo`}
                className="h-14 w-14 min-w-[3.5rem] rounded-sm border border-white/20 bg-white/95 object-contain"
              />
            ) : null}
            <div>
              <span className="block text-4xl font-black uppercase leading-none">{globalContent.site.displayName}</span>
              <span className="block text-lg italic text-white/40">{globalContent.footer.tagline}</span>
            </div>
          </Link>
          <p className="mt-6 max-w-sm text-sm font-medium leading-7 text-white/76">{globalContent.footer.description}</p>
        </div>

        {globalContent.footer.columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-[11px] font-black uppercase tracking-[0.16em] text-white/55">{column.title}</h3>
            <div className="mt-5 grid gap-3">
              {column.links.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-black text-white/90 hover:text-[var(--slot4-accent-fill)]">{link.label}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[var(--editable-container)] flex-col gap-3 border-t border-white/12 px-4 py-5 text-xs font-bold text-white/45 sm:px-6 md:flex-row md:items-center md:justify-between">
        <span>© {year} {globalContent.site.name}. All rights reserved.</span>
        <span>{globalContent.footer.bottomNote}</span>
      </div>
    </footer>
  )
}
