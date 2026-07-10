'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Menu, Search, UserRound, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = {
    '--editable-nav-bg': '#ffffff',
    '--editable-nav-text': '#0d0d0d',
    '--editable-nav-active': '#ef2b2d',
    '--editable-nav-active-text': '#ffffff',
    '--editable-search-bg': '#ffffff',
    '--editable-border': 'rgba(13,13,13,0.12)',
    '--editable-container': '980px',
    '--editable-wide-container': '1180px',
  } as CSSProperties
  const navItems = useMemo(() => {
    const article = SITE_CONFIG.tasks.find((task) => task.enabled && task.key === 'article')
    const dynamic = article ? [{ label: article.label, href: article.route }] : []
    return [
      { label: 'Home', href: '/' },
      ...dynamic,
      { label: 'Search', href: '/search' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ]
  }, [])

  useEffect(() => {
    setHydrated(true)
  }, [])

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)]">
      <div className="mx-auto flex h-16 w-full max-w-[var(--editable-wide-container)] items-center justify-between gap-4 px-4 sm:px-6">
        <button type="button" onClick={() => setOpen(true)} className="inline-flex h-10 w-10 items-center justify-center border border-[var(--editable-border)] bg-white lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="min-w-0 text-center lg:text-left flex items-center justify-center gap-3 lg:justify-start">
          {globalContent.site.logo ? (
            <img
              src={globalContent.site.logo}
              alt={`${globalContent.site.displayName} logo`}
              className="h-10 w-10 min-w-[2.5rem] rounded-sm border border-black/10 bg-white object-contain"
            />
          ) : null}
          <span className="min-w-0">
            <span className="block truncate text-2xl font-black uppercase leading-none tracking-normal sm:text-3xl">{globalContent.site.displayName}</span>
            <span className="block truncate text-[11px] font-medium italic text-neutral-500">{globalContent.nav.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = hydrated && pathname && (pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`)))
            return (
              <Link key={item.href} href={item.href} className={`px-3 py-2 text-sm font-black transition ${active ? 'bg-[var(--editable-nav-active)] text-[var(--editable-nav-active-text)]' : 'hover:bg-black hover:text-white'}`}>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden min-w-[210px] justify-end gap-2 md:flex">
          <form action="/search" className="hidden w-44 items-center border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3 lg:flex">
            <Search className="h-4 w-4 text-neutral-500" />
            <input name="q" type="search" placeholder="Search" className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm font-semibold outline-none placeholder:text-neutral-400" />
          </form>
          {session ? (
            <div className="flex items-center gap-2">
              <span className="inline-flex max-w-[150px] items-center gap-2 truncate border border-[var(--editable-border)] bg-white px-3 py-2 text-sm font-black">
                <UserRound className="h-4 w-4 shrink-0" />
                <span className="truncate">{session.name}</span>
              </span>
              <button type="button" onClick={logout} className="inline-flex items-center gap-2 bg-black px-3 py-2 text-sm font-black text-white transition hover:bg-[var(--slot4-accent-fill)]">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="border border-[var(--editable-border)] px-3 py-2 text-sm font-black hover:border-black">Login</Link>
              <Link href="/signup" className="bg-black px-3 py-2 text-sm font-black text-white hover:bg-[var(--slot4-accent-fill)]">Sign up</Link>
            </div>
          )}
        </div>

        <button type="button" onClick={() => setOpen(true)} className="inline-flex h-10 w-10 items-center justify-center border border-[var(--editable-border)] bg-white md:hidden" aria-label="Open search and account menu">
          <Search className="h-5 w-5" />
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/45 lg:hidden" onClick={() => setOpen(false)}>
          <div className="h-full w-[min(82vw,320px)] bg-white p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                {globalContent.site.logo ? (
                  <img
                    src={globalContent.site.logo}
                    alt={`${globalContent.site.displayName} logo`}
                    className="h-10 w-10 min-w-[2.5rem] rounded-sm border border-black/10 bg-white object-contain"
                  />
                ) : null}
                <div>
                  <span className="block text-3xl font-black uppercase leading-none">{globalContent.site.displayName}</span>
                  <span className="block text-[11px] font-medium italic text-neutral-500">{globalContent.nav.tagline}</span>
                </div>
              </Link>
              <button type="button" onClick={() => setOpen(false)} className="text-[var(--slot4-accent-fill)]" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form action="/search" className="mt-6 flex border border-[var(--editable-border)] px-3 py-2">
              <Search className="mt-1 h-4 w-4 text-neutral-500" />
              <input name="q" type="search" placeholder="Search articles..." className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
            </form>

            <div className="mt-6 grid gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-black/10 py-3 text-sm font-black">
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 grid gap-2">
              {session ? (
                <>
                  <p className="text-sm font-black">Signed in as {session.name}</p>
                  <button type="button" onClick={() => { logout(); setOpen(false) }} className="bg-black px-4 py-3 text-sm font-black text-white">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="border border-black/10 px-4 py-3 text-sm font-black">Sign in</Link>
                  <Link href="/signup" onClick={() => setOpen(false)} className="bg-black px-4 py-3 text-sm font-black text-white">Create an account</Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
