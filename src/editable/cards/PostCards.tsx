import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.body === 'string' && content.body) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Article'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

function Meta({ post, prefix }: { post: SitePost; prefix?: string }) {
  return (
    <p className="flex items-center gap-2 text-[11px] font-bold text-neutral-500">
      {prefix ? <span className="font-black text-[var(--slot4-accent-fill)]">{prefix}</span> : null}
      <span>{getEditableCategory(post)}</span>
    </p>
  )
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden ${dc.surface.dark}`}>
      <div className="relative min-h-[420px] p-5">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="relative z-10 flex min-h-[380px] flex-col justify-end">
          <span className={dc.type.eyebrow}><span className="mr-2 inline-block h-2 w-2 bg-[var(--slot4-accent-fill)]" />{label}</span>
          <h3 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">{post.title}</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">{getEditableExcerpt(post, 170)}</p>
          <span className="mt-6 inline-flex w-fit items-center gap-2 bg-white px-4 py-2 text-sm font-black text-black">
            Read article <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden border border-black/10 bg-white transition hover:-translate-y-0.5 hover:shadow-lg`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 bg-black px-2 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="p-4">
        <Meta post={post} />
        <h3 className="mt-2 line-clamp-3 text-lg font-black leading-tight">{post.title}</h3>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block min-w-0 border-b border-black/10 py-3 transition hover:text-[var(--slot4-accent-fill)]">
      <div className="grid grid-cols-[36px_minmax(0,1fr)] gap-3">
        <span className="bg-neutral-100 px-2 py-1 text-center text-[10px] font-black">{index + 1}</span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-500"><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
          <h3 className="mt-1 line-clamp-2 text-sm font-black leading-6">{post.title}</h3>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 gap-4 border-b border-black/10 bg-white py-5 transition hover:bg-neutral-50 sm:grid-cols-[220px_minmax(0,1fr)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200 sm:aspect-[4/3]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0">
        <Meta post={post} prefix={`Read ${String(index + 1).padStart(2, '0')}`} />
        <h2 className="mt-2 line-clamp-3 text-2xl font-black leading-tight group-hover:text-[var(--slot4-accent-fill)]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-neutral-600">{getEditableExcerpt(post, 190)}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-black">Open article <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}
