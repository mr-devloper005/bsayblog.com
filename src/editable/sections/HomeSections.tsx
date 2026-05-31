import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { CompactIndexCard, EditorialFeatureCard, RailPostCard, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = posts[0]
  const sidePosts = posts.slice(1, 4)
  return (
    <section className={`${dc.shell.section} pt-12 sm:pt-16 lg:pt-20`}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] lg:items-stretch">
        <div className={`min-w-0 rounded-[2.5rem] border ${pal.border} ${pal.panelBg} p-7 shadow-[0_24px_80px_rgba(24,20,17,0.08)] sm:p-10 lg:p-12`}>
          <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{pagesContent.home.hero.badge}</p>
          <h1 className={`${dc.type.heroTitle} mt-6 ${pal.panelText}`}>{pagesContent.home.hero.title.join(' ')}</h1>
          <p className={`mt-7 max-w-2xl text-base leading-8 ${pal.mutedText} sm:text-lg`}>{pagesContent.home.hero.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={primaryRoute} className={`inline-flex items-center gap-2 rounded-full ${pal.darkBg} px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5`}>
              Browse {primaryTask}s <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className={`inline-flex items-center gap-2 rounded-full border ${pal.border} bg-white px-6 py-3 text-sm font-black ${pal.panelText} transition hover:-translate-y-0.5`}>Contact</Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {['Fresh ideas', 'Useful reads', 'Easy browsing'].map((item) => (
              <div key={item} className={`min-w-0 rounded-3xl border ${pal.border} bg-white p-4`}>
                <p className={`text-[11px] font-black uppercase tracking-[0.22em] ${pal.accentText}`}>{item}</p>
              </div>
            ))}
          </div>
        </div>
        {lead ? (
          <EditorialFeatureCard post={lead} href={postHref(primaryTask, lead, primaryRoute)} label="Start here" />
        ) : (
          <div className={`${dc.surface.dark} min-h-[520px] p-8`}>
            <p className={`${dc.type.eyebrow} ${pal.accentSoftText}`}>Start here</p>
            <h2 className="mt-5 text-5xl font-black tracking-[-0.07em]">Fresh stories are on the way.</h2>
          </div>
        )}
      </div>
      {sidePosts.length ? (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {sidePosts.map((post, index) => <CompactIndexCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </div>
      ) : null}
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 10)
  if (!railPosts.length) return null
  return (
    <section className={`${dc.shell.section} ${dc.shell.sectionY}`}>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className={`${dc.type.eyebrow} ${pal.accentText}`}>Explore more</p>
          <h2 className={`${dc.type.sectionTitle} mt-3 ${pal.panelText}`}>A wider shelf of useful reads.</h2>
        </div>
        <Link href={primaryRoute} className={`inline-flex items-center gap-2 text-sm font-black ${pal.panelText}`}>View all <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <div className={dc.layout.rail}>
        {railPosts.map((post, index) => <RailPostCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[4] || posts[0]
  const picks = posts.slice(5, 9)
  if (!feature && !picks.length) return null
  return (
    <section className={`${pal.darkBg} py-16 ${pal.darkText} sm:py-20 lg:py-24`}>
      <div className={dc.shell.section}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)] lg:items-start">
          <div className="min-w-0">
            <p className={`${dc.type.eyebrow} ${pal.accentSoftText}`}>Deep reads</p>
            <h2 className={`${dc.type.sectionTitle} mt-3 max-w-3xl text-white`}>A richer reading lane with room to explore.</h2>
            {feature ? <div className="mt-8"><EditorialFeatureCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} label="Featured" /></div> : null}
          </div>
          <div className="grid gap-4">
            {picks.map((post, index) => (
              <Link key={post.id} href={postHref(primaryTask, post, primaryRoute)} className={`group block min-w-0 rounded-[1.75rem] border ${pal.darkBorder} bg-white/[0.06] p-5 transition hover:bg-white/[0.1]`}>
                <p className={`text-[11px] font-black uppercase tracking-[0.24em] ${pal.accentSoftText}`}>Pick {index + 1}</p>
                <h3 className="mt-3 line-clamp-2 text-2xl font-black tracking-[-0.05em] text-white">{post.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections = timeSections.length
    ? timeSections
    : [{ key: 'index', title: 'From the index', eyebrow: 'More to browse', description: 'A compact set of additional reads.', task: primaryTask, href: primaryRoute, posts: posts.slice(8, 16) }]
  return (
    <section className={`${dc.shell.section} ${dc.shell.sectionY}`}>
      <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className={`h-fit rounded-[2rem] border ${pal.border} bg-white p-7 lg:sticky lg:top-24`}>
          <p className={`${dc.type.eyebrow} ${pal.accentText}`}>Index</p>
          <h2 className={`mt-3 text-4xl font-black tracking-[-0.06em] ${pal.panelText}`}>More paths through the site.</h2>
          <p className={`mt-4 text-sm leading-7 ${pal.mutedText}`}>A mix of compact rows and browse modules keeps the page full without squeezing content into narrow columns.</p>
          <form action="/search" className={`mt-6 flex rounded-full border ${pal.border} ${pal.panelBg} p-2`}>
            <input name="q" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none" />
            <button className={`rounded-full ${pal.darkBg} p-3 text-white`} aria-label="Search"><Search className="h-4 w-4" /></button>
          </form>
        </div>
        <div className="grid gap-8">
          {sections.map((section) => section.posts.length ? (
            <div key={section.key} className="min-w-0">
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{section.eyebrow}</p>
                  <h3 className={`mt-2 text-3xl font-black tracking-[-0.05em] ${pal.panelText}`}>{section.title}</h3>
                </div>
                <Link href={section.href} className={`text-sm font-black ${pal.panelText}`}>View all</Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {section.posts.slice(0, 6).map((post, index) => <CompactIndexCard key={post.id} post={post} href={postHref(section.task, post, section.href)} index={index} />)}
              </div>
            </div>
          ) : null)}
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className={`${dc.shell.section} pb-16 sm:pb-20 lg:pb-24`}>
      <div className={`rounded-[2.5rem] ${pal.accentBg} p-8 ${pal.panelText} sm:p-10 lg:p-14`}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <p className={`${dc.type.eyebrow}`}>Keep browsing</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.06em] sm:text-6xl">Useful pages, cleaner reading, and more ways to discover.</h2>
          </div>
          <Link href="/contact" className={`inline-flex w-fit items-center gap-2 rounded-full ${pal.darkBg} px-6 py-4 text-sm font-black text-white`}>Contact us <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}
