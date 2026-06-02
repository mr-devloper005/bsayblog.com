import type { Metadata } from 'next'
import Link from 'next/link'
import { Bookmark, PenLine, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'
import { globalContent } from '@/editable/content/global.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: 'Create a local reader account for this article site.' })
}

export default function SignupPage() {
  const benefits = [
    { icon: Bookmark, title: 'Reader identity', body: 'Show your name in the navbar after signing in.' },
    { icon: Search, title: 'Article discovery', body: 'Jump into search, topic lanes, and archive pages from one place.' },
    { icon: PenLine, title: 'Editorial feedback', body: 'Use the contact and comment flows as a signed-in reader.' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-[#0b0b0b] text-white">
        <section className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-center">
          <div className="border border-white/12 bg-white/[0.06] p-6">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/50">{globalContent.site.name}</p>
            <h1 className="mt-2 text-2xl font-black">Create account</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-white/65">Already have an account? <Link href="/login" className="font-black text-white underline-offset-4 hover:underline">Sign in</Link></p>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">Join the reader desk</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">{pagesContent.auth.signupTitle}</h2>
            <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/70">{pagesContent.auth.signupDescription}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="border-t border-white/20 pt-4">
                  <benefit.icon className="h-5 w-5 text-[var(--slot4-accent-fill)]" />
                  <h3 className="mt-3 text-base font-black">{benefit.title}</h3>
                  <p className="mt-2 text-xs font-medium leading-6 text-white/60">{benefit.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
