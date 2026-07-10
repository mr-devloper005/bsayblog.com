import Link from 'next/link'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Award, Bookmark, Briefcase, Building2, CalendarDays, Camera, CheckCircle2, ChevronRight, Download, ExternalLink, Eye, FileText, Flame, Globe2, Heart, Mail, MapPin, MessageCircle, MessageSquare, MoreHorizontal, Phone, Share2, Tag, UserRound, Users } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { globalContent } from '@/editable/content/global.content'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost, options: { includeLogo?: boolean } = {}) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImageKeys = options.includeLogo ? ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'] : ['image', 'featuredImage', 'thumbnail', 'avatar']
  const singleImages = singleImageKeys.map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'Details will appear here once available.'
}

const formatPlainText = (raw: string) => {
  if (/<[a-z][\s\S]*>/i.test(raw)) return raw.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  return raw.split(/\n{2,}/).map((part) => `<p>${part.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`).join('')
}

const summaryText = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || ''
const categoryOf = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const mapSrcFor = (post: SitePost) => {
  const address = getField(post, ['address', 'location', 'city'])
  const lat = getField(post, ['lat', 'latitude'])
  const lng = getField(post, ['lng', 'lon', 'longitude'])
  if (lat && lng) return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=14&output=embed`
  if (address) return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=13&output=embed`
  return ''
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const detailVars = { '--detail-bg': preset.colors.background, '--detail-text': preset.colors.foreground, '--detail-surface': preset.colors.surface, '--detail-accent': preset.colors.accent } as CSSProperties

  if (task === 'article') {
    return (
      <main style={detailVars} className="bg-[#f5f5f5] text-[#071226]">
        <ArticleDetail post={post} related={related} comments={comments} />
      </main>
    )
  }

  if (task === 'profile') {
    return (
      <main style={detailVars} className="bg-[#f5f5f5] text-[#071226]">
        <ProfileDetail post={post} related={related} />
      </main>
    )
  }

  return (
    <EditableSiteShell>
      <main style={detailVars} className="bg-[var(--detail-bg)] text-[var(--detail-text)]">
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
      </main>
    </EditableSiteShell>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 border border-[var(--editable-border)] bg-white px-4 py-2 text-sm font-black">
      <ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function ArticleDetail({ post, related, comments }: { post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  const heroImage = images[0] || '/placeholder.svg?height=900&width=1200'
  const content = getContent(post)
  const category = categoryOf(post, 'Health & Fitness')
  const author = asText(content.author) || post.authorName || 'Amanda Ramirez'
  const avatar = asText(content.avatar)
  const readTime = asText(content.readTime) || '13 min read'
  const discover = buildDiscoverItems(post)
  const tags = (post.tags || ['Womenshearthealth', 'Hearthealthover40', 'Menopausewellness', 'Preventheartdisease']).slice(0, 4)

  return (
    <div className="relative min-h-screen bg-[#f5f5f5]">
      <section className="relative overflow-hidden bg-[#111827] text-white">
        <div className="absolute inset-y-0 right-0 hidden w-[43%] md:block">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/70 to-transparent" />
        </div>
        <div className="relative mx-auto flex min-h-[532px] max-w-[1280px] items-center px-5 py-16 sm:px-8 lg:px-10">
          <div className="w-full max-w-[770px]">
            <nav className="flex flex-wrap items-center gap-2 text-[13px] font-bold text-white/90">
              <Link href="/">Home</Link>
              <span className="text-white/45">›</span>
              <Link href="/article">{category}</Link>
              <span className="text-white/45">›</span>
              <span className="line-clamp-1 max-w-[420px]">{post.title}</span>
            </nav>
            <span className="mt-8 inline-flex rounded-full bg-[#3f5ee7] px-3 py-1.5 text-sm font-medium text-white">{category}</span>
            <h1 className="mt-7 max-w-[790px] text-[44px] font-medium leading-[1.28] tracking-normal text-white sm:text-[50px]">
              {post.title}
            </h1>
            <div className="mt-5 h-px w-full max-w-[768px] bg-white/18" />
            <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {avatar ? <img src={avatar} alt="" className="h-11 w-11 rounded-full object-cover" /> : <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-black text-[#111827]">{author.slice(0, 1)}</div>}
                <div>
                  <p className="text-sm font-black text-white">{author}</p>
                  <p className="mt-1 text-xs font-semibold text-white/90">{readTime}</p>
                </div>
              </div>
              <ArticleDetailActions slug={post.slug} comments={comments.length} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto mt-36 max-w-[760px] lg:mt-36">
          <DiscoverBox items={discover.slice(0, 3)} />
        </div>

        <div className="mt-16 grid items-start gap-16 lg:grid-cols-[696px_426px] lg:justify-center">
          <article className="min-w-0">
            <BodyContent post={post} article />
            <div className="mt-14">
              <DiscoverBox items={[...discover].reverse().slice(0, 3)} />
            </div>
            <div className="mt-9 flex flex-wrap gap-2">
              {tags.map((tag) => <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="rounded-md border border-[#d9dde4] bg-white px-4 py-2 text-sm font-medium text-[#071226]">{tag}</Link>)}
            </div>
            <AuthorCard author={author} avatar={avatar} />
<div id="article-comments">
          <EditableComments slug={post.slug} comments={comments} />
        </div>
          </article>

          <aside className="space-y-9 lg:sticky lg:top-8">
            <RecommendedPanel related={related} />
            <DiscoverBox items={discover.slice(1, 4)} compact />
          </aside>
        </div>
      </section>
    </div>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post, { includeLogo: true })
  const logo = images[0]
  const address = getField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  const mapSrc = mapSrcFor(post)
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="listing" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <article className="rounded-[2.8rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.09)] sm:p-9">
          <div className="grid gap-6 sm:grid-cols-[150px_1fr]">
            <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-[2rem] bg-[var(--detail-bg)] ring-1 ring-[var(--editable-border)]">
              {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <Building2 className="h-14 w-14 opacity-40" />}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--detail-accent)]">Business listing</p>
              <h1 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">{post.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 opacity-70">{summaryText(post)}</p>
            </div>
          </div>
          <InfoGrid items={[['Location', address, MapPin], ['Phone', phone, Phone], ['Email', email, Mail], ['Website', website, Globe2]]} />
          <BodyContent post={post} />
          <ImageStrip images={images.slice(1)} label="Business showcase" />
        </article>
        <aside className="space-y-5">
          {mapSrc ? <MapBox src={mapSrc} label={address || post.title} /> : <ContactAction website={website} phone={phone} email={email} />}
          {mapSrc ? <ContactAction website={website} phone={phone} email={email} /> : null}
          <RelatedPanel task="listing" post={post} related={related} compact />
        </aside>
      </div>
    </section>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-7 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-16">
      <aside className="rounded-[2.5rem] border border-[var(--editable-border)] bg-[var(--detail-text)] p-7 text-[var(--detail-bg)] shadow-xl lg:sticky lg:top-24 lg:self-start">
        <BackLink task="classified" />
        <p className="mt-10 text-xs font-black uppercase tracking-[0.28em] opacity-60">Classified notice</p>
        <h1 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-5xl">{post.title}</h1>
        <div className="mt-8 grid gap-3">
          {price ? <BadgeLine label="Price" value={price} /> : null}
          {condition ? <BadgeLine label="Condition" value={condition} /> : null}
          {location ? <BadgeLine label="Location" value={location} /> : null}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {phone ? <a href={`tel:${phone}`} className="rounded-full bg-[var(--detail-bg)] px-5 py-3 text-sm font-black text-[var(--detail-text)]">Call now</a> : null}
          {email ? <a href={`mailto:${email}`} className="rounded-full border border-white/25 px-5 py-3 text-sm font-black">Email</a> : null}
        </div>
      </aside>
      <article className="rounded-[2.7rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-9">
        <ImageStrip images={images} label="Offer images" large />
        <BodyContent post={post} />
        <ContactAction website={website} phone={phone} email={email} />
        <RelatedPanel task="classified" post={post} related={related} />
      </article>
    </section>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="image" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="rounded-[2.5rem] border border-[var(--editable-border)] bg-white p-7 lg:sticky lg:top-24 lg:self-start">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--detail-text)] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--detail-bg)]"><Camera className="h-4 w-4" /> Image story</div>
          <h1 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-base leading-8 opacity-70">{summaryText(post)}</p>
          <BodyContent post={post} compact />
        </aside>
        <div className="columns-1 gap-5 space-y-5 md:columns-2">
          {(images.length ? images : ['/placeholder.svg?height=900&width=1200']).map((image, index) => (
            <figure key={`${image}-${index}`} className="break-inside-avoid overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-sm">
              <img src={image} alt="" className="w-full object-cover" />
              {index === 0 ? <figcaption className="p-5 text-sm font-bold opacity-65">Featured visual from this image post.</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-10"><RelatedPanel task="image" post={post} related={related} /></div>
    </section>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-16">
      <article className="rounded-[2.7rem] border border-[var(--editable-border)] bg-white p-7 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-10">
        <BackLink task="sbm" />
        <div className="mt-10 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-[var(--detail-text)] text-[var(--detail-bg)]"><Bookmark className="h-9 w-9" /></div>
        <h1 className="mt-7 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">{post.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-9 opacity-70">{summaryText(post)}</p>
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--detail-text)] px-5 py-3 text-sm font-black text-[var(--detail-bg)]">Open saved resource <ExternalLink className="h-4 w-4" /></Link> : null}
        <BodyContent post={post} />
      </article>
      <RelatedPanel task="sbm" post={post} related={related} />
    </section>
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const fileUrl = getField(post, ['fileUrl', 'pdfUrl', 'documentUrl', 'url'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-16">
      <article className="rounded-[2.7rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-9">
        <BackLink task="pdf" />
        <div className="mt-8 grid gap-6 sm:grid-cols-[120px_1fr]">
          <div className="flex h-28 w-28 items-center justify-center rounded-[1.8rem] bg-[var(--detail-text)] text-[var(--detail-bg)]"><FileText className="h-12 w-12" /></div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--detail-accent)]">PDF resource</p>
            <h1 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">{post.title}</h1>
          </div>
        </div>
        <BodyContent post={post} />
        {fileUrl ? (
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-[var(--detail-bg)]">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--editable-border)] bg-white p-4">
              <span className="text-sm font-black">Document preview</span>
              <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--detail-text)] px-4 py-2 text-xs font-black text-[var(--detail-bg)]">Download <Download className="h-4 w-4" /></Link>
            </div>
            <iframe src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} title={post.title} className="h-[78vh] w-full" />
          </div>
        ) : null}
      </article>
      <RelatedPanel task="pdf" post={post} related={related} />
    </section>
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const heroImage = images[1] || images[0] || '/placeholder.svg?height=900&width=1200'
  const avatar = images[0]
  const content = getContent(post)
  const role = getField(post, ['role', 'designation', 'title', 'company', 'location'])
  const company = getField(post, ['company', 'organization', 'business'])
  const location = getField(post, ['location', 'address', 'city'])
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const category = categoryOf(post, 'Profile')
  const joined = asText(content.joined) || asText(content.publishedAt) || (post.publishedAt ? new Date(post.publishedAt).getFullYear().toString() : 'Verified')
  const tags = (post.tags || [category, role, location, company]).filter(Boolean).slice(0, 4)

  return (
    <div className="relative min-h-screen bg-[#f5f5f5]">
      <section className="relative overflow-hidden bg-[#111827] text-white">
        <div className="absolute inset-y-0 right-0 hidden w-[44%] md:block">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/75 to-[#111827]/10" />
        </div>
        <div className="relative mx-auto flex min-h-[520px] max-w-[1280px] items-center px-5 py-14 sm:px-8 lg:px-10">
          <div className="w-full max-w-[790px]">
            <nav className="flex flex-wrap items-center gap-2 text-[13px] font-bold text-white/90">
              <Link href="/">Home</Link>
              <span className="text-white/45">/</span>
              <Link href="/profile">Profiles</Link>
              <span className="text-white/45">/</span>
              <span className="line-clamp-1 max-w-[420px]">{post.title}</span>
            </nav>

            <div className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-end">
              <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-[#111827] ring-4 ring-white/15">
                {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-14 w-14 opacity-55" />}
              </div>
              <div className="min-w-0">
                <span className="inline-flex rounded-full bg-[#3f5ee7] px-3 py-1.5 text-sm font-medium text-white">{category}</span>
                <h1 className="mt-5 text-[44px] font-medium leading-[1.1] tracking-normal text-white sm:text-[56px]">{post.title}</h1>
                {role ? <p className="mt-4 max-w-2xl text-lg font-semibold text-white/82">{role}</p> : null}
              </div>
            </div>

            <div className="mt-8 h-px w-full max-w-[768px] bg-white/18" />
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <ProfileHeroMetric icon={Briefcase} label="Focus" value={company || role || category} />
              <ProfileHeroMetric icon={MapPin} label="Location" value={location || 'Available remotely'} />
              <ProfileHeroMetric icon={CalendarDays} label="Member" value={joined} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mt-16 grid items-start gap-16 lg:grid-cols-[696px_426px] lg:justify-center">
          <article className="min-w-0">
            <section className="rounded-[10px] bg-white p-7 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-9">
              <div className="mb-7 flex items-center gap-3">
                <Award className="h-5 w-5 text-[#3f5ee7]" />
                <h2 className="text-xl font-black text-[#071226]">Profile Overview</h2>
              </div>
              <BodyContent post={post} profile />
            </section>

            {images.slice(1).length ? (
              <section className="mt-10">
                <h2 className="mb-4 text-xl font-black text-[#071226]">Gallery</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {images.slice(1, 5).map((image, index) => (
                    <img key={`${image}-${index}`} src={image} alt="" className="aspect-[4/3] w-full rounded-[8px] object-cover shadow-sm" />
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-9 flex flex-wrap gap-2">
              {tags.map((tag) => <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="rounded-md border border-[#d9dde4] bg-white px-4 py-2 text-sm font-medium text-[#071226]">{tag}</Link>)}
            </div>
          </article>

          <aside className="space-y-9 lg:sticky lg:top-8">
            <ProfileContactCard website={website} email={email} phone={phone} location={location} />
            <RelatedProfilesPanel related={related} />
          </aside>
        </div>
      </section>
    </div>
  )
}

function buildDiscoverItems(post: SitePost) {
  const category = categoryOf(post, 'Health')
  const tags = Array.isArray(post.tags) ? post.tags.filter((tag) => typeof tag === 'string' && tag.trim()) : []
  const items = [category, ...tags, 'Healthy', 'health', 'healthy'].filter(Boolean)
  return Array.from(new Set(items)).slice(0, 5)
}

function ArticleDetailActions({ comments }: { slug: string; comments: number }) {
  return (
    <div className="flex items-center gap-3">
      <ArticleActionPill icon={Eye} label="35" />
      <ArticleActionPill icon={Heart} />
      <ArticleActionPill icon={MessageSquare} label={String(comments)} />
      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white" aria-label="Share article">
        <Share2 className="h-4 w-4" />
      </button>
      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white" aria-label="More options">
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  )
}

function ArticleActionPill({ icon: Icon, label }: { icon: typeof Eye; label?: string }) {
  return (
    <span className="inline-flex h-9 min-w-14 items-center justify-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold text-white">
      <Icon className="h-4 w-4" />
      {label ? <span>{label}</span> : null}
    </span>
  )
}

function ProfileActionRail() {
  return (
    <div className="fixed left-4 top-[28%] z-30 hidden w-14 rounded-full bg-white py-5 text-[#111827] shadow-[0_12px_28px_rgba(15,23,42,0.12)] md:block">
      <div className="flex flex-col items-center gap-5">
        <button className="flex h-6 w-6 items-center justify-center" aria-label="Save profile"><Heart className="h-5 w-5" /></button>
        <button className="flex h-6 w-6 items-center justify-center" aria-label="Message profile"><MessageSquare className="h-5 w-5" /></button>
        <button className="flex h-6 w-6 items-center justify-center" aria-label="Share profile"><Share2 className="h-5 w-5" /></button>
      </div>
    </div>
  )
}

function ProfileHeroMetric({ icon: Icon, label, value }: { icon: typeof Briefcase; label: string; value: string }) {
  return (
    <div className="rounded-full bg-white/10 px-4 py-3 text-white">
      <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-white/55">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="mt-1 truncate text-sm font-black text-white">{value}</p>
    </div>
  )
}

function ProfileContactCard({ website, email, phone, location }: { website?: string; email?: string; phone?: string; location?: string }) {
  if (!website && !email && !phone && !location) return null
  return (
    <section className="rounded-[10px] bg-white p-6 shadow-[0_8px_28px_rgba(15,23,42,0.04)]">
      <h2 className="mb-6 flex items-center gap-3 text-lg font-black text-[#071226]"><Users className="h-5 w-5 text-[#3f5ee7]" /> Connect</h2>
      <div className="grid gap-3">
        {website ? <ProfileContactLink href={website} icon={Globe2} label="Website" value={website.replace(/^https?:\/\//i, '')} external /> : null}
        {email ? <ProfileContactLink href={`mailto:${email}`} icon={Mail} label="Email" value={email} /> : null}
        {phone ? <ProfileContactLink href={`tel:${phone}`} icon={Phone} label="Phone" value={phone} /> : null}
        {location ? <div className="flex items-start gap-3 rounded-[8px] border border-[#e1e5eb] bg-[#fbfbfc] p-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#3f5ee7]" /><div><p className="text-xs font-black uppercase tracking-[0.12em] text-[#8b93a1]">Location</p><p className="mt-1 break-words text-sm font-black text-[#071226]">{location}</p></div></div> : null}
      </div>
    </section>
  )
}

function ProfileContactLink({ href, icon: Icon, label, value, external = false }: { href: string; icon: typeof Globe2; label: string; value: string; external?: boolean }) {
  return (
    <Link href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="flex items-start gap-3 rounded-[8px] border border-[#e1e5eb] bg-[#fbfbfc] p-4 transition hover:border-[#3f5ee7]">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#3f5ee7]" />
      <span className="min-w-0">
        <span className="block text-xs font-black uppercase tracking-[0.12em] text-[#8b93a1]">{label}</span>
        <span className="mt-1 block break-words text-sm font-black text-[#071226]">{value}</span>
      </span>
    </Link>
  )
}

function RelatedProfilesPanel({ related }: { related: SitePost[] }) {
  const visible = related.slice(0, 5)
  if (!visible.length) return null
  return (
    <section className="rounded-[10px] bg-white p-6 shadow-[0_8px_28px_rgba(15,23,42,0.04)]">
      <h2 className="mb-6 flex items-center gap-3 text-lg font-black text-[#071226]"><Flame className="h-5 w-5 fill-[#ff7043] text-[#ff7043]" /> More Profiles</h2>
      <div className="grid gap-5">
        {visible.map((item) => {
          const image = getImages(item)[0] || '/placeholder.svg?height=240&width=240'
          const role = getField(item, ['role', 'designation', 'title', 'company', 'location']) || categoryOf(item, 'Profile')
          return (
            <Link key={item.id || item.slug} href={buildPostUrl('profile', item.slug)} className="group flex gap-4">
              <img src={image} alt="" className="h-20 w-20 shrink-0 rounded-full object-cover ring-1 ring-[#e1e5eb]" />
              <div className="min-w-0 pt-1">
                <h3 className="line-clamp-1 text-[15px] font-black leading-snug text-[#071226] group-hover:text-[#3157dd]">{item.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm font-medium leading-5 text-[#6b7280]">{role}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}


function DiscoverBox({ items, compact = false }: { items: string[]; compact?: boolean }) {
  if (!items.length) return null
  return (
    <section className={`overflow-hidden rounded-[4px] border border-[#d4d8df] bg-white ${compact ? '' : 'w-full'}`}>
      <h2 className="bg-[#f7f7f7] px-5 py-4 text-lg font-black text-[#2d323b]">Discover more</h2>
      <div className="divide-y divide-[#edf0f3]">
        {items.slice(0, 3).map((item) => (
          <Link key={item} href={`/search?q=${encodeURIComponent(item)}`} className="flex items-center justify-between gap-4 px-5 py-4 text-lg font-normal text-[#182033] transition hover:bg-[#fafafa]">
            <span>{item}</span>
            <ChevronRight className="h-6 w-6 shrink-0 text-[#929aa4]" />
          </Link>
        ))}
      </div>
    </section>
  )
}

function RecommendedPanel({ related }: { related: SitePost[] }) {
  const visible = related.slice(0, 5)
  if (!visible.length) return null
  return (
    <section className="rounded-[10px] bg-white p-6 shadow-[0_8px_28px_rgba(15,23,42,0.04)]">
      <h2 className="mb-6 flex items-center gap-3 text-lg font-black text-[#071226]"><Flame className="h-5 w-5 fill-[#ff7043] text-[#ff7043]" /> Recommended For You</h2>
      <div className="grid gap-6">
        {visible.map((item) => {
          const image = getImages(item)[0] || '/placeholder.svg?height=240&width=240'
          const readTime = asText(getContent(item).readTime) || '7 min read'
          return (
            <Link key={item.id || item.slug} href={buildPostUrl('article', item.slug)} className="group flex gap-4">
              <img src={image} alt="" className="h-24 w-24 shrink-0 rounded-[8px] object-cover" />
              <div className="min-w-0 pt-1">
                <h3 className="line-clamp-2 text-[15px] font-black leading-snug text-[#071226] group-hover:text-[#3157dd]">{item.title}</h3>
                <p className="mt-3 text-sm font-medium text-[#6b7280]">{readTime}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function AuthorCard({ author, avatar }: { author: string; avatar: string }) {
  return (
    <section className="mt-12 border-t border-[#e0e4ea] pt-8">
      <div className="flex items-center gap-5">
        {avatar ? <img src={avatar} alt="" className="h-16 w-16 rounded-full object-cover" /> : <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-black text-[#111827] shadow-sm">{author.slice(0, 1)}</div>}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#9ca3af]">Written by</p>
          <p className="mt-1 text-lg font-black text-[#071226]">{author}</p>
        </div>
      </div>
    </section>
  )
}

function BodyContent({ post, compact = false, article = false, profile = false }: { post: SitePost; compact?: boolean; article?: boolean; profile?: boolean }) {
  if (article) {
    return <div className="article-content article-detail-content max-w-none text-[18px] font-normal leading-[1.78] text-[#0f1b32]" dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
  }
  if (profile) {
    return <div className="article-content profile-detail-content max-w-none text-[17px] font-normal leading-[1.78] text-[#0f1b32]" dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
  }
  return <div className={`article-content mt-8 max-w-none ${compact ? 'text-base leading-8' : 'text-lg leading-9'} font-medium`} dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
}

function InfoGrid({ items }: { items: Array<[string, string, typeof MapPin]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {visible.map(([label, value, Icon]) => (
        <div key={label} className="rounded-[1.5rem] border border-[var(--editable-border)] bg-[var(--detail-bg)] p-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] opacity-55"><Icon className="h-4 w-4" /> {label}</div>
          <p className="mt-2 break-words text-sm font-bold leading-6 opacity-80">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ImageStrip({ images, label, large = false }: { images: string[]; label: string; large?: boolean }) {
  if (!images.length) return null
  return (
    <section className="mt-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--detail-accent)]">{label}</p>
      <div className={`mt-4 grid gap-3 ${large ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {images.slice(0, large ? 4 : 8).map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="aspect-[4/3] rounded-[1.4rem] object-cover ring-1 ring-[var(--editable-border)]" />)}
      </div>
    </section>
  )
}

function MapBox({ src, label }: { src: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-sm">
      <div className="flex items-center gap-2 p-4 text-sm font-black"><MapPin className="h-4 w-4" /> {label || 'Map location'}</div>
      <iframe src={src} title="Map" loading="lazy" className="h-80 w-full border-0" />
    </div>
  )
}

function ContactAction({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return (
    <div className="mt-5 rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.22em] opacity-55">Quick actions</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--detail-text)] px-4 py-2 text-sm font-black text-[var(--detail-bg)]">Website <ExternalLink className="h-4 w-4" /></Link> : null}
        {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-black"><Phone className="h-4 w-4" /> Call</a> : null}
        {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-black"><Mail className="h-4 w-4" /> Email</a> : null}
      </div>
    </div>
  )
}

function BadgeLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm"><span className="font-black uppercase tracking-[0.16em] opacity-60">{label}</span><span className="font-black">{value}</span></div>
}

function RelatedPanel({ task, post: _post, related, compact = false }: { task: TaskKey; post: SitePost; related: SitePost[]; compact?: boolean }) {
  const taskConfig = getTaskConfig(task)
  return (
    <aside className="min-w-0 space-y-5">
      {!compact ? (
        <div className="border border-[var(--editable-border)] bg-neutral-100 p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] opacity-55">About this article</p>
          <div className="mt-4 grid gap-3 text-sm font-bold opacity-75">
            <p className="inline-flex items-center gap-2"><Tag className="h-4 w-4" /> Task: {taskConfig?.label || task}</p>
            <p className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Site: {globalContent.site.name}</p>
          </div>
        </div>
      ) : null}
      {related.length ? (
        <div className="border border-[var(--editable-border)] bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-black tracking-[-0.04em]">More like this</h2>
            <Link href={taskConfig?.route || '/'} className="text-xs font-black uppercase tracking-[0.16em] opacity-55">View all</Link>
          </div>
          <div className="mt-5 grid gap-3">
            {related.map((item) => <RelatedCard key={item.id || item.slug} task={task} post={item} />)}
          </div>
        </div>
      ) : null}
    </aside>
  )
}

function RelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  const image = getImages(post)[0]
  return (
    <Link href={buildPostUrl(task, post.slug)} className="group flex gap-3 border-b border-black/10 bg-white py-3 transition hover:text-[var(--slot4-accent-fill)]">
      {image && task !== 'sbm' ? <img src={image} alt="" className="h-16 w-16 shrink-0 object-cover" /> : <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[var(--detail-bg)]"><FileText className="h-6 w-6 opacity-45" /></div>}
      <div className="min-w-0">
        <h3 className="line-clamp-3 text-sm font-black leading-tight tracking-[-0.03em]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 opacity-60">{summaryText(post)}</p>
      </div>
    </Link>
  )
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-10 border-t border-black/12 pt-7">
      <div className="flex items-center gap-2 text-lg font-black"><MessageCircle className="h-5 w-5" /> Comments</div>
      <div className="mt-5 grid gap-3">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="border border-[var(--editable-border)] bg-white p-4">
            <p className="text-sm font-black">{comment.name}</p>
            <p className="mt-2 text-sm leading-6 opacity-70">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-sm opacity-60">No comments yet for {slug}.</p> : null}
      </div>
    </section>
  )
}
