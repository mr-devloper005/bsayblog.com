import type { Metadata } from 'next'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { LocalLoginForm } from '@/components/shared/local-auth-forms'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: 'Demo login page for this public site.' })
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#fff7ee] text-[#2f1d16]">
      <NavbarShell />
      <main className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#72594a]">Member access</p>
          <h1 className="mt-5 max-w-xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">Welcome back to a calmer publishing space.</h1>
          <p className="mt-6 max-w-lg text-sm leading-8 text-[#72594a]">This login works locally using browser storage, so testers can create an account and sign in without backend auth.</p>
        </section>
        <section className="rounded-[2rem] border border-[#dbc6b6] bg-[#fffaf2] p-6 shadow-[0_24px_70px_rgba(16,36,31,0.12)] sm:p-8">
          <h2 className="text-2xl font-semibold">Login</h2>
          <LocalLoginForm />
          <p className="mt-5 text-sm text-[#72594a]">New here? <Link href="/signup" className="font-semibold text-[#2f1d16] underline-offset-4 hover:underline">Create an account</Link></p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
