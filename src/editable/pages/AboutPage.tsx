import { Newspaper, Search, ShieldCheck } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { globalContent } from '@/editable/content/global.content'

export default function AboutPage() {
  const markers = [
    { label: 'Daily reading', value: 'Fresh article lanes for return visits.' },
    { label: 'Clear context', value: 'Summaries and related reads around every story.' },
    { label: 'Compact layout', value: 'Normal-width pages that feel edited, not stretched.' },
  ]
  const icons = [Newspaper, Search, ShieldCheck]

  return (
    <EditableSiteShell>
      <main className="bg-white text-black">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6">
          <div className="border-b border-black/12 pb-8">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">{pagesContent.about.badge}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">{pagesContent.about.title}</h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-neutral-600">{pagesContent.about.description}</p>
          </div>

          <div className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="min-w-0">
              <div className="space-y-5 text-base font-medium leading-8 text-neutral-700">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {markers.map((marker) => (
                  <div key={marker.label} className="border-t-2 border-black pt-4">
                    <p className="text-sm font-black">{marker.label}</p>
                    <p className="mt-2 text-xs font-medium leading-6 text-neutral-600">{marker.value}</p>
                  </div>
                ))}
              </div>
            </article>

            <aside className="bg-[#0b0b0b] p-5 text-white">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/50">{globalContent.site.name}</p>
              <h2 className="mt-2 text-2xl font-black">What guides us</h2>
              <div className="mt-6 grid gap-5">
                {pagesContent.about.values.map((value, index) => {
                  const Icon = icons[index] || Newspaper
                  return (
                    <div key={value.title} className="border-t border-white/16 pt-5">
                      <Icon className="h-5 w-5 text-[var(--slot4-accent-fill)]" />
                      <h3 className="mt-3 text-lg font-black">{value.title}</h3>
                      <p className="mt-2 text-sm font-medium leading-7 text-white/68">{value.description}</p>
                    </div>
                  )
                })}
              </div>
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
