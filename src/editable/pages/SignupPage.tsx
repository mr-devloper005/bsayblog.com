import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: 'Local signup page for this public site.' })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--editable-page-text,#2f1d16)] text-[var(--editable-page-bg,#fff4e4)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur sm:p-8">
            <h1 className="text-3xl font-black tracking-[-0.05em]">Create account</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-white/65">Already have an account? <Link href="/login" className="font-black text-white underline-offset-4 hover:underline">Login</Link></p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/60">Site access</p>
            <h2 className="mt-5 max-w-xl text-5xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">A bolder entry point for modern content sites.</h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-white/68">This sign up screen is presentational and safe for public templates. It gives the navbar real destinations while staying browser-local for testing.</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
