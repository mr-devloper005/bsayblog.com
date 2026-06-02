import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function MetaLine({ post }: { post: SitePost }) {
  return (
    <p className="mt-3 text-[11px] font-bold text-neutral-500">
      <span>{getEditableCategory(post)}</span>
    </p>
  )
}

function SectionTitle({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2 className={`flex items-center gap-2 text-xl font-black ${dark ? 'text-white' : 'text-black'}`}>
      <span className="h-2 w-2 bg-[var(--slot4-accent-fill)]" />
      {children}
    </h2>
  )
}

function SmallList({ posts, route, task }: { posts: SitePost[]; route: string; task: TaskKey }) {
  return (
    <div className="divide-y divide-black/10">
      {posts.map((post, index) => (
        <Link key={post.id || post.slug} href={postHref(task, post, route)} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 py-3">
          <span className="mt-1 bg-neutral-100 px-2 py-1 text-center text-[10px] font-black">{String(index + 1).padStart(2, '0')}</span>
          <span className="line-clamp-2 text-sm font-black leading-6 hover:text-[var(--slot4-accent-fill)]">{post.title}</span>
        </Link>
      ))}
    </div>
  )
}

function ImageStoryCard({ post, href, large = false, dark = false }: { post: SitePost; href: string; large?: boolean; dark?: boolean }) {
  return (
    <Link href={href} className={`group block min-w-0 ${dark ? 'text-white' : 'text-black'}`}>
      <div className={`relative overflow-hidden bg-neutral-200 ${large ? 'aspect-[16/11]' : 'aspect-[4/3]'}`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {dark ? <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" /> : null}
        {large && dark ? (
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="line-clamp-3 text-2xl font-black leading-tight sm:text-3xl">{post.title}</h3>
            <MetaLine post={post} />
          </div>
        ) : null}
      </div>
      {!(large && dark) ? (
        <div className="pt-3">
          <MetaLine post={post} />
          <h3 className={`${large ? 'text-2xl' : 'text-lg'} mt-2 line-clamp-3 font-black leading-tight group-hover:text-[var(--slot4-accent-fill)]`}>{post.title}</h3>
          {large ? <p className="mt-3 line-clamp-3 text-sm leading-7 text-neutral-600">{getEditableExcerpt(post, 170)}</p> : null}
        </div>
      ) : null}
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = posts[0]
  const hot = posts.slice(1, 8)
  const side = posts.slice(8, 11)
  const heroTitle = pagesContent.home.hero.title.join(' ')
  if (!lead) return null

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[225px_minmax(0,1fr)_240px]">
        <aside className="min-w-0">
          <SectionTitle>{pagesContent.home.hero.badge}</SectionTitle>
          <SmallList posts={hot} route={primaryRoute} task={primaryTask} />
        </aside>

        <div className="min-w-0 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-neutral-500">{getEditableCategory(lead)}</p>
          <h1 className="mx-auto mt-2 max-w-xl text-2xl font-black leading-tight sm:text-3xl">{lead.title || heroTitle}</h1>
          <Link href={postHref(primaryTask, lead, primaryRoute)} className="group mt-5 block">
            <div className="aspect-[16/11] overflow-hidden bg-neutral-200">
              <img src={getEditablePostImage(lead)} alt={lead.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
          </Link>
          <div className="mt-7 flex justify-center gap-1">
            {[0, 1, 2, 3, 4].map((dot) => <span key={dot} className={`h-1.5 w-1.5 rounded-full ${dot === 0 ? 'bg-[var(--slot4-accent-fill)]' : 'bg-neutral-300'}`} />)}
          </div>
        </div>

        <aside className="min-w-0">
          <div className="bg-black px-4 py-2 text-center text-sm font-black text-white"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--slot4-accent-fill)]" />Live now</div>
          {side[0] ? <ImageStoryCard post={side[0]} href={postHref(primaryTask, side[0], primaryRoute)} /> : null}
          <SmallList posts={side.slice(1)} route={primaryRoute} task={primaryTask} />
        </aside>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const picks = posts.slice(2, 7)
  if (!picks.length) return null
  return (
    <section className="bg-[#0b0b0b] py-10 text-white">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6">
        <SectionTitle dark>Hand-picked articles</SectionTitle>
        <div className="mt-6 grid gap-2 md:grid-cols-2">
          {picks[0] ? <ImageStoryCard post={picks[0]} href={postHref(primaryTask, picks[0], primaryRoute)} large dark /> : null}
          <div className="grid gap-2 sm:grid-cols-2">
            {picks.slice(1, 5).map((post) => (
              <ImageStoryCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} dark />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const watched = posts.slice(0, 5)
  const leadPair = posts.slice(5, 7)
  if (!watched.length) return null
  return (
    <section className="bg-white py-10">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-6 px-4 sm:px-6 lg:grid-cols-[285px_minmax(0,1fr)]">
        <aside className="bg-neutral-100 p-5">
          <SectionTitle>Most watched</SectionTitle>
          <SmallList posts={watched} route={primaryRoute} task={primaryTask} />
        </aside>
        <div>
          <div className="flex items-center justify-between bg-black px-4 py-2 text-white">
            <SectionTitle dark>Latest analysis</SectionTitle>
            <Link href={primaryRoute} className="text-xs font-black uppercase tracking-[0.14em] text-white/70 hover:text-white">View all</Link>
          </div>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {leadPair.map((post) => <ImageStoryCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} large />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const grouped = timeSections.length ? timeSections.slice(0, 6) : []
  const fallback = posts.slice(7)
  const lanes = grouped.length
    ? grouped.map((section, index) => ({ title: section.title || section.eyebrow || `Topic ${index + 1}`, posts: section.posts.slice(0, 4) }))
    : ['Social', 'Sports', 'Arts', 'Economy', 'International', 'National'].map((title, index) => ({ title, posts: fallback.slice(index * 4, index * 4 + 4) }))

  return (
    <section className="bg-white pb-12">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6">
        <div className="grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {lanes.filter((lane) => lane.posts.length).map((lane) => {
            const [lead, ...rest] = lane.posts
            return (
              <section key={lane.title} className="min-w-0">
                <div className="border-b border-black/12 pb-3"><SectionTitle>{lane.title}</SectionTitle></div>
                {lead ? <div className="mt-4"><ImageStoryCard post={lead} href={postHref(primaryTask, lead, primaryRoute)} /></div> : null}
                <SmallList posts={rest} route={primaryRoute} task={primaryTask} />
              </section>
            )
          })}
        </div>

        <div className="mt-12 grid gap-4 bg-neutral-100 p-5 md:grid-cols-[280px_minmax(0,1fr)]">
          <div className="bg-black p-5 text-white">
            <SectionTitle dark>Reader search</SectionTitle>
            <p className="mt-5 text-sm font-medium leading-7 text-white/75">{pagesContent.home.hero.description}</p>
          </div>
          <form action="/search" className="flex flex-col gap-3 self-center sm:flex-row">
            <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-h-12 flex-1 border border-black/10 bg-white px-4 text-sm font-bold outline-none focus:border-black" />
            <button className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--slot4-accent-fill)] px-5 text-sm font-black text-white hover:bg-black"><Search className="h-4 w-4" /> Search</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-white pb-12">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6">
        <div className="border-y border-black/12 py-8 text-center">
          <p className={dc.type.eyebrow}><span className="mr-2 inline-block h-2 w-2 bg-[var(--slot4-accent-fill)]" />{pagesContent.home.cta.badge}</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-black leading-tight sm:text-3xl">{pagesContent.home.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-neutral-600">{pagesContent.home.cta.description}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/article" className={dc.button.dark}>Browse {taskLabel('article').toLowerCase()} <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className={dc.button.secondary}>Pitch a story</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
