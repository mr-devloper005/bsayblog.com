'use client'

import { FileText, Mail, MessageSquare, ShieldAlert } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { globalContent } from '@/editable/content/global.content'

export default function ContactPage() {
  const lanes = [
    { icon: FileText, title: 'Article pitches', body: 'Send story ideas, op-ed proposals, reported features, or evergreen explainers that fit the publication.' },
    { icon: ShieldAlert, title: 'Corrections', body: 'Flag factual issues, missing context, attribution concerns, or updates needed on published articles.' },
    { icon: MessageSquare, title: 'Reader feedback', body: 'Share what you want covered next, how the archive can improve, or what made an article useful.' },
    { icon: Mail, title: 'Partnerships', body: 'Reach out about newsletter collaborations, editorial packages, research support, or sponsored article discussions.' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-white text-black">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-neutral-600">{pagesContent.contact.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {lanes.map((lane) => (
                <div key={lane.title} className="border-t-2 border-black pt-4">
                  <lane.icon className="h-5 w-5 text-[var(--slot4-accent-fill)]" />
                  <h2 className="mt-3 text-lg font-black">{lane.title}</h2>
                  <p className="mt-2 text-sm font-medium leading-7 text-neutral-600">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-black/10 bg-neutral-100 p-6">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-neutral-500">{globalContent.site.name}</p>
            <h2 className="mt-2 text-2xl font-black">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
