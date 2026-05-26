import Link from 'next/link'
import { ArrowRight, Heart, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function MiniPoster({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className={`group block w-[230px] shrink-0 ${dc.motion.fade}`}>
      <article className="relative overflow-hidden rounded-[1.65rem] border border-black/[0.07] bg-white p-2 shadow-[0_18px_48px_rgba(47,29,22,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_58px_rgba(47,29,22,0.16)]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.72)_100%)]" />
          <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)] shadow-sm">
            Read
          </span>
          <h3 className="absolute bottom-3 left-3 right-3 line-clamp-3 text-base font-black leading-tight tracking-[-0.03em] text-white drop-shadow-sm">
            {post.title}
          </h3>
        </div>
      </article>
    </Link>
  )
}

function FeatureTile({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const style = index % 3
  if (style === 0) {
    return (
      <Link href={href} className="group relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[#24150f] p-5 text-white shadow-[0_24px_70px_rgba(47,29,22,0.18)] transition duration-300 hover:-translate-y-1">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.78))]" />
        <div className="relative z-10 flex min-h-[320px] flex-col justify-end">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/70">Featured</p>
          <h3 className="mt-3 line-clamp-3 text-3xl font-black leading-[0.98] tracking-[-0.06em]">{post.title}</h3>
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-white/76">{getExcerpt(post, 110)}</p>
        </div>
      </Link>
    )
  }
  if (style === 1) {
    return (
      <Link href={href} className={`group grid overflow-hidden rounded-[2rem] border ${pal.border} bg-white shadow-[0_18px_54px_rgba(47,29,22,0.10)] transition duration-300 hover:-translate-y-1 md:grid-cols-[0.82fr_1fr]`}>
        <div className="relative min-h-[190px] bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="p-6">
          <p className={`text-[11px] font-black uppercase tracking-[0.26em] ${pal.accentText}`}>Spotlight {index + 1}</p>
          <h3 className="mt-4 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className={`mt-4 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getExcerpt(post, 135)}</p>
        </div>
      </Link>
    )
  }
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-[2rem] border ${pal.border} bg-[var(--slot4-accent-soft)] p-6 shadow-[0_18px_54px_rgba(47,29,22,0.08)] transition duration-300 hover:-translate-y-1`}>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/55" />
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-sm">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      </div>
      <p className={`mt-8 text-[11px] font-black uppercase tracking-[0.26em] ${pal.accentText}`}>Deep read</p>
      <h3 className="mt-3 line-clamp-4 text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--slot4-page-text)]">{post.title}</h3>
      <p className={`mt-4 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getExcerpt(post, 125)}</p>
    </Link>
  )
}

function WideStoryCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group grid gap-4 overflow-hidden rounded-[1.75rem] border ${pal.border} bg-white p-3 shadow-[0_14px_42px_rgba(47,29,22,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_58px_rgba(47,29,22,0.14)] sm:grid-cols-[150px_minmax(0,1fr)]`}>
      <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] bg-[var(--slot4-media-bg)] sm:aspect-square">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/72 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white backdrop-blur">
          Pick {index + 1}
        </span>
      </div>
      <div className="min-w-0 py-2 pr-2">
        <p className={`text-[11px] font-extrabold uppercase tracking-[0.24em] ${pal.accentText}`}>Editor's lane</p>
        <h3 className="mt-2 line-clamp-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getExcerpt(post, 145)}</p>
      </div>
    </Link>
  )
}

function IndexPill({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-[1.55rem] border ${pal.border} bg-white p-5 shadow-[0_12px_34px_rgba(47,29,22,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(47,29,22,0.13)]`}>
      <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[var(--slot4-accent-soft)] opacity-70 transition group-hover:scale-125" />
      <p className={`relative text-[11px] font-black uppercase tracking-[0.26em] ${pal.accentText}`}>No. {String(index + 1).padStart(2, '0')}</p>
      <h3 className="relative mt-3 line-clamp-3 text-xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
      <p className={`relative mt-4 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getExcerpt(post, 120)}</p>
      <span className="relative mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)] opacity-70">
        Open <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
      </span>
    </Link>
  )
}

function Rail({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`${dc.layout.rail} ${className}`}>{children}</div>
}

export function EditableHomeHero({ primaryTask, primaryRoute }: HomeSectionProps) {
  const heroTitle = pagesContent.home.hero.title.join(' ') || `Come for the ${taskLabel(primaryTask).toLowerCase()}. Stay for the connection.`
  return (
    <section className={`${pal.creamBg} relative overflow-hidden`}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <div className="absolute -right-[20%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#f4d7c1] blur-3xl" />
        <div className="absolute -left-[10%] bottom-[5%] h-[320px] w-[320px] rounded-full bg-[#f8e0d0] blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:py-20">
        <div>
          <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{pagesContent.home.hero.badge}</p>
          <h1 className={`${dc.type.heroTitle} mt-4 max-w-xl`}>{heroTitle}</h1>
          <p className={`mt-5 max-w-lg text-base leading-relaxed ${pal.mutedText} sm:text-lg`}>{pagesContent.home.hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={primaryRoute} className={dc.button.primary}>Browse {taskLabel(primaryTask).toLowerCase()} <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className={dc.button.secondary}>Contact us</Link>
          </div>
        </div>
        <div className="relative min-h-[360px] lg:min-h-[430px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-[min(100%,390px)] w-[min(100%,430px)] bg-[var(--slot4-accent-fill)]" style={{ clipPath: 'polygon(8% 12%, 92% 4%, 98% 45%, 88% 88%, 42% 96%, 6% 78%, 2% 38%)' }}>
              <div className="absolute inset-0 bg-[linear-gradient(145deg,color-mix(in_oklab,var(--slot4-accent-fill)_78%,white)_0%,var(--slot4-accent-fill)_48%,color-mix(in_oklab,var(--slot4-accent-fill)_82%,black)_100%)]" />
              <div className="absolute inset-6 flex flex-col justify-end rounded-sm bg-white/10 p-4 text-white backdrop-blur-[2px]">
                <p className="text-xs font-medium uppercase tracking-widest opacity-90">Featured on {SITE_CONFIG.name}</p>
                <p className="mt-2 text-lg font-bold leading-snug">Stories, resources, and useful pages from the community.</p>
              </div>
            </div>
          </div>
          <div className="absolute left-0 top-[6%] z-10 max-w-[270px] rounded-2xl border border-black/5 bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-xs font-black text-[var(--slot4-page-text)]">R</div>
              <div className="min-w-0 flex-1">
                <p className={`text-xs font-semibold ${pal.accentText}`}>reader_mina</p>
                <p className="mt-1 text-sm leading-snug text-neutral-800">This page went from useful to unforgettable in two scrolls.</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-neutral-500"><Heart className={`h-3.5 w-3.5 ${pal.accentText}`} /><span>128</span></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-[8%] right-0 z-10 max-w-[270px] rounded-2xl border border-black/5 bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-xs font-black text-[var(--slot4-page-text)]">D</div>
              <div className="min-w-0 flex-1">
                <p className={`text-xs font-semibold ${pal.accentText}`}>dev_notes</p>
                <p className="mt-1 text-sm leading-snug text-neutral-800">Clean layout, quick browsing, and no heavy drama.</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-neutral-500"><Heart className={`h-3.5 w-3.5 ${pal.accentText}`} /><span>204</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 12)
  if (!railPosts.length) return null
  return (
    <section className={`${pal.warmBg} relative border-t border-black/[0.06]`}>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-[linear-gradient(to_bottom,transparent,#ffffff)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className={dc.type.sectionTitle}>Trending now</h2>
          <Link href={primaryRoute} className="hidden text-sm font-semibold text-[#006d6d] hover:underline sm:inline">See all</Link>
        </div>
        <Rail className="mt-8">
          {railPosts.map((post) => <MiniPoster key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
        </Rail>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = posts.slice(0, 8)
  if (!featured.length) return null
  return (
    <section className={`${pal.lavenderBg} relative overflow-hidden`}>
      <div className="pointer-events-none absolute -left-20 top-8 h-40 w-40 rounded-full bg-white/40 blur-2xl" />
      <div className="pointer-events-none absolute -right-16 bottom-4 h-48 w-48 rounded-full bg-indigo-200/50 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Must-read {taskLabel(primaryTask).toLowerCase()}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.slice(0, 6).map((post, index) => (
            <FeatureTile key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const categoryPosts = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts.slice(8)
  const feature = categoryPosts[0] || posts[0]
  const picks = categoryPosts.slice(1, 5)
  const indexPosts = categoryPosts.slice(5, 13)
  return (
    <section className={pal.grayBg}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <h2 className={dc.type.sectionTitle}>All the topics. All the voices.</h2>
          <p className={`mt-4 max-w-md text-base leading-relaxed ${pal.mutedText}`}>Find your next page faster. Browse clean sections, rich cards, and useful posts without losing the original site rhythm.</p>
          <form action="/search" className="mt-8 flex max-w-md rounded-full border border-black/[0.08] bg-white p-2 shadow-sm">
            <input name="q" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none" />
            <button className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"><Search className="h-4 w-4" /> Search</button>
          </form>
        </div>
        <div className="grid gap-4">
          {picks.map((post, index) => <WideStoryCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </div>
      </div>
      {feature ? (
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:px-8">
          <Link href={postHref(primaryTask, feature, primaryRoute)} className="group relative min-h-[420px] overflow-hidden rounded-[2rem] bg-black text-white shadow-[0_18px_70px_rgba(0,0,0,0.16)]">
            <img src={getEditablePostImage(feature)} alt={feature.title} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.74))]" />
            <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-7 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/75">Featured stream</p>
              <h3 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{feature.title}</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/78">{getExcerpt(feature, 180)}</p>
            </div>
          </Link>
          <div className="grid gap-4 sm:grid-cols-2">
            {indexPosts.map((post, index) => <IndexPill key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className={`${pal.panelBg} relative scroll-mt-24 overflow-hidden`}>
      <div className="pointer-events-none absolute inset-0 opacity-40"><div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-[#f4d7c1] blur-3xl" /></div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Where useful pages meet audience</h2>
          <p className={`mt-4 text-lg ${pal.mutedText}`}>Explore useful posts, fresh updates, and curated resources across every section of the site.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/contact" className={dc.button.primary}>Contact us</Link></div>
        </div>
      </div>
    </section>
  )
}
