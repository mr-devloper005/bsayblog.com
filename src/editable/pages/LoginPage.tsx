import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpenCheck, MessageSquare, Newspaper } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'
import { globalContent } from '@/editable/content/global.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: 'Reader login page for this article site.' })
}

export default function LoginPage() {
  const notes = [
    { icon: Newspaper, title: 'Continue reading', body: 'Return to the article archive with your reader name active in the navbar.' },
    { icon: BookOpenCheck, title: 'Local reader session', body: 'The account is stored in this browser for safe UI testing without backend changes.' },
    { icon: MessageSquare, title: 'Comment-ready flow', body: 'Use the same identity when testing article comments and reader interactions.' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">Reader access</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">{pagesContent.auth.loginTitle}</h1>
            <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-neutral-600">{pagesContent.auth.loginDescription}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:max-w-2xl">
              {notes.map((note) => (
                <div key={note.title} className="border-t-2 border-black pt-4">
                  <note.icon className="h-5 w-5 text-[var(--slot4-accent-fill)]" />
                  <h2 className="mt-3 text-base font-black">{note.title}</h2>
                  <p className="mt-2 text-xs font-medium leading-6 text-neutral-600">{note.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-black/10 bg-neutral-100 p-6">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-neutral-500">{globalContent.site.name}</p>
            <h2 className="mt-2 text-2xl font-black">Sign in</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-neutral-600">New reader? <Link href="/signup" className="font-black text-black underline-offset-4 hover:underline">Create an account</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
