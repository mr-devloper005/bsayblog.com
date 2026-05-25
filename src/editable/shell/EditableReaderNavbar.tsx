'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  LogIn,
  Menu,
  Search,
  UserPlus,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLocalAuthSession } from '@/components/shared/local-auth-forms'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const shell = 'border-b border-[#dbc6b6]/85 bg-[#fff7ee]/92 text-[#2f1d16] shadow-[0_16px_46px_rgba(47,29,22,0.08)] backdrop-blur-xl'

export function EditableReaderNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const qFromUrl = pathname === '/search' ? (searchParams.get('q') ?? '') : ''
  const { session, logout } = useLocalAuthSession()

  return (
    <header className={cn('sticky top-0 z-50 w-full', shell)}>
      <nav className="mx-auto flex h-[78px] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:gap-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${SITE_CONFIG.name} home`}>
          <span className="flex h-12 items-center overflow-hidden rounded-[1.15rem] border border-[#dbc6b6] bg-[#fffaf2] px-2 py-1 shadow-[0_10px_28px_rgba(47,29,22,0.10)]">
            <img
              src="/favicon.png?v=20260413"
              alt=""
              width={220}
              height={56}
              className="h-9 w-auto max-w-[min(190px,44vw)] object-contain object-left sm:h-10 sm:max-w-[210px]"
            />
          </span>
        </Link>

        <form
          action="/search"
          method="get"
          role="search"
          className="hidden min-w-0 flex-1 justify-center md:flex"
        >
          <label className="relative flex w-full max-w-xl items-center">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-4 h-4 w-4 shrink-0 text-[#8b6d5a]" aria-hidden />
            <input
              key={`nav-q-${pathname}-${qFromUrl}`}
              type="search"
              name="q"
              defaultValue={qFromUrl}
              placeholder="Search posts"
              autoComplete="off"
              className="h-11 w-full rounded-full border border-[#dbc6b6] bg-[#fffaf2]/90 py-2 pl-10 pr-4 text-sm text-[#2f1d16] placeholder:text-[#8b6d5a] outline-none ring-offset-2 transition hover:border-[#b99780] focus:border-[#2f1d16] focus:ring-2 focus:ring-[#b76e45]/25"
            />
          </label>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          {session ? (
            <>
              <span className="hidden max-w-[180px] truncate rounded-full bg-[#f2e5d4] px-4 py-2 text-sm font-semibold text-[#2f1d16] md:inline-flex">
                {session.name}
              </span>
              <button type="button" onClick={logout} className="hidden items-center gap-2 rounded-full bg-[#2f1d16] px-5 py-2.5 text-sm font-bold text-[#fff4e4] shadow-[0_14px_32px_rgba(47,29,22,0.16)] transition-colors hover:bg-[#452920] md:inline-flex">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#72594a] transition-colors hover:bg-[#f2e5d4] hover:text-[#2f1d16] md:inline-flex">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-full bg-[#2f1d16] px-5 py-2.5 text-sm font-bold text-[#fff4e4] shadow-[0_14px_32px_rgba(47,29,22,0.16)] transition-colors hover:bg-[#452920] md:inline-flex">
                <UserPlus className="h-4 w-4" />
                Sign up
              </Link>
            </>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[#dbc6b6]/85 bg-[#fff7ee]/98 lg:hidden">
          <div className="space-y-2 px-4 py-4">
            <form
              action="/search"
              method="get"
              role="search"
              className="flex gap-2 rounded-2xl border border-[#dbc6b6] bg-[#fffaf2] p-2"
              onSubmit={() => setOpen(false)}
            >
              <label className="sr-only" htmlFor="reader-nav-mobile-search">
                Search
              </label>
              <input
                key={`m-nav-q-${pathname}-${qFromUrl}`}
                id="reader-nav-mobile-search"
                type="search"
                name="q"
                defaultValue={qFromUrl}
                placeholder="Search..."
                className="min-w-0 flex-1 rounded-xl border-0 bg-transparent px-2 text-sm outline-none"
              />
              <Button type="submit" size="sm" className="shrink-0 rounded-xl bg-[#2f1d16] px-3 font-semibold text-[#fff4e4]">
                <Search className="h-4 w-4" />
                <span className="sr-only">Submit search</span>
              </Button>
            </form>

            {session ? (
              <div className="grid gap-2">
                <div className="rounded-2xl border border-[#dbc6b6] bg-[#fffaf2] px-4 py-3 text-center text-sm font-semibold text-[#2f1d16]">
                  Signed in as {session.name}
                </div>
                <button type="button" onClick={() => { logout(); setOpen(false) }} className="flex items-center justify-center rounded-2xl bg-[#2f1d16] px-4 py-3 text-sm font-bold text-[#fff4e4]">
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-2xl border border-[#dbc6b6] bg-[#fffaf2] px-4 py-3 text-sm font-semibold text-[#2f1d16]">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-2xl bg-[#2f1d16] px-4 py-3 text-sm font-bold text-[#fff4e4]">
                  <UserPlus className="h-4 w-4" />
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
