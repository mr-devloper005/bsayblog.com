import type { Metadata } from 'next'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { LocalSignupForm } from '@/components/shared/local-auth-forms'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: 'Demo sign up page for this public site.' })
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#2f1d16] text-[#fff4e4]">
      <NavbarShell />
      <main className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur sm:p-8">
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">Create account</h1>
          <LocalSignupForm />
          <p className="mt-5 text-sm text-white/65">Already have an account? <Link href="/login" className="font-semibold text-white underline-offset-4 hover:underline">Login</Link></p>
        </section>
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d7b56d]">Slot 4 access</p>
          <h2 className="mt-5 max-w-xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">A bolder entry point for modern content sites.</h2>
          <p className="mt-6 max-w-lg text-sm leading-8 text-white/68">This sign up screen is presentational and safe for public templates. It gives the navbar real destinations while staying browser-local for testing.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
